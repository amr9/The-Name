import './ImagePlaceholder.css';

/**
 * Stand-in for a real photograph. Swap the `src` prop in for an actual
 * image URL/import once you have photography — the component then just
 * renders that image instead of the placeholder box.
 */
export default function ImagePlaceholder({ label, src, ratio = '4 / 3', className = '' }) {
  if (src) {
    return (
      <div className={`img-slot ${className}`} style={{ aspectRatio: ratio }}>
        <img src={src} alt={label || ''} />
      </div>
    );
  }
  return (
    <div className={`img-slot img-slot-empty ${className}`} style={{ aspectRatio: ratio }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      {label && <span className="img-slot-label">{label}</span>}
    </div>
  );
}
