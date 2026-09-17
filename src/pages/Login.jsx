import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Fingerprint, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import '../styles/auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const reduced = useReducedMotion();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // Simulate authentication for demo experience
    setTimeout(() => {
      setLoading(false);
      setStatus({
        type: 'success',
        message: 'Demo credentials authenticated! Welcome back to Payline.'
      });
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 700);
  };

  const handlePasskey = () => {
    setStatus({
      type: 'info',
      message: 'Passkey & Biometric sign-in simulation active. Logging in...'
    });
    setTimeout(() => {
      navigate('/');
    }, 1200);
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
            <ShieldCheck size={14} />
            <span>SECURE ACCESS / PAYLINE ID</span>
          </div>
          <h1>Welcome back</h1>
          <p>Access your accounts, cards, and team finances.</p>
        </div>

        {status && (
          <div className="auth-status-msg" role="status" style={{ marginBottom: 18 }}>
            {status.type === 'success' ? (
              <CheckCircle2 size={18} color="#10b981" />
            ) : (
              <AlertCircle size={18} color="var(--accent)" />
            )}
            <span>{status.message}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email">Email or Payline ID</label>
            <div className="form-input-wrapper">
              <input
                id="login-email"
                type="email"
                required
                autoComplete="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="input-toggle-btn" aria-hidden="true">
                <Mail size={16} />
              </span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="login-password">
              <span>Password</span>
            </label>
            <div className="form-input-wrapper">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
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
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember device</span>
            </label>
            <button
              type="button"
              className="forgot-link"
              style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', font: 'inherit' }}
              onClick={() => setStatus({ type: 'info', message: 'In this preview, password reset emails are not connected.' })}
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            <span>{loading ? 'Authenticating...' : 'Sign in to Payline'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="auth-divider">Or continue with</div>

        <div className="auth-social-grid">
          <button type="button" className="auth-social-btn" onClick={handlePasskey}>
            <Fingerprint size={16} />
            <span>Passkey / FaceID</span>
          </button>
          <button 
            type="button" 
            className="auth-social-btn" 
            onClick={() => setStatus({ type: 'info', message: 'Google OAuth is a simulation in this preview mode.' })}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            <span>Google</span>
          </button>
        </div>

        <div className="auth-footer">
          <span>Don't have an account?</span>
          <Link to="/register">Create an account</Link>
        </div>

        <div className="auth-trust-notice">
          <ShieldCheck size={15} />
          <span>Protected with 256-bit TLS encryption. Preview demonstration.</span>
        </div>
      </motion.div>
    </div>
  );
}
