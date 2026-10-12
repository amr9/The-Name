import { useEffect, useRef, useState } from 'react';
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

// Every pillar row's picture or film — photo, placeholder or video — sits in
// ONE frame shape, portrait 4:5 (the shape the films are cut to). Media of
// another shape FILLS it (object-fit: cover in Home.css), cropped at the
// edges rather than letterboxed. The frame's WIDTH is capped in Home.css
// (.home-service-figure). On the phone stage the frame is a fixed box instead.
const ROW_RATIO = '4 / 5';

// How long each name in the hero title stays before the next drops in —
// longer on names[0], the slogan's own "a name." / "اسم.".
const NAME_HOLD_MS = 1500;
const SLOGAN_HOLD_MS = 3000;

// The "→" after every call to action. Decorative, so hidden from screen
// readers; mirrored under RTL in Home.css.
function Arrow() {
  return <span className="home-arrow" aria-hidden="true">→</span>;
}

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
        <span key={count - 1} className="home-hero-name-word is-leaving">{at(count - 1)}</span>
      )}
      <span key={count} className={`home-hero-name-word${count > 0 ? ' is-entering' : ''}`}>{at(count)}</span>
    </span>
  );
}

// Phones only: the "What we do" rows become ONE pinned stage. Keep in step
// with the @media in Home.css's "pillar stage" block.
const STAGE_QUERY = '(max-width: 760px)';

// Drives the phone stage. The page scrolls normally; the track is tall (see
// Home.css) and the stage inside it is sticky, so while it is pinned the
// distance scrolled into the track picks the active row — each row owns one
// `step` of scroll, centred on its resting point. Everything else (fades,
// slides, which film plays) follows `active`. The server render and the
// first client render both say active 0 / not a stage, so hydration matches.
// 0 below a, 1 above b, eased in between.
const smoothstep = (a, b, v) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function usePillarStage(count) {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const [isStage, setIsStage] = useState(false);
  const [active, setActive] = useState(0);
  // The "Scroll" hint shows until the visitor has scrolled a little into the
  // stage (and again if they come back to the very start).
  const [atStart, setAtStart] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia(STAGE_QUERY);
    const update = () => setIsStage(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Measured from the layout rather than restated from the CSS, so the
  // two cannot drift: the track is the stage plus (count - 0.5) steps.
  const geometry = () => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const pin = parseFloat(getComputedStyle(stage).top) || 0;
    const step = (track.offsetHeight - stage.offsetHeight) / (count - 0.5);
    return { track, pin, step };
  };

  useEffect(() => {
    if (!isStage) {
      setActive(0);
      return undefined;
    }
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const rows = [...stageRef.current.querySelectorAll(':scope > .home-service-row')];
    let frame = 0;
    const measure = () => {
      frame = 0;
      const { track, pin, step } = geometry();
      const scrolled = pin - track.getBoundingClientRect().top;
      const index = Math.min(count - 1, Math.max(0, Math.round(scrolled / step)));
      setActive(index);
      setAtStart(scrolled < step * 0.15);

      // The transition is SCRUBBED by the scroll, not triggered at a
      // threshold: x is the position in rows (1.5 = halfway from row 02 to
      // 03) and each row gets d = its distance from x, clamped to -1..1.
      // Home.css turns d into the slide (left when passed, right when to
      // come) and the fade, so the change runs exactly as far as the finger
      // has moved. Written as CSS variables per frame, no re-render.
      // Reduced motion: no in-between, the active row simply shows.
      const x = Math.min(count - 1, Math.max(0, scrolled / step));
      rows.forEach((row, i) => {
        const d = reduce ? Math.sign(i - index) : Math.min(1, Math.max(-1, i - x));
        // The media cross-fades across the whole step (--o); the TEXT hands
        // over instead (--ot) — the outgoing copy is gone by halfway and
        // the incoming one only appears after it, so two blocks of text
        // never sit on top of each other.
        const o = 1 - smoothstep(0.15, 0.85, Math.abs(d));
        const ot = 1 - smoothstep(0.05, 0.5, Math.abs(d));
        row.style.setProperty('--ot', ot.toFixed(4));
        row.style.setProperty('--d', d.toFixed(4));
        row.style.setProperty('--ad', Math.abs(d).toFixed(4));
        row.style.setProperty('--o', o.toFixed(4));
        row.style.setProperty('--vis', o > 0.01 ? 'visible' : 'hidden');
      });
    };

    // SETTLING. The page must never come to rest between two rows (a half
    // faded stage). CSS scroll-snap was tried and dropped: with a snap point
    // every 75svh, "proximity" pulled short swipes BACK to the row they
    // started from (the stage felt stuck) and let medium ones rest halfway
    // (measured with real touch input). Instead, once the scroll is at rest
    // and the finger is up, this glides to a row chosen by DIRECTION: moved
    // more than 8% of a step (~50px) from the row it last rested on → on to
    // the next row that way; less → back. Outside the pinned span (before
    // row 01, after row 05) the page scrolls freely.
    let rest = Math.min(count - 1, Math.max(0, Math.round(
      (geometry().pin - trackRef.current.getBoundingClientRect().top) / geometry().step,
    )));
    let touching = false;
    let timer = 0;
    const settle = () => {
      clearTimeout(timer);
      timer = 0;
      if (touching) return;
      const { track, pin, step } = geometry();
      const x = (pin - track.getBoundingClientRect().top) / step;
      const near = Math.round(x);
      if (x <= 0.02 || x >= count - 1.02 || Math.abs(x - near) < 0.02) {
        rest = Math.min(count - 1, Math.max(0, near));
        return;
      }
      const moved = x - rest;
      const target = moved > 0.08 ? Math.ceil(x) : moved < -0.08 ? Math.floor(x) : rest;
      rest = Math.min(count - 1, Math.max(0, target));
      window.scrollTo({
        top: track.getBoundingClientRect().top + window.scrollY - pin + rest * step,
        behavior: reduce ? 'auto' : 'smooth',
      });
    };
    // Settle once scrolling stops: `scrollend` where the browser has it,
    // otherwise (Safari) a short pause in scroll events — momentum keeps
    // them coming, so this waits for the fling to finish.
    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(settle, 160);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
      schedule();
    };
    const onTouchStart = () => {
      touching = true;
      clearTimeout(timer);
    };
    const onTouchEnd = () => {
      touching = false;
      schedule();
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scrollend', settle);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scrollend', settle);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [isStage, count]);

  // A progress dot scrolls the page to that row's resting point.
  const goTo = (i) => {
    const { track, pin, step } = geometry();
    const top = track.getBoundingClientRect().top + window.scrollY - pin + i * step;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
  };

  return { trackRef, stageRef, isStage, active, atStart, goTo };
}

