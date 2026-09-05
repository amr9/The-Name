import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';
import { site, navLinks } from '../data/site.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo dark />
          <p className="footer-blurb">
            A place to eat well, work well and meet the people around you —
            {site.name} is {site.tagline.toLowerCase()}.
          </p>
          <p className="footer-address">{site.address}</p>
        </div>

        <div>
          <h6 className="footer-heading">Get in touch</h6>
          <p className="footer-line">{site.phone}</p>
          <p className="footer-line">{site.website}</p>
          <p className="footer-line">{site.instagram}</p>
          <WhatsAppButton className="btn btn-primary footer-cta" />
        </div>

        <div>
          <h6 className="footer-heading">Opening hours</h6>
          {site.hours.map((h) => (
            <div key={h.day} className="footer-hours-row">
              <span className="footer-hours-day">{h.day}</span>
              <span>{h.time}</span>
            </div>
          ))}
        </div>

        <div>
          <h6 className="footer-heading">Pages</h6>
          <div className="footer-links">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}>{link.label}</Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
      </div>
    </footer>
  );
}
