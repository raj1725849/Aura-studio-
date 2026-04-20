import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: "I had lived in my apartment for 3 years and never felt at home. In 3 weeks, this team completely changed that. My living room is now the place I never want to leave.",
    author: "RITU SHARMA",
    type: "Living Room Transformation",
    city: "Bengaluru"
  },
  {
    text: "They understood our style before we even understood it ourselves. The bedroom they designed is calming, personal, and absolutely gorgeous. Worth every rupee.",
    author: "ARYAN & MEERA KAPOOR",
    type: "Master Bedroom Makeover",
    city: "Mumbai"
  },
  {
    text: "We gave them our full 4BHK and trusted them completely. The result was beyond anything we imagined. Our home finally looks like us.",
    author: "SUNDAR RAJAN",
    type: "Complete Home Makeover",
    city: "Hyderabad"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-[#F5F2ED] text-stone-800 overflow-hidden mesh-bg">
      <div className="max-w-[var(--max-width)] mx-auto px-6 sm:px-12 lg:px-20">
        <div className="mb-12 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-stone-800/40 text-[9px] sm:text-[10px] font-bold tracking-[0.4em] uppercase mb-8 sm:mb-10 flex items-center gap-3"
          >
            <span className="w-8 h-[1px] bg-stone-800" /> WHAT THEY SAY
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-fluid-h2 font-serif font-light leading-none tracking-tighter"
          >
            Client <br />
            <span className="italic">Voices.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="glass p-8 sm:p-12 lg:p-16 rounded-[40px] sm:rounded-[60px] flex flex-col gap-8 sm:gap-10 relative group transition-all duration-500 hover:bg-white hover:shadow-2xl"
            >
               <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-300">
                <Quote size={24} sm:size={32} />
              </div>
              
              <div className="flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl font-serif italic text-stone-900 leading-relaxed">
                  "{t.text}"
                </p>
              </div>

              <div className="space-y-4">
                <div className="h-[1px] bg-stone-200 w-full" />
                <div className="space-y-1">
                   <div className="text-[12px] sm:text-[14px] font-bold font-sans tracking-[2px] uppercase text-stone-900">{t.author}</div>
                   <div className="text-[10px] sm:text-[11px] font-sans text-stone-800/40 uppercase font-bold tracking-widest">{t.type} · {t.city}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
