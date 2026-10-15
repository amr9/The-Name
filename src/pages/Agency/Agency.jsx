import { Link } from 'react-router-dom';
import Arrow from '../../components/Arrow.jsx';
import { contactLink } from '../../data/site.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { agencyServices } from './data.js';
import './Agency.css';

/**
 * The Agency page: the shared page hero (.rows-page / .page-hero in
 * theme.css), then one text section per service in `agencyServices`
 * (./data.js), the same six titles as the Agency row's chips on Home. Each
 * is a title beside its lead, body and a button to the enquiry form at the
 * foot of /about. The type is PillarRows' own (.pillar-title/-lead/-body,
 * loaded site-wide), so a service reads like a Home or Brands row without
 * its number, chips or picture. Copy is i18n `agency`.
 */
export default function Agency() {
  const { t } = useLanguage();
  const a = t.agency;

  return (
    <div className="rows-page agency-page">
      <header className="container page-hero">
        <span className="card-kicker">{a.kicker}</span>
        <h1 className="page-title page-hero-title">{a.title}</h1>
        <p className="page-hero-lede">{a.lede}</p>
      </header>

      <div className="container agency-services">
        {agencyServices.map(({ id }) => {
          const s = a.services[id];
          return (
            <section key={id} className="agency-service" aria-labelledby={`agency-${id}`}>
              <h2 id={`agency-${id}`} className="pillar-title agency-service-title">{s.title}</h2>
              <div className="agency-service-text">
                <p className="pillar-lead">{s.lead}</p>
                <p className="pillar-body">{s.body}</p>
                <Link to={contactLink} className="btn btn-primary">
                  {a.rowCta} <Arrow />
                </Link>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
