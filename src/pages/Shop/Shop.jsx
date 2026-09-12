import { useState } from 'react';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import WhatsAppButton from '../../components/WhatsAppButton.jsx';
import Carousel from '../../components/Carousel.jsx';
import ViewToggle from '../../components/ViewToggle.jsx';
import { catalogue, filterKeys } from '../../data/catalogue.js';
import { media } from '../../data/media.js';
import { site } from '../../data/site.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './Shop.css';

export default function Shop() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('Cards');

  const shown = filter === 'all' ? catalogue : catalogue.filter((p) => p.catKey === filter);
  const resultCount = shown.length === 1 ? t.shop.resultPiece(shown.length) : t.shop.resultPieces(shown.length);
  // Method names are shared with the Home "how it works" panel.
  const methodNames = (p) => p.methods.map((m) => t.home.howItWorks.methods[m].name).join(', ');

  return (
    <div className="shop-page">
      <section className="shop-hero">
        <div className="container">
          <span className="shop-hero-badge">
            <span className="shop-hero-badge-dot" />
            {t.shop.badge}
          </span>
          <h1 className="shop-hero-title">{t.shop.title}</h1>
          <p className="shop-hero-body">{t.shop.body}</p>
          <div className="shop-hero-actions">
            <a className="btn btn-primary" href={site.shopUrl} target="_blank" rel="noopener noreferrer">{t.shop.openShop}</a>
            <WhatsAppButton className="btn btn-ghost">{t.shop.askPersonal}</WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="container shop-catalogue">
        <div className="shop-controls">
          <div className="seg">
            {filterKeys.map((key) => (
              <button
                key={key}
                type="button"
                className="seg-opt"
                data-active={filter === key}
                onClick={() => setFilter(key)}
              >
                {t.shop.filters[key]}
              </button>
            ))}
          </div>
          <span className="shop-result-count">{resultCount}</span>
          <ViewToggle view={view} onChange={setView} listLabel={t.shop.viewList} cardsLabel={t.shop.viewCards} />
        </div>

        {view === 'List' ? (
          <div className="shop-list">
            {shown.map((p) => {
              const info = t.shop.items[p.code];
              return (
                <div key={p.code} className="shop-row">
                  <div className="washed shop-list-thumb">
                    <ImagePlaceholder src={media.shop[p.code]} label={info.name} ratio="1 / 1" />
                  </div>
                  <div className="shop-list-info">
                    <div className="shop-list-title-row">
                      <h3>{info.name}</h3>
                      <span className="shop-list-code">{p.code}</span>
                      <span className="tag tag-accent">{t.shop.filters[p.catKey]}</span>
                    </div>
                    <p className="shop-list-note">{info.note}</p>
                    <p className="shop-list-meta">{p.brand} · {info.finish} · {methodNames(p)} · {info.lead}</p>
                  </div>
                  <div className="shop-list-action-col">
                    <a className="btn btn-secondary shop-view-btn" href={site.shopUrl} target="_blank" rel="noopener noreferrer">{t.shop.viewLink}</a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Carousel prevLabel={t.shop.prevPieces} nextLabel={t.shop.nextPieces}>
            {shown.map((p) => {
              const info = t.shop.items[p.code];
              return (
                // Frosted-overlay card: the photo fills the card, methods and
                // code float over it, and name/brand sit on a glass panel.
                <div key={p.code} className="carousel-card shop-card">
                  <ImagePlaceholder className="washed shop-card-image" src={media.shop[p.code]} label={info.name} ratio="3 / 4" />
                  <div className="shop-card-top">
                    <span className="shop-card-chip">{methodNames(p)}</span>
                    <span className="shop-card-chip shop-card-code">{p.code}</span>
                  </div>
                  <div className="shop-card-panel">
                    <span className="shop-card-brand">{p.brand}</span>
                    <h3 className="card-title shop-card-name">{info.name}</h3>
                    <span className="shop-card-meta">{info.finish} · {info.lead}</span>
                    <a className="shop-card-go" href={site.shopUrl} target="_blank" rel="noopener noreferrer" aria-label={t.shop.personaliseItem(info.name)}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </Carousel>
        )}
      </section>
    </div>
  );
}
