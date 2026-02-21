import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Palette, Database, Globe } from 'lucide-react';
import { skills } from '../data/mockData';

const iconMap = {
  Code: Code,
  Palette: Palette,
  Database: Database,
  Globe: Globe
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section ref={ref} className="py-20 md:py-32" style={{ backgroundColor: '#F2EAF7' }}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#2B0D3E' }}>
            Skills & Expertise
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: '#7A3F91' }}>
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {skills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon];
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="rounded-2xl p-6 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#C59DD9' }}
                  >
                    <IconComponent className="h-8 w-8" style={{ color: '#2B0D3E' }} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#2B0D3E' }}>
                  {skill.name}
                </h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-2.5 rounded-full"
                    style={{ backgroundColor: '#7A3F91' }}
                  />
                </div>
                <p className="text-sm font-medium" style={{ color: '#7A3F91' }}>
                  {skill.level}%
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;