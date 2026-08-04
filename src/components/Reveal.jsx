import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Masked reveal for blocks and headlines.
 *
 * `lines` splits on newline and staggers each line out from behind a clipped
 * edge — the restrained, editorial version of a text animation. Everything
 * collapses to plain markup under prefers-reduced-motion.
 */
export const Reveal = ({ children, delay = 0, y = 28, className = '', once = true }) => {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-10%' }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export const RevealLines = ({ text, className = '', lineClassName = '', delay = 0, as: Tag = 'span' }) => {
  const prefersReduced = useReducedMotion();
  const lines = String(text).split('\n');

  if (prefersReduced) {
    return (
      <Tag className={className}>
        {lines.map((l, i) => (
          <span key={i} className={`block ${lineClassName}`}>{l}</span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        // The viewport trigger MUST sit on the mask, not on the masked span.
        // IntersectionObserver clips against ancestor overflow, so a child that
        // starts translated 110% outside its own overflow-hidden parent never
        // registers as visible — it would wait forever to be seen.
        <motion.span
          key={i}
          className="block overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8%' }}
        >
          <motion.span
            className={`block ${lineClassName}`}
            variants={{ hidden: { y: '110%' }, visible: { y: '0%' } }}
            transition={{ duration: 0.9, delay: delay + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
};

export default Reveal;
