import React from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import profilePic from '../assets/pic.jpg'; 

const Hero = () => {
  const name = "SYMOND";
  
  const letterVariants = {
    hidden: { 
      color: "rgba(0,0,0,0)", 
      WebkitTextStroke: '1px #F2EAF7' 
    },
    visible: (i) => ({
      color: "#F2EAF7",
      WebkitTextStroke: '1px #F2EAF7',
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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0f051d]">
      {/* Background radial glow */}
      <div className="absolute inset-0 opacity-30" 
           style={{ background: 'radial-gradient(circle at 50% 50%, #2b0d3e 0%, #0f051d 100%)' }} />

      <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* LEFT: Rephrased Bio & Name */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
          
            <h1 className="font-display text-7xl md:text-9xl font-black leading-[0.85] mb-8">
              <div className="flex overflow-hidden">
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
              <span className="font-display text-5xl md:text-6xl text-transparent block mt-2" style={{ WebkitTextStroke: '1px #C59DD9' }}>
                WEB DEVELOPER
              </span>
            </h1>

            {/* Added font-sans here for the bio */}
            <p className="font-mono text-[#F2EAF7] opacity-70 text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-light italic">
              I build high-performance web applications that look as good as they run. I focus on turning complex technical requirements into simple, functional tools.
            </p>
            
            <div className="flex gap-6 items-center font-mono font-medium">
              <Button className="bg-[#C59DD9] text-[#1a0b2e] hover:bg-[#F2EAF7] rounded-none px-8 py-7 transition-all flex items-center gap-2 group border-none font-bold cursor-pointer">
                VIEW PROJECTS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <button className="text-[#C59DD9] border-b border-[#C59DD9] pb-1 hover:text-[#F2EAF7] hover:border-[#F2EAF7] transition-all flex items-center gap-2 bg-transparent cursor-pointer">
                Download CV <Download className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Photo with drips on the border */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px]">
            
            {/* Drips positioned on the outside boundary */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-[3px] bg-[#C59DD9] rounded-full z-30"
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
                style={{ height: '50px', boxShadow: '0 0 12px #C59DD9' }}
              />
            ))}

            <motion.div 
              className="relative z-20 w-full h-full bg-[#1a0b2e] overflow-hidden border-x border-[#C59DD9]/10 shadow-2xl"
              style={{ clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)' }}
            >
              <img 
                src={profilePic} 
                alt="Symond" 
                className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700 scale-105" 
              />
            </motion.div>
            <div className="absolute -inset-10 bg-[#C59DD9]/5 blur-[100px] rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;