import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Compass, 
  Heart, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Bookmark, 
  Sparkles, 
  ChevronRight, 
  GraduationCap, 
  Scale, 
  ShieldCheck, 
  Clock, 
  Layers,
  Check
} from 'lucide-react';

export default function Curriculum() {
  const [activeTab, setActiveTab] = useState(0);

  const curriculums = [
    {
      id: 'quran',
      title: 'Quranic Studies & Tajweed',
      arabic: 'دِرَاسَاتُ القُرْآنِ الكَرِيمِ',
      image: '/images/noorani-qaida-student.jpg',
      icon: <BookOpen className="w-5 h-5" />,
      tag: 'Core Foundation',
      age: 'Ages 5–18',
      summary: 'From basic letter articulation (Noorani / Baghdadi Qaida) to fluent melodic recitation and structured Hifz memorisation.',
      description: 'Mastery of Holy Quran recitation, articulation points (Makharij), and melodic Tajweed rules tailored to each child’s retention capability. Every lesson combines vocal practice, listening repetition, and reverent understanding.',
      topics: [
        'Nazira: Fluent Quranic Reading from Noorani & Baghdadi Qaida foundations',
        'Tajweed: Comprehensive Makharij articulation, Sifat, and Nun/Meem Sakinah rules',
        'Hifz Support: Structured memorisation of selected Surahs, Juz Amma, or complete Juz',
        'Cadence & Tarteel: Recitation with beautiful melodic cadence, pauses, and respectful tone',
        'Surah Meaning: Child-friendly contextual explanation of memorised verses'
      ],
      milestones: [
        'Recognise and articulate all 28 Arabic letters with correct phonetics',
        'Recite short Surahs with zero Tajweed errors',
        'Understand basic pauses, Waqf rules, and Quranic etiquette'
      ]
    },
    {
      id: 'fiqh',
      title: 'Islamic Studies & Fiqh',
      arabic: 'الفِقْهُ وَالدِّرَاسَاتُ الإِسْلَامِيَّةُ',
      image: '/images/islamic-books.jpg',
      icon: <Compass className="w-5 h-5" />,
      tag: 'Shafi’i & Hanafi Streams',
      age: 'Ages 6–18',
      summary: 'Practical daily jurisprudence taught strictly according to traditional Shafi’i and Hanafi Madhhab texts without confusion.',
      description: 'Comprehensive jurisprudence taught according to authentic Shafi’i and Hanafi schools, instilling practical execution of daily worship. Families select their traditional school of thought upon enrollment.',
      topics: [
        "Dedicated Shafi'i & Hanafi Tracks: Choice of traditional school without mixing rulings",
        'Taharah & Purification: Complete practical mastery of ritual purity, Ghusl, and Istinja',
        'Wudu Mastery: Step-by-step practical perfection, obligatory Arkan, Sunan, and invalidators',
        'Salah & Daily Practices: Complete prayer movements, recitation in prayer, and prostrations',
        'Fasting & Zakah Basics: Awareness of Ramadan rules and charity obligations'
      ],
      milestones: [
        'Perform Wudu independently with total confidence and zero missed sunnahs',
        'Execute all 5 daily prayers correctly according to the family Madhhab',
        'Differentiate between Fard (obligatory), Sunnah, and Makruh actions'
      ]
    },
    {
      id: 'aqeedah',
      title: 'Aqeedah & Seerah',
      arabic: 'العَقِيدَةُ وَالسِّيرَةُ النَّبَوِيَّةُ',
      image: '/images/quran-rehal.jpg',
      icon: <Award className="w-5 h-5" />,
      tag: 'Faith & Identity',
      age: 'Ages 7–18',
      summary: 'Cultivating firm monotheistic conviction (Tawheed), love for Prophet Muhammad ﷺ, and authentic Islamic worldview.',
      description: 'Cultivating firm monotheistic conviction (Tawheed) and profound love for the Prophet Muhammad (peace be upon him) and the Noble Companions. Taught through engaging stories and reasoned orthodox principles.',
      topics: [
        'Islamic Beliefs: Six Pillars of Iman, Divine Attributes, Angels, and the Hereafter',
        'Prophetic Seerah: Inspiring chronology of the Life of Prophet Muhammad ﷺ (Meccan & Medinan)',
        'Lives of the Sahaba: Exemplary Companions as timeless moral heroes for modern youth',
        'Critical Faith for Modern Times: Answers to common contemporary youth doubts',
        'Prophets in the Quran: Stories of Ibrahim, Musa, Isa, and Yusuf (peace be upon them)'
      ],
      milestones: [
        'Articulate core tenets of Islamic belief with reasoned understanding',
        'Demonstrate comprehensive knowledge of key milestones in the Prophetic Seerah',
        'Express personal pride and emotional connection to Islamic identity'
      ]
    },
    {
      id: 'adab',
      title: 'Adab & Akhlaq',
      arabic: 'الأَدَبُ وَالأَخْلَاقُ المَرْضِيَّةُ',
      image: '/images/online-learning.jpg',
      icon: <Heart className="w-5 h-5" />,
      tag: 'Moral Uprightness',
      age: 'Ages 5–18',
      summary: 'Translating sacred knowledge into righteous character, respectful manners towards parents, and daily Sunnah habits.',
      description: 'Transforming religious knowledge into noble conduct, respectful character, daily prophetic habits, and authentic supplications. Nurturing children who bring peace, truthfulness, and kindness to their families.',
      topics: [
        'Character Development: Truthfulness, trustworthiness, humility, patience, and compassion',
        'Islamic Etiquette: Honoring parents (Birr al-Walidayn), teachers, elders, and neighbors',
        'Daily Duas & Adhkar: Morning and evening supplications, eating, sleeping, and traveling routines',
        'Digital Adab: Managing screen time, online integrity, and Islamic manners on social platforms',
        'Social Responsibility: Environmental care, charity, and civic duty as a proud Muslim'
      ],
      milestones: [
        'Memorise and regularly recite essential daily Duas and morning/evening Adhkar',
        'Practice respectful communication and obedient manners at home and school',
        'Reflect prophetic kindness and honesty in peer and family relationships'
      ]
    }
  ];

  const handleEnquireWithCourse = (courseName) => {
    const el = document.querySelector('#enquiry');
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

  const activeCurriculum = curriculums[activeTab];

  return (
    <section id="curriculum" className="py-20 lg:py-28 bg-ivory bg-islamic-pattern relative border-y border-charcoal-border overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-gold/40 text-primary text-[10px] font-bold uppercase tracking-widest mb-3 shadow-xs"
          >
            <Bookmark className="w-3.5 h-3.5 text-gold-700" />
            <span>Structured Academic Tracks</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-3 tracking-tight"
          >
            Our Academic Curriculum
          </motion.h2>

          <div className="w-16 h-1 bg-gradient-to-r from-gold to-primary mx-auto rounded-full mb-6"></div>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-charcoal-muted leading-relaxed font-normal"
          >
            A multi-layered Islamic educational syllabus engineered to take students from foundational Arabic phonetics to nuanced jurisprudence and refined character.
          </motion.p>
        </div>

        {/* =========================================================================
            INTERACTIVE CURRICULUM TAB SELECTOR (FIXED HIGH-CONTRAST VISIBILITY)
            ========================================================================= */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-3 scrollbar-none">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border-2 border-gold/40 shadow-sm gap-1 sm:gap-2">
            {curriculums.map((item, index) => {
              const isSelected = activeTab === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={`relative isolate px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isSelected 
                      ? 'text-white shadow-md' 
                      : 'text-charcoal hover:text-primary hover:bg-ivory'
                  }`}
                >
                  {/* Active sliding indicator - rendered above button container but behind text */}
                  {isSelected && (
                    <motion.div
                      layoutId="curriculumTabIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-primary to-forest rounded-xl border border-gold/60 shadow-md z-0"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}

                  {/* High Contrast Foreground Content */}
                  <span className="relative z-10 flex items-center gap-2">
                    <span className={isSelected ? 'text-gold-300' : 'text-primary'}>
                      {item.icon}
                    </span>
                    <span className={isSelected ? 'text-white font-extrabold tracking-wide' : 'text-charcoal font-bold'}>
                      {item.title}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            ACTIVE TAB SPOTLIGHT SHOWCASE
            ========================================================================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCurriculum.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-white rounded-3xl border-2 border-gold/50 shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10 mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Visual Showcase */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border-2 border-gold/40 shadow-lg group">
                  <img
                    src={activeCurriculum.image}
                    alt={activeCurriculum.title}
                    className="w-full h-64 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex items-end p-5">
                    <div className="text-white">
                      <span className="font-arabic text-xl sm:text-2xl text-gold-300 block mb-1">
                        {activeCurriculum.arabic}
                      </span>
                      <span className="text-xs font-bold text-ivory uppercase tracking-wider">
                        {activeCurriculum.tag} • {activeCurriculum.age}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Key Milestones Box */}
                <div className="p-4 rounded-xl bg-ivory border border-gold/30">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-2">
                    Key Academic Milestones
                  </span>
                  <ul className="space-y-1.5 text-xs text-charcoal">
                    {activeCurriculum.milestones.map((m, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-700 shrink-0 mt-0.5" />
                        <span className="font-medium text-charcoal">{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Detailed Topics & Information */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider border border-primary/20">
                    {activeCurriculum.tag}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gold/15 text-gold-800 font-bold text-xs uppercase tracking-wider border border-gold/30">
                    {activeCurriculum.age}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-1">
                    {activeCurriculum.title}
                  </h3>
                  <p className="font-arabic text-lg text-gold-700">
                    {activeCurriculum.arabic}
                  </p>
                </div>

                <p className="text-sm text-charcoal leading-relaxed font-normal">
                  {activeCurriculum.description}
                </p>

                {/* Detailed Module Topics */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Core Syllabus Modules:
                  </span>
                  <div className="space-y-2">
                    {activeCurriculum.topics.map((topic, i) => (
                      <div 
                        key={i} 
                        className="p-3 rounded-xl bg-ivory border border-charcoal-border hover:border-gold/40 transition-colors flex items-start gap-2.5"
                      >
                        <div className="w-5 h-5 rounded-full bg-primary text-gold-300 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                          {i + 1}
                        </div>
                        <span className="text-xs sm:text-sm text-charcoal font-medium">
                          {topic}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Enquiry Action */}
                <div className="pt-3 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleEnquireWithCourse(activeCurriculum.title)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs text-white bg-primary hover:bg-forest shadow-md transition-all border border-gold/40 cursor-pointer group"
                  >
                    <span>Enrol in {activeCurriculum.title}</span>
                    <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <span className="text-xs text-charcoal-muted">
                    Customised pacing &amp; private mentor assigned
                  </span>
                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* =========================================================================
            4 CARDS OVERVIEW GRID FOR QUICK COMPARISON
            ========================================================================= */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Comprehensive Curricular Overview At A Glance
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {curriculums.map((item, idx) => {
            const isCardActive = activeTab === idx;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                onClick={() => setActiveTab(idx)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isCardActive 
                    ? 'bg-ivory-50 border-2 border-gold shadow-lg ring-2 ring-gold/30' 
                    : 'bg-white hover:bg-ivory/60 border-charcoal-border hover:border-gold/50 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl border ${
                      isCardActive 
                        ? 'bg-primary text-gold-300 border-gold/40' 
                        : 'bg-ivory text-primary border-gold/30'
                    }`}>
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-bold text-gold-800 uppercase tracking-wider px-2 py-0.5 rounded bg-ivory border border-gold/25">
                      {item.tag}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-primary text-base mb-1">
                    {item.title}
                  </h4>
                  
                  <p className="font-arabic text-sm text-gold-700 mb-2">
                    {item.arabic}
                  </p>

                  <p className="text-xs text-charcoal leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-charcoal-border/60 flex items-center justify-between text-xs font-bold">
                  <span className={isCardActive ? 'text-gold-800' : 'text-primary'}>
                    {isCardActive ? 'Currently Active Track' : 'View Details'}
                  </span>
                  <ChevronRight className={`w-4 h-4 ${isCardActive ? 'text-gold-700' : 'text-primary'}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
