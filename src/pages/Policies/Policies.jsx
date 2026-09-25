import { Link } from 'react-router-dom';
import { site } from '../../data/site.js';
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

      {/* The same three destinations as the footer's policy list, for anyone
          who arrived here by another route. */}
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

      {/* This page carries no contact block of its own; three clauses above
          point at "our About page", and this is the link that makes that
          followable. It is the only route from the terms to the registered
          entity and the two addresses — do not drop it. */}
      <p className="policies-contact-note">
        {p.contactNote}{' '}
        <Link to="/about#contact">{p.contactNoteLink}</Link>
      </p>
    </div>
  );
}
