import { useState } from 'react';
import WhatsAppButton from '../../components/WhatsAppButton.jsx';
import { site } from '../../data/site.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { contactFields, emailPattern } from './data.js';
import './Contact.css';

const EMPTY = Object.fromEntries(contactFields.map((f) => [f.id, '']));

export default function Contact() {
  const { t } = useLanguage();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const set = (id) => (e) => {
    setValues((v) => ({ ...v, [id]: e.target.value }));
    // Clear a field's error as soon as the visitor starts fixing it.
    setErrors((prev) => (prev[id] ? { ...prev, [id]: undefined } : prev));
  };

  const validate = () => {
    const found = {};
    contactFields.forEach((f) => {
      const value = values[f.id].trim();
      if (f.required && !value) found[f.id] = t.contact.errors.required;
      else if (f.id === 'email' && value && !emailPattern.test(value)) found[f.id] = t.contact.errors.email;
    });
    return found;
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus('sending');
    // TODO: nothing sends yet — no endpoint is wired up. Replace this block
    // with the POST to the form relay / backend and the address in
    // `site.email` becomes the delivery target. Everything around it (the
    // validation above, the sending + sent states below) is already in place.
    console.warn('[contact] submission not sent — no endpoint configured yet:', values);
    await new Promise((r) => setTimeout(r, 400));
    setStatus('sent');
  };

  if (status === 'sent') {
    return (
      <div className="container contact-page">
        <div className="contact-sent">
          <span className="card-kicker">{t.contact.kicker}</span>
          <h1 className="contact-sent-title">{t.contact.sentTitle}</h1>
          <p className="contact-sent-body">{t.contact.sentBody}</p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => { setValues(EMPTY); setStatus('idle'); }}
          >
            {t.contact.sendAnother}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container contact-page">
      <div className="contact-grid">
        <div className="contact-intro">
          <span className="card-kicker">{t.contact.kicker}</span>
          <h1 className="contact-title">{t.contact.title}</h1>
          <p className="contact-body">{t.contact.body}</p>

          <dl className="contact-details">
            <div className="contact-detail">
              <dt>{t.contact.emailHeading}</dt>
              <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
            </div>
            <div className="contact-detail">
              <dt>{t.contact.phoneHeading}</dt>
              {/* <bdi dir="ltr"> keeps the + and the digit groups in order
                  under Arabic without dragging the line's alignment with it. */}
              <dd><bdi dir="ltr">{site.phone}</bdi></dd>
            </div>
          </dl>

          <WhatsAppButton className="btn btn-secondary">{t.common.chatOnWhatsapp}</WhatsAppButton>
        </div>

        <form className="contact-form" onSubmit={submit} noValidate>
          {contactFields.map((f) => {
            const copy = t.contact.fields[f.id];
            const error = errors[f.id];
            const shared = {
              id: `contact-${f.id}`,
              name: f.id,
              value: values[f.id],
              onChange: set(f.id),
              placeholder: copy.placeholder,
              'aria-invalid': error ? true : undefined,
              'aria-describedby': error ? `contact-${f.id}-error` : undefined,
              className: 'contact-input',
            };

            return (
              <div key={f.id} className="contact-field">
                <label htmlFor={shared.id} className="contact-label">
                  {copy.label}
                  {!f.required && <span className="contact-optional">{t.contact.optional}</span>}
                </label>

                {f.type === 'textarea'
                  ? <textarea {...shared} rows={f.rows} />
                  : <input {...shared} type={f.type} autoComplete={f.autoComplete} />}

                {error && <span id={`${shared.id}-error`} className="contact-error">{error}</span>}
              </div>
            );
          })}

          <button type="submit" className="btn btn-primary btn-block" disabled={status === 'sending'}>
            {status === 'sending' ? t.contact.sending : t.contact.send}
          </button>
          <p className="card-meta contact-privacy">{t.contact.privacy}</p>
        </form>
      </div>
    </div>
  );
}
