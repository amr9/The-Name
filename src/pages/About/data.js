// Structural data for the About page — copy lives in i18n under about.*.

// The services, in the order they are listed. `to` is where each one's link
// goes; `showBrands` lists the partner brands (data/brands.js) under it.
export const aboutServices = [
  { id: 'personalGifts', to: '/shop' },
  { id: 'corporateGifting', to: '/business' },
  { id: 'curatedBrands', to: '/shop', showBrands: true },
  { id: 'packaging', to: '/business' },
  // The enquiry form is now at the foot of this page, so this one is an anchor.
  { id: 'creative', to: '#contact' },
  // The cafe page is parked (see App.jsx) — restore this entry alongside it.
  // { id: 'cafe', to: '/cafe' },
];

// The two purpose statements, side by side — keys under about[id].
export const purposeIds = ['mission', 'vision'];
