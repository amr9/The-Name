// Structural shape only — section/dish names, times, notes, tags and prices
// live in src/i18n/translations/*.js under cafe.sections[id], and the event
// package copy under cafe.events.packages[id].
export const menuSections = [
  { id: 'counter', items: [{ id: 'breadConservaOil' }, { id: 'anchovyToast' }, { id: 'oliveOilCake' }] },
  { id: 'kitchen', items: [{ id: 'whiteBeans' }, { id: 'roastCarrot' }, { id: 'porkSandwich' }] },
  { id: 'drinks', items: [{ id: 'houseFilter' }, { id: 'flatWhite' }, { id: 'citrusSoda' }] },
];

// Row order for the events table. Events are the ones held in this room —
// anything at the customer's address is catering, and lives on /business.
export const eventPackageIds = ['roomHire', 'supperClub', 'launchNight', 'privateBreakfast'];
