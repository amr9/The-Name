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
            <WhatsAppButton className="btn btn-ghost">{t.shop.askFloor}</WhatsAppButton>
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
                    <p className="shop-list-meta">{info.finish} · {info.lead} · {info.where}</p>
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
                <div key={p.code} className="card elev-sm carousel-card shop-card">
                  <div className="washed shop-card-image">
                    <ImagePlaceholder src={media.shop[p.code]} label={info.name} ratio="4 / 3" />
                  </div>
                  <div className="shop-card-body">
                    <div className="shop-card-top-row">
                      <span className="card-kicker">{t.shop.filters[p.catKey]}</span>
                      <span className="shop-list-code">{p.code}</span>
                    </div>
                    <h3 className="card-title">{info.name}</h3>
                    <p className="card-body">{info.note}</p>
                    <div className="shop-card-specs">
                      <span>{t.shop.finish} · {info.finish}</span>
                      <span>{t.shop.leadTime} · {info.lead}</span>
                      <span>{t.shop.inTheRoom} · {info.where}</span>
                    </div>
                    <div className="shop-card-bottom-row">
                      <a className="btn btn-secondary shop-view-btn" href={site.shopUrl} target="_blank" rel="noopener noreferrer">{t.shop.viewOnShop}</a>
                    </div>
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
