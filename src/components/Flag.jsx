/**
 * The two language flags, drawn inline.
 *
 * They are SVG and not emoji on purpose: Windows ships no flag glyphs, so
 * "🇦🇪" renders there as the bare letters "AE" — the one place a flag has to
 * work is the one where the emoji does not. Drawn instead of imported so the
 * switcher costs no extra request and the flags inherit the same rounding as
 * the rest of the UI.
 *
 * The Union Jack stands for English (the site's English copy is en-GB spelling
 * throughout) and the UAE flag for Arabic, as asked: the store is licensed in
 * and delivers only within the UAE, so the Emirati flag is the right one for
 * the Arabic reader rather than any pan-Arab alternative.
 */

// 60×40 (3:2) for both, so they line up in the menu at one size.
const FLAGS = {
  EN: (
    <>
      <rect width="60" height="40" fill="#012169" />
      {/* White then red saltire. The real flag counterchanges the red arms
          around the centre; at 18px that offset is sub-pixel, so they are
          drawn centred. */}
      <path d="M0 0 60 40M60 0 0 40" stroke="#fff" strokeWidth="8" />
      <path d="M0 0 60 40M60 0 0 40" stroke="#C8102E" strokeWidth="3.2" />
      <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="13" />
      <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="7.5" />
    </>
  ),
  AR: (
    <>
      {/* UAE: red hoist band, then green / white / black bands. */}
      <rect width="60" height="40" fill="#fff" />
      <rect y="0" width="60" height="13.34" fill="#00732F" />
      <rect y="26.66" width="60" height="13.34" fill="#000" />
      <rect width="15" height="40" fill="#FF0000" />
    </>
  ),
};

export default function Flag({ code, size = 18 }) {
  const art = FLAGS[code];
  if (!art) return null;
  return (
    <svg
      className="flag"
      viewBox="0 0 60 40"
      width={size}
      height={(size * 2) / 3}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      {art}
    </svg>
  );
}
