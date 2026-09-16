import { Fragment, useRef } from 'react';
import HeroDashboard from './HeroDashboard';
import { subtitle, titleWords } from '../../data/content';

function AnimatedWords({ words, start, step }) {
  return words.map((word, index) => <Fragment key={`${word}-${index}`}>
    {index > 0 && ' '}
    <span className="word" style={{ animationDelay: `${start + index * step}s` }}>{word}</span>
  </Fragment>);
}

export default function Hero() {
  const dashboard = useRef(null);

  function handlePointerMove(event) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    dashboard.current.style.transform = `rotateY(${x * 15}deg) rotateX(${-y * 15}deg)`;
  }

  function resetTilt() {
    dashboard.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
  }

  return <section className="hero" id="hero" onPointerMove={handlePointerMove} onPointerLeave={resetTilt}>
    <div className="hero-text">
      <div className="hero-badge"><span>🚀</span> Next Gen Fintech Platform</div>
      <h1 className="hero-title" id="heroTitle">
        <AnimatedWords words={titleWords} start={0.2} step={0.1} />
        <br />
        <span className="word today" style={{ animationDelay: '0.85s' }}>Today.</span>
      </h1>
      <p className="hero-subtitle" id="subtitle">
        <AnimatedWords words={subtitle.split(/\s+/)} start={1.2} step={0.05} />
      </p>
      <div className="cta-group">
        <a href="#" className="btn btn-primary">Get Started →</a>
        <a href="#" className="btn btn-secondary">Learn more</a>
      </div>
    </div>
    <div className="hero-ui"><div className="ui-wrapper" id="uiWrapper" ref={dashboard}><HeroDashboard /></div></div>
  </section>;
}
