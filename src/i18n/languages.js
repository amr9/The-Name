// Supported languages — name is written in that language itself (so it
// reads correctly in the switcher regardless of the current locale).
//
// No flag field: components/Flag.jsx draws one per language CODE, so the two
// can never fall out of step. The flag is picked per language rather than per
// territory — Arabic flies the UAE flag, because the store is licensed in and
// delivers only within the Emirates.
export const languages = [
  { code: 'EN', name: 'English', dir: 'ltr' },
  { code: 'AR', name: 'العربية', dir: 'rtl' },
];
