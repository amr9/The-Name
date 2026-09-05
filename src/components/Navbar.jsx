import { NavLink } from 'react-router-dom';
import Logo from './Logo.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import { navLinks } from '../data/site.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import './Navbar.css';

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <nav className="nav navbar">
      <NavLink to="/" end className="nav-brand">
        <Logo />
      </NavLink>

      {navLinks.map((link) => (
        <NavLink key={link.to} to={link.to} end={link.to === '/'} className="navbar-link">
          {t.nav[link.key]}
        </NavLink>
      ))}

      <WhatsAppButton style={{ minHeight: 36, gap: 8 }} />
      <LanguageSwitcher />
    </nav>
  );
}
