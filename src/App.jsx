import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';
import BackgroundBeams from './components/ui/BackgroundBeams';
import RouteEffects from './components/navigation/RouteEffects';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Accounts from './pages/Accounts';
import Cards from './pages/Cards';
import Transfers from './pages/Transfers';
import Payments from './pages/Payments';
import BusinessAccounts from './pages/BusinessAccounts';
import CorporateCards from './pages/CorporateCards';
import Invoicing from './pages/Invoicing';
import Payroll from './pages/Payroll';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Careers from './pages/Careers';
import Security from './pages/Security';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import InitialLoader from './components/loading-ui/InitialLoader';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [blocking, setBlocking] = useState(true);

  useEffect(() => {
    let active = true;
    let reveal;
    const started = performance.now();
    const ready = () => {
      // A brief minimum keeps cached loads from flashing; the deadline prevents stalls.
      clearTimeout(reveal);
      reveal = setTimeout(() => {
        if (active) setLoading(false);
      }, Math.max(0, 850 - (performance.now() - started)));
    };
    const fontsReady = () =>
      Promise.resolve(document.fonts?.ready).then(ready, ready);

    if (document.readyState === 'complete') fontsReady();
    else window.addEventListener('load', fontsReady, { once: true });

    const deadline = setTimeout(() => {
      if (active) setLoading(false);
    }, 3500);

    return () => {
      active = false;
      clearTimeout(reveal);
      clearTimeout(deadline);
      window.removeEventListener('load', fontsReady);
    };
  }, []);

  return (
    <>
      <div inert={blocking} aria-hidden={blocking ? true : undefined}>
        <BrowserRouter>
          <RouteEffects />
          <CustomCursor />
          <div className="bg-grid" aria-hidden="true" />
          <div className="glow-orb orb-1" aria-hidden="true" />
          <div className="glow-orb orb-2" aria-hidden="true" />
          <BackgroundBeams />
          <Navbar />
          <main id="main-content" className="route-main" tabIndex={-1}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/create-account" element={<Register />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/cards" element={<Cards />} />
              <Route path="/transfers" element={<Transfers />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/business" element={<BusinessAccounts />} />
              <Route path="/business/cards" element={<CorporateCards />} />
              <Route path="/business/invoicing" element={<Invoicing />} />
              <Route path="/business/payroll" element={<Payroll />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/security" element={<Security />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
      <AnimatePresence onExitComplete={() => setBlocking(false)}>
        {loading && <InitialLoader key="initial-loader" />}
      </AnimatePresence>
    </>
  );
}
