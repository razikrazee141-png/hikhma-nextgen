import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Compass, 
  Heart, 
  Award, 
  ArrowUpRight, 
  CheckCircle2, 
  Bookmark,
  Sparkles
} from 'lucide-react';

export default function Curriculum() {
  const curriculums = [
    {
      title: 'Quranic Studies',
      arabic: 'دِرَاسَاتُ القُرْآنِ الكَرِيمِ',
      image: '/images/noorani-qaida-student.jpg',
      icon: <BookOpen className="w-5 h-5 text-primary" />,
      tag: 'Core Foundation',
      description: 'Mastery of Holy Quran recitation, articulation points (Makharij), and melodic Tajweed rules tailored to each child’s retention capability.',
      topics: [
        'Nazira (Fluent Quranic Reading from Noorani / Baghdadi Qaida)',
        'Tajweed (Correct Makharij, Sifat, Nun/Meem Sakinah rules)',
        'Hifz Support (Structured memorisation of selected Surahs or Juz)',
        'Quranic Recitation with beautiful cadence and reverent pacing'
      ]
    },
    {
      title: 'Islamic Studies & Fiqh',
      arabic: 'الفِقْهُ وَالدِّرَاسَاتُ الإِسْلَامِيَّةُ',
      image: '/images/islamic-books.jpg',
      icon: <Compass className="w-5 h-5 text-gold-700" />,
      tag: 'Jurisprudence Streams',
      description: 'Comprehensive jurisprudence taught according to authentic Shafi’i and Hanafi schools, instilling practical execution of daily worship.',
      topics: [
        "Shafi'i & Hanafi Learning Streams (Choice of traditional Madhhab)",
        'Taharah & Purification (Ritual purity, Ghusl, and Istinja)',
        'Wudu (Step-by-step practical perfection and invalidators)',
        'Salah & Daily Practices (Prayer movements, Arkan, and Sunan)'
      ]
    },
    {
      title: 'Aqeedah & Seerah',
      arabic: 'العَقِيدَةُ وَالسِّيرَةُ النَّبَوِيَّةُ',
      image: '/images/quran-rehal.jpg',
      icon: <Award className="w-5 h-5 text-primary" />,
      tag: 'Identity & Faith',
      description: 'Cultivating firm monotheistic conviction (Tawheed) and profound love for the Prophet Muhammad (peace be upon him) and the Companions.',
      topics: [
        'Islamic Beliefs (Six Pillars of Iman, Tawheed, and Hereafter)',
        'Life of Prophet Muhammad ﷺ (Meccan & Medinan life stages)',
        'Islamic History & Exemplary Sahaba Role Models',
        'Timeless Islamic Values & Critical Thinking for Modern Youth'
      ]
    },
    {
      title: 'Adab & Akhlaq',
      arabic: 'الأَدَبُ وَالأَخْلَاقُ المَرْضِيَّةُ',
      image: '/images/online-learning.jpg',
      icon: <Heart className="w-5 h-5 text-gold-700" />,
      tag: 'Moral Character',
      description: 'Transforming religious knowledge into noble conduct, respectful character, daily prophetic habits, and authentic supplications.',
      topics: [
        'Character Development (Truthfulness, honesty, humility, and patience)',
        'Islamic Etiquette (Respecting parents, elders, teachers, and neighbors)',
        'Daily Duas & Adhkar (Morning/evening supplications, daily routines)',
        'Moral Development & Living Islam with Confidence in Society'
      ]
    }
  ];

  const handleEnquireWithCourse = (courseName) => {
    const el = document.querySelector('#enquiry');
    if (el) {
      const navOffset = 85;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="curriculum" className="py-20 lg:py-28 bg-ivory bg-islamic-pattern relative border-y border-charcoal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-gold/40 text-primary text-[10px] font-bold uppercase tracking-widest mb-3">
            <Bookmark className="w-3.5 h-3.5 text-gold" />
            <span>Our Curriculum</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-3 tracking-tight">
            Our Academic Curriculum
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-gold to-primary mx-auto rounded-full mb-6"></div>
          <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed font-normal">
            Designed for age-appropriate spiritual and intellectual development for students aged 5 to 18, combining classical Islamic scholarship with structured pedagogy.
          </p>
        </div>

        {/* 4 Curriculum Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {curriculums.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-3xl bg-white border border-charcoal-border shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>
                  
                  {/* Category Tag Badge */}
                  <div className="absolute top-4 left-4 flex items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-ivory bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full border border-gold/40 shadow-xs">
                      {item.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                      {item.title}
                    </h3>
                    <span className="font-arabic text-gold-300 text-lg sm:text-xl hidden sm:block">
                      {item.arabic}
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 sm:p-7">
                  <p className="text-sm text-charcoal-muted leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>

                  {/* Units List */}
                  <div className="space-y-2.5 bg-ivory p-4 rounded-2xl border border-charcoal-border/70 mb-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Structured Learning Modules
                    </span>
                    {item.topics.map((topic, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-ivory-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-charcoal-light">
                  Shafi'i &amp; Hanafi Streams
                </span>
                <button
                  type="button"
                  onClick={() => handleEnquireWithCourse(item.title)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-gold-700 transition-colors"
                >
                  <span>Enquire Now</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
