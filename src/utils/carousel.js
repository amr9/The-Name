// One card per step: use the cards' own offsets, never the track width.
export function stepCarousel(el, dir) {
  const cards = el.querySelectorAll('.carousel-card');
  if (!cards.length) return;
  const base = cards[0].offsetLeft;
  const offsets = Array.from(cards, (c) => c.offsetLeft - base);
  const max = el.scrollWidth - el.clientWidth;
  const here = el.scrollLeft;
  let target;
  if (dir > 0) {
    if (here >= max - 4) {
      target = 0;
    } else {
      target = offsets.find((o) => o > here + 4);
      if (target === undefined || target > max) target = max;
    }
  } else {
    const before = offsets.filter((o) => o < here - 4);
    target = before.length ? before[before.length - 1] : 0;
  }
  el.scrollTo({ left: Math.min(target, max), behavior: 'smooth' });
}
