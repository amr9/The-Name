import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import ShopIcon from '../../components/ShopIcon.jsx';
import WhatsAppButton from '../../components/WhatsAppButton.jsx';
import { customizableIds, customizeSteps } from '../../data/storeCustomizable.js';
import { storeProducts } from '../../data/storeProducts.js';
import { site } from '../../data/site.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './Customize.css';

// Resolved once at module load, not per render: the id list and the catalogue
// are both static, so there is nothing to recompute. Ids that no longer match
// a product are dropped rather than rendered as holes — see the note in
// data/storeCustomizable.js about the store's list being kept by hand.
const products = customizableIds
  .map((id) => storeProducts.find((p) => p.id === id))
  .filter(Boolean);

/**
 * "Customize Yours" — the page the store keeps at /customizable-products,
 * living here under The Name Store. It is the three steps of the process and
 * then the pieces you can actually run through it; the cards are the same
 * components/ProductCard the Shop catalogue uses, so a product looks the same
 * wherever it appears.
 */
export default function Customize() {
  const { t } = useLanguage();
  const c = t.customize;

  return (
    <div className="customize-page">
      <header className="container customize-hero">
        <span className="card-kicker">{c.kicker}</span>
        <h1 className="page-title customize-title">{c.title}</h1>
        <p className="customize-lede">{c.lede}</p>
      </header>

      {/* The process, before the products: what you can do is the reason to
          look at the pieces, not the other way round. */}
      <section className="container customize-steps">
        <ol className="customize-steps-list">
          {customizeSteps.map((id, i) => (
            <li key={id} className="customize-step">
              <span className="customize-step-num">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="customize-step-title">{c.steps[id].title}</h2>
              <p className="customize-step-body">{c.steps[id].body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container customize-catalogue">
        <div className="customize-catalogue-head">
          <h2 className="customize-catalogue-title">{c.gridHeading}</h2>
          <span className="customize-count">{c.count(products.length)}</span>
        </div>

        <div className="product-grid">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="container customize-cta">
        <p className="customize-cta-body">{c.ctaBody}</p>
        <div className="customize-cta-actions">
          <a className="btn btn-primary" href={site.shopUrl} target="_blank" rel="noopener noreferrer"><ShopIcon />{c.ctaShop}</a>
          <WhatsAppButton className="btn btn-secondary">{t.common.chatOnWhatsapp}</WhatsAppButton>
        </div>
      </section>
    </div>
  );
}
