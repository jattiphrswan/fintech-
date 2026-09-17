import { CreditCard, Wifi } from 'lucide-react';
import { keyBenefits } from '../../data/keyBenefits';
import '../../styles/key-benefits.css';

function CreditCardVisual() {
  return <div className="benefits-credit" aria-hidden="true">
    <div className="benefits-bank-card">
      <div className="benefits-card-top"><strong>Payline</strong><Wifi size={22} /></div>
      <CreditCard className="benefits-chip" size={32} strokeWidth={1.2} />
      <p className="benefits-card-number">•••• &nbsp; •••• &nbsp; •••• &nbsp; 4821</p>
      <div className="benefits-card-bottom"><span>YOUR EVERYDAY CARD</span><strong>VISA</strong></div>
    </div>
  </div>;
}

function BenefitTile({ id, title, text, image, alt }) {
  return <article className={`benefits-tile benefits-tile--${id}`}>
    <div className="benefits-copy"><h3>{title}</h3><p>{text}</p></div>
    <div className="benefits-visual">
      {image ? <img src={`${import.meta.env.BASE_URL}${encodeURIComponent(image)}`} alt={alt} loading="lazy" decoding="async" /> : <CreditCardVisual />}
    </div>
  </article>;
}

export default function KeyBenefits() {
  return <section className="key-benefits" id="key-benefits" aria-labelledby="key-benefits-title">
    <h2 id="key-benefits-title">Key benefits of using<br /><span>Payline right now</span></h2>
    <div className="benefits-grid">
      {keyBenefits.map(benefit => <BenefitTile key={benefit.id} {...benefit} />)}
    </div>
  </section>;
}
