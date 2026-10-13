import { useEffect, useRef, useState } from 'react';
import './PillarRows.css';

/**
 * The zig-zag rows of Home's "What we do" and of the Brands page — one
 * component, so both pages share one look and one behaviour.
 *
 * Desktop and tablet: one row per entry, text beside a 4:5 media frame with
 * a ring behind it, alternating sides. Phones (STAGE_QUERY): the rows become
 * ONE pinned stage that the scroll moves through (usePillarStage below).
 *
 * `rows`: [{ key, num?, mark?, title, label, lead, body?, tags?, actions,
 *   media, bare?, wide?, mediaClass? }]
 *   num        — the kicker number; defaults to the row's position, 01, 02…
 *   mark       — an optional node after the number's rule (Brands: the logo)
 *   title      — the heading's content; `label` is its plain text, for the dots
 *   actions    — the buttons (a node)
 *   media      — ({ active }) => node. `active` is false for a row hidden on
 *                the phone stage (pause its film), undefined elsewhere
 *   bare       — media is NOT wrapped in the rounded, shadowed frame (the
 *                Brands page's product cards bring their own)
 *   wide       — a wider media column (.pillar-figure-wide)
 *   mediaClass — an extra class on the frame (Home: .washed on placeholders)
 * `titleAs`: the heading level — h3 under Home's section h2, h2 on Brands.
 * More than DOTS_MAX rows show a "04 / 19" counter instead of dots.
 */

// Every row's picture or film — photo, placeholder or video — sits in ONE
// frame shape, portrait 4:5 (the shape the films are cut to). Media of
// another shape FILLS it (object-fit: cover), cropped at the edges rather
// than letterboxed. The frame's WIDTH is capped in PillarRows.css
// (.pillar-figure). On the phone stage the frame keeps the same 4:5, sized
// to the space the text leaves (--text-band).
export const ROW_RATIO = '4 / 5';

const DOTS_MAX = 6;

// Phones only: the rows become ONE pinned stage. Keep in step with the
// @media in PillarRows.css's "pillar stage" block.
const STAGE_QUERY = '(max-width: 760px)';

// Drives the phone stage. The page scrolls normally; the track is tall (see
// PillarRows.css) and the stage inside it is sticky, so while it is pinned the
// distance scrolled into the track picks the active row — each row owns one
// `step` of scroll, centred on its resting point. Everything else (fades,
// slides, which film plays) follows `active`. The server render and the
// first client render both say active 0 / not a stage, so hydration matches.
// 0 below a, 1 above b, eased in between.
const smoothstep = (a, b, v) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function usePillarStage(count) {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const [isStage, setIsStage] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia(STAGE_QUERY);
    const update = () => setIsStage(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

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
    if (!isStage || !('ResizeObserver' in window)) return undefined;
    const stage = stageRef.current;
    const texts = [...stage.querySelectorAll(':scope > .pillar-row .pillar-text')];
    const ro = new ResizeObserver(() => {
      const band = Math.max(...texts.map((t) => t.offsetHeight));
      stage.style.setProperty('--text-band', `${band}px`);
    });
    texts.forEach((t) => ro.observe(t));
    return () => {
      ro.disconnect();
      stage.style.removeProperty('--text-band');
    };
  }, [isStage, count]);

  useEffect(() => {
    if (!isStage) {
      setActive(0);
      return undefined;
    }
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const rows = [...stageRef.current.querySelectorAll(':scope > .pillar-row')];
    let frame = 0;
    const measure = () => {
      frame = 0;
      const { track, pin, step } = geometry();
      const scrolled = pin - track.getBoundingClientRect().top;
      const index = Math.min(count - 1, Math.max(0, Math.round(scrolled / step)));
      setActive(index);

      // The transition is SCRUBBED by the scroll, not triggered at a
      // threshold: x is the position in rows (1.5 = halfway from row 02 to
      // 03) and each row gets d = its distance from x, clamped to -1..1.
      // PillarRows.css turns d into the slide (left when passed, right when to
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
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scrollend', settle);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scrollend', settle);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [isStage, count]);

  // A progress dot scrolls the page to that row's resting point.
  const goTo = (i) => {
    const { track, pin, step } = geometry();
    const top = track.getBoundingClientRect().top + window.scrollY - pin + i * step;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
  };

  return { trackRef, stageRef, isStage, active, goTo };
}

