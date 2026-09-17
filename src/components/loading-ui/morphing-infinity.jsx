import { useId } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const loops = [
  'M60 40 C42 12 10 12 10 40 C10 68 42 68 60 40 C78 12 110 12 110 40 C110 68 78 68 60 40',
  'M60 40 C38 4 14 24 14 40 C14 56 38 76 60 40 C82 4 106 24 106 40 C106 56 82 76 60 40',
  'M60 40 C40 24 8 4 8 40 C8 76 40 56 60 40 C80 24 112 4 112 40 C112 76 80 56 60 40',
];

export function MorphingInfinity({ className = '', ...props }) {
  const gradient = `infinity-${useId().replace(/:/g, '')}`;
  const reduced = useReducedMotion();
  const animate = reduced ? {} : { d: [...loops, loops[0]] };
  return <svg className={`morphing-infinity ${className}`} viewBox="0 0 120 80" fill="none" aria-hidden="true" {...props}>
    <defs><linearGradient id={gradient} x1="10" y1="20" x2="110" y2="60" gradientUnits="userSpaceOnUse"><stop stopColor="#0066ff" /><stop offset=".55" stopColor="#00bfff" /><stop offset="1" stopColor="#00f0ff" /></linearGradient></defs>
    <motion.path d={loops[0]} animate={animate} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} stroke={`url(#${gradient})`} strokeWidth="6" strokeLinecap="round" opacity=".18" />
    <motion.path d={loops[0]} pathLength="1" animate={{ ...animate, ...(reduced ? {} : { strokeDashoffset: [0, -1] }) }} transition={{ d: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }, strokeDashoffset: { duration: 1.8, repeat: Infinity, ease: 'linear' } }} stroke={`url(#${gradient})`} strokeWidth="5" strokeLinecap="round" strokeDasharray={reduced ? undefined : '.32 .12 .12 .44'} />
  </svg>;
}
