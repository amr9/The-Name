import ContactForm from '../../components/ContactForm/ContactForm.jsx';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import { media } from '../../data/media.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './About.css';

// Everything between the video and the enquiry form is PARKED (see the big
// comment in the markup below). These imports belong to that parked markup —
// uncomment them along with it.
// import { Link } from 'react-router-dom';
// import ProcessSteps from '../../components/ProcessSteps/ProcessSteps.jsx';
// import WhatsAppButton from '../../components/WhatsAppButton.jsx';
// import { brands } from '../../data/brands.js';
// import { aboutServices, purposeIds } from './data.js';

export default function About() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <div className="about-page">
      {/* — the film that explains the about. A placeholder until it lands:
          <ImagePlaceholder> shows the poster if there is one and the dashed
          slot if not, exactly like every other media slot on the site. The
          swap to a real <video> is spelled out under the figure. — */}
      <section className="container about-video">
        <span className="card-kicker">{a.video.kicker}</span>
        <h1 className="page-title about-video-title">{a.video.title}</h1>
        <p className="about-video-lede">{a.video.lede}</p>

        <figure className="about-video-frame">
          <ImagePlaceholder
            src={media.about.videoPoster}
            label={a.video.placeholder}
            ratio="16 / 9"
            className="about-video-slot"
          />
          <span className="about-video-play" aria-hidden="true">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
        </figure>

        {/* To go live: save the film as public/media/about/about-video.mp4
            (and a still as about-video-poster.jpg), then replace the whole
            <figure> above with this block.

        <figure className="about-video-frame">
          <video
            className="about-video-slot"
            controls
            preload="metadata"
            poster={media.about.videoPoster}
          >
            <source src={media.about.video} type="video/mp4" />
          </video>
        </figure>

        */}
      </section>

      {/* ———————————————————————————————————————————————————————————————
          PARKED: the story, services, how-we-work, mission/vision and the
          closing CTA. Kept verbatim so the page can be put back as it was —
          delete the opening brace-star above this line and the closing
          star-brace below it, and uncomment the imports at the top of the
          file. The inner comments that used to sit between these sections
          are written as plain lines here, because a nested end-of-comment
          marker would close this block early and break the build.

          — the hero —

      <header className="container about-hero">
        <span className="card-kicker">{a.kicker}</span>
        <h1 className="page-title about-title">{a.title}</h1>
        <p className="about-lede">{a.lede}</p>
      </header>

          — the services we provide —

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

          — how we provide it: the same steps as Home, and the methods —

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

          — mission and vision —

      <section className="container about-purpose">
        {purposeIds.map((id) => (
          <article key={id} className={`about-purpose-panel about-purpose-${id}`}>
            <span className="card-kicker">{a[id].kicker}</span>
            <p className="about-purpose-statement">{a[id].statement}</p>
          </article>
        ))}
      </section>

          — the closing CTA. Its contact button is an anchor, not a route:
            the form sits at the foot of this same page. —

      <section className="container about-cta">
        <h2 className="about-section-title">{a.cta.heading}</h2>
        <p className="about-section-lede">{a.cta.body}</p>
        <div className="about-cta-actions">
          <a href="#contact" className="btn btn-primary">{a.cta.contact}</a>
          <WhatsAppButton className="btn btn-secondary">{a.cta.whatsapp}</WhatsAppButton>
        </div>
      </section>

          ——————————————————————————————————————————————————————————— */}

      {/* — the enquiry form, which used to be its own /contact page — */}
      <section id="contact" className="about-contact">
        <div className="container">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
