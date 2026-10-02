import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import { brands, brandsById } from '../../data/brands.js';
import { media } from '../../data/media.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { featuredBrands } from './data.js';
import './Brands.css';

const featuredIds = new Set(featuredBrands.map((f) => f.brandId));

/**
 * The partner brands. Each brand in `featuredBrands` (./data.js) gets a
 * section of its own — logo, intro, a link to its site and up to two product
 * cards — alternating sides down the page. Every other brand in data/brands.js
 * is listed underneath as a logo card linking out, the same card the page
 * used to be made of. Logos come from media.brands; until a logo file exists
 * the brand's name shows as a wordmark.
 */
export default function Brands() {
  const { t } = useLanguage();
  const b = t.brandsPage;
  const others = brands.filter((brand) => !featuredIds.has(brand.id));

  return (
    <div className="container brands-page">
      <header className="brands-hero">
        <span className="card-kicker">{b.kicker}</span>
        <h1 className="page-title brands-title">{b.title}</h1>
        <p className="brands-lede">{b.lede}</p>
      </header>

      <div className="brand-features">
        {featuredBrands.map(({ brandId, products }, i) => {
          const brand = brandsById[brandId];
          const copy = b.brands[brandId];
          return (
            <section key={brandId} className="brand-feature" aria-labelledby={`brand-${brandId}`}>
              <div className="brand-feature-intro">
                <span className="brand-feature-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                {/* The logo IS the heading: its alt text is the brand name. */}
                <h2 id={`brand-${brandId}`} className="brand-feature-name" style={brand.logoScale ? { '--logo-scale': brand.logoScale } : undefined}>
                  <ImagePlaceholder src={media.brands[brandId]} label={brand.name} ratio="3 / 1" className="brands-logo" />
                </h2>
                <p className="brand-feature-text">{copy.intro}</p>
                <a href={brand.url} className="btn btn-secondary">{b.visitSite(brand.name)}</a>
              </div>

              <ul className="brand-feature-products">
                {products.map((id) => {
                  const p = copy.products[id];
                  return (
                    <li key={id} className="brand-product">
                      <ImagePlaceholder src={media.brandProducts[id]} label={`${brand.name} ${p.name}`} ratio="4 / 5" className="brand-product-media" />
                      <div className="brand-product-body">
                        <h3 className="brand-product-name">{p.name}</h3>
                        <p className="brand-product-line">{p.line}</p>
                        <ul className="brand-product-facts">
                          {p.facts.map((fact) => <li key={fact}>{fact}</li>)}
                        </ul>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      {others.length > 0 && (
        <section className="brands-more" aria-labelledby="brands-more-title">
          <h2 id="brands-more-title" className="brands-more-title">{b.more}</h2>
          <ul className="brands-grid">
            {others.map((brand) => (
              <li key={brand.id}>
                <a
                  href={brand.url}
                  className="card elev-sm brands-card"
                  style={brand.logoScale ? { '--logo-scale': brand.logoScale } : undefined}
                  aria-label={`${b.visit} ${brand.name}`}
                >
                  <ImagePlaceholder src={media.brands[brand.id]} label={brand.name} ratio="3 / 1" className="brands-logo" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
