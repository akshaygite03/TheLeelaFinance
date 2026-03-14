/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import MarketMarquee from './components/MarketMarquee';
import Hero from './components/Hero';
import LiveMarketIntelligence from './components/LiveMarketIntelligence';
import BentoGrid from './components/BentoGrid';
import PortfolioMarquee from './components/PortfolioMarquee';
import CorporateStructure from './components/CorporateStructure';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-black/20 dark:selection:bg-white/20">
      <CustomCursor />
      <MarketMarquee />
      <Navbar />
      <main>
        <Hero />
        <LiveMarketIntelligence />
        <BentoGrid />
        <PortfolioMarquee />
        <CorporateStructure />
      </main>
      <Footer />
    </div>
  );
}
