import React from 'react';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import { Toaster } from '../components/ui/toaster';

const Portfolio = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Projects />
      <Skills />
      <Contact />
      <Toaster />
      
      <footer 
        className="py-12 border-t border-white/5" 
        style={{ background: 'linear-gradient(180deg, #161616 0%, #0A0A0A 100%)' }}
      >
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/80 font-mono text-sm md:text-base tracking-widest uppercase">
            © {new Date().getFullYear()} Symond. All rights reserved.
          </p>
          <p className="text-white/40 text-xs mt-4 font-mono">
            Built with <span className="text-[#A855F7]">React</span> and <span className="text-[#A855F7]">Tailwind CSS</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;