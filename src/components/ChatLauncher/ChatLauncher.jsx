import { useEffect, useState } from 'react';
import WhatsAppButton from '../WhatsAppButton.jsx';
import { media } from '../../data/media.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import Chatbot from './Chatbot.jsx';
import { BotIcon, CloseIcon } from './icons.jsx';
import './ChatLauncher.css';

// How long a visitor reads before the nudge bubble offers to talk. Long
// enough that it lands as an offer rather than an interruption.
const NUDGE_DELAY_MS = 30_000;

// The floating button in the corner of every page. It opens a small menu
// with two ways to reach us — the on-site assistant, or WhatsApp directly —
// and hosts the assistant panel once that is picked. Beside it, a speech
// bubble pointing at the button appears after NUDGE_DELAY_MS.
export default function ChatLauncher() {
  const { t } = useLanguage();
  const [mode, setMode] = useState('closed'); // closed | menu | bot
  const [nudge, setNudge] = useState('waiting'); // waiting | shown | gone
  const close = () => setMode('closed');

  useEffect(() => {
    if (mode === 'closed') return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setMode('closed'); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode]);

  // The launcher sits outside <main>, so it survives navigation: one timer
  // per page load, not one per page viewed.
  useEffect(() => {
    if (nudge !== 'waiting') return undefined;
    const id = setTimeout(() => setNudge('shown'), NUDGE_DELAY_MS);
    return () => clearTimeout(id);
  }, [nudge]);

  // Opening the launcher any other way answers the bubble's question, so it
  // stops waiting to ask it — before the 30s are up as much as after.
  useEffect(() => {
    if (mode !== 'closed') setNudge('gone');
  }, [mode]);

  return (
    <>
      {mode === 'menu' && (
        <>
          <div className="chat-launcher-scrim" onClick={close} />
          {/* WhatsApp opens in a new tab, so following it also closes the menu */}
          <div
            className="popover chat-launcher-menu"
            role="menu"
            aria-label={t.chat.menuTitle}
            onClick={(e) => { if (e.target.closest('a')) close(); }}
          >
            <p className="chat-launcher-menu-title">{t.chat.menuTitle}</p>

            <button type="button" role="menuitem" className="popover-option chat-launcher-option" onClick={() => setMode('bot')}>
              <BotIcon />
              <span className="chat-launcher-option-text">
                <strong>{t.chat.botTitle}</strong>
                <span>{t.chat.botNote}</span>
              </span>
            </button>

            <WhatsAppButton className="popover-option chat-launcher-option chat-launcher-option-wa">
              <span className="chat-launcher-option-text">
                <strong>{t.chat.whatsappTitle}</strong>
                <span>{t.chat.whatsappNote}</span>
              </span>
            </WhatsAppButton>
          </div>
        </>
      )}

      {mode === 'bot' && <Chatbot onBack={() => setMode('menu')} onClose={close} />}

      {/* Points at the button below it, so it reads as coming from there.
          Clicking opens the menu it is pointing at, which also dismisses it
          (the effect above); it never comes back for this page load. */}
      {nudge === 'shown' && (
        <button
          type="button"
          className="chat-launcher-nudge"
          onClick={() => { setNudge('gone'); setMode('menu'); }}
        >
          {t.chat.nudge}
        </button>
      )}

      <button
        type="button"
        className="chat-launcher-fab"
        aria-label={mode === 'closed' ? t.chat.open : t.chat.close}
        aria-expanded={mode !== 'closed'}
        onClick={() => setMode(mode === 'closed' ? 'menu' : 'closed')}
      >
        {mode === 'closed'
          ? <img className="chat-launcher-fab-mark" src={media.brand.markFilled} alt="" />
          : <CloseIcon size={24} />}
      </button>
    </>
  );
}
