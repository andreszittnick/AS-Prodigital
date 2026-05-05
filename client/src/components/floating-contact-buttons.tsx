import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowUp } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useState, useEffect, useCallback } from "react";

export default function FloatingContactButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 300;
      setShowScrollTop(shouldShow);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    scrollToTop();
  }, [scrollToTop]);

  return (
    <>
      <div className="fixed right-6 bottom-32 z-50 flex flex-col gap-3">
        <a
          href="https://wa.me/4967318789"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all duration-300 hover:scale-110 active:scale-90"
          style={{
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          }}
          data-testid="button-whatsapp-float"
        >
          <SiWhatsapp className="w-7 h-7 text-white" />
        </a>

        <a
          href="mailto:info@as-prodigital.de"
          className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all duration-300 hover:scale-110 active:scale-90"
          style={{
            background: '#fa5219',
          }}
          data-testid="button-mail-float"
        >
          <Mail className="w-6 h-6 text-white" />
        </a>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          onTouchStart={handleTouchStart}
          className="fixed right-6 bottom-6 z-[100] w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all duration-300 active:scale-90"
          style={{
            background: '#19243b',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
          }}
          aria-label="Nach oben scrollen"
          data-testid="button-scroll-top"
        >
          <ArrowUp className="w-6 h-6 text-white" />
        </button>
      )}
    </>
  );
}
