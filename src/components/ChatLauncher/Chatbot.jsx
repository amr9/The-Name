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
export default function Chatbot({ onBack, onClose }) {
  const { t } = useLanguage();
  const c = t.chat;
  const [log, setLog] = useState([{ from: 'bot', kind: 'greeting' }]);
  const [draft, setDraft] = useState('');
  const logRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log]);

  const reply = (topicId, userText) => setLog((l) => [
    ...l,
    { from: 'user', text: userText },
    topicId ? { from: 'bot', kind: 'topic', topicId } : { from: 'bot', kind: 'fallback' },
  ]);

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
    if (!text) return;
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
      </div>

      <div className="chatbot-topics">
        {chatTopics.map((topic) => (
          <button key={topic.id} type="button" className="chatbot-topic" onClick={() => reply(topic.id, c.topics[topic.id].label)}>
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
        <button type="submit" className="btn btn-primary chatbot-send" disabled={!draft.trim()}>{c.send}</button>
      </form>
    </div>
  );
}
