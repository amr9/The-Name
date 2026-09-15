// Layouts for the decorative bubble fields (components/Bubbles). Structural
// only — no copy, they are aria-hidden ornament. Every bubble carries the
// same brand mark, so Home and Cafe share these layouts as they are.

// Side fields drifting up the white gutters beside the content on wide
// screens. `x`/`y` are percentages across and up the gutter, `size` is px at
// scale 1, `delay`/`duration` are seconds and `drift` the sideways sway in px.
export const sideBubbles = [
  { id: 'l1', side: 'left', y: 2, x: 20, size: 78, delay: 0, duration: 11, drift: 26 },
  { id: 'l2', side: 'left', y: 15, x: 60, size: 54, delay: 2.1, duration: 13, drift: -20 },
  { id: 'l3', side: 'left', y: 28, x: 30, size: 46, delay: 4.4, duration: 9.5, drift: 34 },
  { id: 'l4', side: 'left', y: 41, x: 66, size: 66, delay: 6.2, duration: 14, drift: -30 },
  { id: 'l5', side: 'left', y: 54, x: 24, size: 42, delay: 8.6, duration: 10.5, drift: 22 },
  { id: 'l6', side: 'left', y: 67, x: 58, size: 70, delay: 10.8, duration: 12.5, drift: -26 },
  { id: 'l7', side: 'left', y: 80, x: 18, size: 50, delay: 13.1, duration: 9, drift: 30 },
  { id: 'l8', side: 'left', y: 92, x: 64, size: 62, delay: 15.4, duration: 13.5, drift: -18 },
  { id: 'r1', side: 'right', y: 8, x: 62, size: 70, delay: 1.2, duration: 12, drift: -24 },
  { id: 'r2', side: 'right', y: 21, x: 24, size: 48, delay: 3.3, duration: 9.5, drift: 30 },
  { id: 'r3', side: 'right', y: 34, x: 58, size: 62, delay: 5.6, duration: 13, drift: -32 },
  { id: 'r4', side: 'right', y: 47, x: 28, size: 44, delay: 7.8, duration: 10.2, drift: 24 },
  { id: 'r5', side: 'right', y: 60, x: 66, size: 74, delay: 9.9, duration: 14, drift: -18 },
  { id: 'r6', side: 'right', y: 73, x: 22, size: 56, delay: 12.2, duration: 11, drift: 28 },
  { id: 'r7', side: 'right', y: 86, x: 60, size: 46, delay: 14.5, duration: 9.8, drift: -22 },
  { id: 'r8', side: 'right', y: 96, x: 30, size: 66, delay: 16.6, duration: 12.8, drift: 20 },
];

// The same ornament for narrow screens, where there is no gutter to fill:
// a horizontal band dropped between content rows, bubbles drifting left to
// right. `y` is the vertical position across the band, `drift` the up/down
// sway in px, and `x` is how far along the crossing the bubble already is
// when the band starts — it becomes a negative animation delay, so the six
// are spread across the width instead of queuing at the left edge. (No
// `delay` here: `x` and the band's own `phase` set the timing.)
export const rowBubbles = [
  { id: 'b1', y: 52, x: 4, size: 44, duration: 9, drift: -14 },
  { id: 'b2', y: 24, x: 22, size: 34, duration: 11, drift: 16 },
  { id: 'b3', y: 68, x: 40, size: 38, duration: 8, drift: -18 },
  { id: 'b4', y: 38, x: 58, size: 30, duration: 12, drift: 12 },
  { id: 'b5', y: 60, x: 74, size: 40, duration: 10, drift: -12 },
  { id: 'b6', y: 30, x: 90, size: 28, duration: 9.5, drift: 18 },
];
