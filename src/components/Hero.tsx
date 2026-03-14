import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="about" className="relative flex flex-col items-center justify-center min-h-screen pt-32 overflow-hidden scroll-mt-24">
      {/* Background Monolith Simulation */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <motion.div
          animate={{
            rotateY: [0, 360],
            rotateX: [10, 20, 10],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-[300px] h-[500px] md:w-[400px] md:h-[600px] border border-black/10 dark:border-white/10 bg-gradient-to-b from-black/5 dark:from-white/5 to-transparent backdrop-blur-3xl rounded-3xl"
          style={{ transformStyle: 'preserve-3d' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-7xl md:text-9xl font-bold tracking-tighter text-center leading-[0.9]"
        >
          Capital. Vision. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-black to-gray-400 dark:from-white dark:to-gray-500">
            Legacy.
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-[640px] text-center font-light leading-relaxed"
        >
          Stewardship for the next generation of global markets. We manage the foundations of tomorrow.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-6"
        >
          <button className="px-8 py-4 bg-black text-white dark:bg-white dark:text-black font-medium rounded-full hover:scale-105 transition-transform duration-300 hover-target text-sm tracking-wide">
            Read Annual Review
          </button>
          <button className="group flex items-center gap-2 px-8 py-4 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors hover-target text-sm tracking-wide">
            Our Philosophy
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
