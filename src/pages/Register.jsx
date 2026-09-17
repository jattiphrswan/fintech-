import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { 
  User, 
  Building2, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  Check
} from 'lucide-react';
import '../styles/auth.css';

export default function Register() {
  const [accountType, setAccountType] = useState('personal'); // 'personal' | 'business'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const reduced = useReducedMotion();
  const navigate = useNavigate();

  // Compute password strength
  const getPasswordStrength = () => {
    if (!password) return { score: 0, label: '', class: '' };
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    switch (score) {
      case 1:
        return { score: 1, label: 'Weak', class: 'strength-weak' };
      case 2:
        return { score: 2, label: 'Fair', class: 'strength-fair' };
      case 3:
        return { score: 3, label: 'Good', class: 'strength-good' };
      case 4:
        return { score: 4, label: 'Strong', class: 'strength-strong' };
      default:
        return { score: 0, label: '', class: '' };
    }
  };

  const strength = getPasswordStrength();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match. Please verify.' });
      return;
    }
    if (!agreeTerms) {
      setStatus({ type: 'error', message: 'Please accept the Terms of Service to continue.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    // Simulate onboarding completion
    setTimeout(() => {
      setLoading(false);
      setStatus({
        type: 'success',
        message: `Welcome to Payline! Your ${accountType} demo account is ready.`
      });
      setTimeout(() => {
        navigate('/');
      }, 1600);
    }, 800);
  };

  return (
    <div className="auth-page">
      <motion.div 
        className="auth-card"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="auth-header">
          <div className="auth-brand-badge">
            <Sparkles size={14} />
            <span>GET STARTED / ZERO FEES TO OPEN</span>
          </div>
          <h1>Create your account</h1>
          <p>Join thousands of forward-thinking individuals and businesses.</p>
        </div>

        {/* Account Type Toggle */}
        <div className="auth-type-toggle" role="tablist" aria-label="Account Type">
          <button
            type="button"
            role="tab"
            aria-selected={accountType === 'personal'}
            className={`auth-type-btn ${accountType === 'personal' ? 'is-active' : ''}`}
            onClick={() => setAccountType('personal')}
          >
            <User size={15} />
            <span>Personal</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={accountType === 'business'}
            className={`auth-type-btn ${accountType === 'business' ? 'is-active' : ''}`}
            onClick={() => setAccountType('business')}
          >
            <Building2 size={15} />
            <span>Business</span>
          </button>
        </div>

        {status && (
          <div className="auth-status-msg" role="status" style={{ marginBottom: 18 }}>
            {status.type === 'success' ? (
              <CheckCircle2 size={18} color="#10b981" />
            ) : (
              <ShieldCheck size={18} color="#ef4444" />
            )}
            <span>{status.message}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reg-name">
              {accountType === 'personal' ? 'Full Legal Name' : 'Company or Founder Name'}
            </label>
            <div className="form-input-wrapper">
              <input
                id="reg-name"
                type="text"
                required
                placeholder={accountType === 'personal' ? 'Jane Doe' : 'Acme Technologies Inc.'}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="reg-email">
              {accountType === 'personal' ? 'Email Address' : 'Work Email Address'}
            </label>
            <div className="form-input-wrapper">
              <input
                id="reg-email"
                type="email"
                required
                autoComplete="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="input-toggle-btn" aria-hidden="true">
                <Mail size={16} />
              </span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="reg-password">
              <span>Create Password</span>
              {strength.label && (
                <span style={{ fontSize: 11, color: 'var(--text)' }}>
                  Strength: {strength.label}
                </span>
              )}
            </label>
            <div className="form-input-wrapper">
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="input-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {password && (
              <div className="password-strength">
                <div className="strength-bars">
                  {[1, 2, 3, 4].map((index) => (
                    <div
                      key={index}
                      className={`strength-bar ${
                        index <= strength.score ? `is-active ${strength.class}` : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="reg-confirm">Confirm Password</label>
            <div className="form-input-wrapper">
              <input
                id="reg-confirm"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-options" style={{ marginTop: 6 }}>
            <label className="remember-me">
              <input
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <span style={{ fontSize: 11 }}>
                I agree to the Payline Demo Terms of Service and Privacy Policy
              </span>
            </label>
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            <span>{loading ? 'Setting up account...' : `Open ${accountType === 'personal' ? 'Personal' : 'Business'} Account`}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="auth-footer">
          <span>Already have a Payline account?</span>
          <Link to="/login">Sign in</Link>
        </div>

        <div className="auth-trust-notice">
          <Check size={14} />
          <span>No credit card required. Instant preview access.</span>
        </div>
      </motion.div>
    </div>
  );
}
