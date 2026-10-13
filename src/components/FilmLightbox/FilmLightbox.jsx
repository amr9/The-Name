import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './FilmLightbox.css';

/**
 * Tap a film to watch it full-screen.
 *
 * Renders a `.film-expand` button that covers its positioned parent (the
 * film's frame) with an expand badge in the corner. The button is HIDDEN by
 * default — the host's CSS decides where it shows (PillarRows.css: on the
 * phone stage only). The film itself stays an AutoplayVideo, GIF-like and
 * deaf to clicks; this button is what takes the tap.
 *
 * Opening shows a viewer with its OWN <video> — a modal <dialog> portalled
 * to <body>, outside whatever the film sits in. Not the Fullscreen API on the
 * inline video: going full-screen resizes the page, and on the scroll-driven
 * phone stage that re-measured the stage, scrolled it to the previous row and
 * left the film hidden and paused (the row it belonged to was no longer the
 * active one). Portalled for the same reason — a dialog inside a row would
 * inherit the row's `inert` and `visibility` when the stage moves on.
 *
 * While it is open: the page cannot scroll behind it (and is put back where
 * it was on close, even if the phone was turned meanwhile), every other film on
 * the page holds still (and plays on again after), and the browser's back
 * gesture closes it rather than leaving the page (one history entry, pushed
 * on open). Closes with the × button, Escape, back, or a tap outside the film.
 * Focus returns to the button.
 *
 * It picks up where the film on the page is: the viewer starts at the inline
 * film's current time (the <video> sharing the button's parent), and on close
 * the inline film carries on from wherever the viewer stopped — one film,
 * shown larger, not a restart.
 */
export default function FilmLightbox({ src, poster, label }) {
  const { t } = useLanguage();
  // The inline film beside the button, while the viewer is open.
  const [inline, setInline] = useState(null);
  const open = inline !== null;
  const triggerRef = useRef(null);

  // Focus goes back to the button once the viewer is GONE — while the
  // modal is still up the rest of the page is inert and refuses it. Two
  // frames later, so a stage that the restored scroll moves back to this
  // film's row has made the row active (and focusable) again.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !open) {
      requestAnimationFrame(() => requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true })));
    }
    wasOpen.current = open;
  }, [open]);
  const closed = () => setInline(null);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="film-expand"
        aria-label={t.common.watchFilm(label)}
        aria-haspopup="dialog"
        onClick={() => setInline(triggerRef.current.parentElement.querySelector('video') ?? undefined)}
      >
        <span className="film-expand-badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </span>
      </button>
      {open && createPortal(
        <Viewer src={src} poster={poster} label={label} inline={inline} closeLabel={t.common.closeFilm} onClosed={closed} />,
        document.body,
      )}
    </>
  );
}

const HISTORY_KEY = 'filmLightbox';

function Viewer({ src, poster, label, inline, closeLabel, onClosed }) {
  const dialogRef = useRef(null);
  const videoRef = useRef(null);
  const onClosedRef = useRef(onClosed);
  onClosedRef.current = onClosed;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();

    // The page holds still behind the viewer. A visitor may well turn the
    // phone to watch, which reflows the page under it (past 760px the phone
    // stage becomes plain rows), so the scroll position is put back on close
    // whenever the width is the one it was opened at.
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = 'hidden';
    const at = { y: window.scrollY, width: window.innerWidth };

    const video = videoRef.current;
    const held = [...document.querySelectorAll('video')].filter((v) => v !== video && !v.paused);
    held.forEach((v) => v.pause());
    // Same frame as the inline film. Set before the file has loaded, the
    // time is kept as the start position and applied once it has.
    if (inline?.currentTime) video.currentTime = inline.currentTime;
    // play() rejects if the browser refuses (data saver) — the poster stays.
    video.play().catch(() => {});

    // Keeps the router's own state (key, idx), so React Router sees the
    // same location; only the back gesture notices the extra entry.
    if (!window.history.state?.[HISTORY_KEY]) {
      window.history.pushState({ ...window.history.state, [HISTORY_KEY]: true }, '');
    }
    const onPop = () => onClosedRef.current();
    window.addEventListener('popstate', onPop);

    return () => {
      window.removeEventListener('popstate', onPop);
      root.style.overflow = overflow;
      if (window.innerWidth === at.width) window.scrollTo({ top: at.y, behavior: 'instant' });
      // ...and back: the inline film resumes from the viewer's frame.
      if (inline && video.readyState > 0) inline.currentTime = video.currentTime;
      held.forEach((v) => v.play().catch(() => {}));
      if (dialog.open) dialog.close();
    };
  }, []);

  // Every way out goes through history, so the entry pushed on open is
  // always taken back off (popstate then closes the viewer).
  const close = () => {
    if (window.history.state?.[HISTORY_KEY]) window.history.back();
    else onClosedRef.current();
  };

  return (
    <dialog
      ref={dialogRef}
      className="film-lightbox"
      aria-label={label}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      // The video is sized to the film, so a tap on the black around it
      // lands on the dialog itself.
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <video
        ref={videoRef}
        className="film-lightbox-video"
        src={src}
        // A poster is the film's FIRST frame; starting mid-film it would
        // flash before the jump, so there it is black until the frame is in.
        poster={inline?.currentTime ? undefined : poster}
        muted
        loop
        playsInline
        controls
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload nofullscreen noremoteplayback"
        onContextMenu={(e) => e.preventDefault()}
      />
      <button type="button" className="film-lightbox-close" aria-label={closeLabel} onClick={close}>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </dialog>
  );
}
