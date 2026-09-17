import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Percent, TrendingUp } from 'lucide-react';
import GrowthVisual from './GrowthVisual';
import GrowthChart from './GrowthChart';
import CalculatorPanel from './CalculatorPanel';
import './growth.css';

export const currency = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
export function project(initial, monthly, years, annual) {
  const rate = annual / 1200, months = Math.round(years * 12);
  if (!rate) return initial + monthly * months;
  const growth = Math.expm1(months * Math.log1p(rate));
  return initial * (1 + growth) + monthly * growth / rate;
}
export default function GrowthCalculator() {
  const reduced = useReducedMotion();
  const [initialDeposit, setInitial] = useState(20000);
  const [monthlyDeposit, setMonthly] = useState(500);
  const [years, setYears] = useState(4);
  const [annualReturn, setReturn] = useState(8);
  const [projectedBalance, setProjected] = useState(() => project(20000, 500, 4, 8));
  const [revision, setRevision] = useState(0);
  const values = { initialDeposit, monthlyDeposit, years, annualReturn };
  const update = (key, value) => {
    const limits = { initialDeposit: [0, 1e9], monthlyDeposit: [0, 1e7], years: [1, 10], annualReturn: [0, 20] };
    const [min, max] = limits[key];
    const next = Math.min(max, Math.max(min, Number(value) || 0));
    ({ initialDeposit: setInitial, monthlyDeposit: setMonthly, years: setYears, annualReturn: setReturn })[key](next);
    const v = { ...values, [key]: next };
    setProjected(project(v.initialDeposit, v.monthlyDeposit, v.years, v.annualReturn));
  };
  const reset = () => { setInitial(20000); setMonthly(500); setYears(4); setReturn(8); setProjected(project(20000, 500, 4, 8)); setRevision(n => n + 1); };
  const calculate = () => { setProjected(project(initialDeposit, monthlyDeposit, years, annualReturn)); setRevision(n => n + 1); };
  const contributed = initialDeposit + monthlyDeposit * years * 12;
  const data = Array.from({ length: years + 1 }, (_, i) => ({ year: 2026 + i, contributed: initialDeposit + monthlyDeposit * i * 12, balance: project(initialDeposit, monthlyDeposit, i, annualReturn) }));
  const entrance = (x = 0, y = 0, delay = 0) => ({ initial: reduced ? false : { opacity: 0, x, y }, whileInView: { opacity: 1, x: 0, y: 0 }, viewport: { once: true, amount: .15 }, transition: { duration: .65, delay } });
  return <section className="growth-section" id="growth" aria-labelledby="growth-title">
    <div className="growth-inner">
      <motion.header className="growth-heading" {...entrance(0, 30)}>
        <span className="growth-heading-icon"><TrendingUp size={22} /></span>
        {[Percent, ArrowUpRight].map((Icon, i) => <motion.span key={i} className={`growth-token growth-token-${i ? 'right' : 'left'}`} aria-hidden="true" animate={reduced ? {} : { y: [0, -8, 0] }} transition={{ duration: 5 + i, repeat: Infinity }}><Icon /></motion.span>)}
        <h2 id="growth-title">See your <span>growth potential</span></h2>
        <motion.div className="growth-badge" initial={reduced ? false : { opacity: 0, scale: .85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .6, delay: .1 }}><strong>+67%</strong><svg viewBox="0 0 96 40" aria-hidden="true"><motion.path initial={reduced ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: .8 }} d="M2 29 Q12 8 24 24 T44 26 T62 19 T94 3" fill="none" stroke="currentColor" strokeWidth="2.5" /></svg></motion.div>
        <small>Illustrative growth scenario</small>
        <p>Explore how consistent contributions can grow over time.</p>
      </motion.header>
      <div className="growth-grid"><div className="growth-left"><GrowthVisual entrance={entrance(-35, 0, .08)} reduced={reduced} /><GrowthChart data={data} revision={revision} entrance={entrance(0, 35, .12)} reduced={reduced} /></div><CalculatorPanel values={values} update={update} balance={projectedBalance} contributed={contributed} calculate={calculate} reset={reset} revision={revision} entrance={entrance(35, 0, .16)} reduced={reduced} /></div>
    </div>
  </section>;
}
