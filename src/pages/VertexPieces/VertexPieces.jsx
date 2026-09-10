import { useState } from 'react';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import WhatsAppButton from '../../components/WhatsAppButton.jsx';
import Carousel from '../../components/Carousel.jsx';
import ViewToggle from '../../components/ViewToggle.jsx';
import { catalogue, filterKeys } from '../../data/catalogue.js';
import { media } from '../../data/media.js';
import { site } from '../../data/site.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './VertexPieces.css';

export default function VertexPieces() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('Cards');

  const shown = filter === 'all' ? catalogue : catalogue.filter((p) => p.catKey === filter);
  const resultCount = shown.length === 1 ? t.vertex.resultPiece(shown.length) : t.vertex.resultPieces(shown.length);

  return (
    <div className="vertex-page">
      <section className="vertex-hero">
        <div className="container">
          <span className="vertex-hero-badge">
            <span className="vertex-hero-badge-dot" />
            {t.vertex.badge}
          </span>
          <h1 className="vertex-hero-title">{t.vertex.title}</h1>
          <p className="vertex-hero-body">{t.vertex.body}</p>
          <div className="vertex-hero-actions">
            <a className="btn btn-primary" href={site.shopUrl} target="_blank" rel="noopener noreferrer">{t.vertex.openShop}</a>
            <WhatsAppButton className="btn btn-ghost">{t.vertex.askFloor}</WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="container vertex-catalogue">
        <div className="vertex-controls">
          <div className="seg">
            {filterKeys.map((key) => (
              <button
                key={key}
                type="button"
                className="seg-opt"
                data-active={filter === key}
                onClick={() => setFilter(key)}
              >
                {t.vertex.filters[key]}
              </button>
            ))}
          </div>
          <span className="vertex-result-count">{resultCount}</span>
          <ViewToggle view={view} onChange={setView} listLabel={t.vertex.viewList} cardsLabel={t.vertex.viewCards} />
        </div>

        {view === 'List' ? (
          <div className="vertex-list">
            {shown.map((p) => {
              const info = t.vertex.items[p.code];
              return (
                <div key={p.code} className="vertex-row">
                  <div className="washed vertex-list-thumb">
                    <ImagePlaceholder src={media.vertex[p.code]} label={info.name} ratio="1 / 1" />
                  </div>
                  <div className="vertex-list-info">
                    <div className="vertex-list-title-row">
                      <h3>{info.name}</h3>
                      <span className="vertex-list-code">{p.code}</span>
                      <span className="tag tag-accent">{t.vertex.filters[p.catKey]}</span>
                    </div>
                    <p className="vertex-list-note">{info.note}</p>
                    <p className="vertex-list-meta">{info.finish} · {info.lead} · {info.where}</p>
                  </div>
                  <div className="vertex-list-action-col">
                    <a className="btn btn-secondary vertex-view-btn" href={site.shopUrl} target="_blank" rel="noopener noreferrer">{t.vertex.viewLink}</a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Carousel prevLabel={t.vertex.prevPieces} nextLabel={t.vertex.nextPieces}>
            {shown.map((p) => {
              const info = t.vertex.items[p.code];
              return (
                <div key={p.code} className="card elev-sm carousel-card vertex-card">
                  <div className="washed vertex-card-image">
                    <ImagePlaceholder src={media.vertex[p.code]} label={info.name} ratio="4 / 3" />
                  </div>
                  <div className="vertex-card-body">
                    <div className="vertex-card-top-row">
                      <span className="card-kicker">{t.vertex.filters[p.catKey]}</span>
                      <span className="vertex-list-code">{p.code}</span>
                    </div>
                    <h3 className="card-title">{info.name}</h3>
                    <p className="card-body">{info.note}</p>
                    <div className="vertex-card-specs">
                      <span>{t.home.shopRoom.finish} · {info.finish}</span>
                      <span>{t.home.shopRoom.leadTime} · {info.lead}</span>
                      <span>{t.vertex.inTheRoom} · {info.where}</span>
                    </div>
                    <div className="vertex-card-bottom-row">
                      <a className="btn btn-secondary vertex-view-btn" href={site.shopUrl} target="_blank" rel="noopener noreferrer">{t.vertex.viewOnVertex}</a>
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
