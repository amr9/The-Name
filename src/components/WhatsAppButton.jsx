import { useChat } from '../context/ChatContext.jsx';

function WhatsAppIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.5 8.5 0 0 1-12.7 7.4L3 21l2.1-5.3A8.5 8.5 0 1 1 21 11.5z" />
    </svg>
  );
}

export default function WhatsAppButton({ className = 'btn btn-primary', children = 'WhatsApp', style }) {
  const { open } = useChat();
  return (
    <button type="button" className={className} style={style} onClick={open}>
      <WhatsAppIcon />
      {children}
    </button>
  );
}

export function WhatsAppFab() {
  const { open } = useChat();
  return (
    <button type="button" className="btn btn-primary whatsapp-fab" aria-label="Chat on WhatsApp" onClick={open}>
      <WhatsAppIcon size={24} />
    </button>
  );
}
