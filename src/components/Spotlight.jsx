import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Pointer-tracked spotlight overlay.
 *
 * Deliberately transform-free: this sits on cards that framer-motion animates
 * with `layout`, and writing our own transform there would fight the layout
 * projection. Only background/opacity change, so the two never collide.
 */
const Spotlight = ({ children, className = '', radius = 380, disabled = false }) => {
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const background = useTransform(
    [mx, my],
    ([x, y]) =>
      `radial-gradient(${radius}px circle at ${x}px ${y}px, rgba(168,85,247,0.16), transparent 70%)`
  );

  const off = disabled || prefersReduced;

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <div
      ref={ref}
      onMouseMove={off ? undefined : handleMove}
      onMouseEnter={off ? undefined : () => setVisible(true)}
      onMouseLeave={off ? undefined : () => setVisible(false)}
      className={`relative ${className}`}
    >
      {children}
      {!off && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
          style={{ background }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />
      )}
    </div>
  );
};

export default Spotlight;
