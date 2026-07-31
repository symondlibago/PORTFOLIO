import React, { Suspense, lazy } from 'react';
import { useReducedMotion } from 'framer-motion';

// three.js is ~150KB gzipped, so it is code-split out of the initial chunk and
// only requested once the page has mounted.
const Scene3D = lazy(() => import('./Scene3D'));

/**
 * Fixed, full-viewport 3D backdrop that sits behind every section.
 * Skipped entirely under prefers-reduced-motion — nothing is downloaded either,
 * since the lazy import is never reached.
 */
const Backdrop3D = () => {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
    </div>
  );
};

export default Backdrop3D;
