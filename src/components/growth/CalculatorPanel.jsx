import { useEffect } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import { RotateCcw } from 'lucide-react';
import { currency } from './GrowthCalculator';

export default function CalculatorPanel({ values, update, balance, contributed, calculate, reset, revision, entrance, reduced }) {
  const counter = useMotionValue(balance);
  const formatted = useTransform(counter, currency);
  useEffect(() => { if (reduced) { counter.set(balance); return; } const animation = animate(counter, balance, { duration: .65, ease: [0.22, 1, 0.36, 1] }); return () => animation.stop(); }, [balance, counter, reduced]);
  return <motion.form className="growth-panel" {...entrance} onSubmit={event => { event.preventDefault(); calculate(); }}>
    <div className="growth-inputs">{[['initialDeposit', 'Initial Deposit', 1e9], ['monthlyDeposit', 'Monthly Deposit', 1e7]].map(([key, label, max]) => <label key={key} htmlFor={`growth-${key}`}>{label}<div className="growth-money"><span aria-hidden="true">$</span><input id={`growth-${key}`} type="number" aria-label={label} min="0" max={max} step="any" inputMode="decimal" value={values[key]} onChange={event => update(key, event.target.value)} /></div></label>)}</div>
    {[{ key: 'years', label: 'Investment Period', min: 1, max: 10, suffix: values.years === 1 ? ' Year' : ' Years', ticks: [1, 3, 5, 7, 10] }, { key: 'annualReturn', label: 'Estimated Annual Return', min: 0, max: 20, suffix: '%', ticks: [0, 5, 10, 15, 20] }].map(({ key, label, min, max, suffix, ticks }) => <div className="growth-range" key={key}>
      <label htmlFor={`growth-${key}`}>{label}<span>{values[key]}{suffix}</span></label>
      <input id={`growth-${key}`} type="range" min={min} max={max} step="1" value={values[key]} aria-label={label} aria-valuetext={`${values[key]}${suffix}`} onChange={event => update(key, event.target.value)} style={{ '--fill': `${(values[key] - min) / (max - min) * 100}%` }} />
      <div className="growth-ticks" aria-hidden="true">{ticks.map((tick, i) => <span key={tick} style={{ left: `${(tick - min) / (max - min) * 100}%`, transform: i === 0 ? 'none' : i === ticks.length - 1 ? 'translateX(-100%)' : 'translateX(-50%)' }}>{tick}{key === 'annualReturn' ? '%' : i === ticks.length - 1 ? ' years' : ''}</span>)}</div>
    </div>)}
    <div className="growth-result"><p>Projected Balance</p><motion.strong key={revision} initial={reduced ? false : { opacity: .5, y: 5 }} animate={{ opacity: 1, y: 0 }} data-balance={balance} aria-label={currency(balance)}>{formatted}</motion.strong><div className="growth-secondary"><div>Total contributed<b>{currency(contributed)}</b></div><div>Estimated growth<b>{currency(Math.max(0, balance - contributed))}</b></div></div><div className="growth-actions"><motion.button whileHover={reduced ? {} : { y: -2 }} whileTap={reduced ? {} : { scale: .97 }} type="submit">Calculate</motion.button><motion.button whileHover={reduced ? {} : { y: -2 }} whileTap={reduced ? {} : { scale: .97 }} type="button" onClick={reset}>Reset <RotateCcw size={13} /></motion.button></div></div>
    <p className="growth-note">Illustrative estimate only. Actual returns may vary.</p>
  </motion.form>;
}


