// Shared site data used across pages — edit here to update it everywhere
// (navbar, footer, contact links). Display text lives in src/i18n/translations/,
// not here — this file only holds structural/non-linguistic facts.
export const site = {
  name: 'The Name',
  // The registered entity, for the policy pages and anywhere else the legal
  // name is required rather than the trading name above.
  legalName: 'THE NAME CONCEPT RESTAURANT FZCO',
  licensedBy: 'Dubai Integrated Economic Zones Authority (DIEZ)',

  // — CONTACT DETAILS: the ONE place they are written —
  //
  // The footer, the contact form's details list, the WhatsApp buttons, the
  // search engines' business data (utils/pageHead.js), llms.txt, the policy
  // copy and the contact service all read these, directly or through the
  // derived exports below this object (addressLine, mapsLink,
  // telLink, waLink). Change a number or an inbox here and every one follows.
  //
  // The one phone line: printed in the footer and the form, dialled by
  // telLink, and the WhatsApp number (waLink).
  phone: '+971 54 344 4565',
  // Orders, delivery, returns, complaints — the form's "Email" line, and
  // where the contact service sends submissions unless MAIL_TO overrides it.
  email: 'operations@thename.me',
  // General enquiries AND privacy / personal-data requests: the footer's
  // Contact column, the form's Privacy line and the business data.
  infoEmail: 'info@thename.me',
  // The address, in parts, so each place can print the form it needs (see
  // addressLine below) without the place being retyped.
  address: {
    building: 'Building 3',
    area: 'Umm Ramool',
    district: 'Dubai CommerCity',
    city: 'Dubai',
    country: 'United Arab Emirates',
    countryShort: 'UAE',
    countryCode: 'AE',
  },

  // The online store, off-site. Everything that leaves for it reads this —
  // the Shop page's hero button and its per-item View/Personalise links. (The
  // Kids and Home "shop" CTAs are router Links to routes.shop, not to the store.)
  shopUrl: 'https://store.thename.ae',
  // The store's OWN page for the pieces it will personalise. The Customize
  // Yours page mirrors that selection (data/storeCustomizable.js) and its CTA
  // hands you to this rather than to the shop front, the same way the Shop
  // page's button hands you to a category page rather than the front. Not
  // under /shop/: it is a CMS page on the store, not a category.
  customizableUrl: 'https://store.thename.ae/customizable-products',
  // The Odoo shop. The navbar and footer "Shop" links go straight here while
  // the in-app Shop page (/store) is PARKED — see App.jsx.
  odooShopUrl: 'https://thenamemea.odoo.llc/shop',

  // — SEO (read by utils/pageHead.js and scripts/prerender.mjs) —
  //
  // The site's public origin, no trailing slash. Search engines require
  // ABSOLUTE addresses for canonical links, hreflang alternates, og:url, the
  // sitemap and the structured data's url/logo — all built from this. Left
  // empty, every one of them is dropped (the build prints a reminder); set,
  // the build also writes sitemap.xml and llms.txt.
  siteUrl: 'https://thename.ae',
  // TODO(SEO): the image shown when a page is shared on WhatsApp, LinkedIn,
  // X… — 1200x630px, saved under public/ (e.g. '/media/the-name/share.jpg').
  // Needs `siteUrl` too: og:image must be absolute.
  shareImage: '',
};

// — Derived from the contact details above. Never retype these elsewhere. —
const { building, area, district, city, country } = site.address;

// The address on ONE line — the contact form, the policy copy ({address}),
// llms.txt.
export const addressLine = `${building}, ${area}, ${district}, ${city}, ${country}`;


// The address as a Google Maps DIRECTIONS link — `dir/?api=1&destination=` is
// Maps' documented URL form, and it opens the app already asking "how do I get
// there", with the origin left to the visitor's own location rather than
// guessed. Used by the form's "Find us" link and the business data. The
// destination is the district, not the building: that is what Maps resolves
// reliably. If a precise pin is ever needed, replace it with "lat,lng" and add
// `&destination_place_id=`.
export const mapsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${district}, ${city}, ${country}`)}`;

// Dialling the phone (footer and form). Null while the number is still a
// placeholder with x's in it, so a fake number is never dialable — callers
// print it as plain text then.
export const telLink = /x/i.test(site.phone) ? null : `tel:${site.phone.replace(/[^+0-9]/g, '')}`;

// Every WhatsApp trigger on the site links here (WhatsAppButton, the chat
// launcher's WhatsApp option) — the same number as `site.phone`.
export const waLink = `https://wa.me/${site.phone.replace(/[^0-9]/g, '')}`;

