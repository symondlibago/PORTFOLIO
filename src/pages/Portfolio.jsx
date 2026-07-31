import React from 'react';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import ThemeToggle from '../components/ThemeToggle';
import ScrollProgress from '../components/ScrollProgress';
import Statement from '../components/Statement';
import Grain from '../components/Grain';
import Backdrop3D from '../components/Backdrop3D';
import { Toaster } from '../components/ui/toaster';

const Portfolio = () => {
  return (
    // bg-surface lives here rather than on each section, so the fixed 3D
    // backdrop can sit above the page colour but below all the content.
    <div className="relative min-h-screen bg-surface">
      <Backdrop3D />
      <Grain />
      <ScrollProgress />
      <ThemeToggle />

      <div className="relative z-10">
        <Hero />
        <Statement />
        <Projects />
        <Skills />
        <Contact />
      </div>
      <Toaster />

      <footer
        className="relative z-10 py-12 border-t border-ink/5"
        style={{ background: 'linear-gradient(180deg, transparent 0%, var(--surface) 100%)' }}
      >
        <div className="container mx-auto px-6 text-center">
          <p className="text-ink/80 font-mono text-sm md:text-base tracking-widest uppercase">
            © {new Date().getFullYear()} Symond. All rights reserved.
          </p>
          <p className="text-ink/40 text-xs mt-4 font-mono">
            Built with <span className="text-brand">React</span> and <span className="text-brand">Tailwind CSS</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;