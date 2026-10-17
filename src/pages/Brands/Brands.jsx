import { Link } from 'react-router-dom';
import Arrow from '../../components/Arrow.jsx';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import PillarRows, { ROW_RATIO } from '../../components/PillarRows/PillarRows.jsx';
import { brandLink, brands, brandsById } from '../../data/brands.js';
import { media } from '../../data/media.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { PENDING_SLOTS, brandCatalogues, brandCategories, featuredBrands } from './data.js';
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
// A brand's catalogue: its FIRST entry in `brandCatalogues` (Hugo Boss has
// four; the 2026 one comes first). Brands without one are absent.
const catalogueByBrand = {};
brandCatalogues.forEach((c) => {
  if (c.brandId && !catalogueByBrand[c.brandId]) catalogueByBrand[c.brandId] = c;
});

// PARKED for UI testing — not rendered; the catalogues now live in the
// category sections (the brand chips link to them, the covers are the
// media). To bring it back, pass <BrandCatalogues /> to ServicePage below.
// The catalogue covers (./data.js `brandCatalogues`): each cover opens its
// catalogue on the viewer vertex.ae/catalogues links it to, in a new tab.
function BrandCatalogues() {
  const { t } = useLanguage();
  const c = t.brandsPage.catalogues;
  return (
    <section className="container brand-catalogues" aria-labelledby="brand-catalogues-title">
      <span className="card-kicker">{c.kicker}</span>
      <h2 id="brand-catalogues-title" className="brand-catalogues-title">{c.title}</h2>
      <p className="brand-catalogues-lede">{c.lede}</p>
      <ul className="brand-catalogues-grid">
        {brandCatalogues.map(({ id, brandId, url }) => {
          const line = c.items[id];
          const name = brandId ? brandsById[brandId].name : line;
          return (
            <li key={id}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="brand-catalogue"
                aria-label={c.open(brandId ? `${name}, ${line}` : name)}
              >
                <ImagePlaceholder src={media.brandCatalogues[id]} label={name} ratio="3 / 4" className="brand-catalogue-cover" />
                <span className="brand-catalogue-name">{name}</span>
                {brandId && <span className="brand-catalogue-line">{line}</span>}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/**
 * The Brands page — the shared "What we do" layout (components/ServicePage):
 * the hero, then one section per category in `brandCategories` (./data.js),
 * titled by the Brands chips on Home, each listing its brands as chips — a
 * brand with a catalogue is a chip linking to it (new tab). The brands have
 * no films, so the media is ONE catalogue cover per category, which changes
 * with the category in view. Copy is i18n `brandsPage`.
 */
export default function Brands() {
  const { t } = useLanguage();
  const b = t.brandsPage;
  const tags = t.home.pillars.brands.tags;

  const services = servicesFrom(brandCategories, tags, b.categories).map((s, i) => ({
    ...s,
    extra: (
      <ul className="pillar-tags service-brands" aria-label={b.categoryBrands}>
        {brandCategories[i].brands.map((id) => {
          const { name } = brandsById[id];
          const catalogue = catalogueByBrand[id];
          return (
            <li key={id}>
              {catalogue ? (
                <a
                  href={catalogue.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={b.catalogues.open(name)}
                >
                  {name}
                </a>
              ) : name}
            </li>
          );
        })}
      </ul>
    ),
  }));

  return (
    <ServicePage
      className="brands-page"
      hero={b}
      services={services}
      media={brandCategories.map((c, i) => ({ src: media.brandCatalogues[c.image], label: tags[i] }))}
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
