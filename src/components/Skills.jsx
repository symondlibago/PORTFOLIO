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
    <section 
      ref={ref} 
      id="skills" 
      className="py-24 relative overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 z-0" 
           style={{ background: 'radial-gradient(circle at 50% 50%, #A855F7 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="font-display text-4xl md:text-6xl font-black text-white mb-4 tracking-tight uppercase">
            TECH <span className="text-transparent" style={{ WebkitTextStroke: '2px #A855F7' }}>STACK</span>
          </h2>
          <div className="h-1 w-20 bg-[#A855F7] mb-6 mx-auto md:mx-0" />
          <p className="font-mono text-white/50 text-sm md:text-base uppercase tracking-[0.2em] font-bold">
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
                scale: 1.05, 
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderColor: "#A855F7"
              }}
              className="group relative p-8 bg-[#161616] border border-white/5 shadow-2xl transition-all duration-300 flex flex-col items-center justify-center text-center h-40 rounded-xl"
            >
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-transparent group-hover:border-[#A855F7] transition-colors rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-transparent group-hover:border-[#A855F7] transition-colors rounded-br-xl" />
              
              <div className="text-4xl text-white group-hover:text-[#A855F7] mb-4 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)] transition-all duration-300">
                {iconMap[skill.name] || <SiReact />}
              </div>
              
              <h3 className="font-display text-sm md:text-base font-bold text-white tracking-widest uppercase group-hover:text-[#A855F7] transition-colors">
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