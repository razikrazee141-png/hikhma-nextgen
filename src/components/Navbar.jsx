import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  GraduationCap, 
  Compass, 
  Globe2, 
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
      const scrollPosition = window.scrollY + 120;
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

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const navOffset = 85;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="w-full z-50 select-none">
      
      {/* Top Organization Announcement Bar */}
      <div className="bg-[#042B21] text-ivory-100 text-[11px] py-2 px-4 border-b border-gold-500/25 tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-1.5">
          
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gold-500/20 text-gold-300 font-extrabold uppercase tracking-widest text-[9px] border border-gold-400/30">
              <ShieldCheck className="w-3 h-3 text-gold-400" />
              <span>Online Madrasa</span>
            </span>
            <span className="text-emerald-100 font-medium">
              Managed and Operated by <strong className="text-white font-semibold">NextGen Organisation</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-emerald-200 text-[11px]">
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

      {/* Main Sticky Navigation Bar */}
      <div 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-gold-500/30' 
            : 'bg-[#FAF7EF]/95 backdrop-blur-sm py-4 border-b border-charcoal-border/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Official Logo Brand */}
            <a
              href="#home"
              onClick={(e) => handleScrollTo(e, '#home')}
              className="flex items-center group"
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
                    className={`relative px-3.5 py-1.5 text-xs uppercase tracking-wider font-bold transition-all duration-200 rounded-md ${
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
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider text-ivory bg-gradient-to-r from-primary via-forest to-primary hover:from-forest hover:to-primary shadow-sm hover:shadow transition-all duration-200 border border-gold/40"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-gold-400" />
                <span>Enquire Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.a>
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center gap-2">
              <a
                href="#enquiry"
                onClick={(e) => handleScrollTo(e, '#enquiry')}
                className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded bg-primary text-ivory shadow-xs border border-gold/30"
              >
                Enquire
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-charcoal hover:text-primary hover:bg-black/5 focus:outline-none"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Polished Mobile Drawer with AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden bg-white border-b-2 border-gold shadow-2xl overflow-hidden"
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
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                        isActive 
                          ? 'bg-ivory text-primary border-l-4 border-gold' 
                          : 'text-charcoal-muted hover:text-primary hover:bg-ivory-50'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                  );
                })}
                
                <div className="pt-3 border-t border-slate-100 mt-2">
                  <a
                    href="#enquiry"
                    onClick={(e) => handleScrollTo(e, '#enquiry')}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-md text-xs font-bold uppercase tracking-wider text-ivory bg-primary hover:bg-forest shadow transition-all border border-gold/40"
                  >
                    <span>Submit Admission Enquiry</span>
                    <ArrowRight className="w-4 h-4 text-gold-400" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </header>
  );
}
