// Hand-drawn ornament for the Kids page's two beige bands: a flower in the
// top-right corner and a sun in the bottom-left. Deliberately wobbly — the
// petals are uneven, the sun is not a circle and its rays wander — so they
// read as something a child drew rather than as icons. Stroked, never
// filled, which is what keeps them looking like pen on paper.
//
// Decorative only: aria-hidden, no pointer events (see Kids.css). Used by
// both bands on this page, so it lives here rather than being written twice
// — a second PAGE wanting it would move it to components/ instead.

// Petals sit on a rotation, so one wobbly petal is drawn once and turned.
// The angles are not evenly spaced: a child does not measure 60° steps.
const PETALS = [0, 57, 123, 180, 241, 302];

// The sun's rays, same idea — uneven angles, and each one a different length
// so the burst looks drawn rather than generated.
const RAYS = [
  { angle: 4, len: 13 },
  { angle: 47, len: 9 },
  { angle: 92, len: 14 },
  { angle: 136, len: 10 },
  { angle: 178, len: 12 },
  { angle: 223, len: 9 },
  { angle: 268, len: 15 },
  { angle: 314, len: 11 },
];

export function FlowerDoodle({ className = '' }) {
  return (
    <svg
      className={`kids-doodle ${className}`}
      viewBox="0 0 100 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PETALS.map((angle) => (
        <path
          key={angle}
          d="M50 44C44.5 34 39 25.5 44 19.5C48.5 14 57 16.5 57.5 23C58 29.5 54 36.5 50 44Z"
          transform={`rotate(${angle} 50 44)`}
        />
      ))}
      {/* the middle, drawn as a loop that does not quite close */}
      <path d="M45 44c-1-4 3-6.5 6-5.5s4.5 4.5 2.5 7-7 2-8.5-1.5" />
      {/* stem: it wanders, because a drawn line does */}
      <path d="M50 52c-3 9 2 14 0 21s3 12 1 19" />
      {/* one leaf, off to the side */}
      <path d="M51 74c7-5.5 13-4 14.5.5-5.5 4-11.5 3.5-14.5-.5Z" />
    </svg>
  );
}

export function SunDoodle({ className = '' }) {
  return (
    <svg
      className={`kids-doodle ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* not a circle — the ends overshoot each other, the way a drawn
          round shape does when the hand comes back round to the start */}
      <path d="M62 23.5C74 27 81 38 79.5 50c-1.5 13-12 22.5-25 23-13.5.5-24.5-9-25.5-22C28 38 36.5 27 49 24c4.5-1 9-1 13 .5" />
      {RAYS.map(({ angle, len }) => (
        <path
          key={angle}
          d={`M50 16c1.5-${len * 0.4} -2-${len * 0.6} 0.5-${len}`}
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
    </svg>
  );
}

/** Both doodles, positioned by Kids.css. Drop it inside a beige band. */
export default function Doodles() {
  return (
    <>
      <FlowerDoodle className="kids-doodle-flower" />
      <SunDoodle className="kids-doodle-sun" />
    </>
  );
}
