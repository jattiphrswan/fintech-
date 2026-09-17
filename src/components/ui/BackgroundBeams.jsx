import '../../styles/background-beams.css';
import { useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

const beams = [
  [5, 7.8, -2], [18, 9.2, -6], [36, 8.6, -4],
  [57, 10.4, -8], [77, 8.2, -1], [94, 9.6, -5],
];

export default function BackgroundBeams() {
  const ref = useRef(null);
  const visible = useInView(ref);
  const reduced = useReducedMotion();
  return <div ref={ref} className="site-beams" aria-hidden="true" data-running={visible && !reduced}>
    {!reduced && beams.map(([left, duration, delay], index) => <div className="site-beam-lane" key={left} style={{ left: `${left}%`, '--duration': `${duration}s`, '--delay': `${delay}s` }}>
      <div className="site-beam-fall"><span className="site-beam-streak" /></div>
      <div className="site-beam-impact"><span className="site-beam-flash" />
        {Array.from({ length: 8 }, (_, particle) => <i key={particle} style={{ '--dx': `${(particle - 3.5) * 13}px`, '--dy': `${-18 - ((particle * 17 + index * 9) % 45)}px` }} />)}
      </div>
    </div>)}
  </div>;
}

