import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  GraduationCap, 
  Compass, 
  ChevronRight,
  FileCheck2
} from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About Us', href: '#about', id: 'about' },
    { name: 'Our Curriculum', href: '#curriculum', id: 'curriculum' },
    { name: 'Methodology', href: '#methodology', id: 'methodology' },
    { name: 'Why Hikhma', href: '#why-us', id: 'why-us' },
    { name: 'Languages', href: '#languages', id: 'languages' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Active section detection
      const scrollPosition = window.scrollY + 140;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open to prevent background jitter
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleScrollTo = (e, href) => {
    if (e && e.preventDefault) e.preventDefault();
    setMobileMenuOpen(false);

    // If on another route (e.g. /admin), navigate back to home with the anchor
    if (window.location.pathname !== '/') {
      window.location.href = '/' + href;
      return;
    }

    // Smooth scroll with precise offset for sticky header
    setTimeout(() => {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        const headerEl = document.querySelector('header');
        const headerHeight = headerEl ? headerEl.offsetHeight : 75;
        const targetTop = targetElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: Math.max(0, targetTop - headerHeight),
          behavior: 'smooth'
        });
      }
    }, 120);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-shadow duration-300">
      
      {/* Top Organization Announcement Bar */}
      <div className="bg-[#042B21] text-ivory-100 text-[10px] sm:text-[11px] py-1.5 sm:py-2 px-3 sm:px-4 border-b border-gold-500/25 tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-1 sm:gap-1.5">
          
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-gold-500/20 text-gold-300 font-extrabold uppercase tracking-widest text-[9px] border border-gold-400/30">
              <ShieldCheck className="w-3 h-3 text-gold-400" />
              <span>Online Madrasa</span>
            </span>
            <span className="text-emerald-100 font-medium truncate">
              Managed and Operated by <strong className="text-white font-semibold">NextGen Organisation</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-emerald-200 text-[10px] sm:text-[11px]">
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-gold-400" />
              <span>Shafi'i &amp; Hanafi Jurisprudence</span>
            </span>
            <span className="text-emerald-800 hidden sm:inline">|</span>
            <span className="hidden lg:inline-flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-gold-400" />
              <span>1-on-1 Mentorship (Ages 5–18)</span>
            </span>
            <span className="text-emerald-800 hidden lg:inline">|</span>
            <span className="inline-flex items-center gap-1.5 text-gold-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Admissions Cycle 2026/2027 Open</span>
            </span>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 sm:py-3 border-b border-gold-500/30' 
            : 'bg-[#FAF7EF]/95 backdrop-blur-sm py-3 sm:py-4 border-b border-charcoal-border/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Official Logo Brand */}
            <a
              href="#home"
              onClick={(e) => handleScrollTo(e, '#home')}
              className="flex items-center group cursor-pointer"
              aria-label="Hikhma Islamic School Official Home"
            >
              <Logo variant="dark" size="default" showSubtitle={true} />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className={`relative px-3.5 py-1.5 text-xs uppercase tracking-wider font-bold transition-all duration-200 rounded-md cursor-pointer ${
                      isActive 
                        ? 'text-primary' 
                        : 'text-charcoal-muted hover:text-primary hover:bg-black/5'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-gold rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Desktop Right Action CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#enquiry"
                onClick={(e) => handleScrollTo(e, '#enquiry')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider text-ivory bg-gradient-to-r from-primary via-forest to-primary hover:from-forest hover:to-primary shadow-sm hover:shadow transition-all duration-200 border border-gold/40 cursor-pointer"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-gold-400" />
                <span>Enquire Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.a>
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => handleScrollTo(e, '#enquiry')}
                className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-primary active:bg-forest text-ivory shadow-xs border border-gold/30 touch-manipulation cursor-pointer"
              >
                Enquire
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-charcoal hover:text-primary active:bg-black/10 focus:outline-none touch-manipulation cursor-pointer"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer with Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop for tapping outside to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 top-[105px] bg-black/50 backdrop-blur-xs z-30"
              aria-hidden="true"
            />

            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="lg:hidden relative z-40 bg-white border-b-2 border-gold shadow-2xl max-h-[calc(100vh-115px)] overflow-y-auto overscroll-contain"
            >
              <div className="p-4 bg-primary text-white border-b border-primary-dark">
                <div className="flex items-center gap-3 mb-2">
                  <img src="/logo-white.png" alt="Hikhma" className="h-8 w-auto object-contain" />
                </div>
                <span className="text-[10px] uppercase font-bold text-gold tracking-wider block">
                  Online Islamic School
                </span>
                <p className="text-xs text-emerald-200 font-medium">
                  Managed and Operated by NextGen Organisation
                </p>
              </div>

              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <button
                      key={link.name}
                      type="button"
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className={`w-full flex items-center justify-between px-4 py-3 min-h-[44px] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors touch-manipulation text-left cursor-pointer ${
                        isActive 
                          ? 'bg-ivory text-primary border-l-4 border-gold shadow-xs' 
                          : 'text-charcoal-muted hover:text-primary active:bg-ivory-50'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  );
                })}
                
                <div className="pt-3 border-t border-slate-100 mt-2 pb-2">
                  <button
                    type="button"
                    onClick={(e) => handleScrollTo(e, '#enquiry')}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3.5 min-h-[46px] rounded-xl text-xs font-bold uppercase tracking-wider text-ivory bg-primary active:bg-forest shadow-md transition-all border border-gold/40 touch-manipulation cursor-pointer"
                  >
                    <span>Submit Admission Enquiry</span>
                    <ArrowRight className="w-4 h-4 text-gold-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </header>
  );
}
