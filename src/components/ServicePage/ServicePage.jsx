import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import AutoplayVideo from '../AutoplayVideo.jsx';
import FinalCta from '../FinalCta.jsx';
// PARKED with the film's expand badge (ServicePage below).
// import FilmLightbox from '../FilmLightbox/FilmLightbox.jsx';
import ImagePlaceholder from '../ImagePlaceholder.jsx';
import RotatingName from '../RotatingName/RotatingName.jsx';
import MediaGallery, { GalleryLightbox, galleryItem } from '../MediaGallery/MediaGallery.jsx';
import PillarRows, { STAGE_QUERY, TagScrollBar } from '../PillarRows/PillarRows.jsx';
import useScrollStage from '../../hooks/useScrollStage.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { waMessageLink } from '../../data/site.js';
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
 * lead, grey body and optional `tags` (Brands: the category's brands).
 * No per-row enquiry link: the floating chat button already does that.
 *  - Desktop/tablet: Home's zig-zag PillarRows (ServiceRows), alternating
 *    sides, each row's media its whole group of pictures in a MediaGallery
 *    (side by side, as many as fit; pop up on hover; click: a carousel of
 *    them all), filling the column up to the text, no ring. (The full-width
 *    rows with ServiceSlices that were here are PARKED: still in ServiceList,
 *    hidden on desktop.)
 *  - Phones (PillarRows' STAGE_QUERY): the same pinned scroll stage as Home's
 *    "What we do" (hooks/useScrollStage), the media as its full-bleed
 *    BACKDROP, each service a frosted-glass CARD on its foot (title, lead,
 *    `tags` as one line swiped sideways by hand, the card's full width), the
 *    shared .stage-dots. The grabber bar at the card's foot folds every
 *    card down to its title (and back), which also lets the floating chat
 *    button return.
 *
 * MEDIA: `media` is a list. ONE entry is shared by every service (a film,
 * playing on while the copy changes — phones only, no desktop slices); one
 * entry PER service follows the active stage row on phones, cross-fading,
 * and its `gallery` (or just its picture) is that row's MediaGallery on
 * desktop.
 * On phones a gallery of more than one is a strip the visitor swipes through
 * (MediaStrip), never moving on its own.
 * An entry is { src, poster? (a film), video?: true, label, href?,
 * linkLabel?, gallery? } — with `href` the phone backdrop is a link (new
 * tab; Brands: the category's catalogue). A gallery item is a src or
 * { src, label?, href?, linkLabel? } (a link).
 *
 * `hero`: { kicker, titleLead, titleMark, lede, tags?, body?, motto? } — or,
 * with `names` (and `title`, the full line for screen readers) instead of
 * `titleMark`, the title's last line rotates through `names` like the Home
 * hero (components/RotatingName; Agency: "We talk …") —
 * under the lede, `tags` as pills (F&B: its services, i.e. its Home chips),
 * `body` paragraphs (Agency, Events), and `motto`, a closing line (Agency).
 * `services`: [{ id, title, lead, body, tags?, tagsLabel?, actions? }] — see
 * servicesFrom below; `tags` are chips (Brands: the category's brands,
 * `tagsLabel` naming the list), `actions` (Home only) buttons under the text.
 *
 * The services section is `ServiceRows` (exported, below) — Home's "What we
 * do" uses it too, so Home and these pages share ONE structure: desktop/tablet
 * Home's zig-zag PillarRows, phones the card stage (ServiceList).
 * `film`: optional { src, poster, label } — a landscape film shown whole,
 * centred under the hero at 16:9, tap to watch it full-screen (FilmLightbox)
 * (Agency: its Brand Communication film).
 * `intro`: optional, rendered between the hero and the services (Brands: the
 * partner-logo strip).
 * `services` may be left out (Brands has none): the page is then the hero,
 * `intro`, `children` and the closing call to action.
 * `children`: optional, rendered under the services inside the page (Brands:
 * its catalogue cards).
 *
 * Every page ends on Home's closing call to action (FinalCta, the same
 * home.finalCta copy: "Let's explore what we can create together."), its
 * "Start a conversation" opening WhatsApp with the page's own message typed
 * in — `hero.waMessage` (each page's i18n block).
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
// media.servicePhotos[pillar] map ({ [service id]: src | { src, poster?,
// video? } }); each is labelled by its service's title. A src STRING carries
// its `gallery` (photoSet) — a file not supplied yet shows the dashed
// ImagePlaceholder slot; an OBJECT is a supplied picture or film, shown alone
// — or with its own `gallery` of several.
export const servicePhotos = (services, photos) =>
  services.map((s) => {
    const p = photos[s.id];
    if (typeof p === 'string') return { src: p, label: s.title, gallery: photoSet(p) };
    return { ...p, label: s.title, gallery: p.gallery || [p] };
  });

// Phones: a service's gallery as the stage backdrop, one picture per screen,
// swiped either way (scroll-snap) — never moving on its own, and with no
// dots of its own. A slice with `href` is a link, as on desktop.
function MediaStrip({ items, label }) {
  return (
    <div className="service-media-track">
      {items.map((item) => {
        const { src, href, linkLabel, label: own, poster, video } = galleryItem(item);
        const Slide = href ? 'a' : 'div';
        return (
          <Slide
            key={src}
            className="service-media-slide"
            {...(href && { href, target: '_blank', rel: 'noopener noreferrer', 'aria-label': linkLabel })}
          >
            {video ? (
              <AutoplayVideo className="service-media-fill" src={src} poster={poster} label={own || label} />
            ) : (
              <ImagePlaceholder className="service-media-slot" src={src} label={own || label} ratio="auto" />
            )}
          </Slide>
        );
      })}
    </div>
  );
}

// Desktop/tablet: a service's pictures as slices of one rectangle, cut apart
// by slanted lines. One is OPEN — the first, or the one under the pointer —
// shown whole with straight edges; the rest squeeze to the rectangle's edges,
// still in view. Each slice's start/end edge is straight (0) or slanted (1):
// the open one's, its neighbours' facing ones and the rectangle's ends are
// straight, and the slash animates between the two (ServicePage.css).
// `items`: a src, or { src, label?, href?, linkLabel?, poster?, video? } — a
// slice with `href` is a link, opened in a new tab (Brands: the catalogue);
// one with `video` is a film (AutoplayVideo). Every open
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
            const { src, href, linkLabel, label: own, poster, video } = galleryItem(item);
            const Slice = href ? 'a' : 'div';
            return (
              <Slice
                key={src}
                className="service-slice"
                data-open={i === open}
                style={{
                  '--i': i,
                  '--s': i === 0 || i === open || i === open + 1 ? 0 : 1,
                  '--e': i === last || i === open || i === open - 1 ? 0 : 1,
                }}
                onPointerMove={(e) => (e.movementX || e.movementY) && i !== wanted.current && pick(i)}
                onFocus={() => { wanted.current = i; setOpen(i); }}
                {...(href && { href, target: '_blank', rel: 'noopener noreferrer', 'aria-label': linkLabel })}
              >
                {video ? (
                  <AutoplayVideo className="service-slice-img service-slice-film" src={src} poster={poster} label={own || label} />
                ) : (
                  <ImagePlaceholder className="service-slice-img" src={src} label={own || label} ratio="auto" />
                )}
              </Slice>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// A service's `tags` (its chips; `label` names the list). On the phone
// card: one line swiped sideways by hand, with PillarRows' slim scroll bar
// under it showing how far (TagScrollBar). On desktop they wrap and the bar
// is hidden.
function ServiceTags({ tags, label }) {
  const scrollerRef = useRef(null);
  return (
    <>
      <div className="service-row-extra" ref={scrollerRef}>
        <ul className="pillar-tags" aria-label={label}>
          {tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      </div>
      <TagScrollBar scrollerRef={scrollerRef} watch={tags} />
    </>
  );
}

// A media entry's group in its PHONE order: `phoneLead` (an index into its
// `gallery`) moves that picture to the front — the stage's first, main
// picture and the viewer's first slide (Agency Brand Communication: its
// portrait "bpe" picture). Desktop keeps the gallery's own order.
const phoneGallery = (m) => {
  const g = m.gallery || [m];
  return m.phoneLead == null ? g : [g[m.phoneLead], ...g.filter((_, i) => i !== m.phoneLead)];
};

// The services section: the full-width rows with their ServiceSlices on
// desktop, the pinned card stage on phones (see the comment at the top).
// Shared with Home's "What we do", which passes `titleAs="h3"` (its rows
// sit under the section's h2) and gives each service `actions` (its
// buttons, under the text). Rendered by ServiceRows, which shows it on
// PHONES only: its desktop rows and ServiceSlices are hidden (kept, parked).
export function ServiceList({ services, media, titleAs: Title = 'h2' }) {
  const { t } = useLanguage();
  const stage = useScrollStage(services.length, {
    query: STAGE_QUERY,
    rowSelector: '.service-row',
  });

  // The phone cards, folded down to their titles by the grabber bar — one
  // state for every card, so the next service arrives folded too.
  const [collapsed, setCollapsed] = useState(false);

  // A tap on the backdrop opens MediaGallery's viewer on that service's
  // whole group (its `gallery`, or just its picture or film), at the
  // picture in view — the same viewer as the desktop rows. Not on a linked
  // entry (Brands: the tap opens its catalogue instead).
  const [viewer, setViewer] = useState(null);
  const opensViewer = (m) => !m.href && !(m.gallery || []).some((it) => galleryItem(it).href);
  const openViewer = (m, el) => {
    const track = el.querySelector('.service-media-track');
    const start = track ? Math.round(Math.abs(track.scrollLeft) / track.clientWidth) : 0;
    setViewer({ items: phoneGallery(m).map(galleryItem), start, label: m.label });
  };

  // While the phone stage fills the screen, the floating chat button would
  // sit on the card: <html data-stage-pinned> tells ChatLauncher.css to
  // tuck it away until the stage scrolls off — or the card is folded.
  const { isStage, stageRef } = stage;

  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    const el = stageRef.current;
    if (!isStage || !el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setPinned(entry.intersectionRatio > 0.9),
      { threshold: [0, 0.9, 1] },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      setPinned(false);
    };
  }, [isStage, stageRef]);
  useEffect(() => {
    const root = document.documentElement;
    root.toggleAttribute('data-stage-pinned', pinned && !collapsed);
    return () => root.removeAttribute('data-stage-pinned');
  }, [pinned, collapsed]);

  const shown = media.length < 2 ? 0 : stage.active;
  // One media entry per service: its slices on desktop (its `gallery`, or
  // just its picture).
  const perService = media.length === services.length;

  return (
    <div
      className="service-list"
      ref={stage.trackRef}
      style={{ '--stage-count': services.length }}
    >
      <div className="service-stage" ref={stage.stageRef} data-collapsed={collapsed || undefined}>
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
        {/* The stage's backdrop on phones only (ServicePage.css); desktop
            shows each row's ServiceSlices instead. Every entry is stacked
            here and the shown one fades in. */}
        <figure className="service-media">
          {media.map((m, i) => {
            // more than one picture: the swipeable strip, its slides the links
            const strip = m.gallery?.length > 1;
            const Item = m.href && !strip ? 'a' : 'div';
            return (
              <Item
                key={m.src}
                className="service-media-item"
                data-shown={i === shown}
                // only the shown entry takes taps and focus
                inert={i === shown ? undefined : ''}
                {...(Item === 'a' && { href: m.href, target: '_blank', rel: 'noopener noreferrer', 'aria-label': m.linkLabel })}
                {...(opensViewer(m) && {
                  role: 'button',
                  tabIndex: 0,
                  'aria-haspopup': 'dialog',
                  'aria-label': t.common.viewPictures(m.label, 1, (m.gallery || [m]).length),
                  'data-opens': '',
                  onClick: (e) => openViewer(m, e.currentTarget),
                  onKeyDown: (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), openViewer(m, e.currentTarget)),
                })}
              >
                {strip ? (
                  // at most `max` in the strip; a tap opens the whole group
                  <MediaStrip items={m.max ? phoneGallery(m).slice(0, m.max) : phoneGallery(m)} label={m.label} />
                ) : m.video ? (
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
              </Item>
            );
          })}
        </figure>
        {services.map((s, i) => {
          return (
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
                <Title id={`service-${s.id}`} className="service-row-title">{s.title}</Title>
                <div className="service-row-text" inert={stage.isStage && collapsed ? '' : undefined}>
                  <p className="service-row-lead">{s.lead}</p>
                  {s.body && <p className="service-row-body">{s.body}</p>}
                  {s.tags?.length > 0 && <ServiceTags tags={s.tags} label={s.tagsLabel} />}
                  {/* Home: the pillar's buttons (its page, Brands' Shop) */}
                  {s.actions && <div className="pillar-ctas service-row-actions">{s.actions}</div>}
                </div>
                {/* Phones only (ServicePage.css): the grabber bar, folding
                    the cards down to their titles and back. */}
                <button
                  type="button"
                  className="service-row-grab"
                  aria-expanded={!collapsed}
                  aria-label={collapsed ? t.common.expandCard : t.common.collapseCard}
                  onClick={() => setCollapsed((c) => !c)}
                />
                {perService && (
                  <ServiceSlices items={media[i].gallery || [media[i].src]} label={media[i].label} />
                )}
              </div>
            </section>
          );
        })}
      </div>
      {viewer && createPortal(
        <GalleryLightbox items={viewer.items} start={viewer.start} label={viewer.label} onClosed={() => setViewer(null)} />,
        document.body,
      )}
    </div>
  );
}

// The services as Home's and every "What we do" page's ONE structure,
// rendered twice and one shown per width by CSS (.service-rows-wide /
// -phone, ServicePage.css; the hidden one is display: none, so its films
// never load and it is out of the a11y tree): desktop/tablet the zig-zag
// PillarRows — number, title, lead, body, chips, buttons, and as media the
// row's whole group (its `gallery`, or just its picture or film) in a
// MediaGallery filling the media column up to the text, no ring (pops up on
// hover, a click opens the viewer) — and phones the card stage
// (ServiceList).
//
// `start`: how many rows came before this list on the page (Home splits its
// five into two around the virtual-store band), so the numbers carry on —
// 03, 04, 05 — and the zig-zag keeps alternating (PillarRows starts every
// list text-first, so the first part must hold an EVEN number of rows).
export function ServiceRows({ services, media, titleAs = 'h2', start = 0 }) {
  const rows = services.map((s, i) => {
    const m = media[i] ?? media[0];
    return {
      key: s.id,
      num: String(start + i + 1).padStart(2, '0'),
      title: s.title,
      label: s.title,
      lead: s.lead,
      body: s.body,
      tags: s.tags,
      tagsLabel: s.tagsLabel,
      actions: s.actions,
      bare: true,
      fill: true,
      ring: false,
      media: () => <MediaGallery items={m.gallery || [m]} label={m.label} max={m.max} />,
    };
  });

  return (
    <>
      <div className="service-rows-wide">
        <PillarRows rows={rows} titleAs={titleAs} />
      </div>
      <div className="service-rows-phone">
        <ServiceList services={services} media={media} titleAs={titleAs} />
      </div>
    </>
  );
}

export default function ServicePage({ className = '', hero, services, media, film, intro, children }) {
  const { t } = useLanguage();

  return (
    <div className={`rows-page service-page ${className}`}>
      <header className="container page-hero service-hero">
        <span className="card-kicker">{hero.kicker}</span>
        <h1 className="page-title page-hero-title service-title">
          {/* The full line for screen readers and crawlers; the typed one is
              hidden from them. */}
          <span className="sr-only">{hero.names ? hero.title : `${hero.titleLead} ${hero.titleMark}`}</span>
          {/* `names` (Agency): the Home hero's rotating line instead of the
              typed one — titleLead stays, each name drops in below it. */}
          {hero.names ? (
            <span aria-hidden="true">
              {hero.titleLead} <RotatingName names={hero.names} />
            </span>
          ) : (
            <TypedTitle lead={hero.titleLead} mark={hero.titleMark} />
          )}
        </h1>
        <p className="page-hero-lede">{hero.lede}</p>
        {hero.tags && (
          <ul className="pillar-tags service-hero-tags">
            {hero.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        )}
        {hero.body?.map((para) => <p key={para} className="service-hero-body">{para}</p>)}
        {hero.motto && <p className="service-hero-motto">{hero.motto}</p>}
      </header>
      {film && (
        <figure className="service-film">
          {/* ONE film, whole in the middle, on a plain colour in the film's
              own tones with a warm glow around it (ServicePage.css). */}
          <div className="service-film-frame">
            {/* PARKED — the AMBIENT backdrop: the film again, blurred and
                scaled to fill the frame, so the sides take its own colours
                and movement. To bring it back, uncomment this and its
                .service-film-ambient rules in ServicePage.css.
            <div className="service-film-ambient" aria-hidden="true">
              <AutoplayVideo className="service-film-ambient-video" src={film.src} poster={film.poster} />
            </div>
            */}
            <AutoplayVideo className="service-film-video" src={film.src} poster={film.poster} label={film.label} />
            {/* PARKED — the expand badge (bottom end corner) that opened the
                film full-screen. To bring it back, uncomment this and the
                FilmLightbox import above.
            <FilmLightbox src={film.src} poster={film.poster} label={film.label} />
            */}
          </div>
        </figure>
      )}
      {intro}

      {services?.length > 0 && <ServiceRows services={services} media={media} />}
      {children}
      <FinalCta content={t.home.finalCta} href={waMessageLink(hero.waMessage)} />
    </div>
  );
}
