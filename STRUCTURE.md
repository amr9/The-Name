# Codebase structure

This file is the map of how this project is organized. **Update it in the
same turn as any change that alters structure** — a new file, a moved file,
a new shared component/util, a new convention. Stale docs are worse than no
docs, so keep this in sync rather than letting it drift.

## Stack

- **Vite** + **React 18** (`src/main.jsx` is the entry, `index.html` is the
  required Vite HTML shell — it cannot be deleted, only its `<head>` content
  edited).
- One backend: **`server/`**, a standalone Express service that receives the
  contact form and emails it over SMTP. It has its own `package.json` and
  its own `npm install` — the frontend stays dependency-light.
- **react-router-dom** for routing (`src/App.jsx` defines the routes).
- No CSS framework — plain CSS files, one per component/page, reading from
  design tokens in `src/styles/theme.css`.
- No i18n library — a small hand-rolled context in `src/i18n/`.

## Folder layout

The repo root holds three code trees: `src/` (the site), `server/` (the
contact-form service) and `shared/` (the handful of modules both need).

```
shared/
  contactForm.js      — the contact form's field list, length caps, honeypot
                        field name, timing field name and `validateContact()`.
                        Imported by BOTH the React form (via pages/Contact/
                        data.js, which just re-exports it) and server/index.js,
                        so the browser and the server can never validate by
                        different rules. Structural only — it returns error
                        KEYS, and each side turns them into its own copy.

server/               — the contact-form service (its own package.json, run
                        with `npm start` in that folder; Node 20.12+). It is
                        STATEFUL: submissions are stored in SQLite and emailed
                        by a background worker, so the request never waits for
                        SMTP and nothing is lost when SMTP is down.
  index.js            — the HTTP layer: POST /api/contact + GET /api/health,
                        CORS allowlist, and the order the checks run in
                        (abuse ceiling → honeypot → shared validation → email
                        verification → message limit → spam score → INSERT).
  config.js           — every environment variable, read and validated once at
                        boot. Nothing else reads process.env.
  db.js               — the SQLite connection, the schema (migrations gated by
                        PRAGMA user_version — append, never edit) and every
                        prepared statement. The `submissions` table doubles as
                        the send queue: `status` is the job state.
  queue.js            — the send worker. Claims a due row atomically, sends it,
                        retries with backoff (1m→6h), then marks it 'failed'.
  mailer.js           — the SMTP transport and the message it builds. Strips
                        CR/LF from anything reaching a mail header.
  emailCheck.js       — syntax → disposable blocklist → MX lookup. Fails OPEN
                        on DNS trouble, closed only on a definitive answer.
  disposableDomains.js— the throwaway-mailbox blocklist; append to it.
  spam.js             — content heuristics and the score. At/above the
                        threshold a submission is HELD: stored, flagged, never
                        emailed, and the sender still gets a 200.
  rateLimit.js        — three budgets counted in the database (requests per IP,
                        stored messages per IP, stored messages per address)
                        plus the retention prune.
  scripts/
    submissions.js    — read the collected submissions from a shell
                        (`npm run submissions`). Deliberately a CLI and not an
                        admin route: the rows hold personal data and IPs.
  data/contact.db     — the SQLite file (gitignored; in Docker it lives on the
                        named volume `contact-data` instead).
  .env                — every var it needs (SMTP creds, ALLOWED_ORIGINS,
                        MAIL_TO, the tunables). Gitignored, so it stays on the
                        machine that runs the service and never reaches the
                        repo. Optional — Docker passes the same vars directly.
  README.md           — the flow, the database, the API table, abuse handling,
                        every env var, deployment shapes.

src/
  main.jsx            — ReactDOM root; wraps App in BrowserRouter + LanguageProvider
  App.jsx             — route table (/, /cafe, /shop, /business, /about,
                        /contact) + global chrome
                         (Navbar, Footer, ChatLauncher — the floating button).
                         Nav order (data/site.js navLinks): Home → The Name
                         Shop → Business → Cafe → About → Contact, all
                         plain links. The footer is only the yellow logo,
                         the social links and the copyright line, on
                         --gradient-footer (brownish black).

  pages/<PageName>/   — one folder per route
    <PageName>.jsx     — the page component
    <PageName>.css     — page-specific layout (uses theme.css tokens, never
                         hardcodes a color/font)
    <Part>.jsx         — a piece used by that page only stays in its folder
                         (currently none). Anything a second page needs
                         moves to components/ instead — as the bubbles did,
                         from Home/FoodBubbles.jsx to components/Bubbles/,
                         once the Cafe page wanted them too.
    data.js            — STRUCTURAL data only for that page: ids, ordering,
                         numeric prices, x/y coordinates, route targets.
                         Never display copy — see i18n/ below.
                         (Contact's is the one exception to "owns its data":
                         it re-exports `shared/contactForm.js`, because the
                         server validates against the same rules.)

  components/         — shared UI building blocks used by 2+ pages
    <Name>.jsx + <Name>.css       — simple components stay as flat files
    <Name>/<Name>.jsx + .css      — a component gets its own folder once it
                                    has real internal complexity. Parts used
                                    by only that component live in its folder
                                    too (e.g. Footer/SocialLinks.jsx).
                                    Currently:
      Navbar/, Footer/
    Logo.jsx          — the brand lockup as a <picture>: main lockup, swapped
                        for the compact secondary one at ≤480px. `on` is the
                        ground it sits on — 'light' (navbar) → charcoal
                        artwork, 'dark' (footer) → yellow artwork — so the
                        ink always contrasts. Files from media.brand.logos.
      PackagesPanel/  — packages table + direct-line panel: Cafe (events)
                        and Business (catering).
      OverlayCard/    — the frosted card (full-bleed 3:4 photo, chips over
                        it, glass panel with a round yellow action): Shop
                        catalogue and Cafe menu. Also exports
                        OverlayCardArrow for link actions.
      LogoMarquee/    — rolling, looping logo strip; a missing logo file
                        shows the name as a wordmark: Home (partner brands)
                        and Cafe (delivery partners, commented out).
      Bubbles/        — drifting, poppable bubble field + icons.jsx (icon
                        sets: shopIcons for Home, foodIcons for Cafe). Each
                        set also holds one BRAND_MARK entry, drawn as the
                        outline N mark (media.brand.markOutline) on a
                        near-white skin. Takes `scale` (Cafe uses 3). The parent needs the
                        `bubbles-host` class, which anchors and clips the
                        field and lifts page content above it.
      ProcessSteps/   — the four order steps as an <ol> (data/process.js,
                        copy under i18n process.steps): Home and About.
      ChatLauncher/   — the floating corner button (App.jsx), fixed
                        bottom-right with its own centring rules (not .btn)
                        and the filled N tile (media.brand.markFilled)
                        cropped to the circle. Opens a
                        .popover with two options — the on-site assistant
                        (Chatbot.jsx) or WhatsApp. The assistant is
                        rule-based, no server/AI: quick-reply topics from
                        data/chatbot.js, free text matched against each
                        topic's i18n keywords (active language + English),
                        unmatched questions handed to WhatsApp. icons.jsx
                        holds its line icons.
    WhatsAppButton.jsx — the only WhatsApp link component (the old floating
                        WhatsAppFab is now ChatLauncher). `iconOnly`
                        renders just the icon with `children` as the
                        aria-label (the Cafe card action).

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
                          photography still needed. `brand` holds The
                          Name's own artwork (logos in two inks, the N mark).
    catalogue.js        — the shop catalogue: curated objects we
                          personalise (partner brands Lexon, Lund London,
                          Pantone, Korin, Kreafunk and Gingko, plus house
                          pieces). Holds code,
                          category key, brand name and `methods` — keys
                          of Home's `customMethods`, so method names are
                          read from i18n home.howItWorks.methods rather
                          than repeated under shop. Read by the Shop page
                          alone. Display text lives in i18n under
                          shop.items[code].

    brands.js           — the partner brands (id, name, url, optional
                          logoScale): Lexon, Lund London, Pantone, Korin,
                          Kreafunk, Gingko. Proper nouns, so not in i18n.
                          Read by the Home logo strip and by catalogue.js —
                          one spelling per brand. `logoScale` enlarges one
                          logo's slot in LogoMarquee so tall/stacked marks
                          (Gingko, Lund) don't look small beside wordmarks.
    bubbles.js          — the bubble layouts (sideBubbles, rowBubbles):
                          positions/sizes/timing only, no icons, so Home and
                          Cafe share them with different icon sets.
    process.js          — the four order steps (id, num), shared by Home
                          and About through components/ProcessSteps.
    chatbot.js          — the assistant's topics and what each answer adds
                          (a page link, a WhatsApp hand-off, or the list of
                          customization methods read from home.howItWorks).

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
                          Top-level keys are one per page (`home`, `cafe`,
                          `shop`, `business`, `about`, `contact`) plus `nav`,
                          `footer`, `common`, and the shared-component keys:
                          `packages` (PackagesPanel), `process`
                          (ProcessSteps) and `chat` (ChatLauncher + the
                          assistant's topics, answers and keywords).

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
                          shared component classes (.btn* incl. .btn-light
                          for dark/coloured grounds and .btn-sparkle — the
                          flowing panel gradient with a sweep and twinkling
                          sparkles, used instead of .btn-primary on the Home
                          hero's shop CTA — .card, .tag, .seg*,
                          .seg-grid, .popover/.popover-option for floating
                          menus, .table, .dialog, .carousel-*) and the shared
                          keyframes (pulse, kenburns, sparkle-sweep,
                          sparkle-twinkle, gradient-flow — pair the last with
                          --gradient-panel-flow at background-size 200%).
                          Fonts: --font-heading, --font-body and
                          --font-script (Artisoul Signature, a licensed face
                          loaded by the @font-face at the top from
                          public/fonts/artisoul-signature.woff2 or .otf —
                          the file has to be added; system script fallbacks
                          until then). Gradients: --gradient-panel
                          (the guideline's orange→gold panel, built from the
                          --color-panel-* stops), --gradient-panel-flow (its
                          seamless moving tile), --gradient-footer (--color-ink
                          → --color-brown-*). --color-whatsapp is the one
                          third-party brand colour, for its own mark only. A page/
                          component CSS file should only ever add layout
                          rules that are specific to it — a rule used by
                          2+ files belongs here instead (see DRY below).
```

