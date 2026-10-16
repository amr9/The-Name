import ServicePage, { servicesFrom } from '../../components/ServicePage/ServicePage.jsx';
import { media } from '../../data/media.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { agencyServices } from './data.js';

/**
 * The Agency page — the shared "What we do" layout (components/ServicePage):
 * the hero, then one section per service in `agencyServices` (./data.js),
 * titled by the Agency chips on Home. Its film is the 16:9 Outdoor Media
 * reel (media.agencyOutdoor), in the wider column on desktop. Copy is i18n
 * `agency`, adapted from The Name Agency's Pitch presentation.
 */
export default function Agency() {
  const { t } = useLanguage();
  const a = t.agency;

  return (
    <ServicePage
      className="agency-page"
      hero={a}
      services={servicesFrom(agencyServices, t.home.pillars.agency.tags, a.services)}
      media={[{ ...media.agencyOutdoor, video: true, label: a.filmLabel }]}
      ratio="16 / 9"
      wide
    />
  );
}
