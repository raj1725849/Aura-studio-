import { motion } from 'motion/react';

const steps = [
  {
    num: "01",
    title: "Home Discovery Call",
    desc: "We begin with a detailed conversation about your home, your family's lifestyle, your taste, and your budget — before a single item is selected."
  },
  {
    num: "02",
    title: "Mood Board & Style Direction",
    desc: "We create a visual mood board showing colour palettes, furniture styles, material textures, and decor themes curated specifically for your home."
  },
  {
    num: "03",
    title: "Sourcing & Procurement",
    desc: "We source furniture, decor, textiles, and accessories from trusted vendors — handling all orders, deliveries, and quality checks."
  },
  {
    num: "04",
    title: "Styling & Reveal",
    desc: "Our team sets up your home room by room, arranging every element with precision — culminating in a reveal that feels like seeing your home for the first time."
  }
];

export default function Process() {
  return (
    <section className="py-24 sm:py-32 bg-[#F5F2ED] text-stone-800 border-t border-stone-200">
      <div className="max-w-[var(--max-width)] mx-auto px-6 sm:px-12 lg:px-20">
        <div className="mb-12 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-stone-800/40 text-[9px] sm:text-[10px] font-bold tracking-[0.4em] uppercase mb-8 sm:mb-10 flex items-center gap-3"
          >
            <span className="w-8 h-[1px] bg-stone-800" /> THE PROCESS
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-fluid-h2 font-serif font-light leading-none tracking-tighter"
          >
            <span className="text-white drop-shadow-sm">THE</span> <br />
            <span className="italic text-[#6D001A]">PROCESS</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className={`glass p-8 sm:p-12 rounded-[30px] sm:rounded-[40px] flex flex-col gap-8 sm:gap-10 hover:bg-stone-900 group hover:text-white transition-all duration-500`}
            >
              <div className="text-[48px] sm:text-[64px] font-serif font-light italic text-stone-900/10 group-hover:text-white/10 -mt-6 sm:-mt-10 select-none">
                {step.num}
              </div>
              <div className="space-y-4 sm:space-y-6 flex-1">
                <h3 className="text-xl sm:text-2xl font-serif italic tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] font-sans text-stone-600 group-hover:text-white/60 leading-relaxed">
                  {step.desc}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-stone-200 group-hover:border-white/20 flex items-center justify-center">
                 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-stone-900 group-hover:bg-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
