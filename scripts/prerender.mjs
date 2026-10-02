// Build-time pre-render — run by `npm run build` after the two Vite builds:
//
//   vite build                                  → dist/      (the site)
//   vite build --ssr src/entry-server.jsx       → dist-ssr/  (a Node renderer)
//   node scripts/prerender.mjs                  → fills dist/ with real HTML
//
// WHY: the site is a React single-page app, so every URL used to send the
// same empty <div id="root"></div>. Google renders JavaScript late and
// unreliably; most AI crawlers (GPTBot, ClaudeBot, PerplexityBot…) never run
// it at all, so to them every page was blank. This writes each page's
// finished HTML — text, headings, links, and its own <title>, description,
// share tags and structured data (utils/pageHead.js) — into its own file.
// Visitors get the same app: main.jsx hydrates the HTML in place.
//
// Output, per language in i18n/languages.js (English unprefixed, Arabic /ar):
//   dist/index.html, dist/store/index.html, …     every navLinks page
//   dist/ar/index.html, dist/ar/store/index.html, …
//   dist/404.html, dist/ar/404.html               served with a real 404 status
//   dist/robots.txt                               always
//   dist/sitemap.xml, dist/llms.txt               only once site.siteUrl is set
//
// nginx.conf serves these files (and the 404s and 301 redirects) — keep the
// two in step.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

// React's production build: same HTML, faster, and without dev-only warnings.
process.env.NODE_ENV ??= 'production';

const { render, navLinks, languages, localizePath, site, addressLine, dictionaryFor } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
for (const marker of ['<html lang="en">', '<title>The Name</title>', '<div id="root"></div>']) {
  if (!template.includes(marker)) throw new Error(`prerender: index.html no longer contains ${marker} — update the injection below.`);
}

function page({ appHtml, lang, dir, head }) {
  return template
    .replace('<html lang="en">', `<html lang="${lang.toLowerCase()}" dir="${dir}">`)
    .replace('<title>The Name</title>', head)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

function write(file, html) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

// A path that matches no route, so App renders the NotFound page.
const MISSING = '/__not-found__';
const written = [];

for (const { code } of languages) {
  for (const { to } of navLinks) {
    const url = localizePath(to, code);
    const file = url === '/' ? 'index.html' : `${url.slice(1)}/index.html`;
    write(path.join(dist, file), page(await render(url)));
    written.push(url);
  }
  const prefix = localizePath('/', code) === '/' ? '' : localizePath('/', code).slice(1) + '/';
  write(path.join(dist, `${prefix}404.html`), page(await render(localizePath(MISSING, code))));
  written.push(`/${prefix}404.html`);
}

// — robots.txt: everyone welcome, AI crawlers named explicitly —
// A blanket Allow already covers them; naming them documents the decision
// and survives anyone later adding a narrower rule above.
const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
  'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Bingbot'];
const robots = [
  '# The Name — every page may be crawled and indexed, by search engines and AI assistants alike.',
  'User-agent: *',
  'Allow: /',
  'Disallow: /api/',
  '',
  ...AI_BOTS.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', 'Disallow: /api/', '']),
  site.siteUrl ? `Sitemap: ${site.siteUrl}/sitemap.xml` : '# TODO(SEO): set site.siteUrl in src/data/site.js to add the Sitemap line.',
  '',
].join('\n');
write(path.join(dist, 'robots.txt'), robots);

// — sitemap.xml and llms.txt need absolute URLs —
const todo = [];
if (site.siteUrl) {
  const abs = (p) => `${site.siteUrl}${p}`;
  const urls = navLinks.map(({ to }) => {
    const alts = languages.map((l) => `    <xhtml:link rel="alternate" hreflang="${l.code.toLowerCase()}" href="${abs(localizePath(to, l.code))}"/>`).join('\n');
    return languages.map((l) => `  <url>\n    <loc>${abs(localizePath(to, l.code))}</loc>\n${alts}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(to)}"/>\n  </url>`).join('\n');
  }).join('\n');
  write(path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`);

  // llms.txt (llmstxt.org): a plain summary an AI assistant can read in one
  // request. Built from the same page titles/descriptions as the <head>.
  const en = dictionaryFor('EN');
  const lines = navLinks.map(({ to, key }) => `- [${en.seo[key].title}](${abs(to)}): ${en.seo[key].description}`);
  write(path.join(dist, 'llms.txt'), [
    `# ${site.name}`,
    '',
    `> ${en.seo.home.description}`,
    '',
    `${site.name} (${site.legalName}) is based in ${addressLine}. Contact: ${site.infoEmail}, ${site.phone}. Online store: ${site.shopUrl}.`,
    'The site is available in English and Arabic (Arabic pages are under /ar/).',
    '',
    '## Pages',
    '',
    ...lines,
    '',
  ].join('\n'));
} else {
  todo.push('site.siteUrl is empty (src/data/site.js) — skipped sitemap.xml, llms.txt, canonical/hreflang/og:url and the JSON-LD url/logo.');
}
if (!site.shareImage) todo.push('site.shareImage is empty — pages have no og:image (link previews show no picture).');

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`prerender: wrote ${written.length} pages: ${written.join(' ')}`);
for (const t of todo) console.warn(`prerender TODO(SEO): ${t}`);
