import { useEffect, useRef, useState } from 'react';

// A PINNED SCROLL STAGE, shared by PillarRows (Home / Brands, phones only)
// and the Agency page's services (every width). The page scrolls normally;
// the track is tall and the stage inside it is sticky (the CSS lives with
// each user: PillarRows.css "pillar stage", Agency.css), so while it is
// pinned the distance scrolled into the track picks the active row — each
// row owns one `step` of scroll, centred on its resting point. Everything
// else (fades, slides, which film plays) follows `active`. The server
// render and the first client render both say active 0 / not a stage, so
// hydration matches.
//
// Options:
//   query        — media query the stage is on for; omitted = always
//   rowSelector  — the rows, direct children of the stage
//   bandSelector — optional: their copy, whose tallest height is written to
//                  the stage as --text-band (PillarRows sizes its media off it)
// 0 below a, 1 above b, eased in between.
const smoothstep = (a, b, v) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export default function useScrollStage(count, { query, rowSelector, bandSelector } = {}) {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const [isStage, setIsStage] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!query) {
      setIsStage(true);
      return undefined;
    }
    const mq = window.matchMedia(query);
    const update = () => setIsStage(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);

  // Measured from the layout rather than restated from the CSS, so the
  // two cannot drift: the track is the stage plus (count - 0.5) steps.
  const geometry = () => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const pin = parseFloat(getComputedStyle(stage).top) || 0;
    const step = (track.offsetHeight - stage.offsetHeight) / (count - 0.5);
    return { track, pin, step };
  };

  // The text band: the height of the TALLEST row's copy, written to the
  // stage as --text-band. PillarRows.css gives the media everything else, so
  // there is no empty band under the buttons and the film is as tall as the
  // screen allows. Re-measured whenever any copy changes size (fonts
  // loading, a language switch, a rotation).
  useEffect(() => {
    if (!isStage || !bandSelector || !('ResizeObserver' in window)) return undefined;
    const stage = stageRef.current;
    const texts = [...stage.querySelectorAll(`:scope > ${bandSelector}`)];
    const ro = new ResizeObserver(() => {
      const band = Math.max(...texts.map((t) => t.offsetHeight));
      stage.style.setProperty('--text-band', `${band}px`);
    });
    texts.forEach((t) => ro.observe(t));
    return () => {
      ro.disconnect();
      stage.style.removeProperty('--text-band');
    };
  }, [isStage, count, bandSelector]);

  useEffect(() => {
    if (!isStage) {
      setActive(0);
      return undefined;
    }
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const rows = [...stageRef.current.querySelectorAll(`:scope > ${rowSelector}`)];
    let frame = 0;
    // The step the scroll position was last read against, and where in the
    // rows that put the page (see onResize).
    let lastStep = geometry().step;
    let lastX = -1;
    const measure = () => {
      frame = 0;
      const { track, pin, step } = geometry();
      const scrolled = pin - track.getBoundingClientRect().top;
      if (Math.abs(step - lastStep) < 1) lastX = scrolled / step;
      const index = Math.min(count - 1, Math.max(0, Math.round(scrolled / step)));
      setActive(index);

      // The transition is SCRUBBED by the scroll, not triggered at a
      // threshold: x is the position in rows (1.5 = halfway from row 02 to
      // 03) and each row gets d = its distance from x, clamped to -1..1.
      // The stage's CSS turns d into the slide (left when passed, right when to
      // come) and the fade, so the change runs exactly as far as the finger
      // has moved. Written as CSS variables per frame, no re-render.
      // Reduced motion: no in-between, the active row simply shows.
      const x = Math.min(count - 1, Math.max(0, scrolled / step));
      rows.forEach((row, i) => {
        const d = reduce ? Math.sign(i - index) : Math.min(1, Math.max(-1, i - x));
        // The media cross-fades across the whole step (--o); the TEXT hands
        // over instead (--ot) — the outgoing copy is gone by halfway and
        // the incoming one only appears after it, so two blocks of text
        // never sit on top of each other.
        const o = 1 - smoothstep(0.15, 0.85, Math.abs(d));
        const ot = 1 - smoothstep(0.05, 0.5, Math.abs(d));
        row.style.setProperty('--ot', ot.toFixed(4));
        row.style.setProperty('--d', d.toFixed(4));
        row.style.setProperty('--ad', Math.abs(d).toFixed(4));
        row.style.setProperty('--o', o.toFixed(4));
        row.style.setProperty('--vis', o > 0.01 ? 'visible' : 'hidden');
      });
    };

    // SETTLING. The page must never come to rest between two rows (a half
    // faded stage). CSS scroll-snap was tried and dropped: with a snap point
    // every 75svh, "proximity" pulled short swipes BACK to the row they
    // started from (the stage felt stuck) and let medium ones rest halfway
    // (measured with real touch input). Instead, once the scroll is at rest
    // and the finger is up, this glides to a row chosen by DIRECTION: moved
    // more than 8% of a step (~50px) from the row it last rested on → on to
    // the next row that way; less → back. Outside the pinned span (before
    // the first row, after the last) the page scrolls freely.
    let rest = Math.min(count - 1, Math.max(0, Math.round(
      (geometry().pin - trackRef.current.getBoundingClientRect().top) / geometry().step,
    )));
    let touching = false;
    let timer = 0;
    const settle = () => {
      clearTimeout(timer);
      timer = 0;
      if (touching) return;
      const { track, pin, step } = geometry();
      const x = (pin - track.getBoundingClientRect().top) / step;
      const near = Math.round(x);
      if (x <= 0.02 || x >= count - 1.02 || Math.abs(x - near) < 0.02) {
        rest = Math.min(count - 1, Math.max(0, near));
        return;
      }
      const moved = x - rest;
      const target = moved > 0.08 ? Math.ceil(x) : moved < -0.08 ? Math.floor(x) : rest;
      rest = Math.min(count - 1, Math.max(0, target));
      window.scrollTo({
        top: track.getBoundingClientRect().top + window.scrollY - pin + rest * step,
        behavior: reduce ? 'auto' : 'smooth',
      });
    };
    // Settle once scrolling stops: `scrollend` where the browser has it,
    // otherwise (Safari) a short pause in scroll events — momentum keeps
    // them coming, so this waits for the fling to finish.
    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(settle, 160);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
      schedule();
    };
    const onTouchStart = () => {
      touching = true;
      clearTimeout(timer);
    };
    const onTouchEnd = () => {
      touching = false;
      schedule();
    };
    // A REAL resize (a rotation; the address bar does not count — the stage
    // is in svh) moves every row's resting point, so the old scroll offset
    // now points at another row. Keep the row that was showing instead,
    // when the stage was pinned: put the page back on its resting point.
    const onResize = () => {
      const { track, pin, step } = geometry();
      if (Math.abs(step - lastStep) >= 1) {
        lastStep = step;
        if (lastX > -0.02 && lastX < count - 0.98) {
          window.scrollTo({ top: track.getBoundingClientRect().top + window.scrollY - pin + rest * step, behavior: 'auto' });
        }
      }
      onScroll();
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scrollend', settle);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scrollend', settle);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [isStage, count, rowSelector]);

  // A progress dot scrolls the page to that row's resting point.
  const goTo = (i) => {
    const { track, pin, step } = geometry();
    const top = track.getBoundingClientRect().top + window.scrollY - pin + i * step;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
  };

  return { trackRef, stageRef, isStage, active, goTo };
}
