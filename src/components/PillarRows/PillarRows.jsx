import { useEffect, useRef } from 'react';
import useScrollStage from '../../hooks/useScrollStage.js';
import './PillarRows.css';

/**
 * The zig-zag rows of Home's "What we do" and of the Brands page — one
 * component, so both pages share one look and one behaviour.
 *
 * Desktop and tablet: one row per entry, text beside a 4:5 media frame with
 * a ring behind it, alternating sides. Phones (STAGE_QUERY): the rows become
 * ONE pinned stage that the scroll moves through (hooks/useScrollStage).
 *
 * `rows`: [{ key, num?, mark?, title, label, lead, body?, tags?, actions,
 *   media, bare?, wide?, mediaClass? }]
 *   num        — the kicker number; defaults to the row's position, 01, 02…
 *   mark       — an optional node after the number's rule (Brands: the logo)
 *   title      — the heading's content; `label` is its plain text, for the dots
 *   actions    — the buttons (a node)
 *   media      — ({ active }) => node. `active` is false for a row hidden on
 *                the phone stage (pause its film), undefined elsewhere
 *   bare       — media is NOT wrapped in the rounded, shadowed frame (the
 *                Brands page's product cards bring their own)
 *   wide       — a wider media column (.pillar-figure-wide)
 *   mediaClass — an extra class on the frame (Home: .washed on placeholders)
 * `titleAs`: the heading level — h3 under Home's section h2, h2 on Brands.
 * More than DOTS_MAX rows show a "04 / 19" counter instead of dots.
 */

// Every row's picture or film — photo, placeholder or video — sits in ONE
// frame shape, portrait 4:5 (the shape the films are cut to). Media of
// another shape FILLS it (object-fit: cover), cropped at the edges rather
// than letterboxed. The frame's WIDTH is capped in PillarRows.css
// (.pillar-figure). On the phone stage the frame keeps the same 4:5, sized
// to the space the text leaves (--text-band).
export const ROW_RATIO = '4 / 5';

const DOTS_MAX = 6;

// Phones only: the rows become ONE pinned stage. Keep in step with the
// @media in PillarRows.css's "pillar stage" block.
export const STAGE_QUERY = '(max-width: 760px)';

// A row's specialities as chips. On the phone stage the list is one line
// that swipes sideways (PillarRows.css), and the slim bar under it shows where:
// the gold thumb is as wide as the visible share of the row and travels with
// the swipe. Written to CSS variables on scroll, no re-render. When the
// chips all fit (or on wider screens, where they wrap) the bar is hidden.
function TagRow({ tags }) {
  const listRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    const bar = barRef.current;
    const update = () => {
      const { scrollWidth, clientWidth, scrollLeft } = list;
      const max = scrollWidth - clientWidth;
      // scrollLeft runs negative under RTL, hence the abs().
      const pos = max > 0 ? Math.min(1, Math.abs(scrollLeft) / max) : 0;
      bar.style.setProperty('--thumb-size', (scrollWidth ? clientWidth / scrollWidth : 1).toFixed(4));
      bar.style.setProperty('--thumb-pos', pos.toFixed(4));
      bar.toggleAttribute('data-fits', max <= 1);
    };
    update();
    list.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      list.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [tags]);

  return (
    <>
      <ul className="pillar-tags" ref={listRef}>
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <div className="pillar-tags-bar" ref={barRef} aria-hidden="true" />
    </>
  );
}

export default function PillarRows({ rows, titleAs: Title = 'h3' }) {
  const stage = useScrollStage(rows.length, {
    query: STAGE_QUERY,
    rowSelector: '.pillar-row',
    bandSelector: '.pillar-row .pillar-text',
  });
  const pad = (n) => String(n).padStart(2, '0');

  return (
    // Desktop and tablet: the rows below simply stack. Phones: the track is
    // tall and the stage inside it is pinned, so scrolling swaps one row for
    // the next in place (hooks/useScrollStage; PillarRows.css "pillar stage").
    <div className="pillars" ref={stage.trackRef} style={{ '--pillar-count': rows.length }}>
      <div className="pillars-stage" ref={stage.stageRef}>
        {rows.length > DOTS_MAX ? (
          <div className="pillars-counter" aria-hidden="true">
            {/* dir="ltr" on the numbers only: "04 / 19" must not flip to
                "19 / 04" under RTL, while the box keeps its RTL corner. */}
            <span dir="ltr"><strong>{pad(stage.active + 1)}</strong> / {pad(rows.length)}</span>
          </div>
        ) : (
          <div className="stage-dots">
            {rows.map((r, i) => (
              <button
                key={r.key}
                type="button"
                className={`stage-dot${i === stage.active ? ' is-active' : ''}`}
                aria-label={r.label}
                aria-current={i === stage.active ? 'true' : undefined}
                onClick={() => stage.goTo(i)}
              />
            ))}
          </div>
        )}
        {rows.map((r, i) => {
          // Rows zig-zag: text first on even rows, media first on odd ones.
          const textOrder = i % 2 === 0 ? 1 : 2;
          // Where this row sits relative to the stage's active one.
          const pos = i === stage.active ? 'active' : i < stage.active ? 'before' : 'after';
          const hidden = stage.isStage && pos !== 'active';
          const media = r.media({ active: stage.isStage ? pos === 'active' : undefined });
          return (
            <section
              key={r.key}
              className="container pillar-row"
              data-pos={pos}
              // The phone stage's starting state (row 01 shown), for the
              // pre-rendered HTML; useScrollStage takes over from here.
              // Plain CSS variables, read only by the stage CSS.
              style={{ '--d': Math.sign(i), '--ad': i ? 1 : 0, '--o': i ? 0 : 1, '--ot': i ? 0 : 1, '--vis': i ? 'hidden' : 'visible' }}
              // A hidden row's buttons must not take keyboard focus (React 18
              // passes `inert` through only as a string attribute).
              inert={hidden ? '' : undefined}
            >
              <div className="row-flip pillar-grid">
                <div className="row-text pillar-text" style={{ order: textOrder }}>
                  <div className="pillar-kicker-row">
                    <span className="pillar-num">{r.num ?? pad(i + 1)}</span>
                    <span className="pillar-rule" />
                    {r.mark}
                  </div>
                  <Title className="pillar-title">{r.title}</Title>
                  <p className="pillar-lead">{r.lead}</p>
                  {r.body && <p className="pillar-body">{r.body}</p>}
                  {r.tags?.length > 0 && <TagRow tags={r.tags} />}
                  <div className="pillar-ctas">{r.actions}</div>
                </div>
                <figure
                  className={`row-img pillar-figure${r.wide ? ' pillar-figure-wide' : ''}`}
                  style={{ order: 3 - textOrder }}
                >
                  <div className="pillar-ring" />
                  {r.bare ? media : (
                    <div className={`pillar-image-wrap${r.mediaClass ? ` ${r.mediaClass}` : ''}`}>{media}</div>
                  )}
                </figure>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
