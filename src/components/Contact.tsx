import { motion } from 'motion/react';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#F5F2ED] text-stone-800 overflow-hidden mesh-bg">
      <div className="max-w-[var(--max-width)] mx-auto px-6 sm:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 flex flex-col gap-10 sm:gap-16"
          >
            <div>
              <div className="text-stone-800/40 text-[9px] sm:text-[10px] font-bold tracking-[0.4em] uppercase mb-8 sm:mb-10 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-stone-800" /> SAY HELLO
              </div>
              <h2 className="text-fluid-h2 font-serif font-light leading-none tracking-tighter">
                <span className="text-black">LET'S DECORATE</span> <br />
                <span className="italic text-[#6D001A]">YOUR HOME</span>
              </h2>
            </div>

            <p className="text-[16px] sm:text-lg text-stone-600 font-sans leading-relaxed max-w-sm">
              Tell us about your home and what you're dreaming of. We offer a free 30-minute discovery call for all new projects — no obligation, just an honest conversation about your space.
            </p>

            <div className="flex flex-col gap-8 sm:gap-10">
              {[
                { icon: <Phone size={18} className="text-stone-400" />, label: 'VOICE', val: '+91 98765 43210' },
                { icon: <Mail size={18} className="text-stone-400" />, label: 'CONNECT', val: 'concierge@aura-studio.com' },
                { icon: <MapPin size={18} className="text-stone-400" />, label: 'VISIT', val: 'Indiranagar, Bangalore, India' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 sm:gap-6 items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-stone-800 group hover:bg-stone-900 hover:text-white transition-all cursor-pointer">
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] sm:text-[9px] font-bold text-stone-800/30 tracking-[3px] uppercase">{item.label}</span>
                    <span className="text-base sm:text-lg font-serif italic text-stone-800">{item.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 glass p-10 sm:p-12 lg:p-20 rounded-[40px] sm:rounded-[80px] shadow-2xl relative bg-white/10"
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-8 animate-in fade-in zoom-in duration-700 py-12 sm:py-0">
                 <div className="w-16 h-16 sm:w-20 sm:h-20 bg-stone-900 rounded-full flex items-center justify-center text-white scale-110">
                    <ArrowRight className="rotate-[315deg]" size={36} sm:size={40} />
                 </div>
                 <h3 className="text-3xl sm:text-4xl font-serif italic text-stone-900">Message Received.</h3>
                 <p className="text-stone-600 max-w-xs font-sans text-sm sm:text-base">✦ Wonderful! We'll reach out within 24 hours to schedule your free discovery call.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8 sm:gap-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                   <div className="flex flex-col gap-2">
                     <label className="text-[9px] sm:text-[10px] font-bold tracking-widest text-stone-800/40 uppercase ml-1">Identity</label>
                     <input type="text" placeholder="Full Name" required className="bg-transparent border-b border-stone-200 py-3 sm:py-4 text-[14px] sm:text-[15px] font-sans tracking-[1px] focus:border-stone-900 outline-none transition-colors placeholder:text-stone-300 w-full" />
                   </div>
                   <div className="flex flex-col gap-2">
                     <label className="text-[9px] sm:text-[10px] font-bold tracking-widest text-stone-800/40 uppercase ml-1">Channel</label>
                     <input type="email" placeholder="Email Address" required className="bg-transparent border-b border-stone-200 py-3 sm:py-4 text-[14px] sm:text-[15px] font-sans tracking-[1px] focus:border-stone-900 outline-none transition-colors placeholder:text-stone-300 w-full" />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                   <div className="flex flex-col gap-2">
                     <label className="text-[9px] sm:text-[10px] font-bold tracking-widest text-stone-800/40 uppercase ml-1">Topology</label>
                     <select className="bg-transparent border-b border-stone-200 py-3 sm:py-4 text-[14px] sm:text-[15px] font-medium tracking-[1px] focus:border-stone-900 outline-none transition-colors cursor-pointer appearance-none w-full">
                        <option value="">Project Type</option>
                        <option value="living-room">Living Room</option>
                        <option value="master-bedroom">Master Bedroom</option>
                        <option value="kids-room">Kids Room</option>
                        <option value="kitchen-dining">Kitchen & Dining</option>
                        <option value="balcony">Balcony</option>
                        <option value="home-office">Home Office</option>
                        <option value="full-makeover">Full Home Makeover</option>
                        <option value="other">Other</option>
                     </select>
                   </div>
                   <div className="flex flex-col gap-2">
                     <label className="text-[9px] sm:text-[10px] font-bold tracking-widest text-stone-800/40 uppercase ml-1">Resources</label>
                     <select className="bg-transparent border-b border-stone-200 py-3 sm:py-4 text-[14px] sm:text-[15px] font-medium tracking-[1px] focus:border-stone-900 outline-none transition-colors cursor-pointer appearance-none w-full">
                        <option value="">Budget Range</option>
                        <option value="under50k">Under ₹50K</option>
                        <option value="50k-1.5l">₹50K–₹1.5L</option>
                        <option value="1.5l-5l">₹1.5L–₹5L</option>
                        <option value="above5l">Above ₹5L</option>
                     </select>
                   </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] sm:text-[10px] font-bold tracking-widest text-stone-800/40 uppercase ml-1">Home Story</label>
                  <textarea rows={4} placeholder="Tell us about your home — how many rooms, which spaces need work, any styles or references you love..." className="bg-transparent border-b border-stone-200 py-3 sm:py-4 text-[14px] sm:text-[15px] font-sans tracking-[1px] focus:border-stone-900 outline-none transition-colors placeholder:text-stone-300 resize-none w-full"></textarea>
                </div>

                <button 
                  type="submit" 
                  className="bg-stone-900 text-white py-4 sm:py-6 rounded-full text-[11px] sm:text-[13px] font-bold uppercase tracking-[2px] sm:tracking-[4px] hover:bg-stone-800 transition-all group flex items-center justify-center gap-3 sm:gap-4 shadow-xl active:scale-95"
                >
                  BOOK FREE DISCOVERY CALL → <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
