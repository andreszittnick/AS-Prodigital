import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Code, Search, ArrowRight, Sparkles, Target, TrendingUp } from "lucide-react";


export default function Services() {
  const services = [
    {
      icon: Code,
      title: "Professionelles Webdesign",
      subtitle: "Moderne Websites, die überzeugen",
      description: "Maßgeschneiderte Websites für Ihren digitalen Erfolg in Alzey und Umgebung. Responsive, schnell und konversionsstark.",
      link: "/webdesign",
      features: [
        "Responsive Design für alle Endgeräte",
        "SEO-optimierte Struktur von Anfang an",
        "Schnelle Ladezeiten für beste Performance",
        "Benutzerfreundliche Navigation",
        "Modernes, zeitgemäßes Design",
        "Laufende Wartung & Support"
      ],
      detailedText: `In Alzey entwickle ich für Unternehmen moderne, professionelle Websites, die mehr sind als nur eine digitale Visitenkarte. Mein Webdesign verbindet ansprechendes Design mit technischer Exzellenz und SEO-Optimierung.

Jede Website wird individuell auf Ihre Bedürfnisse zugeschnitten – von der ersten Konzeption über das Design bis zur finalen Umsetzung. Dabei lege ich besonderen Wert auf mobile Optimierung, denn über 60% Ihrer Besucher nutzen Smartphones.

Mit bewährten Technologien und modernen Frameworks entstehen Websites, die schnell laden, Google lieben und Ihre Besucher zu Kunden machen. Von Unternehmenswebsites über Landingpages bis zu komplexen Webanwendungen – ich begleite Sie auf dem Weg zum perfekten digitalen Auftritt.`,
      color: "from-orange-500 to-orange-600",
      accentColor: "text-orange-600",
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600"
    },
    {
      icon: Search,
      title: "Nachhaltige SEO-Optimierung",
      subtitle: "Mehr Sichtbarkeit, mehr Kunden",
      description: "Professionelle Suchmaschinenoptimierung für bessere Rankings und mehr organischen Traffic aus Alzey und der Region.",
      link: "/seo",
      features: [
        "Umfassende Keyword-Analyse & Recherche",
        "OnPage-Optimierung für bessere Rankings",
        "Technisches SEO für perfekte Performance",
        "Local SEO für regionale Sichtbarkeit",
        "Content-Optimierung mit Mehrwert",
        "Monatliches Monitoring & Reporting"
      ],
      detailedText: `Suchmaschinenoptimierung (SEO) ist der Schlüssel zu mehr Sichtbarkeit bei Google. Mit meiner SEO-Expertise aus Alzey helfe ich Unternehmen dabei, bei relevanten Suchanfragen ganz vorne zu stehen.

Mein Ansatz kombiniert technisches SEO, OnPage-Optimierung und strategische Content-Entwicklung. Ich analysiere Ihre Zielgruppe, identifiziere die richtigen Keywords und optimiere Ihre Website systematisch für bessere Rankings.

Besonders für lokale Unternehmen in Alzey und Umgebung ist Local SEO entscheidend. Ich sorge dafür, dass Ihre Kunden Sie finden – bei Google Maps, in lokalen Suchergebnissen und bei allen relevanten Suchanfragen. Mit transparentem Reporting behalten Sie den Überblick über Ihre SEO-Erfolge.`,
      color: "from-blue-600 to-blue-700",
      accentColor: "text-blue-600",
      iconBg: "bg-gradient-to-br from-blue-600 to-blue-700"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Webdesign & SEO Leistungen Alzey | AS-ProDigital</title>
        <meta name="description" content="Professionelle Webdesign & SEO Dienstleistungen aus Alzey. ✓ Moderne Websites ✓ Suchmaschinenoptimierung ✓ Local SEO ✓ Responsive Design. Ihr digitaler Erfolg!" />
        <meta name="keywords" content="Webdesign Alzey, SEO Alzey, Webentwicklung, Suchmaschinenoptimierung, Local SEO, Responsive Design, Online Marketing Alzey" />
        <link rel="canonical" href="https://www.as-prodigital.de/leistungen" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.as-prodigital.de/leistungen" />
        <meta property="og:title" content="Webdesign & SEO Leistungen Alzey | AS-ProDigital" />
        <meta property="og:description" content="Professionelle Webdesign & SEO Dienstleistungen für Ihren digitalen Erfolg in Alzey und Umgebung." />
        <meta property="og:locale" content="de_DE" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": ["Webdesign", "SEO-Optimierung", "Local SEO"],
            "provider": {
              "@type": "LocalBusiness",
              "name": "AS-ProDigital",
              "founder": {
                "@type": "Person",
                "name": "André Szittnick"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Alzey",
                "addressCountry": "DE"
              }
            },
            "areaServed": {
              "@type": "City",
              "name": "Alzey"
            }
          })
        }} />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <Navigation />
      
        {/* Hero Section with Dynamic Background */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden dynamic-background pt-32 pb-16">
          {/* Dynamic Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]" />
            
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
            
            <div className="hidden sm:block absolute top-1/4 right-1/4 w-24 sm:w-32 h-24 sm:h-32 bg-white/15 rounded-full filter blur-xl floating-orb" />
            <div className="hidden sm:block absolute bottom-1/3 left-1/4 w-32 sm:w-48 h-32 sm:h-48 bg-white/10 rounded-full filter blur-2xl pulse-orb" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="text-slate-600 font-medium text-lg md:text-xl">Professionelle Dienstleistungen</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6" data-testid="heading-services">
                <span className="block mb-2">
                  <span className="gradient-text">Webdesign & SEO</span>
                </span>
                <span className="block text-slate-900">aus Alzey</span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Webdesign & SEO aus Alzey – Zwei Kernbereiche für Ihren digitalen Erfolg
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 sm:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-20">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="relative"
                >
                  <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}>
                    {/* Service Card */}
                    <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500">
                        {/* Icon */}
                        <motion.div 
                          className={`w-16 h-16 md:w-20 md:h-20 ${service.iconBg} rounded-2xl flex items-center justify-center mb-6`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <service.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </motion.div>
                        
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                          {service.title}
                        </h2>
                        
                        <p className={`text-lg md:text-xl font-semibold ${service.accentColor} mb-4`}>
                          {service.subtitle}
                        </p>
                        
                        <p className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed">
                          {service.description}
                        </p>
                        
                        {/* Features List */}
                        <div className="mb-8">
                          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-[#fa5219]" />
                            Was Sie erhalten:
                          </h3>
                          <ul className="space-y-3">
                            {service.features.map((feature, featureIndex) => (
                              <motion.li 
                                key={featureIndex} 
                                className="flex items-start gap-3"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                              >
                                <div className="w-1.5 h-1.5 bg-[#fa5219] rounded-full mt-2.5 flex-shrink-0"></div>
                                <span className="text-slate-700">{feature}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* CTA Button */}
                        <Link href={service.link}>
                          <motion.button
                            className={`w-full bg-gradient-to-r ${service.color} text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            data-testid={`button-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            Mehr erfahren
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </motion.button>
                        </Link>
                      </div>
                    </div>

                    {/* Detailed Info Card with Icons */}
                    <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 md:p-10 h-full border border-slate-200">
                        <div className="flex items-center gap-3 mb-6">
                          <Target className={`w-6 h-6 ${service.accentColor}`} />
                          <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                            Mein Ansatz
                          </h3>
                        </div>
                        
                        <div className="prose prose-lg max-w-none">
                          {service.detailedText.split('\n\n').map((paragraph, pIndex) => (
                            <motion.p 
                              key={pIndex} 
                              className="text-slate-700 leading-relaxed mb-4 last:mb-0"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: pIndex * 0.1 }}
                            >
                              {paragraph.trim()}
                            </motion.p>
                          ))}
                        </div>

                        {/* Stats/Benefits */}
                        <div className="mt-8 pt-6 border-t border-slate-300 flex items-center gap-2 text-slate-600">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          <span className="font-semibold">Nachhaltige Erfolge durch professionelle Umsetzung</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Bereit für Ihren digitalen Erfolg?
              </h2>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Lassen Sie uns gemeinsam Ihre digitale Präsenz auf das nächste Level bringen. Kontaktieren Sie mich für ein unverbindliches Erstgespräch.
              </p>
              <Link href="/kontakt">
                <motion.button
                  onClick={() => {}}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid="button-contact-cta"
                >
                  Jetzt Kontakt aufnehmen
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
