import { Link } from 'react-router-dom';
import { site, waLink } from '../../data/site.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { policyDocs } from './data.js';
import './Policies.css';

// The entity details live in data/site.js and are dropped into the copy at
// render time, so the legal name, licence and address are written once. A
// token with no matching field is left as-is rather than blanked, so a typo in
// a translation shows up on the page instead of silently deleting a clause.
const FIELDS = {
  legalName: site.legalName,
  licensedBy: site.licensedBy,
  address: site.address,
  name: site.name,
};

function fill(text) {
  return text.replace(/\{(\w+)\}/g, (token, key) => FIELDS[key] ?? token);
}

// A block is either a paragraph (a string) or a bulleted list ({ list: [...] }).
function Block({ block }) {
  if (typeof block === 'string') return <p className="policies-p">{fill(block)}</p>;
  return (
    <ul className="policies-list">
      {block.list.map((item) => (
        <li key={item}>{fill(item)}</li>
      ))}
    </ul>
  );
}

export default function Policies() {
  const { t } = useLanguage();
  const p = t.policies;

  return (
    <div className="container policies-page">
      <header id="top" className="policies-header">
        <span className="card-kicker">{p.kicker}</span>
        <h1 className="page-title policies-title">{p.title}</h1>
        <p className="policies-lede">{p.lede}</p>
        <p className="policies-updated">{p.updated}</p>
      </header>

      {/* The same three destinations as the navbar's hover menu, for anyone
          who arrived here without using it — and for phones, where a hover
          menu is not reachable at all. */}
      <nav className="policies-toc" aria-label={p.tocHeading}>
        <h2 className="policies-toc-heading">{p.tocHeading}</h2>
        <ul className="policies-toc-list">
          {policyDocs.map((doc) => (
            <li key={doc.id}>
              <Link className="policies-toc-link" to={`/policies#${doc.id}`}>
                {p.docs[doc.id].title}
              </Link>
            </li>
          ))}
          <li>
            <Link className="policies-toc-link" to="/policies#contact">{p.contact.heading}</Link>
          </li>
        </ul>
      </nav>

      {policyDocs.map((doc) => {
        const copy = p.docs[doc.id];
        return (
          // .scroll-anchor is what keeps the heading clear of the sticky
          // navbar when the hover menu jumps to it — see theme.css.
          <section key={doc.id} id={doc.id} className="scroll-anchor policies-doc">
            <h2 className="policies-doc-title">{copy.title}</h2>

            <div className="policies-doc-intro">
              {copy.intro.map((line) => (
                <p key={line} className="policies-p">{fill(line)}</p>
              ))}
            </div>

            <ol className="policies-sections">
              {doc.sections.map((sectionId) => {
                const section = copy.sections[sectionId];
                // A section id in data.js with no copy behind it is skipped
                // rather than rendered as an empty numbered item.
                if (!section) return null;
                return (
                  <li key={sectionId} id={`${doc.id}-${sectionId}`} className="scroll-anchor policies-section">
                    <h3 className="policies-section-heading">{section.heading}</h3>
                    {section.blocks.map((block, i) => (
                      <Block key={i} block={block} />
                    ))}
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}

      {/* One contact block for all three documents, rather than the three
          near-identical "Contact Us" clauses they each ended with. */}
      <section id="contact" className="scroll-anchor policies-contact">
        <h2 className="policies-doc-title">{p.contact.heading}</h2>
        <p className="policies-lede">{p.contact.lede}</p>

        <p className="policies-contact-entity">
          <strong>{site.legalName}</strong>
          <span>{site.address}</span>
          <span>{p.contact.licenceLabel}: {site.licensedBy}</span>
        </p>

        <div className="policies-contact-grid">
          <div className="card elev-sm policies-contact-card">
            <h3 className="card-title">{p.contact.ordersHeading}</h3>
            <dl className="policies-contact-list">
              <dt>{p.contact.emailLabel}</dt>
              <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
              <dt>{p.contact.phoneLabel}</dt>
              <dd>
                <a href={waLink} target="_blank" rel="noopener noreferrer">
                  <bdi dir="ltr">{site.phone}</bdi>
                </a>
              </dd>
            </dl>
          </div>

          <div className="card elev-sm policies-contact-card">
            <h3 className="card-title">{p.contact.privacyHeading}</h3>
            <dl className="policies-contact-list">
              <dt>{p.contact.emailLabel}</dt>
              <dd><a href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a></dd>
            </dl>
          </div>
        </div>

        <Link className="policies-top-link" to="/policies#top">{p.backToTop}</Link>
      </section>
    </div>
  );
}
