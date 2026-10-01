# SEO — what is done, and what is left

The technical SEO foundation is in place. What remains needs **information
only you have** (the domain, real copy, images) or **accounts only you can
open**. Each item says exactly where it goes.

## ✅ Done

- **Every page is pre-rendered to real HTML** at build time
  (`scripts/prerender.mjs`). Google and AI crawlers (ChatGPT, Claude,
  Perplexity…) now read the full text of every page instead of an empty
  shell. Visitors get the same app — it hydrates in place.
- **Arabic has its own addresses** — `/ar`, `/ar/store`, `/ar/brands`, … —
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
  `/kids`, `/customize` (and their `/ar` versions), in `nginx.conf`.
- **Lighter videos** — the two Home films went from 30.2 MB to 15.7 MB
  with no visible quality loss.

## ⏳ TODO — needs you

### 1. Your domain → `src/data/site.js`, `siteUrl`
Set it to the public address, e.g. `siteUrl: 'https://thename.me'` (no
trailing slash), then rebuild. That one line switches on:
canonical links, hreflang (English ↔ Arabic), `og:url`, the structured
data's `url`/`logo`, the `Sitemap:` line in `robots.txt`, and generates
**`sitemap.xml`** and **`llms.txt`** (a summary written for AI assistants).
All of this was tested with a placeholder domain and works.

Also set **`ALLOWED_ORIGINS`** for the contact service to the same domain
(see `docker-compose.yml`), or the form will reject submissions. The
**confirmation email's link** uses it too (or `PUBLIC_SITE_URL`, if set):
with the localhost default, visitors would receive a link that does not work.

### 2. A share image → `src/data/site.js`, `shareImage`
A 1200×630px image (logo + a product photo works well), saved under
`public/` — e.g. `public/media/brand/share.jpg` →
`shareImage: '/media/brand/share.jpg'`. Shown when a page is shared on
WhatsApp, LinkedIn, X. Needs `siteUrl` too.

### 3. Replace placeholder content (crawlers now read every word)
- **Home rows 03 and 04** still say "Service Three Title" / "Placeholder
  text…" → `home.services.serviceThree` / `serviceFour` in `en.js` and
  `ar.js`. (The videos are real; the text beside them is not.)
- **Phone number** `+971 50 xxx xxxx` → `helloPhone` in `src/data/site.js`.
- **Agency page** is a short placeholder (72 words) → `agency` in the
  translation files, plus real sections in `src/pages/Agency/`.
- **Brands page** is thin (64 words) — a sentence per brand would help it
  rank for searches like "Lexon UAE".
- **Missing photos** — the Home hero, rows 01/02, the Corporate Gifts cards
  and others still show the dashed placeholder. The list of every expected
  file is `src/data/media.js`.

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
