import ImagePlaceholder from '../ImagePlaceholder.jsx';
import { productBadge } from '../../data/storeBadges.js';
import { productUrl, storeImage } from '../../data/storeProducts.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './ProductCard.css';

/**
 * The frame for a SHOWCASE card — the big three-across treatment the Shop
 * catalogue and Customize Yours both use. SQUARE, because the catalogue is
 * mixed: 143 of the store's 187 photographs are 2:3 portrait and 44 are 3:2
 * landscape (the Message In The Bulb line, mostly). `.product-card-showcase`
 * fills the frame with `object-fit: cover`, which crops whatever does not fit,
 * so a portrait 3:4 frame — lovely for the majority — takes HALF THE WIDTH off
 * each of those 44. A square gives up a third of one axis either way,
 * symmetric, and product photography carries enough white margin to afford it.
 *
 * It is a value passed as a prop rather than a CSS rule because
 * ImagePlaceholder writes the ratio as an INLINE style, which no stylesheet
 * can override — a rule for it loses silently.
 */
export const SHOWCASE_RATIO = '1 / 1';

/**
 * One product from the store catalogue, as a card.
 *
 * Shared by the Shop catalogue and the Customize Yours page, which is the
 * whole reason it is a component: both show the same object and must not
 * drift apart. Both now render it at showcase size — Shop as a three-column
 * grid for a named shelf and a Carousel for "All Products", Customize Yours
 * as a Carousel throughout. The layouts are in this folder's CSS.
 *
 * The whole card is ONE <a> and the button is a <span> dressed as one — a
 * <button> or a second <a> inside a link is invalid, and three links to the
 * same product is noise for a screen reader.
 *
 * `className` is how the Shop page attaches the two treatments it needs
 * without this component knowing about either: `carousel-card` (the shared
 * flex-basis that puts three across a Carousel track) and
 * `product-card-showcase` (the picture that fills its frame). Both are plain
 * CSS in this folder's stylesheet and theme.css — nothing here branches.
 *
 * `ratio` is a PROP and not a CSS rule for one reason: ImagePlaceholder sets
 * the aspect ratio as an inline style, which no stylesheet can override. The
 * showcase cards pass '3 / 4' and have to pass it through here.
 */
export default function ProductCard({ product, className = '', ratio = '4 / 3' }) {
  const { t } = useLanguage();
  const badge = productBadge(product);

  return (
    <a
      className={`product-card ${className}`.trim()}
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
        <ImagePlaceholder src={storeImage(product)} label={product.name} ratio={ratio} loading="lazy" />
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
