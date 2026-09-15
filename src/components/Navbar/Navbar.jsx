import { NavLink } from 'react-router-dom';
import Logo from '../Logo.jsx';
import LanguageSwitcher from '../LanguageSwitcher.jsx';
import { navLinks } from '../../data/site.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './Navbar.css';

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <nav className="nav navbar">
      <NavLink to="/" end className="nav-brand">
        <Logo />
      </NavLink>

      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/'}
          className={`navbar-link${link.highlight ? ' navbar-link-highlight' : ''}`}
        >
          {t.nav[link.key]}
        </NavLink>
      ))}

      <LanguageSwitcher />
    </nav>
  );
}
