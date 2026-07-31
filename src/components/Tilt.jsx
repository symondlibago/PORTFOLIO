import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Pointer-tracked 3D tilt. Wraps children in a perspective container and
 * rotates them toward the cursor, with an optional specular glare that follows
 * the pointer.
 *
 * Honours prefers-reduced-motion and the `disabled` prop by rendering a plain
 * div. Every hook runs before that branch so hook order stays stable.
 */
const Tilt = ({
  children,
  className = '',
  max = 9,
  scale = 1.02,
  glare = true,
  disabled = false,
}) => {
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);

  // Normalised pointer position within the element, 0..1 on each axis.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const spring = { stiffness: 260, damping: 24, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const glareBg = useTransform(
    [px, py],
    ([gx, gy]) =>
      `radial-gradient(340px circle at ${gx * 100}% ${gy * 100}%, rgba(168,85,247,0.20), transparent 60%)`
  );

  const off = disabled || prefersReduced;

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  if (off) return <div className={className}>{children}</div>;

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group/tilt ${className}`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="relative h-full w-full"
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default Tilt;
