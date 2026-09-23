import ContactForm from '../../components/ContactForm/ContactForm.jsx';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import Logo from '../../components/Logo.jsx';
import { media } from '../../data/media.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { storyChapters, takeovers } from './data.js';
import './About.css';

// The services / how-we-work / mission / closing-CTA block further down is
// PARKED (see the big comment in the markup). These imports belong to that
// parked markup — uncomment them along with it.
// import { Link } from 'react-router-dom';
// import VideoPlaceholder from '../../components/VideoPlaceholder/VideoPlaceholder.jsx';
// import ProcessSteps from '../../components/ProcessSteps/ProcessSteps.jsx';
// import WhatsAppButton from '../../components/WhatsAppButton.jsx';
// import { brands } from '../../data/brands.js';
// import { aboutServices, purposeIds } from './data.js';

export default function About() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <div className="about-page">
      {/* — the hero — */}
      <header className="container about-hero">
        <span className="card-kicker">{a.kicker}</span>
        <h1 className="page-title about-title">{a.title}</h1>
        <p className="about-lede">{a.lede}</p>
        <p className="about-hero-support">{a.heroSupport}</p>
      </header>

      {/* — the timeline: 1990 → the evolution → today. One <article> per
          chapter, alternating sides on wide screens (CSS does the swap on
          :nth-child(even), so the markup stays in reading order). — */}
      <section className="container about-story">
        {storyChapters.map((id) => {
          const c = a.story[id];
          return (
            <article key={id} className="about-chapter">
              <div className="about-chapter-copy">
                <span className="card-kicker">{c.era}</span>
                <h2 className="about-chapter-headline">{c.headline}</h2>
                <p className="about-chapter-body">{c.body}</p>
                {c.closing && <p className="about-chapter-closing">{c.closing}</p>}
              </div>
              <ImagePlaceholder
                src={media.about.story[id]}
                label={c.placeholder}
                ratio="4 / 3"
                className="about-chapter-media"
              />
            </article>
          );
        })}
      </section>

      {/* — the philosophy: the tagline, on a raised card rather than a
          full-bleed band, so it reads as the page's one pull-quote. The
          first line ends on the brand lockup standing in for the name
          itself, exactly as the Home hero does — it is the brand, so it is
          artwork rather than translated copy, and `fromPrefix` is only the
          word in front of it (the lockup reads "THE NAME", article
          included). `compact={false}` keeps the full wordmark on phones;
          the secondary N alone would leave the line reading "From N". — */}
      <section className="container about-tagline">
        <div className="about-tagline-card elev-md">
          <p className="about-tagline-lines">
            <span className="about-tagline-from">
              {a.tagline.fromPrefix} <Logo size="inline" compact={false} />
            </span>
            <span className="about-tagline-to">{a.tagline.to}</span>
          </p>
          <div className="about-tagline-copy">
            <p className="about-tagline-lede">{a.tagline.lede}</p>
            <p className="about-tagline-body">{a.tagline.body}</p>
          </div>
        </div>
      </section>

      {/* — the takeovers: THE NAME → someone else's name. The names are
          proper nouns, so they come from data.js, not i18n. — */}
      <section className="container about-takeover">
        <h2 className="about-section-title">{a.takeover.headline}</h2>
        <p className="about-section-lede">{a.takeover.body}</p>

        <ul className="about-takeover-grid">
          {takeovers.map((tk) => (
            <li key={tk.id} className="about-takeover-card">
              <ImagePlaceholder
                src={media.about.takeovers[tk.id]}
                label={`The Name × ${tk.name}`}
                ratio="3 / 4"
                className="about-takeover-media"
              />
              <p className="about-takeover-name">
                The Name <span aria-hidden="true">→</span> <strong>{tk.name}</strong>
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* — who we have built it with — */}
      <section className="about-collab">
        <div className="container">
          <span className="card-kicker">{a.collab.era}</span>
          <h2 className="about-section-title">{a.collab.headline}</h2>
          <p className="about-section-lede">{a.collab.body}</p>
        </div>
      </section>

      {/* — where it goes next, and the line the page closes on — */}
      <section className="container about-future">
        <span className="card-kicker">{a.future.era}</span>
        <h2 className="about-section-title">{a.future.headline}</h2>
        <p className="about-section-lede">{a.future.body}</p>
        <p className="about-future-closing">{a.future.closing}</p>
      </section>

      {/* ———————————————————————————————————————————————————————————————
          PARKED: the brand film ("Watch the story"), the services,
          how-we-work, mission/vision and the closing CTA. The film is held
          back until it is delivered; the rest is kept verbatim so the page
          can be put back as it was. Restoring any of it is deleting the
          comment markers around it and uncommenting the imports at the top
          of the file. The inner comments are written as plain dashed lines,
          because a nested end-of-comment marker would close this block
          early and break the build.

          — the brand film. <VideoPlaceholder> (components/VideoPlaceholder/)
            shows the poster if there is one and the dashed slot if not, with
            a play badge over it — the same frame the Kids activation uses,
            which is why it is a component. Restore this ABOVE the hero, and
            add its import at the top of the file. —

      <section className="container about-video">
        <span className="card-kicker">{a.video.kicker}</span>
        <h1 className="page-title about-video-title">{a.video.title}</h1>
        <p className="about-video-lede">{a.video.lede}</p>

        <VideoPlaceholder
          poster={media.about.videoPoster}
          label={a.video.placeholder}
        />
      </section>

            To go live: save the film as public/media/about/about-video.mp4
            (and a still as about-video-poster.jpg), then use this figure in
            place of the <VideoPlaceholder> above. Note the page's <h1> would
            move back to the film, so drop it from the hero at the same time.

        <figure className="video-frame">
          <video
            className="video-slot"
            controls
            preload="metadata"
            poster={media.about.videoPoster}
          >
            <source src={media.about.video} type="video/mp4" />
          </video>
        </figure>

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
