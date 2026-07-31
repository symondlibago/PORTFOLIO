import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../data/mockData';
import { Button } from './ui/button';
import Spotlight from './Spotlight';
import { SiReact, SiLaravel, SiTailwindcss, SiMysql, SiJavascript, SiNodedotjs, SiHtml5, SiCss3, SiPhp, SiMui, SiAmazons3, SiAstro, SiTypescript } from 'react-icons/si';

const Projects = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const iconMap = {
    'React': <SiReact />,
    'Laravel': <SiLaravel />,
    'Tailwind CSS': <SiTailwindcss />,
    'MySQL': <SiMysql />,
    'JavaScript': <SiJavascript />,
    'Node.js': <SiNodedotjs />,
    'HTML': <SiHtml5 />,
    'CSS': <SiCss3 />,
    'PHP': <SiPhp />,
    'MUI': <SiMui />,
    'S3 Bucket': <SiAmazons3 />,
    'Astro': <SiAstro />,
    'TypeScript': <SiTypescript />
  };

  const handleExpand = (id) => {
    setExpandedId(id);
    setCurrentImgIndex(0);
  };

  const nextImg = (gallery) => {
    setCurrentImgIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImg = (gallery) => {
    setCurrentImgIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <section id="projects" className="py-24 min-h-screen font-mono relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-ink mb-4 tracking-tight">
            Featured <span className="font-serif italic font-normal text-brand">projects</span>
          </h2>
          <p className="text-xs md:text-sm text-ink/45 font-mono tracking-[0.28em] uppercase">Creative Solutions &amp; Code</p>
        </div>

        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const isExpanded = expandedId === project.id;
              const displayImages = project.gallery || [project.image];

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    layout: { type: "spring", stiffness: 200, damping: 25 },
                    opacity: { duration: 0.4 }
                  }}
                  whileHover={isExpanded ? undefined : { y: -6 }}
                  className={`relative rounded-2xl overflow-hidden shadow-2xl bg-elev border border-ink/5 hover:border-brand/40 transition-colors flex flex-col ${
                    isExpanded ? 'lg:col-span-3 md:col-span-2' : 'h-full'
                  }`}
                >
                  <Spotlight disabled={isExpanded} className={`flex flex-col h-full ${isExpanded ? 'lg:flex-row' : ''}`}>
                    {/* Image Section */}
                    <motion.div layout className={`relative group overflow-hidden bg-surface ${isExpanded ? 'lg:w-3/5' : 'w-full'}`}>
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={isExpanded ? currentImgIndex : 'cover'}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          src={isExpanded ? displayImages[currentImgIndex] : project.image}
                          alt={project.title}
                          className={`w-full transition-all duration-500 ${
                            isExpanded ? 'h-[500px] object-contain' : 'h-56 object-cover group-hover:scale-105 opacity-80 group-hover:opacity-100'
                          }`}
                        />
                      </AnimatePresence>

                      {isExpanded && project.gallery && (
                        <>
                          <button 
                            onClick={() => prevImg(project.gallery)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-brand transition-colors cursor-pointer z-10"
                          >
                            <ChevronLeft className="h-6 w-6" />
                          </button>
                          <button 
                            onClick={() => nextImg(project.gallery)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-brand transition-colors cursor-pointer z-10"
                          >
                            <ChevronRight className="h-6 w-6" />
                          </button>
                        </>
                      )}

                      {!isExpanded && (
                        <div className="absolute inset-0 bg-brand/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                          <Button 
                            onClick={() => handleExpand(project.id)}
                            className="rounded-full bg-ink text-surface hover:bg-surface hover:text-ink cursor-pointer text-sm font-bold font-mono transition-colors"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" /> View Details
                          </Button>
                        </div>
                      )}
                    </motion.div>

                    {/* Details Section */}
                    <div className={`p-6 flex flex-col ${isExpanded ? 'lg:w-2/5' : 'w-full flex-grow'}`}>
                      <div className="flex justify-between items-start mb-3">
                        <motion.h3 layout="position" className={`${isExpanded ? 'text-2xl' : 'text-lg'} font-mono font-bold text-ink uppercase`}>
                          {project.title}
                        </motion.h3>
                        {isExpanded && (
                          <button onClick={() => setExpandedId(null)} className="text-brand hover:rotate-90 transition-transform cursor-pointer">
                            <X className="h-6 w-6" />
                          </button>
                        )}
                      </div>
                      
                      <motion.div layout="position" className="text-ink/70 mb-5 leading-relaxed text-sm font-mono text-justify">
                        {!isExpanded ? (
                          <>
                            {project.description.substring(0, 100)}...
                            <button
                                onClick={() => handleExpand(project.id)}
                                className="text-brand font-bold hover:underline ml-1 cursor-pointer"
                              >
                                See More
                              </button>
                          </>
                        ) : (
                          project.description
                        )}
                      </motion.div>

                      <motion.div layout="position" className="flex flex-wrap gap-2 mb-6 mt-auto">
                        {project.techStack.map((tech, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] font-mono font-bold p-1.5 px-2 rounded-md border border-ink/10 bg-surface text-ink hover:border-brand transition-colors">
                            <span className="text-brand">{iconMap[tech]}</span>
                            {tech}
                          </div>
                        ))}
                      </motion.div>

                      {isExpanded && project.link && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex gap-4"
                        >
                          <Button 
                            className="bg-brand text-white hover:bg-ink hover:text-surface px-6 cursor-pointer text-sm font-bold font-mono transition-colors shadow-lg shadow-brand/30"
                            onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
                          >
                            Visit Site
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </Spotlight>
                </motion.div>
              );
            })}
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
};

export default Projects;