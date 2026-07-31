import React from 'react';
import { ReactLenis } from 'lenis/react';
import { useReducedMotion } from 'framer-motion';

/**
 * Lenis smooth scrolling for the whole page.
 *
 * Lenis drives the real scroll position (not a transform), so IntersectionObserver
 * — and therefore framer-motion's whileInView / useInView — keeps working.
 *
 * Disabled outright when the visitor prefers reduced motion; hijacking scroll is
 * the single most common motion-sickness trigger.
 */
const SmoothScroll = ({ children }) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        // Gentle exponential ease-out: quick to respond, soft to settle.
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        // Native momentum already feels right on touch; don't fight it.
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
