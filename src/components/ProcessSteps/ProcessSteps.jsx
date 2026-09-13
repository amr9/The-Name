import { processSteps } from '../../data/process.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './ProcessSteps.css';

// The four steps of an order — a real sequence, so an <ol> with its own
// numbering. Shown on Home ("how it works") and on About ("how we do it").
export default function ProcessSteps() {
  const { t } = useLanguage();

  return (
    <ol className="process-steps">
      {processSteps.map((s) => {
        const step = t.process.steps[s.id];
        return (
          <li key={s.id} className="process-step">
            <span className="process-step-num">{s.num}</span>
            <h3 className="process-step-title">{step.title}</h3>
            <p className="process-step-body">{step.body}</p>
          </li>
        );
      })}
    </ol>
  );
}
