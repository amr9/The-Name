import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import WhatsAppButton from '../../components/WhatsAppButton.jsx';
import CarouselButtons from '../../components/CarouselButtons.jsx';
import { menuSections, updated } from './data.js';
import './Menu.css';

const VIEWS = [
  { label: 'List', icon: '☰' },
  { label: 'Cards', icon: '▦' },
];

export default function Menu() {
  const [view, setView] = useState('List');
  const trackRefs = useRef({});
  const getTrackRef = (name) => {
    if (!trackRefs.current[name]) trackRefs.current[name] = { current: null };
    return trackRefs.current[name];
  };

  return (
    <div className="container menu-page">
      <span className="card-kicker">The menu</span>
      <h1 className="menu-title">Taste the Tradition, Feel the Flavor</h1>

      <div className="menu-controls">
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
        <span className="menu-updated">Updated {updated}</span>
        <WhatsAppButton className="btn btn-secondary">Ask about allergens</WhatsAppButton>
        <Link to="/shop" className="btn btn-ghost">The tableware →</Link>
      </div>

      {menuSections.map((section) => (
        <div key={section.name} className="menu-section">
          <div className="menu-section-heading">
            <h2>{section.name}</h2>
            <span className="menu-section-rule" />
            <span className="menu-section-time">{section.time}</span>
            {view === 'Cards' && (
              <CarouselButtons
                trackRef={getTrackRef(section.name)}
                prevLabel="Previous dishes"
                nextLabel="More dishes"
              />
            )}
          </div>

          {view === 'Cards' ? (
            <div
              ref={(el) => { getTrackRef(section.name).current = el; }}
              className="carousel-track"
            >
              {section.items.map((m) => (
                <div key={m.dish} className="card elev-sm carousel-card menu-card">
                  <div className="washed menu-card-image">
                    <ImagePlaceholder label={m.dish} ratio="4 / 3" />
                  </div>
                  <div className="menu-card-body">
                    <div className="menu-card-row">
                      <h3 className="card-title">{m.dish}</h3>
                      <span className="menu-price">{m.price}</span>
                    </div>
                    <p className="card-body">{m.note}</p>
                    <span className="tag tag-accent menu-card-tag">{m.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="menu-list">
              {section.items.map((m) => (
                <div key={m.dish} className="menu-list-row">
                  <div className="washed menu-list-thumb">
                    <ImagePlaceholder label={m.dish} ratio="1 / 1" />
                  </div>
                  <div className="menu-list-info">
                    <div className="menu-list-title-row">
                      <h3>{m.dish}</h3>
                      <span className="tag tag-accent">{m.tag}</span>
                    </div>
                    <p>{m.note}</p>
                  </div>
                  <span className="menu-price">{m.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
