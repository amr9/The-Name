# Codebase structure

This file is the map of how this project is organized. **Update it in the
same turn as any change that alters structure** — a new file, a moved file,
a new shared component/util, a new convention. Stale docs are worse than no
docs, so keep this in sync rather than letting it drift.

## Stack

- **Vite** + **React 18** (`src/main.jsx` is the entry, `index.html` is the
  required Vite HTML shell — it cannot be deleted, only its `<head>` content
  edited).
- **react-router-dom** for routing (`src/App.jsx` defines the routes).
- No CSS framework — plain CSS files, one per component/page, reading from
  design tokens in `src/styles/theme.css`.
- No i18n library — a small hand-rolled context in `src/i18n/`.

## Folder layout

```
src/
  main.jsx            — ReactDOM root; wraps App in BrowserRouter + LanguageProvider
  App.jsx             — route table (/, /menu, /shop, /catering) + global chrome
                         (Navbar, Footer, floating WhatsApp button)

  pages/<PageName>/   — one folder per route
    <PageName>.jsx     — the page component
    <PageName>.css     — page-specific layout (uses theme.css tokens, never
                         hardcodes a color/font)
    data.js            — STRUCTURAL data only for that page: ids, ordering,
                         numeric prices, x/y coordinates, route targets.
                         Never display copy — see i18n/ below.

  components/         — shared UI building blocks used by 2+ pages
    <Name>.jsx + <Name>.css       — simple components stay as flat files
    <Name>/<Name>.jsx + .css      — a component gets its own folder once it
                                    has real internal complexity (currently:
                                    Navbar/, Footer/). Parts used by only
                                    that component live in its folder too
                                    (e.g. Footer/SocialLinks.jsx).

  data/
    site.js            — cross-page structural facts (phone, contact email,
                          shop URL,
                          nav link routes+keys, social profile URLs).
                          No display text. `waLink` is derived from
                          `site.phone` here and is the ONLY WhatsApp URL in
                          the codebase — every trigger goes through
                          components/WhatsAppButton.jsx, so changing the
                          number is a one-line edit.
    media.js            — maps every image slot to a file under
                          `public/media/`, keyed by the same ids the page
                          data + i18n use. Also serves as the shot list of
                          photography still needed.
    catalogue.js        — the Vertex pieces catalogue: code/category-key/
                          coordinates only (shared by Home's hotspots and
                          the VertexPieces page). Display text lives in
                          i18n under vertex.items[code].

  i18n/
    LanguageContext.jsx — LanguageProvider + useLanguage() hook. Persists
                          choice to localStorage, sets <html lang>/<html dir>
                          (Arabic is RTL), deep-merges the active language
                          over English so a missing key never breaks.
    languages.js        — the 4 supported languages (code, native name, dir)
    translations/{en,fr,es,ar}.js
                        — ALL display copy for the whole site, nested to
                          mirror each page's structural data.js so lookups
                          are `t.<page>.<section>[id]`.

  hooks/useCarouselAutoplay.js — global effect that auto-advances every
                          `.carousel-track` on screen every 4.2s.
  utils/carousel.js      — stepCarousel(el, dir): the one-card-per-step
                          scroll math, used by the Carousel component and
                          the autoplay hook. Wraps in both directions (a closed
                          loop) and is RTL-aware — card positions are
                          measured in the same coordinate space as
                          scrollLeft, so track padding can't skew the step.

  styles/theme.css       — ALL design tokens (--color-*, --font-*, --text-*,
                          --space-*, --radius-*, --shadow-*, the named
                          gradients) plus
                          shared component classes (.btn*, .card, .tag,
                          .seg*, .table, .dialog, .carousel-*). A page/
                          component CSS file should only ever add layout
                          rules that are specific to it — a rule used by
                          2+ files belongs here instead (see DRY below).
```

## Media files

Artwork lives in `public/media/` (served as-is by Vite, so no import step):

