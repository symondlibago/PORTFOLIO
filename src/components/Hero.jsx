import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { ArrowRight, Mail } from 'lucide-react';
import { Button } from './ui/button';
import Tilt from './Tilt';
import SplitText from './SplitText';
import profilePic from '../assets/pics.avif';

const Hero = () => {
  const name = "SYMOND";
  const lenis = useLenis();
  const sectionRef = useRef(null);
  const prefersReduced = useReducedMotion();

  // Parallax: the photo and the glows drift at different rates as the hero
  // scrolls away, which reads as depth without moving the text out of place.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const softSpring = { stiffness: 90, damping: 26, mass: 0.5 };
  const photoY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 90]), softSpring);
  const copyY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 40]), softSpring);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    // Route through Lenis so the jump matches the page's scrolling feel;
    // fall back to native behaviour when Lenis is off (reduced motion).
    if (lenis) lenis.scrollTo(element, { offset: 0, duration: 1.4 });
    else element.scrollIntoView({ behavior: 'smooth' });
  };

  const letterVariants = {
    hidden: { 
      color: "transparent", 
      WebkitTextStroke: '2px var(--brand)' 
    },
    visible: (i) => ({
      color: "var(--brand)",
      WebkitTextStroke: '2px var(--brand)',
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
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Soft glows only — the 3D backdrop behind the whole page carries the atmosphere now. */}
      <motion.div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-20 blur-[120px]"
           style={{ backgroundColor: 'var(--brand)', y: photoY }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full opacity-10 blur-[100px]"
           style={{ backgroundColor: 'var(--ink)' }} />

      <motion.div
        className="container mx-auto px-6 py-20 lg:py-0 grid lg:grid-cols-12 gap-12 items-center relative z-10"
        style={prefersReduced ? undefined : { opacity: heroFade }}
      >

        {/* LEFT: Bio & Name */}
        <motion.div className="lg:col-span-7" style={prefersReduced ? undefined : { y: copyY }}>
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
              <span className="font-display text-4xl md:text-6xl text-transparent block mt-4 md:mt-2" style={{ WebkitTextStroke: '2px var(--ink)' }}>
                WEB DEVELOPER
              </span>
            </h1>

            <SplitText
              as="p"
              text="I build high-performance web applications that look as good as they run. I focus on turning complex technical requirements into simple, functional tools."
              className="font-mono text-ink/70 text-base md:text-lg max-w-lg mb-10 leading-relaxed"
              accentWords={['high-performance', 'simple,', 'functional']}
              stagger={0.018}
              duration={0.6}
            />
            
            <div className="flex flex-wrap gap-4 items-center font-mono font-medium">
              <Button 
                onClick={() => scrollToSection('projects')}
                className="bg-brand text-white hover:bg-ink hover:text-surface rounded-full px-8 py-7 transition-all flex items-center gap-2 group border-none font-bold cursor-pointer shadow-lg shadow-brand/30"
              >
                VIEW PROJECTS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button 
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="border-2 border-ink text-ink hover:bg-ink hover:text-surface rounded-full px-8 py-7 transition-all flex items-center gap-2 font-bold cursor-pointer bg-transparent"
              >
                CONTACT ME <Mail className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT: Photo */}
        <motion.div
          className="lg:col-span-5 relative flex justify-center items-center"
          style={prefersReduced ? undefined : { y: photoY }}
        >
          <Tilt className="relative w-[280px] h-[380px] md:w-[400px] md:h-[500px]" max={12} scale={1.03} glare={false}>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-[3px] bg-brand rounded-full z-30"
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
                style={{ height: '50px', boxShadow: '0 0 15px var(--brand)' }}
              />
            ))}

            <motion.div
              className="relative z-20 w-full h-full bg-elev overflow-hidden border-x border-brand/30 shadow-2xl"
              style={{ clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)', transform: 'translateZ(40px)' }}
            >
              <img
                src={profilePic}
                alt="Symond"
                className="w-full h-full object-cover grayscale brightness-110 contrast-125 hover:grayscale-0 transition-all duration-700 scale-[1] -translate-y-0.5"
              />
            </motion.div>
            <div className="absolute -inset-10 bg-brand/10 blur-[100px] rounded-full" />
          </Tilt>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;