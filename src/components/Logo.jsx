import { media } from '../data/media.js';
import { site } from '../data/site.js';
import './Logo.css';

// The brand lockup, from the artwork in public/media/brand/. `on` names the
// ground the logo sits on, so its ink always contrasts with it: 'light'
// grounds (the navbar) get the charcoal artwork, 'dark' grounds (the footer)
// the yellow. On phones the wide main lockup gives way to the compact
// secondary one (the N beside the tagline).
export default function Logo({ size = 'md', on = 'light' }) {
  const ink = on === 'dark' ? media.brand.logos.yellow : media.brand.logos.dark;

  return (
    <picture className={`logo logo-${size}`}>
      <source media="(max-width: 480px)" srcSet={ink.secondary} />
      <img src={ink.main} alt={site.name} />
    </picture>
  );
}