// Social profiles — Instagram and LinkedIn are shown as icons in the footer's
// Connect column (Footer.jsx picks them by key); all of them feed the business data's
// sameAs (utils/pageHead.js).
//
// An entry carries EITHER `url` (a real profile, opened in the same tab) or `to`
// (an in-app route). Instagram and LinkedIn are live; Facebook and TikTok
// are not published yet, so they point at paths no route matches and land on
// the custom 404 instead. That is deliberate: they used to link to
// facebook.com and tiktok.com, which sent a visitor off the site to a network
// home page with no way back and looked like a broken promise of an account
// that exists. The 404 names the missing path and repeats the whole navbar.
//
// TODO: when the real handles arrive, swap each `to` for a `url` — that alone
// makes the icon an external link again, no component change needed.
export const socials = [
  { key: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/thename.me/' },
  { key: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/company/the-name-me/' },
  { key: 'facebook', label: 'Facebook', to: '/social/facebook' },
  { key: 'tiktok', label: 'TikTok', to: '/social/tiktok' },
];

// `key` looks up the label in each translation's `nav` section.
// The cafe entry is parked rather than deleted — uncomment it here and its
// import/route in App.jsx to bring the page back. Contact is gone for good:
// the enquiry form now sits at the foot of /about.
// Every page's URL, in ONE place. The paths spell the page's name in the
// navbar (i18n `nav`): Store → /store, Corporate gifts → /corporate-gifts.
// The Name is the home page, so it stays at the root. Everything that links
// to a page — routes, nav, footer, buttons, the chatbot — reads these, so
// renaming a page's URL is a one-line change here (plus a redirect from the
// old path in App.jsx, so existing links keep working).
export const routes = {
  home: '/',
  shop: '/store',
  brands: '/brands',
  business: '/corporate-gifts',
  agency: '/agency',
  // The Kids page under its new name, Events (/kids redirects here). Its
  // files are still pages/Kids/ and its copy is still i18n `kids`.
  events: '/events',
  about: '/about',
  // Parked pages — not routed at the moment (see App.jsx).
  cafe: '/cafe',
};

// Every routed page, flat. Read by the 404 page's signpost and by
// utils/pageHead.js (which pages are indexable) — NOT by the navbar or the
// footer, which group the pages differently (navMenu, footerExplore below).
// All are labelled from i18n `nav[key]`, so a page has one name everywhere;
// the bar and the footer print them in CAPITALS via CSS text-transform.
export const navLinks = [
  { to: routes.home, key: 'home' },
  // { to: routes.shop, key: 'shop' }, // PARKED with the Shop page (App.jsx)
  { to: routes.brands, key: 'brands' },
  { to: routes.business, key: 'business' },
  { to: routes.agency, key: 'agency' },
  // { to: routes.cafe, key: 'cafe' },
  { to: routes.events, key: 'events' },
  { to: routes.about, key: 'about' },
  // /policies is deliberately NOT here — it is parked, and Terms & Privacy
  // will link to the store's own pages (see policySections below).
];

// Where EVERY "Shop" button and link goes: the Odoo store, straight there,
// while the in-app Shop page (/store) is PARKED (App.jsx). It is a full URL,
// so the buttons are plain <a href={shopLink}> rather than router Links (in
// data lists: an `href` entry instead of a `to`).
export const shopLink = site.odooShopUrl;

// The enquiry form, at the foot of /about. Every "contact" link reads this.
export const contactLink = `${routes.about}#contact`;

// The Home page's "What we do" section — the footer's Explore column lands
// on it.
export const whatWeDoLink = `${routes.home}#what-we-do`;

// The five pillars, in the brief's order: the navbar's "What we do" dropdown
// AND the footer's "What we do" column. Labels from i18n `nav[key]`.
// F&B points at the enquiry form while /cafe is PARKED — switch it to
// routes.cafe when that page returns.
export const whatWeDoLinks = [
  { to: routes.business, key: 'business' },
  { to: routes.brands, key: 'brands' },
  { to: routes.agency, key: 'agency' },
  { to: routes.events, key: 'events' },
  { to: contactLink, key: 'fnb' },
];

// The navbar, top level. An entry with `children` is a DROPDOWN instead of a
// link: its label is a button that opens the list (Navbar.jsx). An entry with
// `url` instead of `to` is an EXTERNAL link (a plain <a>).
export const navMenu = [
  { to: routes.home, key: 'home' },
  { url: shopLink, key: 'shop' },
  { key: 'whatWeDo', children: whatWeDoLinks },
  { to: routes.about, key: 'about' },
];

// The footer's Explore column.
export const footerExplore = [
  { to: routes.home, key: 'home' },
  { url: shopLink, key: 'shop' },
  { to: whatWeDoLink, key: 'whatWeDo' },
  { to: routes.about, key: 'about' },
];

// The three legal documents, linked from the footer beside the logo rather
// than from the navbar. The ids match the doc ids in pages/Policies/data.js
// (so `/policies#<id>` lands on that heading) and the labels come from
// `nav.policyTabs` in the translations.
export const policySections = ['terms', 'delivery', 'privacy'];