// A row's specialities as chips. On the phone stage the list is one line
// that swipes sideways (PillarRows.css), and the slim bar under it shows where:
// the gold thumb is as wide as the visible share of the row and travels with
// the swipe. Written to CSS variables on scroll, no re-render. When the
// chips all fit (or on wider screens, where they wrap) the bar is hidden.
function TagRow({ tags }) {
  const listRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    const bar = barRef.current;
    const update = () => {
      const { scrollWidth, clientWidth, scrollLeft } = list;
      const max = scrollWidth - clientWidth;
      // scrollLeft runs negative under RTL, hence the abs().
      const pos = max > 0 ? Math.min(1, Math.abs(scrollLeft) / max) : 0;
      bar.style.setProperty('--thumb-size', (scrollWidth ? clientWidth / scrollWidth : 1).toFixed(4));
      bar.style.setProperty('--thumb-pos', pos.toFixed(4));
      bar.toggleAttribute('data-fits', max <= 1);
    };
    update();
    list.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      list.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [tags]);

  return (
    <>
      <ul className="pillar-tags" ref={listRef}>
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <div className="pillar-tags-bar" ref={barRef} aria-hidden="true" />
    </>
  );
}

export default function PillarRows({ rows, titleAs: Title = 'h3' }) {
  const stage = usePillarStage(rows.length);
  const pad = (n) => String(n).padStart(2, '0');

  return (
    // Desktop and tablet: the rows below simply stack. Phones: the track is
    // tall and the stage inside it is pinned, so scrolling swaps one row for
    // the next in place (usePillarStage; PillarRows.css "pillar stage").
    <div className="pillars" ref={stage.trackRef} style={{ '--pillar-count': rows.length }}>
      <div className="pillars-stage" ref={stage.stageRef}>
        {rows.length > DOTS_MAX ? (
          <div className="pillars-counter" aria-hidden="true">
            {/* dir="ltr" on the numbers only: "04 / 19" must not flip to
                "19 / 04" under RTL, while the box keeps its RTL corner. */}
            <span dir="ltr"><strong>{pad(stage.active + 1)}</strong> / {pad(rows.length)}</span>
          </div>
        ) : (
          <div className="pillars-dots">
            {rows.map((r, i) => (
              <button
                key={r.key}
                type="button"
                className={`pillars-dot${i === stage.active ? ' is-active' : ''}`}
                aria-label={r.label}
                aria-current={i === stage.active ? 'true' : undefined}
                onClick={() => stage.goTo(i)}
              />
            ))}
          </div>
        )}
        {rows.map((r, i) => {
          // Rows zig-zag: text first on even rows, media first on odd ones.
          const textOrder = i % 2 === 0 ? 1 : 2;
          // Where this row sits relative to the stage's active one.
          const pos = i === stage.active ? 'active' : i < stage.active ? 'before' : 'after';
          const hidden = stage.isStage && pos !== 'active';
          const media = r.media({ active: stage.isStage ? pos === 'active' : undefined });
          return (
            <section
              key={r.key}
              className="container pillar-row"
              data-pos={pos}
              // The phone stage's starting state (row 01 shown), for the
              // pre-rendered HTML; usePillarStage takes over from here.
              // Plain CSS variables, read only by the stage CSS.
              style={{ '--d': Math.sign(i), '--ad': i ? 1 : 0, '--o': i ? 0 : 1, '--ot': i ? 0 : 1, '--vis': i ? 'hidden' : 'visible' }}
              // A hidden row's buttons must not take keyboard focus (React 18
              // passes `inert` through only as a string attribute).
              inert={hidden ? '' : undefined}
            >
              <div className="row-flip pillar-grid">
                <div className="row-text pillar-text" style={{ order: textOrder }}>
                  <div className="pillar-kicker-row">
                    <span className="pillar-num">{r.num ?? pad(i + 1)}</span>
                    <span className="pillar-rule" />
                    {r.mark}
                  </div>
                  <Title className="pillar-title">{r.title}</Title>
                  <p className="pillar-lead">{r.lead}</p>
                  {r.body && <p className="pillar-body">{r.body}</p>}
                  {r.tags?.length > 0 && <TagRow tags={r.tags} />}
                  <div className="pillar-ctas">{r.actions}</div>
                </div>
                <figure
                  className={`row-img pillar-figure${r.wide ? ' pillar-figure-wide' : ''}`}
                  style={{ order: 3 - textOrder }}
                >
                  <div className="pillar-ring" />
                  {r.bare ? media : (
                    <div className={`pillar-image-wrap${r.mediaClass ? ` ${r.mediaClass}` : ''}`}>{media}</div>
                  )}
                </figure>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
