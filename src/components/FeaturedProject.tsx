import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function FeaturedProject() {
  return (
    <section className="relative h-[70vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden bg-[#F5F2ED] mesh-bg">
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/featured/1920/1080?grayscale" 
          alt="Premium Design" 
          className="w-full h-full object-cover opacity-10"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-stone-400/5 mix-blend-multiply" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative z-20 text-center px-6 sm:px-8 glass p-10 sm:p-20 rounded-[40px] sm:rounded-[80px] max-w-4xl mx-auto shadow-2xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-stone-800/60 text-[9px] sm:text-[10px] font-sans font-bold tracking-[0.3em] uppercase mb-6 sm:mb-8"
        >
          FEATURED HOME PROJECT
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-stone-900 text-3xl sm:text-5xl lg:text-7xl font-serif italic mb-6 sm:mb-8 mx-auto leading-tight"
        >
          Designed for Living. Built for Life.
        </motion.h2>

        <motion.p
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.5 }}
           className="text-stone-600 font-sans text-[14px] sm:text-base lg:text-lg max-w-lg mx-auto mb-8 sm:mb-12 leading-relaxed"
        >
          Every home we transform is a collaboration between our eye for design and your lived experience. See how we turned a blank apartment into a warm, layered, story-filled home.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <a 
            href="#portfolio" 
            className="glass p-1.5 rounded-full flex items-center pr-10 gap-6 cursor-pointer w-fit mx-auto group hover:bg-stone-900 hover:text-white transition-all duration-500 shadow-lg"
          >
            <div className="w-12 h-12 rounded-full bg-stone-900 text-white flex items-center justify-center transition-transform group-hover:translate-x-1 shadow-md">
              <ArrowRight size={18} />
            </div>
            <span className="text-[12px] uppercase font-bold tracking-[0.2em] font-sans">EXPLORE THIS HOME</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
