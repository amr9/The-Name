import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import scrollToElement from '../../utils/scrollToElement.js';
import './BackToTop.css';

// Show once the visitor is a fifth of the way down. Measured against the
// SCROLLABLE distance, not the document height — on a page barely taller than
// the viewport, 20% of the document could be further than you can scroll, and
// the button would never appear.
const SHOW_AFTER = 0.2;

/**
 * The floating "back to the top" button, rendered once in App.jsx and therefore
 * on every page — no page implements its own.
 *
 * It sits directly above the chat launcher in the bottom-right corner and
 * slides in from the right edge.
 *
 * The scroll handler deliberately does NOT throttle through requestAnimationFrame.
 * The obvious "skip if a frame is already pending" gate deadlocks whenever a
 * frame never arrives — a backgrounded tab, a throttled renderer — because the
 * pending flag is only ever cleared by the callback, so every later scroll is
 * ignored and the button sticks in whatever state it was last in (observed).
 * Instead the threshold is measured once and cached, leaving the handler to
 * read `scrollY` alone: a cheap property read that forces no layout, so it is
 * fine to run on every event.
 */
export default function BackToTop() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  // Scroll offset past which the button shows, in px. Recomputed only when the
  // page's height or the viewport changes, never while scrolling.
  const threshold = useRef(Infinity);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > threshold.current);

    const remeasure = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      // A page that does not scroll has no "top" to go back to: an unreachable
      // threshold keeps the button away rather than special-casing it below.
      threshold.current = scrollable > 0 ? scrollable * SHOW_AFTER : Infinity;
      update();
    };

    remeasure();
    window.addEventListener('scroll', update, { passive: true });
    // Catches everything that changes the threshold: a route change swapping
    // the page under us, images finishing, a filter collapsing a grid, the
    // window being resized. Cheaper and more reliable than watching the router.
    const observer = new ResizeObserver(remeasure);
    observer.observe(document.documentElement);
    window.addEventListener('resize', remeasure, { passive: true });

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', remeasure);
      observer.disconnect();
    };
  }, []);

  return (
    <button
      type="button"
      className="back-to-top"
      data-visible={visible}
      // Out of the tab order and hidden from screen readers while it is off
      // screen — it stays in the DOM so the slide can be animated.
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={() => scrollToElement(document.body, 0)}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
      <span className="back-to-top-label">{t.common.backToTop}</span>
    </button>
  );
}
