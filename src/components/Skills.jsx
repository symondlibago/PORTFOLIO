import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SiReact } from 'react-icons/si';
import { skills } from '../data/mockData';
import { techIcons } from '../lib/tech-icons';
import { Reveal, RevealLines } from './Reveal';

/**
 * Stack as a numbered index list rather than a card grid — closer to an
 * editorial contents page. Rows underline on hover; nothing lifts or glows.
 */
const Skills = () => {
  const prefersReduced = useReducedMotion();
  return (
    <section id="stack" className="border-b border-line py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4 md:mb-16">
          <RevealLines
            as="h2"
            text="The stack"
            className="font-display text-[13vw] font-bold uppercase leading-[0.88] tracking-tight text-ink sm:text-[10vw] lg:text-[6vw]"
          />
          <Reveal delay={0.15}>
            <p className="max-w-xs text-sm text-subtle md:text-base">
              What I reach for first. Everything here is something I have shipped with.
            </p>
          </Reveal>
        </div>

        <ul className="border-t border-line">
          {skills.map((skill, i) => (
            <motion.li
              key={skill.name}
              initial={prefersReduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-6%' }}
              transition={{ duration: 0.55, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="group border-b border-line"
            >
              <div className="flex items-center gap-5 py-5 transition-colors duration-300 group-hover:text-brand md:py-6">
                <span className="w-10 shrink-0 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-subtle">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-xl text-ink transition-colors duration-300 group-hover:text-brand">
                  {techIcons[skill.name] || <SiReact />}
                </span>
                <span className="font-display text-2xl font-semibold uppercase tracking-[0.02em] text-ink transition-colors duration-300 group-hover:text-brand md:text-3xl">
                  {skill.name}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Skills;
