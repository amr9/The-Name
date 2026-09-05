import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import WhatsAppButton from '../../components/WhatsAppButton.jsx';
import { tabsContent } from './data.js';
import './CateringEvents.css';

export default function CateringEvents() {
  const location = useLocation();
  const initialTab = location.state?.tab === 'Catering' ? 'Catering' : 'Events';
  const [tab, setTab] = useState(initialTab);
  const content = tabsContent[tab];

  return (
    <div className="container catering-page">
      <span className="card-kicker">Catering</span>
      <h1 className="catering-title">Catering and events</h1>
      <p className="catering-intro-copy">
        Events happen here, in the café. Anything at your address is
        catering. Quotes are agreed in a message thread, not a form — send
        the date and the covers and we come back with a price the same day.
      </p>

      <div className="seg catering-tabs">
        {Object.entries(tabsContent).map(([key, t]) => (
          <button
            key={key}
            type="button"
            className="seg-opt catering-tab-opt"
            data-active={tab === key}
            onClick={() => setTab(key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="split catering-grid">
        <div>
          <div className="washed catering-image-wrap">
            <ImagePlaceholder label={content.placeholder} ratio="16 / 9" />
          </div>
          <h2 className="catering-section-title">{content.title}</h2>
          <p className="catering-section-intro">{content.intro}</p>

          <table className="table">
            <thead>
              <tr>
                <th>{content.colOne}</th>
                <th>Covers</th>
                <th>Notice</th>
                <th style={{ textAlign: 'right' }}>From</th>
              </tr>
            </thead>
            <tbody>
              {content.packages.map((p) => (
                <tr key={p.name}>
                  <td>
                    <span className="catering-package-name">{p.name}</span>
                    <br />
                    <span className="catering-package-note">{p.note}</span>
                  </td>
                  <td style={{ fontVariantNumeric: 'tabular-nums' }}>{p.covers}</td>
                  <td>{p.notice}</td>
                  <td style={{ textAlign: 'right', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{p.from}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="catering-footnote">Prices per head, excluding VAT and delivery. Standing orders of four weeks or more are discounted 10%.</p>
        </div>

        <div className="catering-direct-line">
          <span className="catering-direct-line-kicker">Direct line</span>
          <h3 className="catering-direct-line-title">Send us the date and the covers</h3>
          <div className="catering-ask-for">
            {content.askFor.map((a) => (
              <div key={a} className="catering-ask-for-row">
                <span className="catering-ask-for-dot" />
                <span>{a}</span>
              </div>
            ))}
          </div>
          <WhatsAppButton className="btn btn-primary btn-block" style={{ gap: 8 }}>Open WhatsApp</WhatsAppButton>
          <p className="catering-reply-note">Replies within one working day · Mon–Fri 08:00–18:00</p>
        </div>
      </div>
    </div>
  );
}
