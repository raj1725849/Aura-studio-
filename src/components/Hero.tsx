import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const headline = "TRANSFORMING SPACES INTO ART";
  const words = headline.split(" ");

  return (
    <section className="relative h-screen w-full overflow-hidden bg-stone-950 flex items-center">
      {/* Background with optimized reveal */}
      <motion.div 
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://storage.googleapis.com/test-media-files/input_file_2.png" 
          alt="Luxury Interior" 
          className="w-full h-full object-cover opacity-50"
          style={{ objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-stone-900/10 backdrop-blur-[1px]" />
      </motion.div>

      <div className="relative z-10 w-full max-w-[var(--max-width)] mx-auto px-6 sm:px-12 lg:px-20 pt-20">
        <div className="grid grid-cols-12 gap-6 lg:gap-12 items-center lg:items-end">
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-6 sm:gap-10">
            <div className="space-y-4">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-stone-400 text-[10px] sm:text-[12px] font-bold uppercase tracking-[0.5em] block"
              >
                Residential Interiors · Home Decor
              </motion.span>
              
              <h1 className="text-white text-fluid-h1 leading-[0.95] tracking-tighter">
                {words.map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ 
                        duration: 1, 
                        delay: 0.7 + (i * 0.1),
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className={`inline-block mr-3 sm:mr-4 ${i % 2 !== 0 ? 'italic font-light' : 'font-bold'}`}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="text-white/80 text-[14px] sm:text-[16px] leading-relaxed max-w-sm font-sans"
            >
              Curating high-end bespoke home environments that speak the language of quiet luxury and refined comfort since 2018.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.7 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4 items-start sm:items-center"
            >
              <a 
                href="#portfolio" 
                className="w-full sm:w-auto bg-white text-stone-900 px-8 sm:px-10 py-4 sm:py-5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-stone-100 transition-all shadow-xl text-center"
              >
                Explore Archive
              </a>
              <a 
                href="#contact" 
                className="w-full sm:w-auto glass px-8 sm:px-10 py-4 sm:py-5 rounded-full text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-stone-900 transition-all text-center"
              >
                Let's Connect
              </a>
            </motion.div>
          </div>

          {/* Featured Card - Visible on tablet/desktop, slightly adjusted for smaller screens */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-5 hidden sm:flex flex-col justify-end"
          >
            <div className="glass p-8 sm:p-12 rounded-[30px] sm:rounded-[40px] space-y-6 sm:space-y-8 bg-white/5 border-white/10 group">
              <div className="flex justify-between items-start">
                 <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center font-serif italic text-white">01</div>
                 <span className="text-[9px] font-bold tracking-widest text-white/40 uppercase">Featured Design</span>
              </div>
              
              <div className="space-y-4">
                 <h3 className="text-3xl text-white italic group-hover:text-stone-300 transition-colors">The Obsidian Pavilion</h3>
                 <p className="text-[11px] text-white/60 leading-relaxed max-w-[280px] font-sans">
                   A masterclass in shadow and texture, where dark obsidian meets warm timber light.
                 </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-between items-center text-white cursor-pointer group/link">
                 <span className="text-[10px] font-bold tracking-widest uppercase">View Ritual</span>
                 <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="absolute bottom-10 left-20 hidden lg:flex flex-col items-center gap-4"
        >
          <span className="text-[9px] font-bold tracking-[0.5em] text-white/30 uppercase rotate-90 mb-10 translate-y-10">SCROLL</span>
          <div className="w-[1px] h-24 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
