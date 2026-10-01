import { createContext, useContext, useEffect, useMemo } from 'react';
import { languages } from './languages.js';
import { localizePath, stripLocale } from './locale.js';
import en from './translations/en.js';
import ar from './translations/ar.js';

const DICTS = { EN: en, AR: ar };
const DIRS = Object.fromEntries(languages.map((l) => [l.code, l.dir]));

// Recursively layers `override` onto `base` (English) so any key a
// translation hasn't filled in yet still renders instead of crashing or
// showing blank text.
function deepMerge(base, override) {
  if (base && typeof base === 'object' && !Array.isArray(base) && typeof base !== 'function') {
    const out = { ...base };
    if (override && typeof override === 'object') {
      for (const key of Object.keys(override)) {
        out[key] = key in base ? deepMerge(base[key], override[key]) : override[key];
      }
    }
    return out;
  }
  return override !== undefined ? override : base;
}

// The full copy for one language, English filling any gaps. Exported for code
// that runs outside React — the build-time pre-render reads page titles and
// descriptions through it (scripts/prerender.mjs via entry-server.jsx).
export function dictionaryFor(lang) {
  return deepMerge(en, DICTS[lang] ?? en);
}

export const dirFor = (lang) => DIRS[lang] || 'ltr';

const LanguageContext = createContext(null);

/**
 * `lang` comes from the URL (i18n/locale.js) — main.jsx and entry-server.jsx
 * read it off the path and pass it in, so the server-rendered HTML and the
 * browser agree on it before hydration. It used to be a localStorage choice;
 * that was invisible to search engines, and is gone (French and Spanish were
 * removed at the same time, so an old saved FR/ES choice simply no longer
 * applies).
 */
export function LanguageProvider({ lang, children }) {
  const dir = dirFor(lang);

  useEffect(() => {
    document.documentElement.lang = lang.toLowerCase();
    document.documentElement.dir = dir;
  }, [lang, dir]);

  // Switching language is a NAVIGATION to the same page under the other
  // language's prefix — a full load, so the visitor gets that language's
  // pre-rendered HTML and the router its new basename.
  const setLang = (code) => {
    if (!DICTS[code] || code === lang) return;
    const { pathname, search, hash } = window.location;
    window.location.assign(localizePath(stripLocale(pathname), code) + search + hash);
  };

  const t = useMemo(() => dictionaryFor(lang), [lang]);
  const value = useMemo(() => ({ lang, setLang, dir, t }), [lang, dir, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
