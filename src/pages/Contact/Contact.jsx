import { useState } from 'react';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import WhatsAppButton from '../../components/WhatsAppButton.jsx';
import { site } from '../../data/site.js';
import './Contact.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // No backend wired up yet — replace with a real submit handler
    // (an API route, a form service, mailto, etc.) when you have one.
    setSubmitted(true);
  }

  return (
    <div className="container contact-page">
      <span className="card-kicker">Get in touch</span>
      <h1>Come find us</h1>
      <p className="contact-intro">Tables, private events, or just directions — we usually reply within the hour.</p>

      <div className="contact-grid">
        <div>
          <ImagePlaceholder label="Map or exterior photo of the venue" ratio="16 / 10" />

          <div className="contact-details">
            <div className="contact-detail">
              <h6>Address</h6>
              <p>{site.address}</p>
            </div>
            <div className="contact-detail">
              <h6>Phone / WhatsApp</h6>
              <p>{site.phone}</p>
            </div>
            <div className="contact-detail">
              <h6>Online</h6>
              <p>{site.website} · {site.instagram}</p>
            </div>
          </div>

          <div className="contact-hours">
            <h6>Opening hours</h6>
            {site.hours.map((h) => (
              <div key={h.day} className="contact-hours-row">
                <span>{h.day}</span>
                <span>{h.time}</span>
              </div>
            ))}
          </div>

          <WhatsAppButton className="btn btn-primary btn-block" />
        </div>

        <div className="contact-form-wrap">
          <h3>Send a message</h3>
          {submitted ? (
            <p className="contact-form-success">Thanks — we'll get back to you shortly.</p>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <label className="contact-field">
                <span>Name</span>
                <input type="text" name="name" required />
              </label>
              <label className="contact-field">
                <span>Email</span>
                <input type="email" name="email" required />
              </label>
              <label className="contact-field">
                <span>Message</span>
                <textarea name="message" rows={5} required />
              </label>
              <button type="submit" className="btn btn-primary btn-block">Send message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
