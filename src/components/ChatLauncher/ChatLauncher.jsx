import { useEffect, useState } from 'react';
import WhatsAppButton from '../WhatsAppButton.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import Chatbot from './Chatbot.jsx';
import { BotIcon, ChatIcon, CloseIcon } from './icons.jsx';
import './ChatLauncher.css';

// The floating button in the corner of every page. It opens a small menu
// with two ways to reach us — the on-site assistant, or WhatsApp directly —
// and hosts the assistant panel once that is picked.
export default function ChatLauncher() {
  const { t } = useLanguage();
  const [mode, setMode] = useState('closed'); // closed | menu | bot
  const close = () => setMode('closed');

  useEffect(() => {
    if (mode === 'closed') return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setMode('closed'); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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

      <button
        type="button"
        className="btn btn-primary chat-launcher-fab"
        aria-label={mode === 'closed' ? t.chat.open : t.chat.close}
        aria-expanded={mode !== 'closed'}
        onClick={() => setMode(mode === 'closed' ? 'menu' : 'closed')}
      >
        {mode === 'closed' ? <ChatIcon size={24} /> : <CloseIcon size={24} />}
      </button>
    </>
  );
}
