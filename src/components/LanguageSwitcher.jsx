import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { languages } from '../i18n/languages.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import './LanguageSwitcher.css';

// Distance from the trigger to the menu, and the smallest margin we will ever
// leave between the menu and the edge of the screen.
const GAP = 10;
const EDGE = 12;

/**
 * The language menu.
 *
 * The menu and its scrim are rendered in a PORTAL on <body>, not in place, and
 * positioned from the trigger's own box. That is not decoration — `.navbar`
 * carries `backdrop-filter`, and an element with a backdrop-filter becomes the
 * containing block for `position: fixed` descendants AND opens a new stacking
 * context. Left inside the bar, the scrim's `inset: 0` covered only the navbar
 * instead of the page, and the menu's z-index was trapped under the bar's own.
 * Both broke on narrow screens, where the nav wraps and the bar is short.
 *
 * Positioning from the trigger's rect also settles the drift: the trigger
 * moves when nav labels change width between languages, and the menu now
 * follows it and is clamped to the viewport, so it lands in the same place
 * relative to the button at every width, in every language, LTR or RTL.
 */
export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(null);
  const { lang, setLang } = useLanguage();
  const triggerRef = useRef(null);

  const rtl = languages.find((l) => l.code === lang)?.dir === 'rtl';

  // Pin the menu's trailing edge to the trigger's trailing edge, then clamp so
  // it can never run off the screen. Only one axis is set: `max-width` in the
  // stylesheet keeps the far edge inside the viewport.
  const place = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    // clientWidth, not innerWidth — it excludes the scrollbar.
    const vw = document.documentElement.clientWidth;
    setPos(rtl
      ? { top: r.bottom + GAP, left: Math.max(EDGE, r.left) }
      : { top: r.bottom + GAP, right: Math.max(EDGE, vw - r.right) });
  }, [rtl]);

  // Measured before opening, so the menu never paints at the wrong spot first.
  const toggle = () => {
    if (open) { setOpen(false); return; }
    place();
    setOpen(true);
  };

  useLayoutEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    // The bar is sticky, so scrolling can still move the trigger under it.
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, place]);

  return (
    <div className="lang-switcher">
      <button
        ref={triggerRef}
        type="button"
        className="btn btn-secondary lang-switcher-trigger"
        onClick={toggle}
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

      {open && createPortal(
        <>
          {/* Genuinely covers the page now that it is outside the navbar. */}
          <div className="lang-switcher-scrim" onClick={() => setOpen(false)} />
          <div role="listbox" className="popover lang-switcher-menu" style={pos ?? undefined}>
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                role="option"
                aria-selected={lang === l.code}
                data-active={lang === l.code}
                className="popover-option lang-switcher-option"
                onClick={() => { setLang(l.code); setOpen(false); }}
              >
                <span className="lang-switcher-code">{l.code}</span>
                <span className="lang-switcher-name">{l.name}</span>
                <span className="lang-switcher-check">{lang === l.code ? '✓' : ''}</span>
              </button>
            ))}
          </div>
        </>,
        document.body,
      )}
    </div>
  );
}
