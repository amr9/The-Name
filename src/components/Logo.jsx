import './Logo.css';

// `tone` picks the mark's colour: 'accent' (default) for light backgrounds,
// 'dark' for the yellow footer where the accent ring would disappear.
export default function Logo({ size = 'md', tone = 'accent' }) {
  return (
    <span className={`logo logo-${size} logo-tone-${tone}`}>
      <span className="logo-ring">
        <span className="logo-dot" />
      </span>
      The Name
    </span>
  );
}
