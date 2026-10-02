import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App.jsx';
import { LanguageProvider, dictionaryFor, dirFor } from './i18n/LanguageContext.jsx';
import { LOCALE_PREFIX, langFromPath, stripLocale } from './i18n/locale.js';
import { headTags, pageHead } from './utils/pageHead.js';

export { navLinks } from './data/site.js';
export { languages } from './i18n/languages.js';
export { localizePath } from './i18n/locale.js';
export { addressLine, site } from './data/site.js';
export { dictionaryFor };

/**
 * Renders one URL to HTML at BUILD time — the server half of main.jsx, used
 * only by scripts/prerender.mjs (built with `vite build --ssr`, never shipped
 * to the browser). Same App, same providers, same basename, so the browser can
 * hydrate exactly what this produced.
 *
 * `onAllReady`, not `onShellReady`: the pages are React.lazy (App.jsx), and a
 * crawler must get the page's real content, not the Suspense fallback — so
 * this waits until every lazy chunk has resolved and rendered.
 */
export function render(url) {
  const lang = langFromPath(url);
  const path = stripLocale(url);

  const html = new Promise((resolve, reject) => {
    let out = '';
    const sink = new PassThrough();
    sink.on('data', (chunk) => { out += chunk; });
    sink.on('end', () => resolve(out));
    const { pipe } = renderToPipeableStream(
      <StaticRouter basename={LOCALE_PREFIX[lang] || '/'} location={url}>
        <LanguageProvider lang={lang}>
          <App />
        </LanguageProvider>
      </StaticRouter>,
      {
        onAllReady: () => pipe(sink),
        onShellError: reject,
        onError: reject,
      },
    );
  });

  return html.then((appHtml) => ({
    appHtml,
    lang,
    dir: dirFor(lang),
    head: headTags(pageHead(path, lang, dictionaryFor(lang))),
  }));
}
