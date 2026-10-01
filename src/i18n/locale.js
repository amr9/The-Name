// The language lives in the URL: English at the root (/store), Arabic under
// /ar (/ar/store). Every language gets its OWN addresses so search engines
// can index each one — a language kept only in localStorage is invisible to a
// crawler, which only ever saw English.
//
// Routing is unchanged: main.jsx and entry-server.jsx hand the prefix to the
// router as its `basename`, so every <Link to={routes.shop}> stays inside the
// current language with no per-link code.

// Keyed by the language codes in ./languages.js. English is the default and
// has no prefix.
export const LOCALE_PREFIX = { EN: '', AR: '/ar' };
export const DEFAULT_LANG = 'EN';

// Which language a full pathname is in.
export function langFromPath(pathname) {
  for (const [lang, prefix] of Object.entries(LOCALE_PREFIX)) {
    if (prefix && (pathname === prefix || pathname.startsWith(`${prefix}/`))) return lang;
  }
  return DEFAULT_LANG;
}

// A pathname with its language prefix removed: /ar/store -> /store.
export function stripLocale(pathname) {
  const prefix = LOCALE_PREFIX[langFromPath(pathname)];
  return prefix ? pathname.slice(prefix.length) || '/' : pathname;
}

// The same page in another language: ('/store', 'AR') -> '/ar/store'.
export function localizePath(path, lang) {
  const prefix = LOCALE_PREFIX[lang] ?? '';
  if (!prefix) return path;
  return path === '/' ? prefix : `${prefix}${path}`;
}