// A row's specialities as chips. On the phone stage the list is one line
// that swipes sideways (Home.css), and the slim bar under it shows where:
// the gold thumb is as wide as the visible share of the row and travels with
// the swipe. Written to CSS variables on scroll, no re-render. When the
// chips all fit (or on wider screens, where they wrap) the bar is hidden.
function TagRow({ tags }) {
  const listRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    const bar = barRef.current;
    const update = () => {
      const { scrollWidth, clientWidth, scrollLeft } = list;
      const max = scrollWidth - clientWidth;
      // scrollLeft runs negative under RTL, hence the abs().
      const pos = max > 0 ? Math.min(1, Math.abs(scrollLeft) / max) : 0;
      bar.style.setProperty('--thumb-size', (scrollWidth ? clientWidth / scrollWidth : 1).toFixed(4));
      bar.style.setProperty('--thumb-pos', pos.toFixed(4));
      bar.toggleAttribute('data-fits', max <= 1);
    };
    update();
    list.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      list.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [tags]);

  return (
    <>
      <ul className="home-service-tags" ref={listRef}>
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <div className="home-service-tags-bar" ref={barRef} aria-hidden="true" />
    </>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const h = t.home;
  const stage = usePillarStage(pillars.length);

  return (
    <div className="home">
      {/* 01 — hero: the looping film, full width (components/AutoplayVideo) */}
      <section className="home-hero">
        <div className="home-hero-media">
          <AutoplayVideo className="home-hero-video" {...media.hero} label={h.hero.mediaLabel} />
        </div>
        <div className="home-hero-scrim" />
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

      {/* Desktop and tablet: the rows below simply stack. Phones: the track is
          tall and the stage inside it is pinned, so scrolling swaps one row
          for the next in place (usePillarStage; Home.css "pillar stage"). */}
      <div className="home-pillars" ref={stage.trackRef} style={{ '--pillar-count': pillars.length }}>
        <div className="home-pillars-stage" ref={stage.stageRef} data-at-start={stage.atStart ? '' : undefined}>
          {/* Phone-only "Scroll" hint for the first row; decorative. */}
          <div className="home-pillars-hint" aria-hidden="true">
            <span>{h.whatWeDo.scrollHint}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          <div className="home-pillars-dots">
            {pillars.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className={`home-pillars-dot${i === stage.active ? ' is-active' : ''}`}
                aria-label={h.pillars[p.id].title}
                aria-current={i === stage.active ? 'true' : undefined}
                onClick={() => stage.goTo(i)}
              />
            ))}
          </div>
          {pillars.map((p, i) => {
            const info = h.pillars[p.id];
            const video = media.serviceVideos[p.id];
            // Rows zig-zag: text first on even rows, picture first on odd ones.
            const textOrder = i % 2 === 0 ? 1 : 2;
            // Where this row sits relative to the stage's active one — drives
            // the phone transitions (it slides in from the side it comes from).
            const pos = i === stage.active ? 'active' : i < stage.active ? 'before' : 'after';
            const hidden = stage.isStage && pos !== 'active';
            return (
              <section
                key={p.id}
                className="container home-service-row"
                data-pos={pos}
                // The phone stage's starting state (row 01 shown), for the
                // pre-rendered HTML; usePillarStage takes over from here.
                // Plain CSS variables, read only by the stage CSS.
                style={{ '--d': Math.sign(i), '--ad': i ? 1 : 0, '--o': i ? 0 : 1, '--ot': i ? 0 : 1, '--vis': i ? 'hidden' : 'visible' }}
                // A hidden row's buttons must not take keyboard focus (React 18
                // passes `inert` through only as a string attribute).
                inert={hidden ? '' : undefined}
              >
                <div className="row-flip home-service-grid">
                  <div className="row-text home-service-text" style={{ order: textOrder }}>
                    <div className="home-service-kicker-row">
                      <span className="home-service-num">{p.num}</span>
                      <span className="home-service-rule" />
                    </div>
                    <h3 className="home-service-title">{info.title}</h3>
                    <p className="home-service-lead">{info.lead}</p>
                    {info.body && <p className="home-service-body">{info.body}</p>}
                    <TagRow tags={info.tags} />
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
                        <AutoplayVideo
                          className="home-service-video"
                          {...video}
                          ratio={ROW_RATIO}
                          label={info.title}
                          // On the phone stage every row is "in view" — only the
                          // active one may play.
                          active={stage.isStage ? pos === 'active' : undefined}
                        />
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
        </div>
      </div>

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
