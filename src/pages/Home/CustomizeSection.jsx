import Carousel from '../../components/Carousel.jsx';
import ProductCard, { CARDS_IN_VIEW, SHOWCASE_RATIO } from '../../components/ProductCard/ProductCard.jsx';
import ShopIcon from '../../components/ShopIcon.jsx';
import WhatsAppButton from '../../components/WhatsAppButton.jsx';
import { customizableIds, customizeSteps } from '../../data/storeCustomizable.js';
import { storeProducts } from '../../data/storeProducts.js';
import { site } from '../../data/site.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './CustomizeSection.css';

// Resolved once at module load, not per render: the id list and the catalogue
// are both static, so there is nothing to recompute. Ids that no longer match
// a product are dropped rather than rendered as holes — see the note in
// data/storeCustomizable.js about the store's list being kept by hand.
const products = customizableIds
  .map((id) => storeProducts.find((p) => p.id === id))
  .filter(Boolean);

/**
 * "Customize Yours" — the store's /customizable-products page, as a section
 * of Home under "What we do". It used to be its own /customize page; that
 * route now redirects here (#customize). It is the three steps of the process
 * and then the pieces you can actually run through it; the cards are the same
 * components/ProductCard the Shop catalogue uses, so a product looks the same
 * wherever it appears. Headings start at <h2>: Home already has the <h1>.
 */
export default function CustomizeSection() {
  const { t } = useLanguage();
  const c = t.customize;

  return (
    <section id="customize" className="home-customize">
      <header className="container customize-hero">
        <span className="card-kicker">{c.kicker}</span>
        <h2 className="customize-title">{c.title}</h2>
        <p className="customize-lede">{c.lede}</p>
      </header>

      {/* The process, before the products: what you can do is the reason to
          look at the pieces, not the other way round. */}
      <div className="container customize-steps">
        <ol className="customize-steps-list">
          {customizeSteps.map((id, i) => (
            <li key={id} className="customize-step">
              <span className="customize-step-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="customize-step-title">{c.steps[id].title}</h3>
              <p className="customize-step-body">{c.steps[id].body}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="container customize-catalogue">
        <div className="customize-catalogue-head">
          <h3 className="customize-catalogue-title">{c.gridHeading}</h3>
          <span className="customize-count">{c.count(products.length)}</span>
        </div>

        {/* The same showcase cards the Shop catalogue uses, on the same
            shared Carousel, CARDS_IN_VIEW across. `product-card-showcase`
            and SHOWCASE_RATIO are what make the picture fill the card edge to
            edge; both come from ProductCard, so this section and the Shop page
            cannot drift. */}
        <Carousel prevLabel={c.prevPieces} nextLabel={c.nextPieces} perView={CARDS_IN_VIEW}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} className="carousel-card product-card-showcase" ratio={SHOWCASE_RATIO} />
          ))}
        </Carousel>
      </div>

      <div className="container customize-cta">
        <p className="customize-cta-body">{c.ctaBody}</p>
        <div className="customize-cta-actions">
          {/* To the store's OWN customizable-products page, not its shop
              front — this section mirrors that selection, so that is where
              "start designing" actually leads. */}
          <a className="btn btn-primary" href={site.customizableUrl}><ShopIcon />{c.ctaShop}</a>
          <WhatsAppButton className="btn btn-secondary">{t.common.chatOnWhatsapp}</WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
