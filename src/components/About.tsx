import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const stats = [
  {
    num: "200+",
    label: "HOMES TRANSFORMED",
    desc: "From compact apartments to sprawling villas — we have redesigned over 200 homes across India, each one a unique story."
  },
  {
    num: "8+",
    label: "YEARS IN HOME DECOR",
    desc: "Nearly a decade of crafting living spaces that balance aesthetics with the real rhythm of everyday home life."
  },
  {
    num: "100%",
    label: "PERSONALISED APPROACH",
    desc: "No two homes are alike. Every decor plan is built from scratch around your taste, lifestyle, and budget."
  }
];

export default function About() {
  return (
    <section id="about" className="relative py-32 bg-[#F5F2ED] text-stone-800 overflow-hidden mesh-bg">
      {/* Background Watermark */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-stone-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[var(--max-width)] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        {/* Top Part Heading */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16 sm:mb-24 items-start lg:items-end">
          <div className="w-full lg:w-[240px] flex items-center gap-3 opacity-60">
            <span className="w-8 h-[1px] bg-stone-800" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">ABOUT / COMPANY</span>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-fluid-h2 font-serif font-light leading-[0.95] tracking-tighter -ml-1">
              Turning Houses <br />
              <span className="italic">Into Homes.</span>
            </h2>
          </motion.div>
        </div>

        {/* Bottom Part Columns */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          {/* Images Grid */}
          <div className="w-full lg:w-1/2 relative min-h-[350px] sm:min-h-[500px] flex items-end">
            <motion.div 
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative w-full aspect-[4/5] bg-stone-200 grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden glass rounded-3xl"
            >
              <img 
                src="https://picsum.photos/seed/neoabout/800/1000" 
                alt="Studio aesthetic" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Stats & Description */}
          <div className="w-full lg:w-1/2 flex flex-col gap-10 lg:gap-12 justify-end">
             <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-stone-600 font-sans text-[15px] sm:text-base lg:text-lg leading-relaxed max-w-sm"
            >
              We are a boutique home decor studio obsessed with turning houses into homes. From a single room refresh to a complete home transformation, every project begins with one question: how do you want to feel when you walk through your door? Our team of decor specialists and interior stylists work across Bengaluru and pan-India to deliver homes that are beautiful, livable, and unmistakably yours.
            </motion.p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={`glass p-6 sm:p-8 rounded-[24px] sm:rounded-3xl flex flex-col gap-2 ${idx === 1 ? 'bg-white/40' : ''}`}
                >
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-stone-900">{stat.num}</span>
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-stone-800/60 leading-tight">
                    {stat.label.split(' ')[0]} <br /> {stat.label.split(' ').slice(1).join(' ')}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-4 sm:mt-6"
            >
              <a 
                href="#portfolio" 
                className="w-full sm:w-auto glass px-8 sm:px-10 py-4 sm:py-5 rounded-full text-stone-900 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-stone-900 hover:text-white transition-all duration-500 inline-block text-center"
              >
                OUR DECOR PHILOSOPHY →
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
