import { useRef } from 'react';
import { stepCarousel } from '../utils/carousel.js';
import './Carousel.css';

// Single chevron asset — the "next" arrow and both RTL variants are rotations
// of it, handled in Carousel.css rather than duplicating the SVG.
function Chevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

// A horizontally scrolling card track with its own prev/next arrows sitting
// against the left and right edges of the items. Owns the track ref so pages
// only have to supply the cards.
export default function Carousel({ children, prevLabel, nextLabel }) {
  const trackRef = useRef(null);
  const step = (dir) => {
    if (trackRef.current) stepCarousel(trackRef.current, dir);
  };

  return (
    <div className="carousel">
      <button
        type="button"
        className="carousel-arrow carousel-arrow-prev"
        aria-label={prevLabel}
        onClick={() => step(-1)}
      >
        <Chevron />
      </button>

      <div ref={trackRef} className="carousel-track">
        {children}
      </div>

      <button
        type="button"
        className="carousel-arrow carousel-arrow-next"
        aria-label={nextLabel}
        onClick={() => step(1)}
      >
        <Chevron />
      </button>
    </div>
  );
}
