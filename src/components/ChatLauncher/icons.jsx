// Stroke icons for the chat launcher and assistant panel, drawn to match the
// site's other line icons (24×24, currentColor).
const Svg = ({ size = 20, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

export const ChatIcon = (p) => (
  <Svg {...p}>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12z" />
    <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
  </Svg>
);

export const CloseIcon = (p) => (
  <Svg {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Svg>
);

export const BackIcon = (p) => (
  <Svg {...p}>
    <path d="M15 18l-6-6 6-6" />
  </Svg>
);

export const BotIcon = (p) => (
  <Svg {...p}>
    <rect x="4" y="8" width="16" height="12" rx="4" />
    <path d="M12 4v4M9 14h.01M15 14h.01" />
  </Svg>
);
