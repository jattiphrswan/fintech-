import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, Linkedin, Youtube } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import '../../styles/footer.css';

const columns = [
 {title:'Payline Business',links:[['Business Accounts','/business'],['Corporate Cards','/business/cards'],['Invoicing','/business/invoicing'],['Payroll','/business/payroll']]},
 {title:'Payline Personal',links:[['Accounts','/accounts'],['Cards','/cards'],['Transfers','/transfers'],['Payments','/payments']]},
 {title:'Company',links:[['About us','/about'],['Careers','/careers'],['Security','/security'],['Contact','/contact']]},
 {title:'Explore',links:[['Pricing','/pricing'],['Frequently asked questions','/#faq'],['Growth calculator','/#growth'],['Key benefits','/#key-benefits']]},
];
export default function Footer() {
  const reduced = useReducedMotion();
  return <footer className="payline-footer" id="footer" aria-label="Payline footer">
    <motion.div className="footer-main footer-container" initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .6 }}>
      <Link className="footer-brand" to="/" aria-label="Payline home"><span className="footer-brand-icon">P</span><span>Payline<small>Built for your next move.</small></span></Link>
      <div className="footer-columns">{columns.map(column => <div className="footer-column" key={column.title}><h3>{column.title}</h3><ul>{column.links.map(([label, href]) => <li key={label}><Link to={href}>{label}</Link></li>)}</ul></div>)}</div>
    </motion.div>
    <div className="footer-divider"><div className="footer-utility footer-container">
      <p>Payline &copy; {new Date().getFullYear()}</p>
      <div className="footer-quick-links"><Link to="/#key-benefits">Benefits</Link><Link to="/#growth">Plan your growth</Link><Link to="/contact">Get started <ArrowUpRight size={12} /></Link></div>
      <div className="footer-socials" aria-label="Social profiles coming soon">{[[Linkedin, 'LinkedIn'], [Instagram, 'Instagram'], [Youtube, 'YouTube']].map(([Icon, label]) => <span key={label} className="footer-social" role="img" aria-label={`${label} — coming soon`} title={`${label} — coming soon`}><Icon size={15} /></span>)}</div>
    </div></div>
    <div className="footer-bottom">
      <div className="footer-watermark" aria-hidden="true">Payline<span>Move forward.</span></div>
      <div className="footer-notes footer-container"><p>A little more clarity. A lot more possibility.<br />Explore a simpler way to manage your money with Payline.</p><p>The growth calculator provides illustrative estimates based on the values you enter. Actual returns may vary.</p><p>This website is a product demonstration. Banking services, account opening and transactions are not available here.</p></div>
    </div>
  </footer>;
}

