import { motion, useReducedMotion } from 'motion/react';
import { MorphingInfinity } from '@/components/loading-ui/morphing-infinity';
import '../../styles/loader.css';

export default function InitialLoader() {
  const reduced = useReducedMotion();
  return <motion.div className="initial-loader" role="status" aria-live="polite" aria-label="Loading Payline" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .3 }}>
    <div className="initial-loader-content"><MorphingInfinity className="size-24" /><span className="initial-loader-brand">Payline</span><span className="initial-loader-caption">Loading your experience</span></div>
  </motion.div>;
}
