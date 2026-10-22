import { Link } from 'react-router-dom';
import Logo from '../Logo.jsx';
import SocialLinks from './SocialLinks.jsx';
import { footerExplore, mapsLink, site, whatWeDoLinks } from '../../data/site.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './Footer.css';

// The socials shown as icons under the logo in the brand block, in this
// order (WhatsApp follows them). Each entry in data/site.js `socials` is either a live
// profile (`url`) or a not-yet-published one (`to`, an in-app path that
// lands on the 404).
const FOOTER_SOCIALS = ['instagram', 'linkedin'];

// One footer link. Every link in the footer — in-app or external — wears the
// same `.footer-link` style; only the element differs.
function FooterLink({ to, href, children }) {
  return (
    <li>
      {href ? (
        <a href={href} className="footer-link">{children}</a>
      ) : (
        <Link to={to} className="footer-link">{children}</Link>
      )}
    </li>
  );
}

function Column({ heading, children }) {
  return (
    <nav className="footer-column" aria-label={heading}>
      <h2 className="footer-title">{heading}</h2>
      <ul className="footer-link-grid">{children}</ul>
    </nav>
  );
}

// A full-width band: the brand block (the logo, the social icons under it)
// on one side, then
// three columns — Explore, What We Do, Connect — and a copyright row under a
// hairline with the location on the end side. Page names come from i18n
// `nav`, so they match the navbar; the What We Do column IS the navbar's
// dropdown list (whatWeDoLinks).
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
          {/* compact={false}: the full name on phones too, not the N alone */}
          <Logo size="lg" on="dark" compact={false} />
          {/* The socials and WhatsApp as icons, in their own box centred
              under the name — the footer's only social links */}
          <div className="footer-socials">
            <SocialLinks keys={FOOTER_SOCIALS} whatsapp />
          </div>
        </div>

        <div className="footer-columns">
          <Column heading={f.exploreHeading}>
            {footerExplore.map((l) => (
              <FooterLink key={l.key} to={l.to} href={l.url}>{t.nav[l.key]}</FooterLink>
            ))}
          </Column>

          <Column heading={f.whatWeDoHeading}>
            {whatWeDoLinks.map((l) => (
              <FooterLink key={l.key} to={l.to}>{t.nav[l.key]}</FooterLink>
            ))}
          </Column>

          <Column heading={f.connectHeading}>
            {/* "Find us" opens Google Maps with directions, in the same tab —
                the same link (and words) as the contact section's Find us */}
            <FooterLink href={mapsLink}>{t.contact.locationHeading}</FooterLink>
          </Column>
        </div>
      </div>

      <div className="container footer-bottom">
        {/* The year is baked in at build time by the pre-render and recomputed
            in the browser; on a new year the two differ, which is expected. */}
        <span suppressHydrationWarning>© {new Date().getFullYear()} {site.name}. {f.rights}</span>
        <span>{f.location}</span>
      </div>
    </footer>
  );
}
