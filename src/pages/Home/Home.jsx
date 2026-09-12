import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import { media } from '../../data/media.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import FoodBubbles from './FoodBubbles.jsx';
import { customMethods, howItWorksSteps, partners, services } from './data.js';
import './Home.css';

export default function Home() {
  const { t } = useLanguage();
  const [methodIdx, setMethodIdx] = useState(0);
  const method = customMethods[methodIdx];
  const methodCopy = t.home.howItWorks.methods[method.id];
  // Only two partners, so the row is padded out to fill a wide screen before
  // the track duplicates it for the loop.
  const partnerStrip = [partners, partners, partners, partners].flat();

  return (
    <div className="home">
      {/* hero: video loop / still, full width */}
      <section className="home-hero">
        <div className="home-hero-media">
          <ImagePlaceholder src={media.hero} label={t.home.hero.mediaLabel} ratio="auto" className="home-hero-media-slot" />
        </div>
        <div className="home-hero-scrim" />
        <div className="container home-hero-content">
          <h1 className="home-hero-title">{t.home.hero.title}</h1>
          <p className="home-hero-body">{t.home.hero.body}</p>
          <div className="home-hero-actions">
            <Link to="/shop" className="btn btn-primary">{t.home.hero.ctaShop}</Link>
            <Link to="/cafe" className="btn btn-secondary home-hero-secondary">{t.home.hero.ctaMenu}</Link>
          </div>
        </div>
      </section>

      {/* delivery partners — a slow, continuously rolling logo strip */}
      <section className="home-partners">
        <h2 className="container home-partners-heading">{t.home.partners.heading}</h2>

        {/* the list is rendered twice back to back so the -50% translation
            lands exactly on the start of the copy — a seamless loop */}
        <div className="home-partners-marquee">
          <div className="home-partners-track">
            {[0, 1].map((copy) => (
              <ul key={copy} className="home-partners-row" aria-hidden={copy === 1}>
                {partnerStrip.map((p, i) => (
                  <li key={`${p.id}-${i}`} className="home-partners-item">
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="home-partners-link">
                      <ImagePlaceholder
                        src={media.partners[p.id]}
                        label={t.home.partners.items[p.id].name}
                        ratio="3 / 1"
                        className="home-partners-logo"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* what we do — services, one image each. The wrapper is only here to
          anchor the decorative bubbles — up the gutters on wide screens, in
          bands between the rows on narrow ones. */}
      <div className="home-services">
        <FoodBubbles side="left" />
        <FoodBubbles side="right" />

        <section className="container home-services-intro">
          <span className="card-kicker">{t.home.whatWeDo.kicker}</span>
          <h2 className="home-services-heading">{t.home.whatWeDo.heading}</h2>
          <p className="home-services-body">{t.home.whatWeDo.body}</p>
        </section>

        {services.map((s, i) => {
          const info = t.home.services[s.id];
          return (
            <Fragment key={s.id}>
            {/* on narrow screens the bubbles run between the rows instead of
                beside them — see FoodBubbles / Home.css */}
            {i > 0 && <FoodBubbles side="row" phase={i * 29} />}
              <section className="container home-service-row">
                <div className="row-flip home-service-grid">
                  <div className="row-text home-service-text" style={{ order: s.textOrder }}>
                    <div className="home-service-kicker-row">
                      <span className="home-service-num">{s.num}</span>
                      <span className="home-service-rule" />
                      <span className="home-service-kicker">{info.kicker}</span>
                    </div>
                    <h3 className="home-service-title">{info.title}</h3>
                    <p className="home-service-body">{info.body}</p>
                    <div className="home-service-points">
                      {info.points.map((pt) => (
                        <div key={pt} className="home-service-point">
                          <span className="home-service-dot" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                    <Link to={s.to} className="btn btn-secondary home-service-cta">
                      {info.cta}
                    </Link>
                  </div>
                  <figure className="row-img home-service-figure" style={{ order: s.imgOrder }}>
                    <div className="home-service-ring" />
                    <div className="washed home-service-image-wrap">
                      <ImagePlaceholder src={media.services[s.id]} label={info.placeholder} ratio="5 / 4" />
                    </div>
                  </figure>
                </div>
              </section>
            </Fragment>
          );
        })}
      </div>

      {/* how it works: the four steps of an order, then the ways we can put
          your artwork onto a product */}
      <section className="home-how">
        <div className="container">
          <div className="home-how-heading">
            <div>
              <span className="card-kicker">{t.home.howItWorks.kicker}</span>
              <h2>{t.home.howItWorks.heading}</h2>
            </div>
            <p className="home-how-lede">{t.home.howItWorks.lede}</p>
          </div>

          {/* an ordered list, because the steps genuinely happen in sequence */}
          <ol className="home-how-steps">
            {howItWorksSteps.map((s) => {
              const step = t.home.howItWorks.steps[s.id];
              return (
                <li key={s.id} className="home-how-step">
                  <span className="home-how-step-num">{s.num}</span>
                  <h3 className="home-how-step-title">{step.title}</h3>
                  <p className="home-how-step-body">{step.body}</p>
                </li>
              );
            })}
          </ol>

          <div className="split home-how-grid">
            <div className="washed home-how-photo">
              <ImagePlaceholder src={media.methods[method.id]} label={methodCopy.placeholder} ratio="16 / 10" />
            </div>

            <div className="home-how-panel">
              <span className="home-how-panel-meta">{t.home.howItWorks.methodsKicker}</span>

              <div className="seg seg-grid home-how-methods">
                {customMethods.map((m, i) => (
                  <button
                    key={m.id}
                    type="button"
                    className="seg-opt view-toggle-opt"
                    data-active={methodIdx === i}
                    aria-pressed={methodIdx === i}
                    onClick={() => setMethodIdx(i)}
                  >
                    {t.home.howItWorks.methods[m.id].name}
                  </button>
                ))}
              </div>

              <p className="home-how-panel-note">{methodCopy.note}</p>
              <div className="home-how-panel-specs">
                <span>{t.home.howItWorks.suits} · {methodCopy.suits}</span>
                <span>{t.home.howItWorks.minimum} · {methodCopy.minimum}</span>
                <span>{t.home.howItWorks.leadTime} · {methodCopy.lead}</span>
              </div>
              <Link className="btn btn-primary btn-block" to="/shop">{t.home.howItWorks.ctaShop}</Link>
              <p className="card-meta home-how-panel-footnote">{t.home.howItWorks.footnote}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
