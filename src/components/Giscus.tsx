import { useEffect, useRef } from 'react';

export default function Giscus() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current || !containerRef.current) return;
    loaded.current = true;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', 'munglabs/landing_blog_comments');
    script.setAttribute('data-repo-id', 'R_kgDOSS7ooQ');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOSS7ooc4C8O1d');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="mt-12 pt-8 border-t border-slate-100">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Discussion</h3>
      <div ref={containerRef} />
    </div>
  );
}
