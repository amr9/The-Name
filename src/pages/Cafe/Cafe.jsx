import { useState } from 'react';
import { Link } from 'react-router-dom';
import Bubbles from '../../components/Bubbles/Bubbles.jsx';
import Carousel from '../../components/Carousel.jsx';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
// import LogoMarquee from '../../components/LogoMarquee/LogoMarquee.jsx';
import OverlayCard from '../../components/OverlayCard/OverlayCard.jsx';
import PackagesPanel from '../../components/PackagesPanel/PackagesPanel.jsx';
import ViewToggle from '../../components/ViewToggle.jsx';
import WhatsAppButton from '../../components/WhatsAppButton.jsx';
import { media } from '../../data/media.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { eventPackageIds, menuSections /* , partners */ } from './data.js';
import './Cafe.css';

export default function Cafe() {
  const { t } = useLanguage();
  const [view, setView] = useState('List');

  return (
    // The host anchors the brand-mark bubbles in the gutters — three times the
    // Home page's size, and only beside the page (no narrow-screen bands).
    <div className="bubbles-host cafe-page">
      <Bubbles side="left" scale={3} />
      <Bubbles side="right" scale={3} />

      <header className="container">
        <span className="card-kicker">{t.cafe.kicker}</span>
        <h1 className="cafe-title">{t.cafe.title}</h1>
        <p className="cafe-intro">{t.cafe.intro}</p>
      </header>

      {/* — delivery partners — hidden for now. To bring the strip back,
          uncomment this block and the LogoMarquee / partners imports above.
      <LogoMarquee
        heading={t.cafe.partners.heading}
        items={partners.map((p) => ({ ...p, name: t.cafe.partners.items[p.id].name }))}
        logos={media.partners}
      />
      */}

      <div className="container">
        {/* — the menu — */}
        <div className="menu-controls">
          <ViewToggle view={view} onChange={setView} listLabel={t.cafe.viewList} cardsLabel={t.cafe.viewCards} />
          <span className="menu-updated">{t.cafe.updated}</span>
          <WhatsAppButton className="btn btn-secondary">{t.cafe.askAllergens}</WhatsAppButton>
          <Link to="/shop" className="btn btn-ghost">{t.cafe.shopLink}</Link>
        </div>

        {menuSections.map((section) => {
          const sectionInfo = t.cafe.sections[section.id];
          return (
            <div key={section.id} className="menu-section">
              <div className="menu-section-heading">
                <h2>{sectionInfo.name}</h2>
                <span className="menu-section-rule" />
                <span className="menu-section-time">{sectionInfo.time}</span>
              </div>

              {view === 'Cards' ? (
                <Carousel prevLabel={t.cafe.prevDishes} nextLabel={t.cafe.nextDishes}>
                  {section.items.map((item) => {
                    const m = sectionInfo.items[item.id];
                    return (
                      <OverlayCard
                        key={item.id}
                        className="carousel-card"
                        image={media.menu[item.id]}
                        chips={[m.tag, m.price]}
                        title={m.dish}
                        meta={m.note}
                        action={
                          <WhatsAppButton className="" iconOnly>{t.cafe.askAboutDish(m.dish)}</WhatsAppButton>
                        }
                      />
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

        {/* — events, which happen in this room (off-site work is on /business) — */}
        <section id="events" className="cafe-events">
          <span className="card-kicker">{t.cafe.events.kicker}</span>
          <h2 className="cafe-events-title">{t.cafe.events.heading}</h2>
          <p className="cafe-events-lede">{t.cafe.events.lede}</p>

          <PackagesPanel
            image={media.cafe.events}
            content={t.cafe.events}
            packageIds={eventPackageIds}
            labels={t.packages}
          />
        </section>
      </div>
    </div>
  );
}
