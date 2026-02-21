import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../data/mockData';
import { Button } from './ui/button';
import { SiReact, SiLaravel, SiTailwindcss, SiMysql, SiJavascript, SiNodedotjs, SiHtml5, SiCss3,SiPhp } from 'react-icons/si';

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
    'PHP': <SiPhp />
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
    <section id="projects" className="py-20 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2B0D3E] mb-4">Featured Projects</h2>
          <p className="text-lg text-[#7A3F91]">A showcase of my recent work and creative solutions</p>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const isExpanded = expandedId === project.id;
            const displayImages = project.gallery || [project.image];

            return (
              <motion.div
                key={project.id}
                layout
                className={`relative rounded-3xl overflow-hidden shadow-lg bg-[#F2EAF7] transition-all duration-500 ${
                  isExpanded ? 'lg:col-span-3 md:col-span-2' : 'h-full'
                }`}
              >
                <div className={`flex flex-col ${isExpanded ? 'lg:flex-row' : ''}`}>
                  <motion.div layout className={`relative group overflow-hidden bg-[#1a0b2e] ${isExpanded ? 'lg:w-2/3' : 'w-full'}`}>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={isExpanded ? currentImgIndex : 'cover'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        src={isExpanded ? displayImages[currentImgIndex] : project.image}
                        alt={project.title}
                        className={`w-full transition-all duration-500 ${
                          isExpanded ? 'h-[600px] object-contain' : 'h-64 object-cover group-hover:scale-110'
                        }`}
                      />
                    </AnimatePresence>

                    {isExpanded && project.gallery && (
                      <>
                        <button 
                          onClick={() => prevImg(project.gallery)}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-[#7A3F91] transition-colors"
                        >
                          <ChevronLeft className="h-8 w-8" />
                        </button>
                        <button 
                          onClick={() => nextImg(project.gallery)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-[#7A3F91] transition-colors"
                        >
                          <ChevronRight className="h-8 w-8" />
                        </button>
                      </>
                    )}

                    {!isExpanded && (
                      <div className="absolute inset-0 bg-[#2B0D3E]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button 
                          onClick={() => handleExpand(project.id)}
                          className="rounded-full bg-[#7A3F91] text-white cursor-pointer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" /> Live Demo
                        </Button>
                      </div>
                    )}
                  </motion.div>

                  <div className={`p-8 ${isExpanded ? 'lg:w-1/3' : 'w-full'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-3xl font-bold text-[#2B0D3E]">{project.title}</h3>
                      {isExpanded && (
                        <button onClick={() => setExpandedId(null)} className="text-[#7A3F91] hover:rotate-90 transition-transform">
                          <X className="h-8 w-8" />
                        </button>
                      )}
                    </div>
                    
                    <p className="text-[#7A3F91] mb-6 leading-relaxed text-lg">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-8">
                      {project.techStack.map((tech, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-mono p-2 rounded-lg bg-[#2B0D3E] text-[#C59DD9]">
                          {iconMap[tech]}
                          {tech}
                        </div>
                      ))}
                    </div>

                    {isExpanded && (
                      <div className="flex gap-4">
                        <Button className="bg-[#7A3F91] text-white px-8">Visit Site</Button>
                        <Button variant="outline" className="border-[#C59DD9] text-[#7A3F91]">View Code</Button>
                      </div>
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && project.gallery && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-8 border-t border-[#C59DD9]/20 bg-white"
                    >
                      <h4 className="text-xl font-bold text-[#2B0D3E] mb-6">Project Screenshots</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {project.gallery.map((src, i) => (
                          <motion.img
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setCurrentImgIndex(i)} // Clicking a thumb updates the carousel
                            src={src}
                            className={`rounded-xl cursor-pointer border-2 transition-all ${
                              currentImgIndex === i ? 'border-[#7A3F91] shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
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
      </div>
    </section>
  );
};

export default Projects;