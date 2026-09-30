// One card per step. The track behaves as a closed loop: stepping forward
// past the last card wraps to the first, and stepping back from the first
// wraps to the last.
//
// Card positions are measured in the same coordinate space as scrollLeft —
// i.e. "the scroll offset at which this card sits at the start of the
// track's CONTENT box". The track's inline padding (the shadow bleed in
// theme.css) is subtracted, so a stepped-to card lands exactly where the
// first card sits at rest, with room for its shadow, instead of flush against
// the clipping edge.
//
// Direction-aware: in RTL the start edge is the right one and the scroll axis
// runs 0 → -max, so everything is normalised onto a logical 0 → max axis and
// flipped again on the way out.
const EPS = 4; // tolerance for "we're already there", in px

export function stepCarousel(el, dir) {
  const cards = el.querySelectorAll('.carousel-card');
  if (!cards.length) return;

  const max = el.scrollWidth - el.clientWidth;
  if (max <= 0) return; // everything already fits — nothing to step through

  const rtl = getComputedStyle(el).direction === 'rtl';
  const here = rtl ? -el.scrollLeft : el.scrollLeft;

  const track = el.getBoundingClientRect();
  const pad = parseFloat(getComputedStyle(el).paddingInlineStart) || 0;
  const positions = Array.from(cards, (card) => {
    const rect = card.getBoundingClientRect();
    return here + (rtl ? track.right - rect.right : rect.left - track.left) - pad;
  });

  let target;
  if (dir > 0) {
    // At the end → wrap round to the first card.
    target = here >= max - EPS ? 0 : positions.find((p) => p > here + EPS);
    if (target === undefined) target = max;
  } else {
    // No card sits before this one → we're at the start, so wrap to the end.
    const before = positions.filter((p) => p < here - EPS);
    target = before.length ? before[before.length - 1] : max;
  }

  target = Math.max(0, Math.min(target, max));
  el.scrollTo({ left: rtl ? -target : target, behavior: 'smooth' });
}
