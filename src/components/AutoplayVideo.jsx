import { useEffect, useRef } from 'react';
import './AutoplayVideo.css';

/**
 * A film that behaves like a GIF — and is lazy-loaded.
 *
 * Always muted, always looping, and the visitor cannot take it over: no
 * controls (so no pause, volume or fullscreen button), no picture-in-picture,
 * no casting, no right-click video menu (which would offer "Show controls"),
 * and pointer events pass straight through it (AutoplayVideo.css), so a click
 * or double-click does nothing either (unless `expandable`, below). `playsInline` keeps iPhones from
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
 *
 * `expandable` (optional) is a media query; while it matches, a tap opens the
 * film full-screen (playing, even under reduced motion — the visitor asked).
 * There the browser's own player controls take over (exit button, back
 * gesture); a click that does reach the film closes it. iPhones have no
 * Fullscreen API for a video, so there it is webkitEnterFullscreen: the
 * native player, closed with its Done button. Outside the query the tap does nothing, as before.
 */
export default function AutoplayVideo({ src, poster, ratio, label, className = '', active, expandable }) {
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

  // Leaving full-screen hands the film back to sync() — paused again if it
  // is off screen, inactive, or reduced motion never meant it to play.
  useEffect(() => {
    const video = ref.current;
    if (!video || !expandable) return undefined;
    const onChange = () => {
      if (document.fullscreenElement === video) return;
      if (reduced.current) video.pause();
      else sync();
    };
    video.addEventListener('fullscreenchange', onChange);
    video.addEventListener('webkitendfullscreen', onChange);
    return () => {
      video.removeEventListener('fullscreenchange', onChange);
      video.removeEventListener('webkitendfullscreen', onChange);
    };
  }, [expandable]);

  const expand = () => {
    const video = ref.current;
    if (!video) return;
    // Closing first: full-screen is a different viewport, where the query
    // may no longer match.
    if (document.fullscreenElement === video) {
      document.exitFullscreen().catch(() => {});
      return;
    }
    if (!window.matchMedia?.(expandable).matches) return;
    if (video.requestFullscreen) video.requestFullscreen().catch(() => {});
    else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
    else return;
    video.play().catch(() => {});
  };

  useEffect(() => {
    activeRef.current = active;
    sync();
  }, [active]);

  return (
    <video
      ref={ref}
      className={`autoplay-video${expandable ? ' autoplay-video-expandable' : ''} ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      disableRemotePlayback
      // Full-screen, the browser lays its own player controls over the film;
      // an expandable one keeps their exit button.
      controlsList={`nodownload${expandable ? '' : ' nofullscreen'} noremoteplayback`}
      onClick={expandable ? expand : undefined}
      onContextMenu={(e) => e.preventDefault()}
      aria-label={label}
    />
  );
}
