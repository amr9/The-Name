import ImageBand from '../../components/ImageBand/ImageBand.jsx';
import ServicePage, { servicePhotos, servicesFrom } from '../../components/ServicePage/ServicePage.jsx';
import { media } from '../../data/media.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { agencyHighlights, agencyServices } from './data.js';
import './Agency.css';

// The Highlighted Services' icons — line drawings after thenameagency.me's,
// redrawn in the site's colour (they take `currentColor`: the accent gold,
// Agency.css). Decorative: each group's title says what it is.
const AGENCY_ICONS = {
  media: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M6 4V2.5M10 4V2.5M14 4V2.5M18 4V2.5M12 16v4M8 20h8" />
    </>
  ),
  creative: <path d="M8 3.5h8M8 20.5h8M12 3.5v17M9.5 3.5c1.5 0 2.5 1 2.5 2.5M14.5 3.5C13 3.5 12 4.5 12 6M9.5 20.5c1.5 0 2.5-1 2.5-2.5M14.5 20.5c-1.5 0-2.5-1-2.5-2.5" />,
  digital: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  events: (
    <>
      <circle cx="12" cy="8" r="2.5" />
      <path d="M7.5 20v-3a4.5 4.5 0 0 1 9 0v3M4 4l1.5 1.5M20 4l-1.5 1.5M12 2v1M3 11h1.5M19.5 11H21" />
    </>
  ),
  branding: <path d="M7 4.5v15l12.5-7.5z" />,
  consulting: (
    <>
      <circle cx="6" cy="18.5" r="2" />
      <path d="M8 18.5h7a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6M16.5 2.5l2.5 2-2.5 2M3.5 3.5l3 3M6.5 3.5l-3 3" />
    </>
  ),
};

// "Highlighted services" — every service of The Name Agency on one view, as
// on thenameagency.me: a heading and lede, then six groups (agencyHighlights)
// three to a row, each its gold icon, title and bulleted items (i18n
// agency.highlights).
function HighlightedServices() {
  const { t } = useLanguage();
  const h = t.agency.highlights;
  return (
    <section className="container agency-highlights" aria-labelledby="agency-highlights-title">
      <h2 id="agency-highlights-title" className="agency-highlights-title">{h.title}</h2>
      <p className="agency-highlights-lede">{h.lede}</p>
      <ul className="agency-highlights-grid">
        {agencyHighlights.map(({ id }) => {
          const g = h.groups[id];
          return (
            <li key={id} className="agency-highlight">
              <h3 className="agency-highlight-title">
                <svg className="agency-highlight-icon" viewBox="0 0 24 24" aria-hidden="true">{AGENCY_ICONS[id]}</svg>
                {g.title}
              </h3>
              <ul className="agency-highlight-items">
                {g.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/**
 * The Agency page — the shared "What we do" layout (components/ServicePage):
 * the hero; under it the Haramain Brand Communication film band
 * (media.agencyPreview, ServicePage `film`, label agency.filmLabel); one
 * section per service in `agencyServices` (./data.js), titled by the Agency
 * chips on Home, its media a picture SET (media.servicePhotos.agency, plus
 * -2…-4); then a full-width picture separator (ImageBand: the SOBHA
 * stadium model, media.agencyBand, under a 90% → 60% wash) and the Highlighted
 * Services; then the closing call to action. Copy is i18n `agency`, adapted
 * from The Name Agency's Pitch presentation and thenameagency.me.
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
      // The Haramain film band under the hero: one landscape film, whole and
      // centred at most 960×540 (rounded, a gold glow around it) on a
      // full-width band of a plain colour in its tones, 540px tall at most.
      film={{ ...media.agencyPreview, label: a.filmLabel }}
    >
      {/* the SOBHA separator, its wash lighter at the foot than Home's, the
          photo set a little further back (1.4× the band's height rather than
          covering its width; its black ground meets the band's dark sides) */}
      <ImageBand src={media.agencyBand} wash={[90, 60]} size="auto 140%" />
      <HighlightedServices />
    </ServicePage>
  );
}
