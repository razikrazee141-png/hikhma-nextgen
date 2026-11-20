import React from 'react';
import { motion } from 'framer-motion';
import { Languages as LangIcon, MessageCircleQuestion, Globe2 } from 'lucide-react';

export default function LanguagesSupported() {
  const languages = [
    {
      name: 'English',
      native: 'English',
      script: 'International Standard',
      desc: 'Bilingual instruction tailored for diaspora students worldwide.'
    },
    {
      name: 'Urdu',
      native: 'اردو',
      script: 'Classical Nastaliq',
      desc: 'Rich Islamic literature heritage with fluent conversational instruction.'
    },
    {
      name: 'Kannada',
      native: 'ಕನ್ನಡ',
      script: 'Regional Fluency',
      desc: 'Native state curriculum alignment and clear regional guidance.'
    },
    {
      name: 'Malayalam',
      native: 'മലയാളം',
      script: 'Traditional Heritage',
      desc: 'Deep traditional madarasa pedagogical grounding & Makharij.'
    },
    {
      name: 'Tamil',
      native: 'தமிழ்',
      script: 'Classical Dravidian',
      desc: 'Mother-tongue coaching fostering strong moral character.'
    }
  ];

  return (
    <section id="languages" className="py-20 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ivory border border-gold/40 text-primary text-[10px] font-bold uppercase tracking-widest mb-3">
            <Globe2 className="w-3.5 h-3.5 text-gold" />
            <span>Multilingual Learning</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-3 tracking-tight">
            Languages Supported
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-gold to-primary mx-auto rounded-full mb-6"></div>
          <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed font-normal">
            We believe a child grasps profound spiritual concepts best when taught in their most comforting language.
          </p>
        </div>

        {/* 5 Languages Display Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              whileHover={{ y: -3 }}
              className="p-6 rounded-2xl bg-ivory border border-charcoal-border hover:border-gold hover:bg-white transition-all duration-300 text-center flex flex-col justify-between shadow-xs hover:shadow-md group"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-white border border-gold/40 flex items-center justify-center mx-auto mb-3 shadow-xs group-hover:scale-105 transition-transform">
                  <LangIcon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-2xl font-serif font-bold text-gold-700 mb-1">
                  {lang.native}
                </div>
                <h3 className="text-base font-bold text-primary mb-0.5">
                  {lang.name}
                </h3>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                  {lang.script}
                </span>
                <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                  {lang.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Regional Languages Banner */}
        <div className="p-5 rounded-2xl bg-ivory-200/60 border border-gold/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-white text-gold-800 shrink-0 border border-gold/30">
              <MessageCircleQuestion className="w-5 h-5 text-gold-700" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-primary">
                Need instruction in another language?
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-muted">
                Additional regional languages may be available upon request during your admission enquiry consultation.
              </p>
            </div>
          </div>
          <a
            href="#enquiry"
            className="shrink-0 px-5 py-2.5 rounded-lg bg-primary hover:bg-forest text-ivory text-xs font-bold uppercase tracking-wider transition-colors shadow-xs border border-gold/40"
          >
            Request Specific Language
          </a>
        </div>

      </div>
    </section>
  );
}
