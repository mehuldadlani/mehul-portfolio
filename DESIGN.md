# Design

## Theme

Dark only. A deep navy "blueprint" canvas with a faint 64px grid, layered surfaces for depth, lit by a single pale-blue accent. Mood: "midnight control room — a blueprint under glass, one instrument glowing pale blue, precise and quiet." Cinematic and premium without theatrics. Color strategy: **Restrained** (tinted-neutral architecture + one accent used deliberately, well under ~10% of surface).

## Color

OKLCH throughout. One accent only (pale blue); neutrals carry everything else (Color Consistency Lock). Tokens live in `app/globals.css`.

| Role | OKLCH | Use |
|---|---|---|
| `--bg` | `oklch(0.155 0.014 262)` | Page canvas, deep navy |
| `--bg-deep` | `oklch(0.115 0.012 262)` | Recessed fills, nav glass, panel bases |
| `--surface` | `oklch(0.205 0.016 262)` | Panels, elevated sections |
| `--surface-2` | `oklch(0.26 0.018 262)` | Higher elevation, hover fills |
| `--ink` | `oklch(0.96 0.006 250)` | Primary text (>= 7:1 on bg) |
| `--muted` | `oklch(0.73 0.012 250)` | Secondary text (>= 4.5:1 on bg) |
| `--faint` | `oklch(0.55 0.014 252)` | Tertiary labels, metadata |
| `--accent` | `oklch(0.83 0.13 230)` | Pale-blue accent: links, key marks, ticks, status |
| `--accent-bright` | `oklch(0.91 0.12 224)` | Accent hover |
| `--line` | `oklch(0.95 0.02 250 / 0.1)` | Hairline borders |
| `--line-strong` | `oklch(0.95 0.02 250 / 0.22)` | Emphasis borders |
| `--grid-line` | `oklch(0.95 0.02 250 / 0.045)` | Blueprint background grid |

Deliberately NOT violet (the web3 reflex) and NOT matrix green (the security reflex). The accent is never the sole carrier of meaning.

## Typography

Pairing on a real contrast axis: a display grotesk for headlines, a true monospace for everything else — body, labels, metrics, tags, wayfinding. The mono-dominant body is the "operational manifest" voice; body copy stays short (bullets, dossier lines), never long-form prose.

- **Display:** Nippo (`--font-display`, via Fontshare), weights 400/500/700. Headlines and section titles only.
- **Mono + Body:** JetBrains Mono (`--font-mono`, via next/font), weights 400/500/700.
- Display clamp ceiling ~5.2rem; letter-spacing floor -0.02em.

## Motion

Tasteful reveals + micro-interactions (Motion / `motion`). Scroll-reveal on sections (fade + small rise, staggered within a group, 2s visibility failsafe), hero entrance stagger, scramble-decode on headline text, magnetic pull on CTAs, hairline/underline sweeps on links, custom reticle cursor (pointer-fine only). Easing: ease-out-quint / expo, ~0.5-0.7s reveals. No bounce. Full `prefers-reduced-motion` fallbacks (instant/crossfade, no transforms; the WebGL shader freezes at a fixed frame and repaints on resize).

Ambient: the hero WebGL dither shader (FBM noise + 8x8 Bayer dithering, mouse-aware warp) is the page's single piece of imagery; everything else stays flat.

## Layout & Components

- Max content width 1280px, generous vertical rhythm (sections ~ py-20/28), varied not uniform.
- **Shape Consistency Lock:** panels are square-cornered with 7px accent corner ticks (`.panel.tick` + `.tick-b`); chips/tags are square-cornered hairline boxes. No rounded cards.
- Section families are deliberately distinct: asymmetric hero dossier (gantt + status grid + shader panel), metric ledger (one panel, hairline-divided columns), indexed work rows, GitHub activity heatmap, intersection triad, artifact split + pinned-repo index, awards ledger, contact statement.
- Cards used sparingly; grouping prefers hairlines, indices, and negative space. No nested cards. No side-stripe borders. No gradient text. Glass used at most once (nav), purposefully.
- Z-index scale: base 0, nav 50, overlay 60, grain 70, skip-link 80.
- Live data: GitHub contributions + pinned-repo metadata fetched server-side, revalidated daily, with graceful static fallbacks.
