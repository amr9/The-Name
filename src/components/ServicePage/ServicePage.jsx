import { useEffect, useRef, useState } from 'react';
import AutoplayVideo from '../AutoplayVideo.jsx';
import ImagePlaceholder from '../ImagePlaceholder.jsx';
import { STAGE_QUERY } from '../PillarRows/PillarRows.jsx';
import useScrollStage from '../../hooks/useScrollStage.js';
import './ServicePage.css';

/**
 * The pillar pages of the navbar's "What we do" (Corporate Gifts, Brands,
 * Agency, Events, F&B & Concept Store) — ONE layout, the "Editorial" design first built for the
 * Agency page.
 *
 * HERO: the shared .rows-page / .page-hero (theme.css) — kicker, a large
 * uppercase title whose last words are in .gold-leaf (the Home hero name's
 * gradient), typed out on a loop (TypedTitle), the lede.
 *
 * SERVICES: one section per entry in `services`, their titles the pillar's
 * chips on Home (i18n home.pillars[id].tags — the pages pass them in, so a
 * service is named in one place). Each is the uppercase title beside its
 * bold lead, grey body and optional `extra` (Brands: the category's brands).
 * No per-row enquiry link: the floating chat button already does that.
 *  - Desktop/tablet: full-width rows between hairlines, each with its own
 *    pictures on the reading-end side as ServiceSlices (below).
 *  - Phones (PillarRows' STAGE_QUERY): the same pinned scroll stage as Home's
 *    "What we do" (hooks/useScrollStage), the media as its BACKDROP under
 *    the shared .stage-wash, the copy on top, the shared .stage-dots.
 *
 * MEDIA: `media` is a list. ONE entry is shared by every service (a film,
 * playing on while the copy changes — phones only, no desktop slices); one
 * entry PER service follows the active stage row on phones, cross-fading,
 * and its `gallery` (or just its picture) is that row's slices on desktop.
 * An entry is { src, poster? (a film), video?: true, label, gallery? } — a
 * gallery item is a src or { src, label?, href?, linkLabel? } (a link).
 *
 * `hero`: { kicker, titleLead, titleMark, lede }
 * `services`: [{ id, title, lead, body, extra? }] — see servicesFrom below
 * `children`: optional, rendered under the services inside the page (Brands:
 * the catalogue covers).
 */

// The hero title typed out like a keyboard, a caret blinking at its end: it
// holds the full line for TYPE_HOLD_MS, erases it and types it again.
const TYPE_MS = 70;
const ERASE_MS = 30;
const TYPE_HOLD_MS = 10000;
const TYPE_PAUSE_MS = 400;

function TypedTitle({ lead, mark }) {
  // Code points, not UTF-16 units, so no character is ever split in two.
  const chars = Array.from(`${lead} ${mark}`);
  const leadLen = Array.from(lead).length + 1;
  // The full line renders on the server and stays for reduced-motion
  // visitors; in the browser it starts over from empty (and again on a
  // language switch).
  const [n, setN] = useState(chars.length);
  const [typing, setTyping] = useState(true);
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    setN(0);
    setTyping(true);
    setMoving(true);
  }, [lead, mark]);

  useEffect(() => {
    if (!moving) return undefined;
    let next;
    if (typing) next = n < chars.length ? [TYPE_MS, () => setN(n + 1)] : [TYPE_HOLD_MS, () => setTyping(false)];
    else next = n > 0 ? [ERASE_MS, () => setN(n - 1)] : [TYPE_PAUSE_MS, () => setTyping(true)];
    const id = setTimeout(next[1], next[0]);
    return () => clearTimeout(id);
  }, [moving, typing, n, chars.length]);

  const typedMark = chars.slice(leadLen, n).join('');
  return (
    // An invisible copy of the full line holds the title's size, so the page
    // under it never moves while the line types and erases.
    <span className="typed-title" aria-hidden="true">
      <span className="typed-title-reserve">
        {lead} <span className="gold-leaf service-title-mark">{mark}</span>
      </span>
      <span>
        {chars.slice(0, Math.min(n, leadLen)).join('')}
        {typedMark && <span className="gold-leaf service-title-mark">{typedMark}</span>}
        <span className="typed-caret" />
      </span>
    </span>
  );
}

// A page's services from its data.js list, its Home chips and its copy: the
// i-th service is titled by the i-th chip (home.pillars[pillar].tags), so a
// service is named in ONE place and the list must follow the chips' order.
// `copy` is the page's i18n { [id]: { lead, body } }.
export const servicesFrom = (list, tags, copy) =>
  list.map(({ id }, i) => ({ id, title: tags[i], ...copy[id] }));

// How many slices a service's picture set has (desktop): its photo, then
// the files beside it named <photo>-2.jpg … -<SLICES>.jpg.
const SLICES = 4;
const photoSet = (src) => [
  src,
  ...Array.from({ length: SLICES - 1 }, (_, n) => src.replace(/(\.\w+)$/, `-${n + 2}$1`)),
];

// ONE picture per service, for `media`: `photos` is a page's
// media.servicePhotos[pillar] map ({ [service id]: src }); each picture is
// labelled by its service's title and carries its `gallery` (photoSet). A
// file not supplied yet shows the dashed ImagePlaceholder slot.
export const servicePhotos = (services, photos) =>
  services.map((s) => ({ src: photos[s.id], label: s.title, gallery: photoSet(photos[s.id]) }));

