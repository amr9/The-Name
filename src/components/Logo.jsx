import './Logo.css';

export default function Logo({ size = 'md' }) {
  return (
    <span className={`logo logo-${size}`}>
      <span className="logo-ring">
        <span className="logo-dot" />
      </span>
      The Name
    </span>
  );
}
