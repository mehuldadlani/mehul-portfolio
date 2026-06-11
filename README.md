# mehuldadlani.dev

Personal portfolio — product engineer (Flutter · Web3 · security). Dark navy
"operational manifest" aesthetic: blueprint grid, corner-tick panels, a custom
WebGL dither shader, and live GitHub telemetry.

## Stack

- **Next.js 15** (App Router, fully static prerender) + React 19
- **Tailwind CSS 4** with OKLCH design tokens (`app/globals.css`)
- **Motion** for reveals and micro-interactions (full `prefers-reduced-motion` support)
- **Raw WebGL** dither shader (FBM noise + Bayer-matrix dithering, `components/dither-shader.tsx`)
- Fonts: Nippo (Fontshare) for display, JetBrains Mono (Google Fonts) for everything else

## Content

All copy and data live in `lib/content.ts`. The GitHub activity heatmap and
pinned-repo metadata are fetched server-side at build time (revalidated daily)
and degrade gracefully when the API is unavailable.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run build      # production build (the deploy gate)
```

## Deploy

Pushing `main` deploys to Vercel. Design system and brand rules are documented
in `DESIGN.md` and `PRODUCT.md`.
