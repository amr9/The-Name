// Structural only — every string (kicker, title, body, cta) lives in
// src/i18n/translations/*.js under kids.*, keyed by these ids.

// The three offer blocks, in the order they appear. Images come from
// data/media.js under media.kids.offers[id].
export const kidsOffers = [
  { id: 'backToSchool' },
  { id: 'newBaby' },
  { id: 'birthdays' },
];

// The activation gallery, in the order the photos run. Ids are the keys
// under i18n kids.activation.shots.* and the slots in data/media.js
// `kids.activation.shots` — caption and picture share the one id.
// Carousel order, left to right. The photos are pre-cropped to 4:3 in
// public/media/kids/, matching the slot ratio in Kids.jsx.
export const activationShots = [
  { id: 'showingProducts' },
  { id: 'theCollection' },
  { id: 'mugs' },
  { id: 'withParents' },
  { id: 'makingTogether' },
  { id: 'onTheStand' },
];
