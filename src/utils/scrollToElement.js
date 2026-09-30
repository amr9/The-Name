/**
 * Scrolls the page to an element, animating it ourselves.
 *
 * `scrollIntoView({ behavior: 'smooth' })` is the obvious way to do this and is
 * what this replaced. It was dropped because the browser is allowed to abandon
 * a native scroll animation — a background or unfocused tab, an interrupting
 * scroll, some window states — and when it does, it abandons it silently and
 * part-way. Measured on this page: an instant scrollIntoView landed correctly
 * at 5775px, the smooth one moved 39px and stopped. The visitor is then left
 * at the top of a long page with nothing having happened, which is a worse
 * outcome than not animating at all.
 *
 * Driving the animation from requestAnimationFrame means each frame is an
 * ordinary instant scroll, so nothing can cancel it but us — and the last
 * frame always sets the exact target.
 */

// Long pages should not mean long journeys: the duration grows with distance
// but flattens out, so a jump to the foot of the policies page still lands in
// well under a second.
const MIN_MS = 380;
const MAX_MS = 820;
const MS_PER_PX = 0.22;

// Slow at both ends, quick through the middle — the shape a native smooth
// scroll uses, and the one that reads as "carried there" rather than "fired".
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

/**
 * @param {Element} target element to bring to the top of the viewport
 * @param {number} offset px to leave above it — the sticky navbar's height
 * @returns {() => void} cancels the animation if it is still running
 */
export default function scrollToElement(target, offset = 0) {
  const to = Math.max(
    0,
    Math.min(
      window.scrollY + target.getBoundingClientRect().top - offset,
      document.documentElement.scrollHeight - window.innerHeight,
    ),
  );
  const from = window.scrollY;
  const distance = to - from;

  if (prefersReducedMotion() || Math.abs(distance) < 2) {
    window.scrollTo({ top: to, left: 0, behavior: 'instant' });
    return () => {};
  }

  const duration = Math.min(MAX_MS, Math.max(MIN_MS, Math.abs(distance) * MS_PER_PX));
  const start = performance.now();
  let frame = 0;
  let cancelled = false;

  const stop = () => {
    if (cancelled) return;
    cancelled = true;
    cancelAnimationFrame(frame);
    window.removeEventListener('wheel', stop, { passive: true });
    window.removeEventListener('touchstart', stop, { passive: true });
    window.removeEventListener('keydown', stop);
  };

  // Touching the wheel, the screen or the keyboard hands control straight back:
  // an animation that fights the visitor for the scrollbar is worse than none.
  window.addEventListener('wheel', stop, { passive: true });
  window.addEventListener('touchstart', stop, { passive: true });
  window.addEventListener('keydown', stop);

  const step = (now) => {
    if (cancelled) return;
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo({ top: from + distance * easeInOutCubic(t), left: 0, behavior: 'instant' });
    if (t < 1) frame = requestAnimationFrame(step);
    else stop();
  };
  frame = requestAnimationFrame(step);

  return stop;
}
