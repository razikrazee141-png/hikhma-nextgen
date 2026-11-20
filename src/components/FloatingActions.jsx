import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Sparkles, FileCheck2 } from 'lucide-react';

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToEnquiry = () => {
    const targetElement = document.querySelector('#enquiry');
    if (targetElement) {
      const headerEl = document.querySelector('header');
      const headerHeight = headerEl ? headerEl.offsetHeight : 75;
      const targetTop = targetElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, targetTop - headerHeight),
        behavior: 'smooth'
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5"
        >
          {/* Quick Enquiry Floating Pill */}
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={scrollToEnquiry}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-ivory text-xs font-bold uppercase tracking-wider shadow-xl border border-gold/50 backdrop-blur-md hover:bg-forest transition-colors cursor-pointer"
            aria-label="Enquire for Admission"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Admissions Open</span>
            <FileCheck2 className="w-3.5 h-3.5 text-gold-300" />
          </motion.button>

          {/* Scroll to Top Circular Button */}
          <motion.button
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.94 }}
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white text-primary border border-gold/40 shadow-lg flex items-center justify-center hover:bg-ivory hover:text-gold-700 transition-colors cursor-pointer"
            aria-label="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
