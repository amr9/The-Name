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
 *
 * `active` (optional) is a second condition for films that share one spot on
 * screen — the Home "What we do" stage on phones stacks all five rows, so
 * every film counts as in view. Pass `active={false}` and it pauses even
 * while visible; left undefined, only visibility decides.
 */
export default function AutoplayVideo({ src, poster, ratio, label, className = '', active }) {
  const ref = useRef(null);
  const visible = useRef(false);
  const activeRef = useRef(active);
  const reduced = useRef(false);

  const sync = () => {
    const video = ref.current;
    if (!video || reduced.current) return;
    if (visible.current && activeRef.current !== false) {
      // play() rejects if the browser still refuses (e.g. data saver) —
      // the poster is the fallback, so swallow it.
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  useEffect(() => {
    const video = ref.current;
    if (!video || !('IntersectionObserver' in window)) return undefined;
    reduced.current = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced.current) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    activeRef.current = active;
    sync();
  }, [active]);

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
