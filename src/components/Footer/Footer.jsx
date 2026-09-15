import Logo from '../Logo.jsx';
import SocialLinks from './SocialLinks.jsx';
import { site } from '../../data/site.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <Logo size="lg" on="dark" />
        <SocialLinks />
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {site.name}. {t.footer.rights}</span>
      </div>
    </footer>
  );
}
