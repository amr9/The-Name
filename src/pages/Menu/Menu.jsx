import { useState } from 'react';
import { Link } from 'react-router-dom';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import WhatsAppButton from '../../components/WhatsAppButton.jsx';
import Carousel from '../../components/Carousel.jsx';
import ViewToggle from '../../components/ViewToggle.jsx';
import { media } from '../../data/media.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { menuSections } from './data.js';
import './Menu.css';

export default function Menu() {
  const { t } = useLanguage();
  const [view, setView] = useState('List');

  return (
    <div className="container menu-page">
      <span className="card-kicker">{t.menu.kicker}</span>
      <h1 className="menu-title">{t.menu.title}</h1>

      <div className="menu-controls">
        <ViewToggle view={view} onChange={setView} listLabel={t.menu.viewList} cardsLabel={t.menu.viewCards} />
        <span className="menu-updated">{t.menu.updated}</span>
        <WhatsAppButton className="btn btn-secondary">{t.menu.askAllergens}</WhatsAppButton>
        <Link to="/shop" className="btn btn-ghost">{t.menu.tableware}</Link>
      </div>

      {menuSections.map((section) => {
        const sectionInfo = t.menu.sections[section.id];
        return (
          <div key={section.id} className="menu-section">
            <div className="menu-section-heading">
              <h2>{sectionInfo.name}</h2>
              <span className="menu-section-rule" />
              <span className="menu-section-time">{sectionInfo.time}</span>
            </div>

            {view === 'Cards' ? (
              <Carousel prevLabel={t.menu.prevDishes} nextLabel={t.menu.nextDishes}>
                {section.items.map((item) => {
                  const m = sectionInfo.items[item.id];
                  return (
                    <div key={item.id} className="card elev-sm carousel-card menu-card">
                      <div className="washed menu-card-image">
                        <ImagePlaceholder src={media.menu[item.id]} label={m.dish} ratio="4 / 3" />
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
                  );
                })}
              </Carousel>
            ) : (
              <div className="menu-list">
                {section.items.map((item) => {
                  const m = sectionInfo.items[item.id];
                  return (
                    <div key={item.id} className="menu-list-row">
                      <div className="washed menu-list-thumb">
                        <ImagePlaceholder src={media.menu[item.id]} label={m.dish} ratio="1 / 1" />
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
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
