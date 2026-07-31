import React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

/** Thin brand-coloured progress bar pinned to the top of the viewport. */
const ScrollProgress = () => {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  if (prefersReduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-brand"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
