import { waLink } from '../data/site.js';

export default function WhatsAppButton({ className = 'btn btn-primary', children = 'WhatsApp us', floating = false }) {
  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className={floating ? 'whatsapp-fab' : className}
      aria-label="Chat on WhatsApp"
    >
      <svg width={floating ? 24 : 16} height={floating ? 24 : 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.5 8.5 0 0 1-12.7 7.4L3 21l2.1-5.3A8.5 8.5 0 1 1 21 11.5z" />
      </svg>
      {!floating && children}
    </a>
  );
}
