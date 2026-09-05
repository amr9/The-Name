// Shared site data used across pages — edit here to update it everywhere
// (navbar, footer, contact links). Display text lives in src/i18n/translations/,
// not here — this file only holds structural/non-linguistic facts.
export const site = {
  name: 'The Name',
  phone: '+44 7700 900123',
  shopUrl: 'https://example.com/vertex',
};

export const waLink = 'https://wa.me/' + site.phone.replace(/[^0-9]/g, '');

// `key` looks up the label in each translation's `nav` section.
export const navLinks = [
  { to: '/', key: 'home' },
  { to: '/menu', key: 'menu' },
  { to: '/shop', key: 'vertex' },
  { to: '/catering', key: 'catering' },
];
