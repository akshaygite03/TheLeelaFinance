import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function CorporateStructure() {
  const [view, setView] = useState<'operational' | 'strategic'>('strategic');

  const cards = [
    {
      title: "Internal Equity",
      desc: "Focus on asset preservation and risk mitigation.",
      type: "basic"
    },
    {
      title: "Growth & Innovation",
      desc: "Focus on emerging markets and technology-driven arbitrage.",
      type: "pro"
    },
    {
      title: "Legacy Management",
      desc: "Focus on long-term multi-generational capital stability.",
      type: "global"
    }
  ];

  return (
    <section id="structure" className="py-32 px-6 max-w-7xl mx-auto scroll-mt-24">
      <div className="flex flex-col items-center text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Corporate Structure</h2>
        
        {/* Toggle */}
        <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/10 dark:border-white/10 backdrop-blur-md">
          <button
            onClick={() => setView('operational')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors hover-target ${
              view === 'operational' ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Operational View
          </button>
          <button
            onClick={() => setView('strategic')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors hover-target ${
              view === 'strategic' ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Strategic View
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {cards.map((card, i) => (
            <motion.div
              key={card.title + view}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative p-8 rounded-3xl border hover-target ${
                card.type === 'pro' 
                  ? 'border-black/20 dark:border-white/30 bg-gradient-to-b from-black/5 dark:from-white/10 to-transparent shadow-[0_0_30px_rgba(0,0,0,0.05)] dark:shadow-[0_0_30px_rgba(255,255,255,0.05)]' 
                  : 'border-black/10 dark:border-white/10 bg-gray-50 dark:bg-[#1A1A1A]'
              }`}
            >
              <h3 className="text-2xl font-semibold mb-4">{card.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8">
                {view === 'strategic' ? card.desc : `Operational metrics and daily execution strategies for ${card.title.toLowerCase()}.`}
              </p>
              
              <ul className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-black/50 dark:bg-white/50" />
                  Capital Allocation
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-black/50 dark:bg-white/50" />
                  Risk Assessment
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-black/50 dark:bg-white/50" />
                  Performance Metrics
                </li>
              </ul>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
