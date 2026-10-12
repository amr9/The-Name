// The "→" after a call to action — Home's buttons, the pillar rows, the
// Brands page. Decorative, so hidden from screen readers; mirrored under RTL
// by .cta-arrow in theme.css.
export default function Arrow() {
  return <span className="cta-arrow" aria-hidden="true">→</span>;
}
