import { Link } from 'react-router-dom';
import Arrow from '../../components/Arrow.jsx';
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
 * chips on Home, on ONE pinned stage (hooks/useScrollStage, at every width):
 * the section stays put under the navbar while the scroll swaps one service's
 * text for the next — the title on one side, its lead, body and an
 * underlined "Let's talk" link to the enquiry form on the other. Dots on the
 * stage's edge jump to a service. Copy is i18n `agency`.
 */
export default function Agency() {
  const { t } = useLanguage();
  const a = t.agency;
  const stage = useScrollStage(agencyServices.length, { rowSelector: '.agency-service' });

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
          <div className="container agency-dots">
            {agencyServices.map(({ id }, i) => (
              <button
                key={id}
                type="button"
                className={`agency-dot${i === stage.active ? ' is-active' : ''}`}
                aria-label={a.services[id].title}
                aria-current={i === stage.active ? 'true' : undefined}
                onClick={() => stage.goTo(i)}
              />
            ))}
          </div>
          {agencyServices.map(({ id }, i) => {
            const s = a.services[id];
            return (
              <section
                key={id}
                id={id}
                className="agency-service"
                aria-labelledby={`agency-${id}`}
                // Service 01 showing, for the pre-rendered HTML; useScrollStage
                // takes over from here.
                style={{ '--d': Math.sign(i), '--ot': i ? 0 : 1, '--vis': i ? 'hidden' : 'visible' }}
                // A hidden service's link must not take keyboard focus.
                inert={i !== stage.active ? '' : undefined}
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
