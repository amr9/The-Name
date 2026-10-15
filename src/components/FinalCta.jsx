import { Link } from 'react-router-dom';
import Arrow from './Arrow.jsx';

// The closing call to action at the foot of a page — Home and Agency. A
// centred heading, one line and one button that opens the enquiry form at
// the foot of /about (or wherever `to` points). Styles: `.final-cta` in
// theme.css. `content` is the page's i18n block: { heading, body, cta }.
export default function FinalCta({ content, to }) {
  return (
    <section className="container final-cta">
      <h2 className="final-cta-heading">{content.heading}</h2>
      <p className="final-cta-body">{content.body}</p>
      <Link to={to} className="btn btn-primary">
        {content.cta} <Arrow />
      </Link>
    </section>
  );
}
