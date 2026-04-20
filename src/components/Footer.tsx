import { motion } from 'motion/react';
import { Instagram, Linkedin, Pin as Pinterest, ExternalLink, Settings } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F5F2ED] text-stone-800 pt-24 sm:pt-32 pb-16">
      <div className="max-w-[var(--max-width)] mx-auto px-6 sm:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-20 mb-24 sm:mb-32">
          {/* Brand */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-8 sm:space-y-12"
          >
            <h2 className="text-3xl sm:text-4xl font-serif italic tracking-tighter text-stone-950">Aura Studio.</h2>
            <p className="text-stone-600 font-sans text-[15px] sm:text-base max-w-sm leading-relaxed">
              Curating silent dialogues between light and matter since 2018. Based in India, operating globally.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Instagram size={18} />, label: 'Instagram' },
                { icon: <Linkedin size={18} />, label: 'LinkedIn' },
                { icon: <Pinterest size={18} />, label: 'Pinterest' }
              ].map((social, i) => (
                <motion.a 
                  whileHover={{ scale: 1.1, backgroundColor: '#1c1917', color: '#fff' }}
                  key={i} 
                  href="#" 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-stone-200 flex items-center justify-center text-stone-800 transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-8 sm:space-y-10"
          >
            <h4 className="text-[9px] sm:text-[10px] font-bold tracking-[0.4em] text-stone-800/40 uppercase">OUR SERVICES</h4>
            <div className="flex flex-col gap-3 sm:gap-4">
              {['Living Room Design', 'Bedroom Styling', 'Kitchen Aesthetics', 'Balcony Decor', 'Home Office Setup'].map((item) => (
                <a key={item} href="#" className="text-sm font-sans font-medium text-stone-600 hover:text-stone-950 transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-8 sm:space-y-10"
          >
            <h4 className="text-[9px] sm:text-[10px] font-bold tracking-[0.4em] text-stone-800/40 uppercase">CURATED UPDATES</h4>
            <div className="space-y-6">
              <p className="text-sm text-stone-500 font-sans leading-relaxed">
                Join our community of 5,000+ home lovers. Get weekly decor tips and before-and-after reveals.
              </p>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Enter Your Email" 
                  className="w-full bg-transparent border-b border-stone-200 py-3 sm:py-4 text-sm font-sans tracking-widest focus:border-stone-950 outline-none transition-all placeholder:text-stone-300"
                />
                <button className="absolute right-0 bottom-4 text-stone-950 group-hover:translate-x-2 transition-transform">
                   <ExternalLink size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Serving Line */}
        <div className="mb-12 flex justify-center overflow-x-auto pb-4 sm:pb-0 scrollbar-hide">
          <div className="text-[9px] sm:text-[10px] font-bold tracking-[0.3em] sm:tracking-[0.4em] text-stone-800/40 uppercase text-center border border-stone-200 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full whitespace-nowrap">
            Serving — Bengaluru · Mumbai · Hyderabad · Delhi NCR · Pune
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] text-stone-800/30 uppercase font-sans text-center md:text-left">
            © {currentYear} Aura Studio Interior Design. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12">
            <button 
              onClick={() => {
                const trigger = document.querySelector('#admin-trigger button') as HTMLButtonElement;
                if(trigger) trigger.click();
              }}
              className="text-[10px] font-bold tracking-[0.3em] text-stone-800/50 uppercase font-sans hover:text-burgundy transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Settings size={10} /> Curator Portal
            </button>
            <a href="#" className="text-[10px] font-bold tracking-[0.3em] text-stone-800/30 uppercase font-sans hover:text-stone-900 transition-colors">Privacy Philosophy</a>
            <a href="#" className="text-[10px] font-bold tracking-[0.3em] text-stone-800/30 uppercase font-sans hover:text-stone-900 transition-colors">Terms of Dialogue</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
