import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Post {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  img: string;
}

const defaultPosts: Post[] = [
  {
    id: "1",
    title: "10 Home Decor Trends Dominating Indian Homes in 2024",
    category: "DECOR TRENDS",
    excerpt: "From earthy Japandi aesthetics to bold maximalist accents — here's what's transforming living rooms across India this year.",
    date: "6 min read",
    img: "https://picsum.photos/seed/journal1/600/400?grayscale"
  },
  {
    id: "2",
    title: "How to Style a Small Bedroom Without Spending a Fortune",
    category: "BEDROOM STYLING",
    excerpt: "You don't need a big budget or a big room to have a beautiful bedroom. These 8 practical tips will completely change how your space looks and feels.",
    date: "5 min read",
    img: "https://picsum.photos/seed/journal2/600/400?grayscale"
  },
  {
    id: "3",
    title: "The Secret to a Cosy Living Room: Lighting, Layers, and Life",
    category: "LIVING ROOMS",
    excerpt: "Lighting is the single most underrated element of home decor. Here's how we use it to turn any room from flat to extraordinary.",
    date: "7 min read",
    img: "https://picsum.photos/seed/journal3/600/400?grayscale"
  }
];

export default function Journal() {
  const [posts] = useState<Post[]>(defaultPosts);

  return (
    <section id="journal" className="py-24 sm:py-32 bg-[#F5F2ED] text-stone-800 border-t border-stone-200 mesh-bg overflow-hidden">
      <div className="max-w-[var(--max-width)] mx-auto px-6 sm:px-12 lg:px-20">
        <div className="mb-12 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-stone-800/40 text-[9px] sm:text-[10px] font-bold tracking-[0.4em] uppercase mb-8 sm:mb-10 flex items-center gap-3"
          >
            <span className="w-8 h-[1px] bg-stone-800" /> DECOR INSIGHTS
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-fluid-h2 font-serif font-light leading-none tracking-tighter"
          >
            <span className="text-white drop-shadow-sm">LATEST</span> <br />
            <span className="italic text-[#6D001A]">DECOR INSIGHTS</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="glass p-6 sm:p-8 rounded-[30px] sm:rounded-[40px] flex flex-col group hover:bg-white hover:shadow-xl transition-all duration-500"
            >
              <div className="relative aspect-[3/2] overflow-hidden mb-8 sm:mb-10 rounded-[20px] sm:rounded-[30px]">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1 flex flex-col gap-6 sm:gap-8">
                <span className="text-stone-800/40 text-[8px] sm:text-[9px] uppercase font-bold tracking-[0.3em]">
                  {post.category}
                </span>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-stone-900 leading-tight group-hover:translate-x-2 transition-transform duration-500">
                  {post.title}
                </h3>
                
                <p className="text-sans text-[13px] sm:text-[14px] text-stone-600 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-stone-200 pt-6 sm:pt-8">
                   <span className="text-[10px] sm:text-[11px] font-sans text-stone-800/30 font-bold tracking-widest">{post.date}</span>
                   <button className="text-stone-900 text-[9px] sm:text-[10px] font-bold tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all uppercase text-left">
                      Read Entry <ArrowRight size={14} />
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 sm:mt-24 flex justify-center">
           <button className="w-full sm:w-auto glass px-10 sm:px-12 py-4 sm:py-5 rounded-full text-stone-900 text-[11px] sm:text-[12px] font-bold tracking-[0.3em] uppercase hover:bg-stone-900 hover:text-white transition-all duration-500">
             Explore All Insights
           </button>
        </div>
      </div>

      {/* CTA Band */}
      <div className="mt-24 sm:mt-40 bg-stone-950 py-16 sm:py-24 px-6 sm:px-8 relative overflow-hidden group border-y border-stone-800">
         <div className="absolute inset-0 bg-stone-100/5 opacity-10 pointer-events-none" />
         <div className="max-w-[var(--max-width)] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
            <h2 className="text-white text-3xl sm:text-4xl lg:text-6xl font-serif italic text-center lg:text-left leading-tight tracking-tighter">
               Ready to decorate <br className="hidden lg:block" /> your home?
            </h2>
            <a 
              href="#contact"
              className="w-full sm:w-auto glass px-10 sm:px-12 py-5 sm:py-6 rounded-full text-white text-[12px] sm:text-[13px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase bg-white/10 hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-4 sm:gap-6 group"
            >
               Book Discovery Call <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </a>
         </div>
      </div>
    </section>
  );
}
