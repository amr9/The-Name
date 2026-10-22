import ImagePlaceholder from '../ImagePlaceholder.jsx';
import './LogoMarquee.css';

// The fewest logos one pass of the strip should hold, so a short list still
// spans a wide screen before the loop repeats it.
const MIN_PER_ROW = 8;

// How many rows a `still` strip lays its logos out in on wide screens.
const STILL_ROWS = 2;

// One logo, linking out in a new tab. `hidden`: the rolling strip's second,
// decorative copy — kept out of the tab order.
function LogoLink({ item, logos, hidden = false }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="logo-marquee-link"
      aria-label={item.label}
      style={item.logoScale ? { '--logo-scale': item.logoScale } : undefined}
      tabIndex={hidden ? -1 : undefined}
    >
      <ImagePlaceholder src={logos[item.id]} label={item.name} ratio="3 / 1" className="logo-marquee-logo" />
    </a>
  );
}

/**
 * A slow, continuously rolling strip of logos, each linking out to its owner
 * in a new tab. Used for the partner brands on the Brands page (under the
 * hero, `still`; once on Home, and the delivery partners on Cafe, both
 * parked). `items` are `{ id, name, url, label?, logoScale? }`;
 * `label` is the link's accessible name (default: the logo's, i.e. `name`).
 * `logos` maps id → image path (usually a section of data/media.js).
 * `logoScale` enlarges that one logo's slot, for tall or stacked marks that
 * would otherwise look small beside long wordmarks. Until a logo file exists,
 * the name is shown as a wordmark. `reverse` rolls the strip the other way.
 * `still` does not roll at all: every logo once, in STILL_ROWS centred rows
 * (more on narrow screens).
 */
export default function LogoMarquee({ heading, items, logos, reverse = false, still = false }) {
  const strip = Array.from({ length: Math.ceil(MIN_PER_ROW / items.length) }, () => items).flat();

  return (
    <section className={`logo-marquee${reverse ? ' is-reverse' : ''}${still ? ' is-still' : ''}`}>
      {heading && <h2 className="container logo-marquee-heading">{heading}</h2>}

      {still ? (
        <ul className="container logo-marquee-grid" style={{ '--logo-cols': Math.ceil(items.length / STILL_ROWS) }}>
          {items.map((item) => (
            <li key={item.id} className="logo-marquee-item">
              <LogoLink item={item} logos={logos} />
            </li>
          ))}
        </ul>
      ) : (
        /* the list is rendered twice back to back so the -50% translation
           lands exactly on the start of the copy — a seamless loop */
        <div className="logo-marquee-viewport">
          <div className="logo-marquee-track">
            {[0, 1].map((copy) => (
              <ul key={copy} className="logo-marquee-row" aria-hidden={copy === 1}>
                {strip.map((item, i) => (
                  <li key={`${item.id}-${i}`} className="logo-marquee-item">
                    <LogoLink item={item} logos={logos} hidden={copy === 1} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
