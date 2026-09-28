import { useDeferredValue, useState } from 'react';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import ShopIcon from '../../components/ShopIcon.jsx';
import WhatsAppButton from '../../components/WhatsAppButton.jsx';
// PARKED with the gift-sets section below.
// import OverlayCard, { OverlayCardArrow } from '../../components/OverlayCard/OverlayCard.jsx';
import ViewToggle from '../../components/ViewToggle.jsx';
import Carousel from '../../components/Carousel.jsx';
// PARKED with the gift-sets section below.
// import { giftSets } from '../../data/catalogue.js';
import ProductCard, { SHOWCASE_RATIO } from '../../components/ProductCard/ProductCard.jsx';
import { categoryUrl, productUrl, productsInCategory, storeCategories, storeImage } from '../../data/storeProducts.js';
// PARKED with the gift-sets section below.
// import { media } from '../../data/media.js';
import { site } from '../../data/site.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './Shop.css';

// PARKED with the "load more" control at the foot of the catalogue.
// // How many products the catalogue shows before you ask for more. 24 fills a
// // few rows at every column count the grid produces (2, 3, 4 and 6 all divide
// // it), so the last row is never a lonely orphan.
// const PAGE_SIZE = 24;

// The catalogue is a SHOWCASE, not a full listing. A named shelf shows three
// pieces and then hands you to the store itself for the rest. Three is what
// lets the row span the full width of the container — at three columns each
// card is roughly twice as wide as it was in the 200px auto-fill grid, which
// is the point: the product pictures are finally big enough to read.
//
// "All Products" is the exception and does NOT get cut to three: it is the
// whole catalogue on a Carousel instead, three cards in view at a time and
// the rest a swipe away. Same card, same three-across measure, no truncation
// — a shelf you are browsing rather than a sample of one.
const FEATURED_COUNT = 3;
const ALL = 'all';

