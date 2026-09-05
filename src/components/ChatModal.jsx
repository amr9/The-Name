import { useChat } from '../context/ChatContext.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import './ChatModal.css';

export default function ChatModal() {
  const { isOpen, close } = useChat();
  const { t } = useLanguage();
  if (!isOpen) return null;

  return (
    <div className="chat-modal-backdrop" onClick={close}>
      <div className="dialog elev-lg chat-modal" onClick={(e) => e.stopPropagation()}>
        <span className="card-kicker">{t.chat.kicker}</span>
        <h3 className="chat-modal-title">{t.chat.title}</h3>
        <p className="chat-modal-body">{t.chat.body}</p>
        <button type="button" className="btn btn-primary btn-block" onClick={close}>{t.chat.gotIt}</button>
      </div>
    </div>
  );
}
