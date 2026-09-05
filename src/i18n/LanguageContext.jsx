import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { languages } from './languages.js';
import en from './translations/en.js';
import fr from './translations/fr.js';
import es from './translations/es.js';
import ar from './translations/ar.js';

const DICTS = { EN: en, FR: fr, ES: es, AR: ar };
const DIRS = Object.fromEntries(languages.map((l) => [l.code, l.dir]));
const STORAGE_KEY = 'the-name.lang';
const DEFAULT_LANG = 'EN';

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

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && DICTS[stored]) return stored;
    } catch {}
    return DEFAULT_LANG;
  });

  const dir = DIRS[lang] || 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang.toLowerCase();
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = (code) => {
    if (!DICTS[code]) return;
    setLangState(code);
    try { localStorage.setItem(STORAGE_KEY, code); } catch {}
  };

  const t = useMemo(() => deepMerge(en, DICTS[lang]), [lang]);
  const value = useMemo(() => ({ lang, setLang, dir, t }), [lang, dir, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
