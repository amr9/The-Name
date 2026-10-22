import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../../components/Arrow.jsx';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import FinalCta from '../../components/FinalCta.jsx';
import { ServiceRows, servicePhotos } from '../../components/ServicePage/ServicePage.jsx';
import { media } from '../../data/media.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { contactLink, shopLink, virtualStoreUrl, whatWeDoLink } from '../../data/site.js';
import { pillars } from './data.js';
import './Home.css';

// PARKED on Home when the page moved to the five-pillar brief — the partner
// LogoMarquee, the decorative Bubbles, CustomizeSection (/customize still
// redirects to /#customize, which now just lands at the top), the "how it
// works" method picker + ProcessSteps, and the ContactSection at the foot
// (the final CTA links to the same form on /about instead). Their components and
// i18n are kept (the how-it-works copy is still read by the chatbot, About
// and Shop); see git history (d6f9561) for the old JSX and Home.css rules.

// How long each name in the hero title stays before the next drops in —
// longer on names[0], the slogan's own "a name." / "اسم.".
const NAME_HOLD_MS = 1500;
const SLOGAN_HOLD_MS = 5000;

// The hero title's last line: each of `names` (per language, from i18n
// home.hero.names) drops in from above while the one before falls away.
// The first render is names[0] — on the server and in the browser alike, so
// hydration matches — and the cycle only starts after mount. Reduced-motion
// visitors keep names[0]. Keys are the running count, so the outgoing word
// keeps its element (and switches to the leave animation) while the incoming
// one mounts fresh (and plays the enter one).
function RotatingName({ names }) {
  const [count, setCount] = useState(0);

  // A language switch starts the list over.
  useEffect(() => setCount(0), [names]);

  // One timeout per name rather than an interval, since names[0] holds longer.
  useEffect(() => {
    if (names.length < 2) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const hold = count % names.length === 0 ? SLOGAN_HOLD_MS : NAME_HOLD_MS;
    const id = setTimeout(() => setCount((n) => n + 1), hold);
    return () => clearTimeout(id);
  }, [count, names]);

  const at = (n) => names[n % names.length];
  return (
    <span className="home-hero-name">
      {count > 0 && (
        <span key={count - 1} className="home-hero-name-word gold-leaf is-leaving">{at(count - 1)}</span>
      )}
      <span key={count} className={`home-hero-name-word gold-leaf${count > 0 ? ' is-entering' : ''}`}>{at(count)}</span>
    </span>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const h = t.home;

  // A pillar's buttons. A link with `href` would leave the site, so it is a
  // plain <a> (none does now — the Brands row's Shop button was removed);
  // the rest are in-app router Links.
  const actionsOf = (p) => {
    const info = h.pillars[p.id];
    return p.links.map((l) => {
      const label = <>{info.ctas[l.key]} <Arrow /></>;
      return l.href
        ? <a key={l.key} href={l.href} className="btn btn-primary">{label}</a>
        : <Link key={l.key} to={l.to} className="btn btn-primary">{label}</Link>;
    });
  };

  // The five pillars as ServiceRows services (components/ServicePage): the
  // zig-zag PillarRows on desktop/tablet, the card stage on phones — the
  // same as every "What we do" page. Title, lead, body, chips and buttons;
  // media: the row's film if media.serviceVideos has one, otherwise its
  // photo (a dashed placeholder until it exists).
  const services = pillars.map((p) => {
    const info = h.pillars[p.id];
    return {
      id: p.id,
      title: info.title,
      lead: info.lead,
      body: info.body,
      tags: info.tags,
      actions: actionsOf(p),
    };
  });
  const photos = Object.fromEntries(pillars.map(({ id }) => {
    const video = media.serviceVideos[id];
    return [id, video ? { ...video, video: true } : { src: media.services[id] }];
  }));
  const rowMedia = servicePhotos(services, photos);
  // The rows break after Brands for the virtual-store band: Corporate Gifts
  // and Brands above it, Agency, Events and F&B below (numbered on: start).
  // Keep the first part an EVEN number of rows, so the zig-zag carries on.
  const BAND_AFTER = 2;

  return (
    <div className="home">
      {/* 01 — hero: one picture, full width (media.heroImage; the dashed
          slot until the file lands). The two films it replaced are PARKED:
          the showreel and, on phones, the portrait Agency film — one shown
          per width by CSS (.home-hero-video-wide / -phone, still in Home.css):
          <AutoplayVideo className="home-hero-video home-hero-video-wide" {...media.hero} label={h.hero.mediaLabel} />
          <AutoplayVideo className="home-hero-video home-hero-video-phone" {...media.heroPhone} label={h.hero.mediaLabel} /> */}
      <section className="home-hero">
        <div className="home-hero-media">
          <ImagePlaceholder className="home-hero-image" src={media.heroImage} label={h.hero.mediaLabel} ratio="auto" loading="eager" />
        </div>
        <div className="container home-hero-content">
          <h1 className="display-title home-hero-title">
            {/* The full line for screen readers and crawlers; the drawn
                version below rotates the name, so it is hidden from them. */}
            <span className="sr-only">{h.hero.title}</span>
            <span aria-hidden="true">
              {h.hero.titleLead} <RotatingName names={h.hero.names} />
            </span>
          </h1>
          <p className="home-hero-body">{h.hero.body}</p>
          <div className="home-hero-actions">
            {/* "Explore what we do": down to the What-we-do section below */}
            <Link to={whatWeDoLink} className="btn btn-primary">
              {h.hero.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* 02 — what we do: the intro, then one row per pillar */}
      <section id="what-we-do" className="container scroll-anchor home-services-intro">
        <span className="card-kicker">{h.whatWeDo.kicker}</span>
        <h2 className="home-services-heading">{h.whatWeDo.heading}</h2>
        <p className="home-services-body">{h.whatWeDo.body}</p>
      </section>

      <ServiceRows services={services.slice(0, BAND_AFTER)} media={rowMedia.slice(0, BAND_AFTER)} titleAs="h3" />

      {/* the virtual store — under the Brands row: a full-width band, the
          store's picture behind it (media.virtualStore), and two white
          buttons on its dark wash: the Matterport 3D walkthrough (new tab)
          and the brands' online store (same tab, like every Shop link) */}
      <section className="home-virtual-store" style={{ '--virtual-store-bg': `url("${media.virtualStore}")` }}>
        <div className="container home-virtual-store-inner">
          <h2 className="home-virtual-store-heading">{h.virtualStore.heading}</h2>
          <p className="home-virtual-store-body">{h.virtualStore.body}</p>
          <div className="home-virtual-store-actions">
            <a href={virtualStoreUrl} target="_blank" rel="noopener noreferrer" className="btn btn-light">
              {h.virtualStore.cta}
            </a>
            <a href={shopLink} className="btn btn-light">
              {h.virtualStore.shopCta}
            </a>
          </div>
        </div>
      </section>

      <ServiceRows services={services.slice(BAND_AFTER)} media={rowMedia.slice(BAND_AFTER)} titleAs="h3" start={BAND_AFTER} />

      {/* final CTA — opens the enquiry form at the foot of /about */}
      <FinalCta content={h.finalCta} to={contactLink} />
    </div>
  );
}
