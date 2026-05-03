# Munglabs Landing Page

Munglabs — "mung" means "just" in Javanese. A humble lab for AI research, electronics, DIY tinkering, software tools, and content creation. Humble in spirit, rigorous in practice.

This is the landing page and blog for Munglabs.

## Tech Stack

- **Astro** — Static site generator, zero JS by default
- **React** — Interactive components via `@astrojs/react`
- **Tailwind CSS v4** — Utility-first styling with custom blue theme
- **MDX** — Blog posts with Astro Content Collections
- **Giscus** — GitHub Discussions-powered comments (zero backend)

## How It's Built

This project is **100% vibecoded** — entirely written with a local LLM stack:

- **Model:** Qwen3.6 27B FP8
- **Inference:** SGLang
- **Hardware:** 4x RTX 5060 Ti + Xeon (Broadwell-EP)
- **Orchestrator:** [Opencode](https://opencode.ai)

No cloud APIs, no external services. Full local stack, running on-prem.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Starts the dev server at `http://localhost:4321`.

## Build

```bash
npm run build
```

Generates a static site in `dist/`, ready to deploy.

## Preview

```bash
npm run preview
```

Serves the production build locally.

## Project Structure

```
src/
├── components/     — Reusable UI components
├── content/blog/   — Blog posts (MDX)
├── layouts/        — Page layouts
├── pages/          — Routes (file-based)
└── styles/         — Global styles + animations
```

## License

MIT
