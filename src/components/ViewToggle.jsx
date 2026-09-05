// Shared List/Cards segmented toggle — used by Menu and VertexPieces.
// Reuse this instead of re-writing the same seg-opt markup per page.
const OPTIONS = [
  { key: 'List', icon: '☰' },
  { key: 'Cards', icon: '▦' },
];

export default function ViewToggle({ view, onChange, listLabel, cardsLabel }) {
  const labels = { List: listLabel, Cards: cardsLabel };
  return (
    <div className="seg">
      {OPTIONS.map((o) => (
        <button
          key={o.key}
          type="button"
          className="seg-opt view-toggle-opt"
          data-active={view === o.key}
          onClick={() => onChange(o.key)}
        >
          <span>{o.icon}</span>
          {labels[o.key]}
        </button>
      ))}
    </div>
  );
}
