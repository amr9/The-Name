import { Link } from 'react-router-dom';
import Logo from '../Logo.jsx';
import WhatsAppIcon from '../WhatsAppIcon.jsx';
import { site, waLink, navLinks } from '../../data/site.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <span className="footer-brand">
            <Logo size="lg" />
          </span>
          <p className="footer-blurb">{t.footer.blurb}</p>
          <p className="footer-address">
            {t.footer.address.map((line, i) => (
              <span key={line}>{i > 0 && <br />}{line}</span>
            ))}
          </p>
        </div>

        <div>
          <h6 className="footer-heading">{t.footer.contactHeading}</h6>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="footer-phone">
            <WhatsAppIcon size={17} />
            {site.phone}
          </a>
          <p className="footer-note">{t.footer.note}</p>
          <a className="btn btn-primary footer-message-btn" href={waLink} target="_blank" rel="noopener noreferrer">{t.footer.message}</a>
        </div>

        <div>
          <h6 className="footer-heading">{t.footer.hoursHeading}</h6>
          <div className="footer-hours">
            {t.footer.hours.map((h) => (
              <span key={h.day} className="footer-hours-row">
                <span className="footer-hours-day">{h.day}</span>
                <span>{h.time}</span>
              </span>
            ))}
          </div>
        </div>

        <div>
          <h6 className="footer-heading">{t.footer.pagesHeading}</h6>
          <div className="footer-links">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}>{t.nav[link.key]}</Link>
            ))}
            <a href={site.shopUrl} target="_blank" rel="noopener noreferrer">{t.footer.vertexShopLink}</a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {site.name}. {t.footer.rights}</span>
      </div>
    </footer>
  );
}
