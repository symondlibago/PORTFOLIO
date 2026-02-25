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
      
      {/* Footer */}
      <footer className="py-8 text-center" style={{ backgroundColor: '#2B0D3E', color: '#C59DD9' }}>
        <div className="container mx-auto px-6">
          <p className="text-sm md:text-base font-mono">
            © {new Date().getFullYear()} Symond. All rights reserved.
          </p>
          <p className="text-sm mt-2 font-mono" style={{ color: '#F2EAF7', opacity: 0.7 }}>
            Built with React and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;