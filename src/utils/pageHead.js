import { mapsLink, navLinks, site, socials } from '../data/site.js';

const { building, area, district, city, country, countryCode } = site.address;
import { languages } from '../i18n/languages.js';
import { DEFAULT_LANG, localizePath } from '../i18n/locale.js';

/**
 * Everything that goes in a page's <head> for search engines and link
 * previews: title, description, robots, canonical, hreflang alternates,
 * Open Graph / Twitter tags and the business's structured data (JSON-LD).
 *
 * ONE function, used twice — so the two can never disagree:
 *   - at build time, scripts/prerender.mjs (through entry-server.jsx) writes
 *     its output into each pre-rendered page's HTML, which is what crawlers
 *     and AI tools read;
 *   - in the browser, hooks/useDocumentHead.js re-applies it on every
 *     client-side navigation, so the tab title and the tags keep matching the
 *     page the visitor is on.
 *
 * Every tag is marked `data-page-head` so the browser side can find and
 * replace the set. Titles and descriptions are COPY, so they live in i18n
 * under `seo[pageKey]`; the page keys are navLinks' keys (data/site.js), plus
 * `notFound`.
 *
 * Anything that needs an absolute URL — canonical, hreflang, og:url,
 * og:image, the JSON-LD url/logo — is emitted only once `site.siteUrl` is set
 * (TODO in data/site.js). Relative values there are ignored or rejected by
 * search engines, so leaving them out is the honest default.
 */

const OG_LOCALE = { EN: 'en_GB', AR: 'ar_AE' };

// The indexable pages, by their path WITHOUT a language prefix. A path not in
// here is the 404 page.
export function pageKeyForPath(path) {
  return navLinks.find((l) => l.to === path)?.key ?? null;
}

const absolute = (path) => (site.siteUrl ? `${site.siteUrl}${path}` : null);

// The business, as schema.org LocalBusiness. Built from data/site.js so the
// address, phone and socials can never drift from what the footer prints.
function businessJsonLd(description) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.name,
    legalName: site.legalName,
    description,
    email: site.infoEmail,
    telephone: site.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${building}, ${area}, ${district}`,
      addressLocality: city,
      addressCountry: countryCode,
    },
    hasMap: mapsLink,
    areaServed: { '@type': 'Country', name: country },
    // Only real profiles: the ones still pointing at an in-app placeholder
    // route (`to`) are not accounts yet.
    sameAs: socials.filter((s) => s.url).map((s) => s.url),
  };
  if (site.siteUrl) {
    data.url = site.siteUrl;
    data.logo = absolute('/media/brand/logo-main-dark.png');
    data.image = absolute(site.shareImage || '/media/brand/logo-main-dark.png');
  }
  return data;
}

/** The head for one page in one language, as plain data. */
export function pageHead(path, lang, t) {
  const key = pageKeyForPath(path) ?? 'notFound';
  const notFound = key === 'notFound';
  const { title, description } = t.seo[key];

  const head = {
    title,
    description,
    lang,
    // A 404 must never be indexed; everything else may.
    robots: notFound ? 'noindex, follow' : 'index, follow',
    canonical: notFound ? null : absolute(localizePath(path, lang)),
    alternates: [],
    ogLocale: OG_LOCALE[lang],
    ogImage: site.shareImage ? absolute(site.shareImage) : null,
    jsonLd: businessJsonLd(t.seo.home.description),
  };
  if (!notFound && site.siteUrl) {
    head.alternates = [
      ...languages.map((l) => ({ hreflang: l.code.toLowerCase(), href: absolute(localizePath(path, l.code)) })),
      { hreflang: 'x-default', href: absolute(localizePath(path, DEFAULT_LANG)) },
    ];
  }
  return head;
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** The same head as an HTML string, every tag marked data-page-head. */
export function headTags(head) {
  const m = (attr, name, content) => content && `<meta data-page-head ${attr}="${name}" content="${esc(content)}">`;
  const tags = [
    `<title data-page-head>${esc(head.title)}</title>`,
    m('name', 'description', head.description),
    m('name', 'robots', head.robots),
    head.canonical && `<link data-page-head rel="canonical" href="${esc(head.canonical)}">`,
    ...head.alternates.map((a) => `<link data-page-head rel="alternate" hreflang="${a.hreflang}" href="${esc(a.href)}">`),
    m('property', 'og:type', 'website'),
    m('property', 'og:site_name', site.name),
    m('property', 'og:title', head.title),
    m('property', 'og:description', head.description),
    m('property', 'og:locale', head.ogLocale),
    m('property', 'og:url', head.canonical),
    m('property', 'og:image', head.ogImage),
    m('name', 'twitter:card', head.ogImage ? 'summary_large_image' : 'summary'),
    m('name', 'twitter:title', head.title),
    m('name', 'twitter:description', head.description),
    // `<` is escaped inside the JSON so no string in it can close the tag.
    `<script data-page-head type="application/ld+json">${JSON.stringify(head.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ];
  return tags.filter(Boolean).join('\n    ');
}
