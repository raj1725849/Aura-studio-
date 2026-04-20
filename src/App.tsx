import { motion, useScroll, useSpring } from 'motion/react';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import FeaturedProject from './components/FeaturedProject';
import Testimonials from './components/Testimonials';
import Journal from './components/Journal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import Schema from './components/Schema';
import { MessageSquare } from 'lucide-react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative w-full bg-[#F5F2ED] min-h-screen">
      <Schema />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-stone-900 origin-left z-[1000]"
        style={{ scaleX }}
      />

      <Navbar />

      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Portfolio />
        <Process />
        <FeaturedProject />
        <Testimonials />
        <Journal />
        <Contact />
      </main>

      <Footer />

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/911234567890"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-7 right-7 z-[9000] bg-[#25D366] w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform group"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="text-white fill-current" size={24} />
        <span className="absolute right-full mr-4 bg-white text-black px-3 py-1 text-xs font-medium rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Chat with us
        </span>
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 -z-10" />
      </a>

      <AdminPanel />
    </div>
  );
}
