// Decorative bubble field for the services section — burger / drink marks
// that drift up through the page gutters and fade out. Purely ornamental, so
// the whole thing is aria-hidden and never takes pointer events; it is also
// hidden entirely on narrow screens (no gutter to fill) and under
// prefers-reduced-motion. Positions/timing come from `serviceBubbles` in
// this page's data.js.
import { serviceBubbles } from './data.js';

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

export default function FoodBubbles({ side }) {
  return (
    <div className={`home-bubbles home-bubbles-${side}`} aria-hidden="true">
      {serviceBubbles
        .filter((b) => b.side === side)
        .map((b) => (
          <span
            key={b.id}
            className="home-bubble"
            style={{
              '--bubble-x': `${b.x}%`,
              '--bubble-y': `${b.y}%`,
              '--bubble-size': `${b.size}px`,
              '--bubble-delay': `${b.delay}s`,
              '--bubble-duration': `${b.duration}s`,
              '--bubble-drift': `${b.drift}px`,
            }}
          >
            <svg className="home-bubble-icon" viewBox="0 0 24 24" fill="currentColor">
              {icons[b.icon]}
            </svg>
          </span>
        ))}
    </div>
  );
}
