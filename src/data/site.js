// Shared site data used across pages — edit here to update it everywhere
// (navbar, footer, contact links).
export const site = {
  name: 'The Name',
  phone: '+44 7700 900123',
  shopUrl: 'https://example.com/vertex',
  hours: [
    { day: 'Mon – Thu', time: '08:00 – 16:00' },
    { day: 'Friday', time: '08:00 – 16:00 · supper 18:00' },
    { day: 'Sat – Sun', time: '09:00 – 16:00' },
  ],
};

export const waLink = 'https://wa.me/' + site.phone.replace(/[^0-9]/g, '');

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/shop', label: 'Vertex pieces' },
  { to: '/catering', label: 'Catering & events' },
];

export const languages = [
  { code: 'EN', name: 'English' },
  { code: 'AR', name: 'العربية' },
  { code: 'FR', name: 'Français' },
  { code: 'ES', name: 'Español' },
];
