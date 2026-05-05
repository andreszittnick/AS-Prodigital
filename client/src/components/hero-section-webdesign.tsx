import { motion } from "framer-motion";
import { Code, Brain } from "lucide-react";
import TypingAnimationWebdesign from "./typing-animation-webdesign";
import andreImage from "@assets/Andre-Szittnick_1762107465807.webp";


export default function HeroSectionWebdesign() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden dynamic-background">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        {/* Overlay for content readability */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]" />
        
        {/* Floating animated elements - responsive sizes */}
        <motion.div 
          className="absolute top-10 sm:top-20 left-4 sm:left-20 w-48 sm:w-80 lg:w-96 h-48 sm:h-80 lg:h-96 bg-white/20 rounded-full filter blur-3xl floating-orb"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-20 sm:top-40 right-4 sm:right-20 w-32 sm:w-64 lg:w-80 h-32 sm:h-64 lg:h-80 bg-white/30 rounded-full filter blur-2xl floating-orb"
          animate={{ 
            x: [0, -25, 0],
            y: [0, 25, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        <motion.div 
          className="absolute bottom-10 sm:bottom-20 left-1/2 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-white/25 rounded-full filter blur-xl pulse-orb"
          animate={{ 
            x: [-15, 15, -15],
            y: [0, -15, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6
          }}
        />
        
        {/* Additional dynamic elements - hidden on mobile */}
        <div className="hidden sm:block absolute top-1/4 right-1/4 w-24 sm:w-32 h-24 sm:h-32 bg-white/15 rounded-full filter blur-xl floating-orb" />
        <div className="hidden sm:block absolute bottom-1/3 left-1/4 w-32 sm:w-48 h-32 sm:h-48 bg-white/10 rounded-full filter blur-2xl pulse-orb" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: 'calc(4rem + 3mm)' }}>
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left side - Content */}
          <motion.div 
            className="text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-slate-600 font-medium text-xl">Professionelles Webdesign aus einer Hand</span>
            </motion.div>
            
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="gradient-text">Professionelles</span><br />
              <span className="gradient-text">Webdesign</span><br />
              <span className="text-slate-900">für Ihren starken</span><br />
              <span className="text-slate-900">Online-Auftritt</span>
            </motion.h1>
            
            <motion.div 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium mb-6 sm:mb-8 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="text-slate-700">Modern. Schnell. </span>
              <TypingAnimationWebdesign />
            </motion.div>
            
            <motion.div 
              className="text-base sm:text-lg lg:text-xl text-slate-600 mb-6 sm:mb-8 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p>
                „Ich entwickle moderne, schnelle und optisch ansprechende Webseiten, die Ihre Marke perfekt präsentieren und Ihre Besucher in Kunden verwandeln.
                <br /><br />
                Ob Unternehmensseite oder Landingpage – ich gestalte Ihre Website individuell, nutzerfreundlich und funktional"
              </p>
              <br />
              <div className="space-y-2">
                <div className="text-lg font-bold text-slate-800">Ihre Vision. Meine Mission.</div>
                <div className="font-medium text-slate-600">Damit Ihr Online-Auftritt begeistert</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.button
                onClick={() => { scrollToSection("contact"); }}
                className="text-white px-6 py-3 text-base rounded-full font-semibold hover:shadow-xl transition-all duration-500 ease-in-out"
                style={{
                  background: '#fa5219',
                  border: '2px solid transparent',
                  transition: 'background 0.5s ease-in-out, color 0.5s ease-in-out, border-color 0.5s ease-in-out, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#fa5219';
                  e.currentTarget.style.borderColor = '#fa5219';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fa5219';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="button-webdesign-anfragen"
              >
                Webdesign anfragen
              </motion.button>
            </motion.div>
          </motion.div>
          
          {/* Right side - Photo */}
          <motion.div 
            className="flex justify-center lg:justify-end relative order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Glow Effect Behind Image */}
            <motion.div
              className="absolute inset-0 -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              <div 
                className="w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[500px] lg:w-96 lg:h-[600px] mx-auto rounded-3xl"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(250, 82, 25, 0.3) 0%, rgba(250, 82, 25, 0.15) 40%, rgba(25, 36, 59, 0.1) 70%, transparent 100%)',
                  filter: 'blur(40px)',
                  transform: 'scale(1.2)'
                }}
              />
            </motion.div>
            
            <motion.div 
              className="w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[500px] lg:w-96 lg:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-2 sm:ring-4 ring-white/50 backdrop-blur-sm drop-shadow-2xl relative z-10"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)'
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={andreImage} 
                alt="Andre Szittnick - Professioneller Webdesigner" 
                className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                data-testid="img-hero-photo"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}