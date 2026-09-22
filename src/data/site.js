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

// Every WhatsApp trigger on the site links here (WhatsAppButton, the chat
// launcher's WhatsApp option, the footer), and the footer prints
// `site.phone` itself — so the number above is the single place to change it.
export const waLink = `https://wa.me/${site.phone.replace(/[^0-9]/g, '')}`;

// Social profiles, shown as icon links in the footer.
// TODO: swap these placeholder URLs for the real handles.
export const socials = [
  { key: 'instagram', label: 'Instagram', url: 'https://instagram.com/' },
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
  // `sparkle` gives this link the twinkle in the bar (Navbar.css). Only one
  // entry should ever carry it — two competing twinkles read as a glitch.
  { to: '/business', key: 'business', sparkle: true },
  // { to: '/cafe', key: 'cafe' },
  { to: '/kids', key: 'kids' },
  { to: '/about', key: 'about' },
  // `sections` turns a nav entry into a hover menu: the Navbar renders one
  // item per entry, each linking to that heading on the policies page. The
  // ids match the doc ids in pages/Policies/data.js and the labels come from
  // `nav.policyTabs` in the translations.
  { to: '/policies', key: 'policies', sections: ['terms', 'delivery', 'privacy'] },
];
