import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data/mockData';
import { 
  SiReact, SiHtml5, SiCss3, SiPhp, SiLaravel, 
  SiJavascript, SiTailwindcss, SiMysql, SiGit, 
  SiNodedotjs 
} from 'react-icons/si';
import { Globe, Cpu } from 'lucide-react';

const iconMap = {
  'React JS': <SiReact />,
  'HTML': <SiHtml5 />,
  'CSS': <SiCss3 />,
  'PHP': <SiPhp />,
  'Laravel': <SiLaravel />,
  'JavaScript': <SiJavascript />,
  'Tailwind CSS': <SiTailwindcss />,
  'MySQL': <SiMysql />,
  'Git': <SiGit />,
  'REST APIs': <Globe />,
  'Node.js': <SiNodedotjs />,
  'Responsive Design': <Cpu />
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section ref={ref} id="skills" className="py-24 bg-[#0f051d] relative overflow-hidden">
      {/* Background radial glow matching Hero UI */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 z-0" 
           style={{ background: 'radial-gradient(circle at 50% 50%, #2b0d3e 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          {/* Using font-display and stroke style from Hero */}
          <h2 className="font-display text-4xl md:text-6xl font-black text-[#F2EAF7] mb-4 tracking-tight">
            TECH <span className="text-transparent" style={{ WebkitTextStroke: '1px #C59DD9' }}>STACK</span>
          </h2>
          <div className="h-1 w-20 bg-[#C59DD9] mb-6" />
          <p className="font-mono text-[#C59DD9] opacity-80 text-sm md:text-base uppercase tracking-[0.2em]">
            Tools and technologies I use to build digital experiences
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03, 
                backgroundColor: "rgba(197, 157, 217, 0.1)",
                borderColor: "rgba(197, 157, 217, 0.4)"
              }}
              className="group relative p-8 bg-[#1a0b2e]/40 border border-[#C59DD9]/10 backdrop-blur-md transition-all duration-300 flex flex-col items-center justify-center text-center h-40"
            >
              {/* Corner accents for that "Technical" look */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#C59DD9]/30 group-hover:border-[#C59DD9] transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#C59DD9]/30 group-hover:border-[#C59DD9] transition-colors" />
              
              <div className="text-4xl text-[#C59DD9] mb-4 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(197,157,217,0.8)] transition-all duration-300">
                {iconMap[skill.name] || <SiReact />}
              </div>
              
              <h3 className="font-display text-sm md:text-base font-bold text-[#F2EAF7] tracking-widest uppercase">
                {skill.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;