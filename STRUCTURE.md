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
                        Imported by BOTH the React form
                        (components/ContactForm/) and server/index.js, so the
                        browser and the server can never validate by different
                        rules. Structural only — it returns error KEYS, and
                        each side turns them into its own copy.

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
  App.jsx             — route table (/, /kids, /shop, /business, /about)
                        + global chrome
                         (Navbar, Footer, ChatLauncher — the floating button).
                         Nav order (data/site.js navLinks): Home → The Name
                         Store → Business → Kids → About, all plain links.
                         /cafe is PARKED, not deleted — its import and route
                         are commented out here, its nav entry in
                         data/site.js, its chat topic in data/chatbot.js and
                         its About service entry in pages/About/data.js. The
                         page, its data and all four translations survive
                         intact; uncomment those five spots to restore it.
                         /contact is gone for good — the enquiry form moved
                         to the foot of /about as components/ContactForm/.
                         The footer is only the yellow logo, the social
                         links and the copyright line, on --gradient-footer
                         (brownish black).

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

  components/         — shared UI building blocks used by 2+ pages
    <Name>.jsx + <Name>.css       — simple components stay as flat files
    <Name>/<Name>.jsx + .css      — a component gets its own folder once it
                                    has real internal complexity. Parts used
                                    by only that component live in its folder
                                    too (e.g. Footer/SocialLinks.jsx).
                                    Currently:
      Navbar/         — the sticky top bar. It renders the pages and the
                        LanguageSwitcher ONCE, inside `.navbar-menu`: above
                        860px that wrapper is `display: contents`, so they lay
                        out as direct children of the bar (the desktop row);
                        at or below 860px it becomes a translucent dropdown
                        under a stack (hamburger) toggle, and the bar is a
                        single row of logo + toggle at every width. The panel
                        is `position: absolute` and there is NO scrim — the
                        bar's backdrop-filter would trap a fixed overlay
                        inside it (see LanguageSwitcher.jsx below), so the
                        menu closes on Escape, on a route change, and on a
                        pointerdown outside the bar. That same backdrop root
                        makes a backdrop-filter on the panel a no-op, which is
                        why the panel is translucent but not blurred.
      Footer/
    LanguageSwitcher.jsx
                      — the language menu in the navbar. Its menu and scrim
                        are rendered in a PORTAL on <body> and positioned from
                        the trigger's getBoundingClientRect(), clamped into the
                        viewport on BOTH edges — which needs the menu's real
                        width, so it is measured via a ref and re-placed in a
                        useLayoutEffect (pre-paint, so nothing jumps). Clamping
                        only the anchored edge is NOT enough: at 320–360px the
                        longer French nav labels wrap the switcher onto its own
                        row where it sits at the left, and a right-anchored menu
                        then ran off the left of the screen (measured
                        left = -121px at vw 352). This is load-bearing, not
                        style: `.navbar`
                        has `backdrop-filter`, and a backdrop-filter element
                        becomes the containing block for `position: fixed`
                        descendants and opens its own stacking context — so in
                        place, the scrim's `inset: 0` covered only the bar and
                        the menu's z-index could not escape the bar's. Both
                        showed up on mobile, back when `.nav` wrapped to two
                        rows there; the bar is one row at every width now that
                        the pages fold into Navbar's dropdown, but the
                        containing-block trap is unchanged and the switcher
                        still has to portal out of the bar — from inside the
                        dropdown as much as from the desktop row. Measuring
                        from the trigger also fixes the menu
                        drifting as nav labels change width between languages.
                        DO NOT give the menu or scrim a plain CSS position
                        again, and beware of adding `position: fixed` children
                        anywhere inside `.navbar` for the same reason.
    Logo.jsx          — the brand lockup as a <picture>: main lockup, swapped
                        for the compact secondary one at ≤480px. `on` is the
                        ground it sits on — 'light' (navbar) → charcoal
                        artwork, 'dark' (footer) → yellow artwork — so the
                        ink always contrasts. Files from media.brand.logos.
                        Two props for setting it INSIDE a line of text, both
                        used by the Home hero and nowhere else:
                        `compact={false}` drops the ≤480px swap (the secondary
                        N alone does not read as the brand's name mid-
                        sentence), and `size="inline"` sizes it off the
                        surrounding font-size onto the text baseline instead
                        of a fixed pixel height — see the comment in Logo.css
                        for why that height is 1.11em and not the cap height.
      ContactForm/    — the enquiry form plus the email/phone details beside
                        it. This WAS the /contact page; when the form moved
                        to the foot of About it became a component, so the
                        host page owns the surrounding layout and its
                        heading is an <h2> (About already has the <h1>).
                        Imports shared/contactForm.js directly and POSTs to
                        VITE_CONTACT_ENDPOINT or same-origin /api/contact.
                        Its copy still lives under the i18n `contact` key.
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
                        unmatched questions handed to WhatsApp. The answer is
                        held back by REPLY_DELAY_MS behind a typing indicator
                        (the bot bubble with three dots). The `pending` flag
                        that drives it is ALSO the spam guard — while it is
                        set the quick replies and the send button are
                        disabled, so one timer runs at a time and a burst of
                        taps cannot race them or flood the log. Its timeout is
                        cleared on unmount, because ChatLauncher unmounts the
                        panel on close. Note there is no backend to protect
                        here: every answer is local i18n copy. icons.jsx
                        holds its line icons.
                        Beside the button, `.chat-launcher-nudge` — a speech
                        bubble (i18n chat.nudge) that appears after
                        NUDGE_DELAY_MS (30s), points at the button with a
                        CSS-triangle tail, and on click opens the menu and
                        goes for good. Opening the launcher any other way
                        cancels it too, so it never asks a question the
                        visitor has already answered. The timer is per PAGE
                        LOAD, not per page viewed — the launcher sits outside
                        <main> in App.jsx, so navigating does not remount it.
                        It is positioned physically (right/bottom), like the
                        button, so both stay in the same corner under RTL.
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
                          shop.items[code]. Gift sets are NOT one of the
                          `filterKeys` — they have their own section on the
                          Shop page, so this file also exports `giftSets`
                          and `pieces` (the catalogue split on
                          `giftSetKey`); the filter grid reads `pieces` and
                          the gift-set section reads `giftSets`.

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
                          `kids`, `shop`, `business`, `about`) plus
                          `contact` — which is now the ContactForm
                          component's copy rather than a page's — `nav`,
                          `footer`, `common`, and the shared-component keys:
                          `packages` (PackagesPanel), `process`
                          (ProcessSteps) and `chat` (ChatLauncher + the
                          assistant's topics, answers and keywords).

  hooks/useCarouselAutoplay.js — global effect that auto-advances every
                          `.carousel-track` on screen every 4.2s.
  hooks/useScrollToTop.js — global effect that puts each new page at the top
                          on navigation; React Router keeps the window's
                          scroll offset otherwise, so a link followed from the
                          foot of one page lands part-way down the next. It
                          watches the PATHNAME only — an in-page anchor (the
                          `#contact` button at the foot of About) changes the
                          hash, not the path, and must be left to the browser.
                          The fade that goes with it is `.page-enter` in
                          theme.css, replayed by the `key` on <main>.
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
                          --gradient-panel-flow at background-size 200% — and
                          page-enter, the route-change fade carried by the
                          .page-enter class on <main>; App.jsx keys <main> on
                          the pathname so it replays on every navigation, and
                          hooks/useScrollToTop.js puts the new page at the top
                          first. Its transform settles at `none`, so it never
                          becomes a lasting containing block for a fixed-
                          position descendant — do not make it permanent).
                          Fonts: three faces and NO others —
                          --font-heading (Book Antiqua), --font-body
                          (Montserrat) and --font-script (Allura). Do not
                          add a fourth. Montserrat and Allura both load
                          from Google Fonts (linked in index.html), so they
                          render as drawn everywhere. Allura replaces the
                          brand guideline's (p.14) Artisoul Signature,
                          which is licensed, on no CDN, and so only ever
                          rendered on machines that happened to have it
                          installed. Book Antiqua is the one licensed face
                          left: theme.css declares @font-face rules at the
                          top that try the visitor's locally installed copy
                          first and then a self-hosted file. THOSE FILES
                          ARE NOT IN THE REPO — public/fonts/ holds only
                          .gitkeep — so on any machine without Book Antiqua
                          installed the fallback chain takes over and
                          headings render as Georgia. Saving
                          book-antiqua.woff2 and book-antiqua-bold.woff2
                          into public/fonts/ is the entire fix; no code
                          change is needed. Gradients: --gradient-panel
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
  kids/       — the Kids page: hero.jpg, plus one image per offer block
                (back-to-school.jpg, new-baby.jpg, birthdays.jpg)
  about/      — the About page's brand film: about-video.mp4 and its still
                about-video-poster.jpg. Until they exist the section shows
                the dashed placeholder slot.
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
                      (dark grounds); see components/Logo.jsx. The
                      "YOUR SOCIAL HUB" tagline was cropped out of all four
                      in Sept 2026 (it sat under the main wordmark and beside
                      the secondary N), so they are wordmark-only now. The
                      untracked repo-root originals still have it — re-crop
                      rather than re-export if these are ever regenerated.
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
| `/` | `pages/Home/` | Customization-led. Hero (the title in two lines — the first is i18n `home.hero.titleLeadPrefix` followed by the `Logo` component standing in for the brand's name: it is the brand, so it is artwork and is never translated, and the prefix holds only the word(s) in front of it since the lockup reads "THE NAME", article included. Then `titleScript` under it in --font-script; the "Browse the products" CTA is `.btn-sparkle`, beside it a plain `<a>` to the Matterport 3D walkthrough — an external tour, so not a router Link), `LogoMarquee` of the partner brands (`data/brands.js`, no heading), 2 services — B2C gifts, B2B branding; the cafe and catering rows were removed — (with the `Bubbles` ornament in shop icons plus the N mark: gutter fields above 1280px, left-to-right bands between the rows below it; tapping a bubble pops it with a Web Audio blip; hidden under `prefers-reduced-motion`), then "how it works": `ProcessSteps` plus a picker of customization methods (`customMethods` in `data.js`, copy under `i18n` home.howItWorks) |
| `/cafe` | `pages/Cafe/` | **PARKED — no route, no nav entry** (see App.jsx above); the folder and its copy are kept so it can be switched back on. Title block, then the delivery-partner `LogoMarquee` — **commented out** for now (ids/URLs in this page's `data.js`, names under i18n cafe.partners) — then the menu (List/Cards toggle; cards are `OverlayCard` with tag + price chips and an icon-only WhatsApp action; autoplaying carousels, 3 sections). Food `Bubbles` (plus the N mark) at 3× scale fill the gutters on wide screens (no narrow-screen bands). Plus the **events** section at its foot — nights held in our own room, rendered by `PackagesPanel`. Was `pages/Menu/`. |
| `/shop` | `pages/Shop/` | Labelled "The Name Store" in the nav. "Make It Personal" — curated objects from partner brands and house pieces that take a name, initials or a logo. Category filters (drinkware / tech / desk / travel), List/Cards toggle, autoplaying carousel. **Gift sets are not a filter** — they have their own section below the catalogue, a picture grid of `OverlayCard`s on the pale accent band (`shop.giftSets` copy, `giftSets` from `data/catalogue.js`). Cards are the shared `OverlayCard` (methods + code chips, brand kicker, finish · lead meta, arrow link). The list view keeps the longer note. Was `pages/VertexPieces/` (an interiors showroom) before the customization pivot. |
| `/business` | `pages/Business/` | B2B: branded-goods offer cards, account terms, and the **catering** section ("at your address"), rendered by `PackagesPanel`. The off-site event-catering row was removed from `cateringPackageIds` and from all four translations. |
| `/kids` | `pages/Kids/` | A landing page, not a catalogue: hero (shop + WhatsApp CTAs), three offer blocks from `kidsOffers` in `data.js` (back to school / new baby / birthdays), a "how we make them" note on the accent band, and a closing CTA. Copy under i18n `kids`. Took the nav slot the cafe page had. |
| `/about` | `pages/About/` | Labelled just "About" in the nav. Currently **two sections only**: the brand-film section at the top (carries the page's `<h1>`; `<ImagePlaceholder>` on `media.about.videoPoster` at 16/9 with a decorative play badge over it, and a commented-out `<video>` beside it showing the swap once the film exists — copy under i18n `about.video`), then the **enquiry form** (`components/ContactForm/`) in a `#contact` section. Everything between them — hero, services (`aboutServices`), how-we-work (`ProcessSteps`), mission & vision (`purposeIds`) and the closing CTA — is **PARKED in one JSX comment** in About.jsx, with its imports commented at the top of the file. Note the inner comments inside that block are written as plain dashed lines, not `{/* */}`: a nested end-of-comment marker would close the block early and break the build. Restoring it is deleting the two comment markers and uncommenting the imports; the i18n keys and the CSS for those sections were left untouched. |

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
   - The enquiry form outlived its page: when /contact was folded into the
     foot of /about, the form became `components/ContactForm/` rather than
     being pasted into About.jsx, so the page owns only its layout.
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
7. **Never size anything with `dvh`.** `dvh` is the *dynamic* viewport unit:
   it is specified to track the browser chrome, so on mobile it changes on
   every address-bar show/hide and reflows the page mid-scroll. This bit the
   Home hero (`height: calc(100dvh - var(--navbar-h))`) and the chat panel,
   and it resized the whole site while scrolling. Use **`svh`** for anything
   meant to fill the screen — it is the height with the chrome *visible*, so
   the content fits in the worst case and never moves — and pair it with a
   plain `vh` line above it as the fallback for older engines. `vh`, `svh` and
   `lvh` are all stable during scroll; only `dvh` moves. Percentage heights
   (`html, body { height: 100% }`) resolve against the initial containing
   block and are stable too.
