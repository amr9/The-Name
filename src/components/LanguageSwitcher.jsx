import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { languages } from '../i18n/languages.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import './LanguageSwitcher.css';

// Distance from the trigger to the menu, and the smallest margin we will ever
// leave between the menu and the edge of the screen.
const GAP = 10;
const EDGE = 12;
// First-pass width estimate, before the menu exists to measure. Keep in step
// with min-width in LanguageSwitcher.css.
const MIN_W = 232;

/**
 * The language menu.
 *
 * The menu and its scrim are rendered in a PORTAL on <body>, not in place, and
 * positioned from the trigger's own box. That is not decoration — `.navbar`
 * carries `backdrop-filter`, and an element with a backdrop-filter becomes the
 * containing block for `position: fixed` descendants AND opens a new stacking
 * context. Left inside the bar, the scrim's `inset: 0` covered only the navbar
 * instead of the page, and the menu's z-index was trapped under the bar's own.
 *
 * Placement clamps BOTH edges into the viewport, which needs the menu's real
 * width, so it is measured and re-placed once mounted. Clamping only the
 * anchored edge is not enough, and failed in exactly this case: at 320-360px
 * the longer French nav labels wrap the switcher onto its own row, where as
 * the last item it sits at the LEFT of the bar. A menu whose right edge is
 * pinned to the trigger's then extends off the left of the screen
 * (measured: left = -121px at a 352px viewport).
 */
export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(null);
  const { lang, setLang } = useLanguage();
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const rtl = languages.find((l) => l.code === lang)?.dir === 'rtl';

  const place = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    // The menu is not mounted on the first pass, so estimate from the
    // stylesheet's min-width; the layout effect re-runs this once it is.
    const menu = menuRef.current;
    const mw = menu ? menu.offsetWidth : MIN_W;
    const mh = menu ? menu.offsetHeight : 0;

    // Line the menu's trailing edge up with the trigger's, then clamp it into
    // the viewport from BOTH sides. `maxLeft` is floored at EDGE so that a
    // menu wider than the screen still starts on-screen rather than being
    // pushed off to the left by the clamp meant to keep it on.
    const ideal = rtl ? r.left : r.right - mw;
    const maxLeft = Math.max(EDGE, vw - EDGE - mw);
    const left = Math.min(Math.max(EDGE, ideal), maxLeft);

    // Below the trigger by default; flip above only when it would not fit, and
    // fall back to pinning it inside the bottom edge if it fits neither way.
    let top = r.bottom + GAP;
    if (mh > 0 && top + mh > vh - EDGE) {
      const above = r.top - GAP - mh;
      top = above >= EDGE ? above : Math.max(EDGE, vh - EDGE - mh);
    }

    setPos({ top, left });
  }, [rtl]);

  // Measured before opening, so the menu never paints at the wrong spot first.
  const toggle = () => {
    if (open) { setOpen(false); return; }
    place();
    setOpen(true);
  };

  useLayoutEffect(() => {
    if (!open) return undefined;
    // Runs after the portal mounts, so the menu can now be measured — this is
    // the pass that gets the width right. useLayoutEffect, not useEffect, so
    // the correction lands before the browser paints and nothing jumps.
    place();
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
          <div ref={menuRef} role="listbox" className="popover lang-switcher-menu" style={pos ?? undefined}>
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
