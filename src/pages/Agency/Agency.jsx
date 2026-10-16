import { Link } from 'react-router-dom';
import Arrow from '../../components/Arrow.jsx';
import AutoplayVideo from '../../components/AutoplayVideo.jsx';
import { STAGE_QUERY } from '../../components/PillarRows/PillarRows.jsx';
import { media } from '../../data/media.js';
import { contactLink } from '../../data/site.js';
import useScrollStage from '../../hooks/useScrollStage.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { agencyServices } from './data.js';
import './Agency.css';

/**
 * The Agency page, "Editorial" direction: the shared page hero
 * (.rows-page / .page-hero in theme.css) with a larger title whose last
 * words are in .gold-leaf (the Home hero name's gradient). Then the services
 * in `agencyServices` (./data.js), the same six titles as the Agency row's
 * chips on Home: full-width rows between hairlines, the title on one side,
 * its lead, body and an underlined "Let's talk" link to the enquiry form on
 * the other. On desktop/tablet ONE film (media.agencyOutdoor, 16:9) sits beside
 * them, pinned under the navbar and playing on while the services scroll
 * past it. On PHONES they become the same pinned stage as Home's "What we
 * do" (hooks/useScrollStage with PillarRows' STAGE_QUERY): the section stays
 * put under the navbar while the scroll swaps one service's text for the
 * next, with the shared progress dots — and the same film fills the stage
 * BEHIND the copy (cropped to its centre), under the shared white wash, like
 * Home's backdrop stage. Copy is i18n `agency`.
 */
export default function Agency() {
  const { t } = useLanguage();
  const a = t.agency;
  const stage = useScrollStage(agencyServices.length, {
    query: STAGE_QUERY,
    rowSelector: '.agency-service',
    bandSelector: '.agency-service .agency-service-inner',
  });

  return (
    <div className="rows-page agency-page">
      <header className="container page-hero agency-hero">
        <span className="card-kicker">{a.kicker}</span>
        <h1 className="page-title page-hero-title agency-title">
          {a.titleLead} <span className="gold-leaf agency-title-mark">{a.titleMark}</span>
        </h1>
        <p className="page-hero-lede">{a.lede}</p>
      </header>

      <div
        className="agency-services"
        ref={stage.trackRef}
        style={{ '--stage-count': agencyServices.length }}
      >
        <div className="agency-stage" ref={stage.stageRef}>
          <div className="stage-dots">
            {agencyServices.map(({ id }, i) => (
              <button
                key={id}
                type="button"
                className={`stage-dot${i === stage.active ? ' is-active' : ''}`}
                aria-label={a.services[id].title}
                aria-current={i === stage.active ? 'true' : undefined}
                onClick={() => stage.goTo(i)}
              />
            ))}
          </div>
          {/* One film for every service: pinned beside them on desktop/tablet,
              the stage's backdrop on phones (Agency.css). */}
          <div className="stage-wash wash-to-bg" aria-hidden="true" />
          <figure className="agency-film">
            <AutoplayVideo
              className="agency-film-video"
              {...media.agencyOutdoor}
              ratio="16 / 9"
              label={a.filmLabel}
            />
          </figure>
          {agencyServices.map(({ id }, i) => {
            const s = a.services[id];
            return (
              <section
                key={id}
                id={id}
                className="agency-service"
                aria-labelledby={`agency-${id}`}
                // The phone stage's starting state (service 01 shown), for the
                // pre-rendered HTML; useScrollStage takes over from here. Read
                // only by the stage CSS.
                style={{ '--d': Math.sign(i), '--ot': i ? 0 : 1, '--vis': i ? 'hidden' : 'visible' }}
                // A service hidden on the stage must not take keyboard focus.
                inert={stage.isStage && i !== stage.active ? '' : undefined}
              >
                <div className="container agency-service-inner">
                  <h2 id={`agency-${id}`} className="agency-service-title">{s.title}</h2>
                  <div className="agency-service-text">
                    <p className="agency-service-lead">{s.lead}</p>
                    <p className="agency-service-body">{s.body}</p>
                    <Link to={contactLink} className="agency-service-link">
                      {a.rowCta} <Arrow />
                    </Link>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