// Desktop/tablet: a service's pictures as slices of one rectangle, cut apart
// by slanted lines. One is OPEN — the first, or the one under the pointer —
// shown whole with straight edges; the rest squeeze to the rectangle's edges,
// still in view. Each slice's start/end edge is straight (0) or slanted (1):
// the open one's, its neighbours' facing ones and the rectangle's ends are
// straight, and the slash animates between the two (ServicePage.css).
// `items`: a src, or { src, label?, href?, linkLabel? } — a slice with
// `href` is a link, opened in a new tab (Brands: the catalogue). Every open
// picture is the same portrait window (ServicePage.css --open-ar).
//
// The open slice follows the pointer only when the pointer MOVES (not on
// mouseenter): while the slices animate they slide under a still pointer,
// and treating that as hovering flipped the open slice back and forth.
// After each change it holds for SLICE_SETTLE_MS, then takes the slice the
// pointer last moved over.
const SLICE_SETTLE_MS = 350;

function ServiceSlices({ items, label }) {
  const [open, setOpen] = useState(0);
  const last = items.length - 1;
  const settleUntil = useRef(0);
  const wanted = useRef(0);
  const timer = useRef(null);

  const pick = (i) => {
    wanted.current = i;
    if (timer.current) return;
    const apply = () => {
      timer.current = null;
      setOpen(wanted.current);
      settleUntil.current = performance.now() + SLICE_SETTLE_MS;
    };
    const wait = settleUntil.current - performance.now();
    if (wait > 0) timer.current = setTimeout(apply, wait);
    else apply();
  };
  const reset = () => {
    clearTimeout(timer.current);
    timer.current = null;
    wanted.current = 0;
    setOpen(0);
    settleUntil.current = performance.now() + SLICE_SETTLE_MS;
  };
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <div className="service-slices" style={{ '--n': items.length }}>
      <div className="service-slices-frame" onMouseLeave={reset}>
        <div className="service-slices-track">
          {items.map((item, i) => {
            const { src, href, linkLabel, label: own } = typeof item === 'string' ? { src: item } : item;
            const Slice = href ? 'a' : 'div';
            return (
              <Slice
                key={src}
                className="service-slice"
                data-open={i === open}
                style={{
                  '--s': i === 0 || i === open || i === open + 1 ? 0 : 1,
                  '--e': i === last || i === open || i === open - 1 ? 0 : 1,
                }}
                onPointerMove={(e) => (e.movementX || e.movementY) && i !== wanted.current && pick(i)}
                onFocus={() => { wanted.current = i; setOpen(i); }}
                {...(href && { href, target: '_blank', rel: 'noopener noreferrer', 'aria-label': linkLabel })}
              >
                <ImagePlaceholder className="service-slice-img" src={src} label={own || label} ratio="auto" />
              </Slice>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ServicePage({ className = '', hero, services, media, children }) {
  const stage = useScrollStage(services.length, {
    query: STAGE_QUERY,
    rowSelector: '.service-row',
    bandSelector: '.service-row .service-row-inner',
  });

  const shown = media.length < 2 ? 0 : stage.active;
  // One media entry per service: its slices on desktop (its `gallery`, or
  // just its picture).
  const perService = media.length === services.length;

  return (
    <div className={`rows-page service-page ${className}`}>
      <header className="container page-hero service-hero">
        <span className="card-kicker">{hero.kicker}</span>
        <h1 className="page-title page-hero-title service-title">
          {/* The full line for screen readers and crawlers; the typed one is
              hidden from them. */}
          <span className="sr-only">{hero.titleLead} {hero.titleMark}</span>
          <TypedTitle lead={hero.titleLead} mark={hero.titleMark} />
        </h1>
        <p className="page-hero-lede">{hero.lede}</p>
      </header>

      <div
        className="service-list"
        ref={stage.trackRef}
        style={{ '--stage-count': services.length }}
      >
        <div className="service-stage" ref={stage.stageRef}>
          <div className="stage-dots">
            {services.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={`stage-dot${i === stage.active ? ' is-active' : ''}`}
                aria-label={s.title}
                aria-current={i === stage.active ? 'true' : undefined}
                onClick={() => stage.goTo(i)}
              />
            ))}
          </div>
          <div className="stage-wash wash-to-bg" aria-hidden="true" />
          {/* The stage's backdrop on phones only (ServicePage.css); desktop
              shows each row's ServiceSlices instead. Every entry is stacked
              here and the shown one fades in. */}
          <figure className="service-media">
            {media.map((m, i) => (
              <div key={m.src} className="service-media-item" data-shown={i === shown}>
                {m.video ? (
                  <AutoplayVideo
                    className="service-media-fill"
                    src={m.src}
                    poster={m.poster}
                    label={m.label}
                    active={media.length < 2 ? undefined : i === shown}
                  />
                ) : (
                  // ImagePlaceholder: the dashed slot until the file exists
                  // (F&B's picture is not in yet).
                  <ImagePlaceholder className="service-media-slot" src={m.src} label={m.label} ratio="auto" />
                )}
              </div>
            ))}
          </figure>
          {services.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              className="service-row"
              aria-labelledby={`service-${s.id}`}
              // The phone stage's starting state (service 01 shown), for the
              // pre-rendered HTML; useScrollStage takes over from here. Read
              // only by the stage CSS.
              style={{ '--d': Math.sign(i), '--ot': i ? 0 : 1, '--vis': i ? 'hidden' : 'visible' }}
              // A service hidden on the stage must not take keyboard focus.
              inert={stage.isStage && i !== stage.active ? '' : undefined}
            >
              <div className="container service-row-inner">
                <h2 id={`service-${s.id}`} className="service-row-title">{s.title}</h2>
                <div className="service-row-text">
                  <p className="service-row-lead">{s.lead}</p>
                  {s.body && <p className="service-row-body">{s.body}</p>}
                  {s.extra}
                </div>
                {perService && (
                  <ServiceSlices items={media[i].gallery || [media[i].src]} label={media[i].label} />
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
