import { Link } from 'react-router-dom';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import WhatsAppButton from '../../components/WhatsAppButton.jsx';
import { features, moments } from './data.js';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <section className="home-hero">
        <div className="container home-hero-inner">
          <span className="tag home-hero-tag">Your Social Hub</span>
          <h1 className="home-hero-title">
            Here is <span className="script home-hero-script">your social hub.</span>
          </h1>
          <p className="home-hero-body">
            Fresh flavors every day, a room built for good company, and the
            kind of mood that turns a quick coffee into an afternoon.
          </p>
          <div className="home-hero-actions">
            <Link to="/menu" className="btn btn-dark">See the menu</Link>
            <Link to="/contact" className="btn btn-secondary">Find us</Link>
          </div>
        </div>
      </section>

      <section className="container home-intro">
        <div className="home-intro-text">
          <span className="card-kicker">Who we are</span>
          <h2>A hub for good food and better company</h2>
          <p>
            The Name started as a simple idea: a room where the coffee is
            worth the trip and the people at the next table become friends.
            Every plate, every playlist, and every corner of the space is
            built around that.
          </p>
        </div>
        <ImagePlaceholder label="Hands sharing a coffee mug at the counter" ratio="5 / 4" />
      </section>

      <section className="home-features">
        <div className="container">
          <h2 className="home-features-heading">Why people come back</h2>
          <div className="home-features-grid">
            {features.map((f) => (
              <article key={f.title} className="card elev-sm home-feature-card">
                <ImagePlaceholder label={f.placeholder} ratio="4 / 3" />
                <div className="home-feature-body">
                  <span className="card-kicker">{f.kicker}</span>
                  <h3 className="card-title">{f.title}</h3>
                  <p className="card-body">{f.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container home-moments">
        <div className="home-moments-heading">
          <div>
            <span className="card-kicker">The mood</span>
            <h2>Moments from the hub</h2>
          </div>
          <Link to="/gallery" className="btn btn-ghost">See the full gallery →</Link>
        </div>
        <div className="home-moments-grid">
          {moments.map((m) => (
            <figure key={m.label} className="home-moment">
              <ImagePlaceholder label={m.placeholder} ratio="3 / 4" />
              <figcaption>{m.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="container home-cta">
        <div className="home-cta-inner">
          <div>
            <h2>We can't wait to meet you.</h2>
            <p>Tables, private events, or just directions — one WhatsApp thread with someone in the room.</p>
          </div>
          <WhatsAppButton className="btn btn-primary" />
        </div>
      </section>
    </div>
  );
}
