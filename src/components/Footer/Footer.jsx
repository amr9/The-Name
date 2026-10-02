import { Link } from 'react-router-dom';
import Logo from '../Logo.jsx';
import SocialLinks from './SocialLinks.jsx';
import { addressLines, mapsLink, navLinks, site, telLink } from '../../data/site.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './Footer.css';

// A full-width band: the brand block (logo + socials) on one side, then
// three columns — Useful Links, Address, Contact — and a copyright row
// under a hairline. Layout after the 3distica.com footer; colours and
// gradient are the site's own. Useful Links IS the navbar's list (navLinks,
// labelled from i18n `nav`), so the two always show the same pages and names.
//
// The Terms & Privacy links that used to sit here are NOT part of this
// layout: they will point at the store's own policy pages, and /policies is
// parked (see App.jsx). policySections in data/site.js is kept for that.
export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Logo size="lg" on="dark" />
          <SocialLinks />
        </div>

        <div className="footer-columns">
          <nav className="footer-column" aria-label={f.linksHeading}>
            <h2 className="footer-title">{f.linksHeading}</h2>
            <ul className="footer-link-grid">
              {navLinks.map((l) => (
                <li key={l.key}>
                  <Link to={l.to} className="footer-link">{t.nav[l.key]}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-column">
            <h2 className="footer-title">{f.addressHeading}</h2>
            {/* The address, its Maps link, the email and the phone all come
                from data/site.js — the same values the contact form prints. */}
            <a href={mapsLink} className="footer-link footer-address">
              {addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </a>
          </div>

          <div className="footer-column">
            <h2 className="footer-title">{f.helloHeading}</h2>
            <a href={`mailto:${site.infoEmail}`} className="footer-link footer-email">{site.infoEmail}</a>
            {telLink ? (
              <a href={telLink} className="footer-phone">{site.phone}</a>
            ) : (
              <span className="footer-phone">{site.phone}</span>
            )}
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        {/* The year is baked in at build time by the pre-render and recomputed
            in the browser; on a new year the two differ, which is expected. */}
        <span suppressHydrationWarning>© {new Date().getFullYear()} {site.name}. {f.rights}</span>
      </div>
    </footer>
  );
}
