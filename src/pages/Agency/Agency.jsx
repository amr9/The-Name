import { Link } from 'react-router-dom';
import Arrow from '../../components/Arrow.jsx';
import { contactLink } from '../../data/site.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { agencyServices } from './data.js';
import './Agency.css';

/**
 * The Agency page, "Editorial" direction: the shared page hero
 * (.rows-page / .page-hero in theme.css) with a larger title whose last
 * words are in .gold-leaf (the Home hero name's gradient), with an "On this
 * page" index of the services on the right. Then one full-width row per service in `agencyServices`
 * (./data.js), the same six titles as the Agency row's chips on Home: the
 * title on one side, its lead, body and an underlined "Let's talk" link to
 * the enquiry form on the other, between hairlines. The index links are
 * router Links to `#<id>`, so hooks/useScrollToTop scrolls to the row
 * (each row is a .scroll-anchor, clearing the sticky navbar) and the /ar
 * prefix is kept. Copy is i18n `agency`.
 */
export default function Agency() {
  const { t } = useLanguage();
  const a = t.agency;

  return (
    <div className="rows-page agency-page">
      <header className="container page-hero agency-hero">
        <div className="agency-hero-text">
          <span className="card-kicker">{a.kicker}</span>
          <h1 className="page-title page-hero-title agency-title">
            {a.titleLead} <span className="gold-leaf agency-title-mark">{a.titleMark}</span>
          </h1>
          <p className="page-hero-lede">{a.lede}</p>
        </div>
        <nav className="agency-index" aria-labelledby="agency-index-title">
          <p id="agency-index-title" className="agency-index-title">{a.onThisPage}</p>
          <ul className="agency-index-list">
            {agencyServices.map(({ id }) => (
              <li key={id}>
                <Link to={`#${id}`} className="agency-index-link">{a.services[id].title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="agency-services">
        {agencyServices.map(({ id }) => {
          const s = a.services[id];
          return (
            <section key={id} id={id} className="scroll-anchor agency-service" aria-labelledby={`agency-${id}`}>
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
  );
}
