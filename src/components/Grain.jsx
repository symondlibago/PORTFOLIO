import React from 'react';

/**
 * Fixed film-grain overlay. Uses an inline SVG feTurbulence as a data URI so
 * there is no image request and nothing to cache-bust. Very low opacity: the
 * point is to break up flat colour fields, not to be visible on its own.
 */
const GRAIN =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>
       <filter id='n'>
         <feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/>
         <feColorMatrix type='saturate' values='0'/>
       </filter>
       <rect width='100%' height='100%' filter='url(#n)' opacity='0.5'/>
     </svg>`
  );

const Grain = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-overlay dark:opacity-[0.05]"
    style={{ backgroundImage: `url("${GRAIN}")`, backgroundRepeat: 'repeat' }}
  />
);

export default Grain;
