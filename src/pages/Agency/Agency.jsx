import WhatsAppButton from '../../components/WhatsAppButton.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './Agency.css';

/**
 * The Agency page. For now a short introduction and a WhatsApp CTA — the
 * page's real sections (work, services) land here as the content arrives.
 * Copy is i18n `agency`.
 */
export default function Agency() {
  const { t } = useLanguage();
  const a = t.agency;

  return (
    <div className="container agency-page">
      <span className="card-kicker">{a.kicker}</span>
      <h1 className="page-title agency-title">{a.title}</h1>
      <p className="agency-lede">{a.lede}</p>
      <div className="agency-actions">
        <WhatsAppButton className="btn btn-primary">{a.cta}</WhatsAppButton>
      </div>
    </div>
  );
}
