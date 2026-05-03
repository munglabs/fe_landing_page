# Munglabs Landing Page

## About
Munglabs — "mung" means "just" in Javanese. A humble lab for AI research, electronics, DIY tinkering, software tools, and content creation. Humble in spirit, rigorous in practice.

## Tech Stack
- **Astro** — Static site generator, zero JS by default, island architecture for interactive components
- **React** — Interactive components (mobile menu toggle) via `@astrojs/react` with `client:load`
- **Tailwind CSS v4** — Utility-first styling with custom blue theme
- **Lucide icons** — Inline SVG approach for zero-runtime icons (no emoji)

## Design System
- **Theme**: Blue (`mung-50` to `mung-950` custom palette)
- **Style**: Minimalist, elegant, clean
- **Fonts**: Inter (body) + JetBrains Mono (monospace accents)
- **Animations**: CSS keyframes — `fade-in-up`, `fade-in`, `slide-in-left`, `scale-in`, `float`, `pulse-glow`
- **Staggered delays**: `.delay-100` through `.delay-800` for sequential reveal

## Completed
- [x] Init Astro project
- [x] React integration (`@astrojs/react`)
- [x] Tailwind CSS v4 with custom blue theme
- [x] Inter + JetBrains Mono fonts
- [x] CSS animation system
- [x] Navbar with mobile toggle (React, `client:load`)
- [x] Hero section with animated badge, headline, subtitle, CTA
- [x] Features grid (6 cards: AI, Electronics, Software, DIY, Research, Content)
- [x] CTA section with gradient card
- [x] Footer with branding
- [x] Build verified

## Project Structure
```
src/
├── components/
│   ├── Navbar.astro          — Fixed nav, mobile toggle via React
│   ├── MenuToggle.tsx        — React component for mobile menu
│   ├── Hero.astro            — Headline, subtitle, CTA buttons
│   ├── Features.astro        — 6-card grid with inline SVG icons
│   ├── CTA.astro             — Gradient card, collaboration prompt
│   └── Footer.astro          — Branding, links
├── layouts/
│   └── BaseLayout.astro      — HTML shell, fonts, global CSS
├── pages/
│   └── index.astro           — Main landing page
└── styles/
    └── global.css            — Tailwind + custom theme + animations
```

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Build for production (`dist/`)
- `npm run preview` — Preview production build

## Icon Strategy
Using inline SVG strings (from Lucide) rendered via `set:html` — zero runtime cost, no emoji, consistent design. React components use Lucide directly with `className`.
