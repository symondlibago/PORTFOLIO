import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { ArrowDown } from 'lucide-react';
import { RevealLines, Reveal } from './Reveal';
import profilePic from '../assets/pics.avif';

/**
 * Editorial hero: oversized condensed uppercase headline against flat colour,
 * portrait as a hard-edged block. No glow, no gradient, no 3D.
 */
const Hero = () => {
  const lenis = useLenis();
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);

  const toWork = () => {
    const el = document.getElementById('work');
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.3, offset: -64 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="relative border-b border-line pt-28 md:pt-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-8">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Headline */}
          <div className="lg:col-span-8">
            <Reveal delay={0.05}>
              <p className="mb-6 font-display text-[11px] font-semibold uppercase tracking-[0.34em] text-subtle md:text-xs">
                Web Developer — Philippines
              </p>
            </Reveal>

            <RevealLines
              as="h1"
              text={'Building the\nweb, one\ndetail at a time.'}
              className="font-display text-[15vw] font-bold uppercase leading-[0.86] tracking-[-0.01em] text-ink sm:text-[13vw] lg:text-[8.5vw]"
              delay={0.1}
            />

            <Reveal delay={0.5} className="mt-8 max-w-xl">
              <p className="text-base leading-relaxed text-subtle md:text-lg">
                I build websites and internal systems that stay fast, hold up on old phones
                and do not need a manual. Mostly React and Laravel.
              </p>
            </Reveal>

            <Reveal delay={0.6} className="mt-10 flex flex-wrap items-center gap-3 pb-10 lg:pb-16">
              <button
                onClick={toWork}
                className="group inline-flex items-center gap-3 bg-ink px-8 py-4 font-display text-sm font-semibold uppercase tracking-[0.16em] text-surface transition-colors hover:bg-brand cursor-pointer"
              >
                See the work
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
              </button>
              <a
                href="mailto:libago.symond1@gmail.com"
                className="inline-flex items-center border border-ink px-8 py-4 font-display text-sm font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-surface"
              >
                Get in touch
              </a>
            </Reveal>
          </div>

          {/* Portrait */}
          <div className="lg:col-span-4">
            <div className="relative overflow-hidden bg-elev">
              <motion.img
                src={profilePic}
                alt="Symond"
                className="h-[380px] w-full object-cover object-top md:h-[520px]"
                style={prefersReduced ? undefined : { y: imgY, scale: 1.14 }}
                initial={prefersReduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
