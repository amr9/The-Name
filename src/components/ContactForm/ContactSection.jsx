import ContactForm from './ContactForm.jsx';

/**
 * The contact section as a whole — the cream band, its #contact anchor and the
 * form inside it. The About page and the foot of Home both render THIS, so
 * the two are one thing: change the band, the form or its copy here (or in
 * ContactForm) and both pages follow. Styles are .contact-section in
 * ContactForm.css.
 */
export default function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <ContactForm />
      </div>
    </section>
  );
}
