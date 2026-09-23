import { Link } from 'react-router-dom';
import Carousel from '../../components/Carousel.jsx';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import VideoPlaceholder from '../../components/VideoPlaceholder/VideoPlaceholder.jsx';
import WhatsAppButton from '../../components/WhatsAppButton.jsx';
import { media } from '../../data/media.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { activationShots, kidsOffers } from './data.js';
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

      {/* — the activation: the film first, then the gallery from the day.
          Both are <VideoPlaceholder>/<ImagePlaceholder> slots, so the
          section is live now and fills in as the footage is delivered. — */}
      <section className="container kids-activation">
        <span className="card-kicker">{k.activation.kicker}</span>
        <h2 className="kids-section-title">{k.activation.heading}</h2>
        <p className="kids-section-lede">{k.activation.body}</p>
        <p className="kids-activation-support">{k.activation.support}</p>

        <VideoPlaceholder
          poster={media.kids.activation.videoPoster}
          label={k.activation.videoPlaceholder}
        />

        <h3 className="kids-activation-gallery-heading">{k.activation.galleryHeading}</h3>
        <Carousel prevLabel={k.activation.prevShots} nextLabel={k.activation.nextShots}>
          {activationShots.map((shot) => (
            <figure key={shot.id} className="carousel-card kids-activation-shot">
              <ImagePlaceholder
                src={media.kids.activation.shots[shot.id]}
                label={k.activation.shots[shot.id]}
                ratio="4 / 3"
                className="kids-activation-shot-image"
              />
              <figcaption className="kids-activation-shot-caption">
                {k.activation.shots[shot.id]}
              </figcaption>
            </figure>
          ))}
        </Carousel>
      </section>

      {/* — the story that came out of the activation, on the pale band so it
          reads as a feature rather than another offer block — */}
      <section className="kids-two-ts">
        <div className="container kids-two-ts-inner">
          <div className="kids-two-ts-copy">
            <span className="card-kicker">{k.twoTs.kicker}</span>
            <h2 className="kids-section-title">{k.twoTs.heading}</h2>
            <p className="kids-section-lede">{k.twoTs.body}</p>
            <p className="kids-two-ts-closing">{k.twoTs.closing}</p>
          </div>

          <VideoPlaceholder
            poster={media.kids.activation.interviewsPoster}
            label={k.twoTs.videoPlaceholder}
            ratio="4 / 3"
            className="kids-two-ts-video"
          />
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
