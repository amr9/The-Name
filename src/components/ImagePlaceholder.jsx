import { useEffect, useState } from 'react';
import './ImagePlaceholder.css';

/**
 * An image slot. Pass `src` (usually from src/data/media.js) and the real
 * picture is shown; while that file doesn't exist yet — or fails to load —
 * it falls back to the dashed placeholder, so paths can be wired up before
 * the artwork lands.
 */
export default function ImagePlaceholder({ label, src, ratio = '4 / 3', className = '' }) {
  const [failed, setFailed] = useState(false);

  // A new src deserves a fresh attempt (e.g. the selected hotspot changes).
  useEffect(() => { setFailed(false); }, [src]);

  if (src && !failed) {
    return (
      <div className={`img-slot ${className}`} style={{ aspectRatio: ratio }}>
        <img src={src} alt={label || ''} onError={() => setFailed(true)} />
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
