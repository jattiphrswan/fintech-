import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';
import '../styles/pages.css';

export default function NotFound() {
  const reduced = useReducedMotion();

  return (
    <div className="inner-page not-found">
      <motion.div
        className="not-found-visual"
        initial={reduced ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="not-found-orb" aria-hidden="true" />
        <div className="not-found-code">404</div>
      </motion.div>

      <span className="page-eyebrow">ERROR 404 / ROUTE NOT FOUND</span>
      <h1>This balance doesn't exist.</h1>
      <p>
        The page, link, or resource you are looking for has moved, expired, or does not exist in the Payline application.
      </p>

      <div className="not-found-actions">
        <Link to="/" className="page-button">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
        <Link to="/pricing" className="page-button secondary">
          <span>Explore Pricing</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="not-found-links">
        <span>Looking for:</span>
        <Link to="/accounts">Personal</Link>
        <span>•</span>
        <Link to="/business">Business</Link>
        <span>•</span>
        <Link to="/contact">Support</Link>
        <span>•</span>
        <Link to="/#faq">FAQ</Link>
      </div>
    </div>
  );
}