## Docker

The root also holds the container setup. Nothing in `src/` or `server/`
knows about it — it only packages what `npm run build` and `node index.js`
already produce.

```
Dockerfile            — the site: stage 1 runs `npm run build`, stage 2 serves
                        dist/ with nginx. VITE_CONTACT_ENDPOINT is a build ARG
                        (Vite bakes it in) — leave it empty for same-origin.
nginx.conf            — served as a TEMPLATE (${CONTACT_UPSTREAM} is filled in
                        at container start, so the API host can change without
                        a rebuild). SPA fallback to index.html, /assets/ cached
                        forever, /media/ a day, /api/ proxied to the service.
server/Dockerfile     — the contact service. MUST be built from the repo root
                        (`docker build -f server/Dockerfile .`): index.js
                        imports ../shared/ and ../src/data/site.js. Runs
                        `node index.js`, not `npm start` — there is no .env in
                        the image, config comes from the environment.
docker-compose.yml    — both services on one network: `web` (nginx, published
                        on WEB_PORT) proxying /api/ to `contact`, which it
                        waits on via its healthcheck. The contact service is
                        STATEFUL — its SQLite database lives on the named
                        volume `contact-data` at /app/data. That volume is the
                        thing to back up; losing it loses every submission.
.env.example          — every var compose needs; copy to `.env` (gitignored).
.dockerignore         — keeps node_modules/, dist/, .git/ and .env out of the
                        build context.
```

    cp .env.example .env      # fill in the SMTP credentials
    docker compose up --build # → http://localhost:8080

