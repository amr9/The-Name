import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import ShopIcon from '../../components/ShopIcon.jsx';
import WhatsAppButton from '../../components/WhatsAppButton.jsx';
import { media } from '../../data/media.js';
import { site } from '../../data/site.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './CustomizeSection.css';

/**
 * "Customize Yours" — a section of Home under "What we do" (the old
 * /customize route redirects to #customize). It is now ONE picture and the
 * two buttons under it; the heading, steps, product carousel and closing line
 * were removed. Drop the artwork at the path in media.customize and it
 * appears — until then ImagePlaceholder shows its dashed slot. The removed
 * copy (i18n `customize`) and data/storeCustomizable.js are kept, unused.
 */
export default function CustomizeSection() {
  const { t } = useLanguage();
  const c = t.customize;

  return (
    <section id="customize" className="home-customize">
      <div className="container">
        <ImagePlaceholder src={media.customize} label={c.title} ratio="16 / 7" className="customize-image" />

        <div className="customize-cta-actions">
          {/* To the store's OWN customizable-products page, not its shop
              front. */}
          <a className="btn btn-primary" href={site.customizableUrl}><ShopIcon />{c.ctaShop}</a>
          <WhatsAppButton className="btn btn-secondary">{t.common.chatOnWhatsapp}</WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
