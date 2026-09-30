import { media } from '../data/media.js';
import { site } from '../data/site.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

// The "From The Name, to your Name" tagline as finished artwork — the
// lettering from public/media/brand/, not live type. Used as the Home hero
// title and on the About page's tagline card, so both show the same art.
// It is artwork, so it is the same in every language; the alt text is the
// only translated part, built from i18n about.tagline around the brand name.
// Sizing is the caller's job, through `className`.
export default function TaglineArt({ className = '' }) {
  const { t } = useLanguage();
  const { fromPrefix, to } = t.about.tagline;

  return (
    <img
      src={media.brand.tagline}
      alt={`${fromPrefix} ${site.name} ${to}`}
      width="951"
      height="376"
      className={`tagline-art ${className}`.trim()}
    />
  );
}
