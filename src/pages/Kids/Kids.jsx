import { Link } from 'react-router-dom';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import WhatsAppButton from '../../components/WhatsAppButton.jsx';
import { media } from '../../data/media.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { kidsOffers } from './data.js';
import './Kids.css';

export default function Kids() {
  const { t } = useLanguage();
  const k = t.kids;

  return (
    <div className="kids-page">
      <header className="container kids-hero">
        <div className="kids-hero-text">
          <span className="card-kicker">{k.kicker}</span>
          <h1 className="page-title kids-hero-title">{k.title}</h1>
          <p className="kids-hero-lede">{k.lede}</p>
          <div className="kids-hero-actions">
            <Link to="/shop" className="btn btn-primary">{k.ctaShop}</Link>
            <WhatsAppButton className="btn btn-secondary">{k.ctaAsk}</WhatsAppButton>
          </div>
        </div>
        <div className="washed kids-hero-image">
          <ImagePlaceholder src={media.kids.hero} label={k.heroPlaceholder} ratio="5 / 4" />
        </div>
      </header>

      {/* — what we make for children — */}
      <section className="container kids-offer">
        <h2 className="kids-section-title">{k.offerHeading}</h2>
        <p className="kids-section-lede">{k.offerLede}</p>

        <div className="kids-offer-grid">
          {kidsOffers.map((o) => {
            const info = k.offers[o.id];
            return (
              <article key={o.id} className="card elev-sm kids-offer-card">
                <div className="washed kids-offer-image">
                  <ImagePlaceholder src={media.kids.offers[o.id]} label={info.placeholder} ratio="4 / 3" />
                </div>
                <h3 className="card-title">{info.name}</h3>
                <p className="card-body">{info.note}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* — safety / making note, then the closing call to action — */}
      <section className="kids-note">
        <div className="container">
          <span className="card-kicker">{k.note.kicker}</span>
          <h2 className="kids-section-title">{k.note.heading}</h2>
          <ul className="kids-note-points">
            {k.note.points.map((pt) => (
              <li key={pt} className="kids-note-point">
                <span className="kids-note-dot" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container kids-cta">
        <h2 className="kids-section-title">{k.cta.heading}</h2>
        <p className="kids-section-lede">{k.cta.body}</p>
        <div className="kids-hero-actions">
          <Link to="/shop" className="btn btn-primary">{k.cta.shop}</Link>
          <WhatsAppButton className="btn btn-secondary">{k.cta.whatsapp}</WhatsAppButton>
        </div>
      </section>
    </div>
  );
}
