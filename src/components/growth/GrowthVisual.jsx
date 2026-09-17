import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import growthVisualImg from '../../assets/images/breeze-beneath-open-skied.png';

export default function GrowthVisual({ entrance, reduced }) {
  return <motion.article className="growth-visual" {...entrance} whileHover={reduced ? {} : { y: -3 }}>
    <img src={growthVisualImg} alt="" loading="lazy" />
    <span className="growth-visual-icon"><ArrowUpRight size={20} /></span>
    <div className="growth-visual-copy"><h3>See what consistent<br />saving could become.</h3><p>Adjust your plan and explore different scenarios instantly.</p></div>
  </motion.article>;
}
