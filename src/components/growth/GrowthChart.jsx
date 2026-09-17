import { motion } from 'motion/react';
import { currency } from './GrowthCalculator';
export default function GrowthChart({ data, revision, entrance, reduced }) {
  const maximum = Math.max(1, ...data.map(point => point.balance));
  const compact = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 });
  return <motion.figure className="growth-chart" {...entrance} whileHover={reduced ? {} : { y: -3 }}>
    <figcaption className="growth-legend"><span>Your contributions</span><span>Estimated growth</span></figcaption>
    <div className="growth-plot">
      <div className="growth-axis" aria-hidden="true">{[1, .75, .5, .25, 0].map(fraction => <span key={fraction}>{compact.format(maximum * fraction)}</span>)}</div>
      <div className="growth-bars">{data.map((point, i) => <div className="growth-bar-column" key={point.year}>
        <motion.div key={revision} className="growth-stack" role="img" aria-label={`${point.year}: contributions ${currency(point.contributed)}, estimated growth ${currency(point.balance - point.contributed)}`} initial={reduced ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} animate={{ height: `${point.balance / maximum * 100}%` }} transition={{ duration: reduced ? 0 : .55, scaleY: { delay: reduced ? 0 : i * .035 } }}>
          <motion.div className="growth-bar-gain" animate={{ flexGrow: Math.max(0, point.balance - point.contributed) }} transition={{ duration: reduced ? 0 : .55 }} /><motion.div className="growth-bar-principal" animate={{ flexGrow: point.contributed }} transition={{ duration: reduced ? 0 : .55 }} />
        </motion.div><span className="growth-year">{String(point.year).slice(data.length > 6 ? 2 : 0)}</span>
      </div>)}</div>
    </div>
    <p className="growth-chart-caption">Your plan, year by year &middot; USD</p>
  </motion.figure>;
}

