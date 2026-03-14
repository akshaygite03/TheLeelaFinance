import { motion } from 'motion/react';
import { useState, useRef, MouseEvent } from 'react';

function BentoCard({ card, index }: { card: any, index: number, key?: number | string }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-gray-100 dark:bg-[#1A1A1A] hover-target group ${card.span}`}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)"
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Apple Intelligence Glow Effect */}
      <div 
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20`}
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, var(--glow-color), transparent 40%)`
        }}
      />
      
      <div className={`absolute inset-0 ${card.bg} transition-transform duration-700 group-hover:scale-105`} />
      {card.content}
    </motion.div>
  );
}

export default function BentoGrid() {
  const cards = [
    {
      title: "Strategic Holdings",
      description: "A high-res, grayscale architectural shot with a glass overlay showing a simulated portfolio distribution.",
      span: "md:col-span-2",
      content: (
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 dark:from-black/80 to-transparent z-10 p-8 flex flex-col justify-end">
          <h3 className="text-2xl font-semibold mb-2">Strategic Holdings</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm max-w-sm">Simulated portfolio distribution across key global assets.</p>
        </div>
      ),
      bg: "bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-50"
    },
    {
      title: "Quantitative Research",
      description: "A pulsing SVG node-map representing global connectivity and data-driven decision making.",
      span: "md:col-span-1",
      content: (
        <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
          <div className="w-12 h-12 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center">
            <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-ping" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Quantitative Research</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Data-driven decision making.</p>
          </div>
        </div>
      ),
      bg: "bg-gradient-to-br from-gray-200 to-gray-100 dark:from-zinc-900 dark:to-black"
    },
    {
      title: "Global Governance",
      description: "A scrolling text-ticker of corporate ethics, transparency standards, and regulatory compliance protocols.",
      span: "md:col-span-3",
      content: (
        <div className="absolute inset-0 p-8 flex flex-col justify-center overflow-hidden z-10">
          <h3 className="text-2xl font-semibold mb-6">Global Governance</h3>
          <div className="flex space-x-8 animate-marquee whitespace-nowrap opacity-50 font-mono text-sm">
            <span>ETHICS</span>
            <span>•</span>
            <span>TRANSPARENCY</span>
            <span>•</span>
            <span>COMPLIANCE</span>
            <span>•</span>
            <span>REGULATORY PROTOCOLS</span>
            <span>•</span>
            <span>STEWARDSHIP</span>
            <span>•</span>
            <span>ETHICS</span>
            <span>•</span>
            <span>TRANSPARENCY</span>
            <span>•</span>
            <span>COMPLIANCE</span>
            <span>•</span>
            <span>REGULATORY PROTOCOLS</span>
            <span>•</span>
            <span>STEWARDSHIP</span>
          </div>
        </div>
      ),
      bg: "bg-gray-50 dark:bg-zinc-950"
    }
  ];

  return (
    <section id="governance" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Core Pillars</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">The structural foundations of Leela Finance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {cards.map((card, i) => (
          <BentoCard key={i} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}
