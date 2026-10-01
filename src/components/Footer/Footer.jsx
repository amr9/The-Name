import { Link } from 'react-router-dom';
import Logo from '../Logo.jsx';
import SocialLinks from './SocialLinks.jsx';
import { mapsLink, navLinks, site } from '../../data/site.js';
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
  // A phone with x's in it is a placeholder, so it must not be dialable.
  const phoneReady = !/x/i.test(site.helloPhone);

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
            {/* The same Maps directions link the contact section uses. */}
            <a href={mapsLink} className="footer-link footer-address">
              {site.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </a>
          </div>

          <div className="footer-column">
            <h2 className="footer-title">{f.helloHeading}</h2>
            <a href={`mailto:${site.helloEmail}`} className="footer-link footer-email">{site.helloEmail}</a>
            {phoneReady ? (
              <a href={`tel:${site.helloPhone.replace(/\s/g, '')}`} className="footer-phone">{site.helloPhone}</a>
            ) : (
              <span className="footer-phone">{site.helloPhone}</span>
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
