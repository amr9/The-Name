import ServicePage, { servicePhotos, servicesFrom } from '../../components/ServicePage/ServicePage.jsx';
import { ROW_RATIO } from '../../components/PillarRows/PillarRows.jsx';
import { media } from '../../data/media.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { fnbServices } from './data.js';

/**
 * The F&B & Concept Store page (/fnb) — the shared "What we do" layout
 * (components/ServicePage): the hero, then one section per service in
 * `fnbServices` (./data.js), titled by the F&B chips on Home. The media is
 * ONE picture per service (media.servicePhotos.fnb), which changes with the
 * service in view — the dashed placeholder until each file exists. Copy is
 * i18n `fnbPage`.
 */
export default function Fnb() {
  const { t } = useLanguage();
  const f = t.fnbPage;
  const services = servicesFrom(fnbServices, t.home.pillars.fnb.tags, f.services);

  return (
    <ServicePage
      className="fnb-page"
      hero={f}
      services={services}
      media={servicePhotos(services, media.servicePhotos.fnb)}
      ratio={ROW_RATIO}
    />
  );
}
