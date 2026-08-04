import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/mockData';
import { Reveal, RevealLines } from './Reveal';
import TechList from './TechList';

/**
 * Work index. A plain two-column editorial grid — hard edges, hairline rules,
 * image scales on hover and nothing else moves. Each card routes to /work/:id.
 */
const WorkCard = ({ project, index }) => {
  const prefersReduced = useReducedMotion();
  return (
    <motion.article
      initial={prefersReduced ? false : { opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/work/${project.id}`} className="group block">
        <div className="relative overflow-hidden bg-elev">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/5" />
        </div>

        <div className="flex items-start justify-between gap-6 border-t border-line pt-5">
          <div>
            <h3 className="font-display text-2xl font-semibold uppercase leading-tight tracking-[0.01em] text-ink md:text-3xl">
              {project.title}
            </h3>
            <TechList items={project.techStack} className="mt-3" />
          </div>
          <span className="mt-1 shrink-0 text-ink transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
            <ArrowUpRight className="h-6 w-6" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
};

const Work = () => (
  <section id="work" className="border-b border-line py-20 md:py-28">
    <div className="mx-auto max-w-[1600px] px-5 md:px-8">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4 md:mb-16">
        <RevealLines
          as="h2"
          text={'Selected\nwork'}
          className="font-display text-[13vw] font-bold uppercase leading-[0.88] tracking-tight text-ink sm:text-[10vw] lg:text-[6vw]"
        />
        <Reveal delay={0.15}>
          <p className="max-w-xs text-sm text-subtle md:text-base">
            {projects.length} projects — client systems, landing pages and internal tools.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
        {projects.map((p, i) => (
          <WorkCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Work;
