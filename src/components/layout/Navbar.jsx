import { useEffect, useState } from 'react';
import { navigation } from '../../data/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 80);
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return <header className="site-header"><nav className={`site-nav${scrolled ? ' is-scrolled' : ''}`} aria-label="Main navigation">
    <div className="logo"><div className="logo-icon">P</div>Payline</div>
    <ul className="nav-links">
      {navigation.map(label => <li key={label}><a href="#">{label}</a></li>)}
    </ul>
    <div className="nav-auth">
      <a href="#" className="signin-btn">Sign In</a>
      <a href="#" className="signup-btn">Create Account</a>
    </div>
  </nav></header>;
}
