// Structural only — every string (name, note, minimum-order label, terms)
// lives in src/i18n/translations/*.js under business.*, keyed by these ids.

// The branded-goods offers shown as cards. Images come from
// data/media.js under media.business.offers[id].
export const brandingOffers = [
  { id: 'corporateGifts' },
  { id: 'onboardingKits' },
  { id: 'eventGiveaways' },
];

// Row order for the catering table. Catering is anything cooked for the
// customer's own address. The off-site event row was removed — what is left
// is the "at your address" offer only.
export const cateringPackageIds = ['deskLunch', 'standingBuffet', 'breakfastTrolley'];
