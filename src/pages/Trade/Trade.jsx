import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import WhatsAppButton from '../../components/WhatsAppButton.jsx';
import { tabsContent } from './data.js';
import './Trade.css';

export default function Trade() {
  const location = useLocation();
  const initialTab = location.state?.tab === 'Catering' ? 'Catering' : 'Events';
  const [tab, setTab] = useState(initialTab);
  const content = tabsContent[tab];

  return (
    <div className="container trade-page">
      <span className="card-kicker">Trade</span>
      <h1 className="trade-title">Catering and events</h1>
      <p className="trade-intro-copy">
        Events happen here, in the café. Anything at your address is
        catering. Quotes are agreed in a message thread, not a form — send
        the date and the covers and we come back with a price the same day.
      </p>

      <div className="seg trade-tabs">
        {Object.entries(tabsContent).map(([key, t]) => (
          <button
            key={key}
            type="button"
            className="seg-opt trade-tab-opt"
            data-active={tab === key}
            onClick={() => setTab(key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="split trade-grid">
        <div>
          <div className="washed trade-image-wrap">
            <ImagePlaceholder label={content.placeholder} ratio="16 / 9" />
          </div>
          <h2 className="trade-section-title">{content.title}</h2>
          <p className="trade-section-intro">{content.intro}</p>

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
                    <span className="trade-package-name">{p.name}</span>
                    <br />
                    <span className="trade-package-note">{p.note}</span>
                  </td>
                  <td style={{ fontVariantNumeric: 'tabular-nums' }}>{p.covers}</td>
                  <td>{p.notice}</td>
                  <td style={{ textAlign: 'right', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{p.from}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="trade-footnote">Prices per head, excluding VAT and delivery. Standing orders of four weeks or more are discounted 10%.</p>
        </div>

        <div className="trade-direct-line">
          <span className="trade-direct-line-kicker">Direct line</span>
          <h3 className="trade-direct-line-title">Send us the date and the covers</h3>
          <div className="trade-ask-for">
            {content.askFor.map((a) => (
              <div key={a} className="trade-ask-for-row">
                <span className="trade-ask-for-dot" />
                <span>{a}</span>
              </div>
            ))}
          </div>
          <WhatsAppButton className="btn btn-primary btn-block" style={{ gap: 8 }}>Open WhatsApp</WhatsAppButton>
          <p className="trade-reply-note">Replies within one working day · Mon–Fri 08:00–18:00</p>
        </div>
      </div>
    </div>
  );
}
