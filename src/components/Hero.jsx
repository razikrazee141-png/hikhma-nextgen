import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  BookOpen, 
  Users, 
  Globe, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Award,
  Compass,
  Check,
  GraduationCap
} from 'lucide-react';

export default function Hero() {
  const handleScrollTo = (e, id) => {
    if (e && e.preventDefault) e.preventDefault();
    const el = document.querySelector(id);
    if (el) {
      const headerEl = document.querySelector('header');
      const headerHeight = headerEl ? headerEl.offsetHeight : 75;
      const targetTop = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, targetTop - headerHeight),
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden bg-ivory bg-islamic-pattern pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-charcoal-border">
      
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gold-200/25 rounded-full blur-3xl transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* =========================================================================
              LEFT COLUMN: HEADLINE, HIGHLIGHTS & CTAs
              ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            
            {/* Top Badge */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 px-4 py-1.5 rounded-full bg-white border border-gold/40 shadow-xs text-xs">
              <span className="font-arabic text-base text-gold-700 leading-none">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
              <span className="text-slate-300">|</span>
              <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] text-primary">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <span>Managed by NextGen Organisation</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-bold text-primary leading-[1.14] tracking-tight">
              Authentic Islamic Education, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-forest to-gold-600">
                Personalised for Every Child.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-charcoal-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Empowering children and teenagers with authentic Islamic knowledge, practical guidance and strong moral values through personalised online learning.
            </p>

            {/* 4 Core Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 pb-1">
              <div className="p-3 rounded-xl bg-white border border-charcoal-border shadow-xs text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  <Users className="w-3.5 h-3.5 text-primary" />
                  <span>Age Group</span>
                </div>
                <div className="text-sm font-bold text-primary">Ages 5–18</div>
                <div className="text-[10px] text-charcoal-light">Elementary to Youth</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-charcoal-border shadow-xs text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>Mentorship</span>
                </div>
                <div className="text-sm font-bold text-primary">1-on-1 Classes</div>
                <div className="text-[10px] text-charcoal-light">Dedicated tutor</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-charcoal-border shadow-xs text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>Classes</span>
                </div>
                <div className="text-sm font-bold text-primary">Flexible Hours</div>
                <div className="text-[10px] text-charcoal-light">Custom schedule</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-charcoal-border shadow-xs text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  <Globe className="w-3.5 h-3.5 text-gold" />
                  <span>Accessibility</span>
                </div>
                <div className="text-sm font-bold text-primary">Worldwide</div>
                <div className="text-[10px] text-charcoal-light">All time zones</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#enquiry"
                onClick={(e) => handleScrollTo(e, '#enquiry')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm text-ivory bg-primary hover:bg-forest shadow-md hover:shadow-lg transition-all duration-300 border border-gold/50"
              >
                <span>Enquire for Admission</span>
                <ArrowRight className="w-4 h-4 text-gold-400" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#curriculum"
                onClick={(e) => handleScrollTo(e, '#curriculum')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm text-primary bg-white hover:bg-ivory border border-charcoal-border shadow-xs hover:border-gold/60 transition-all duration-200"
              >
                <BookOpen className="w-4 h-4 text-forest" />
                <span>Explore Our Curriculum</span>
              </motion.a>
            </div>

            {/* Trust Assurances */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-charcoal-muted">
              <span className="flex items-center gap-1.5 font-medium text-primary">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                Shafi'i &amp; Hanafi Syllabi
              </span>
              <span className="flex items-center gap-1.5 font-medium text-primary">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                Multilingual Instructors
              </span>
              <span className="flex items-center gap-1.5 font-medium text-primary">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                Parent Assessment Reports
              </span>
            </div>

          </motion.div>

          {/* =========================================================================
              RIGHT COLUMN: OFFICIAL WIDESCREEN HERO PHOTOGRAPH (1024x576 NATIVE RATIO)
              ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-6 relative"
          >
            {/* Elegant Image Showcase Frame */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-gold/40 shadow-2xl bg-white p-2">
              
              {/* Preserves 16:9 native aspect ratio to show full composition: books, student, laptop, lantern, window */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src="/images/hero-student.jpg"
                  alt="Hikhma Islamic School student learning online with Quran, Islamic Studies, and Fiqh curriculum"
                  loading="eager"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Top-Right Live Indicator */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/90 backdrop-blur-md border border-gold/40 text-[10px] font-bold uppercase tracking-wider text-ivory shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Live 1-on-1 Class</span>
                </div>
              </div>

              {/* Bottom Information Ribbon on Photo Frame */}
              <div className="pt-3 pb-1 px-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-ivory border border-gold/40 flex items-center justify-center text-primary">
                    <GraduationCap className="w-4 h-4 text-gold-700" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block leading-tight">
                      Structured Curricula
                    </span>
                    <span className="text-xs font-bold text-primary leading-tight">
                      Quran • Islamic Studies • Fiqh
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-ivory border border-charcoal-border text-[11px] font-bold text-forest">
                  <Compass className="w-3.5 h-3.5 text-gold-700" />
                  <span>Shafi'i &amp; Hanafi</span>
                </div>
              </div>

            </div>

            {/* Floating Trust Card Overlay */}
            <motion.div 
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="hidden sm:flex absolute -bottom-5 -left-4 items-center gap-3.5 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-gold/40 shadow-xl"
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-ivory shrink-0 border border-gold/30">
                <ShieldCheck className="w-5 h-5 text-gold-300" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-gold-700">Admissions Open</div>
                <div className="text-xs font-bold text-primary">Managed by NextGen Organisation</div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
