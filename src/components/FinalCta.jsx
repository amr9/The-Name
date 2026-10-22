import { Link } from 'react-router-dom';
import Arrow from './Arrow.jsx';

// The closing call to action at the foot of a page (Home and every "What we
// do" page, via ServicePage). A
// centred heading, one line and one button that opens the enquiry form at
// the foot of /about (or wherever `to` points). Styles: `.final-cta` in
// theme.css. `content` is the page's i18n block: { heading, body, cta }.
// `href` instead of `to` leaves the site (the "What we do" pages: WhatsApp,
// with the page's message typed in) — a plain <a>, in a new tab.
export default function FinalCta({ content, to, href }) {
  const label = <>{content.cta} <Arrow /></>;
  return (
    <section className="container final-cta">
      <h2 className="final-cta-heading">{content.heading}</h2>
      <p className="final-cta-body">{content.body}</p>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{label}</a>
      ) : (
        <Link to={to} className="btn btn-primary">{label}</Link>
      )}
    </section>
  );
}
