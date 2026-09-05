import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { site, waLink, navLinks } from '../data/site.js';
import './Footer.css';

function WhatsAppGlyph() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
      <path d="M21 11.5a8.5 8.5 0 0 1-12.7 7.4L3 21l2.1-5.3A8.5 8.5 0 1 1 21 11.5z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <span className="footer-brand">
            <Logo size="lg" />
          </span>
          <p className="footer-blurb">Restaurant, Vertex showroom, off-site catering and events held in the café.</p>
          <p className="footer-address">12 Rowan Street<br />City centre</p>
        </div>

        <div>
          <h6 className="footer-heading">Contact us</h6>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="footer-phone">
            <WhatsAppGlyph />
            {site.phone}
          </a>
          <p className="footer-note">WhatsApp only — tables, allergens, quotes and pieces. Replies within the hour during service.</p>
          <a className="btn btn-primary footer-message-btn" href={waLink} target="_blank" rel="noopener noreferrer">Message us</a>
        </div>

        <div>
          <h6 className="footer-heading">Opening hours</h6>
          <div className="footer-hours">
            {site.hours.map((h) => (
              <span key={h.day} className="footer-hours-row">
                <span className="footer-hours-day">{h.day}</span>
                <span>{h.time}</span>
              </span>
            ))}
          </div>
        </div>

        <div>
          <h6 className="footer-heading">Pages</h6>
          <div className="footer-links">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}>{link.label}</Link>
            ))}
            <a href={site.shopUrl} target="_blank" rel="noopener noreferrer">Vertex shop ↗</a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} The Name. All rights reserved.</span>
      </div>
    </footer>
  );
}
