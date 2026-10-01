import { useEffect, useRef, useState } from 'react';
import './ImagePlaceholder.css';

/**
 * An image slot. Pass `src` (usually from src/data/media.js) and the real
 * picture is shown; while that file doesn't exist yet — or fails to load —
 * it falls back to the dashed placeholder, so paths can be wired up before
 * the artwork lands.
 */
export default function ImagePlaceholder({ label, src, ratio = '4 / 3', className = '', loading = 'lazy' }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // A new src deserves a fresh attempt (e.g. the selected hotspot changes).
    setFailed(false);
    // Pages are PRE-RENDERED (scripts/prerender.mjs), so the <img> is in the
    // HTML and the browser starts loading it before React hydrates. A missing
    // file can fail in that gap, before onError is attached, and the event is
    // simply lost — leaving a broken-image icon instead of the dashed slot.
    // So check once React is in charge: complete with no pixels = it failed.
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  if (src && !failed) {
    return (
      <div className={`img-slot ${className}`} style={{ aspectRatio: ratio }}>
        {/* Lazy by DEFAULT, site-wide: an image is only fetched as it nears
            the viewport. A HERO must pass loading="eager" (Home, Events) —
            lazy-loading the first screen's picture delays the largest paint,
            which is the opposite of the point. */}
        <img ref={imgRef} src={src} alt={label || ''} loading={loading} decoding="async" onError={() => setFailed(true)} />
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
