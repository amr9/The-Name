# SEO — what is done, and what is left

The technical SEO foundation is in place. What remains needs **information
only you have** (the domain, real copy, images) or **accounts only you can
open**. Each item says exactly where it goes.

## ✅ Done

- **Every page is pre-rendered to real HTML** at build time
  (`scripts/prerender.mjs`). Google and AI crawlers (ChatGPT, Claude,
  Perplexity…) now read the full text of every page instead of an empty
  shell. Visitors get the same app — it hydrates in place.
- **Arabic has its own addresses** — `/ar`, `/ar/store`, `/ar/the-brands`, … —
  so the Arabic site can be indexed. The language is now in the URL
  (`src/i18n/locale.js`), not a browser setting.
- **Unique title and description per page**, in English and Arabic
  (`seo` in `src/i18n/translations/en.js` / `ar.js`).
- **Open Graph / Twitter tags** for link previews.
- **Structured data** — schema.org `LocalBusiness` (name, legal name,
  address, phone, email, Instagram, area served) on every page.
- **`robots.txt`** — all crawlers allowed, AI crawlers named explicitly.
- **Real 404s** — unknown addresses return status 404 and `noindex`.
- **Permanent (301) redirects** for the old addresses `/shop`, `/business`,
  `/kids`, `/customize`, and — since the pages were renamed after their navbar
  labels — `/brands`, `/agency`, `/events`, `/fnb`, `/about` (and their `/ar`
  versions), in `nginx.conf`. After deploying, check e.g. `/about` → 301 to
  `/our-story`. In Google Search Console, resubmit `/sitemap.xml`.
- **Lighter videos** — the two Home films went from 30.2 MB to 15.7 MB
  with no visible quality loss.

## ⏳ TODO — needs you

### 1. ✅ Your domain — done: `https://thename.ae`
`siteUrl` in `src/data/site.js` is set, which switches on canonical links,
hreflang, `og:url`, the structured data's `url`/`logo`, the `Sitemap:` line
in `robots.txt`, `sitemap.xml` and `llms.txt`. `ALLOWED_ORIGINS` in the root
`.env` is `https://thename.ae,https://www.thename.ae` (the confirmation
email's link uses the first). If the server's `.env` is a separate copy, set
it there too.

### 2. A share image → `src/data/site.js`, `shareImage`
A 1200×630px image (logo + a product photo works well), saved under
`public/` — e.g. `public/media/the-name/share.jpg` →
`shareImage: '/media/the-name/share.jpg'`. Shown when a page is shared on
WhatsApp, LinkedIn, X. Needs `siteUrl` too.

### 3. Replace placeholder content (crawlers now read every word)
- ✅ **Home rows** — real copy now (the five "What we do" pillars).
- ✅ **Phone number** — the footer now shows the real number (`phone` in
  `src/data/site.js`, the one place every contact detail is written).
- **Agency page** is a short placeholder (72 words) → `agency` in the
  translation files, plus real sections in `src/pages/Agency/`.
- **Brands page** is thin (64 words) — a sentence per brand would help it
  rank for searches like "Lexon UAE".
- **Photos** — every slot now has a picture or film. Many are STAND-INS
  until the real ones come (marked in `src/data/media.js`): the Home hero
  and virtual-store band are stills from the showreel, the Agency and F&B
  rows use films, showreel stills and event footage. Replace them with real
  photography when you have it. Still EMPTY: four About "takeover" photos
  (Bentley, Sephora, Vogue, Colombian pavilion) — nothing we have shows them.

### 4. Review the page titles and descriptions
Drafted from each page's own copy — check they say what you want, especially
the **Arabic** ones, which were written by Claude and need a native speaker's
read. In `seo` in `en.js` and `ar.js`.

### 5. Accounts to open (outside the code)
- **Google Business Profile** — the single biggest step for "corporate
  gifts Dubai" and map searches. Use exactly the same name, address and
  phone as the website.
- **Google Search Console** — verify the domain, submit `/sitemap.xml`.
- **Bing Webmaster Tools** — same; Bing's index also powers ChatGPT search
  and Microsoft Copilot.
- **Consistent details everywhere** — Instagram bio, store.thename.ae,
  directories: same name, address, phone.

### 6. Nice to have, later
- An **FAQ section** on Corporate Gifts and Agency (minimum order, lead
  time, customisation methods) — search and AI answers quote Q&A content.
- When the Facebook/TikTok accounts exist, set their `url` in `socials`
  (`src/data/site.js`) — they join the structured data automatically.

## ⚠️ Not yet tested

`nginx.conf` was not run for real (Docker was not running). Its rules were
reproduced in a local test server and pass, but after the first deploy,
check: `/shop` → 301 to `/store`; `/nope` → 404 page with status 404;
`/ar/store` → the Arabic store.
