import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react'; 
import { Button } from './ui/button';
import profilePic from '../assets/pics.png'; 

const Hero = () => {
  const name = "SYMOND";
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const letterVariants = {
    hidden: { 
      color: "rgba(255,255,255,0)", 
      WebkitTextStroke: '2px #A855F7' 
    },
    visible: (i) => ({
      color: "#A855F7",
      WebkitTextStroke: '2px #A855F7',
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 1.5
      },
    }),
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #0A0A0A 0%, #161616 100%)' 
      }}
    >
      {/* Neon Atmospheric Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-20 blur-[120px]" 
           style={{ backgroundColor: '#A855F7' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full opacity-10 blur-[100px]" 
           style={{ backgroundColor: '#FFFFFF' }} />

      <div className="container mx-auto px-6 py-20 lg:py-0 grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* LEFT: Bio & Name */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
          
            <h1 className="font-display text-6xl md:text-9xl font-black leading-tight lg:leading-[0.85] mb-8">
              <div className="flex flex-wrap overflow-hidden">
                {name.split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              <span className="font-display text-4xl md:text-6xl text-transparent block mt-4 md:mt-2" style={{ WebkitTextStroke: '2px #FFFFFF' }}>
                WEB DEVELOPER
              </span>
            </h1>

            <p className="font-mono text-white/70 text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-medium italic">
              I build high-performance web applications that look as good as they run. I focus on turning complex technical requirements into simple, functional tools.
            </p>
            
            <div className="flex flex-wrap gap-4 items-center font-mono font-medium">
              <Button 
                onClick={() => scrollToSection('projects')}
                className="bg-[#A855F7] text-white hover:bg-white hover:text-black rounded-full px-8 py-7 transition-all flex items-center gap-2 group border-none font-bold cursor-pointer shadow-lg shadow-[#A855F7]/30"
              >
                VIEW PROJECTS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button 
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black rounded-full px-8 py-7 transition-all flex items-center gap-2 font-bold cursor-pointer bg-transparent"
              >
                CONTACT ME <Mail className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Photo */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div className="relative w-[280px] h-[380px] md:w-[400px] md:h-[500px]">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-[3px] bg-[#A855F7] rounded-full z-30"
                animate={{ 
                  top: ["-10%", "110%"],
                  left: i % 2 === 0 ? ["22%", "-2%"] : ["102%", "78%"],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "linear"
                }}
                style={{ height: '50px', boxShadow: '0 0 15px #A855F7' }}
              />
            ))}

            <motion.div 
              className="relative z-20 w-full h-full bg-[#111111] overflow-hidden border-x border-[#A855F7]/30 shadow-2xl"
              style={{ clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)' }}
            >
              <img 
                src={profilePic} 
                alt="Symond" 
                className="w-full h-full object-cover grayscale brightness-110 contrast-125 hover:grayscale-0 transition-all duration-700 scale-[1] -translate-y-0.5"
              />
            </motion.div>
            <div className="absolute -inset-10 bg-[#A855F7]/10 blur-[100px] rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;