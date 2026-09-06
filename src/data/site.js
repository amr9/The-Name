// Shared site data used across pages — edit here to update it everywhere
// (navbar, footer, contact links). Display text lives in src/i18n/translations/,
// not here — this file only holds structural/non-linguistic facts.
export const site = {
  name: 'The Name',
  phone: '+971 54 344 4565',
  // Where the contact form's submissions are meant to land.
  email: 'operations@thename.me',
  shopUrl: 'https://example.com/vertex',
};

// Every WhatsApp trigger on the site links here, and the footer prints
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
export const navLinks = [
  { to: '/', key: 'home' },
  { to: '/menu', key: 'menu' },
  { to: '/shop', key: 'vertex' },
  { to: '/catering', key: 'catering' },
  { to: '/contact', key: 'contact' },
];
