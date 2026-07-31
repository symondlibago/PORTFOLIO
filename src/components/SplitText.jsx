import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Masked per-word reveal — words rise out of a clipped line as the block scrolls
 * into view. This is the single most recognisable "expensive site" text effect
 * and it needs no library beyond framer-motion.
 *
 * Each word sits in an overflow-hidden span so the motion reads as the word
 * emerging from behind an edge rather than merely sliding.
 */
const SplitText = ({
  text,
  className = '',
  wordClassName = '',
  as: Tag = 'span',
  stagger = 0.045,
  delay = 0,
  duration = 0.75,
  once = true,
  /** Words matched here render in the serif italic accent face. */
  accentWords = [],
}) => {
  const prefersReduced = useReducedMotion();
  const words = useMemo(() => text.split(' '), [text]);
  const accent = useMemo(
    () => new Set(accentWords.map((w) => w.toLowerCase().replace(/[.,!?]/g, ''))),
    [accentWords]
  );

  if (prefersReduced) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-12%' }}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
        className="inline"
      >
        {words.map((word, i) => {
          const isAccent = accent.has(word.toLowerCase().replace(/[.,!?]/g, ''));
          return (
            <span
              key={`${word}-${i}`}
              // The mask. inline-block + clipped overflow is what makes the word
              // appear from behind an edge; leading-[1.15] keeps descenders visible.
              className="inline-block overflow-hidden align-bottom leading-[1.15] pb-[0.08em]"
            >
              <motion.span
                variants={{
                  hidden: { y: '110%', opacity: 0 },
                  visible: { y: '0%', opacity: 1 },
                }}
                transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
                className={`inline-block ${isAccent ? 'font-serif italic font-normal text-brand' : ''} ${wordClassName}`}
              >
                {word}
              </motion.span>
              {i < words.length - 1 && <span>&nbsp;</span>}
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
};

export default SplitText;
