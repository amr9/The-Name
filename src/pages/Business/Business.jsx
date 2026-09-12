import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import WhatsAppButton from '../../components/WhatsAppButton.jsx';
import PackagesPanel from '../../components/PackagesPanel/PackagesPanel.jsx';
import { media } from '../../data/media.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { brandingOffers, cateringPackageIds } from './data.js';
import './Business.css';

export default function Business() {
  const { t } = useLanguage();

  return (
    <div className="container business-page">
      <span className="card-kicker">{t.business.kicker}</span>
      <h1 className="business-title">{t.business.title}</h1>
      <p className="business-intro">{t.business.intro}</p>

      {/* — what we brand for companies — */}
      <section className="business-offer">
        <h2 className="business-section-title">{t.business.offer.heading}</h2>
        <p className="business-section-lede">{t.business.offer.lede}</p>

        <div className="business-offer-grid">
          {brandingOffers.map((o) => {
            const info = t.business.offer.items[o.id];
            return (
              <article key={o.id} className="card elev-sm business-offer-card">
                <div className="washed business-offer-image">
                  <ImagePlaceholder src={media.business.offers[o.id]} label={info.placeholder} ratio="4 / 3" />
                </div>
                <h3 className="card-title">{info.name}</h3>
                <p className="card-body">{info.note}</p>
                <span className="tag tag-accent business-offer-tag">{info.moq}</span>
              </article>
            );
          })}
        </div>
      </section>

      {/* — how an account works: the part that differs from a one-off gift — */}
      <section className="business-terms">
        <h2 className="business-section-title">{t.business.terms.heading}</h2>
        <dl className="business-terms-list">
          {t.business.terms.items.map((item) => (
            <div key={item.term} className="business-terms-row">
              <dt className="business-terms-term">{item.term}</dt>
              <dd className="business-terms-detail">{item.detail}</dd>
            </div>
          ))}
        </dl>
        <WhatsAppButton className="btn btn-primary business-terms-cta">{t.business.terms.cta}</WhatsAppButton>
      </section>

      {/* — catering: the kitchen at your address. Events held here are on /cafe — */}
      <section id="catering" className="business-catering">
        <span className="card-kicker">{t.business.catering.kicker}</span>
        <h2 className="business-catering-title">{t.business.catering.heading}</h2>
        <p className="business-section-lede">{t.business.catering.lede}</p>

        <PackagesPanel
          image={media.business.catering}
          content={t.business.catering}
          packageIds={cateringPackageIds}
          labels={t.packages}
        />
      </section>
    </div>
  );
}
