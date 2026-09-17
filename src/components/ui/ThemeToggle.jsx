import { useEffect, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark');
  const manual = useRef(false);
  useEffect(() => {
    try { manual.current = ['light', 'dark'].includes(localStorage.getItem('payline-theme')); } catch {}
    const preference = window.matchMedia?.('(prefers-color-scheme: light)');
    const system = event => { if (!manual.current) setTheme(event.matches ? 'light' : 'dark'); };
    const storage = event => {
      if (event.key !== 'payline-theme' && event.key !== null) return;
      manual.current = ['light', 'dark'].includes(event.newValue);
      setTheme(manual.current ? event.newValue : preference?.matches ? 'light' : 'dark');
    };
    preference?.addEventListener('change', system);
    window.addEventListener('storage', storage);
    return () => { preference?.removeEventListener('change', system); window.removeEventListener('storage', storage); };
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'light' ? '#f5f8fc' : '#080b14';
  }, [theme]);
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    manual.current = true;
    setTheme(next);
    try { localStorage.setItem('payline-theme', next); } catch {}
  };
  return <button className="theme-toggle" type="button" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
    {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}<span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
  </button>;
}
