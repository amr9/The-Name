// Shared site data used across pages — edit here to update it everywhere
// (navbar, footer, contact links). Display text lives in src/i18n/translations/,
// not here — this file only holds structural/non-linguistic facts.
export const site = {
  name: 'The Name',
  // The registered entity, for the policy pages and anywhere else the legal
  // name is required rather than the trading name above.
  legalName: 'THE NAME CONCEPT RESTAURANT FZCO',
  licensedBy: 'Dubai Integrated Economic Zones Authority (DIEZ)',
  address: 'Dubai CommerCity, Dubai, United Arab Emirates',
  phone: '+971 54 344 4565',
  // Orders, delivery, returns, complaints — and where the contact form's
  // submissions are meant to land.
  email: 'operations@thename.me',
  // Privacy and personal-data requests go to a separate inbox; the policies
  // page and the Privacy Policy both point here.
  privacyEmail: 'info@thename.me',
  // The online store, off-site. Everything that leaves for it reads this —
  // the Shop page's hero button and its per-item View/Personalise links. (The
  // Kids and Home "shop" CTAs are router Links to /shop, not to the store.)
  shopUrl: 'https://store.thename.ae',
};

// The address as a Google Maps DIRECTIONS link — `dir/?api=1&destination=` is
// Maps' documented URL form, and it opens the app already asking "how do I get
// there", with the origin left to the visitor's own location rather than
// guessed. Built from `site.address` so the two can never disagree; if a
// precise pin is ever needed, replace the destination with "lat,lng" and add
// `&destination_place_id=`.
export const mapsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.address)}`;

// Every WhatsApp trigger on the site links here (WhatsAppButton, the chat
// launcher's WhatsApp option, the footer), and the footer prints
// `site.phone` itself — so the number above is the single place to change it.
export const waLink = `https://wa.me/${site.phone.replace(/[^0-9]/g, '')}`;

// Social profiles, shown as icon links in the footer.
// TODO: Facebook and TikTok are still PLACEHOLDERS pointing at each network's
// home page — swap them for the real handles. Instagram is the live account.
export const socials = [
  { key: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/thename.me/' },
  { key: 'facebook', label: 'Facebook', url: 'https://facebook.com/' },
  { key: 'tiktok', label: 'TikTok', url: 'https://tiktok.com/' },
];

// `key` looks up the label in each translation's `nav` section.
// The cafe entry is parked rather than deleted — uncomment it here and its
// import/route in App.jsx to bring the page back. Contact is gone for good:
// the enquiry form now sits at the foot of /about.
export const navLinks = [
  { to: '/', key: 'home' },
  { to: '/shop', key: 'shop' },
  // Sits right after the store, as it does on store.thename.ae.
  { to: '/customize', key: 'customize' },
  // `highlight` is the one emphasised link in the bar: bold, in the accent,
  // and nothing else (Navbar.css). Only one entry should ever carry it — two
  // emphasised links emphasise nothing.
  { to: '/business', key: 'business', highlight: true },
  // { to: '/cafe', key: 'cafe' },
  { to: '/kids', key: 'kids' },
  { to: '/about', key: 'about' },
  // /policies is deliberately NOT here — it lives in the footer instead, as
  // the three documents themselves (see policySections below).
];

// The three legal documents, linked from the footer beside the logo rather
// than from the navbar. The ids match the doc ids in pages/Policies/data.js
// (so `/policies#<id>` lands on that heading) and the labels come from
// `nav.policyTabs` in the translations.
export const policySections = ['terms', 'delivery', 'privacy'];
