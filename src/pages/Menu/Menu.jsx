import { useState } from 'react';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import { menuSections } from './data.js';
import './Menu.css';

export default function Menu() {
  const [view, setView] = useState('cards');

  return (
    <div className="container menu-page">
      <span className="card-kicker">The menu</span>
      <h1>Fresh flavors, every day</h1>
      <p className="menu-intro">The list changes with what came in that morning — this is a snapshot of what's usually on it.</p>

      <div className="menu-controls">
        <div className="seg">
          <button
            type="button"
            className="seg-opt"
            data-active={view === 'list'}
            onClick={() => setView('list')}
          >
            List
          </button>
          <button
            type="button"
            className="seg-opt"
            data-active={view === 'cards'}
            onClick={() => setView('cards')}
          >
            Cards
          </button>
        </div>
      </div>

      {menuSections.map((section) => (
        <section key={section.name} className="menu-section">
          <div className="menu-section-heading">
            <h2>{section.name}</h2>
            <span className="menu-section-time">{section.time}</span>
          </div>

          {view === 'cards' ? (
            <div className="menu-cards">
              {section.items.map((item) => (
                <article key={item.dish} className="card elev-sm menu-card">
                  <ImagePlaceholder label={item.dish} ratio="4 / 3" />
                  <div className="menu-card-body">
                    <div className="menu-card-row">
                      <h3 className="card-title">{item.dish}</h3>
                      <span className="menu-price">{item.price}</span>
                    </div>
                    <p className="card-body">{item.note}</p>
                    <span className="tag">{item.tag}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="menu-list">
              {section.items.map((item) => (
                <div key={item.dish} className="menu-list-row">
                  <ImagePlaceholder label={item.dish} ratio="1 / 1" className="menu-list-thumb" />
                  <div className="menu-list-info">
                    <div className="menu-list-title-row">
                      <h3>{item.dish}</h3>
                      <span className="tag">{item.tag}</span>
                    </div>
                    <p>{item.note}</p>
                  </div>
                  <span className="menu-price">{item.price}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
