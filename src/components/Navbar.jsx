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
  FileCheck2,
  Sparkles,
  HelpCircle,
  Star
} from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const announcements = [
    {
      badge: 'GOVERNANCE',
      text: 'Managed & Operated by NextGen Organisation',
      icon: <ShieldCheck className="w-3 h-3 text-gold-400" />
    },
    {
      badge: 'ADMISSIONS OPEN',
      text: 'Admissions Cycle 2026/2027 Open (Ages 5–18 Worldwide)',
      icon: <GraduationCap className="w-3 h-3 text-gold-400" />
    },
    {
      badge: 'JURISPRUDENCE',
      text: 'Dedicated Shafi\'i & Hanafi Learning Streams',
      icon: <Compass className="w-3 h-3 text-gold-400" />
    },
    {
      badge: 'MENTORSHIP',
      text: 'Private 1-on-1 Live Digital Classrooms with Qualified Tutors',
      icon: <Sparkles className="w-3 h-3 text-gold-400" />
    }
  ];

  // Rotate announcement ticker every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Curriculum', href: '#curriculum', id: 'curriculum' },
    { name: 'Methodology', href: '#methodology', id: 'methodology' },
    { name: 'Why Hikhma', href: '#why-us', id: 'why-us' },
    { name: 'Endorsements', href: '#testimonials', id: 'testimonials' },
    { name: 'FAQ', href: '#faq', id: 'faq' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

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
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      
      {/* Top Organization Announcement Bar with Animated Ticker */}
      <div className="bg-[#03231A] text-ivory-100 text-[10px] sm:text-[11px] py-1.5 sm:py-2 px-3 sm:px-4 border-b border-gold-500/30 tracking-wide overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-1.5 sm:gap-2">
          
          {/* Animated Announcement Rotator */}
          <div className="flex items-center gap-2 overflow-hidden h-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={announcementIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex items-center gap-2"
              >
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-gold-500/20 text-gold-300 font-extrabold uppercase tracking-widest text-[9px] border border-gold-400/40 shrink-0">
                  {announcements[announcementIndex].icon}
                  <span>{announcements[announcementIndex].badge}</span>
                </span>
                <span className="text-emerald-100 font-medium truncate text-[11px]">
                  {announcements[announcementIndex].text}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Accreditations & Status Indicators */}
          <div className="flex items-center gap-3 sm:gap-4 text-emerald-200 text-[10px] sm:text-[11px]">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-emerald-100">
              <Compass className="w-3.5 h-3.5 text-gold-400" />
              <span>Shafi'i &amp; Hanafi Syllabi</span>
            </span>
            <span className="text-emerald-800 hidden sm:inline">|</span>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-emerald-100">
              <GraduationCap className="w-3.5 h-3.5 text-gold-400" />
              <span>1-on-1 Mentorship (Ages 5–18)</span>
            </span>
            <span className="text-emerald-800 hidden lg:inline">|</span>
            <span className="inline-flex items-center gap-1.5 text-gold-300 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span>Admissions Cycle 2026/2027 Open</span>
            </span>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgb(6,78,59,0.08)] py-2 sm:py-2.5 border-b border-gold-500/30' 
            : 'bg-[#FAF7EF]/95 backdrop-blur-sm py-3 sm:py-3.5 border-b border-charcoal-border/70'
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
            <nav className="hidden xl:flex items-center space-x-1" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className={`relative px-3 py-1.5 text-xs uppercase tracking-wider font-bold transition-all duration-200 rounded-md cursor-pointer ${
                      isActive 
                        ? 'text-primary font-extrabold' 
                        : 'text-charcoal-muted hover:text-primary hover:bg-black/5'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-gradient-to-r from-gold-600 to-primary rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
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
                className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-ivory bg-gradient-to-r from-primary via-forest to-primary hover:from-forest hover:to-primary shadow-sm hover:shadow-lg transition-all duration-300 border border-gold/50 cursor-pointer group"
              >
                {/* Shimmer Sweep Animation */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                
                <FileCheck2 className="w-3.5 h-3.5 text-gold-400 group-hover:scale-110 transition-transform" />
                <span>Enquire for Admission</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold-300 group-hover:translate-x-0.5 transition-transform" />
              </motion.a>
            </div>

            {/* Mobile / Tablet Menu Toggle */}
            <div className="xl:hidden flex items-center">
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
              className="xl:hidden fixed inset-0 top-[105px] bg-black/50 backdrop-blur-xs z-30"
              aria-hidden="true"
            />

            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="xl:hidden relative z-40 bg-white border-b-2 border-gold shadow-2xl max-h-[calc(100vh-115px)] overflow-y-auto overscroll-contain"
            >
              <div className="p-4 bg-primary text-white border-b border-primary-dark">
                <div className="flex items-center gap-3 mb-2">
                  <img src="/logo-white.png" alt="Hikhma" className="h-8 w-auto object-contain" />
                </div>
                <span className="text-[10px] uppercase font-bold text-gold tracking-wider block">
                  Online Islamic School • Ages 5–18
                </span>
                <span className="text-xs text-emerald-200 block">
                  Managed and Operated by NextGen Organisation
                </span>
              </div>

              <div className="p-4 space-y-1">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="flex items-center justify-between p-3 rounded-xl text-sm font-semibold text-charcoal hover:bg-ivory hover:text-primary transition-colors cursor-pointer"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-gold-600" />
                  </motion.a>
                ))}
              </div>

              <div className="p-4 bg-ivory border-t border-charcoal-border space-y-3">
                <a
                  href="#enquiry"
                  onClick={(e) => handleScrollTo(e, '#enquiry')}
                  className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider shadow-md border border-gold/40 cursor-pointer"
                >
                  <FileCheck2 className="w-4 h-4 text-gold-400" />
                  <span>Enquire for Admission</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <div className="text-center">
                  <span className="text-[11px] text-charcoal-muted">
                    Shafi'i &amp; Hanafi Syllabi • 1-on-1 Classes Worldwide
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </header>
  );
}
