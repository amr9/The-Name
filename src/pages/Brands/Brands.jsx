import { Link } from 'react-router-dom';
import Arrow from '../../components/Arrow.jsx';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import PillarRows, { ROW_RATIO } from '../../components/PillarRows/PillarRows.jsx';
import { brandLink, brands, brandsById } from '../../data/brands.js';
import { media } from '../../data/media.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { PENDING_SLOTS, brandCategories, featuredBrands } from './data.js';
import './Brands.css';
import ServicePage, { servicesFrom } from '../../components/ServicePage/ServicePage.jsx';

const featuredIds = new Set(featuredBrands.map((f) => f.brandId));

// A brand's link (data/brands.js brandLink): a full URL is a plain <a>, an
// in-app path a router Link — so it keeps the /ar prefix in Arabic.
function BrandLink({ brand, ...props }) {
  const to = brandLink(brand);
  return /^https?:/.test(to) ? <a href={to} {...props} /> : <Link to={to} {...props} />;
}

// One product card. A real product passes its photo and facts; a "coming
// soon" slot passes no `src`, so ImagePlaceholder shows its dashed frame.
function BrandProduct({ src, label, name, line, facts = [], pending = false }) {
  return (
    <li className={`brand-product${pending ? ' is-pending' : ''}`}>
      <ImagePlaceholder src={src} label={label} ratio={ROW_RATIO} className="brand-product-media" />
      <div className="brand-product-body">
        <h3 className="brand-product-name">{name}</h3>
        <p className="brand-product-line">{line}</p>
        {facts.length > 0 && (
          <ul className="brand-product-facts">
            {facts.map((fact) => <li key={fact}>{fact}</li>)}
          </ul>
        )}
      </div>
    </li>
  );
}

/**
 * The partner brands, laid out exactly like Home's "What we do": every brand
 * in `featuredBrands` (./data.js) is a PillarRows row — number, name, intro,
 * its products' names as chips and a "Visit" button, beside its two product
 * cards (the row's media), alternating sides; on phones the same pinned
 * scroll stage, with a "04 / 19" counter. The brand's logo, when there is a
 * file for it (media.brands), sits beside the number. A featured brand
 * without `products` is still waiting for its content: the shared "coming
 * soon" intro (brandsPage.pending) and PENDING_SLOTS dashed cards. Every
 * other brand in data/brands.js is listed underneath as a logo card.
 */
/**
 * The Brands page — the shared "What we do" layout (components/ServicePage):
 * the hero, then one section per category in `brandCategories` (./data.js),
 * titled by the Brands chips on Home, each listing its brands as chips. The
 * brands have no films, so the media is ONE product photo per category,
 * which changes with the category in view. Copy is i18n `brandsPage`.
 */
export default function Brands() {
  const { t } = useLanguage();
  const b = t.brandsPage;
  const tags = t.home.pillars.brands.tags;

  const services = servicesFrom(brandCategories, tags, b.categories).map((s, i) => ({
    ...s,
    extra: (
      <ul className="pillar-tags service-brands" aria-label={b.categoryBrands}>
        {brandCategories[i].brands.map((id) => <li key={id}>{brandsById[id].name}</li>)}
      </ul>
    ),
  }));

  return (
    <ServicePage
      className="brands-page"
      hero={b}
      services={services}
      media={brandCategories.map((c, i) => ({ src: media.brandProducts[c.image], label: tags[i] }))}
      ratio={ROW_RATIO}
    />
  );
}

// PARKED: the page before the "What we do" redesign — every featured brand as
// a PillarRows row with its two product cards, the rest as logo cards — kept
// intact but not rendered. Its copy (i18n brandsPage.*), CSS (Brands.css)
// and data (featuredBrands, PENDING_SLOTS) are kept too. To bring it back,
// render it from Brands() above.
function ParkedBrands() {
  const { t } = useLanguage();
  const b = t.brandsPage;
  const others = brands.filter((brand) => !featuredIds.has(brand.id));

  const rows = featuredBrands.map(({ brandId, products }) => {
    const brand = brandsById[brandId];
    const copy = b.brands[brandId];
    const pending = !products;
    const cards = pending
      ? Array.from({ length: PENDING_SLOTS }, (_, n) => (
          <BrandProduct key={n} label={b.pending.product} name={b.pending.product} line={b.pending.line} pending />
        ))
      : products.map((id) => {
          const p = copy.products[id];
          return (
            <BrandProduct
              key={id}
              src={media.brandProducts[id]}
              label={`${brand.name} ${p.name}`}
              name={p.name}
              line={p.line}
              facts={p.facts}
            />
          );
        });
    return {
      key: brandId,
      title: brand.name,
      label: brand.name,
      // Decorative: the heading already names the brand. A logo listed in
      // media.brands whose file is missing renders as nothing (empty alt).
      mark: media.brands[brandId] && (
        <img
          className="brand-row-mark"
          src={media.brands[brandId]}
          alt=""
          aria-hidden="true"
          loading="lazy"
          style={brand.logoScale ? { '--logo-scale': brand.logoScale } : undefined}
        />
      ),
      lead: pending ? b.pending.intro(brand.name) : copy.intro,
      tags: pending ? [] : products.map((id) => copy.products[id].name),
      actions: (
        <BrandLink brand={brand} className="btn btn-primary">
          {b.visitSite(brand.name)} <Arrow />
        </BrandLink>
      ),
      bare: true,
      wide: true,
      media: () => <ul className="brand-row-products">{cards}</ul>,
    };
  });

  return (
    <div className="rows-page brands-page">
      <header className="container page-hero">
        <span className="card-kicker">{b.kicker}</span>
        <h1 className="page-title page-hero-title">{b.title}</h1>
        <p className="page-hero-lede">{b.lede}</p>
      </header>

      <PillarRows rows={rows} titleAs="h2" />

      {others.length > 0 && (
        <section className="container brands-more" aria-labelledby="brands-more-title">
          <h2 id="brands-more-title" className="brands-more-title">{b.more}</h2>
          <ul className="brands-grid">
            {others.map((brand) => (
              <li key={brand.id}>
                <BrandLink
                  brand={brand}
                  className="card elev-sm brands-card"
                  style={brand.logoScale ? { '--logo-scale': brand.logoScale } : undefined}
                  aria-label={`${b.visit} ${brand.name}`}
                >
                  <ImagePlaceholder src={media.brands[brand.id]} label={brand.name} ratio="3 / 1" className="brands-logo" />
                </BrandLink>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
