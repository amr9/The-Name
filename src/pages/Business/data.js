// Structural only — every string (name, note, minimum-order label, terms)
// lives in src/i18n/translations/*.js under business.*, keyed by these ids.

// The branded-goods offers shown as cards. Images come from
// data/media.js under media.business.offers[id].
export const brandingOffers = [
  { id: 'corporateGifts' },
  { id: 'onboardingKits' },
  { id: 'eventGiveaways' },
  { id: 'uniform' },
];

// Row order for the catering table. Catering is anything cooked for the
// customer's own address — events held in our room are on /cafe.
export const cateringPackageIds = ['deskLunch', 'standingBuffet', 'offSiteCatering', 'breakfastTrolley'];
