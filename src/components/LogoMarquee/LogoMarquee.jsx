import ImagePlaceholder from '../ImagePlaceholder.jsx';
import './LogoMarquee.css';

// The fewest logos one pass of the strip should hold, so a short list still
// spans a wide screen before the loop repeats it.
const MIN_PER_ROW = 8;

/**
 * A slow, continuously rolling strip of logos, each linking out to its owner.
 * Used for the partner brands on Home and the delivery partners on Cafe.
 * `items` are `{ id, name, url }`; `logos` maps id → image path (usually a
 * section of data/media.js). Until a logo file exists, the name is shown as a
 * wordmark in its place.
 */
export default function LogoMarquee({ heading, items, logos }) {
  const strip = Array.from({ length: Math.ceil(MIN_PER_ROW / items.length) }, () => items).flat();

  return (
    <section className="logo-marquee">
      {heading && <h2 className="container logo-marquee-heading">{heading}</h2>}

      {/* the list is rendered twice back to back so the -50% translation
          lands exactly on the start of the copy — a seamless loop */}
      <div className="logo-marquee-viewport">
        <div className="logo-marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="logo-marquee-row" aria-hidden={copy === 1}>
              {strip.map((item, i) => (
                <li key={`${item.id}-${i}`} className="logo-marquee-item">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="logo-marquee-link"
                    tabIndex={copy === 1 ? -1 : undefined}
                  >
                    <ImagePlaceholder src={logos[item.id]} label={item.name} ratio="3 / 1" className="logo-marquee-logo" />
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
