import { waLink } from '../data/site.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import WhatsAppIcon from './WhatsAppIcon.jsx';

// Every WhatsApp trigger on the site is one of these two, and both point at
// `waLink` — which is derived from `site.phone` in data/site.js, so the
// number lives in exactly one place.
// `iconOnly` shows the icon alone; `children` then becomes the link's
// accessible name instead of its visible text (e.g. the Cafe menu cards).
export default function WhatsAppButton({ className = 'btn btn-primary', children, style, iconOnly = false }) {
  const { t } = useLanguage();
  const label = children ?? t.common.whatsapp;
  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      aria-label={iconOnly ? label : undefined}
    >
      <WhatsAppIcon />
      {!iconOnly && label}
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
