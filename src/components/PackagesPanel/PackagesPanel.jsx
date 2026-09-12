// The packages table + "direct line" WhatsApp panel, extracted from the old
// CateringEvents page when it was split in two: the Cafe page uses it for
// events held here, the Business page for off-site catering. Both render the
// identical shape, so it lives here rather than being written twice.
//
// `content` is one i18n block — { placeholder, title, intro, colOne, packages,
// askFor } — and `labels` the shared table/direct-line copy under i18n
// `packages`. `packageIds` fixes the row order and comes from the page's data.js.
import ImagePlaceholder from '../ImagePlaceholder.jsx';
import WhatsAppButton from '../WhatsAppButton.jsx';
import './PackagesPanel.css';

export default function PackagesPanel({ image, content, packageIds, labels }) {
  return (
    <div className="split packages-grid">
      <div>
        <div className="washed packages-image-wrap">
          <ImagePlaceholder src={image} label={content.placeholder} ratio="16 / 9" />
        </div>
        <h2 className="packages-section-title">{content.title}</h2>
        <p className="packages-section-intro">{content.intro}</p>

        <div className="packages-table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>{content.colOne}</th>
                <th>{labels.coversHeader}</th>
                <th>{labels.noticeHeader}</th>
                <th className="packages-col-from">{labels.fromHeader}</th>
              </tr>
            </thead>
            <tbody>
              {packageIds.map((id) => {
                const p = content.packages[id];
                return (
                  <tr key={id}>
                    <td>
                      <span className="packages-name">{p.name}</span>
                      <br />
                      <span className="packages-note">{p.note}</span>
                    </td>
                    <td className="packages-num">{p.covers}</td>
                    <td>{p.notice}</td>
                    <td className="packages-col-from packages-num">{p.from}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="packages-footnote">{labels.footnote}</p>
      </div>

      <div className="packages-direct-line">
        <span className="packages-direct-line-kicker">{labels.directLineKicker}</span>
        <h3 className="packages-direct-line-title">{labels.directLineTitle}</h3>
        <div className="packages-ask-for">
          {content.askFor.map((a) => (
            <div key={a} className="packages-ask-for-row">
              <span className="packages-ask-for-dot" />
              <span>{a}</span>
            </div>
          ))}
        </div>
        <WhatsAppButton className="btn btn-primary btn-block" style={{ gap: 8 }}>
          {labels.openWhatsapp}
        </WhatsAppButton>
        <p className="packages-reply-note">{labels.replyNote}</p>
      </div>
    </div>
  );
}
