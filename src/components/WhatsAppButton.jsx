import { waLink } from '../data/site.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import WhatsAppIcon from './WhatsAppIcon.jsx';

// Every WhatsApp trigger on the site is one of these two, and both point at
// `waLink` — which is derived from `site.phone` in data/site.js, so the
// number lives in exactly one place.
export default function WhatsAppButton({ className = 'btn btn-primary', children, style }) {
  const { t } = useLanguage();
  return (
    <a href={waLink} target="_blank" rel="noopener noreferrer" className={className} style={style}>
      <WhatsAppIcon />
      {children ?? t.common.whatsapp}
    </a>
  );
}

export function WhatsAppFab() {
  const { t } = useLanguage();
  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-primary whatsapp-fab"
      aria-label={t.common.chatOnWhatsapp}
    >
      <WhatsAppIcon size={24} />
    </a>
  );
}
