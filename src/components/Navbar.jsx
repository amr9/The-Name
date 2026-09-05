import { NavLink } from 'react-router-dom';
import Logo from './Logo.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';
import { navLinks } from '../data/site.js';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-brand">
          <Logo />
        </NavLink>

        <nav className="navbar-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => 'navbar-link' + (isActive ? ' navbar-link-active' : '')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <WhatsAppButton className="btn btn-primary navbar-cta" />
      </div>
    </header>
  );
}
