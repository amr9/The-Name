import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Bubbles from '../../components/Bubbles/Bubbles.jsx';
import { shopIcons } from '../../components/Bubbles/icons.jsx';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import Logo from '../../components/Logo.jsx';
import LogoMarquee from '../../components/LogoMarquee/LogoMarquee.jsx';
import ProcessSteps from '../../components/ProcessSteps/ProcessSteps.jsx';
import { brands } from '../../data/brands.js';
import { media } from '../../data/media.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { customMethods, services } from './data.js';
import './Home.css';

export default function Home() {
  const { t } = useLanguage();
  const [methodIdx, setMethodIdx] = useState(0);
  const method = customMethods[methodIdx];
  const methodCopy = t.home.howItWorks.methods[method.id];

  return (
    <div className="home">
      {/* hero: video loop / still, full width */}
      <section className="home-hero">
        <div className="home-hero-media">
          <ImagePlaceholder src={media.hero} label={t.home.hero.mediaLabel} ratio="auto" className="home-hero-media-slot" />
        </div>
        <div className="home-hero-scrim" />
        <div className="container home-hero-content">
          {/* two lines: the lead in the heading face, the answer under it in the script face.
              The lead ends on the brand lockup standing in for the name itself — it is the
              brand, so it is artwork rather than translated copy, and `titleLeadPrefix` is
              only the word(s) in front of it (the lockup reads "THE NAME", article included).
              `compact={false}` keeps the full wordmark on phones; the secondary N would
              leave the sentence reading "From N." */}
          <h1 className="home-hero-title">
            <span className="home-hero-title-lead">
              {t.home.hero.titleLeadPrefix} <Logo size="inline" compact={false} />.
            </span>
            <span className="home-hero-title-script">{t.home.hero.titleScript}</span>
          </h1>
          <p className="home-hero-body">{t.home.hero.body}</p>
          <div className="home-hero-actions">
            <Link to="/shop" className="btn btn-sparkle">{t.home.hero.ctaShop}</Link>
            {/* The Matterport walkthrough — an external 3D tour, so a plain
                anchor rather than a router Link. */}
            <a
              href="https://my.matterport.com/show/?m=5rCPtmHS5iK"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary home-hero-secondary"
            >
              {t.home.hero.ctaTour}
            </a>
          </div>
        </div>
      </section>

      {/* the brands we curate and personalise — a slow, rolling logo strip, no heading */}
      <LogoMarquee items={brands} logos={media.brands} />

      {/* what we do — services, one image each. The wrapper is only here to
          anchor the decorative shop-item bubbles — up the gutters on wide
          screens, in bands between the rows on narrow ones. */}
      <div className="bubbles-host">
        <Bubbles side="left" icons={shopIcons} />
        <Bubbles side="right" icons={shopIcons} />

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
                beside them — see components/Bubbles */}
            {i > 0 && <Bubbles side="row" icons={shopIcons} phase={i * 29} />}
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

          <ProcessSteps />

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
