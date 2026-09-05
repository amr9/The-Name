import './Logo.css';

/**
 * Text lock-up standing in for the real logo mark. Replace with an
 * <img src="/logo.svg" .../> once you export the actual logo assets from
 * the brand guideline.
 */
export default function Logo({ dark = false }) {
  return (
    <span className={`logo ${dark ? 'logo-dark' : ''}`}>
      <span className="logo-name">The Name</span>
      <span className="logo-tagline">Your Social Hub</span>
    </span>
  );
}
