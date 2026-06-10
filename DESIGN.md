# Design

## Theme

Dark only. A graphite near-black canvas with layered surfaces for depth, lit by a single warm amber accent. Mood: "midnight control room — graphite black, a single instrument glowing warm amber, precise and quiet." Cinematic and premium without theatrics. Color strategy: **Restrained** (tinted-neutral architecture + one accent used deliberately, well under ~10% of surface).

## Color

OKLCH throughout. One accent only (amber); neutrals carry everything else (Color Consistency Lock).

| Role | OKLCH | Use |
|---|---|---|
| `--bg` | `oklch(0.165 0.006 255)` | Page canvas, graphite near-black with a faint cool cast |
| `--surface` | `oklch(0.205 0.007 255)` | Panels, cards, elevated sections |
| `--surface-2` | `oklch(0.255 0.008 255)` | Higher elevation, hover fills |
| `--ink` | `oklch(0.970 0.004 255)` | Primary text (>= 7:1 on bg) |
| `--muted` | `oklch(0.720 0.008 255)` | Secondary text (>= 4.5:1 on bg) |
| `--faint` | `oklch(0.560 0.010 255)` | Tertiary labels, metadata |
| `--accent` | `oklch(0.840 0.150 78)` | Amber accent: links, key marks, glow |
| `--accent-bright` | `oklch(0.900 0.150 85)` | Accent hover |
| `--accent-ink` | `oklch(0.200 0.040 70)` | Dark text on amber fills (accent L>0.78, so dark text) |
| `--border` | `oklch(1 0 0 / 0.08)` | Hairline borders |
| `--border-strong` | `oklch(1 0 0 / 0.16)` | Emphasis borders, focus |

Deliberately NOT the seed (violet 270): violet on dark is the web3 reflex this brand exists to avoid.

## Typography

Pairing on a real contrast axis: a geometric/quirky grotesk for display + body, a true monospace for technical labels, metrics, tags, and wayfinding.

- **Display + Body:** Space Grotesk (`--font-display`), weights 400/500/700. Body 16-18px, line length capped 65-72ch.
- **Mono:** JetBrains Mono (`--font-mono`), weights 400/500. Used for kickers, metrics, tech tags, dates, section indices.
- Display clamp ceiling ~5.5rem; letter-spacing floor -0.03em; `text-wrap: balance` on headings, `pretty` on prose.

## Motion

Tasteful reveals + micro-interactions (Motion / `motion`). Scroll-reveal on sections (fade + small rise, staggered within a group), hero entrance stagger, magnetic pull + amber glow on primary CTA, hairline/underline sweeps on links, subtle lift on work rows. Easing: ease-out-quint / expo, ~0.5-0.7s reveals. No bounce. Full `prefers-reduced-motion` fallbacks (instant/crossfade, no transforms). Ambient: a fixed low-opacity amber radial glow + a faint grain overlay for filmic depth (fixed, pointer-events-none).

## Layout & Components

- Max content width ~1200px, generous vertical rhythm (sections ~ py-28/36), varied not uniform.
- **Shape Consistency Lock:** panels/cards `14px` radius; interactive buttons full pill; chips/tags full pill.
- Section families are deliberately distinct (>= 4 across the page): asymmetric hero, editorial metric ledger, indexed work rows (real chronological sequence), asymmetric intersection triad, project feature split, hackathon ledger, contact statement.
- Cards used sparingly; grouping prefers hairlines, indices, and negative space. No nested cards. No side-stripe borders. No gradient text. Glass used at most once (nav), purposefully.
- Z-index scale: base 0, sticky-nav 50, overlay 60, grain 70.
