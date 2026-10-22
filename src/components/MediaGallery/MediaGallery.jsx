import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import AutoplayVideo from '../AutoplayVideo.jsx';
import ImagePlaceholder from '../ImagePlaceholder.jsx';
import useModalDialog from '../../hooks/useModalDialog.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
// the viewer's black full-screen shell and × are FilmLightbox's
import '../FilmLightbox/FilmLightbox.css';
import './MediaGallery.css';

// useLayoutEffect warns when React renders on the server (the pre-render).
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// An item: a src, or { src, label?, poster?, video?, href?, linkLabel? }.
// Shared with ServicePage (its phone strip and stage).
export const galleryItem = (item) => (typeof item === 'string' ? { src: item } : item);

/**
 * A group of pictures (and films) in ONE box, side by side, a thin gold
 * separator between each two (the desktop rows of Home's "What we do" and
 * of every "What we do" page, via ServicePage's ServiceRows).
 *
 * The box is as wide as its host makes it and shows as many of the group as
 * fit — each needs at least --gallery-item-min (MediaGallery.css) — so a
 * wider box takes in more of them; the rest wrap onto a second line that the
 * box clips away. The ones clipped away are also made inert (measured after
 * layout and on every resize), so the keyboard never lands on them.
 *
 * Hovering a picture pops it up a little. Clicking one opens the
 * GalleryLightbox below at that picture: the WHOLE group, one after another,
 * in a carousel. An item with `href` is a link instead (new tab; Brands: its
 * catalogue).
 */
export default function MediaGallery({ items, label }) {
  const { t } = useLanguage();
  const boxRef = useRef(null);
  const [open, setOpen] = useState(null);
  const list = items.map(galleryItem);

  // Which cells made it onto the first line: the rest are clipped away.
  useIsoLayoutEffect(() => {
    const box = boxRef.current;
    const mark = () => {
      const kids = [...box.children];
      const top = kids[0]?.offsetTop ?? 0;
      kids.forEach((el) => {
        const off = el.offsetTop > top;
        el.toggleAttribute('inert', off);
        el.toggleAttribute('data-off', off);
      });
    };
    mark();
    const ro = new ResizeObserver(mark);
    ro.observe(box);
    return () => ro.disconnect();
  }, [items]);

  return (
    <>
      <div className="media-gallery" ref={boxRef}>
        {list.map((it, i) => {
          const name = it.label || label;
          const content = it.video ? (
            <AutoplayVideo className="media-gallery-media" src={it.src} poster={it.poster} label={name} />
          ) : (
            <ImagePlaceholder className="media-gallery-media" src={it.src} label={name} ratio="auto" />
          );
          // Each item sits in a CELL: the flex item, which carries the
          // separator line and stays put while the item inside pops up.
          return (
            <div key={it.src} className="media-gallery-cell">
              {it.href ? (
                <a
                  className="media-gallery-item"
                  href={it.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={it.linkLabel}
                >
                  {content}
                </a>
              ) : (
                <button
                  type="button"
                  className="media-gallery-item"
                  aria-haspopup="dialog"
                  aria-label={t.common.viewPictures(name, i + 1, list.length)}
                  // its place among the items the viewer shows (no links)
                  onClick={() => setOpen(list.slice(0, i).filter((x) => !x.href).length)}
                >
                  {content}
                </button>
              )}
            </div>
          );
        })}
      </div>
      {open !== null && createPortal(
        <GalleryLightbox items={list.filter((it) => !it.href)} start={open} label={label} onClosed={() => setOpen(null)} />,
        document.body,
      )}
    </>
  );
}

// The viewer — exported: the phone stage (ServicePage's ServiceList) opens
// it too, on a tap on its backdrop. A modal <dialog> (hooks/useModalDialog, as FilmLightbox's —
// it shares its black full-screen shell and × button, .film-lightbox*), the
// group as a strip of full-screen slides, each picture as large as it fits,
// never cropped. Swiped by hand (scroll-snap), or stepped with the arrow
// buttons and the keyboard's arrow keys; a "2 / 5" count at the top.
export function GalleryLightbox({ items, start, label, onClosed }) {
  const { t } = useLanguage();
  const dialogRef = useRef(null);
  const trackRef = useRef(null);
  const [at, setAt] = useState(start);
  const close = useModalDialog(dialogRef, onClosed);

  // scrollLeft runs negative under RTL, hence the abs and the sign.
  const sign = () => (getComputedStyle(trackRef.current).direction === 'rtl' ? -1 : 1);
  const goTo = (i, behavior = 'smooth') => {
    const el = trackRef.current;
    const n = (i + items.length) % items.length;
    el.scrollTo({ left: sign() * n * el.clientWidth, behavior });
  };
  // Opens straight on the picture that was clicked.
  useEffect(() => goTo(start, 'instant'), []);

  const onKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    goTo(at + step * sign());
  };

  const arrow = (dir) => (
    <button
      type="button"
      className={`gallery-lightbox-step gallery-lightbox-${dir > 0 ? 'next' : 'prev'}`}
      aria-label={dir > 0 ? t.common.nextPicture : t.common.prevPicture}
      onClick={() => goTo(at + dir)}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 6l6 6-6 6" />
      </svg>
    </button>
  );

  return (
    <dialog
      ref={dialogRef}
      className="film-lightbox gallery-lightbox"
      aria-label={label}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onKeyDown={onKeyDown}
    >
      <div
        className="gallery-lightbox-track"
        ref={trackRef}
        onScroll={(e) => setAt(Math.round(Math.abs(e.currentTarget.scrollLeft) / e.currentTarget.clientWidth))}
      >
        {items.map((it, i) => (
          // A tap on the black around a picture closes, as in FilmLightbox.
          <div key={it.src} className="gallery-lightbox-slide" onClick={(e) => e.target === e.currentTarget && close()}>
            {it.video ? (
              <AutoplayVideo className="gallery-lightbox-media" src={it.src} poster={it.poster} label={it.label || label} active={i === at} />
            ) : (
              <img className="gallery-lightbox-media" src={it.src} alt={it.label || label} decoding="async" />
            )}
          </div>
        ))}
      </div>
      {items.length > 1 && (
        <>
          {arrow(-1)}
          {arrow(1)}
          {/* dir="ltr": "2 / 5" must not flip to "5 / 2" under RTL */}
          <p className="gallery-lightbox-count" dir="ltr" aria-live="polite">{at + 1} / {items.length}</p>
        </>
      )}
      <button type="button" className="film-lightbox-close" aria-label={t.common.closeFilm} onClick={close}>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </dialog>
  );
}
