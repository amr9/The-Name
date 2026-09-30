import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import scrollToElement from '../utils/scrollToElement.js';

// How long to let the new page's .page-enter fade run before starting the
// scroll to an anchored section. The animation is 260ms (theme.css); starting
// the scroll a little before it finishes reads as one continuous movement —
// the page arrives, then carries you down — rather than two separate beats.
const PAGE_ENTER_SETTLE_MS = 180;

/**
 * Puts every new page at the top — unless the link asked for a section.
 *
 * React Router keeps the window's scroll offset across navigations, so
 * following a link from the foot of one page drops you at that same offset
 * part-way down the next one. This resets it on each navigation; the fade is
 * the `.page-enter` class in theme.css, replayed by the key on <main>.
 *
 * With a hash — the navbar's policy menu linking to `/policies#privacy`, the
 * index on that page, the "#contact" button at the foot of About — the page is
 * opened at the top and then scrolled smoothly to the target, so the visitor
 * sees which page they landed on before being carried down it. Both the
 * pathname and the hash are watched, so jumping between sections of a page
 * already open works the same way.
 *
 * Every target needs `scroll-margin-top` clearing the sticky navbar, or it
 * lands underneath the bar. Policies.css sets it on the sections there.
 */
export default function useScrollToTop() {
  const { pathname, hash } = useLocation();
  // Whether this run is a page change or just a move within the page already
  // open, which decides where the scroll starts from below.
  const lastPathname = useRef(null);

  useEffect(() => {
    const changedPage = lastPathname.current !== pathname;
    lastPathname.current = pathname;

    // 'instant' is explicit rather than implied: it keeps a plain page change
    // a jump rather than a long animated scroll through the new page, even if
    // a global scroll-behavior is ever added to html.
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return undefined;
    }

    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    // A hash that matches nothing on this page is left alone rather than
    // forced to the top — the visitor may have arrived on a stale link, and
    // silently yanking them somewhere is worse than doing nothing.
    if (!target) return undefined;

    // Arriving from another page: put the new page at its top first, so the
    // visitor sees where they have landed and the scroll that follows reads as
    // travelling down this page rather than continuing the last one's offset.
    // Moving between sections of a page already open starts from where they
    // are, which is what makes it look like one continuous scroll.
    if (changedPage) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // The gap to leave above the heading is the target's own scroll-margin-top,
    // so the sticky navbar's height stays a CSS concern (Policies.css) rather
    // than being duplicated as a number here. utils/scrollToElement.js animates
    // it frame by frame — see the note there on why not scrollIntoView.
    const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;

    let cancelScroll = () => {};
    const id = window.setTimeout(() => {
      cancelScroll = scrollToElement(target, offset);
    }, PAGE_ENTER_SETTLE_MS);

    return () => {
      window.clearTimeout(id);
      cancelScroll();
    };
  }, [pathname, hash]);
}
