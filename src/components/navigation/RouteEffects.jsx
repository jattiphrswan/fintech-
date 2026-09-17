import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const routeTitles = {
  '/': 'Payline - Revolutionizing Finance',
  '/login': 'Sign In | Payline',
  '/register': 'Create Account | Payline',
  '/signup': 'Create Account | Payline',
  '/create-account': 'Create Account | Payline',
  '/pricing': 'Pricing Plans | Payline',
  '/contact': 'Contact Us | Payline',
  '/accounts': 'Personal Accounts (Coming Soon) | Payline',
  '/cards': 'Personal Cards (Coming Soon) | Payline',
  '/transfers': 'Transfers (Coming Soon) | Payline',
  '/payments': 'Payments (Coming Soon) | Payline',
  '/business': 'Business Accounts (Coming Soon) | Payline',
  '/business/cards': 'Corporate Cards (Coming Soon) | Payline',
  '/business/invoicing': 'Invoicing (Coming Soon) | Payline',
  '/business/payroll': 'Payroll (Coming Soon) | Payline',
  '/about': 'About Us (Coming Soon) | Payline',
  '/careers': 'Careers (Coming Soon) | Payline',
  '/security': 'Security & Trust (Coming Soon) | Payline',
  '/404': '404 - Page Not Found | Payline'
};

export default function RouteEffects() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Determine page title
    if (routeTitles[pathname]) {
      document.title = routeTitles[pathname];
    } else {
      document.title = '404 - Page Not Found | Payline';
    }

    // Scroll handling
    const frame = requestAnimationFrame(() => {
      if (hash) {
        let id = hash.slice(1);
        try {
          id = decodeURIComponent(id);
        } catch {}
        document.getElementById(id)?.scrollIntoView();
      } else {
        window.scrollTo(0, 0);
        document.getElementById('main-content')?.focus({ preventScroll: true });
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
