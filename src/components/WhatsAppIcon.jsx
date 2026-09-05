// Single source for the WhatsApp glyph — reused by WhatsAppButton, the
// floating WhatsAppFab, and the footer's phone link. Never redefine this
// SVG inline elsewhere; import it here instead.
export default function WhatsAppIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
      <path d="M21 11.5a8.5 8.5 0 0 1-12.7 7.4L3 21l2.1-5.3A8.5 8.5 0 1 1 21 11.5z" />
    </svg>
  );
}
