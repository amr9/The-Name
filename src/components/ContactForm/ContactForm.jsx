import { useRef, useState } from 'react';
import WhatsAppButton from '../WhatsAppButton.jsx';
import { site, mapsLink } from '../../data/site.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { contactFields, honeypotField, timingField, validateContact } from '../../../shared/contactForm.js';
import './ContactForm.css';

const EMPTY = Object.fromEntries(contactFields.map((f) => [f.id, '']));

// Where the form posts. Same-origin '/api/contact' by default, which the
// dev server proxies to the Node service in /server (see vite.config.js);
// set VITE_CONTACT_ENDPOINT to the deployed service's full URL in the build
// environment when the two are on different hosts.
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact';

/**
 * The enquiry form and the details beside it. This was its own page (/contact)
 * until the form moved to the foot of the About page — it is a component now
 * so the page that hosts it owns the surrounding layout. The heading is an
 * <h2>: the host page already has the <h1>.
 */
export default function ContactForm() {
  const { t } = useLanguage();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed | rateLimited
  // Bots fill in every field they find; humans never see this one.
  const [honeypot, setHoneypot] = useState('');
  // When the form appeared. The server reads the gap between this and the
  // submission: nobody types a real enquiry in under a few seconds, so a
  // near-instant one is a strong bot signal. A ref, not state — it must not
  // be reset by a re-render, and nothing renders from it.
  const openedAt = useRef(Date.now());

  const set = (id) => (e) => {
    setValues((v) => ({ ...v, [id]: e.target.value }));
    // Clear a field's error as soon as the visitor starts fixing it.
    setErrors((prev) => (prev[id] ? { ...prev, [id]: undefined } : prev));
  };

  // The rules themselves live in /shared/contactForm.js so the server can
  // apply the identical ones; here we only turn its keys into copy.
  const validate = () => {
    const keys = validateContact(values);
    return Object.fromEntries(
      Object.entries(keys).map(([id, key]) => [id, t.contact.errors[key]])
    );
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          [honeypotField]: honeypot,
          [timingField]: Date.now() - openedAt.current,
        }),
      });

      // 400 means the server caught something we could not — a bad field,
      // or an address whose domain cannot receive mail (only the server can
      // check that). It answers with `fieldKeys` for us to translate and
      // `fields` in English for anyone calling the API directly.
      if (res.status === 400) {
        const data = await res.json().catch(() => ({}));
        const keys = data.fieldKeys ?? {};
        setErrors(
          Object.keys(keys).length > 0
            ? Object.fromEntries(
                Object.entries(keys).map(([id, key]) => [id, t.contact.errors[key] ?? data.fields?.[id]])
              )
            : data.fields ?? {}
        );
        setStatus('idle');
        return;
      }

      // 429 is the rate limiter, not a broken form — say so specifically
      // rather than telling them to try again immediately.
      if (res.status === 429) {
        setStatus('rateLimited');
        return;
      }

      if (!res.ok) throw new Error(`contact endpoint returned ${res.status}`);

      setStatus('sent');
    } catch (err) {
      console.error('[contact] submission failed:', err);
      setStatus('failed');
    }
  };

  if (status === 'sent') {
    return (
      <div className="contact-sent">
        <span className="card-kicker">{t.contact.kicker}</span>
        <h2 className="contact-sent-title">{t.contact.sentTitle}</h2>
        <p className="contact-sent-body">{t.contact.sentBody}</p>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            setValues(EMPTY);
            setHoneypot('');
            setStatus('idle');
            openedAt.current = Date.now(); // a fresh form, so a fresh timer
          }}
        >
          {t.contact.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <div className="contact-grid">
      <div className="contact-intro">
        <span className="card-kicker">{t.contact.kicker}</span>
        <h2 className="contact-title">{t.contact.title}</h2>
        <p className="contact-body">{t.contact.body}</p>

        {/* These details are the site's ONLY copy of them: the policies page
            used to end with its own contact block and no longer does, so the
            orders address, the separate privacy address and the registered
            entity all landed here. Do not thin this list out without putting
            them somewhere else first. */}
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
          <div className="contact-detail">
            <dt>{t.contact.privacyHeading}</dt>
            <dd><a href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a></dd>
          </div>
          <div className="contact-detail">
            <dt>{t.contact.locationHeading}</dt>
            <dd>
              {/* Opens Google Maps with directions already asked for. A new
                  tab, because on a phone this hands off to the Maps app and
                  the enquiry form would otherwise be torn down mid-typing. */}
              <a
                className="contact-map-link"
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.address}
                <span className="contact-map-cue">{t.contact.directions}</span>
              </a>
            </dd>
          </div>
        </dl>

        <WhatsAppButton className="btn btn-secondary">{t.common.chatOnWhatsapp}</WhatsAppButton>

        {/* The registered entity, carried over from the policies page — the
            trading name is "The Name", but the terms bind this company. */}
        <p className="contact-entity">
          <strong>{site.legalName}</strong>
          <span>{t.contact.licenceLabel}: {site.licensedBy}</span>
        </p>
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

        {/* Hidden from sight, from screen readers and from the tab order —
            only an automated submitter ever puts anything in it. */}
        <div className="contact-honeypot" aria-hidden="true">
          <label htmlFor={`contact-${honeypotField}`}>{honeypotField}</label>
          <input
            id={`contact-${honeypotField}`}
            name={honeypotField}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {(status === 'failed' || status === 'rateLimited') && (
          <p className="contact-failed" role="alert">
            {status === 'rateLimited' ? t.contact.errors.rateLimited : t.contact.errors.send}
          </p>
        )}

        <button type="submit" className="btn btn-primary btn-block" disabled={status === 'sending'}>
          {status === 'sending' ? t.contact.sending : t.contact.send}
        </button>
        <p className="card-meta contact-privacy">{t.contact.privacy}</p>
      </form>
    </div>
  );
}
