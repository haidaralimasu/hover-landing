# Hover — Design System

Single locked **light** theme, monochrome — matches the mobile app
(`app.json` `userInterfaceStyle: "light"`; `ScreenContainer` bg = white). Mirrors
the app tokens (`PayZapp/mobile/src/theme/index.ts`). Live: `src/app/globals.css`.

## Color
| Role | Token | Value | App source |
|---|---|---|---|
| Body bg | `--color-bg` | `#ffffff` | white |
| Raised bg | `--color-bg-2` | `#f7f7f7` | gray050 |
| Surface | `--color-surface` | `#f2f2f2` | gray100 |
| Surface raised | `--color-surface-2` | `#ececec` | hover |
| Ink (primary) | `--color-ink` | `#0a0a0a` | black |
| Ink-2 (secondary) | `--color-ink-2` | `#5c5c5c` | ~gray700 |
| Ink-3 (muted) | `--color-ink-3` | `#8a8a8a` | — |
| Ink-4 (faint) | `--color-ink-4` | `#b0b0b0` | — |
| Hairline | `--color-line` | `rgba(0,0,0,.08)` | gray300 |
| Hairline strong | `--color-line-2` | `rgba(0,0,0,.14)` | — |
| Graphite 1 | `--color-silver-1` | `#3a3a3a` | mark/fill |
| Graphite 2 | `--color-silver-2` | `#0a0a0a` | black |

**No hue.** The `--color-silver-*` graphite gradient drives the H mark and the
**primary button fill** (dark pill, white label — app `Button.primary`). Never
gradient text (banned). Real brand logos may carry their own color.

## Type
**Poppins** (`--font-poppins`), Geist Mono for code/mono only.
App type scale for reference: display 28/-0.5, title 19, body 15/21, caption 12.5.
Web scales body up (16–18px) and hero to `clamp` ≤ 6rem.

## Shape (SHAPE LOCK)
Cards `--radius-card: 16px`. Inputs `--radius-input: 12px`. Buttons: full pill
(999). Matches app radius tokens (lg:20, md:16, input:20, pill:999) — web cards
sit at 16, hero glass card at 32.

## Spacing
App scale: 4 / 8 / 14 / 20 / 24 / 32. Vary section rhythm; don't uniform-pad.

## Motion
Easings: `--ease-out-quart`, `--ease-out-expo`, `--ease-in-out-strong`. No bounce.
Scroll reveal is progressive enhancement (visible by default, hidden only with
`.js` + motion allowed). Every animation has a reduced-motion path.

## Texture
Faint hairline grid (`bg-grid`, 64px), radial glow (`bg-white/[.06]`), 3% film
grain overlay, edge-fade masks. Subtle — depth, not decoration.
