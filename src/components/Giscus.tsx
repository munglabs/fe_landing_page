import { useEffect, useState } from 'react';

interface GiscusProps {
  repo?: string;
  repoId?: string;
  category?: string;
  categoryId?: string;
}

export default function Giscus({
  repo = 'munglabs/munglabs-comments',
  repoId = '',
  category = 'Announcements',
  categoryId = '',
}: GiscusProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;
    setLoaded(true);

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'en');
    script.crossOrigin = 'anonymous';

    const target = document.currentScript?.parentElement;
    if (target) {
      target.appendChild(script);
    }
  }, [loaded, repo, repoId, category, categoryId]);

  return (
    <div className="giscus-container mt-12 pt-8 border-t border-slate-100">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Discussion</h3>
    </div>
  );
}
