import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-black text-black dark:text-white pt-32 pb-12 border-t border-black/10 dark:border-white/10 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[12vw] md:text-[140px] font-bold tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-black to-gray-400 dark:from-white dark:to-gray-900"
          >
            Legacy Defined.
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-sm text-gray-600 dark:text-gray-400 mb-24">
          <div className="flex flex-col space-y-4">
            <h4 className="text-black dark:text-white font-semibold mb-2">Governance</h4>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors hover-target">Ethics</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors hover-target">Compliance</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors hover-target">AML Policy</a>
          </div>
          <div className="flex flex-col space-y-4">
            <h4 className="text-black dark:text-white font-semibold mb-2">Corporate</h4>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors hover-target">Careers</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors hover-target">Newsroom</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors hover-target">History</a>
          </div>
          <div className="flex flex-col space-y-4">
            <h4 className="text-black dark:text-white font-semibold mb-2">Legal</h4>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors hover-target">Privacy</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors hover-target">Terms</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors hover-target">Cookie Policy</a>
          </div>
          <div className="flex flex-col space-y-4">
            <h4 className="text-black dark:text-white font-semibold mb-2">Socials</h4>
            <a href="https://www.linkedin.com/company/110815980/" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors hover-target">LinkedIn</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors hover-target">X</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors hover-target">Bloomberg</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-black/10 dark:border-white/10 text-xs text-gray-500 dark:text-gray-600">
          <p>© {new Date().getFullYear()} Leela Finance™. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Institutional Grade</span>
            <span>Global Reach</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
