import ctaImg from '../../assets/images/cta-image.png';
import '../../styles/final-cta.css';

export default function FinalCTA() {
  return <section className="final-cta" id="get-started" aria-labelledby="final-cta-title">
    <div className="final-cta-card">
      <div className="final-cta-background" aria-hidden="true"><span>Payline</span></div>
      <div className="final-cta-copy">
        <p>Join the rent revolution - simple, secure, rewarding</p>
        <h2 id="final-cta-title">Start Paying Rent with<br />Payline Today</h2>
        <a className="btn btn-primary final-cta-button" href="#hero">Pay Rent Now</a>
      </div>
      <div className="final-cta-artwork">
        <img src={ctaImg} alt="Payline mobile payment app" width="1200" height="1306" loading="lazy" decoding="async" />
      </div>
    </div>
  </section>;
}
