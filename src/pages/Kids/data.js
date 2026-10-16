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
// public/media/photos/events/, matching the slot ratio in Kids.jsx.
export const activationShots = [
  { id: 'showingProducts' },
  { id: 'theCollection' },
  { id: 'mugs' },
  { id: 'withParents' },
  { id: 'makingTogether' },
  { id: 'onTheStand' },
];

// The Events page's services (components/ServicePage), in order: one
// section each. Each title is the matching Events chip on Home (i18n
// home.pillars.events.tags, SAME ORDER); the copy is i18n
// eventsPage.services[id].
export const eventServices = [
  { id: 'events' },
  { id: 'activations' },
  { id: 'launches' },
  { id: 'concepts' },
  { id: 'branding' },
  { id: 'production' },
  { id: 'experiences' },
];
