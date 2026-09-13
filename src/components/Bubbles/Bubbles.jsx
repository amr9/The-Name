// Decorative bubble field — small marks that drift past and fade out. Used
// on Home (shop icons, beside and between the service rows) and on Cafe (food
// icons, 3× the size, beside the menu). Two layouts, both rendered and
// switched by media query in Bubbles.css so the choice follows the viewport,
// not a JS breakpoint: `side="left" | "right"` fills the white gutters beside
// the copy on wide screens, `side="row"` is a horizontal band that drifts left
// to right between content rows, for narrow screens with no gutter.
//
// The parent must carry the `bubbles-host` class (see Bubbles.css): it anchors
// the side fields, clips them, and keeps page content above them.
//
// Ornament, so it stays out of the accessibility tree and off the tab order
// — but a bubble can be tapped to pop it (a small burst plus a synthesized
// blip), after which it comes back on the next pass. Positions and timing
// come from data/bubbles.js; `icons` is an ordered set from ./icons.jsx dealt
// out in turn; `scale` multiplies every bubble's size; `phase` shifts a whole
// band along its path (a percentage), so two bands on screen at once are
// never in the same place.
import { useEffect, useRef, useState } from 'react';
import { rowBubbles, sideBubbles } from '../../data/bubbles.js';
import './Bubbles.css';

// How long a popped bubble stays gone before it drifts back in.
const REFILL_MS = 5000;

// The pop: a short blip synthesized with Web Audio rather than shipping an
// audio file. A quick downward pitch sweep under a fast decay envelope is
// what reads as "bubble", and it is a few lines instead of a request.
// The context is created on the first tap, which is the user gesture
// browsers require before audio may start.
let audioCtx = null;

function playPop() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    if (!audioCtx) audioCtx = new Ctx();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(760, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.11);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.16, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);

    osc.connect(gain).connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.14);
  } catch {
    // Audio is a nicety — a blocked or unavailable context must never stop
    // the bubble from popping visually.
  }
}

export default function Bubbles({ side, icons, scale = 1, phase = 0 }) {
  // A popped bubble moves through three states before it is ordinary again:
  //   popped    — the burst is playing, then it stays gone for REFILL_MS
  //   refilling — one frame with the travel animation off, which is what
  //               lets the browser restart it from its first keyframe
  //   restarted — from now on it runs with no delay, so it comes back on
  //               its own next pass instead of waiting out the original
  //               stagger. Without that restart the bubble would blink back
  //               mid-flight at full opacity; now it fades in from the top
  //               of its path like every other pass.
  const [popped, setPopped] = useState({});
  const [refilling, setRefilling] = useState({});
  const [restarted, setRestarted] = useState({});
  const timers = useRef([]);
  const frames = useRef([]);

  useEffect(() => () => {
    timers.current.forEach(clearTimeout);
    frames.current.forEach(cancelAnimationFrame);
  }, []);

  const isRow = side === 'row';
  const bubbles = isRow ? rowBubbles : sideBubbles.filter((b) => b.side === side);
  // Start the right field (and each band) part-way through the icon set, so
  // the two gutters never show the same icon at the same height.
  const iconOffset = isRow ? Math.round(phase / 10) : side === 'right' ? Math.ceil(icons.length / 2) : 0;

  // In the band, `x` is a head start along the crossing rather than a
  // position: winding the delay back by that fraction of one pass drops the
  // bubble in mid-flight, so the six are spread across the width from the
  // first frame instead of queueing at the left edge. `phase` (also a
  // percentage) offsets a whole band, so bands do not march in step.
  const delayOf = (b) =>
    (isRow ? -(((b.x + phase) % 100) / 100) * b.duration : b.delay).toFixed(2);

  const without = (map, id) => {
    const next = { ...map };
    delete next[id];
    return next;
  };

  function pop(id) {
    if (popped[id]) return;
    playPop();
    setPopped((p) => ({ ...p, [id]: true }));

    timers.current.push(setTimeout(() => {
      // hand it to `refilling` in the same pass, so it never renders
      // un-popped with the old animation still mid-cycle
      setPopped((p) => without(p, id));
      setRestarted((r) => ({ ...r, [id]: true }));
      setRefilling((r) => ({ ...r, [id]: true }));

      // one painted frame with `animation: none` is enough for the restart
      // to take, so the class is dropped on the frame after next. A hidden
      // tab paints no frames at all and would otherwise leave the bubble
      // stuck invisible, so a timer releases it either way.
      let released = false;
      const release = () => {
        if (released) return;
        released = true;
        setRefilling((r) => without(r, id));
      };
      frames.current.push(requestAnimationFrame(() => {
        frames.current.push(requestAnimationFrame(release));
      }));
      timers.current.push(setTimeout(release, 250));
    }, REFILL_MS));
  }

  return (
    <div className={`bubbles bubbles-${side}`} aria-hidden="true">
      {bubbles.map((b, i) => {
        const size = b.size * scale;
        return (
          <button
            key={b.id}
            type="button"
            tabIndex={-1}
            className={`bubble${refilling[b.id] ? ' is-refilling' : ''}`}
            data-popped={popped[b.id] ? 'true' : undefined}
            onClick={() => pop(b.id)}
            style={{
              // Scaled-up bubbles are wider than the gutter, so they are
              // centred on `x` instead of hanging off it — they spill past
              // the screen edge (clipped by the host) rather than into the copy.
              '--bubble-x': scale > 1 ? `calc(${b.x}% - ${size / 2}px)` : `${b.x}%`,
              '--bubble-y': `${b.y}%`,
              '--bubble-size': `${size}px`,
              '--bubble-delay': restarted[b.id] ? '0s' : `${delayOf(b)}s`,
              '--bubble-duration': `${b.duration}s`,
              '--bubble-drift': `${b.drift}px`,
            }}
          >
            <span className="bubble-skin">
              <svg className="bubble-icon" viewBox="0 0 24 24" fill="currentColor">
                {icons[(i + iconOffset) % icons.length]}
              </svg>
            </span>
          </button>
        );
      })}
    </div>
  );
}
