import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import WhatsAppButton from '../WhatsAppButton.jsx';
import { chatTopics } from '../../data/chatbot.js';
import en from '../../i18n/translations/en.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { BackIcon, CloseIcon } from './icons.jsx';

// The on-site assistant: a guided, rule-based chat. Visitors tap a topic or
// type a question, which is matched against each topic's keywords — the
// active language's and English's, so either works. There is no server and
// no AI model: every answer is site copy from i18n, and anything it cannot
// match is offered to WhatsApp instead.
//
// The log stores topic ids, not text, so switching language mid-chat
// re-renders the whole conversation in the new language.

// How long the assistant "types" before its answer appears, so a reply reads
// as a reply rather than as the button's own output.
//
// The lock this drives is also the spam guard. Nothing here talks to a server
// — every answer is local i18n copy — so tapping the quick replies fast cannot
// put load on anything. What it CAN do is flood the log and, once there is a
// delay, race the timers so answers interleave or arrive out of order. Holding
// the lock until the answer lands makes both impossible: one timer at a time,
// and the controls are disabled while it runs.
const REPLY_DELAY_MS = 900;

export default function Chatbot({ onBack, onClose }) {
  const { t } = useLanguage();
  const c = t.chat;
  const [log, setLog] = useState([{ from: 'bot', kind: 'greeting' }]);
  const [draft, setDraft] = useState('');
  // True from the moment a question is asked until its answer lands.
  const [pending, setPending] = useState(false);
  const logRef = useRef(null);
  const inputRef = useRef(null);
  const timer = useRef(null);
  // The authoritative lock. `pending` above is for rendering only: it does not
  // change until the next render, so two handlers firing in the SAME tick
  // would both read it as false, both start a timer, and the second would
  // overwrite the first's handle — leaking a timeout that still fires and
  // appends a duplicate answer. A ref flips synchronously, so the second call
  // is turned away however fast the taps arrive.
  const busy = useRef(false);

  useEffect(() => { inputRef.current?.focus(); }, []);
  // The panel is unmounted on close (see ChatLauncher), so a reply still in
  // flight would otherwise fire into a component that is gone.
  useEffect(() => () => clearTimeout(timer.current), []);
  // Follows the indicator too, not just new messages.
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log, pending]);

  // The visitor's own message appears at once and the answer follows after the
  // pause, the way a messaging app behaves. The guard is what stops a burst of
  // taps queueing up a run of answers.
  const reply = (topicId, userText) => {
    if (busy.current) return;
    busy.current = true;
    setPending(true);
    setLog((l) => [...l, { from: 'user', text: userText }]);
    timer.current = setTimeout(() => {
      setLog((l) => [
        ...l,
        topicId ? { from: 'bot', kind: 'topic', topicId } : { from: 'bot', kind: 'fallback' },
      ]);
      busy.current = false;
      setPending(false);
    }, REPLY_DELAY_MS);
  };

  const match = (text) => {
    const q = text.toLocaleLowerCase();
    const hit = chatTopics.find((topic) => {
      const words = [...(c.topics[topic.id].keywords ?? []), ...en.chat.topics[topic.id].keywords];
      return words.some((w) => q.includes(w.toLocaleLowerCase()));
    });
    return hit ? hit.id : null;
  };

  const submit = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || busy.current) return;
    reply(match(text), text);
    setDraft('');
  };

  const methods = t.home.howItWorks;

  function BotMessage({ msg }) {
    if (msg.kind !== 'topic') {
      return (
        <div className="chatbot-msg chatbot-msg-bot">
          <p>{msg.kind === 'fallback' ? c.fallback : c.greeting}</p>
          {msg.kind === 'fallback' && (
            <WhatsAppButton className="btn btn-primary chatbot-wa">{c.continueWhatsapp}</WhatsAppButton>
          )}
        </div>
      );
    }
    const topic = chatTopics.find((x) => x.id === msg.topicId);
    const copy = c.topics[msg.topicId];
    return (
      <div className="chatbot-msg chatbot-msg-bot">
        <p>{copy.answer}</p>
        {topic.appendMethods && (
          <ul>
            {Object.entries(methods.methods).map(([id, m]) => (
              <li key={id}>{m.name} — {m.lead} · {methods.minimum}: {m.minimum}</li>
            ))}
          </ul>
        )}
        {topic.to && <Link to={topic.to} className="chatbot-link" onClick={onClose}>{c.openPage}</Link>}
        {topic.whatsapp && (
          <WhatsAppButton className="btn btn-primary chatbot-wa">{c.continueWhatsapp}</WhatsAppButton>
        )}
      </div>
    );
  }

  return (
    <div className="chatbot" role="dialog" aria-label={c.assistantName}>
      <header className="chatbot-head">
        <button type="button" className="btn btn-icon chatbot-icon-btn chatbot-back" onClick={onBack} aria-label={c.back}>
          <BackIcon size={18} />
        </button>
        <div className="chatbot-id">
          <strong>{c.assistantName}</strong>
          <span>{c.assistantStatus}</span>
        </div>
        <button type="button" className="btn btn-icon chatbot-icon-btn" onClick={onClose} aria-label={c.close}>
          <CloseIcon size={18} />
        </button>
      </header>

      <div ref={logRef} className="chatbot-log" aria-live="polite">
        {log.map((msg, i) => (msg.from === 'user'
          ? <p key={i} className="chatbot-msg chatbot-msg-user">{msg.text}</p>
          : <BotMessage key={i} msg={msg} />))}

        {/* The same bubble as a bot message, with dots instead of copy. The
            dots are decorative — the label on the bubble is what a screen
            reader announces. */}
        {pending && (
          <div className="chatbot-msg chatbot-msg-bot chatbot-typing" role="status" aria-label={c.typing}>
            <span className="chatbot-typing-dot" aria-hidden="true" />
            <span className="chatbot-typing-dot" aria-hidden="true" />
            <span className="chatbot-typing-dot" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="chatbot-topics">
        {chatTopics.map((topic) => (
          <button
            key={topic.id}
            type="button"
            className="chatbot-topic"
            disabled={pending}
            onClick={() => reply(topic.id, c.topics[topic.id].label)}
          >
            {c.topics[topic.id].label}
          </button>
        ))}
      </div>

      <form className="chatbot-form" onSubmit={submit}>
        <input
          id="chatbot-input"
          ref={inputRef}
          className="chatbot-input"
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={c.placeholder}
          aria-label={c.placeholder}
          autoComplete="off"
          maxLength={300}
        />
        <button type="submit" className="btn btn-primary chatbot-send" disabled={!draft.trim() || pending}>{c.send}</button>
      </form>
    </div>
  );
}
