import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Monitor, Search, Video } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useScrollPosition } from "@/hooks/use-scroll";


export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [location] = useLocation();
  const scrollPosition = useScrollPosition();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrollPosition > 100 
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200/50 shadow-sm" 
          : "bg-white/90 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/">
            <motion.div 
              className="flex items-center cursor-pointer -ml-2 md:ml-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="logo-link"
            >
              <picture>
                <source srcSet="/logo-new.webp" type="image/webp" />
                <img 
                  src="/logo-new.png" 
                  alt="AS-ProDigital Logo" 
                  className="h-10 md:h-14 w-auto object-contain"
                  width="56"
                  height="56"
                  loading="eager"
                />
              </picture>
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesHovered(true)}
              onMouseLeave={() => setIsServicesHovered(false)}
            >
              <Link href="/leistungen">
                <span
                  className={`flex items-center transition-colors duration-300 cursor-pointer ${
                    location === "/leistungen" 
                      ? "text-[#fa5219] font-semibold" 
                      : "text-slate-600 hover:text-[#fa5219]"
                  }`}
                  data-testid="nav-leistungen"
                >
                  Leistungen
                  <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                    isServicesHovered ? "rotate-180" : ""
                  }`} />
                </span>
              </Link>
              
              {/* Dropdown Menu */}
              <AnimatePresence>
                {isServicesHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    <div className="py-2">
                      {[
                        { 
                          name: "Webdesign", 
                          href: "/webdesign",
                          description: "Moderne, responsive Websites",
                          icon: Monitor,
                          color: "text-[#19243b]"
                        },
                        { 
                          name: "SEO", 
                          href: "/seo",
                          description: "Suchmaschinenoptimierung",
                          icon: Search,
                          color: "text-[#fa5219]"
                        }
                      ].map((service, index) => (
                        <Link key={index} href={service.href}>
                          <motion.div
                            whileHover={{ backgroundColor: "rgba(250, 82, 25, 0.1)" }}
                            transition={{ duration: 0.05 }}
                            className="px-4 py-3 cursor-pointer flex items-start space-x-3"
                            data-testid={`dropdown-${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <motion.div
                              initial={{ scale: 1, rotate: 0 }}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ duration: 0.1, ease: "easeOut" }}
                              className={`mt-0.5 ${service.color}`}
                            >
                              <service.icon className="w-5 h-5" />
                            </motion.div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 dark:text-white">
                                {service.name}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-300">
                                {service.description}
                              </div>
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other Navigation Items */}
            {[
              { name: "Blog", href: "/blog" },
              { name: "Über mich", href: "/ueber-mich" },
            ].map((item, index) => (
              <Link key={index} href={item.href}>
                <span
                  className={`transition-colors duration-300 cursor-pointer ${
                    location === item.href 
                      ? "text-[#fa5219] font-semibold" 
                      : "text-slate-600 hover:text-[#fa5219]"
                  }`}
                  data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
            
            <Link href="/video-analyse">
              <motion.button
                onClick={() => {}}
                className="text-white px-3 py-2 lg:px-5 lg:py-2 text-xs lg:text-sm rounded-full font-medium hover:shadow-lg transition-all duration-300 bg-[#fa5219] flex items-center gap-1.5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="nav-video-analyse"
              >
                <Video className="w-4 h-4" aria-hidden="true" />
                <span className="hidden lg:inline">Kostenfreie</span> Video-Analyse
              </motion.button>
            </Link>
            
            <Link href="/kontakt">
              <motion.button
                onClick={() => {}}
                className="text-white px-4 py-2 lg:px-6 lg:py-2 text-sm lg:text-base rounded-full font-medium hover:shadow-lg transition-all duration-300 bg-[#19243b]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="nav-contact"
              >
                Kontakt
              </motion.button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="mobile-menu-button"
            whileTap={{ scale: 0.95 }}
            aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden py-6 border-t border-slate-200"
            >
              <div className="flex flex-col space-y-6">
              {/* Mobile Services Dropdown */}
              <div>
                <div className="flex items-center justify-between py-2">
                  <Link href="/leistungen">
                    <span
                      onClick={() => setIsOpen(false)}
                      className={`text-lg transition-colors duration-300 text-left cursor-pointer ${
                        location === "/leistungen" 
                          ? "text-[#fa5219] font-semibold" 
                          : "text-slate-700 hover:text-[#fa5219]"
                      }`}
                      data-testid="mobile-nav-leistungen"
                    >
                      Leistungen
                    </span>
                  </Link>
                  <motion.button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className="p-2 text-slate-600 hover:text-[#fa5219]"
                    whileTap={{ scale: 0.95 }}
                    aria-label={isMobileServicesOpen ? "Untermenü schließen" : "Untermenü öffnen"}
                    aria-expanded={isMobileServicesOpen}
                  >
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${
                      isMobileServicesOpen ? "rotate-180" : ""
                    }`} aria-hidden="true" />
                  </motion.button>
                </div>
                
                <AnimatePresence>
                  {isMobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 ml-6 space-y-3"
                    >
                      {[
                        { 
                          name: "Webdesign", 
                          href: "/webdesign",
                          icon: Monitor,
                          color: "text-[#19243b]"
                        },
                        { 
                          name: "SEO", 
                          href: "/seo",
                          icon: Search,
                          color: "text-[#fa5219]"
                        }
                      ].map((service, index) => (
                        <Link key={index} href={service.href}>
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center space-x-3 text-base text-slate-600 hover:text-[#fa5219] cursor-pointer transition-colors duration-200 py-2"
                            whileTap={{ scale: 0.98 }}
                          >
                            <motion.div
                              initial={{ scale: 1, rotate: 0 }}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ duration: 0.1, ease: "easeOut" }}
                              className={service.color}
                            >
                              <service.icon className="w-5 h-5" />
                            </motion.div>
                            <span>{service.name}</span>
                          </motion.div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Mobile Navigation Items */}
              {[
                { name: "Blog", href: "/blog" },
                { name: "Über mich", href: "/ueber-mich" },
              ].map((item, index) => (
                <Link key={index} href={item.href}>
                  <motion.span
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 text-lg transition-colors duration-300 text-left cursor-pointer ${
                      location === item.href 
                        ? "text-[#fa5219] font-semibold" 
                        : "text-slate-700 hover:text-[#fa5219]"
                    }`}
                    data-testid={`mobile-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.name}
                  </motion.span>
                </Link>
              ))}
              
              <Link href="/video-analyse">
                <motion.button
                  onClick={() => { setIsOpen(false); }}
                  className="w-full text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 mt-2 flex items-center justify-center gap-2"
                  style={{ background: '#fa5219' }}
                  data-testid="mobile-nav-video-analyse"
                  whileTap={{ scale: 0.98 }}
                >
                  <Video className="w-5 h-5" aria-hidden="true" />
                  Kostenfreie Video-Analyse
                </motion.button>
              </Link>
              
              <Link href="/kontakt">
                <motion.button
                  onClick={() => { setIsOpen(false); }}
                  className="w-full text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 mt-2"
                  style={{ background: '#19243b' }}
                  data-testid="mobile-nav-contact"
                  whileTap={{ scale: 0.98 }}
                >
                  Kontakt aufnehmen
                </motion.button>
              </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
