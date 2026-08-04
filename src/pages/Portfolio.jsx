import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { useReducedMotion } from 'framer-motion';
import PortraitIntro, { INTRO_VH } from '../components/PortraitIntro';
import Hero from '../components/Hero';
import Work from '../components/Work';
import About from '../components/About';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

const Portfolio = () => {
  const location = useLocation();
  const lenis = useLenis();
  const prefersReduced = useReducedMotion();
  const showIntro = !prefersReduced;

  // Arriving from another route with a section in mind (nav click on /work/:id).
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return;
    const el = document.getElementById(target);
    if (!el) return;
    const t = setTimeout(() => {
      if (lenis) lenis.scrollTo(el, { duration: 1.2, offset: -72, force: true });
      else el.scrollIntoView({ behavior: 'smooth' });
    }, 260);
    return () => clearTimeout(t);
  }, [location.state, lenis]);

  return (
    <>
      {showIntro && <PortraitIntro />}
      {/* Scroll runway the fixed intro consumes before the page takes over. */}
      {showIntro && <div style={{ height: `${INTRO_VH * 100}vh` }} aria-hidden="true" />}
      <Hero />
      <Work />
      <About />
      <Skills />
      <Contact />
    </>
  );
};

export default Portfolio;
