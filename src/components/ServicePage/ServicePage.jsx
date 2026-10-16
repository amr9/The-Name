import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow.jsx';
import AutoplayVideo from '../AutoplayVideo.jsx';
import ImagePlaceholder from '../ImagePlaceholder.jsx';
import { STAGE_QUERY } from '../PillarRows/PillarRows.jsx';
import { contactLink } from '../../data/site.js';
import useScrollStage from '../../hooks/useScrollStage.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './ServicePage.css';

/**
 * The pillar pages of the navbar's "What we do" (Corporate Gifts, Brands,
 * Agency, Events, F&B & Concept Store) — ONE layout, the "Editorial" design first built for the
 * Agency page.
 *
 * HERO: the shared .rows-page / .page-hero (theme.css) — kicker, a large
 * title whose last words are in .gold-leaf (the Home hero name's gradient),
 * the lede.
 *
 * SERVICES: one section per entry in `services`, their titles the pillar's
 * chips on Home (i18n home.pillars[id].tags — the pages pass them in, so a
 * service is named in one place). Each is the uppercase title beside its
 * bold lead, grey body, optional `extra` (Brands: the category's brands) and
 * a quiet "Let's talk →" text link to the enquiry form (i18n
 * servicePage.rowCta, `contactLink`).
 *  - Desktop/tablet: full-width rows between hairlines, the MEDIA pinned
 *    beside them (sticky over every row's span) while they scroll past.
 *  - Phones (PillarRows' STAGE_QUERY): the same pinned scroll stage as Home's
 *    "What we do" (hooks/useScrollStage), the media as its BACKDROP under
 *    the shared .stage-wash, the copy on top, the shared .stage-dots.
 *
 * MEDIA: `media` is a list. ONE entry is shared by every service (a film,
 * playing on while the copy changes — Agency, Corporate Gifts, Events); one
 * entry PER service (Brands: a picture per category) follows the service in
 * view — the active stage row on phones, the row across the middle of the
 * screen on desktop — cross-fading between them. An entry is
 * { src, poster? (a film), video?: true, label }. `ratio` is the media's
 * shape on desktop; `wide` gives a 16:9 film a wider column.
 *
 * `hero`: { kicker, titleLead, titleMark, lede }
 * `services`: [{ id, title, lead, body, extra? }] — see servicesFrom below
 */

// A page's services from its data.js list, its Home chips and its copy: the
// i-th service is titled by the i-th chip (home.pillars[pillar].tags), so a
// service is named in ONE place and the list must follow the chips' order.
// `copy` is the page's i18n { [id]: { lead, body } }.
export const servicesFrom = (list, tags, copy) =>
  list.map(({ id }, i) => ({ id, title: tags[i], ...copy[id] }));

export default function ServicePage({ className = '', hero, services, media, ratio, wide = false }) {
  const { t } = useLanguage();
  const stage = useScrollStage(services.length, {
    query: STAGE_QUERY,
    rowSelector: '.service-row',
    bandSelector: '.service-row .service-row-inner',
  });

  // Desktop: which service is across the middle of the screen, for media
  // that changes per service. A band 10% tall at mid-screen; the row in it
  // is the one being read. (On phones the stage's own `active` decides.)
  const [inView, setInView] = useState(0);
  useEffect(() => {
    if (media.length < 2 || stage.isStage || !('IntersectionObserver' in window)) return undefined;
    const rows = [...stage.stageRef.current.querySelectorAll(':scope > .service-row')];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setInView(rows.indexOf(e.target));
      }),
      { rootMargin: '-45% 0px -45% 0px' },
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, [media.length, stage.isStage, stage.stageRef]);

  const shown = media.length < 2 ? 0 : stage.isStage ? stage.active : inView;

  return (
    <div className={`rows-page service-page ${className}`}>
      <header className="container page-hero service-hero">
        <span className="card-kicker">{hero.kicker}</span>
        <h1 className="page-title page-hero-title service-title">
          {hero.titleLead} <span className="gold-leaf service-title-mark">{hero.titleMark}</span>
        </h1>
        <p className="page-hero-lede">{hero.lede}</p>
      </header>

      <div
        className={`service-list${wide ? ' service-list-wide' : ''}`}
        ref={stage.trackRef}
        style={{ '--stage-count': services.length, '--media-ratio': ratio }}
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
          {/* Pinned beside the rows on desktop/tablet, the stage's backdrop on
              phones (ServicePage.css). Every entry is stacked here and the
              shown one fades in. */}
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
                  <Link to={contactLink} className="service-row-link">
                    {t.servicePage.rowCta} <Arrow />
                  </Link>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
