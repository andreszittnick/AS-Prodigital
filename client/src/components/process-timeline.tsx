import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Zap, TrendingUp, Rocket, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';


const ProcessTimeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  const steps = [
    {
      id: 1,
      title: "Kontaktaufnahme",
      subtitle: "Erster Schritt in Richtung Erfolg",
      description: "Sie nehmen unkompliziert Kontakt mit mir auf und teilen mir Ihre Wünsche und Ziele für Ihr Projekt mit.",
      icon: Target,
      primaryColor: "#fa5219",
      secondaryColor: "#ff9966",
      position: "left",
    },
    {
      id: 2,
      title: "Persönliches Strategiegespräch",
      subtitle: "Ich entwickle Ihren Plan",
      description: "In einem persönlichen Gespräch besprechen wir die Vorgehensweise, entwickeln die passende Strategie und stimmen Designideen ab.",
      icon: Zap,
      primaryColor: "#19243b",
      secondaryColor: "#1a5490",
      position: "right",
    },
    {
      id: 3,
      title: "Umsetzung",
      subtitle: "Ihre Vision wird Realität",
      description: "Ich setze Ihr Projekt mit höchster Sorgfalt um – von der technischen Umsetzung bis zum modernen, professionellen Design.",
      icon: TrendingUp,
      primaryColor: "#fa5219",
      secondaryColor: "#ff9966",
      position: "left",
    },
    {
      id: 4,
      title: "Finalisierung & Übergabe",
      subtitle: "Fertigstellung und Start",
      description: "Nach dem letzten Feinschliff erhalten Sie Ihr fertiges Projekt, inklusive Einweisung und allen benötigten Dateien.",
      icon: Rocket,
      primaryColor: "#19243b",
      secondaryColor: "#1a5490",
      position: "right",
    },
  ];

  return (
    <section id="process" className="py-16 md:py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#fa5219] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#19243b] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-[#fa5219] rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 md:px-6 md:py-3 rounded-full border border-slate-200 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-[#fa5219]" />
            <span className="text-sm font-medium text-slate-600">Bewährter Prozess</span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent"
            style={{ lineHeight: '1.4' }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Von Ihrer <span className="text-[#19243b]">Idee</span> zum digitalen <span className="bg-gradient-to-r from-[#fa5219] to-[#ff6b1a] bg-clip-text text-transparent">Erfolg</span>
          </motion.h2>
          
          <motion.p 
            className="text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            In vier klaren Schritten begleite ich Sie von der ersten Idee bis zum erfolgreichen Online-Auftritt
          </motion.p>
        </div>

        <div ref={ref} className="relative max-w-6xl mx-auto">
          {/* Central timeline */}
          <div className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-transparent via-slate-300 to-transparent transform -translate-x-1/2 hidden lg:block">
            <motion.div 
              className="w-full bg-gradient-to-b from-[#fa5219] via-[#19243b] to-[#fa5219] rounded-full"
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            />
          </div>

          <div className="space-y-12 sm:space-y-16 lg:space-y-32">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = step.position === "left";
              
              return (
                <motion.div
                  key={step.id}
                  className={`relative flex items-center ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col gap-6 sm:gap-8 lg:gap-16`}
                  initial={{ opacity: 0, y: 80 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.3 + 0.6 }}
                >
                  {/* Content Card */}
                  <motion.div 
                    className="flex-1 max-w-lg"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border border-white/50 relative overflow-hidden group"
                      style={{ 
                        boxShadow: `0 20px 40px -12px ${step.primaryColor}20` 
                      }}
                      whileHover={{ 
                        boxShadow: `0 30px 60px -12px ${step.primaryColor}30` 
                      }}
                    >
                      {/* Background gradient */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                        style={{ 
                          background: `linear-gradient(135deg, ${step.primaryColor} 0%, ${step.secondaryColor} 100%)` 
                        }}
                      />
                      
                      <div className="relative z-10">
                        {/* Step number */}
                        <motion.div 
                          className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl mb-4 md:mb-6 text-white font-bold text-lg md:text-xl"
                          style={{ backgroundColor: step.primaryColor }}
                          animate={{ 
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ 
                            duration: 4,
                            repeat: Infinity,
                            delay: index * 0.5
                          }}
                        >
                          {step.id}
                        </motion.div>
                        
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-slate-900">
                          {step.title}
                        </h3>
                        
                        {step.subtitle && (
                          <h4 className="text-base md:text-lg font-semibold mb-4" style={{ color: step.primaryColor }}>
                            {step.subtitle}
                          </h4>
                        )}
                        
                        <p className="text-base md:text-base text-slate-600 leading-relaxed mb-6">
                          {step.description}
                        </p>
                        
                        {/* Action indicator */}
                        <motion.div 
                          className="flex items-center gap-2 text-sm font-medium cursor-pointer"
                          style={{ color: step.primaryColor }}
                          animate={{ x: [0, 5, 0] }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3
                          }}
                          onClick={() => {
                            
                            const contactSection = document.getElementById("contact");
                            if (contactSection) {
                              contactSection.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                          data-testid={`button-phase-${step.id}`}
                        >
                          <span>
                            {step.id === 1 && "Jetzt Kontakt aufnehmen"}
                            {step.id === 2 && "Strategie abstimmen"}
                            {step.id === 3 && "Umsetzung starten"}
                            {step.id === 4 && "Projekt live schalten"}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Central Icon */}
                  <motion.div 
                    className="relative z-20 flex-shrink-0"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.3 + 0.8,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <motion.div 
                      className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white relative overflow-hidden"
                      style={{ backgroundColor: step.primaryColor }}
                      animate={{ 
                        boxShadow: [
                          `0 0 0 0 ${step.primaryColor}40`,
                          `0 0 0 20px ${step.primaryColor}00`,
                          `0 0 0 0 ${step.primaryColor}40`
                        ]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5 + 1
                      }}
                    >
                      <Icon className="w-10 h-10 text-white relative z-10" />
                      
                      {/* Rotating background */}
                      <motion.div 
                        className="absolute inset-0 opacity-20"
                        style={{ 
                          background: `conic-gradient(from 0deg, transparent 0deg, ${step.secondaryColor} 180deg, transparent 360deg)` 
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ 
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Spacer for alignment */}
                  <div className="flex-1 max-w-lg hidden lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16 md:mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 2 }}
        >
          <motion.button 
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="text-white px-6 py-3 rounded-full font-semibold text-base shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out"
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
            data-testid="button-start-project"
          >
            Projekt starten
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default ProcessTimeline;