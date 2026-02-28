import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../data/mockData';
import { Button } from './ui/button';
import { SiReact, SiLaravel, SiTailwindcss, SiMysql, SiJavascript, SiNodedotjs, SiHtml5, SiCss3, SiPhp, SiMui, SiAmazons3 } from 'react-icons/si';

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
    'S3 Bucket': <SiAmazons3 />
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
    <section id="projects" className="py-16 bg-[#0A0A0A] min-h-screen font-mono">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-mono font-black text-white mb-3 uppercase tracking-tight">
            Featured <span style={{ color: '#A855F7' }}>Projects</span>
          </h2>
          <p className="text-base text-white/50 font-mono font-bold tracking-widest uppercase">Creative Solutions & Code</p>
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
                  className={`relative rounded-2xl overflow-hidden shadow-2xl bg-[#161616] border border-white/5 flex flex-col ${
                    isExpanded ? 'lg:col-span-3 md:col-span-2' : 'h-full'
                  }`}
                >
                  <div className={`flex flex-col h-full ${isExpanded ? 'lg:flex-row' : ''}`}>
                    {/* Image Section */}
                    <motion.div layout className={`relative group overflow-hidden bg-black ${isExpanded ? 'lg:w-3/5' : 'w-full'}`}>
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
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-[#A855F7] transition-colors cursor-pointer z-10"
                          >
                            <ChevronLeft className="h-6 w-6" />
                          </button>
                          <button 
                            onClick={() => nextImg(project.gallery)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-[#A855F7] transition-colors cursor-pointer z-10"
                          >
                            <ChevronRight className="h-6 w-6" />
                          </button>
                        </>
                      )}

                      {!isExpanded && (
                        <div className="absolute inset-0 bg-[#A855F7]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                          <Button 
                            onClick={() => handleExpand(project.id)}
                            className="rounded-full bg-white text-black hover:bg-black hover:text-white cursor-pointer text-sm font-bold font-mono transition-colors"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" /> View Details
                          </Button>
                        </div>
                      )}
                    </motion.div>

                    {/* Details Section */}
                    <div className={`p-6 flex flex-col ${isExpanded ? 'lg:w-2/5' : 'w-full flex-grow'}`}>
                      <div className="flex justify-between items-start mb-3">
                        <motion.h3 layout="position" className={`${isExpanded ? 'text-2xl' : 'text-lg'} font-mono font-bold text-white uppercase`}>
                          {project.title}
                        </motion.h3>
                        {isExpanded && (
                          <button onClick={() => setExpandedId(null)} className="text-[#A855F7] hover:rotate-90 transition-transform cursor-pointer">
                            <X className="h-6 w-6" />
                          </button>
                        )}
                      </div>
                      
                      <motion.div layout="position" className="text-white/70 mb-5 leading-relaxed text-sm font-mono text-justify">
                        {!isExpanded ? (
                          <>
                            {project.description.substring(0, 100)}...
                            <button
                                onClick={() => handleExpand(project.id)}
                                className="text-[#A855F7] font-bold hover:underline ml-1 cursor-pointer"
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
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] font-mono font-bold p-1.5 px-2 rounded-md border border-white/10 bg-black text-white hover:border-[#A855F7] transition-colors">
                            <span className="text-[#A855F7]">{iconMap[tech]}</span>
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
                            className="bg-[#A855F7] text-white hover:bg-white hover:text-black px-6 cursor-pointer text-sm font-bold font-mono transition-colors shadow-lg shadow-[#A855F7]/30"
                            onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
                          >
                            Visit Site
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </div>
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