import { stepCarousel } from '../utils/carousel.js';
import './CarouselButtons.css';

export default function CarouselButtons({ trackRef, prevLabel = 'Previous', nextLabel = 'More' }) {
  return (
    <span className="carousel-buttons">
      <button
        type="button"
        className="btn btn-secondary carousel-btn"
        aria-label={prevLabel}
        onClick={() => trackRef.current && stepCarousel(trackRef.current, -1)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        className="btn btn-secondary carousel-btn"
        aria-label={nextLabel}
        onClick={() => trackRef.current && stepCarousel(trackRef.current, 1)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </span>
  );
}
