import { useState } from 'react';
import { languages } from '../i18n/languages.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import './LanguageSwitcher.css';

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  return (
    <div className="lang-switcher">
      <button
        type="button"
        className="btn btn-secondary lang-switcher-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.6 2.4 4 5.5 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.5-4-9s1.4-6.6 4-9z" />
        </svg>
        {lang}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <>
          <div className="lang-switcher-scrim" onClick={() => setOpen(false)} />
          <div role="listbox" className="lang-switcher-menu">
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                role="option"
                aria-selected={lang === l.code}
                data-active={lang === l.code}
                className="lang-switcher-option"
                onClick={() => { setLang(l.code); setOpen(false); }}
              >
                <span className="lang-switcher-code">{l.code}</span>
                <span className="lang-switcher-name">{l.name}</span>
                <span className="lang-switcher-check">{lang === l.code ? '✓' : ''}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
