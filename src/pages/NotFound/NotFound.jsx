import { Link, useLocation } from 'react-router-dom';
import WhatsAppButton from '../../components/WhatsAppButton.jsx';
import { navLinks } from '../../data/site.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './NotFound.css';

/**
 * The catch-all page, rendered by the `*` route in App.jsx for any path that
 * matches nothing else — a mistyped URL, an old link, a page that has since
 * moved (there have been several: /contact, /cafe, and /menu before it).
 *
 * It is a signpost, not an apology: the point is to get the visitor to a real
 * page in one click, so the whole navbar is repeated here as a list. Those
 * come from `navLinks`, the same array the bar reads, so a page added or
 * parked there appears or disappears here too and the two can never disagree.
 */
export default function NotFound() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const n = t.notFound;

  return (
    <div className="container not-found">
      <span className="card-kicker">{n.kicker}</span>
      <h1 className="page-title not-found-title">{n.title}</h1>
      <p className="not-found-lede">{n.lede}</p>

      {/* The path that missed. React escapes it, so echoing it back is safe,
          and it is what tells someone whether they mistyped or followed a
          stale link. <bdi> because a URL stays left-to-right under Arabic. */}
      <p className="not-found-path">
        <bdi dir="ltr">{pathname}</bdi>
      </p>

      <div className="not-found-actions">
        <Link className="btn btn-primary" to="/">{n.home}</Link>
        <WhatsAppButton className="btn btn-secondary">{t.common.chatOnWhatsapp}</WhatsAppButton>
      </div>

      <nav className="not-found-links" aria-labelledby="not-found-links-heading">
        <h2 id="not-found-links-heading" className="not-found-links-heading">{n.tryInstead}</h2>
        <ul className="not-found-links-list">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link className="not-found-link" to={link.to}>{t.nav[link.key]}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
