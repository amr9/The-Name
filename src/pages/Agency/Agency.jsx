import ServicePage, { servicePhotos, servicesFrom } from '../../components/ServicePage/ServicePage.jsx';
import { media } from '../../data/media.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { agencyServices } from './data.js';

/**
 * The Agency page — the shared "What we do" layout (components/ServicePage):
 * the hero, then one section per service in `agencyServices` (./data.js),
 * titled by the Agency chips on Home. The media is a picture SET per service
 * (media.servicePhotos.agency, plus -2…-4: ServicePage slices) — it
 * replaced the Outdoor Media film (media.agencyOutdoor). Copy is i18n
 * `agency`, adapted from The Name Agency's Pitch presentation.
 */
export default function Agency() {
  const { t } = useLanguage();
  const a = t.agency;
  const services = servicesFrom(agencyServices, t.home.pillars.agency.tags, a.services);

  return (
    <ServicePage
      className="agency-page"
      hero={a}
      services={services}
      media={servicePhotos(services, media.servicePhotos.agency)}
    />
  );
}
