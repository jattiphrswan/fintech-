import Navbar from '../components/layout/Navbar';
import Hero from '../components/hero/Hero';
import CustomCursor from '../components/ui/CustomCursor';
import WhyChooseUs from '../components/features/WhyChooseUs';
import KeyBenefits from '../components/benefits/KeyBenefits';
import FinalCTA from '../components/cta/FinalCTA';

export default function Home() {
  return <>
    <CustomCursor />
    <div className="bg-grid" aria-hidden="true" />
    <div className="glow-orb orb-1" aria-hidden="true" />
    <div className="glow-orb orb-2" aria-hidden="true" />
    <Navbar />
    <main><Hero /><WhyChooseUs /><KeyBenefits /><FinalCTA /></main>
  </>;
}
