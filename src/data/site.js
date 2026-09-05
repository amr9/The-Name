// Shared brand/contact data used across pages — edit here to update it
// everywhere (navbar, footer, contact page, WhatsApp links).
export const site = {
  name: 'The Name',
  tagline: 'Your Social Hub',
  phone: '+971 50 000 0000',
  address: 'D3 Dubai, Building 9',
  website: 'www.thename.me',
  instagram: '@thenamesocialhub',
  hours: [
    { day: 'Mon – Thu', time: '08:00 – 23:00' },
    { day: 'Fri – Sat', time: '08:00 – 01:00' },
    { day: 'Sunday', time: '09:00 – 22:00' },
  ],
};

export const waLink = 'https://wa.me/' + site.phone.replace(/[^0-9]/g, '');

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];
