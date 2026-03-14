import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function PortfolioMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const logos = [
    "London Stock Exchange", "New York Stock Exchange", "Tokyo Stock Exchange", "Hong Kong Exchanges",
    "London Stock Exchange", "New York Stock Exchange", "Tokyo Stock Exchange", "Hong Kong Exchanges"
  ];

  return (
    <section ref={containerRef} className="py-32 overflow-hidden relative bg-white dark:bg-black transition-colors duration-300">
      {/* Marquee */}
      <div className="flex overflow-hidden whitespace-nowrap opacity-30 mb-32">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex gap-16 text-4xl md:text-6xl font-bold tracking-tighter uppercase text-gray-400 dark:text-gray-500"
        >
          {logos.map((logo, i) => (
            <span key={i}>{logo}</span>
          ))}
        </motion.div>
      </div>

      {/* Parallax Reveal */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { city: "London", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop", y: y1 },
          { city: "New York", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop", y: y2 },
          { city: "Singapore", img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1952&auto=format&fit=crop", y: y1 }
        ].map((item, i) => (
          <div key={i} className="relative h-[600px] overflow-hidden rounded-2xl group">
            <motion.div
              style={{ y: item.y }}
              className="absolute inset-[-100px] w-[calc(100%+200px)] h-[calc(100%+200px)]"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale transition-all duration-700 group-hover:grayscale-0"
                style={{ backgroundImage: `url(${item.img})` }}
              />
            </motion.div>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-5xl font-bold tracking-tighter text-white mix-blend-overlay">{item.city}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
