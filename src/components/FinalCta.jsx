import { Link } from 'react-router-dom';
import Arrow from './Arrow.jsx';

// The closing call to action at the foot of a page (Home and every "What we
// do" page, via ServicePage). A
// centred heading, one line and one button that opens the enquiry form at
// the foot of /about (or wherever `to` points). Styles: `.final-cta` in
// theme.css. `content` is the page's i18n block: { heading, body, cta }.
//
// `products` (optional, media.finalCtaProducts.<page>): cut-out product
// pictures. With them the section turns into the gold-leaf panel gradient,
// the words sit on a frosted-glass card, and the products float either side
// of it — the first half at the start, the rest at the end. Decorative, so
// hidden from assistive tech.
export default function FinalCta({ content, to, products }) {
  const half = products ? Math.ceil(products.length / 2) : 0;
  const side = (list, edge) => (
    <div className={`final-cta-products final-cta-products-${edge}`} aria-hidden="true">
      {list.map((src) => (
        <img key={src} className="final-cta-product" src={src} alt="" loading="lazy" decoding="async" />
      ))}
    </div>
  );

  return (
    <section className={`container final-cta${products ? ' final-cta-showcase' : ''}`}>
      {products && side(products.slice(0, half), 'start')}
      <div className="final-cta-card">
        <h2 className="final-cta-heading">{content.heading}</h2>
        <p className="final-cta-body">{content.body}</p>
        {/* on the gold gradient a yellow button would vanish: it goes dark */}
        <Link to={to} className={`btn ${products ? 'btn-dark' : 'btn-primary'}`}>
          {content.cta} <Arrow />
        </Link>
      </div>
      {products && side(products.slice(half), 'end')}
    </section>
  );
}
