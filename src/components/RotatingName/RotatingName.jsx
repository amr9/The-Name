import { useEffect, useState } from 'react';
import './RotatingName.css';

// How long each word stays before the next drops in.
const HOLD_MS = 1500;

/**
 * A title's last line: each of `names` drops in from above while the one
 * before falls away, in a loop — the Home hero ("More than just …") and the
 * Agency hero ("We talk …", ServicePage `hero.names`). `firstHoldMs` keeps
 * names[0] up longer (Home: its slogan's own "a name.").
 *
 * The first render is names[0] — on the server and in the browser alike, so
 * hydration matches — and the cycle only starts after mount. Reduced-motion
 * visitors keep names[0]. Keys are the running count, so the outgoing word
 * keeps its element (and switches to the leave animation) while the incoming
 * one mounts fresh (and plays the enter one). Hide it from screen readers
 * and give them the full line instead (both heroes use a .sr-only span).
 */
export default function RotatingName({ names, firstHoldMs = HOLD_MS, className = '' }) {
  const [count, setCount] = useState(0);

  // A language switch starts the list over.
  useEffect(() => setCount(0), [names]);

  // One timeout per word rather than an interval, since names[0] may hold longer.
  useEffect(() => {
    if (names.length < 2) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const hold = count % names.length === 0 ? firstHoldMs : HOLD_MS;
    const id = setTimeout(() => setCount((n) => n + 1), hold);
    return () => clearTimeout(id);
  }, [count, names, firstHoldMs]);

  const at = (n) => names[n % names.length];
  return (
    <span className={`rotating-name ${className}`}>
      {count > 0 && (
        <span key={count - 1} className="rotating-name-word gold-leaf is-leaving">{at(count - 1)}</span>
      )}
      <span key={count} className={`rotating-name-word gold-leaf${count > 0 ? ' is-entering' : ''}`}>{at(count)}</span>
    </span>
  );
}
