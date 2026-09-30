import { Link } from 'react-router-dom';
import Logo from '../Logo.jsx';
import SocialLinks from './SocialLinks.jsx';
import { site, policySections } from '../../data/site.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        {/* The logo and the legal documents travel together as one block, so
            the list reads as sitting beside the mark rather than as a third
            column floating between it and the socials. */}
        <div className="footer-brand">
          <Logo size="lg" on="dark" />

          <nav className="footer-policies" aria-label={t.nav.policies}>
            <h2 className="footer-policies-heading">{t.nav.policies}</h2>
            <ul className="footer-policies-list">
              {policySections.map((id) => (
                <li key={id}>
                  {/* `to` carries the hash, so the jump goes through the router
                      and hooks/useScrollToTop.js scrolls to that heading — a
                      plain <a href="#id"> would bypass both. */}
                  <Link to={`/policies#${id}`} className="footer-policies-link">
                    {t.nav.policyTabs[id]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <SocialLinks />
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {site.name}. {t.footer.rights}</span>
      </div>
    </footer>
  );
}
