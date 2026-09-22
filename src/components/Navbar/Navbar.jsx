import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../Logo.jsx';
import LanguageSwitcher from '../LanguageSwitcher.jsx';
import { navLinks } from '../../data/site.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './Navbar.css';

// The stack icon on the toggle: three bars closed, a cross once the menu is
// open, so the button reads as the thing that also closes it.
function ToggleIcon({ open }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden="true">
      {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}

export default function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const barRef = useRef(null);

  // The pages and the language switcher are rendered ONCE, in `.navbar-menu`.
  // Above the mobile breakpoint that wrapper is `display: contents`, so they
  // are laid out as direct children of the bar exactly as before; below it the
  // wrapper becomes the dropdown panel. Rendering them twice and hiding one
  // copy would duplicate both the markup and the switcher's state.
  const menuId = 'navbar-menu';

  // Following a link navigates without unmounting the bar, so the menu has to
  // be told to close.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    // No scrim: `.navbar` carries a backdrop-filter, which would trap a
    // `position: fixed` overlay inside the bar's own box (the problem
    // LanguageSwitcher.jsx documents at length). An outside-press listener
    // does the same job without needing to escape the bar. The language menu
    // portals onto <body>, so picking a language reads as "outside" and closes
    // this menu too — which is the wanted outcome anyway.
    const onDown = (e) => { if (!barRef.current?.contains(e.target)) setOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  return (
    <nav className="nav navbar" ref={barRef}>
      <NavLink to="/" end className="nav-brand">
        <Logo />
      </NavLink>

      <button
        type="button"
        className="navbar-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={t.nav.menu}
      >
        <ToggleIcon open={open} />
      </button>

      <div id={menuId} className="navbar-menu" data-open={open}>
        {navLinks.map((link) => {
          const label = (
            <NavLink to={link.to} end={link.to === '/'} className="navbar-link">
              {t.nav[link.key]}
            </NavLink>
          );

          // A plain page is just its link. A page with `sections` (today only
          // /policies) also gets the menu below, which opens on hover and on
          // keyboard focus — hover alone would leave it unreachable by
          // keyboard, and unopenable on a touch screen where the first tap on
          // the parent follows the link instead.
          if (!link.sections) return <span key={link.to} className="navbar-item">{label}</span>;

          return (
            <span key={link.to} className="navbar-item navbar-item-has-menu">
              {label}
              <ul className="navbar-sub">
                {link.sections.map((id) => (
                  <li key={id}>
                    {/* `to` carries the hash, so the jump goes through the
                        router and hooks/useScrollToTop.js scrolls to it —
                        a plain <a href="#id"> would bypass both. */}
                    <Link to={`${link.to}#${id}`} className="navbar-sub-link">
                      {t.nav.policyTabs[id]}
                    </Link>
                  </li>
                ))}
              </ul>
            </span>
          );
        })}

        <LanguageSwitcher />
      </div>
    </nav>
  );
}
