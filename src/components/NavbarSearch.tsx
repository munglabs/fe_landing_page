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
    snippet = snippet.replace(regex, '<mark class="search-highlight">$1</mark>');
  }

  return snippet;
};

export default function NavbarSearch() {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [index, setIndex] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (expanded) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [expanded]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (!value.trim() || !index) {
      setResults([]);
      return;
    }
    const searchResults = index.search(value).slice(0, 5).map((result: SearchResult) => ({
      ...result,
      snippet: highlightText(result.content, value),
    }));
    setResults(searchResults);
  }, [index]);

  const handleExpand = () => {
    setExpanded(prev => !prev);
  };

  return (
    <div ref={containerRef} className="relative flex items-center">
      {expanded ? (
        <div className="flex-col md:inline-flex fixed md:relative inset-x-0 top-16 md:top-auto z-50 bg-white md:bg-transparent border-b md:border-b-0 border-slate-100 shadow-lg md:shadow-none px-4 md:px-0 pt-3 md:pt-0 pb-3 md:pb-0 items-stretch md:items-center gap-2">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search posts..."
              className="flex-1 md:w-52 lg:w-64 px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mung-500/20 focus:border-mung-400 transition-all placeholder:text-slate-400"
            />
            <button
              onClick={handleExpand}
              className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100"
              aria-label="Close search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          {query.trim() && results.length > 0 && (
            <div className="md:absolute md:right-0 md:top-full md:mt-2 mt-2 max-h-80 w-full md:w-80 overflow-y-auto bg-white border border-slate-100 rounded-xl shadow-lg overflow-hidden">
              {results.map((result) => (
                <a
                  key={result.id}
                  href={`/blog/${result.id}`}
                  className="block px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-b-0"
                  onClick={() => {
                    setExpanded(false);
                    setQuery('');
                  }}
                >
                  <h3 className="text-sm font-medium text-slate-900 hover:text-mung-600 transition-colors">
                    {result.title}
                  </h3>
                  {result.snippet && (
                    <p
                      className="mt-1 text-xs text-slate-500 line-clamp-2 md:line-clamp-none leading-relaxed"
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

          {query.trim() && results.length === 0 && (
            <div className="md:absolute md:right-0 md:top-full md:mt-2 mt-2 w-full md:w-72 bg-white border border-slate-100 rounded-xl shadow-lg p-4 text-center">
              <p className="text-sm text-slate-500">No results for &ldquo;{query}&rdquo;</p>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={handleExpand}
          className="p-2 text-slate-400 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100"
          aria-label="Search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </button>
      )}
    </div>
  );
}
