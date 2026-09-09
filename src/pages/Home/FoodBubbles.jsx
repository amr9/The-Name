// Decorative bubble field for the services section — burger / drink marks
// that drift past and fade out. Two layouts, both rendered and switched by
// media query in Home.css so the choice follows the viewport, not a JS
// breakpoint: `side="left" | "right"` fills the white gutters beside the
// copy on wide screens, `side="row"` is a horizontal band that drifts left
// to right between the service rows, for narrow screens with no gutter.
//
// Ornament, so it stays out of the accessibility tree and off the tab order
// — but a bubble can be tapped to pop it (a small burst plus a synthesized
// blip), after which it comes back on the next pass. Positions and timing
// come from `serviceBubbles` / `rowBubbles` in this page's data.js; `phase`
// shifts a whole band along its path (a percentage), so two bands on screen
// at once are never in the same place.
import { useEffect, useRef, useState } from 'react';
import { rowBubbles, serviceBubbles } from './data.js';

// How long a popped bubble stays gone before it drifts back in.
const REFILL_MS = 5000;

// Simple single-color marks — they read as silhouettes at bubble size, so
// they are drawn flat and take their color from the CSS `color` property.
const icons = {
  burger: (
    <>
      <path d="M4 11.2c0-3.6 3.6-6.2 8-6.2s8 2.6 8 6.2H4Z" />
      <rect x="3.2" y="12.4" width="17.6" height="2.2" rx="1.1" />
      <path d="M4 16.2h16c0 2.1-1.7 3.8-3.8 3.8H7.8C5.7 20 4 18.3 4 16.2Z" />
    </>
  ),
  cup: (
    <>
      <path d="M14.4 2.4 16 7.6l-1.5.5-1.6-5.2 1.5-.5Z" />
      <path d="M5 8h14l-1.4 11.1A2.1 2.1 0 0 1 15.5 21h-7a2.1 2.1 0 0 1-2.1-1.9L5 8Z" />
      <rect x="6.6" y="11" width="10.8" height="1.6" rx=".8" fill="#fff" />
    </>
  ),
  coffee: (
    <>
      <path d="M4 7h12v7.4A4.6 4.6 0 0 1 11.4 19H8.6A4.6 4.6 0 0 1 4 14.4V7Z" />
      <path d="M16.6 8.6h1.6a2.9 2.9 0 0 1 0 5.8h-1.6v-1.8h1.6a1.1 1.1 0 0 0 0-2.2h-1.6V8.6Z" />
      <rect x="3.2" y="20.2" width="13.6" height="1.8" rx=".9" />
    </>
  ),
  can: (
    <>
      <rect x="6.5" y="3" width="11" height="18" rx="2.6" />
      <rect x="8.4" y="6.4" width="7.2" height="1.5" rx=".75" fill="#fff" />
      <rect x="8.4" y="9.4" width="4.6" height="1.5" rx=".75" fill="#fff" />
    </>
  ),
  fries: (
    <>
      <path d="m7.4 3.8 1.7-.4 1.3 6-1.7.4-1.3-6Zm4.1-.9 1.7.2-.7 6.4-1.7-.2.7-6.4Zm4.3 1 1.6.7-2.3 5.7-1.6-.7 2.3-5.7Z" />
      <path d="M4.6 10.4h14.8l-1.5 8.4A2.6 2.6 0 0 1 15.3 21H8.7a2.6 2.6 0 0 1-2.6-2.2l-1.5-8.4Z" />
    </>
  ),
  shake: (
    <>
      <path d="M6.6 8.6h10.8l-1.3 10.6A2.1 2.1 0 0 1 14 21h-4a2.1 2.1 0 0 1-2.1-1.8L6.6 8.6Z" />
      <path d="M6.2 7.2c0-2.9 2.6-5.2 5.8-5.2s5.8 2.3 5.8 5.2H6.2Z" />
      <circle cx="17.4" cy="3.4" r="1.6" />
    </>
  ),
};

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

export default function FoodBubbles({ side, phase = 0 }) {
  // Ids currently mid-pop (burst playing) and ids hidden until they refill.
  const [popped, setPopped] = useState({});
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const isRow = side === 'row';
  const bubbles = isRow ? rowBubbles : serviceBubbles.filter((b) => b.side === side);

  // In the band, `x` is a head start along the crossing rather than a
  // position: winding the delay back by that fraction of one pass drops the
  // bubble in mid-flight, so the six are spread across the width from the
  // first frame instead of queueing at the left edge. `phase` (also a
  // percentage) offsets a whole band, so the three bands do not march in
  // step with each other.
  const delayOf = (b) =>
    (isRow ? -(((b.x + phase) % 100) / 100) * b.duration : b.delay).toFixed(2);

  function pop(id) {
    if (popped[id]) return;
    playPop();
    setPopped((p) => ({ ...p, [id]: true }));
    timers.current.push(
      setTimeout(() => setPopped((p) => {
        const next = { ...p };
        delete next[id];
        return next;
      }), REFILL_MS),
    );
  }

  return (
    <div className={`home-bubbles home-bubbles-${side}`} aria-hidden="true">
      {bubbles.map((b) => (
        <button
          key={b.id}
          type="button"
          tabIndex={-1}
          className="home-bubble"
          data-popped={popped[b.id] ? 'true' : undefined}
          onClick={() => pop(b.id)}
          style={{
            '--bubble-x': `${b.x}%`,
            '--bubble-y': `${b.y}%`,
            '--bubble-size': `${b.size}px`,
            '--bubble-delay': `${delayOf(b)}s`,
            '--bubble-duration': `${b.duration}s`,
            '--bubble-drift': `${b.drift}px`,
          }}
        >
          <span className="home-bubble-skin">
            <svg className="home-bubble-icon" viewBox="0 0 24 24" fill="currentColor">
              {icons[b.icon]}
            </svg>
          </span>
        </button>
      ))}
    </div>
  );
}
