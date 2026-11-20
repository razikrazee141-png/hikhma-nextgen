import React, { useState } from 'react';
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
  GraduationCap,
  Star,
  ChevronRight,
  School
} from 'lucide-react';

export default function Hero() {
  const [activeMadhhabPreview, setActiveMadhhabPreview] = useState('shafii');

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

  const keyMetrics = [
    {
      value: '100%',
      label: '1-on-1 Focus',
      sub: 'Private Tutors',
      icon: <Users className="w-4 h-4 text-primary" />
    },
    {
      value: 'Ages 5–18',
      label: 'Age Group',
      sub: 'All Levels',
      icon: <School className="w-4 h-4 text-gold-700" />
    },
    {
      value: "Shafi'i & Hanafi",
      label: 'Jurisprudence',
      sub: 'Traditional Madhhabs',
      icon: <Compass className="w-4 h-4 text-primary" />
    },
    {
      value: '15+ Nations',
      label: 'Global Cohorts',
      sub: 'All Time Zones',
      icon: <Globe className="w-4 h-4 text-gold-700" />
    }
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-ivory bg-islamic-pattern pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-charcoal-border">
      
      {/* Decorative Warm Ambient Glows with Floating Animation */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gold-200/30 rounded-full blur-3xl transform -translate-y-1/2 animate-float-slow"></div>
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-primary/10 rounded-full blur-3xl animate-float-reverse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================================
            TOP ACCREDITATION BADGE STRIP
            ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center lg:justify-start mb-6"
        >
          <div className="inline-flex flex-wrap items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-gold/50 shadow-sm text-xs">
            <span className="font-arabic text-base sm:text-lg text-gold-700 leading-none">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
            <span className="text-slate-300">|</span>
            <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] text-primary">
              <ShieldCheck className="w-4 h-4 text-gold-600" />
              <span>Official Online Institution</span>
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="hidden sm:inline-block text-[10px] font-semibold text-charcoal-muted">
              NextGen Organisation Governance
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* =========================================================================
              LEFT COLUMN: HEADLINE, METRICS & CALLS TO ACTION
              ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-bold text-primary leading-[1.12] tracking-tight">
              Authentic Islamic Education, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-forest to-gold-600">
                Personalised for Every Child.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-charcoal-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Empowering children and teenagers aged 5 to 18 with authentic Islamic knowledge, classical Tajweed, rigorous Fiqh, and upright character through dedicated 1-on-1 online mentorship worldwide.
            </p>

            {/* 4 Interactive Institutional Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 pb-1">
              {keyMetrics.map((metric, idx) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.08 }}
                  whileHover={{ y: -3, borderColor: '#C69B48' }}
                  className="p-3.5 rounded-2xl bg-white border border-charcoal-border shadow-xs text-left transition-all duration-200 group"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {metric.icon}
                    <span className="text-[10px] truncate">{metric.label}</span>
                  </div>
                  <div className="text-sm sm:text-base font-bold text-primary group-hover:text-gold-700 transition-colors">
                    {metric.value}
                  </div>
                  <div className="text-[10px] text-charcoal-light">
                    {metric.sub}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Interactive Madhhab Stream Switcher Preview */}
            <div className="p-3.5 rounded-2xl bg-white/90 border border-gold/40 shadow-xs text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Orthodox Jurisprudence Streams
                </span>
                <span className="text-[10px] font-bold text-gold-700">
                  Select Your Tradition
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveMadhhabPreview('shafii')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                    activeMadhhabPreview === 'shafii'
                      ? 'bg-primary text-white shadow-xs border border-gold/50 font-extrabold'
                      : 'bg-ivory hover:bg-ivory-200 text-charcoal border border-charcoal-border/40 font-semibold'
                  }`}
                >
                  <span className={activeMadhhabPreview === 'shafii' ? 'text-white' : 'text-charcoal'}>Shafi'i Madhhab</span>
                  {activeMadhhabPreview === 'shafii' && <Check className="w-3.5 h-3.5 text-gold-300" />}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMadhhabPreview('hanafi')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                    activeMadhhabPreview === 'hanafi'
                      ? 'bg-primary text-white shadow-xs border border-gold/50 font-extrabold'
                      : 'bg-ivory hover:bg-ivory-200 text-charcoal border border-charcoal-border/40 font-semibold'
                  }`}
                >
                  <span className={activeMadhhabPreview === 'hanafi' ? 'text-white' : 'text-charcoal'}>Hanafi Madhhab</span>
                  {activeMadhhabPreview === 'hanafi' && <Check className="w-3.5 h-3.5 text-gold-300" />}
                </button>
              </div>
              <p className="text-[11px] text-charcoal-muted mt-2">
                {activeMadhhabPreview === 'shafii' 
                  ? "Taught using traditional texts (Safinat al-Naja, Mukhtasar Abi Shuja) with precise Shafi'i Arkan & Sunan."
                  : "Taught using classical texts (Nur al-Idah, Quduri) with authoritative Hanafi rules for Taharah, Salah & Adab."}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <motion.a
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#enquiry"
                onClick={(e) => handleScrollTo(e, '#enquiry')}
                className="relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm text-ivory bg-gradient-to-r from-primary via-forest to-primary hover:from-forest hover:to-primary shadow-md hover:shadow-xl transition-all duration-300 border border-gold/50 group cursor-pointer"
              >
                {/* Shimmer sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <Sparkles className="w-4 h-4 text-gold-400 group-hover:rotate-12 transition-transform" />
                <span>Enquire for Admission</span>
                <ArrowRight className="w-4 h-4 text-gold-300 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#curriculum"
                onClick={(e) => handleScrollTo(e, '#curriculum')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm text-primary bg-white hover:bg-ivory border border-charcoal-border shadow-xs hover:border-gold/60 transition-all duration-200 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-forest" />
                <span>Explore Curricula</span>
              </motion.a>
            </div>

            {/* Trust Assurances Strip */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-charcoal-muted">
              <span className="flex items-center gap-1.5 font-semibold text-primary">
                <CheckCircle2 className="w-4 h-4 text-gold-600" />
                Dedicated Male &amp; Female Mentors
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-primary">
                <CheckCircle2 className="w-4 h-4 text-gold-600" />
                Multilingual Teaching (5 Languages)
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-primary">
                <CheckCircle2 className="w-4 h-4 text-gold-600" />
                Transparent Monthly Progress Reports
              </span>
            </div>

          </motion.div>

          {/* =========================================================================
              RIGHT COLUMN: OFFICIAL WIDESCREEN HERO PHOTOGRAPH (1024x576 RATIO)
              ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-6 relative"
          >
            {/* Outer Decorative Glow Rings */}
            <div className="absolute -inset-2 bg-gradient-to-r from-gold/30 via-primary/20 to-gold/30 rounded-3xl blur-md opacity-60"></div>

            {/* Elegant Image Showcase Frame */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-gold/50 shadow-2xl bg-white p-2.5">
              
              {/* Preserves 16:9 native aspect ratio */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 group">
                <img
                  src="/images/hero-student.jpg"
                  alt="Hikhma Islamic School student learning online with Quran, Islamic Studies, and Fiqh curriculum"
                  loading="eager"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Top-Right Live Indicator with Animated Ping */}
                <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/95 backdrop-blur-md border border-gold/50 text-[10px] font-bold uppercase tracking-wider text-ivory shadow-lg">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  <span>Supervised 1-on-1 Class</span>
                </div>

                {/* Bottom Overlay on Image */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-300 block">
                      Authentic Learning Experience
                    </span>
                    <span className="text-xs font-semibold text-ivory">
                      Recitation, Tajweed &amp; Classical Madhhabs
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-gold-400 text-xs font-bold bg-black/40 px-2.5 py-1 rounded-lg backdrop-blur-xs border border-white/10">
                    <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                    <span>5.0 Excellence</span>
                  </div>
                </div>
              </div>

              {/* Bottom Information Ribbon on Photo Frame */}
              <div className="pt-3 pb-1 px-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-ivory border border-gold/40 flex items-center justify-center text-primary shadow-xs">
                    <GraduationCap className="w-4 h-4 text-gold-700" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block leading-tight">
                      Curricular Syllabi
                    </span>
                    <span className="text-xs font-bold text-primary leading-tight">
                      Quran • Tajweed • Fiqh • Akhlaq
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ivory border border-charcoal-border text-[11px] font-bold text-forest">
                  <Compass className="w-3.5 h-3.5 text-gold-700" />
                  <span>Shafi'i &amp; Hanafi Choices</span>
                </div>
              </div>

            </div>

            {/* Floating Trust Card Overlay */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="hidden sm:flex absolute -bottom-5 -left-4 items-center gap-3.5 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-gold/50 shadow-xl"
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-ivory shrink-0 border border-gold/40">
                <ShieldCheck className="w-5 h-5 text-gold-300" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-gold-700">Official Admissions</div>
                <div className="text-xs font-bold text-primary">Managed by NextGen Organisation</div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
