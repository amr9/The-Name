// Single source for the shop glyph — a shopping bag, used as the leading mark
// on every button that sends the visitor to the store (Home's personal-gifts
// CTA, the store hero, the Kids shop links). Drawn to match WhatsAppIcon:
// 24×24, stroked in `currentColor`, so it inherits each button variant's
// color. Never redefine this SVG inline elsewhere; import it here instead.
export default function ShopIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
      <path d="M4.5 8h15l-1.1 12.1a1 1 0 0 1-1 .9H6.6a1 1 0 0 1-1-.9L4.5 8z" />
      <path d="M8.5 8V6a3.5 3.5 0 0 1 7 0v2" />
    </svg>
  );
}
