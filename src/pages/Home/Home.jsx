import { Link } from 'react-router-dom';
import AutoplayVideo from '../../components/AutoplayVideo.jsx';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import { media } from '../../data/media.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { contactLink, routes } from '../../data/site.js';
import { pillars } from './data.js';
import './Home.css';

// PARKED on Home when the page moved to the five-pillar brief — the partner
// LogoMarquee, the decorative Bubbles, CustomizeSection (/customize still
// redirects to /#customize, which now just lands at the top), the "how it
// works" method picker + ProcessSteps, and the ContactSection at the foot
// (the final CTA links to the same form on /about instead). Their components and
// i18n are kept (the how-it-works copy is still read by the chatbot, About
// and Shop); see git history (d6f9561) for the old JSX and Home.css rules.

// Every pillar row's picture or film is LANDSCAPE at this ratio — wide and
// short. A film of another shape is shown WHOLE inside it (object-fit:
// contain in Home.css), with dark bands filling the rest.
const ROW_RATIO = '16 / 9';

// The "→" after every call to action. Decorative, so hidden from screen
// readers; mirrored under RTL in Home.css.
function Arrow() {
  return <span className="home-arrow" aria-hidden="true">→</span>;
}

export default function Home() {
  const { t } = useLanguage();
  const h = t.home;

  return (
    <div className="home">
      {/* 01 — hero: video loop / still, full width */}
      <section className="home-hero">
        <div className="home-hero-media">
          <ImagePlaceholder src={media.hero} label={h.hero.mediaLabel} ratio="auto" className="home-hero-media-slot" loading="eager" />
        </div>
        <div className="home-hero-scrim" />
        <div className="container home-hero-content">
          <h1 className="display-title home-hero-title">{h.hero.title}</h1>
          <p className="home-hero-body">{h.hero.body}</p>
          <div className="home-hero-actions">
            {/* Labelled "Explore what we do" but opens the SHOP page — as
                asked; the What-we-do section is linked from the footer. */}
            <Link to={routes.shop} className="btn btn-primary">
              {h.hero.cta} <Arrow />
            </Link>
            {/* The Matterport walkthrough — an external 3D tour, so a plain
                anchor rather than a router Link. */}
            <a
              href="https://my.matterport.com/show/?m=5rCPtmHS5iK"
              className="btn btn-secondary home-hero-secondary"
            >
              {h.hero.ctaTour}
            </a>
          </div>
        </div>
      </section>

      {/* 02 — what we do: the intro, then one row per pillar */}
      <section id="what-we-do" className="container scroll-anchor home-services-intro">
        <span className="card-kicker">{h.whatWeDo.kicker}</span>
        <h2 className="home-services-heading">{h.whatWeDo.heading}</h2>
        <p className="home-services-body">{h.whatWeDo.body}</p>
      </section>

      {pillars.map((p, i) => {
        const info = h.pillars[p.id];
        const video = media.serviceVideos[p.id];
        // Rows zig-zag: text first on even rows, picture first on odd ones.
        const textOrder = i % 2 === 0 ? 1 : 2;
        return (
          <section key={p.id} className="container home-service-row">
            <div className="row-flip home-service-grid">
              <div className="row-text home-service-text" style={{ order: textOrder }}>
                <div className="home-service-kicker-row">
                  <span className="home-service-num">{p.num}</span>
                  <span className="home-service-rule" />
                </div>
                <h3 className="home-service-title">{info.title}</h3>
                <p className="home-service-lead">{info.lead}</p>
                {info.body && <p className="home-service-body">{info.body}</p>}
                <ul className="home-service-tags">
                  {info.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <div className="home-service-ctas">
                  {p.links.map((l, j) => (
                    <Link key={l.key} to={l.to} className={j === 0 ? 'btn btn-primary' : 'btn btn-secondary'}>
                      {info.ctas[l.key]} <Arrow />
                    </Link>
                  ))}
                </div>
              </div>
              <figure className="row-img home-service-figure" style={{ order: 3 - textOrder }}>
                <div className="home-service-ring" />
                {video ? (
                  // A film in place of the photo, playing like a GIF —
                  // lazy-loaded, no controls (components/AutoplayVideo).
                  <div className="home-service-image-wrap">
                    <AutoplayVideo className="home-service-video" {...video} ratio={ROW_RATIO} label={info.title} />
                  </div>
                ) : (
                  <div className="washed home-service-image-wrap">
                    <ImagePlaceholder src={media.services[p.id]} label={info.placeholder} ratio={ROW_RATIO} />
                  </div>
                )}
              </figure>
            </div>
          </section>
        );
      })}

      {/* final CTA — opens the enquiry form at the foot of /about */}
      <section className="container home-final">
        <h2 className="home-final-heading">{h.finalCta.heading}</h2>
        <p className="home-final-body">{h.finalCta.body}</p>
        <Link to={contactLink} className="btn btn-primary">
          {h.finalCta.cta} <Arrow />
        </Link>
      </section>
    </div>
  );
}
