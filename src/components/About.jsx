import React from 'react';
import { Reveal, RevealLines } from './Reveal';

const FACTS = [
  ['Based in', 'Philippines — working remote'],
  ['Focus', 'Front-end, internal systems, landing pages'],
  ['Mostly', 'React, Laravel, Tailwind, MySQL'],
  ['Also', 'Astro, TypeScript when the job suits it'],
];

/**
 * About: a two-column editorial spread. Statement on the left, a plain
 * definition-list of facts on the right — no cards, no icons, no decoration.
 */
const About = () => (
  <section id="about" className="border-b border-line py-20 md:py-28">
    <div className="mx-auto max-w-[1600px] px-5 md:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <RevealLines
            as="h2"
            text={'Most of what\nI build, you are\nnot meant to\nnotice.'}
            className="font-display text-[11vw] font-bold uppercase leading-[0.9] tracking-tight text-ink sm:text-[8vw] lg:text-[4.6vw]"
          />
          <Reveal delay={0.25} className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-subtle md:text-lg">
            <p>
              A form that submits on the first try. A page that loads before you get
              impatient. A layout that still holds up on an old phone. That is the part
              people actually feel, so that is where I spend my time.
            </p>
            <p>
              I have built monitoring systems for government programs, payroll and school
              management tools, and a handful of client sites that had to survive real
              traffic. Different problems, same job: make it clear and make it hold.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:pt-4">
          <dl className="border-t border-line">
            {FACTS.map(([k, v], i) => (
              <Reveal key={k} delay={0.1 + i * 0.07}>
                <div className="flex flex-col gap-1 border-b border-line py-5 sm:flex-row sm:items-baseline sm:gap-8">
                  <dt className="w-28 shrink-0 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-subtle">
                    {k}
                  </dt>
                  <dd className="text-base text-ink">{v}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </div>
  </section>
);

export default About;
