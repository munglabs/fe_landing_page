# Munglabs Landing Page

## About
Munglabs — "mung" means "just" in Javanese. A humble lab for AI research, electronics, DIY tinkering, software tools, and content creation. Humble in spirit, rigorous in practice.

## Principle: Don't Reinvent the Wheel
If a library, font, utility, or tool already exists publicly and does the job well — use it. No rolling custom solutions when battle-tested ones are available.

**Examples applied:**
- `@tailwindcss/typography` for prose styling (instead of hand-writing `.prose` CSS)
- Google Fonts (Inter, JetBrains Mono) instead of self-hosting
- Lucide for icons instead of custom SVG library
- Giscus for comments instead of building a comments backend
- Astro Content Collections instead of custom MDX loader

## Tech Stack
- **Astro** — Static site generator, zero JS by default, island architecture for interactive components
- **React** — Interactive components (mobile menu toggle) via `@astrojs/react` with `client:load`
- **Tailwind CSS v4** — Utility-first styling with custom blue theme
- **@tailwindcss/typography** — Prose styling for blog content
- **Lucide icons** — Inline SVG approach for zero-runtime icons (no emoji)

## Design System
- **Theme**: Blue (`mung-50` to `mung-950` custom palette)
- **Style**: Minimalist, elegant, clean
- **Fonts**: Inter (body) + JetBrains Mono (monospace accents) via Google Fonts
- **Animations**: CSS keyframes — `fade-in-up`, `fade-in`, `slide-in-left`, `scale-in`, `float`, `pulse-glow`
- **Staggered delays**: `.delay-100` through `.delay-800` for sequential reveal

## Completed
- [x] Init Astro project
- [x] React integration (`@astrojs/react`)
- [x] Tailwind CSS v4 with custom blue theme
- [x] `@tailwindcss/typography` for blog prose (replaced manual CSS)
- [x] Inter + JetBrains Mono fonts (Google Fonts)
- [x] CSS animation system
- [x] Navbar with mobile toggle (React, `client:load`)
- [x] Hero section with animated badge, headline, subtitle, CTA
- [x] Features grid (6 cards: AI, Electronics, Software, DIY, Research, Content)
- [x] CTA section with gradient card
- [x] Footer with branding
- [x] Blog: Astro Content Collections + MD loader
- [x] Blog list page (`/blog`)
- [x] Blog post page (`/blog/[...slug]`)
- [x] Giscus comments integration
- [x] First blog post (hello-world.md)
- [x] Build verified
- [x] Git init + remote + README

## Project Structure
```
src/
├── components/
│   ├── Navbar.astro          — Fixed nav, mobile toggle via React
│   ├── MenuToggle.tsx        — React component for mobile menu
│   ├── Hero.astro            — Headline, subtitle, CTA buttons
│   ├── Features.astro        — 6-card grid with inline SVG icons
│   ├── CTA.astro             — Gradient card, collaboration prompt
│   ├── Footer.astro          — Branding, links
│   └── Giscus.tsx            — GitHub Discussions comments widget
├── content/
│   └── blog/
│       └── hello-world.md    — Plain Markdown posts
├── content.config.ts         — Blog collection schema
├── layouts/
│   ├── BaseLayout.astro      — HTML shell, fonts, global CSS
│   └── BlogPostLayout.astro  — Shared blog layout
├── pages/
│   ├── index.astro           — Main landing page
│   └── blog/
│       ├── index.astro       — Blog list
│       └── [...slug].astro   — Individual post
└── styles/
    └── global.css            — Tailwind + custom theme + animations
```

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Build for production (`dist/`)
- `npm run preview` — Preview production build

## Icon Strategy
Using inline SVG strings (from Lucide) rendered via `set:html` — zero runtime cost, no emoji, consistent design. React components use Lucide directly with `className`.
