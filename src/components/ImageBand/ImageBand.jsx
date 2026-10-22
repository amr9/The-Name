import './ImageBand.css';

/**
 * A full-width band (edge to edge, no .container) whose background is a
 * picture under a dark, faded wash — Home's virtual-store band, and the
 * Agency page's picture separator. `src` is the picture; with none (or a
 * missing file) the band shows the footer's dark gradient. With `children`
 * it is a section holding them (Home: the heading and buttons, white on the
 * wash); without, it is a purely decorative separator, hidden from screen
 * readers.
 *
 * `wash`: [top, bottom] — how black the wash is at the band's top and foot,
 * in % (default [90, 85]; the Agency separator [90, 60]).
 * `size`: the picture's CSS background-size (default `cover`, filling the
 * band) — e.g. 'auto 140%' to set it further back (the Agency separator).
 */
export default function ImageBand({ src, className = '', children, wash, size }) {
  const style = {
    ...(src && { '--band-bg': `url("${src}")` }),
    ...(size && { '--band-size': size, '--band-base': 'var(--color-black)' }),
    ...(wash && { '--band-wash-top': `${wash[0]}%`, '--band-wash-bottom': `${wash[1]}%` }),
  };
  const cls = `image-band ${className}`;
  if (!children) return <div className={cls} style={style} aria-hidden="true" />;
  return <section className={cls} style={style}>{children}</section>;
}
