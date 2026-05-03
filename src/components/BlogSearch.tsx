import { useState, useEffect, useCallback, useRef } from 'react';
import MiniSearch from 'minisearch';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
  snippet?: string;
}

const highlightText = (text: string, query: string, contextLength: number = 80): string => {
  if (!text) return '';
  const cleanText = text.replace(/\*\*/g, '').replace(/[#*_`>\-|]/g, '').replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
  const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 1);
  let bestIdx = -1;
  let bestScore = 0;

  for (const term of terms) {
    const idx = cleanText.toLowerCase().indexOf(term);
    if (idx !== -1) {
      const score = idx === 0 ? 9999 : idx;
      if (bestIdx === -1 || score < bestScore) {
        bestIdx = idx;
        bestScore = score;
      }
    }
  }

  if (bestIdx === -1) return '';

  const matchedTerm = terms.find(t => cleanText.toLowerCase().includes(t)) || '';
  const start = Math.max(0, bestIdx - contextLength);
  const end = Math.min(cleanText.length, bestIdx + matchedTerm.length + contextLength);
  let snippet = cleanText.slice(start, end);
  if (start > 0) snippet = '...' + snippet;
  if (end < cleanText.length) snippet = snippet + '...';

  for (const term of terms) {
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    snippet = snippet.replace(regex, '<mark>$1</mark>');
  }

  return snippet;
};

export default function BlogSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [index, setIndex] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/search-index.json')
      .then(res => res.json())
      .then(data => {
        const idx = new (MiniSearch as any)({
          fields: ['title', 'description', 'content', 'tags'],
          storeFields: ['id', 'title', 'description', 'date', 'tags', 'content'],
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 4, description: 2, tags: 3, content: 1 },
          },
        });
        idx.addAll(data);
        setIndex(idx);
      });
  }, []);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    setIsOpen(true);

    if (!value.trim() || !index) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const searchResults = index.search(value).slice(0, 5).map((result: SearchResult) => ({
      ...result,
      snippet: highlightText(result.content, value),
    }));
    setResults(searchResults);
    setIsSearching(false);
  }, [index]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md" ref={resultsRef}>
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          placeholder="Search posts..."
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mung-500/20 focus:border-mung-400 transition-all placeholder:text-slate-400"
        />
        {isSearching && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-slate-200 border-t-mung-500 rounded-full animate-spin" />
          </div>
        )}
      </div>

      {isOpen && query.trim() && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-lg overflow-hidden">
          {results.map((result) => (
            <a
              key={result.id}
              href={`/blog/${result.id}`}
              className="block px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-b-0"
              onClick={() => {
                setIsOpen(false);
                setQuery('');
              }}
            >
              <h3 className="text-sm font-medium text-slate-900 hover:text-mung-600 transition-colors">
                {result.title}
              </h3>
              {result.snippet && (
                <p
                  className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: result.snippet }}
                />
              )}
              <div className="mt-1.5 flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">
                  {new Date(result.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                {result.tags.length > 0 && (
                  <>
                    <span className="text-slate-300">&bull;</span>
                    <div className="flex gap-1.5">
                      {result.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs text-mung-600 bg-mung-50 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </a>
          ))}
        </div>
      )}

      {isOpen && query.trim() && results.length === 0 && !isSearching && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-lg p-4 text-center">
          <p className="text-sm text-slate-500">No results for &ldquo;{query}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
