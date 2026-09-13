import ImagePlaceholder from '../ImagePlaceholder.jsx';
import './OverlayCard.css';

// The arrow for a card whose action is a plain link. OverlayCard.css tilts it
// on hover and mirrors it in RTL.
export function OverlayCardArrow() {
  return (
    <svg className="overlay-card-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/**
 * Frosted-overlay card, shared by the Shop catalogue and the Cafe menu. The
 * photo fills the card (3:4), `chips` float over its top edge, and `kicker` /
 * `title` / `meta` sit on a glass panel beside `action` — a link or button
 * holding a single icon and an aria-label, drawn as the round yellow button.
 */
export default function OverlayCard({ className = '', image, imageLabel, chips = [], kicker, title, meta, action }) {
  return (
    <div className={`overlay-card ${className}`}>
      <ImagePlaceholder className="washed overlay-card-image" src={image} label={imageLabel ?? title} ratio="3 / 4" />

      {chips.length > 0 && (
        <div className="overlay-card-top">
          {chips.map((chip, i) => (
            <span key={i} className="overlay-card-chip">{chip}</span>
          ))}
        </div>
      )}

      <div className="overlay-card-panel">
        <div className="overlay-card-text">
          {kicker && <span className="overlay-card-kicker">{kicker}</span>}
          <h3 className="card-title overlay-card-title">{title}</h3>
          {meta && <span className="overlay-card-meta">{meta}</span>}
        </div>
        {action && <span className="overlay-card-action">{action}</span>}
      </div>
    </div>
  );
}
