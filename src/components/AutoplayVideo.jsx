import { useEffect, useRef } from 'react';
import './AutoplayVideo.css';

/**
 * A film that behaves like a GIF — and is lazy-loaded.
 *
 * Always muted, always looping, and the visitor cannot take it over: no
 * controls (so no pause, volume or fullscreen button), no picture-in-picture,
 * no casting, no right-click video menu (which would offer "Show controls"),
 * and pointer events pass straight through it (AutoplayVideo.css), so a click
 * or double-click does nothing either. `playsInline` keeps iPhones from
 * opening it full-screen when it starts.
 *
 * `preload="none"` and no `autoPlay` attribute, so nothing but the poster is
 * fetched until the video actually scrolls into view; then it plays, and it
 * pauses again once it leaves (no point decoding a film nobody can see) —
 * invisible to the visitor, who only ever sees it running. Under
 * prefers-reduced-motion it never starts: the poster shows as a still.
 */
export default function AutoplayVideo({ src, poster, ratio, label, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !('IntersectionObserver' in window)) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() rejects if the browser still refuses (e.g. data saver) —
          // the poster is the fallback, so swallow it.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={`autoplay-video ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      disableRemotePlayback
      controlsList="nodownload nofullscreen noremoteplayback"
      onContextMenu={(e) => e.preventDefault()}
      aria-label={label}
    />
  );
}
