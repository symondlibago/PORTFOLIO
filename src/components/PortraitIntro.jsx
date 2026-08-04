import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// three.js is heavy, so the canvas is code-split and only fetched after mount.
const PortraitField = lazy(() => import('./PortraitField'));

/**
 * Full-screen intro. The particle portrait holds the viewport, reacts to the
 * cursor, then scatters as you scroll — handing off to the page underneath.
 *
 * IMPORTANT: this stays mounted for the life of the page, and the spacer that
 * gives it scroll runway is rendered unconditionally by the parent. An earlier
 * version unmounted both once you scrolled past, which shrank the document by
 * 1.35 viewports mid-scroll and threw you down into the Work section. Keeping
 * it mounted also means scrolling back up re-assembles the portrait, because
 * every part of the effect is a pure function of scroll position.
 *
 * Rendering pauses (but the scene is retained) once it is fully scattered, so
 * it costs nothing while you are further down the page.
 */
const INTRO_VH = 1.35; // how many viewport heights of scroll the intro consumes

const PortraitIntro = () => {
  const prefersReduced = useReducedMotion();
  const progressRef = useRef(0);
  const [uiProgress, setUiProgress] = useState(0);

  useEffect(() => {
    if (prefersReduced) return undefined;
    const onScroll = () => {
      const span = window.innerHeight * INTRO_VH;
      const p = Math.min(1, Math.max(0, window.scrollY / span));
      progressRef.current = p;
      setUiProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  const copyFade = Math.max(0, 1 - uiProgress * 2.1);
  // The opaque plate has to clear before the particles do, otherwise the page
  // underneath stays hidden while the cloud is still visibly scattering.
  const plate = Math.max(0, 1 - uiProgress * 1.45);
  const done = uiProgress >= 0.999;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[40]"
      aria-hidden="true"
      style={{ visibility: done ? 'hidden' : 'visible' }}
    >
      {/* Always dark, in both themes. The cloud renders LIT pixels, so on a
          white plate the tonal relationship inverts and the face reads as a
          photographic negative. The reference is black for the same reason.
          The site underneath still honours light/dark. */}
      <div className="absolute inset-0" style={{ opacity: plate, backgroundColor: '#08080a' }} />

      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <PortraitField progressRef={progressRef} />
        </Suspense>
      </div>

      {/* Intro copy, mirroring the reference's bottom-left billing. */}
      <div
        className="absolute inset-x-0 bottom-0 px-5 pb-14 md:px-8 md:pb-16"
        style={{ opacity: copyFade, transform: `translateY(${uiProgress * -30}px)` }}
      >
        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">
          Web Developer — Philippines
        </p>
        <h1 className="mt-3 font-display text-[13vw] font-bold uppercase leading-[0.88] tracking-tight text-white lg:text-[6vw]">
          Symond
        </h1>
      </div>

      <div className="absolute inset-x-0 bottom-5 flex justify-center" style={{ opacity: copyFade }}>
        <span className="font-display text-[10px] font-semibold uppercase tracking-[0.34em] text-white/45">
          Scroll
        </span>
      </div>
    </div>
  );
};

export { INTRO_VH };
export default PortraitIntro;
