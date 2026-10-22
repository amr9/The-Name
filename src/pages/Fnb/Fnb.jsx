import ServicePage, { servicePhotos, servicesFrom } from '../../components/ServicePage/ServicePage.jsx';
import { media } from '../../data/media.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { fnbServices } from './data.js';

/**
 * The F&B & Concept Store page (/fnb-and-concept-store) — the shared "What we do" layout
 * (components/ServicePage): the hero, then one section per service in
 * `fnbServices` (./data.js), titled by the F&B chips on Home. The media is
 * a picture SET per service (media.servicePhotos.fnb, plus -2…-4: the
 * ServicePage slices) — the dashed placeholder until each file exists. Under
 * the hero's lede, the same chips as pills. Copy is i18n `fnbPage`.
 */
export default function Fnb() {
  const { t } = useLanguage();
  const f = t.fnbPage;
  const pillar = t.home.pillars.fnb;
  const services = servicesFrom(fnbServices, pillar.tags, f.services);

  return (
    <ServicePage
      className="fnb-page"
      // Home's F&B paragraph as the lede, its chips as pills under it
      hero={{ ...f, lede: pillar.lead, tags: pillar.tags }}
      services={services}
      media={servicePhotos(services, media.servicePhotos.fnb)}
    />
  );
}
