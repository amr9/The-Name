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

scripts/              — build-time tools, run by hand, never imported by the
                        site. Today one:
  import-store-categories.mjs
                      — fills in each product's `cats` AND its `url` by
                        reading the LIVE
                        store at store.thename.ae. The spreadsheet export
                        leaves the category column empty, so the categories
                        cannot come from the same place the products do; the
                        shop does know them, so this walks its ten category
                        pages (21 products a page — it ignores ?ppg=, so pages
                        are followed until one comes back short), matches each
                        listing back to a row by NAME, and writes the array.
                        Both sides of that match run through the same fold, so
                        an accent or an HTML entity only has to be handled
                        consistently rather than correctly. Run it AFTER
                        import-store-products.mjs, which creates the rows.
                        It reads BOTH facts off the same anchor — the tile's
                        image link carries the exact name in `title` and the
                        product's page in `href` — so the two can never be
                        paired wrongly. That href (/shop/<category>/<slug>-<id>)
                        cannot be derived from the spreadsheet: the trailing id
                        is the store's own.
                        188 of 192 match; the four that do not are filed under
                        no category on the store either, and fall back to the
                        shop front via `productUrl`. It prints anything it
                        could not match rather than guessing.
  import-store-products.mjs
                      — regenerates data/storeProducts.js and the pictures in
                        public/media/store/ from the Odoo export
                        `Product (product.template).xlsx` at the repo root:
                        `node scripts/import-store-products.mjs [file.xlsx]`.
                        Reads the .xlsx as the zip of XML it is, so there is
                        nothing to install. It reports what the export is
                        missing — rows with no usable picture, and whether the
                        category column is filled — so a bad export is visible
                        rather than silent. Re-run it after every re-export;
                        do not hand-edit its output. Its pictures are the
                        sheet's 128px thumbnails and are OVERWRITTEN by
                        import-store-images.mjs below — which is why that one
                        runs last.
  import-store-images.mjs
                      — replaces those thumbnails with the store's ORIGINAL
                        photographs: `node scripts/import-store-images.mjs`.
                        Odoo serves an upload at
                        /web/image/product.template/<store id>/image_1920, and
                        the store id is already in the repo — it is the
                        trailing number on the `url` the category script
                        writes — so nothing extra is scraped to find it.
                        This is what fixed the pixelated Shop cards: 85x128
                        thumbnails behind a ~350px card, upscaled about four
                        times. They are now 600x900 or larger (4.4MB for the
                        folder, all lazy-loaded).
                        It also closed the gap: the export carried a 74-byte
                        blob for 34 rows and the store had a real photo for 30
                        of them. So `image: false` now means "the store has no
                        picture either", not "the spreadsheet cell was empty",
                        and only 4 rows keep it — the same 4 the category
                        script cannot match, so there is no id to fetch.
                        Odoo answers EVERY id, handing back a fixed 6078-byte
                        "no image" PNG rather than a 404, so the script
                        recognises that placeholder by md5 rather than
                        trusting the HTTP status. It sweeps orphaned files
                        afterwards, so the folder holds exactly what the data
                        claims.
                        RUN ORDER is products -> categories -> images, and it
                        matters both ways: this needs the `url` the category
                        script writes, and re-running the product script
                        resets the `image` flags this one rewrote.

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
  App.jsx             — route table (/, /store, /brands, /corporate-gifts,
                        /agency, /events, /about,
                        and `*`; /policies is PARKED — its import and route
                        are commented out; /customize is only a redirect
                        to /#customize, the Home section it became)
                        + global chrome
                         (Navbar, Footer, ChatLauncher — the floating button).
                         PAGE URLS come from `routes` in data/site.js and
                         spell the navbar name: /store, /brands,
                         /corporate-gifts, /agency, /events, /about (Home
                         is /). /events renders pages/Kids/ — the Kids page
                         renamed Events; its files, CSS classes and i18n
                         `kids` copy keep the old name.
                         Every link, route and chatbot hand-off reads
                         `routes`, never a typed path. The old /shop,
                         /business and /kids redirect to the new ones.
                         Nav order (data/site.js navLinks): Home → Store →
                         Brands → Corporate Gifts → Agency → Events → About.
                         Labels are i18n `nav`, printed in CAPITALS by CSS
                         (text-transform in Navbar.css and Footer.css) — the
                         copy itself stays in normal case. The SAME navLinks list, with the same
                         labels, drives the footer's Useful Links and the 404
                         page, so the three never disagree. (Customize Yours
                         left the nav when it became a Home section.)
                         Business is the
                         one emphasised entry (`highlight: true`); the rest
                         are plain.
                         /policies is NOT in the bar, and the footer's policy
                         list was dropped in the footer redesign (Terms &
                         Privacy will link to the store's own pages), so
                         nothing links to it. `policySections` in
                         data/site.js is kept for that.
                         /cafe is PARKED, not deleted — its import and route
                         are commented out here, its nav entry in
                         data/site.js, its chat topic in data/chatbot.js and
                         its About service entry in pages/About/data.js. The
                         page, its data and both translations survive
                         intact; uncomment those five spots to restore it.
                         /contact is gone for good — the enquiry form moved
                         to the foot of /about as components/ContactForm/.
                         The LAST route is `*` -> pages/NotFound/, the custom
                         404. Every path that matches nothing lands there,
                         including the ones that used to work: /contact and
                         /cafe. nginx.conf already falls back to index.html for
                         any unmatched path, so a deep link reaches this page
                         rather than nginx's own error page — check that
                         `location /` block before changing the hosting.
                         The footer is only the yellow logo, the social
                         links and the copyright line, on --gradient-footer
                         (charcoal, darker to the right; no brown).

  pages/lazyPageStyles.js
                      — LAZY LOADING. Every page except Home is
                        `React.lazy` in App.jsx (its JS chunk is fetched on
                        first visit, under a <Suspense> whose fallback is a
                        100vh `.page-loading` block so the footer does not
                        jump up). Their CSS is NOT lazy: this file imports it
                        up front, at the spot App.jsx used to import the
                        pages. A lazy chunk's CSS lands AFTER theme.css and
                        flips every equal-specificity tie with it — measured
                        at 514 computed-style differences (404 column 677 ->
                        1240px, About title's -2.4px nudge lost, Events card
                        gaps) — while with this file a full computed-style
                        diff of every page at 1440 and 390px is ZERO. Keep
                        its import order in sync when a lazy page is added
                        or starts using a new component stylesheet.
  pages/<PageName>/   — one folder per route
    <PageName>.jsx     — the page component
    <PageName>.css     — page-specific layout (uses theme.css tokens, never
                         hardcodes a color/font)
    <Part>.jsx         — a piece used by that page only stays in its folder.
                         Currently just Kids/Doodles.jsx (the hand-drawn
                         flower and sun on the Kids note and Two T's sections — used twice,
                         but by the one page). Anything a SECOND PAGE needs
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
                        700px that wrapper is `display: contents`, so they lay
                        out as direct children of the bar (the desktop row);
                        at or below 700px it becomes an opaque dropdown
                        under a stack (hamburger) toggle, and the bar is a
                        single row of logo + toggle at every width.
                        THREE tiers, not two: 801-1000px is a COMPRESSED
                        desktop row (--text-xs type, tighter pills and gap,
                        28px logo, smaller language trigger), because the full
                        row does not fit otherwise — French WAS the binding
                        case (French and Spanish have since been removed and the
                        bar is now seven uppercase links — the figures below are
                        historical; re-measure in EN/AR before tuning). These numbers MOVED when "Customize Yours" made
                        the bar six links: measured with it in place, FR needs
                        935px at full size (so no full row below ~971px) and
                        724px compressed (so none below ~760px). Hence 1000
                        and 800, each with 30-40px of slack. The compressed
                        query is bounded at BOTH ends so the dropdown below
                        801px keeps full-size type and logo. Re-measure ALL of
                        it if an entry is added or a label renamed: the sixth
                        link cost ~110px and pushed the hamburger breakpoint
                        up by 100px. The numbers are in Navbar.css. The panel
                        is `position: absolute` and there is NO scrim — the
                        bar's backdrop-filter would trap a fixed overlay
                        inside it (see LanguageSwitcher.jsx below), so the
                        menu closes on Escape, on a route change, and on a
                        pointerdown outside the bar. That same backdrop root
                        makes a backdrop-filter on the panel a no-op — with no
                        blur available to soften what shows through, the panel
                        is opaque rather than translucent.
      Footer/         — closes every page. Layout after the 3distica.com
                        footer, colours the site's own: a FULL-WIDTH band on
                        --gradient-footer holding the brand block (`lg` Logo
                        + SocialLinks) and three columns — Useful Links
                        (navLinks from data/site.js, i.e. exactly the navbar's
                        pages and i18n `nav` labels, in two
                        sub-columns of four rows; ALL three columns print in capitals with tight 2px row gaps; the email has no underline), Address
                        (`site.addressLines`, a Maps directions link) and Say
                        Hello (`site.helloEmail` + `site.helloPhone`, which is
                        a PLACEHOLDER and prints as plain text, not a tel:
                        link, while it contains x's) — then the copyright row
                        under a hairline. No Terms/Privacy links: those will
                        point at the store's policy pages. Brand block goes
                        above the columns below 1140px; one centred column
                        below 760px. Both were raised (from 980/700) when the
                        columns went uppercase: wider, unwrappable lines made
                        the page scroll sideways at 983-1102px and 705-733px.
                        Measured clean from 320 to 1440px in EN and AR.
        SocialLinks.jsx
                      — the footer's social icons, from `socials` in
                        data/site.js. An entry carries EITHER `url` (a real
                        profile → <a target="_blank">) or `to` (an in-app
                        <Link>), and the component picks the element from
                        that — there is no per-network special case in here.
                        Only INSTAGRAM is live. Facebook and TikTok have no
                        published account yet, so they carry `to:
                        '/social/<network>'`, paths no route matches, and land
                        on the custom 404 (which names the path and repeats
                        the navbar). They previously linked to facebook.com
                        and tiktok.com, which pushed a visitor off the site to
                        a network's home page. When the real handles arrive,
                        swap each `to` for a `url` in data/site.js — that is
                        the whole change.
    Flag.jsx          — the four language flags, drawn as inline SVG at a
                        3:2 viewBox: Union Jack (EN), UAE (AR), France, Spain.
                        Keyed by the LANGUAGE code, not a country, so there is
                        no flag field in i18n/languages.js to fall out of step.
                        NOT emoji on purpose — Windows ships no flag glyphs, so
                        "🇦🇪" renders there as the letters "AE". Used by
                        LanguageSwitcher (trigger + each option); the `.flag`
                        rule (rounding, hairline ring, flex: none) lives in
                        LanguageSwitcher.css as its only consumer's stylesheet.
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
                        The trigger shows the CURRENT language's `Flag` plus
                        its code (EN/AR) — it replaced a globe glyph,
                        which said "language can be changed" where the flag
                        says which one is being read. Each option is
                        flag + code + native name + tick. `MIN_W` in the JSX
                        and `min-width` in the CSS are the same number and
                        must be kept so: the first placement pass happens
                        before the menu exists to measure.
    TaglineArt.jsx    — the "From The Name, to your Name" lettering as one
                        <img> (media.brand.tagline). It is the Home hero's
                        <h1> and the About tagline card, so both show the
                        same art. Same image in every language; only the alt
                        is translated, built from i18n about.tagline
                        (fromPrefix + site.name + to). The caller sizes it
                        through `className`.
    Logo.jsx          — the brand lockup as a <picture>: main lockup, swapped
                        for the compact secondary one at ≤480px. `on` is the
                        ground it sits on — 'light' (navbar) → charcoal
                        artwork, 'dark' (footer) → yellow artwork — so the
                        ink always contrasts. Files from media.brand.logos.
                        Two props for setting it INSIDE a line of text,
                        currently used nowhere (the Home hero and About
                        tagline that used them now show TaglineArt):
                        `compact={false}` drops the ≤480px swap (the secondary
                        N alone does not read as the brand's name mid-
                        sentence), and `size="inline"` sizes it off the
                        surrounding font-size onto the text baseline instead
                        of a fixed pixel height — see the comment in Logo.css
                        for why that height is 1.11em and not the cap height.
      ContactForm/    — the enquiry form plus the contact details beside it,
                        and ContactSection.jsx: the whole #contact band
                        (cream, white form panel; `.contact-section` in
                        ContactForm.css). About AND the foot of Home both
                        render ContactSection, so they are one thing — edit
                        it once and both pages change. Never rebuild the band
                        on a page.
                        This WAS the /contact page; when the form moved to the
                        foot of About it became a component, so the host page
                        owns the surrounding layout and its heading is an <h2>
                        (About already has the <h1>).
                        Imports shared/contactForm.js directly and POSTs to
                        VITE_CONTACT_ENDPOINT or same-origin /api/contact.
                        Its copy still lives under the i18n `contact` key.
                        The details column is the site's ONLY copy of the
                        contact facts, since /policies lost its own contact
                        block: orders email, phone/WhatsApp, the separate
                        privacy email, the address, and the registered entity
                        + licence in small print under the WhatsApp button.
                        Do not thin it out without rehoming them.
                        The address is a link to `mapsLink` (data/site.js) —
                        a Google Maps DIRECTIONS url built by encoding
                        `site.address`, opened in the SAME tab (the site opens
                        no new tabs anywhere, so leaving it never looks like a
                        third-party program stepping in). Underlining is on the "Get directions" cue
                        only, not the address lines.
      PackagesPanel/  — packages table + direct-line panel: Cafe (events)
                        and Business (catering). Only `content.placeholder`
                        and `content.askFor` are required: `title`, `intro` and
                        the whole table (`packageIds` + `colOne` + `packages`)
                        are each dropped by leaving the key out. Business now
                        passes none of them, so it renders the image and the
                        direct-line panel alone; Cafe still shows the full
                        panel. The direct-line copy (`directLineKicker/Title`,
                        `openWhatsapp`, `replyNote`) is the SHARED i18n
                        `packages` block, so editing it changes both pages.
      OverlayCard/    — the frosted card (full-bleed 3:4 photo, chips over
                        it, glass panel with a round yellow action): Shop
                        catalogue and Cafe menu. Also exports
                        OverlayCardArrow for link actions.
      LogoMarquee/    — rolling, looping logo strip; a missing logo file
                        shows the name as a wordmark: Home (partner brands)
                        and Cafe (delivery partners) — both commented out.
      Bubbles/        — PARKED SITE-WIDE: every <Bubbles> and its imports
                        are commented out on Home and Kids (Cafe is parked
                        anyway). The component and data are kept.
                        Drifting, poppable bubble field + icons.jsx (icon
                        sets: shopIcons for Home, kidsIcons for Kids,
                        foodIcons for Cafe). Each set also holds one
                        BRAND_MARK entry, drawn as the outline N mark
                        (media.brand.markOutline) on a near-white skin.
                        kidsIcons is the one set with stroked shapes — a
                        balloon string and a kite tail squiggle — which set
                        their own stroke/fill, overriding the <svg>'s
                        fill="currentColor" for that shape only. Its eight:
                        the N mark, crayon, balloon, star, kite, heart,
                        pencil, paper plane.
                        Takes `scale` (Kids uses 1.6, Cafe 3): the wider the
                        host, the more the marks have to be scaled up to read
                        at that spacing, since a field spreads its eight
                        bubbles per side over the host's full height. The
                        parent needs the `bubbles-host` class, which anchors
                        and clips the field and lifts page content above it.
      ProductCard/    — one product from the store catalogue, as a card, plus
                        the `.product-grid` it sits in. SHARED by the Shop
                        catalogue (it used to be Customize Yours on Home too) — renders the same
                        object and must not drift, which is the whole reason
                        it is a component rather than markup in Shop.jsx.
                        Reads storeProducts (image, url) and storeBadges
                        (the optional corner ribbon). The whole card is ONE
                        <a> and the button is a <span> dressed as one.
                        EVERY card in a row is the same height with its button
                        on the same line, and that takes two things, both in
                        this folder's CSS and so shared by every layout and
                        both pages: `align-self: stretch` on the card (NOT
                        `height: 100%` — see the Shop row below for why that
                        silently failed in the Carousel), and a two-line
                        `min-height` on the name so a short one still occupies
                        both lines. The clamp alone equalises the cards but
                        not the buttons.
                        Takes `className` and `ratio` props so the Shop page
                        can attach its treatments without this component
                        branching on them. `ratio` has to be a PROP, not CSS:
                        ImagePlaceholder writes the aspect ratio as an INLINE
                        style, which no stylesheet can override — a rule for
                        it silently loses (this was caught in the browser, not
                        the build).
                        It also exports SHOWCASE_RATIO ('1 / 1') and
                        CARDS_IN_VIEW (4), which both pages pass — they live
                        here rather than in either page because they are the
                        card's treatment, not a page's. CARDS_IN_VIEW is the
                        SINGLE source for how many cards a row shows: the
                        Carousel takes it as `perView`, the featured grid takes
                        it as the `--cards-in-view` custom property the page
                        sets inline, and Shop slices its shelf by it so a named
                        category always fills its row exactly. Change that one
                        number and all three follow.
                        LAYOUTS, all three cards across: `.product-grid` is
                        the original auto-fill of 200px tiles and NO page uses
                        it alone any more — Shop pairs it with
                        `.product-grid-featured` (fixed columns from
                        --cards-in-view, a named shelf, stepping to 3 at
                        1200px, 2 at 1024px and 1 at 700px — the same
                        breakpoints `.carousel-card` takes), and
                        Customize Yours moved to the Carousel. It is kept as
                        the base of the variant and as the small-tile option.
                        The shared Carousel is the other layout — "All
                        Products" on Shop (Customize Yours no longer uses it).
                        `.carousel-card`'s flex-basis in theme.css is now
                        arithmetic — n cards and (n - 1) gaps — off
                        `--carousel-per-view`, which the Carousel publishes
                        from its `perView` prop and which DEFAULTS TO 3, so
                        the Kids track (and the parked Cafe one) are untouched
                        by the product pages asking for 4.
                        `.product-card-showcase` is the PICTURE and rides on
                        either — media padding to 0 and `object-fit: cover`,
                        so the image fills its frame edge to edge instead of
                        sitting as a stamp on a tinted ground. It is a card
                        class rather than a descendant of the grid precisely
                        because the carousel needs it too. One special case:
                        inside a carousel the badge ribbon loses its 10px
                        overhang and fold, because `.carousel-track` is an
                        `overflow-x: auto` box and clips it off the leftmost
                        card — which is where the one badged product sits.
      ProcessSteps/   — the four order steps as an <ol> (data/process.js,
                        copy under i18n process.steps): Home and About.
      ImagePlaceholder.jsx — every image slot. `loading` DEFAULTS TO "lazy"
                        site-wide (fetched only as it nears the viewport); a
                        HERO passes loading="eager" — Home's hero and the
                        Events hero do — so the first paint is not delayed.
      AutoplayVideo.jsx/.css — a film that behaves like a GIF: always
                        muted, always looping, and the visitor CANNOT take it
                        over — no controls, no picture-in-picture or casting,
                        no right-click video menu, pointer-events: none (so
                        clicks/double-clicks do nothing), playsInline (no
                        iPhone full-screen). LAZY: preload="none" and no
                        autoPlay attribute, so only the poster loads until it
                        is 25% on screen; then it plays, and pauses again when
                        it leaves. Reduced motion: never starts, poster only.
                        Used by Home's service rows 03/04 (their films carry
                        no audio track).
      VideoPlaceholder/ — a film slot that has no film yet: the poster still
                        via <ImagePlaceholder> (dashed fallback when the file
                        is missing) with a decorative, aria-hidden play badge
                        over it. `.video-frame` / `.video-slot` / `.video-play`.
                        Used by the Kids activation (both films) and by the
                        About brand film inside its parked block — it was
                        About's own `.about-video-*` markup until Kids wanted
                        the same frame. Note `display:block` is scoped to
                        `video.video-slot`: setting it on `.video-slot` would
                        override the flex centring of the dashed fallback.
      ChatLauncher/   — MOTION: the nudge bubble pops (0.42s, an easing that
                        overshoots 1 and settles, growing from its tail so the
                        tip stays on the button it points at). The menu and the
                        assistant panel share ONE animation and ONE
                        transform-origin — the launcher button — so picking the
                        assistant, which unmounts the menu and mounts the
                        panel, reads as one thing changing size rather than two
                        things swapping. The panel runs slightly longer (0.32s
                        vs 0.26s) because it travels further; equal durations
                        made the bigger one feel abrupt. The origin flips under
                        RTL. All of it is off under prefers-reduced-motion.
      ChatLauncher/   — the floating corner button (App.jsx), fixed
                        bottom-right with its own centring rules (not .btn)
                        and the bare charcoal N (media.brand.logos.dark
                        .secondary — no yellow tile) on the white button. Opens a
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
    ShopIcon.jsx       — the shopping-bag glyph, single source. It is the
                        leading mark on every button that sends the visitor
                        to the store (Home's personal-gifts CTA, the store
                        hero's "Shop the Collection", both Kids shop links).
                        Stroked in `currentColor` like WhatsAppIcon, so it
                        takes each button variant's color; `.btn` already
                        supplies the gap, so buttons just render it before
                        their label. Do not inline a bag SVG elsewhere.
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
    languages.js        — the 2 supported languages, English and Arabic (code, native name, dir). French and Spanish were REMOVED (fr.js/es.js deleted); a saved FR/ES choice falls back to English.
                          No flag field: components/Flag.jsx draws one per
                          language code, so the two cannot drift apart.
    translations/{en,ar}.js
                        — ALL display copy for the whole site, nested to
                          mirror each page's structural data.js so lookups
                          are `t.<page>.<section>[id]`.
                          Top-level keys are one per page (`home`, `cafe`,
                          `kids`, `shop`, `brandsPage`, `business`,
                          `agency`, `about`) plus
                          `contact` — which is now the ContactForm
                          component's copy rather than a page's — `nav`,
                          `footer`, `common`, and the shared-component keys:
                          `packages` (PackagesPanel), `process`
                          (ProcessSteps) and `chat` (ChatLauncher + the
                          assistant's topics, answers and keywords), plus
                          `policies` (the three legal documents — translated
                          in both, English controlling; see /policies in
                          the routes table).

      BackToTop/      — the floating "back to the top" button. **PARKED** —
                        its import and its element are commented out in
                        App.jsx, so it renders nowhere. The component, its CSS
                        and its i18n key are kept intact; uncomment those two
                        spots to bring it back. Everything below describes it
                        as it behaves when restored.
                        Rendered ONCE in App.jsx, so it is on every page and
                        no page writes its own (the Policies page's inline link was deleted
                        when this arrived). Shows past 20% of the SCROLLABLE
                        distance — not 20% of the document, which on a short
                        page can be further than you can actually scroll —
                        and slides in from the right, stacked above the chat
                        launcher off the same --fab-inset.
                        A solid WHITE card with a drop shadow. The fill is not
                        only decoration — it is what keeps the black arrow and
                        the accent-700 label legible whatever scrolls beneath,
                        and every page ends on the dark footer. It was briefly
                        a transparent outline-only overlay; that version is
                        kept COMMENTED OUT in BackToTop.css rather than
                        deleted, hover rules included, because the two swap as
                        a pair: the overlay moves the border on hover, the card
                        moves the fill. Its scroll handler
                        reads `scrollY` only, with the threshold cached and
                        refreshed by a ResizeObserver on <html> (which also
                        covers route changes and late-loading images). It does
                        NOT gate on requestAnimationFrame: the usual "skip if a
                        frame is pending" flag is only cleared by the callback,
                        so a frame that never arrives — backgrounded tab,
                        throttled renderer — wedges the button in its last
                        state. Label: i18n `common.backToTop`.

  components/Navbar/       — the bar. The CURRENT page's link is a pill filled
                          with `--gradient-accent-soft` (theme.css) and set in
                          --color-accent-800; hover is the same pill a step
                          weaker, flat accent-100. EVERY link carries the pill
                          padding, lit or not, so the row does not reflow as
                          the page changes — which is also why the sparkling
                          link must not re-add a padding-inline of its own.
                          Both rules are qualified with `.navbar`, and the
                          bar's tightened gap with `.nav.navbar`: theme.css's
                          `.nav a[aria-current]` and `.nav` are equally or
                          more specific and land later in the bundle, so a
                          single class loses to them silently.
                          A navLinks entry with `highlight: true`
                          (today only `/business`) is the bar's one
                          emphasised link: `.navbar-link-highlight` sets
                          font-weight 700 and --color-accent-700, and that is
                          the entire treatment — no pseudo-elements, no state,
                          no handlers, nothing that moves. It REPLACED a
                          sparkle (a travelling glint on ::before, a field of
                          twinkling stars on ::after, and a 620ms flare on
                          click driven by a `burst` state and data-burst);
                          the keyframes and the state went with it. Only ever
                          flag ONE entry — two emphasised links emphasise
                          nothing.
                          Every entry is now a plain link. The bar used to also
                          support a `sections` array on an entry, which opened
                          a hover submenu under it (`.navbar-sub`) for
                          /policies; that page moved to the footer and the
                          submenu — markup, CSS and the data key — went with
                          it. Re-adding a dropdown means writing it again;
                          check this file's history rather than starting cold.

  hooks/useCarouselAutoplay.js — global effect that auto-advances every
                          `.carousel-track` on screen every 4.2s.
  hooks/useSectionReveal.js — global effect (App.jsx): each TOP-LEVEL
                          <section>/<header> in <main> that starts BELOW the
                          first screen gets `.reveal` (opacity 0) and then
                          `.reveal-in` as it scrolls into view — a 700ms fade
                          (theme.css). Nothing on the first screen is hidden;
                          nested sections ride with their parent. OPACITY
                          ONLY: a slide transform would throw off the #hash
                          jump measurements and make sections containing
                          blocks for position: fixed. A MutationObserver
                          picks up lazy pages' sections as they mount. Off
                          under prefers-reduced-motion; no JS, nothing hidden.
  hooks/useScrollToTop.js — global effect that puts each new page at the top
                          on navigation; React Router keeps the window's
                          scroll offset otherwise, so a link followed from the
                          foot of one page lands part-way down the next. The
                          fade that goes with it is `.page-enter` in theme.css,
                          replayed by the `key` on <main>.
                          It watches the PATHNAME **and the hash**. With a
                          hash — the footer's policy list linking to
                          `/policies#privacy`, that page's own index, the
                          `#contact` button at the foot of About — the page is
                          opened at its top and then scrolled to the target
                          after a short beat, so the page arrives first and
                          then carries you down. The gap left above the target
                          is read from its own `scroll-margin-top`, so the
                          sticky navbar's height stays a CSS concern; any new
                          anchor target needs the shared `.scroll-anchor` class
                          (theme.css) or it lands under the bar. Because pages
                          are lazy, a target that is not in the DOM yet is
                          WAITED FOR (MutationObserver, up to 4s) rather than
                          given up on; a hash that never matches is ignored.
  (theme.css) `.scroll-anchor` — put it on any element a #hash link points at.
                          It sets the scroll-margin-top that clears the sticky
                          navbar; useScrollToTop reads the value back off the
                          element, so the offset lives in exactly one place.
                          Used by the /policies sections and #catering.

  (theme.css) `.container` — the page gutter: max-width, `margin-inline: auto`
                          and the horizontal padding. It sets NO vertical
                          margin, deliberately. It used to say `margin: 0 auto`,
                          whose shorthand also zeroed margin-top — and at equal
                          specificity that beat the `margin-top` a section
                          declared for itself whenever the page's CSS was
                          bundled before theme.css, which is how the Kids offer
                          section lost its gap under the hero. Vertical rhythm
                          is each section's own business; keep it that way.

  (theme.css) `.card-kicker` — the section kicker on EVERY page, and the one
                          the pages share: a pulsing dot and an uppercase
                          label at 0.2em, with NO border or padding (the
                          outline was removed site-wide). The dot is a ::before, so a
                          page adds no markup for it. This was the Shop hero's
                          own `.shop-hero-badge`; that class and its separate
                          dot span are gone and Shop.jsx uses .card-kicker like
                          everywhere else. The name is historical — it is a
                          page-section kicker, not a card part.

  utils/scrollToElement.js — scrollToElement(el, offset): animates the window
                          (BackToTop passes document.body with offset 0 to
                          return to the top, so the easing is shared with the
                          hash jumps rather than written twice)
                          to an element frame by frame from requestAnimationFrame,
                          and returns a cancel function. NOT
                          `scrollIntoView({behavior:'smooth'})`: the browser may
                          abandon a native scroll animation part-way and
                          silently (measured on /policies — the instant call
                          landed at 5775px, the smooth one moved 39px and
                          stopped), which strands the visitor at the top of a
                          long page. Hands control back on wheel/touch/key, and
                          jumps rather than animates under
                          prefers-reduced-motion.
  utils/carousel.js      — stepCarousel(el, dir): the one-card-per-step
                          scroll math, used by the Carousel component and
                          the autoplay hook. Wraps in both directions (a closed
                          loop) and is RTL-aware — card positions are
                          measured in the same coordinate space as
                          scrollLeft, minus the track's inline padding, so a
                          stepped-to card lands where the first one rests.
                          That padding is the SHADOW BLEED (`--carousel-bleed`,
                          20px, on `.carousel-track` in theme.css): the track
                          is padded on every side so card shadows are not
                          clipped, and pulled back out by an equal negative
                          inline margin so cards still align with the
                          container. The END edge fades out across the bleed
                          (a mask-image, flipped in RTL) so the next hidden
                          card's shadow never shows as a hard line; the start
                          edge is unmasked. It lives on the shared track, so every
                          carousel on the site gets it — never pad a single
                          page's carousel instead.

  data/storeProducts.js  — the REAL store catalogue: 192 products GENERATED
                          from the Odoo export `Product
                          (product.template).xlsx` at the repo root by
                          `node scripts/import-store-products.mjs`. Never
                          hand-edit a product row — re-export and re-run, or
                          the next run overwrites the edit. Carries only what
                          the sheet has: id (a slug of the name, and the image
                          filename), name, internal ref, AED price.
                          Also exports `storeCategories` — the ten shelves the
                          Shop page filters by, labelled from i18n
                          `shop.filters` — plus `storeImage(p)` and
                          `productsInCategory(id)`.
                          TWO KNOWN GAPS, both from the export, not the code:
                          (1) "Product Category" is EMPTY for all 192 rows, so
                          every product sits under 'all' and the other nine
                          shelves render `shop.emptyCategory`. Fill column C,
                          re-export, carry it through as `cat` — nothing on
                          the page changes. (2) the CATEGORY gap above is now
                          FILLED, by the second script — `cats` is an array
                          because a product sits on several shelves (a kids
                          water bottle is under Kids and Drinkware both), and
                          `productsInCategory` therefore uses `includes`.
                          `productUrl(p)` builds the link to a product's own
                          page from `url`, falling back to the shop front.
                          `categoryUrl(catId)` does the same for a SHELF,
                          from the `path` each entry in `storeCategories`
                          now carries ('/shop/category/games-44'). The
                          '/shop/category/' prefix is load-bearing: plain
                          '/shop/<slug>' is the PRODUCT namespace and does
                          not merely 404 — it silently resolves to whichever
                          product owns that id (bags-travel-74 lands on a
                          LUND LONDON straw). All nine verified 200 against
                          the live store. The slugs are written out rather
                          than derived: they end in a numeric category id
                          that exists only there. They were read off the product urls in this
                          same file, so a rename on the store moves both.
                          NOTE: import-store-products.mjs rewrites everything
                          after the product array, so its footer template
                          carries productUrl/storeImage/productsInCategory/
                          categoryUrl verbatim — change one and change BOTH,
                          or the next run of that script silently reverts the
                          file. (`storeCategories` sits BEFORE the array and
                          is preserved as part of the header.) Run
                          order is always products first, then categories.
                          (3) PICTURES are a THIRD source and
                          no longer the spreadsheet at all: they come off the
                          live store via scripts/import-store-images.mjs (see
                          above), at 600x900 or larger instead of the export's
                          85x128. `image: false` accordingly means "the store
                          has no picture either" and is down from 34 rows to
                          4 — Lund London Curling, two Message In The Bulb
                          lines and Tips, the same four with no store `url`.
                          Those fall back to <ImagePlaceholder>.
  data/storeCustomizable.js
                         — UNUSED since Customize Yours became a picture; was which products that section listed, and
                          the ids of its three steps. HAND-EDITED for the same
                          reason storeBadges.js is, plus one of its own: the
                          store's /customizable-products page builds its grid
                          client-side from a dynamic snippet, so unlike the
                          category pages it CANNOT be scraped with a plain
                          fetch. 16 listings there are 14 products here —
                          several are colour variants of one product and our
                          catalogue is template-level.
  data/storeBadges.js    — which Shop products wear a corner ribbon, and which
                          one. HAND-EDITED, and deliberately NOT part of
                          storeProducts.js: that file is generated, so a badge
                          written there would be wiped by the next run of
                          import-store-products.mjs. Adding or removing a badge
                          is one line here. Keys are product ids; values are
                          badge keys, whose wording is i18n `shop.badges`, so
                          a label is translated rather than typed in. Today:
                          one product carries `bestSeller`.
  data/catalogue.js      — the ELEVEN curated TN-xxx pieces. Only `giftSets`
                          is still rendered (the Shop page's gift-set grid);
                          `pieces` and `filterKeys` have no caller since the
                          catalogue grid moved to storeProducts.js. Kept on
                          purpose: their i18n `shop.items` copy (note, finish,
                          lead time, methods) is the only written-up product
                          description on the site, and the store export has
                          nothing like it.
  NOTE on page heroes: the gap between a `.card-kicker` and the
  `h1.page-title` under it is set ONCE, by `.card-kicker + .page-title` in
  theme.css (--space-4). Pages used to each set their own top margin and had
  drifted to four different values; no page should set one again. The
  adjacent-sibling selector carries two classes, so it outranks the
  single-class rule a page uses for its own title whatever order the bundle
  puts them in. Verified equal on /about, /business, /kids, /shop, /policies
  and the 404. The Home hero is the one h1 with no kicker above it.

  styles/theme.css       — ALL design tokens (--color-*, --font-*, --text-*,
                          --space-*, --radius-md, --shadow-*, the named
                          gradients, including --gradient-accent-soft, the
                          pale accent-100 -> accent-300 wash used for small
                          tinted surfaces such as the navbar's current-page
                          pill).
                          CORNER RADIUS is ONE token, --radius-md (16px), and
                          the full rule is stated beside it in that file. The
                          single exception is `.btn`, which reads
                          --radius-button (12px) — by request; nothing else
                          should use that token. It
                          used to be an sm/md/lg scale, and the scale is what
                          let the site drift to SIX radii across its pages
                          (8, 16, 20, 28, 32.2 and 56px — the last from
                          `calc(2 * var(--radius-lg))` on the big panels).
                          --radius-sm and --radius-lg were DELETED rather than
                          aliased to the survivor, so there is nothing left to
                          pick from; every former use now reads --radius-md,
                          and the multiplier calcs (* 1.15, * 1.25, * 0.75,
                          2 *) were collapsed to the plain token. EVERYTHING rounded
                          uses it: there are no 999px pills or 50% circles
                          left — buttons, tags, kickers, inputs, the carousel
                          arrows, the chat button, social icons, the play
                          badge. Tiny dots still render
                          round (the browser clamps the radius to half the
                          box). The ONE exemption is a surface nested in a
                          rounded one, which takes
                          `calc(var(--radius-md) - <the parent's padding>)`.
                          Decorative CIRCLES keep 50% — .home-service-ring
                          (the ring round each "What we do" image) and the
                          parked Bubbles; squaring them makes a box in a box.
                          One deliberate hold-out: `.flag` keeps a 2px
                          hairline, being a 14px SVG rather than a surface.
                          Audited in the browser after the change — every page
                          renders only 16px and that one 2px (re-checked in code
                          when the pills and circles went).
                          Plus
                          shared component classes (.btn* incl. .btn-light
                          for dark/coloured grounds; the Home hero's shop CTA
                          is a plain .btn-primary, the guideline yellow — the
                          animated .btn-sparkle it used was removed) .card, .card-kicker, .tag, .seg*,
                          .seg-grid, .popover/.popover-option for floating
                          menus, .table, .dialog, .carousel-*) and the shared
                          keyframes (pulse, kenburns, sparkle-twinkle — the
                          Shop badge's glint — and
                          page-enter, the route-change fade carried by the
                          .page-enter class on <main>; App.jsx keys <main> on
                          the pathname so it replays on every navigation, and
                          hooks/useScrollToTop.js puts the new page at the top
                          first. Its transform settles at `none`, so it never
                          becomes a lasting containing block for a fixed-
                          position descendant — do not make it permanent).
                          .page-title is the shared class on every page's
                          <h1>: it sets --font-body (Montserrat) at 700
                          italic — both real cuts, requested in index.html
                          — plus the leading, tracking and optical left
                          pull that were identical in all seven page rules.
                          It drops the italic under [dir="rtl"], where
                          Arabic has no italic cut. Each page keeps only its
                          own font-size clamp / margin / max-width.
                          Fonts: ONE face and no others — Montserrat, set by
                          --font-body and loaded from Google Fonts (linked in
                          index.html), so the site renders as drawn on every
                          machine. --font-heading still exists and ~30 rules
                          still name it, but it now resolves to
                          var(--font-body); it is kept as the "this is a
                          title" hook, and those rules take the heading
                          weight from --font-heading-weight (700) — so every
                          title and heading is Montserrat bold. Do not add a
                          second family. The two that used to be here were
                          both licensed with no CDN copy, so they only ever
                          rendered for visitors who happened to own them and
                          everyone else got a fallback: Book Antiqua (the
                          heading serif — its files were never in the repo,
                          so headings fell back to Georgia) and, earlier, the
                          guideline's (p.14) script Artisoul Signature.
                          There are no @font-face rules in theme.css any more
                          and public/fonts/ is unused. Gradients: --gradient-panel
                          (the guideline's orange→gold panel, built from the
                          --color-panel-* stops),
                          --gradient-footer (--color-ink
                          → --color-ink-900, darker to the right). --color-whatsapp is the one
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
  services/   — the Home service-row photos (rows 01/02)
  home/       — the Home page's films: brand-communication.mp4 (row 03)
                and marketing-strategy.mp4 (row 04), each with a
                -poster.jpg; read via media.serviceVideos
  methods/    — close-ups of each customization technique (engraving,
                print, embroidery, emboss) for the Home "how it works" panel
  menu/       — cafe menu dishes
  shop/       — the shop's products, named by product code
  cafe/       — the events section on the Cafe page
  business/   — the branded-goods offer cards + the catering section
  kids/       — the Kids page: hero.jpg, plus one image per offer block
                (back-to-school.jpg, new-baby.jpg, birthdays.jpg). The Little
                Creators activation adds activation.mp4 + activation-poster.jpg
                (the opening film), activation-interviews.mp4 +
                activation-interviews-poster.jpg (the Two T's film) and one
                activation-<shot>.jpg per id in pages/Kids/data.js
                `activationShots`. The gallery shots are the only photos in
                the repo exported from originals rather than dropped in as-is:
                each is PRE-CROPPED to 4:3 at 1440x1080, because the carousel
                slot is a fixed 4/3 and `.img-slot img` is `object-fit: cover`
                — an uncropped frame would be silently trimmed by the browser,
                on the centre rather than on the subject. Crop a replacement to
                4:3 before it lands here, and do not upscale: the portrait
                frame among them gives up half its height to fit.
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
                  from-the-name-to-your-name.png — the tagline lettering
                      (black + yellow script, transparent ground), cropped
                      to its edges; see components/TaglineArt.jsx.
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
| `/` | `pages/Home/` | Customization-led. Hero (the `<h1>` is the tagline ARTWORK, `components/TaglineArt`, not live type — `.home-hero-title-art` caps it at `clamp(300px, 46vw, 620px)` wide, because the hero is one screen tall and every pixel the title gives back is background VIDEO that can be seen. The old i18n keys `home.hero.titleLeadPrefix` / `titleScript` are no longer rendered but are kept; the "Make It Personal" CTA is a plain `.btn-primary` (the guideline yellow, no animation), beside it a plain `<a>` to the Matterport 3D walkthrough — an external tour, so not a router Link), the partner-brand `LogoMarquee` under the hero is **PARKED** (commented out, with its imports), then "What we do": 4 service rows — 01 B2C gifts, 02 B2B branding, and **03/04 PLACEHOLDERS** (`serviceThree`/`serviceFour` in `data.js`; copy in en.js only, which the other languages fall through to; rows 03 and 04 show FILMS from `media.serviceVideos` (Brand Communication, Marketing strategy & Consultancy; files in public/media/home/) — GIF-like: muted, looping, no controls (components/AutoplayVideo), at their own 4:5 ratio, not `.washed`; any row listed in `serviceVideos` gets a video instead of its image) — the `Bubbles` ornament there is PARKED. Then **Customize Yours** (`CustomizeSection.jsx` + `.css` in this folder; the old `/customize` page, which now redirects to `/#customize`). It is now just ONE picture (`media.customize`, `/media/customize/customize.jpg`, 16:7 — the dashed placeholder shows until the file exists) and the two buttons (shop → `site.customizableUrl`, WhatsApp). The heading, steps, product carousel and closing line were REMOVED; their copy (i18n `customize`) and `data/storeCustomizable.js` are kept but unused. Then "how it works": `ProcessSteps` plus a picker of customization methods (`customMethods` in `data.js`, copy under `i18n` home.howItWorks). Then `ContactSection`, shared with /about. **Every section is WHITE** (site-wide rule, see Conventions) — the cards inside (ProcessSteps, the How it works panel, the contact form) are the beige `--color-accent-100`. |
| `/cafe` | `pages/Cafe/` | **PARKED — no route, no nav entry** (see App.jsx above); the folder and its copy are kept so it can be switched back on. Title block, then the delivery-partner `LogoMarquee` — **commented out** for now (ids/URLs in this page's `data.js`, names under i18n cafe.partners) — then the menu (List/Cards toggle; cards are `OverlayCard` with tag + price chips and an icon-only WhatsApp action; autoplaying carousels, 3 sections). Food `Bubbles` (plus the N mark) at 3× scale fill the gutters on wide screens (no narrow-screen bands). Plus the **events** section at its foot — nights held in our own room, rendered by `PackagesPanel`. Was `pages/Menu/`. |
| `/store` | `pages/Shop/` | Labelled "Store" in the nav (was `/shop`, which redirects here). "Make It Personal" — the real catalogue: **192 products from `data/storeProducts.js`**, generated from the Odoo export (see that file). Ten category filters from `storeCategories`, each showing the same products as the matching category page on store.thename.ae (counts verified equal: Bags & Travel 24, Desk & Stationery 19, Drinkware 35, Games 5, Home Accessories 61, Kids 60, Photo & Frames 8, Personalized Gift Sets 9, Technology 36). Rendered as WRAPPING PILLS (`.seg.shop-filters` in Shop.css) rather than the shared `.seg` capsule: ten options need ~1286px and the capsule had 1096px, so its `overflow: hidden` silently cut the last one off mid-word. The class exists so the List/Cards `ViewToggle` beside them, also a `.seg`, keeps the joined capsule. Note the selector is `.seg.shop-filters` — a single class loses to theme.css's `.seg`, which is equally specific and later in the bundle (All Products, Bags & Travel, Desk & Stationery, Drinkware, Games, Home Accessories, Kids, Photo & Frames, Personalized Gift Sets, Technology) — but the export carries no per-product category, so only "All Products" has anything in it and the rest show `shop.emptyCategory`. The catalogue is a SHOWCASE, not a listing, and it has TWO modes. A NAMED shelf renders its first `FEATURED_COUNT` products and nothing else, in `.product-grid-featured` — fixed columns across the full container. `FEATURED_COUNT` is not a number of its own: it IS `CARDS_IN_VIEW` (4, from ProductCard), so the row is full by construction and changing the layout can never leave a half-empty shelf behind. "ALL PRODUCTS" is the exception and is NOT cut to three: it is the whole catalogue on the shared `Carousel`, the same four cards in view and the rest a swipe away, because a sample of an unfiltered shelf is meaningless and a track of exactly three cards is just a row with dead arrows on it. Its cards carry `carousel-card`, whose flex-basis in theme.css is arithmetic off `--carousel-per-view` (n cards and n-1 gaps). That variable comes from the Carousel's `perView` prop and DEFAULTS TO 3, so asking for 4 here leaves the Kids track — and the parked Cafe one — exactly as they were. The narrow-screen steps override the width directly with `!important` rather than lowering the variable, and have to: it arrives as an inline style, which no stylesheet rule can outrank and reuse the `shop.prevPieces`/`nextPieces` labels that were already there from the page's earlier carousel. A SEARCH resets the filter to 'all', so results always land in the carousel and are never truncated to three. Both modes pass `product-card-showcase` and `SHOWCASE_RATIO` ('1 / 1') to ProductCard: the picture fills its frame edge to edge (`object-fit: cover`, no inset ground) rather than sitting as a stamp on a tint. The frame is SQUARE because the catalogue is mixed: 143 of the store's 187 photographs are 2:3 portrait and 44 are 3:2 landscape (the Message In The Bulb line, mostly). `cover` crops whatever does not fit, so a portrait 3:4 frame — which suits the majority beautifully — takes half the width off each of those 44. A square gives up a third of one axis either way, symmetric, and product photography carries enough white margin to afford it. The ratio must be passed as a PROP; ImagePlaceholder sets it as an inline style and a CSS rule for it loses silently (caught in the browser, not the build). Under either layout sits a `.btn-primary` that opens THAT CATEGORY on store.thename.ae via `categoryUrl(filter)` (pick Drinkware and you land on the store's Drinkware page, not its shop front) — the cards themselves still open one product each, unchanged. For a named shelf the rest of the products are not rendered at all; the button is where they went. Copy is `shop.shopCategory(label)`, which takes the category's own filter label — except on "All Products", which borrows the hero's `shop.openShop` rather than reading "Shop all All Products". The old PAGER is **PARKED** and commented out in Shop.jsx: `PAGE_SIZE` (24), the `visible` state, the `useEffect` that reset it on a filter/search change, and the "Load more" block, each marked PARKED, along with the now-unused `useEffect` import. Its copy (`shop.loadMore`, `shop.showing`) and CSS (`.shop-more-count`) are kept; `.shop-more` is reused as the wrapper for the new category button. Restoring the pager means uncommenting all four and putting `visible` back into the `page` slice. Why it was a window rather than numbered PAGES, if it ever comes back: growing it keeps every card already on screen exactly where it is, while pages replace the grid and throw away the visitor's place. It was not an inner scroll container either — nested scrollbars fight the page scroll, strand the footer and are poor on touch and with a keyboard. And not infinite scroll, which never lets you reach the footer. Note the result count beside the filters still reports the FULL size of the shelf, not the three on screen — that is deliberate, it is what makes the button under the grid worth pressing. Product images are `loading="lazy"` (now the DEFAULT on ImagePlaceholder site-wide; heroes pass loading="eager", since lazy-loading a HERO image would delay the largest paint). A SEARCH field sits under the filters and overrides them: typing resets the category to 'all', because a search is meant to find a product wherever it lives rather than quietly searching inside one shelf and appearing to find nothing. It is NOT debounced — 192 objects in memory filter in well under a millisecond, so a timer would only add lag; what can be slow is re-rendering up to 192 cards per keystroke, and `useDeferredValue` handles that by keeping the input responsive and rendering the list at a lower priority. Query terms are ANDed against the name, so "lexon bag" finds "LEXON - Travel bag NEW AIRLINE". The field and its results are spaced as ONE group: the gap below the field is the same `--space-2` that sits under the field's own label, against the `--space-4` above it that breaks from the controls. It is set on the RESULTS, not as a margin under the field, because the two layouts arrive with different defaults — the grid inherits `.product-grid`'s `--space-6` (overridden in Shop.css, not changed in ProductCard.css, since that grid is shared) and the Carousel's track carries 4px of top padding that is shadow room rather than spacing, subtracted so the card's top edge lands level with the grid's. Measured 8.8px from field to first card in both. List/Cards toggle kept; Cards is a **grid** of `.shop-product` cards copied from the product tile on store.thename.ae so the two read as one shop — the LAYOUT is the store's — product on a tinted ground, centred name, a button across the foot (NO price on the card; it is on the product's own page and in the List view) — but the COLOURS are this site's: `--color-accent-100` under the picture, `--color-accent-700` on the price, and .btn-primary's brand yellow on the button. Equal card heights come from a flex chain that must stay intact: `align-self: stretch` fills the card to its row, `.product-card-body` takes the slack with `flex: 1`, and the button's `margin-top: auto` pins it to the floor — break any link and buttons sit at different heights. That first link used to be `height: 100%`, which is equivalent IN A GRID and so looked right for as long as the grid was the only layout — but in the Carousel `.carousel-track` has auto height, so a percentage height resolves against an indefinite size, falls back to `auto`, and by being set at all SUPPRESSES the stretch it was trying to express. Measured before the fix: 461px for a one-line card beside 486px for a two-line one, in the same row. Do not put it back. The card links to the PRODUCT's own page (`productUrl`), not the shop front. The depth cue is REVERSED from the usual: a card carries its shadow at REST (offset down and to the left) and loses it on hover, so it settles onto the page rather than lifting off it. The LIST view does the opposite — beige rows that lift on hover — because a row has no resting shadow to give up. Long names are clamped (two lines on a card, one in a list row) and carry the full string on `title`, the same tooltip pattern the footer's social icons use. Neither view shows a price; it is on the product's own page. A card may carry a BADGE — a ribbon strip OVER the card's top-left corner, from `data/storeBadges.js`. It is an absolute overlay, so it costs the card no height and a badged card keeps the same proportions as a plain one (names stay on one line across a row). It starts 10px OUTSIDE the card's left edge with a darker fold tucked under the overhang, which is what reads as a ribbon passing round the back of the card rather than a sticker on the front. **`.shop-product` therefore sets NO `overflow: hidden`** — clipping would cut exactly the part doing the work — so `.shop-product-media` rounds its own TOP corners instead of relying on the card to clip it. Do not re-add overflow to the card without moving the ribbon inside its bounds. A sparkle sits on the strip's trailing edge, driven by theme.css's shared `sparkle-twinkle` keyframes rather than a redeclared copy; off under prefers-reduced-motion. The fold mirrors under RTL. Two earlier versions are worth not repeating: a 45deg corner ribbon (its length was the chord across the corner, so it silently clipped longer labels) and a full-width band in flow (it pushed the badged card's name below its neighbours'). CORNER RADII are no longer this page's rule — it became the whole site's and now lives with the `--radius-md` token in theme.css; Shop.css points at it rather than restating it. What that means here: the thumbnail inside a list row is `calc(var(--radius-md) - var(--space-3))`, i.e. 2.8px, because it is nested. The page's two gift-set overrides were DELETED: OverlayCard already carries the one radius, and its inset panel now steps down concentrically in OverlayCard.css, where it is true for every page using the component instead of being restated here. Deliberately NOT copied: the wishlist heart and the compare arrows on that tile, which both need a cart this site does not have. The whole card is ONE `<a>` and the button is a `<span>` dressed as one — a button or a second anchor inside a link is invalid, and three links to the same product is noise for a screen reader. The small-tile card uses `object-fit: contain`; the showcase variant both pages now render uses `cover` so the picture fills its frame (see `.product-card-showcase`). Product names are clamped to two lines AND reserved at two: the clamp alone gives equal card heights but leaves the button 25px higher under a one-line name, so `.product-card-name` carries `min-height: calc(1.35em * 2)` — in `em`, so each variant reserves two of its own lines (showcase on `--text-lg`, tiles on `--text-body`). Keep that multiplier and `line-height` in step. 14 of the 192 names actually truncate; all carry the full string on `title`. The gift-sets section ("Boxed, wrapped and ready to give") is **PARKED** — commented out in Shop.jsx along with the four imports/helpers only it used (`OverlayCard`, `giftSets`, `media`, `methodNames`), each marked PARKED. Its copy (`shop.giftSets.*`), its CSS (`.shop-gift-sets*`) and the curated TN-5xx pieces are all kept. **When parking JSX here, no `*/` may appear anywhere inside the wrapper** — including in your own explanatory prose: an end-of-comment marker closes the block early, the section silently goes live again, and the build still PASSES because the stray `*/}` is just JSX text. It fails at runtime instead (`giftSets is not defined`, blank page). Convert any inner comment's markers to plain dashes, as the About page does. Was `pages/VertexPieces/` (an interiors showroom) before the customization pivot. |
| `/corporate-gifts` | `pages/Business/` | Labelled "Corporate gifts" in the nav (was `/business`, which redirects here). B2B: branded-goods offer cards ("Made for Business"), account terms ("How We Work With You"), and the **catering** section ("Catering, Wherever Business Takes You."), rendered by `PackagesPanel` as the image + direct-line enquiry only — **no packages table**: `business.catering` has no `title`, `intro`, `colOne` or `packages` left (deleted from every translation) and `cateringPackageIds` is gone from this page's `data.js`. Earlier, the off-site event-catering row had been removed from that list. The page's English copy was rewritten wholesale in a later pass; **ar still carries the previous wording** for everything under `business` except `catering.title`. |
| `/brands` | `pages/Brands/` | Header (kicker/title/lede), then a grid of logo cards — one per brand in `data/brands.js`, logo from `media.brands` (the same sources the parked Home LogoMarquee reads; `logoScale` is honoured). Each card links to the brand's own site; a missing logo falls back to the name as a wordmark. Copy is i18n `brandsPage` (not `brands`, to keep it apart from data/brands.js). |
| `/agency` | `pages/Agency/` | Placeholder introduction (kicker, title, lede, WhatsApp CTA) until the real content arrives. Replaces the old parked `concept` route/nav entry. Copy is i18n `agency`. |
| `/events` | `pages/Kids/` | Labelled "Events" in the nav (was `/kids`, which redirects here); the folder, component, CSS classes and i18n `kids` copy keep the old name. A landing page, not a catalogue: hero (shop + WhatsApp CTAs), three offer blocks from `kidsOffers` in `data.js` (back to school / new baby / birthdays — the ids are unchanged; the display names are now "Back to School" / "Hello, Little One" / "Birthdays & Celebrations"), a "made for them" note, then the **Little Creators activation** (`kids.activation`: copy, an opening `<VideoPlaceholder>`, and a `<Carousel>` gallery of one card per id in `activationShots` — caption from i18n `kids.activation.shots[id]`, picture from `media.kids.activation.shots[id]`), the **Two T's feature** (`kids.twoTs`, copy beside the interviews film), and a closing CTA. Copy under i18n `kids`. Both beige bands (the note and the Two T's feature) carry `<Doodles />` from `Doodles.jsx` — a wobbly hand-drawn flower in the top-right corner and a sun in the bottom-left, stroked not filled, tucked past the band's padding and clipped by it. The whole page is a `bubbles-host`: `<Bubbles>` gutter fields at `scale={1.6}` with `kidsIcons`, plus a `side="row"` band before the note for narrow screens where the gutters are switched off. Took the nav slot the cafe page had. The page's English copy was rewritten in a later pass; **ar still carries the previous wording** for the older sections, as on `/business` — the activation and Two T's copy is translated in all four. |
| `/about` | `pages/About/` | Labelled just "About" in the nav, but titled **"Our story"** on the page. It runs: **hero** (`about.kicker` / `title` / `lede` / `heroSupport`, carrying the page's `<h1>`) -> **story** — a plain column of chapters, one per id in `storyChapters` (`legacy`, `evolution`, `today`), running from "1990 — where it started" to "Today — The Name". Copy comes from i18n `about.story[id]`. No artwork and no rail: it was a timeline with round thumbnails on a line down the left, and both were removed (`media.about.story` is kept but unrendered). Adding an id to `storyChapters` adds a chapter -> the **FROM THE NAME / TO YOUR NAME** card (`about.tagline`; a raised beige card with an accent left edge, not a full-bleed band — it is the page's one pull-quote; the tagline itself is `components/TaglineArt`, the same artwork as the Home hero title; `about.tagline.fromPrefix` / `to` now only feed its alt text) -> the **takeovers**, one card per entry in `takeovers` (names are proper nouns so they live in `pages/About/data.js`, art in `media.about.takeovers[id]`; copy in `about.takeover`) -> **built through collaboration** (`about.collab`) -> **what's next** (`about.future`, ending on the page's sign-off line) -> the **enquiry form** — `components/ContactForm/ContactSection`, the same section that closes Home. **PARKED in one JSX comment**: the brand film (held back until the video is delivered - restoring it means moving the `<h1>` back to it and dropping it from the hero), the services (`aboutServices`), how-we-work (`ProcessSteps`), mission & vision (`purposeIds`) and the closing CTA. Their i18n keys and CSS are kept. Note the inner comments inside that block are written as plain dashed lines, not `{/* */}`: a nested end-of-comment marker would close the block early and break the build. |

| `/policies` | `pages/Policies/` | **PARKED — no route, no footer link** (see App.jsx and Footer.jsx); the folder and its copy are kept so it can be switched back on. All three legal documents on one page — Terms & Conditions, Delivery & Returns, Privacy Policy — each an `<section>` whose id (`#terms`, `#delivery`, `#privacy`) is the anchor the footer's policy list links to. `data.js` holds only the doc ids and the order of the sections inside each; every heading and paragraph is in `i18n` under `policies.docs.<docId>.sections.<sectionId>`, where a section is `{ heading, blocks }` and a block is either a string (a paragraph) or `{ list: [...] }`. Clause numbers come from the `<ol>`, never typed into a heading. `{legalName}`, `{licensedBy}` and `{address}` in the copy are filled from `data/site.js` at render time. The three source documents each ended with their own "Contact Us" clause; the page carries NONE of them — there is no `#contact` section here any more, and the entity, both email addresses and the location live in the ContactForm details at the foot of /about instead. Three clauses that used to say "at the foot of this page" were reworded to name the About page; if the contact block ever comes back, they have to be reworded again. The page closes on `policies.contactNote` + `contactNoteLink` — a beige footnote linking to `/about#contact`, which is the only route from the binding terms to the registered entity and the two addresses, and what makes those three reworded clauses followable. Two keys rather than one with a token, so the sentence and its linked clause are each whole strings. Its own "back to top" link is gone — `components/BackToTop/` now floats on every page. **The policy copy is translated into Arabic.** English is the CONTROLLING version, and every other locale says so in `policies.translationNote` — a line under `policies-updated` in the page header, rendered only when non-empty, which is why `en.js` holds that key as `''`. Because a key missing from a translation falls through to `en.js` via the deepMerge in LanguageContext, a gap here shows up as one clause in the wrong language rather than as an obvious bug: keep the key structure identical across en.js and ar.js, and make any reviewed change to a clause in both. The labels (`nav.policies` — now the footer list's heading — and `nav.policyTabs`) are translated too; both keys stay under `nav` even though the navbar no longer uses them. See `pendingReview` in `data.js`: several commercial figures in this copy are **not yet confirmed for publication**. |
| _anything else_ | `pages/NotFound/` | The custom 404, on the `*` route in App.jsx. A signpost rather than an apology: kicker, title, lede, the path that missed (echoed back so a visitor can see whether they mistyped — React escapes it), a Back-to-homepage button + WhatsApp, then **the whole navbar again as a list of pills**. That list is built from `navLinks` in `data/site.js`, the same array the bar reads, so a page added or parked there appears or disappears here too. Copy is i18n `notFound`, translated in all four languages. |

## Conventions (read before adding code)

0. **Every page section has a WHITE background** (`--color-bg`) — no alternating cream/off-white bands. A card sitting in a section is the beige `--color-accent-100`, never white (white on white would vanish). The Home hero's accent-100 is only a fallback behind its video. The footer keeps its dark gradient.

1. **A page's `data.js` never holds display text.** If you're tempted to put
   a name/note/label/body string in a page's `data.js`, it belongs in
   `i18n/translations/en.js` (and ar.js) instead, keyed by a
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
     `components/WhatsAppIcon.jsx`. The shop bag glyph, needed by four
     buttons across three pages, was written once the same way in
     `components/ShopIcon.jsx`.
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
8. **No link opens a new tab.** No `target="_blank"` anywhere — external
   links (the store, WhatsApp, Maps, socials, Matterport) open in the
   current tab, so leaving the site never looks like a third-party program
   stepping in. Do not add one back.
