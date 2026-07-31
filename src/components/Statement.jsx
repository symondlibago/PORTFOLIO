import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const TEXT =
  "Most of what I build, you are not really meant to notice. A form that submits " +
  "on the first try. A page that loads before you get impatient. A layout that " +
  "still holds up on an old phone. That is the part people actually feel, so that " +
  "is where I spend my time.";

const ACCENT = new Set(['notice', 'impatient', 'feel']);

/**
 * Scroll-pinned statement. The section is tall; an inner sticky pane holds the
 * text at viewport centre while scroll progress lights each word from dim to
 * full ink, left to right.
 *
 * Word-level opacity driven by scroll (rather than a single block fade) is what
 * makes this read as deliberate rather than as a generic reveal.
 */
const Word = ({ children, range, progress }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
};

const Statement = () => {
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);
  // The section is deliberately ~2.2 viewports tall. The inner pane sticks for
  // the difference, and that leftover distance is the scroll budget the word
  // reveal spends. Without the extra height there is no progress to animate on.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const words = useMemo(() => TEXT.split(' '), []);

  return (
    <section
      ref={ref}
      className="relative h-[220vh]"
      aria-label="Statement"
    >
      <div className="sticky top-0 flex h-screen items-center">
        <div className="container mx-auto px-6">
          <p className="mx-auto max-w-4xl font-display text-2xl leading-[1.35] tracking-tight text-ink md:text-4xl lg:text-5xl">
            {words.map((word, i) => {
              const clean = word.replace(/[—.,]/g, '').toLowerCase();
              const isAccent = ACCENT.has(clean);
              // Spend the reveal over the first 70% of the pin so the finished
              // sentence holds on screen briefly before the section releases.
              const span = 0.7;
              const start = (i / words.length) * span;
              const end = Math.min(1, start + (1 / words.length) * span * 2.2);
              const node = (
                <span className={isAccent ? 'font-serif italic text-brand' : undefined}>{word}</span>
              );
              return (
                <span key={`${word}-${i}`} className="inline-block">
                  {prefersReduced ? (
                    node
                  ) : (
                    <Word range={[start, end]} progress={scrollYProgress}>
                      {node}
                    </Word>
                  )}
                  &nbsp;
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Statement;
