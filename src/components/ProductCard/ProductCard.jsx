import ImagePlaceholder from '../ImagePlaceholder.jsx';
import { productBadge } from '../../data/storeBadges.js';
import { productUrl, storeImage } from '../../data/storeProducts.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './ProductCard.css';

/**
 * One product from the store catalogue, as a card.
 *
 * Shared by the Shop page's grid and the Customize Yours page, which is the
 * whole reason it is a component: both show the same object and must not
 * drift apart. The grid they sit in is `.product-grid`, in this folder's CSS.
 *
 * The whole card is ONE <a> and the button is a <span> dressed as one — a
 * <button> or a second <a> inside a link is invalid, and three links to the
 * same product is noise for a screen reader.
 */
export default function ProductCard({ product }) {
  const { t } = useLanguage();
  const badge = productBadge(product);

  return (
    <a
      className="product-card"
      href={productUrl(product)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.shop.personaliseItem(product.name)}
    >
      {/* An optional corner ribbon — data/storeBadges.js decides which
          products get one, and a product with no entry there renders nothing
          at all rather than an empty element. */}
      {badge && <span className="product-card-badge">{t.shop.badges[badge]}</span>}

      <span className="product-card-media">
        {/* Lazy: a full catalogue is ~190 of these, and only a couple of
            rows are ever on screen. */}
        <ImagePlaceholder src={storeImage(product)} label={product.name} ratio="4 / 3" loading="lazy" />
      </span>
      <span className="product-card-body">
        {/* `title` for the same reason the footer's social icons carry one:
            the name is clamped to two lines, so the full string has to be
            available on hover. */}
        <span className="product-card-name" title={product.name}>{product.name}</span>
        <span className="product-card-cta">{t.shop.viewProduct}</span>
      </span>
    </a>
  );
}