```
public/media/
  hero/       — home hero + the wide room shot the hotspots sit on
  services/   — the four Home service rows
  menu/       — menu dishes
  vertex/     — the Vertex pieces, named by product code
  catering/   — the Events / Catering tab images
  partners/   — reserved for delivery-partner logos. Currently empty: the
                Home logo strip hot-links talabat's and noon's own CDN URLs
                (see data/media.js `partners`) so a rebrand on their side
                appears automatically. Drop a file here and repoint that
                entry to pin an asset locally instead.
  brand/      — logo exports and other brand assets. Contains
                `footer-pattern.svg`: the guideline's hand-drawn wavy line
                texture, a seamlessly tiling tile used as the footer
                background. Replace that file to retune the pattern.
```

`src/data/media.js` already points at the expected filename for every slot.
Saving a file under that name is all that's needed — no code change. Until it
exists the request simply fails and `<ImagePlaceholder>` shows its dashed
placeholder instead, so partially-supplied media degrades cleanly.

## Current pages

| Route | Folder | Notes |
|---|---|---|
| `/` | `pages/Home/` | Hero, rolling delivery-partner logo strip (CSS marquee, duplicated row), 4 services, "shop the room" hotspot panel (reads `data/catalogue.js` + `i18n` vertex.items), closing CTA |
| `/menu` | `pages/Menu/` | List/Cards toggle (shared `ViewToggle`), 3 sections, autoplaying carousels |
| `/shop` | `pages/VertexPieces/` | Catalogue filters, List/Cards toggle, autoplaying carousel |
| `/catering` | `pages/CateringEvents/` | Events/Catering tabs, packages table, direct-line panel |
| `/contact` | `pages/Contact/` | Enquiry form (name/email/phone/message) with client-side validation and a sent state. **Nothing is transmitted yet** — the submit handler in `Contact.jsx` is a marked stub; wire it to a form relay or backend and submissions go to `site.email`. |

## Conventions (read before adding code)

1. **A page's `data.js` never holds display text.** If you're tempted to put
   a name/note/label/body string in a page's `data.js`, it belongs in
   `i18n/translations/en.js` (and the other 3 languages) instead, keyed by a
   stable id that the structural data references.
2. **Every hardcoded color/font/spacing value is a bug.** Use the CSS custom
   properties in `theme.css`. If a new value is genuinely needed, add it as
   a token there, don't inline a hex code in a page CSS file.
   In particular, **body copy uses the `--text-*` scale, never a raw px
   size**: `--text-xs` (uppercase micro-labels, kickers, badges, table
   heads), `--text-sm` (meta lines, footnotes, secondary notes),
   `--text-body` (the default — descriptions, card bodies, list notes,
   inputs, tables) and `--text-lg` (ledes / intro paragraphs under a page
   title). Retuning the site's reading size is then a four-line edit in
   `theme.css`. Only headings (the `h1`–`h6` rules and the per-page
   `clamp()` display titles), prices and the logo still carry their own px
   sizes.
3. **DRY — before writing new JSX/CSS, search for an existing match.** This
   codebase has already hit and fixed real duplication twice:
   - The WhatsApp SVG icon existed in two places → extracted to
     `components/WhatsAppIcon.jsx`.
   - The List/Cards segmented toggle (markup + CSS) was duplicated between
     Menu and VertexPieces → extracted to `components/ViewToggle.jsx` and
     the shared `.view-toggle-opt` rule moved into `theme.css`.
   - The scrolling card track, its ref plumbing and its prev/next arrows
     were assembled separately on both pages → folded into one
     `components/Carousel.jsx` that owns the track and its side arrows, so
     pages just pass the cards as children.
   Grep for similar class names / JSX shapes before adding a second copy of
   anything; if 2+ places need the same thing, extract it into
   `components/`, `utils/`, or a shared token in `theme.css` instead of
   copy-pasting.
4. **New page = new folder** under `pages/`, following the existing
   `<PageName>/<PageName>.jsx` + `.css` (+ `data.js` if it has structured
   content) shape. Add the route in `App.jsx`, the nav entry (`to`/`key`) in
   `data/site.js`, and the `nav.<key>` label in all 4 translation files.
5. **`index.html` is the Vite entry shell, not a page.** It only holds
   `<head>` metadata (fonts, title) and the `#root` div + script tag — it
   cannot be removed while this is a Vite SPA. Page content changes never
   touch this file; only global `<head>` changes (fonts, meta tags) do.