export default function Shop() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('Cards');
  const [query, setQuery] = useState('');
  // PARKED with the "load more" control at the foot of the catalogue.
  // // How much of the filtered list is currently rendered. This is a WINDOW on
  // // `shown`, not a page number: "load more" grows it, and every card already
  // // on screen stays exactly where it was. Numbered pages would replace the
  // // grid on each click and throw away the visitor's place in it.
  // const [visible, setVisible] = useState(PAGE_SIZE);

  // NOT debounced. Searching 192 objects already in memory takes well under a
  // millisecond — a timer would only add lag to something that is already
  // instant. What can be slow is RE-RENDERING up to 192 cards on every
  // keystroke, and useDeferredValue is the right tool for that: React keeps
  // the input itself responsive and renders the heavy list at a lower
  // priority, catching up when the typing pauses. That is the same benefit a
  // debounce is reached for, without guessing a delay or leaving the field
  // showing stale results.
  const deferredQuery = useDeferredValue(query);

  // Every term has to appear somewhere in the product's name, in any order, so
  // "lexon bag" finds "LEXON - Travel Bag NEW AIRLINE".
  const terms = deferredQuery.toLowerCase().split(/\s+/).filter(Boolean);
  const matches = (p) => {
    const haystack = p.name.toLowerCase();
    return terms.every((term) => haystack.includes(term));
  };

  // A search runs across the WHOLE catalogue: typing resets the category to
  // "all" (see the input below), so this is filtering the full list, not a
  // shelf of it.
  const shown = productsInCategory(filter).filter(matches);
  const resultCount = shown.length === 1 ? t.shop.resultPiece(shown.length) : t.shop.resultPieces(shown.length);

  // PARKED with the "load more" control at the foot of the catalogue.
  // // A new filter or a new search is a new list, so the window starts over.
  // // Without this, narrowing 192 results to 8 would still say "showing 24 of
  // // 8" and leave a Load more button with nothing to load.
  // useEffect(() => { setVisible(PAGE_SIZE); }, [filter, deferredQuery]);

  // On "All Products" the carousel carries the lot; a named shelf is cut to
  // three and its remainder lives behind the button under the grid. A SEARCH
  // resets the filter to 'all' (see the input below), so results always land
  // in the carousel and are never truncated to three.
  const isAll = filter === ALL;
  const page = isAll ? shown : shown.slice(0, FEATURED_COUNT);

  // PARKED with the gift-sets section below — only those cards used it.
  // const methodNames = (p) => p.methods.map((m) => t.home.howItWorks.methods[m].name).join(', ');

  return (
    <div className="shop-page">
      <section className="shop-hero">
        <div className="container">
          <span className="card-kicker">{t.shop.badge}</span>
          <h1 className="page-title shop-hero-title">{t.shop.title}</h1>
          <p className="shop-hero-body">{t.shop.body}</p>
          <div className="shop-hero-actions">
            <a className="btn btn-primary" href={site.shopUrl} target="_blank" rel="noopener noreferrer"><ShopIcon />{t.shop.openShop}</a>
            <WhatsAppButton className="btn btn-secondary">{t.shop.askPersonal}</WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="container shop-catalogue">
        <div className="shop-controls">
          {/* `shop-filters` exists only so the wrapping-pill treatment in
              Shop.css lands on the CATEGORIES and not on the List/Cards
              ViewToggle beside them, which is also a `.seg` and should stay
              the joined capsule it is everywhere else. */}
          <div className="seg shop-filters">
            {storeCategories.map(({ id }) => (
              <button
                key={id}
                type="button"
                className="seg-opt"
                data-active={filter === id}
                onClick={() => setFilter(id)}
              >
                {t.shop.filters[id]}
              </button>
            ))}
          </div>
          <span className="shop-result-count">{resultCount}</span>
          <ViewToggle view={view} onChange={setView} listLabel={t.shop.viewList} cardsLabel={t.shop.viewCards} />
        </div>

        {/* Under the filters, and it OVERRIDES them: a search is meant to find
            a product wherever it lives, so starting one drops you back to
            "All Products" rather than quietly searching inside one shelf and
            appearing to find nothing. type="search" gives the field its
            native clear button. */}
        <div className="shop-search">
          <label className="shop-search-label" htmlFor="shop-search">{t.shop.searchLabel}</label>
          <input
            id="shop-search"
            className="shop-search-input"
            type="search"
            value={query}
            placeholder={t.shop.searchPlaceholder}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.trim()) setFilter('all');
            }}
          />
        </div>

        {shown.length === 0 ? (
          <p className="shop-empty">
            {deferredQuery.trim() ? t.shop.noResults(deferredQuery.trim()) : t.shop.emptyCategory}
          </p>
        ) : view === 'List' ? (
          <div className="shop-list">
            {page.map((p) => (
              <div key={p.id} className="shop-row">
                <div className="shop-list-thumb">
                  <ImagePlaceholder src={storeImage(p)} label={p.name} ratio="1 / 1" />
                </div>
                <div className="shop-list-info">
                  <div className="shop-list-title-row">
                    {/* `title` for the same reason the footer's social icons
                        carry one: the name is clamped, so the full string has
                        to be available on hover. */}
                    <h3 title={p.name}>{p.name}</h3>
                  </div>
                </div>
                <div className="shop-list-action-col">
                  <a className="btn btn-secondary shop-view-btn" href={productUrl(p)} target="_blank" rel="noopener noreferrer">{t.shop.viewProduct}</a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Two ways to lay out the SAME card (components/ProductCard, which
             Customize Yours also renders), and both put three across:

             - "All Products" → the shared Carousel. `carousel-card` is
               theme.css's flex-basis `(100% - 48px) / 3`, i.e. exactly three
               in view against the track's 24px gaps, already stepping to two
               and then one on narrower screens. The Cafe, Kids and Customize
               Yours pages use the same track, so nothing here is
               Shop-specific.
             - a named shelf → `product-grid-featured`, three fixed columns.
               A track of three cards that cannot scroll is just a row with
               dead arrows on it, so it is a grid instead.

             `product-card-showcase` and SHOWCASE_RATIO are the picture
             treatment and ride on both. Customize Yours renders the same
             showcase card on the same Carousel. */
          isAll ? (
            <Carousel prevLabel={t.shop.prevPieces} nextLabel={t.shop.nextPieces}>
              {page.map((p) => (
                <ProductCard key={p.id} product={p} className="carousel-card product-card-showcase" ratio={SHOWCASE_RATIO} />
              ))}
            </Carousel>
          ) : (
            <div className="product-grid product-grid-featured">
              {page.map((p) => <ProductCard key={p.id} product={p} className="product-card-showcase" ratio={SHOWCASE_RATIO} />)}
            </div>
          )
        )}

        {/* Where the rest of the shelf went. A card opens ONE product on the
            store; this opens the whole CATEGORY there, the same one the
            filter above is set to — pick Drinkware here and you land on the
            store's Drinkware page, not its shop front. Under the grid rather
            than beside the filters because it reads as the end of the three:
            "and here is everything else". */}
        {shown.length > 0 && (
          <div className="shop-more">
            <a
              className="btn btn-primary"
              href={categoryUrl(filter)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* "Shop all All Products" is nonsense, so the unfiltered view
                  borrows the hero's own wording instead of naming itself. */}
              <ShopIcon />{isAll ? t.shop.openShop : t.shop.shopCategory(t.shop.filters[filter])}
            </a>
          </div>
        )}

        {/* — PARKED: the "load more" pager. The catalogue shows three pieces
            per shelf now and sends you to the store for the rest, so there is
            nothing left for it to page through. Its i18n copy
            (shop.loadMore, shop.showing) and its CSS (.shop-more-count) are
            both still there; restoring it means uncommenting this block AND
            the PAGE_SIZE constant, the `visible` state and the reset effect
            marked PARKED above, then putting `visible` back into the `page`
            slice.

            Only when there is something left to load. It reports the count so
            the click is an informed one — "load 24 more" of a known total,
            rather than an endless feed with no sense of how far in you are.
            A real button, so it is reachable by keyboard and announced.

        {remaining > 0 && (
          <div className="shop-more">
            <span className="shop-more-count">{t.shop.showing(page.length, shown.length)}</span>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
            >
              {t.shop.loadMore(Math.min(PAGE_SIZE, remaining))}
            </button>
          </div>
        )}
        */}
      </section>

      {/* — PARKED: the gift-sets section, "Boxed, wrapped and ready to give".
          Commented out rather than deleted — its i18n copy (shop.giftSets.*),
          its CSS (.shop-gift-sets*) and the curated TN-5xx pieces it renders
          (data/catalogue.js `giftSets`) are all still there. Restoring it
          means uncommenting this block AND the four imports/helpers marked
          PARKED at the top of this file, which nothing else uses.

          Note the inner comment below had its JSX comment markers stripped to
          plain dashes: a nested end-of-comment marker would close this block
          early and break the build. —

          — gift sets: their own section rather than a filter, shown as a grid
          of pictures so the boxes read as a range of their own —
      <section id="gift-sets" className="shop-gift-sets">
        <div className="container">
          <div className="shop-gift-sets-heading">
            <span className="card-kicker">{t.shop.giftSets.kicker}</span>
            <h2 className="shop-gift-sets-title">{t.shop.giftSets.heading}</h2>
            <p className="shop-gift-sets-lede">{t.shop.giftSets.lede}</p>
          </div>

          <div className="shop-gift-sets-grid">
            {giftSets.map((p) => {
              const info = t.shop.items[p.code];
              return (
                <OverlayCard
                  key={p.code}
                  image={media.shop[p.code]}
                  chips={[methodNames(p), p.code]}
                  kicker={p.brand}
                  title={info.name}
                  meta={`${info.finish} · ${info.lead}`}
                  action={
                    <a href={site.shopUrl} target="_blank" rel="noopener noreferrer" aria-label={t.shop.personaliseItem(info.name)}>
                      <OverlayCardArrow />
                    </a>
                  }
                />
              );
            })}
          </div>
        </div>
      </section>
      */}
    </div>
  );
}
