# Vestimy - Landing site

Marketing site for Vestimy. Static HTML/CSS/JS - **no build step, no dependencies**.

## Why static
Replicates the app's design system 1:1 (same `.ttf` fonts, same palette/glass
tokens, same animated pink aurora wallpaper) with full control and zero tooling.
Opens directly in a browser or drops onto any static host (Netlify, Vercel,
Cloudflare Pages, GitHub Pages, S3).

## Run locally
```sh
cd landing
python3 -m http.server 8080   # then open http://localhost:8080
```
(A plain file:// open works too, but a server is recommended so the `.ttf`
fonts and PNG assets load without CORS quirks.)

## Pages
Two distinct landings with different goals:
| File | Audience | Purpose |
|---|---|---|
| `index.html` | **Consumers** | Wardrobe → AI styling → Drippamy → download the app |
| `brands.html` | **Brands / retailers** | B2B: contextual placement inside wardrobes, partnership, "Book a demo" |
| `support.html` | All | Contact cards + FAQ + account/data help |
| `privacy.html` | All | Privacy Policy - HTML render of `mobile/PRIVACY_POLICY.md` |

Consumer ↔ brand cross-link in the nav ("For brands" / "For shoppers").

## Visual direction
No glass-sheen sweeps, no gradient text or gradient buttons. Buttons are solid
ink → flip to aurora on hover; the headline accent is a solid marker-highlight
that draws in. Motion favours visual input over copy: a hero **word-rotator**
(own / love / saved), a **scroll progress bar**, marquee ticker, 3D tilt, hero
parallax, magnetic buttons, breathing glows. All gated behind
`prefers-reduced-motion` / `pointer: fine`.

## Localization (EN / IT)
`js/i18n.js` holds the EN + IT dictionaries. On load it auto-detects the
browser language (`navigator.languages`); `it-*` → Italian, everything else →
English. A manual choice (EN/IT switch in the nav) is persisted in
`localStorage` (`vestimy_lang`). Translatable nodes opt in via `data-i18n`
(text), `data-i18n-html` (markup), or `data-i18n-attr` (attributes). The
Privacy Policy body stays in English (official version; Italian on request,
matching the app), only its chrome is localized.

## Imagery
Garments are shown as **cut-outs** (background removed), matching how Vestimy
displays clothing (`url_transparent`). The hero floats transparent garment PNGs
with soft shadows + metadata tags; the Catalogue band and Drippamy visual reuse
the same cut-outs. No phone screenshots are used. Cut-out PNGs come from
`mobile/assets/intro` (generic, brand-owned). `screenshots/` holds your
reference shots - unlinked; delete before deploying if you don't want them
published.

## Motion & identity
Streetwear direction. Display type is **SunghyunSans Bold** (heavy, rounded,
uppercase headlines) - the elegant InstrumentSerif is no longer used. Motion
lives in `js/motion.js` + CSS keyframes: animated gradient headline, scrolling
marquee ticker, scroll-reveal with stagger, 3D card tilt (`[data-tilt]`), hero
garment mouse-parallax (independent `translate` so it composes with the float
animation), magnetic buttons (`[data-magnetic]`), nav shrink-on-scroll, card
sheen sweeps, breathing glows on the AI tag and brand contextual card. All of it
is gated behind `prefers-reduced-motion` and `pointer: fine`.

## Design system (ported from `mobile/`)
- **Fonts** - SunghyunSans Bold (display/headlines), SunghyunSans Regular (wordmark), Manrope (body), JetBrains Mono (eyebrows). Same files as `mobile/assets/fonts`.
- **Palette** - `tokens.ts`: ink `#0e0b1f`, aurora `#fc50fa`, violet `#6d4ae0`, rose, sun, cream.
- **Glass** - `backdrop-filter` blur + hair-stroke border + soft shadow, mirroring `Glass.tsx`.
- **Aurora wallpaper** - `js/aurora.js` is a canvas port of `Wallpaper.tsx`: pink radial blobs, `multiply` blend, sum-of-sines drift, 90s cycle. Respects `prefers-reduced-motion`.

## Structure
```
landing/
├── index.html · support.html · privacy.html
├── css/styles.css        # full design system
├── js/aurora.js          # animated bg + scroll reveal + mobile nav
├── fonts/                # app .ttf fonts
└── assets/               # icon + garment/product images
```

## Editing copy
All copy lives inline in the HTML. Contact addresses used:
`support@vestimy.com`, `privacy@vestimy.com`, `brands@vestimy.com`, `hello@vestimy.com`.
