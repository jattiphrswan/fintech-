import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, CreditCard, HelpCircle, Plus, Rocket, Search, ShieldCheck, Wallet, X } from 'lucide-react';
import { faqArticles, faqCategories } from '../../data/faq';
import '../../styles/faq.css';

const icons = [Rocket, Wallet, CreditCard, ShieldCheck];
export default function FAQ() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(null);
  const [open, setOpen] = useState('getting-started-0');
  const [support, setSupport] = useState(false);
  const reduced = useReducedMotion();
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const filtered = faqArticles.filter(article => (!category || article.category === category) && words.every(word => `${article.question} ${article.answer}`.toLowerCase().includes(word)));
  const articles = !category && !words.length ? faqArticles.filter(article => ['getting-started-0', 'getting-started-1', 'getting-started-2', 'payments-0', 'security-0'].includes(article.id)) : filtered;
  const clear = () => { setQuery(''); setCategory(null); setOpen('getting-started-0'); };
  return <section className="faq-section" id="faq" aria-labelledby="faq-title">
    <div className="faq-container">
      <motion.header className="faq-heading" initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .5 }}>
        <span className="faq-badge"><HelpCircle size={13} /> FAQ</span>
        <h2 id="faq-title">Frequently Asked <span>Questions</span></h2>
        <p>Find a little clarity for your next move.<br />Everything you need to know about the Payline experience.</p>
        <button className="faq-support" type="button" aria-expanded={support} aria-controls="faq-support-info" onClick={() => setSupport(value => !value)}>Contact Support <ArrowUpRight size={14} /></button>
        {support && <p id="faq-support-info" className="faq-support-info" role="status">Live support is not connected to this demo yet. Search the questions below for help exploring Payline.</p>}
      </motion.header>
      <div className="faq-search"><Search size={18} aria-hidden="true" /><input type="search" aria-label="Search frequently asked questions" placeholder="Search for your question..." value={query} onChange={event => { setQuery(event.target.value); setOpen(null); }} />{query && <button type="button" aria-label="Clear search" onClick={() => setQuery('')}><X size={17} /></button>}</div>
      <div className="faq-categories" role="group" aria-label="Filter questions by category">{faqCategories.map((item, index) => {
        const Icon = icons[index];
        return <button type="button" className="faq-category" key={item.id} aria-pressed={category === item.id} onClick={() => { setCategory(category === item.id ? null : item.id); setOpen(null); }}><span className="faq-category-icon"><Icon size={22} /></span><span><strong>{item.title}</strong><small>{faqArticles.filter(article => article.category === item.id).length} Articles</small></span><ArrowUpRight className="faq-category-arrow" size={16} aria-hidden="true" /></button>;
      })}</div>
      <div className="faq-results"><span role="status">{category || words.length ? `${articles.length} ${articles.length === 1 ? 'question' : 'questions'} found` : 'Popular questions'}</span>{(category || query) && <button type="button" onClick={clear}>Clear filters</button>}</div>
      <div className="faq-list">{articles.map(article => {
        const expanded = open === article.id;
        return <article className={`faq-item${expanded ? ' is-open' : ''}`} key={article.id}><h3><button type="button" id={`faq-trigger-${article.id}`} aria-expanded={expanded} aria-controls={`faq-answer-${article.id}`} onClick={() => setOpen(expanded ? null : article.id)}>{article.question}<Plus size={17} className="faq-plus" aria-hidden="true" /></button></h3>
          <AnimatePresence initial={false}>{expanded && <motion.div id={`faq-answer-${article.id}`} role="region" aria-labelledby={`faq-trigger-${article.id}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduced ? 0 : .23 }} className="faq-answer"><p>{article.answer}</p></motion.div>}</AnimatePresence>
        </article>;
      })}</div>
      {!articles.length && <div className="faq-empty"><Search size={25} /><h3>No matching questions</h3><p>Try a different phrase or clear your filters to explore all categories.</p><button type="button" onClick={clear}>Clear search & filters</button></div>}
    </div>
  </section>;
}
