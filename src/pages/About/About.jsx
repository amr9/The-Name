import { Link } from 'react-router-dom';
import ProcessSteps from '../../components/ProcessSteps/ProcessSteps.jsx';
import WhatsAppButton from '../../components/WhatsAppButton.jsx';
import { brands } from '../../data/brands.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { aboutServices, purposeIds } from './data.js';
import './About.css';

export default function About() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <div className="about-page">
      <header className="container about-hero">
        <span className="card-kicker">{a.kicker}</span>
        <h1 className="about-title">{a.title}</h1>
        <p className="about-lede">{a.lede}</p>
      </header>

      {/* — the services we provide — */}
      <section className="container about-section">
        <h2 className="about-section-title">{a.servicesHeading}</h2>
        <p className="about-section-lede">{a.servicesLede}</p>

        <div className="about-services">
          {aboutServices.map((s) => {
            const info = a.services[s.id];
            return (
              <article key={s.id} className="about-service">
                <h3 className="about-service-title">{info.title}</h3>
                <p className="about-service-body">{info.body}</p>
                {s.showBrands && (
                  <ul className="about-tags">
                    {brands.map((b) => (
                      <li key={b.id} className="tag tag-accent">{b.name}</li>
                    ))}
                  </ul>
                )}
                <Link to={s.to} className="btn btn-ghost about-service-link">{info.cta}</Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* — how we provide it: the same steps as Home, and the methods — */}
      <section className="about-how">
        <div className="container">
          <h2 className="about-section-title">{a.howHeading}</h2>
          <p className="about-section-lede">{a.howLede}</p>

          <ProcessSteps />

          <div className="about-methods">
            <span className="about-methods-label">{a.methodsLabel}</span>
            <ul className="about-tags">
              {Object.entries(t.home.howItWorks.methods).map(([id, m]) => (
                <li key={id} className="tag tag-accent">{m.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* — mission and vision — */}
      <section className="container about-purpose">
        {purposeIds.map((id) => (
          <article key={id} className={`about-purpose-panel about-purpose-${id}`}>
            <span className="card-kicker">{a[id].kicker}</span>
            <p className="about-purpose-statement">{a[id].statement}</p>
          </article>
        ))}
      </section>

      <section className="container about-cta">
        <h2 className="about-section-title">{a.cta.heading}</h2>
        <p className="about-section-lede">{a.cta.body}</p>
        <div className="about-cta-actions">
          <Link to="/contact" className="btn btn-primary">{a.cta.contact}</Link>
          <WhatsAppButton className="btn btn-secondary">{a.cta.whatsapp}</WhatsAppButton>
        </div>
      </section>
    </div>
  );
}
