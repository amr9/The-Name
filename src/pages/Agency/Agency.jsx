import { Link } from 'react-router-dom';
import Arrow from '../../components/Arrow.jsx';
import FinalCta from '../../components/FinalCta.jsx';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import PillarRows, { ROW_RATIO } from '../../components/PillarRows/PillarRows.jsx';
import { media } from '../../data/media.js';
import { contactLink } from '../../data/site.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { agencyServices } from './data.js';
import './Agency.css';

/**
 * The Agency page, built like Brands: the shared hero (.page-hero), then one
 * PillarRows row per service in `agencyServices` (./data.js) — the same
 * six titles as the Agency row's chips on Home — and the shared closing
 * call to action. Every button opens the enquiry form at the foot of /about.
 * Copy is i18n `agency`.
 */
export default function Agency() {
  const { t } = useLanguage();
  const a = t.agency;

  const rows = agencyServices.map(({ id }) => {
    const s = a.services[id];
    return {
      key: id,
      title: s.title,
      label: s.title,
      lead: s.lead,
      body: s.body,
      tags: s.tags,
      actions: (
        <Link to={contactLink} className="btn btn-primary">
          {a.rowCta} <Arrow />
        </Link>
      ),
      media: () => <ImagePlaceholder src={media.agencyServices[id]} label={s.title} ratio={ROW_RATIO} />,
    };
  });

  return (
    <div className="rows-page agency-page">
      <header className="container page-hero">
        <span className="card-kicker">{a.kicker}</span>
        <h1 className="page-title page-hero-title">{a.title}</h1>
        <p className="page-hero-lede">{a.lede}</p>
      </header>

      <PillarRows rows={rows} titleAs="h2" />

      <FinalCta content={a.finalCta} to={contactLink} />
    </div>
  );
}
