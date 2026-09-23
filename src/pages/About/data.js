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

// The story, in order. Ids are the keys under i18n about.story.* and the
// slots in data/media.js `about.story` — copy and artwork are looked up by
// the same id, like everywhere else on the site.
export const storyChapters = ['legacy', 'evolution', 'today'];

// The takeovers, where the space itself carries someone else's name. Brand
// and institution names are proper nouns — the same in every language — so
// they live here rather than in i18n (same rule as data/brands.js). `id`
// is the media slot in data/media.js `about.takeovers`.
export const takeovers = [
  { id: 'bentley', name: 'Bentley' },
  { id: 'sephora', name: 'Sephora' },
  { id: 'vogue', name: 'Vogue' },
  { id: 'colombianPavilion', name: 'Colombian Pavilion' },
  { id: 'customShow', name: 'Custom Show' },
];

// The two purpose statements, side by side — keys under about[id].
export const purposeIds = ['mission', 'vision'];
