import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useModalDialog from '../../hooks/useModalDialog.js';
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
 * While it is open (hooks/useModalDialog): the page cannot scroll behind it,
 * every other film on the page holds still, and the browser's back gesture
 * closes it rather than leaving the page. Closes with the × button, Escape,
 * back, or a tap outside the film.
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

function Viewer({ src, poster, label, inline, closeLabel, onClosed }) {
  const dialogRef = useRef(null);
  const videoRef = useRef(null);
  // The modal itself — scroll lock, the other films held, the back gesture:
  // hooks/useModalDialog, shared with GalleryLightbox.
  const close = useModalDialog(dialogRef, onClosed);

  useEffect(() => {
    const video = videoRef.current;
    // Same frame as the inline film. Set before the file has loaded, the
    // time is kept as the start position and applied once it has.
    if (inline?.currentTime) video.currentTime = inline.currentTime;
    // play() rejects if the browser refuses (data saver) — the poster stays.
    video.play().catch(() => {});
    // ...and back: the inline film resumes from the viewer's frame.
    return () => {
      if (inline && video.readyState > 0) inline.currentTime = video.currentTime;
    };
  }, []);

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
