import { useState } from 'react';
import { Link } from 'react-router-dom';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import WhatsAppButton from '../../components/WhatsAppButton.jsx';
import { catalogue } from '../../data/catalogue.js';
import { media } from '../../data/media.js';
import { site } from '../../data/site.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { partners, services } from './data.js';
import './Home.css';

export default function Home() {
  const { t } = useLanguage();
  const [pin, setPin] = useState(0);
  const piece = catalogue[pin];
  const sel = t.vertex.items[piece.code];
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
            <Link to="/menu" className="btn btn-primary">{t.home.hero.ctaMenu}</Link>
            <Link to="/shop" className="btn btn-secondary home-hero-secondary">{t.home.hero.ctaShop}</Link>
          </div>
        </div>
      </section>

      {/* delivery partners — a slow, continuously rolling logo strip */}
      <section className="home-partners">
        <div className="container home-partners-heading">
          <span className="card-kicker">{t.home.partners.kicker}</span>
          <p className="home-partners-lede">{t.home.partners.lede}</p>
        </div>

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
                        ratio="16 / 9"
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

      {/* what we do — services, one image each */}
      <section className="container home-services-intro">
        <span className="card-kicker">{t.home.whatWeDo.kicker}</span>
        <h2 className="home-services-heading">{t.home.whatWeDo.heading}</h2>
        <p className="home-services-body">{t.home.whatWeDo.body}</p>
      </section>

      {services.map((s) => {
        const info = t.home.services[s.id];
        return (
          <section key={s.id} className="container home-service-row">
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
                <Link
                  to={s.to}
                  state={s.tab ? { tab: s.tab } : undefined}
                  className="btn btn-secondary home-service-cta"
                >
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
        );
      })}

      {/* shop the room: hotspots on a photograph */}
      <section className="home-shop-room">
        <div className="container">
          <div className="home-shop-room-heading">
            <div>
              <span className="card-kicker">{t.home.shopRoom.kicker}</span>
              <h2>{t.home.shopRoom.heading}</h2>
            </div>
            <p className="home-shop-room-lede">{t.home.shopRoom.lede}</p>
          </div>

          <div className="split home-shop-room-grid">
            <div className="home-shop-room-photo">
              <div className="washed">
                <ImagePlaceholder src={media.roomWide} label={t.home.shopRoom.roomPhoto} ratio="16 / 10" />
              </div>
              {catalogue.map((p, i) => (
                <button
                  key={p.code}
                  type="button"
                  onClick={() => setPin(i)}
                  aria-label={t.vertex.items[p.code].name}
                  data-active={pin === i}
                  className="home-shop-room-pin"
                  style={{ left: p.x, top: p.y }}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <div className="home-shop-room-panel">
              <span className="home-shop-room-panel-meta">{piece.code} · {t.home.shopRoom.pieceOf(pin + 1, catalogue.length)}</span>
              <div className="washed home-shop-room-panel-image">
                <ImagePlaceholder src={media.vertex[piece.code]} label={sel.name} ratio="4 / 3" />
              </div>
              <h3 className="home-shop-room-panel-title">{sel.name}</h3>
              <p className="home-shop-room-panel-note">{sel.note}</p>
              <div className="home-shop-room-panel-specs">
                <span>{t.home.shopRoom.category} · {t.vertex.filters[piece.catKey]}</span>
                <span>{t.home.shopRoom.finish} · {sel.finish}</span>
                <span>{t.home.shopRoom.leadTime} · {sel.lead}</span>
              </div>
              <p className="home-shop-room-panel-price">{sel.price}</p>
              <a className="btn btn-primary btn-block" href={site.shopUrl} target="_blank" rel="noopener noreferrer">
                {t.home.shopRoom.openShop}
              </a>
              <p className="card-meta home-shop-room-panel-footnote">{t.home.shopRoom.checkoutNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* friday */}
      <section className="container home-friday">
        <div className="home-friday-inner">
          <div>
            <span className="home-friday-kicker">{t.home.friday.kicker}</span>
            <h2 className="home-friday-title">{t.home.friday.title}</h2>
            <p className="home-friday-body">{t.home.friday.body}</p>
          </div>
          <WhatsAppButton className="btn btn-dark">{t.home.friday.cta}</WhatsAppButton>
        </div>
      </section>

      <section className="container home-closing">
        <div className="home-closing-inner">
          <div>
            <h2 className="home-closing-title">{t.home.closing.title}</h2>
            <p className="home-closing-body">{t.home.closing.body}</p>
          </div>
          <WhatsAppButton style={{ gap: 8 }}>{t.common.chatOnWhatsapp}</WhatsAppButton>
        </div>
      </section>
    </div>
  );
}
