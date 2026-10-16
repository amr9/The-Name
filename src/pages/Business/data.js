// Structural only — every string (name, note, minimum-order label, terms)
// lives in src/i18n/translations/*.js under business.*, keyed by these ids.

// The branded-goods offers shown as cards. Images come from
// data/media.js under media.business.offers[id].
export const brandingOffers = [
  { id: 'corporateGifts' },
  { id: 'onboardingKits' },
  { id: 'eventGiveaways' },
];

// The page's services (components/ServicePage), in order: one section each.
// Each title is the matching Corporate Gifts chip on Home (i18n
// home.pillars.corporateGifts.tags, SAME ORDER); the copy is i18n
// giftsPage.services[id].
export const giftServices = [
  { id: 'curated' },
  { id: 'concepts' },
  { id: 'merchandise' },
  { id: 'customisation' },
  { id: 'packaging' },
  { id: 'production' },
];