One gotcha worth knowing: a browser sends an `Origin` header on POST even
same-origin, and the service 403s any origin missing from `ALLOWED_ORIGINS`.
Compose defaults it to `http://localhost:<WEB_PORT>`; set it to the real
origin in production.

## Media files

Artwork lives in `public/media/` (served as-is by Vite, so no import step):

```
public/media/
  hero/       — home hero: the customization reel (engraving, printing,
                finished gifts), no longer a restaurant service shot
  services/   — the four Home service rows
  methods/    — close-ups of each customization technique (engraving,
                print, embroidery, emboss) for the Home "how it works" panel
  menu/       — cafe menu dishes
  shop/       — the shop's products, named by product code
  cafe/       — the events section on the Cafe page
  business/   — the branded-goods offer cards + the catering section
  brands/     — partner-brand logos for the Home strip, named in
                data/media.js `brands`: lexon.svg, pantone.svg,
                lund-london.png, korin.png, kreafunk.png, gingko.png. Copied
                from each brand's site and stored locally (their CDN paths
                are versioned). gingko.png is the brand's white-on-black logo
                converted to dark ink on transparency. A missing file makes
                the strip fall back to the brand name as a wordmark.
  partners/   — reserved for delivery-partner logos. Currently empty: the
                Cafe logo strip (commented out for now) hot-links talabat's
                and noon's own CDN URLs (see data/media.js `partners`) so a
                rebrand on their side appears automatically. Drop a file
                here and repoint that entry to pin an asset locally instead.
  brand/      — The Name's own artwork, cropped to the artwork's edges
                from the 500×500 guideline exports (the originals sit
                untracked at the repo root):
                  logo-main-dark.png / logo-main-yellow.png
                  logo-secondary-dark.png / logo-secondary-yellow.png
                    — the lockups in charcoal (light grounds) and yellow
                      (dark grounds); see components/Logo.jsx
                  mark-outline.png — the outline N tile (one bubble per set)
                  mark-filled.png  — the filled N tile (chat button, tab icon)
                Also `footer-pattern.svg`, the guideline's hand-drawn line
                texture — kept, but not referenced anywhere.
```

