import Logo from '../Logo.jsx';
import WhatsAppIcon from '../WhatsAppIcon.jsx';
import SocialLinks from './SocialLinks.jsx';
import { site, waLink } from '../../data/site.js';
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
      <div className="brand-strip" aria-hidden="true" />

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
          <a className="btn btn-dark footer-message-btn" href={waLink} target="_blank" rel="noopener noreferrer">
            {t.footer.message}
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {site.name}. {t.footer.rights}</span>
      </div>
    </footer>
  );
}
