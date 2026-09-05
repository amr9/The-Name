import { useRef, useState } from 'react';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import WhatsAppButton from '../../components/WhatsAppButton.jsx';
import CarouselButtons from '../../components/CarouselButtons.jsx';
import { catalogue, shopFilters } from '../../data/catalogue.js';
import { site } from '../../data/site.js';
import './VertexPieces.css';

const VIEWS = [
  { label: 'List', icon: '☰' },
  { label: 'Cards', icon: '▦' },
];

export default function VertexPieces() {
  const [filter, setFilter] = useState('All');
  const [view, setView] = useState('Cards');
  const trackRef = useRef(null);

  const shown = filter === 'All' ? catalogue : catalogue.filter((p) => p.cat === filter);
  const resultCount = shown.length + (shown.length === 1 ? ' piece' : ' pieces');

  return (
    <div className="vertex-page">
      <section className="vertex-hero">
        <div className="container">
          <span className="vertex-hero-badge">
            <span className="vertex-hero-badge-dot" />
            Vertex · the pieces in this room
          </span>
          <h1 className="vertex-hero-title">All You Need, Right Here</h1>
          <p className="vertex-hero-body">
            Vertex is an online shop for interiors — lighting, seating,
            tabletop and wall systems. This restaurant is its showroom:
            everything you sit on, eat off and look at is on the shelf.
          </p>
          <div className="vertex-hero-actions">
            <a className="btn btn-primary" href={site.shopUrl} target="_blank" rel="noopener noreferrer">Open the Vertex shop ↗</a>
            <WhatsAppButton className="btn btn-ghost">Ask what is on the floor →</WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="container vertex-catalogue">
        <div className="vertex-controls">
          <div className="seg">
            {shopFilters.map((f) => (
              <button
                key={f}
                type="button"
                className="seg-opt"
                data-active={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <span className="vertex-result-count">{resultCount}</span>
          <div className="seg">
            {VIEWS.map((v) => (
              <button
                key={v.label}
                type="button"
                className="seg-opt menu-view-opt"
                data-active={view === v.label}
                onClick={() => setView(v.label)}
              >
                <span>{v.icon}</span>
                {v.label}
              </button>
            ))}
          </div>
          {view === 'Cards' && (
            <CarouselButtons trackRef={trackRef} prevLabel="Previous pieces" nextLabel="More pieces" />
          )}
        </div>

        {view === 'List' ? (
          <div className="vertex-list">
            {shown.map((p) => (
              <div key={p.code} className="vertex-row">
                <div className="washed vertex-list-thumb">
                  <ImagePlaceholder label={p.name} ratio="1 / 1" />
                </div>
                <div className="vertex-list-info">
                  <div className="vertex-list-title-row">
                    <h3>{p.name}</h3>
                    <span className="vertex-list-code">{p.code}</span>
                    <span className="tag tag-accent">{p.cat}</span>
                  </div>
                  <p className="vertex-list-note">{p.note}</p>
                  <p className="vertex-list-meta">{p.finish} · {p.lead} · {p.where}</p>
                </div>
                <div className="vertex-list-price-col">
                  <span className="vertex-price">{p.price}</span>
                  <a className="btn btn-secondary vertex-view-btn" href={site.shopUrl} target="_blank" rel="noopener noreferrer">View ↗</a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div ref={trackRef} className="carousel-track">
            {shown.map((p) => (
              <div key={p.code} className="card elev-sm carousel-card vertex-card">
                <div className="washed vertex-card-image">
                  <ImagePlaceholder label={p.name} ratio="4 / 3" />
                </div>
                <div className="vertex-card-body">
                  <div className="vertex-card-top-row">
                    <span className="card-kicker">{p.cat}</span>
                    <span className="vertex-list-code">{p.code}</span>
                  </div>
                  <h3 className="card-title">{p.name}</h3>
                  <p className="card-body">{p.note}</p>
                  <div className="vertex-card-specs">
                    <span>Finish · {p.finish}</span>
                    <span>Lead time · {p.lead}</span>
                    <span>In the room · {p.where}</span>
                  </div>
                  <div className="vertex-card-bottom-row">
                    <span className="vertex-price">{p.price}</span>
                    <a className="btn btn-secondary vertex-view-btn" href={site.shopUrl} target="_blank" rel="noopener noreferrer">View on Vertex ↗</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
