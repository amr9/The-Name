import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { LanguageProvider } from './i18n/LanguageContext.jsx';
import { LOCALE_PREFIX, langFromPath } from './i18n/locale.js';
import './styles/theme.css';

// The language is in the URL (i18n/locale.js); its prefix is the router's
// basename, so the app's own routes never mention it.
const lang = langFromPath(window.location.pathname);

const app = (
  <React.StrictMode>
    <BrowserRouter basename={LOCALE_PREFIX[lang] || '/'}>
      <LanguageProvider lang={lang}>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// A production page arrives PRE-RENDERED (scripts/prerender.mjs): its HTML is
// already in #root, so React hydrates — takes over that markup in place —
// rather than throwing it away and drawing it again. The dev server serves the
// bare index.html, with an empty #root, so there it renders from scratch.
const root = document.getElementById('root');
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app);
else ReactDOM.createRoot(root).render(app);
