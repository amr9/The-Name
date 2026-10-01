import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import { brands } from '../../data/brands.js';
import { media } from '../../data/media.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './Brands.css';

/**
 * The partner brands, as a grid of logos — each card links out to the
 * brand's own site. The list and the logo files are the same ones the (parked)
 * Home logo strip reads: data/brands.js and media.brands, so adding a brand
 * there adds it here. Until a logo file exists the card shows the name.
 */
export default function Brands() {
  const { t } = useLanguage();
  const b = t.brandsPage;

  return (
    <div className="container brands-page">
      <header className="brands-hero">
        <span className="card-kicker">{b.kicker}</span>
        <h1 className="page-title brands-title">{b.title}</h1>
        <p className="brands-lede">{b.lede}</p>
      </header>

      <ul className="brands-grid">
        {brands.map((brand) => (
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
    </div>
  );
}
