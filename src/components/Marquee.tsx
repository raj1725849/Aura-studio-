import { motion } from 'motion/react';

export default function Marquee() {
  const items = [
    "HOME DECOR", "LIVING ROOMS", "BEDROOMS", 
    "KITCHEN STYLING", "BATHROOM DESIGN", "BALCONY MAKEOVER", 
    "HOME OFFICE", "KIDS ROOMS", "FESTIVE DECOR", "COMPLETE MAKEOVERS"
  ];

  return (
    <div className="bg-stone-100 flex h-14 w-full items-center overflow-hidden border-y border-stone-200 shadow-sm">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="flex gap-12 whitespace-nowrap"
      >
        <div className="flex gap-12 py-4">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-12">
              <span className="text-stone-800 text-[10px] font-bold uppercase tracking-[0.3em] font-sans opacity-60">
                {item}
              </span>
              <span className="text-stone-400">✦</span>
            </div>
          ))}
        </div>
        <div className="flex gap-12 py-4">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-12">
              <span className="text-stone-800 text-[10px] font-bold uppercase tracking-[0.3em] font-sans opacity-60">
                {item}
              </span>
              <span className="text-stone-400">✦</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
