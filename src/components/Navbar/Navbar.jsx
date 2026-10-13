import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../Logo.jsx';
import LanguageSwitcher from '../LanguageSwitcher.jsx';
import { navMenu } from '../../data/site.js';
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

// The small "▾" after a dropdown's label; it turns over while the list is open.
function Chevron() {
  return (
    <svg className="navbar-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// A plain page link in the bar or inside a dropdown. A link to a SECTION
// (with a #hash, e.g. F&B → /about#contact) is a plain Link: NavLink matches
// on the path alone, so it would light up as "current" on that whole page.
function PageLink({ link, label }) {
  if (link.to.includes('#')) {
    return <Link to={link.to} className="navbar-link">{label}</Link>;
  }
  return (
    <NavLink to={link.to} end={link.to === '/'} className="navbar-link">
      {label}
    </NavLink>
  );
}

export default function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  // Which dropdown (by navMenu key) is open, or null. Clicking or keyboard
  // opens it; on a desktop pointer, hovering also shows it (Navbar.css).
  const [subOpen, setSubOpen] = useState(null);
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
  useEffect(() => {
    setOpen(false);
    setSubOpen(null);
  }, [pathname]);

  useEffect(() => {
    if (!open && !subOpen) return undefined;
    const close = () => {
      setOpen(false);
      setSubOpen(null);
    };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    // No scrim: `.navbar` carries a backdrop-filter, which would trap a
    // `position: fixed` overlay inside the bar's own box (the problem
    // LanguageSwitcher.jsx documents at length). An outside-press listener
    // does the same job without needing to escape the bar. The language menu
    // portals onto <body>, so picking a language reads as "outside" and closes
    // this menu too — which is the wanted outcome anyway. Its SCRIM is the
    // exception: a press there only dismisses the language menu, so the
    // phone menu it was opened from stays open.
    const onDown = (e) => {
      if (barRef.current?.contains(e.target)) return;
      if (e.target.closest?.('.lang-switcher-scrim')) return;
      close();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [open, subOpen]);

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
        {navMenu.map((item) => {
          if (!item.children) {
            return (
              <span key={item.key} className="navbar-item">
                <PageLink link={item} label={t.nav[item.key]} />
              </span>
            );
          }
          // A dropdown: a button, not a link — it opens the list. It is lit
          // like a current page while any page inside it is the one open.
          const isOpen = subOpen === item.key;
          const listId = `navbar-sub-${item.key}`;
          const current = item.children.some((c) => c.to === pathname);
          return (
            <span key={item.key} className="navbar-item navbar-dropdown" data-open={isOpen}>
              <button
                type="button"
                className="navbar-link navbar-dropdown-trigger"
                data-current={current}
                aria-expanded={isOpen}
                aria-controls={listId}
                onClick={() => setSubOpen(isOpen ? null : item.key)}
              >
                {t.nav[item.key]}
                <Chevron />
              </button>
              <ul id={listId} className="navbar-sub">
                {item.children.map((c) => (
                  <li key={c.key}>
                    <PageLink link={c} label={t.nav[c.key]} />
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
