import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import MegaMenu from '../navigation/MegaMenu';
import { menus } from '../../data/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(null);
  const ref = useRef(null);
  const triggers = useRef({});
  const location = useLocation();

  const close = () => {
    setOpen(null);
    setMobile(false);
  };

  useEffect(() => {
    close();
  }, [location]);

  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 80);
    const outside = (e) => {
      if (!ref.current?.contains(e.target)) close();
    };
    scroll();
    window.addEventListener('scroll', scroll, { passive: true });
    document.addEventListener('pointerdown', outside);
    return () => {
      window.removeEventListener('scroll', scroll);
      document.removeEventListener('pointerdown', outside);
    };
  }, []);

  const escape = (e) => {
    if (e.key === 'Escape') {
      if (open) {
        triggers.current[open]?.focus();
        setOpen(null);
      } else {
        setMobile(false);
        ref.current?.querySelector('.mobile-menu-toggle')?.focus();
      }
    }
  };

  return (
    <header className="site-header" ref={ref} onKeyDown={escape}>
      <nav
        className={`site-nav multipage-nav${scrolled ? ' is-scrolled' : ''}`}
        aria-label="Main navigation"
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) close();
        }}
      >
        <Link className="logo" to="/" aria-label="Payline home">
          <span className="logo-icon">P</span>Payline
        </Link>
        <ul id="nav-links" className={`nav-links${mobile ? ' is-open' : ''}`}>
          {['Personal', 'Business', 'Pricing', 'Company'].map((label) => (
            <li key={label}>
              {label === 'Pricing' ? (
                <NavLink to="/pricing" onClick={close}>
                  Pricing
                </NavLink>
              ) : (
                <>
                  <button
                    type="button"
                    className="nav-dropdown-trigger"
                    ref={(el) => {
                      triggers.current[label] = el;
                    }}
                    aria-expanded={open === label}
                    aria-controls={`mega-${label}`}
                    onClick={() => setOpen(open === label ? null : label)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        setOpen(label);
                        requestAnimationFrame(() =>
                          document.querySelector(`#mega-${label} a`)?.focus()
                        );
                      }
                    }}
                  >
                    {label}
                    <ChevronDown size={14} />
                  </button>
                  {open === label && (
                    <MegaMenu
                      id={`mega-${label}`}
                      menu={menus[label]}
                      closeMenu={close}
                    />
                  )}
                </>
              )}
            </li>
          ))}
          <li className="mobile-auth">
            <Link to="/login" onClick={close}>
              Sign In
            </Link>
            <Link to="/register" onClick={close}>
              Create Account
            </Link>
          </li>
        </ul>
        <div className="nav-auth">
          <ThemeToggle />
          <Link to="/login" className="signin-btn">
            Sign In
          </Link>
          <Link to="/register" className="signup-btn">
            Create Account
          </Link>
        </div>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={mobile ? 'Close menu' : 'Open menu'}
          aria-expanded={mobile}
          aria-controls="nav-links"
          onClick={() => {
            setMobile(!mobile);
            setOpen(null);
          }}
        >
          {mobile ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
    </header>
  );
}
