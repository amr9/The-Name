import { useState } from 'react';
import { Link } from 'react-router-dom';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import WhatsAppButton from '../../components/WhatsAppButton.jsx';
import { catalogue } from '../../data/catalogue.js';
import { site } from '../../data/site.js';
import { services } from './data.js';
import './Home.css';

export default function Home() {
  const [pin, setPin] = useState(0);
  const sel = catalogue[pin];

  return (
    <div className="home">
      {/* hero: video loop / still, full width */}
      <section className="home-hero">
        <div className="home-hero-media">
          <ImagePlaceholder label="Restaurant video loop or still — drop it here" ratio="auto" className="home-hero-media-slot" />
        </div>
        <div className="home-hero-scrim" />
        <div className="container home-hero-content">
          <h1 className="home-hero-title">A restaurant you can take home.</h1>
          <p className="home-hero-body">
            Every chair, lamp, plate and panel in this room is a Vertex piece —
            and every one of them is for sale. Eat first. Tap anything you
            like and we will show you what it is and what it costs.
          </p>
          <div className="home-hero-actions">
            <Link to="/menu" className="btn btn-primary">See the menu</Link>
            <Link to="/shop" className="btn btn-secondary home-hero-secondary">Shop the room</Link>
          </div>
        </div>
      </section>

      {/* what we do — services, one image each */}
      <section className="container home-services-intro">
        <span className="card-kicker">What we do</span>
        <h2 className="home-services-heading">Four services, one room</h2>
        <p className="home-services-body">
          The kitchen feeds the room, the room shows the Vertex range, and the
          same team cooks off-site and hosts private nights here. Scroll
          through them.
        </p>
      </section>

      {services.map((s) => (
        <section key={s.num} className="container home-service-row">
          <div className="row-flip home-service-grid">
            <div className="row-text home-service-text" style={{ order: s.textOrder }}>
              <div className="home-service-kicker-row">
                <span className="home-service-num">{s.num}</span>
                <span className="home-service-rule" />
                <span className="home-service-kicker">{s.kicker}</span>
              </div>
              <h3 className="home-service-title">{s.title}</h3>
              <p className="home-service-body">{s.body}</p>
              <div className="home-service-points">
                {s.points.map((pt) => (
                  <div key={pt} className="home-service-point">
                    <span className="home-service-dot" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
              <Link
                to={s.to}
                state={s.tab ? { tab: s.tab } : undefined}
                className="btn btn-secondary home-service-cta"
              >
                {s.cta}
              </Link>
            </div>
            <figure className="row-img home-service-figure" style={{ order: s.imgOrder }}>
              <div className="home-service-ring" />
              <div className="washed home-service-image-wrap">
                <ImagePlaceholder label={s.placeholder} ratio="5 / 4" />
              </div>
            </figure>
          </div>
        </section>
      ))}

      {/* shop the room: hotspots on a photograph */}
      <section className="home-shop-room">
        <div className="container">
          <div className="home-shop-room-heading">
            <div>
              <span className="card-kicker">Shop the room</span>
              <h2>Tap a piece. See what it is.</h2>
            </div>
            <p className="home-shop-room-lede">
              Six numbered pieces in this shot. Every one has a page on the
              Vertex shop with the full spec and the price.
            </p>
          </div>

          <div className="split home-shop-room-grid">
            <div className="home-shop-room-photo">
              <div className="washed">
                <ImagePlaceholder label="Wide shot of the dining room" ratio="16 / 10" />
              </div>
              {catalogue.map((p, i) => (
                <button
                  key={p.code}
                  type="button"
                  onClick={() => setPin(i)}
                  aria-label={p.name}
                  data-active={pin === i}
                  className="home-shop-room-pin"
                  style={{ left: p.x, top: p.y }}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <div className="home-shop-room-panel">
              <span className="home-shop-room-panel-meta">{sel.code} · piece {pin + 1} of {catalogue.length}</span>
              <div className="washed home-shop-room-panel-image">
                <ImagePlaceholder label={sel.name} ratio="4 / 3" />
              </div>
              <h3 className="home-shop-room-panel-title">{sel.name}</h3>
              <p className="home-shop-room-panel-note">{sel.note}</p>
              <div className="home-shop-room-panel-specs">
                <span>Category · {sel.cat}</span>
                <span>Finish · {sel.finish}</span>
                <span>Lead time · {sel.lead}</span>
              </div>
              <p className="home-shop-room-panel-price">{sel.price}</p>
              <a className="btn btn-primary btn-block" href={site.shopUrl} target="_blank" rel="noopener noreferrer">
                Open on the Vertex shop ↗
              </a>
              <p className="card-meta home-shop-room-panel-footnote">Checkout happens on the Vertex site</p>
            </div>
          </div>
        </div>
      </section>

      {/* friday */}
      <section className="container home-friday">
        <div className="home-friday-inner">
          <div>
            <span className="home-friday-kicker">EVERY FRIDAY</span>
            <h2 className="home-friday-title">The room is re-dressed</h2>
            <p className="home-friday-body">
              New Vertex pieces come onto the floor every Friday and the
              kitchen builds a four-course supper around them. You eat in
              next week's catalogue before anyone else sees it.
            </p>
          </div>
          <WhatsAppButton>Ask about Friday</WhatsAppButton>
        </div>
      </section>

      <section className="container home-closing">
        <div className="home-closing-inner">
          <div>
            <h2 className="home-closing-title">We can't wait to meet you.</h2>
            <p className="home-closing-body">Tables, a piece you saw, a catering quote, allergens — one WhatsApp thread with someone in the building.</p>
          </div>
          <WhatsAppButton style={{ gap: 8 }}>Chat on WhatsApp</WhatsAppButton>
        </div>
      </section>
    </div>
  );
}
