import { useCallback, useEffect, useRef } from 'react';

// The history entry a viewer pushes on open (one key for every viewer: only
// one is ever open).
const HISTORY_KEY = 'modalViewer';

/**
 * A full-screen viewer as a modal <dialog> (FilmLightbox, GalleryLightbox):
 * call it with the dialog's ref and what to do once it has closed; it
 * returns `close`, the one way out every control should take.
 *
 * While it is open: the dialog is shown modal (the rest of the page inert),
 * the page cannot scroll behind it (and is put back where it was on close,
 * unless the width changed meanwhile — a phone turned to landscape reflows
 * the page, and past 760px the phone stage becomes plain rows), every film
 * on the page outside the dialog holds still (and plays on again after), and
 * the browser's back gesture closes it rather than leaving the page (one
 * history entry, pushed on open, keeping the router's own state so React
 * Router sees the same location).
 */
export default function useModalDialog(dialogRef, onClosed) {
  const onClosedRef = useRef(onClosed);
  onClosedRef.current = onClosed;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();

    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = 'hidden';
    const at = { y: window.scrollY, width: window.innerWidth };

    const held = [...document.querySelectorAll('video')].filter((v) => !dialog.contains(v) && !v.paused);
    held.forEach((v) => v.pause());

    if (!window.history.state?.[HISTORY_KEY]) {
      window.history.pushState({ ...window.history.state, [HISTORY_KEY]: true }, '');
    }
    const onPop = () => onClosedRef.current();
    window.addEventListener('popstate', onPop);

    return () => {
      window.removeEventListener('popstate', onPop);
      root.style.overflow = overflow;
      if (window.innerWidth === at.width) window.scrollTo({ top: at.y, behavior: 'instant' });
      held.forEach((v) => v.play().catch(() => {}));
      if (dialog.open) dialog.close();
    };
  }, [dialogRef]);

  // Every way out goes through history, so the entry pushed on open is
  // always taken back off (popstate then closes the viewer).
  return useCallback(() => {
    if (window.history.state?.[HISTORY_KEY]) window.history.back();
    else onClosedRef.current();
  }, []);
}
