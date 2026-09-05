import { useChat } from '../context/ChatContext.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import WhatsAppIcon from './WhatsAppIcon.jsx';

export default function WhatsAppButton({ className = 'btn btn-primary', children, style }) {
  const { open } = useChat();
  const { t } = useLanguage();
  return (
    <button type="button" className={className} style={style} onClick={open}>
      <WhatsAppIcon />
      {children ?? t.common.whatsapp}
    </button>
  );
}

export function WhatsAppFab() {
  const { open } = useChat();
  const { t } = useLanguage();
  return (
    <button type="button" className="btn btn-primary whatsapp-fab" aria-label={t.common.chatOnWhatsapp} onClick={open}>
      <WhatsAppIcon size={24} />
    </button>
  );
}
