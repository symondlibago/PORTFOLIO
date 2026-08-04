import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../data/mockData';
import { Reveal, RevealLines } from './../components/Reveal';
import TechList from './../components/TechList';

/** Full-screen image viewer for the gallery. */
const Lightbox = ({ images, index, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    // Lock body scroll while the viewer is open.
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-surface/97 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 grid h-11 w-11 place-items-center border border-line text-ink transition-colors hover:border-ink cursor-pointer"
      >
        <X className="h-5 w-5" />
      </button>
      <button
        onClick={onPrev}
        aria-label="Previous"
        className="absolute left-4 grid h-11 w-11 place-items-center border border-line text-ink transition-colors hover:border-ink cursor-pointer md:left-8"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={onNext}
        aria-label="Next"
        className="absolute right-4 grid h-11 w-11 place-items-center border border-line text-ink transition-colors hover:border-ink cursor-pointer md:right-8"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <img
        key={index}
        src={images[index]}
        alt=""
        className="max-h-[86vh] max-w-[88vw] object-contain"
      />
      <p className="absolute bottom-6 font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-subtle">
        {index + 1} / {images.length}
      </p>
    </motion.div>
  );
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();
  const project = projects.find((p) => p.id === id);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!project) {
    return (
      <main className="mx-auto flex min-h-screen max-w-[1600px] flex-col items-start justify-center px-5 md:px-8">
        <h1 className="font-display text-[12vw] font-bold uppercase leading-[0.9] text-ink">Not found</h1>
        <p className="mt-4 text-subtle">That project does not exist.</p>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 border-b border-ink pb-1 font-display text-sm font-semibold uppercase tracking-[0.16em] text-ink">
          <ArrowLeft className="h-4 w-4" /> Back to work
        </Link>
      </main>
    );
  }

  const gallery = project.gallery?.length ? project.gallery : [project.image];
  const index = projects.findIndex((p) => p.id === id);
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="pt-28 md:pt-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-8">
        <Reveal>
          <button
            onClick={() => navigate('/')}
            className="mb-10 inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-subtle transition-colors hover:text-ink cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> All work
          </button>
        </Reveal>

        <RevealLines
          as="h1"
          text={project.title}
          className="font-display text-[12vw] font-bold uppercase leading-[0.88] tracking-tight text-ink sm:text-[9vw] lg:text-[5.6vw]"
        />

        {/* Meta strip */}
        <div className="mt-10 grid grid-cols-1 gap-8 border-y border-line py-8 sm:grid-cols-3">
          <Reveal delay={0.1}>
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-subtle">Stack</p>
            <TechList items={project.techStack} className="mt-2" size="md" />
          </Reveal>
          <Reveal delay={0.16}>
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-subtle">Images</p>
            <p className="mt-2 text-ink">{gallery.length}</p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-subtle">Live</p>
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 border-b border-ink pb-0.5 text-ink transition-opacity hover:opacity-60"
              >
                Visit site <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : (
              <p className="mt-2 text-subtle">Not public</p>
            )}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12 max-w-3xl">
          <p className="text-lg leading-relaxed text-subtle md:text-xl">{project.description}</p>
        </Reveal>

        {/* Gallery */}
        <div className="mt-16 grid grid-cols-1 gap-6 pb-20 md:grid-cols-2 md:gap-8">
          {gallery.map((src, i) => (
            <motion.button
              key={src}
              type="button"
              onClick={() => setLightbox(i)}
              initial={prefersReduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-6%' }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={`group block overflow-hidden bg-elev cursor-zoom-in ${
                i % 3 === 0 ? 'md:col-span-2' : ''
              }`}
            >
              <img
                src={src}
                alt={`${project.title} screen ${i + 1}`}
                loading="lazy"
                className="w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Next project */}
      <section className="border-t border-line">
        <Link to={`/work/${next.id}`} className="group block py-16 md:py-20">
          <div className="mx-auto max-w-[1600px] px-5 md:px-8">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-subtle">
              Next project
            </p>
            <div className="mt-4 flex items-center justify-between gap-6">
              <h2 className="font-display text-[10vw] font-bold uppercase leading-[0.9] tracking-tight text-ink transition-colors duration-300 group-hover:text-brand lg:text-[5vw]">
                {next.title}
              </h2>
              <ArrowUpRight className="h-8 w-8 shrink-0 text-ink transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:h-12 md:w-12" />
            </div>
          </div>
        </Link>
      </section>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            images={gallery}
            index={lightbox}
            onClose={() => setLightbox(null)}
            onPrev={() => setLightbox((v) => (v - 1 + gallery.length) % gallery.length)}
            onNext={() => setLightbox((v) => (v + 1) % gallery.length)}
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default ProjectDetail;
