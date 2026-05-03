import { useState } from 'react';

export default function MenuToggle() {
  const [isOpen, setIsOpen] = useState(false);

  const menuLinks = [
    { label: 'About', href: '#about', newTab: false },
    { label: 'Blog', href: '/blog', newTab: false },
    { label: 'GitHub', href: 'https://github.com/munglabs', newTab: true },
    { label: 'YouTube', href: 'https://www.youtube.com/@MungNgulik', newTab: true },
  ];

  return (
    <>
      <button
        className="md:hidden text-slate-500 hover:text-slate-900 transition-colors"
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        )}
      </button>

      {isOpen && (
        <div className="md:hidden pb-4 border-t border-slate-100 pt-4">
          {menuLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
              target={link.newTab ? '_blank' : undefined}
              rel={link.newTab ? 'noopener noreferrer' : undefined}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            className="mt-2 block text-center px-4 py-2 text-sm font-medium text-white bg-mung-600 rounded-lg hover:bg-mung-700 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Get in Touch
          </a>
        </div>
      )}
    </>
  );
}
