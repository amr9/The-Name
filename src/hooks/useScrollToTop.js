import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Puts every new page at the top.
 *
 * React Router keeps the window's scroll offset across navigations, so
 * following a link from the foot of one page drops you at that same offset
 * part-way down the next one. This resets it on each navigation; the fade is
 * the `.page-enter` class in theme.css, replayed by the key on <main>.
 *
 * Only the PATHNAME is watched. An in-page anchor — the "#contact" button at
 * the foot of About — changes the hash and not the path, and must be left
 * alone: forcing the top there would undo the jump the visitor just asked for.
 */
export default function useScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // An in-page anchor is the browser's job, not ours.
    if (hash) return;
    // 'instant' is explicit rather than implied: today only .carousel-track
    // sets scroll-behavior: smooth, but if a global smooth scroll is ever
    // added to html this keeps the page change a jump rather than a long
    // animated scroll through the new page's content.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);
}
