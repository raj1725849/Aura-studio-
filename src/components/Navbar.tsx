import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Instagram, Send, Phone } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ABOUT US', href: '#about' },
    { name: 'PORTFOLIO', href: '#portfolio' },
    { name: 'SERVICES', href: '#services' },
    { name: 'JOURNAL', href: '#journal' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-700 ${isScrolled ? 'py-3 sm:py-4 glass' : 'py-6 sm:py-8'}`}>
      <div className="max-w-[var(--max-width)] mx-auto px-6 sm:px-12 lg:px-20 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex flex-col group">
          <span className="text-xl sm:text-2xl font-serif italic tracking-tighter text-stone-800">Aura Studio</span>
          <div className="flex items-center gap-1 -mt-1 ml-1 overflow-hidden">
            <span className="text-[6px] sm:text-[7px] font-bold tracking-[0.5em] uppercase text-stone-900/50">Interior Curation</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-12">
          <div className="flex gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-[10px] font-bold tracking-[0.3em] text-stone-900/60 uppercase hover:text-stone-900 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact" 
            className="bg-stone-900 text-white px-8 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-stone-800 transition-all shadow-lg"
          >
            Inquire
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden w-10 h-10 flex flex-col justify-center gap-1.5"
        >
          <div className={`w-6 h-[1.5px] bg-stone-900 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-[1.5px] bg-stone-900 transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-4 h-[1.5px] bg-stone-900 transition-all ${isMenuOpen ? '-rotate-45 translate-y-[-2px] w-6' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-stone-950 z-[1001] flex flex-col items-center justify-center pt-20"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 text-white/60 hover:text-white"
            >
              CLOSE [×]
            </button>

            <div className="flex flex-col items-center gap-8 sm:gap-10">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl sm:text-4xl font-serif italic text-white hover:text-stone-400 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              
              <div className="flex gap-8 sm:gap-10 mt-6 sm:mt-10">
                <Instagram size={20} className="text-white/60 hover:text-white cursor-pointer" />
                <Send size={20} className="text-white/60 hover:text-white cursor-pointer" />
                <Phone size={20} className="text-white/60 hover:text-white cursor-pointer" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
