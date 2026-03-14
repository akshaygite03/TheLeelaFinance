import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [marketStatus, setMarketStatus] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch("/api/v1/market-snapshot")
      .then((res) => res.json())
      .then((data) => setMarketStatus(data.status))
      .catch(console.error);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-[32px] left-0 right-0 z-[100] transition-all duration-300 pointer-events-none ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo & Market Status */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="font-mono font-medium text-lg tracking-tight">
            Leela Finance™
          </div>
          {marketStatus && (
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border ${
              marketStatus === 'Open' 
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                : 'border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${marketStatus === 'Open' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
              Market {marketStatus}
            </div>
          )}
        </div>

        {/* Center Pill Nav */}
        <div className="hidden md:flex items-center space-x-1 bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-full px-2 py-1 pointer-events-auto">
          {['About', 'Vision', 'Governance', 'Structure'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors hover-target"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4 pointer-events-auto">
          <ThemeToggle />
          
          <button className="hidden sm:block px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-full hover:scale-105 transition-transform duration-300 hover-target">
            Corporate Inquiry
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
