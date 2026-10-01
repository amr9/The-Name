import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

/**
 * Fades each page section in as it scrolls into view — site-wide, so no page
 * has to opt in.
 *
 * Every TOP-LEVEL <section> and <header> inside <main> is a candidate (one
 * nested in another section rides along with its parent rather than fading
 * twice). Anything already on screen when it is found is left alone: the page
 * itself is already fading in through .page-enter, and hiding the first screen
 * to fade it again would only make the page feel slower. The rest get
 * `.reveal` (opacity 0) and then `.reveal-in` once they enter the viewport;
 * the transition is in theme.css.
 *
 * It is OPACITY ONLY, no slide. A transform would shift what
 * useScrollToTop measures for a #hash jump and make the page land short, and
 * it would also turn each section into a containing block for anything
 * position: fixed inside it.
 *
 * Pages are lazy-loaded (App.jsx), so a page's sections can arrive after this
 * effect has run; a MutationObserver picks them up as they mount. Nothing is
 * hidden without JS — the classes are only ever added here.
 */
export default function useSectionReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main || prefersReducedMotion() || !('IntersectionObserver' in window)) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('reveal-in');
          io.unobserve(e.target);
        });
      },
      // Starts a little before the section's top edge is fully in, so the
      // fade is under way as it arrives rather than after.
      { rootMargin: '0px 0px -8% 0px' },
    );

    const seen = new WeakSet();
    const scan = () => {
      main.querySelectorAll('section, header').forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (el.parentElement?.closest('section, header')) return;
        if (el.getBoundingClientRect().top < window.innerHeight) return;
        el.classList.add('reveal');
        io.observe(el);
      });
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(main, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);
}
