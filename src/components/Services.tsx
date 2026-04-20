import { motion } from 'motion/react';
import { Sofa, Bed, UtensilsCrossed, Sprout, Laptop, Sparkles, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: <Sofa size={20} className="text-stone-300" />,
    num: "01",
    title: "Living Room Design",
    desc: "Your living room is the heart of your home. We create welcoming, stylish lounges that balance beauty with daily comfort — from sofa selection to accent walls, lighting, and accessories."
  },
  {
    icon: <Bed size={20} className="text-stone-300" />,
    num: "02",
    title: "Bedroom & Kids Room Styling",
    desc: "Restful master bedrooms, dreamy kids rooms, and serene guest rooms — designed around how you sleep, relax, and recharge."
  },
  {
    icon: <UtensilsCrossed size={20} className="text-stone-300" />,
    num: "03",
    title: "Kitchen & Dining Aesthetics",
    desc: "We style kitchens and dining spaces to feel warm and inviting — cabinet finishes, backsplash selection, pendant lighting, and table-setting curation."
  },
  {
    icon: <Sprout size={20} className="text-stone-300" />,
    num: "04",
    title: "Balcony & Outdoor Decor",
    desc: "Transform unused balconies and terraces into your favourite spot in the home — cosy seating, planters, string lights, and weather-friendly decor."
  },
  {
    icon: <Laptop size={20} className="text-stone-300" />,
    num: "05",
    title: "Home Office Design",
    desc: "Productive, beautiful, and distraction-free home offices that make working from home feel genuinely enjoyable and professional."
  },
  {
    icon: <Sparkles size={20} className="text-stone-300" />,
    num: "06",
    title: "Complete Home Makeover",
    desc: "Ready for a full transformation? We redesign your entire home room by room — unified by a single design language that makes every space feel connected and intentional."
  }
];

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-32 bg-[#F5F2ED] text-stone-800 relative z-10">
      <div className="max-w-[var(--max-width)] mx-auto px-6 sm:px-12 lg:px-20">
        <div className="mb-12 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-stone-800/40 text-[9px] sm:text-[10px] font-bold tracking-[0.4em] uppercase mb-8 sm:mb-10 flex items-center gap-3"
          >
            <span className="w-8 h-[1px] bg-stone-800" /> OUR EXPERTISE
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-fluid-h2 font-serif font-light leading-none tracking-tighter"
          >
            <span className="text-stone-400">OUR</span> <br />
            <span className="italic text-[#6D001A]">DECOR SERVICES</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-8 sm:p-12 rounded-[30px] sm:rounded-[40px] flex flex-col gap-6 sm:gap-8 transition-all duration-500 hover:bg-white hover:shadow-xl group"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center text-white transition-all duration-500 group-hover:scale-110">
                   {service.icon}
                </div>
                <span className="text-[10px] font-sans font-bold text-stone-800/30 tracking-[4px]">
                  {service.num}
                </span>
              </div>

              <div className="space-y-6">
                <h3 className="text-3xl font-serif italic text-stone-900">
                  {service.title}
                </h3>
                <p className="text-sans text-[14px] leading-relaxed text-stone-600">
                  {service.desc}
                </p>
                <div className="pt-4 flex items-center gap-3 text-stone-900 text-[10px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                  Learn More <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