`src/data/media.js` already points at the expected filename for every slot.
Saving a file under that name is all that's needed — no code change. Until it
exists the request simply fails and `<ImagePlaceholder>` shows its dashed
placeholder instead, so partially-supplied media degrades cleanly.

## Current pages

| Route | Folder | Notes |
|---|---|---|
| `/` | `pages/Home/` | Customization-led. Hero (the title in two lines — i18n `home.hero.titleLead`, then `titleScript` under it in --font-script; the "Browse the products" CTA is `.btn-sparkle`), `LogoMarquee` of the partner brands (`data/brands.js`, no heading), 4 services in business order — B2C gifts, B2B branding, cafe, catering — (with the `Bubbles` ornament in shop icons plus the N mark: gutter fields above 1280px, left-to-right bands between the rows below it; tapping a bubble pops it with a Web Audio blip; hidden under `prefers-reduced-motion`), then "how it works": `ProcessSteps` plus a picker of customization methods (`customMethods` in `data.js`, copy under `i18n` home.howItWorks) |
| `/cafe` | `pages/Cafe/` | Title block, then the delivery-partner `LogoMarquee` — **commented out** for now (ids/URLs in this page's `data.js`, names under i18n cafe.partners) — then the menu (List/Cards toggle; cards are `OverlayCard` with tag + price chips and an icon-only WhatsApp action; autoplaying carousels, 3 sections). Food `Bubbles` (plus the N mark) at 3× scale fill the gutters on wide screens (no narrow-screen bands). Plus the **events** section at its foot — nights held in our own room, rendered by `PackagesPanel`. Was `pages/Menu/`. |
| `/shop` | `pages/Shop/` | Labelled "The Name Shop" in the nav. "Make It Personal" — curated objects from partner brands and house pieces that take a name, initials or a logo. Category filters (drinkware / tech / desk / travel / gift sets), List/Cards toggle, autoplaying carousel. Cards are the shared `OverlayCard` (methods + code chips, brand kicker, finish · lead meta, arrow link). The list view keeps the longer note. Was `pages/VertexPieces/` (an interiors showroom) before the customization pivot. |
| `/business` | `pages/Business/` | B2B: branded-goods offer cards, account terms, and the **catering** section (off-site work), rendered by `PackagesPanel`. |
| `/about` | `pages/About/` | Story (from the brand positioning doc), the services we provide (`aboutServices` in `data.js`; the curated-brands one lists `data/brands.js`), how we provide them (`ProcessSteps` + the customization method names), mission & vision side by side (`purposeIds`), and a contact / WhatsApp call to action. Copy under i18n `about`. |
| `/contact` | `pages/Contact/` | Enquiry form (name/email/phone/message) + hidden honeypot + a fill timer (`timingField`, a ref set when the form renders — the server reads the gap as a bot signal). POSTs to `VITE_CONTACT_ENDPOINT` or same-origin `/api/contact`, which `server/` stores and a worker emails to `site.email`. Validation rules come from `shared/contactForm.js`; a 400 carries `fieldKeys` the page translates through `contact.errors.*`. States are idle / sending / sent / failed / rateLimited. |

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
     the Menu and VertexPieces pages (now Cafe and Shop) → extracted to
     `components/ViewToggle.jsx` and
     the shared `.view-toggle-opt` rule moved into `theme.css`.
   - The scrolling card track, its ref plumbing and its prev/next arrows
     were assembled separately on both pages → folded into one
     `components/Carousel.jsx` that owns the track and its side arrows, so
     pages just pass the cards as children.
   - The packages table + "direct line" WhatsApp panel lived on the old
     CateringEvents page. When that page was split — events onto Cafe,
     catering onto Business — the shared markup went to
     `components/PackagesPanel/` rather than being copied into both.
   - The Shop's frosted card, Home's logo strip and Home's bubble field
     were each wanted on the Cafe page too → `components/OverlayCard/`,
     `components/LogoMarquee/` and `components/Bubbles/` (with the layouts
     in `data/bubbles.js`), instead of second copies.
   - The order steps were wanted on the new About page → extracted from
     Home into `components/ProcessSteps/` (steps copy moved from
     home.howItWorks.steps to the shared `process.steps`). The chat
     launcher's option menu reuses the language switcher's look, so that
     look became the shared `.popover` / `.popover-option` classes.
   Grep for similar class names / JSX shapes before adding a second copy of
   anything; if 2+ places need the same thing, extract it into
   `components/`, `utils/`, or a shared token in `theme.css` instead of
   copy-pasting.
4. **New page = new folder** under `pages/`, following the existing
   `<PageName>/<PageName>.jsx` + `.css` (+ `data.js` if it has structured
   content) shape. Add the route in `App.jsx`, the nav entry (`to`/`key`) in
   `data/site.js`, and the `nav.<key>` label in all 4 translation files.
5. **A rule the server also enforces lives in `shared/`.** Anything the
   browser checks that the backend must re-check (today: the contact form's
   fields and validation) belongs in `shared/`, imported by both — never
   written out twice. That is the only reason `server/` reaches outside its
   own folder, so deploy it from the repo root rather than copying the
   folder alone.
6. **`index.html` is the Vite entry shell, not a page.** It only holds
   `<head>` metadata (fonts, title) and the `#root` div + script tag — it
   cannot be removed while this is a Vite SPA. Page content changes never
   touch this file; only global `<head>` changes (fonts, meta tags) do.
