import { NavLink } from 'react-router-dom';
import Logo from '../Logo.jsx';
import WhatsAppButton from '../WhatsAppButton.jsx';
import WhatsAppIcon from '../WhatsAppIcon.jsx';
import SocialLinks from './SocialLinks.jsx';
import { navLinks, site, waLink } from '../../data/site.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './Footer.css';

function PinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand-block">
          <Logo size="lg" tone="dark" />
          <p className="footer-address">
            <PinIcon />
            <span>
              {t.footer.address.map((line, i) => (
                <span key={line}>{i > 0 && <br />}{line}</span>
              ))}
            </span>
          </p>
          <SocialLinks />
        </div>

        <div className="footer-contact">
          <h6 className="footer-heading">{t.footer.contactHeading}</h6>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="footer-phone">
            <WhatsAppIcon size={17} />
            {site.phone}
          </a>
          <p className="footer-note">{t.footer.note}</p>
          <WhatsAppButton className="btn btn-light footer-message-btn">{t.footer.message}</WhatsAppButton>
        </div>

        {/* the same pages as the navbar, from the same list in data/site.js */}
        <nav className="footer-pages" aria-label={t.footer.pagesHeading}>
          <h6 className="footer-heading">{t.footer.pagesHeading}</h6>
          <ul className="footer-pages-list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === '/'} className="footer-page-link">
                  {t.nav[link.key]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {site.name}. {t.footer.rights}</span>
      </div>
    </footer>
  );
}
