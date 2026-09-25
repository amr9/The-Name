import { useDeferredValue, useEffect, useState } from 'react';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import ShopIcon from '../../components/ShopIcon.jsx';
import WhatsAppButton from '../../components/WhatsAppButton.jsx';
// PARKED with the gift-sets section below.
// import OverlayCard, { OverlayCardArrow } from '../../components/OverlayCard/OverlayCard.jsx';
import ViewToggle from '../../components/ViewToggle.jsx';
// PARKED with the gift-sets section below.
// import { giftSets } from '../../data/catalogue.js';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import { productUrl, productsInCategory, storeCategories, storeImage } from '../../data/storeProducts.js';
// PARKED with the gift-sets section below.
// import { media } from '../../data/media.js';
import { site } from '../../data/site.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './Shop.css';

// How many products the catalogue shows before you ask for more. 24 fills a
// few rows at every column count the grid produces (2, 3, 4 and 6 all divide
// it), so the last row is never a lonely orphan.
const PAGE_SIZE = 24;

export default function Shop() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('Cards');
  const [query, setQuery] = useState('');
  // How much of the filtered list is currently rendered. This is a WINDOW on
  // `shown`, not a page number: "load more" grows it, and every card already
  // on screen stays exactly where it was. Numbered pages would replace the
  // grid on each click and throw away the visitor's place in it.
  const [visible, setVisible] = useState(PAGE_SIZE);

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

  // A new filter or a new search is a new list, so the window starts over.
  // Without this, narrowing 192 results to 8 would still say "showing 24 of
  // 8" and leave a Load more button with nothing to load.
  useEffect(() => { setVisible(PAGE_SIZE); }, [filter, deferredQuery]);

  const page = shown.slice(0, visible);
  const remaining = shown.length - page.length;

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
          /* A grid, not the Carousel the eleven curated pieces used: 192
             products do not belong on a track you have to scroll sideways
             through. The card itself is components/ProductCard — the
             Customize Yours page renders the same one. */
          <div className="product-grid">
            {page.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}

        {/* Only when there is something left to load. It reports the count so
            the click is an informed one — "load 24 more" of a known total,
            rather than an endless feed with no sense of how far in you are.
            A real <button>, so it is reachable by keyboard and announced. */}
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
