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
    <section id="projects" className="py-16 bg-white min-h-screen font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2B0D3E] mb-3">Featured Projects</h2>
          <p className="text-base text-[#7A3F91]">A showcase of my recent work and creative solutions</p>
        </div>

        {/* LayoutGroup ensures that elements within different cards coordinate their layout animations */}
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
                  className={`relative rounded-2xl overflow-hidden shadow-md bg-[#F2EAF7] flex flex-col ${
                    isExpanded ? 'lg:col-span-3 md:col-span-2' : 'h-full'
                  }`}
                >
                  <div className={`flex flex-col h-full ${isExpanded ? 'lg:flex-row' : ''}`}>
                    {/* Image Section */}
                    <motion.div layout className={`relative group overflow-hidden bg-[#1a0b2e] ${isExpanded ? 'lg:w-3/5' : 'w-full'}`}>
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
                            isExpanded ? 'h-[500px] object-contain' : 'h-56 object-cover group-hover:scale-105'
                          }`}
                        />
                      </AnimatePresence>

                      {isExpanded && project.gallery && (
                        <>
                          <button 
                            onClick={() => prevImg(project.gallery)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 text-white hover:bg-[#7A3F91] transition-colors cursor-pointer z-10"
                          >
                            <ChevronLeft className="h-6 w-6" />
                          </button>
                          <button 
                            onClick={() => nextImg(project.gallery)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 text-white hover:bg-[#7A3F91] transition-colors cursor-pointer z-10"
                          >
                            <ChevronRight className="h-6 w-6" />
                          </button>
                        </>
                      )}

                      {!isExpanded && (
                        <div className="absolute inset-0 bg-[#2B0D3E]/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button 
                            onClick={() => handleExpand(project.id)}
                            className="rounded-full bg-[#7A3F91] text-white cursor-pointer text-sm"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" /> View Details
                          </Button>
                        </div>
                      )}
                    </motion.div>

                    {/* Details Section */}
                    <div className={`p-6 flex flex-col ${isExpanded ? 'lg:w-2/5' : 'w-full flex-grow'}`}>
                      <div className="flex justify-between items-start mb-3">
                        <motion.h3 layout="position" className={`${isExpanded ? 'text-2xl' : 'text-lg'} font-bold text-[#2B0D3E]`}>
                          {project.title}
                        </motion.h3>
                        {isExpanded && (
                          <button onClick={() => setExpandedId(null)} className="text-[#7A3F91] hover:rotate-90 transition-transform cursor-pointer">
                            <X className="h-6 w-6" />
                          </button>
                        )}
                      </div>
                      
                      <motion.div layout="position" className="text-[#7A3F91] mb-5 leading-relaxed text-sm">
                        {!isExpanded ? (
                          <>
                            {project.description.length > 100 
                              ? `${project.description.substring(0, 100)}... ` 
                              : project.description}
                            {project.description.length > 100 && (
                              <button
                                onClick={() => handleExpand(project.id)}
                                className="text-[#2B0D3E] font-semibold hover:underline ml-1 cursor-pointer"
                              >
                                See More
                              </button>
                            )}
                          </>
                        ) : (
                          project.description
                        )}
                      </motion.div>

                      <motion.div layout="position" className="flex flex-wrap gap-2 mb-6 mt-auto">
                        {project.techStack.map((tech, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] font-medium p-1.5 rounded-md bg-[#2B0D3E] text-[#C59DD9]">
                            {iconMap[tech]}
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
                            className="bg-[#7A3F91] text-white px-6 cursor-pointer text-sm"
                            onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
                          >
                            Visit Site
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Gallery Expansion */}
                  <AnimatePresence>
                    {isExpanded && project.gallery && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="p-6 border-t border-[#C59DD9]/20 bg-white"
                      >
                        <h4 className="text-lg font-bold text-[#2B0D3E] mb-4">Project Screenshots</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                          {project.gallery.map((src, i) => (
                            <motion.img
                              key={i}
                              whileHover={{ scale: 1.05 }}
                              onClick={() => setCurrentImgIndex(i)} 
                              src={src}
                              className={`rounded-lg cursor-pointer border-2 transition-all h-20 w-full object-cover ${
                                currentImgIndex === i ? 'border-[#7A3F91] shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'
                              }`}
                              alt={`Gallery ${i}`}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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