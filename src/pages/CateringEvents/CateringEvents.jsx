import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import WhatsAppButton from '../../components/WhatsAppButton.jsx';
import { media } from '../../data/media.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { tabPackageIds } from './data.js';
import './CateringEvents.css';

const TAB_KEYS = ['Events', 'Catering'];

export default function CateringEvents() {
  const { t } = useLanguage();
  const location = useLocation();
  const initialTab = location.state?.tab === 'Catering' ? 'Catering' : 'Events';
  const [tab, setTab] = useState(initialTab);
  const content = t.catering[tab];
  const packageIds = tabPackageIds[tab];

  return (
    <div className="container catering-page">
      <span className="card-kicker">{t.catering.kicker}</span>
      <h1 className="catering-title">{t.catering.title}</h1>
      <p className="catering-intro-copy">{t.catering.intro}</p>

      <div className="seg catering-tabs">
        {TAB_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            className="seg-opt catering-tab-opt"
            data-active={tab === key}
            onClick={() => setTab(key)}
          >
            {t.catering.tabs[key]}
          </button>
        ))}
      </div>

      <div className="split catering-grid">
        <div>
          <div className="washed catering-image-wrap">
            <ImagePlaceholder src={media.catering[tab]} label={content.placeholder} ratio="16 / 9" />
          </div>
          <h2 className="catering-section-title">{content.title}</h2>
          <p className="catering-section-intro">{content.intro}</p>

          <table className="table">
            <thead>
              <tr>
                <th>{content.colOne}</th>
                <th>{t.catering.coversHeader}</th>
                <th>{t.catering.noticeHeader}</th>
                <th style={{ textAlign: 'right' }}>{t.catering.fromHeader}</th>
              </tr>
            </thead>
            <tbody>
              {packageIds.map((id) => {
                const p = content.packages[id];
                return (
                  <tr key={id}>
                    <td>
                      <span className="catering-package-name">{p.name}</span>
                      <br />
                      <span className="catering-package-note">{p.note}</span>
                    </td>
                    <td style={{ fontVariantNumeric: 'tabular-nums' }}>{p.covers}</td>
                    <td>{p.notice}</td>
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{p.from}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="catering-footnote">{t.catering.footnote}</p>
        </div>

        <div className="catering-direct-line">
          <span className="catering-direct-line-kicker">{t.catering.directLineKicker}</span>
          <h3 className="catering-direct-line-title">{t.catering.directLineTitle}</h3>
          <div className="catering-ask-for">
            {content.askFor.map((a) => (
              <div key={a} className="catering-ask-for-row">
                <span className="catering-ask-for-dot" />
                <span>{a}</span>
              </div>
            ))}
          </div>
          <WhatsAppButton className="btn btn-primary btn-block" style={{ gap: 8 }}>{t.catering.openWhatsapp}</WhatsAppButton>
          <p className="catering-reply-note">{t.catering.replyNote}</p>
        </div>
      </div>
    </div>
  );
}
