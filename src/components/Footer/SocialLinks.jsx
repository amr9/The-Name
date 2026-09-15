import { socials } from '../../data/site.js';
import './SocialLinks.css';

// Outline glyphs, matching the stroke style used by the rest of the site's
// icons. Keyed by the `key` field in data/site.js -> socials.
const ICONS = {
  instagram: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <path d="M17.6 6.4h.01" />
    </>
  ),
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  tiktok: <path d="M9.5 13.2a3.9 3.9 0 1 0 3.9 3.9V2.8c.6 2.9 2.9 5 5.8 5.2" />,
};

export default function SocialLinks() {
  return (
    <div className="social-links">
      {socials.map((s) => (
        <a
          key={s.key}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label={s.label}
          title={s.label}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {ICONS[s.key]}
          </svg>
        </a>
      ))}
    </div>
  );
}
