import ImagePlaceholder from '../ImagePlaceholder.jsx';
import './VideoPlaceholder.css';

/**
 * A video slot standing in for footage that has not been delivered yet: the
 * poster still if there is one, the dashed <ImagePlaceholder> if not, with a
 * decorative play badge over it. Purely a placeholder — there is nothing to
 * play, so the badge is aria-hidden and takes no pointer events.
 *
 * This was the About page's own `.about-video-frame` markup; the Kids
 * activation section wanted the same frame, so it moved here rather than
 * being pasted a second time.
 *
 * To go live, swap the whole component out for a real <video> on the page
 * that hosts it:
 *
 *   <figure className="video-frame">
 *     <video className="video-slot" controls preload="metadata" poster={poster}>
 *       <source src={src} type="video/mp4" />
 *     </video>
 *   </figure>
 */
export default function VideoPlaceholder({ poster, label, ratio = '16 / 9', className = '' }) {
  return (
    <figure className={`video-frame ${className}`}>
      <ImagePlaceholder src={poster} label={label} ratio={ratio} className="video-slot" />
      <span className="video-play" aria-hidden="true">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5.5v13l11-6.5z" />
        </svg>
      </span>
    </figure>
  );
}
