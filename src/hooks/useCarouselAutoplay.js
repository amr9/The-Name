import { useEffect } from 'react';
import { stepCarousel } from '../utils/carousel.js';

// Advances every on-screen `.carousel-track` one card every 4.2s, unless
// the pointer is hovering it. Mirrors the original site's autoplay.
export default function useCarouselAutoplay() {
  useEffect(() => {
    const id = setInterval(() => {
      document.querySelectorAll('.carousel-track').forEach((el) => {
        if (!el.matches(':hover')) stepCarousel(el, 1);
      });
    }, 4200);
    return () => clearInterval(id);
  }, []);
}
