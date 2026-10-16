import ServicePage, { servicesFrom } from '../../components/ServicePage/ServicePage.jsx';
import { ROW_RATIO } from '../../components/PillarRows/PillarRows.jsx';
import { media } from '../../data/media.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { fnbServices } from './data.js';

/**
 * The F&B & Concept Store page (/fnb) — the shared "What we do" layout
 * (components/ServicePage): the hero, then one section per service in
 * `fnbServices` (./data.js), titled by the F&B chips on Home. There is no
 * F&B film yet, so the media is the F&B picture from Home's row
 * (media.services.fnb) — the dashed placeholder until that file exists. To
 * give the page a film, add one under media.serviceVideos.fnb and pass it
 * here with `video: true`, as Events does. Copy is i18n `fnbPage`.
 */
export default function Fnb() {
  const { t } = useLanguage();
  const f = t.fnbPage;

  return (
    <ServicePage
      className="fnb-page"
      hero={f}
      services={servicesFrom(fnbServices, t.home.pillars.fnb.tags, f.services)}
      media={[{ src: media.services.fnb, label: f.mediaLabel }]}
      ratio={ROW_RATIO}
    />
  );
}
