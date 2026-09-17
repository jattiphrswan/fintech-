import { useEffect, useRef } from 'react';
import { benefits } from '../../data/benefits';
import '../../styles/why-choose-us.css';

function FeatureCard({ title, description, icon, index }) {
  return <article className="feature-card" style={{ '--reveal-delay': `${index * 100}ms` }}>
    <div className="feature-icon" aria-hidden="true">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </article>;
}

function CardColumn({ side }) {
  return <div className={`features-col ${side}`}>
    {benefits.filter(item => item.side === side).map(item => <FeatureCard key={item.title} {...item} />)}
  </div>;
}

function LeftCards() { return <CardColumn side="left" />; }
function RightCards() { return <CardColumn side="right" />; }

function CenterImage({ imageRef }) {
  return <div className="why-image-stage" ref={imageRef}>
    <div className="why-image-crop">
      <img src={`${import.meta.env.BASE_URL}why%20choose%20us.png`} alt="Payline mobile banking app shown on two phones" width="1340" height="1174" loading="lazy" />
    </div>
  </div>;
}

export default function WhyChooseUs() {
  const section = useRef(null);
  const image = useRef(null);

  useEffect(() => {
    const cards = [...section.current.querySelectorAll('.feature-card')];
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pending');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    cards.forEach(card => { card.classList.add('reveal-pending'); observer.observe(card); });
    return () => observer.disconnect();
  }, []);

  function tiltImage(event) {
    if (event.pointerType !== 'mouse' || !window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    image.current.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  }

  function resetTilt() { image.current.style.transform = ''; }

  return <section className="features-section" id="why-choose-us" ref={section} aria-labelledby="featuresTitle" onPointerMove={tiltImage} onPointerLeave={resetTilt} onPointerCancel={resetTilt}>
    <h2 className="features-title" id="featuresTitle">Why businesses choose Payline</h2>
    <div className="why__grid">
      <LeftCards />
      <CenterImage imageRef={image} />
      <RightCards />
    </div>
  </section>;
}
