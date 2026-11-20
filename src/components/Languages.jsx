import React from 'react';
import { motion } from 'framer-motion';
import { Languages as LangIcon, MessageCircleQuestion, Globe2, Sparkles, CheckCircle2 } from 'lucide-react';

export default function LanguagesSupported() {
  const languages = [
    {
      name: 'English',
      native: 'English',
      greeting: 'Peace be upon you',
      script: 'International Lingua Franca',
      desc: 'Bilingual instruction tailored for diaspora students across the UK, USA, Canada, and GCC.'
    },
    {
      name: 'Urdu',
      native: 'اردو',
      greeting: 'السلام علیکم ورحمۃ اللہ',
      script: 'Classical Nastaliq',
      desc: 'Rich Islamic literature heritage with fluent conversational instruction and respectful Adab.'
    },
    {
      name: 'Malayalam',
      native: 'മലയാളം',
      greeting: 'അസ്സലാമു അലൈക്കും',
      script: 'Traditional Kerala Heritage',
      desc: 'Deep traditional madarasa pedagogical grounding, authentic pronunciation & Makharij.'
    },
    {
      name: 'Kannada',
      native: 'ಕನ್ನಡ',
      greeting: 'ಅಸ್ಸಲಾಮು ಅಲೈಕುಮ್',
      script: 'Regional Fluency',
      desc: 'Native state curriculum alignment, clear regional guidance, and accessible explanation.'
    },
    {
      name: 'Tamil',
      native: 'தமிழ்',
      greeting: 'அஸ்ஸலாமு அலைக்கும்',
      script: 'Classical Dravidian',
      desc: 'Mother-tongue coaching fostering strong moral character, clarity, and religious retention.'
    }
  ];

  return (
    <section id="languages" className="py-20 lg:py-24 bg-white relative overflow-hidden">
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ivory border border-gold/40 text-primary text-[10px] font-bold uppercase tracking-widest mb-3 shadow-xs"
          >
            <Globe2 className="w-3.5 h-3.5 text-gold-700" />
            <span>Multilingual Pedagogy</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-3 tracking-tight"
          >
            Languages of Instruction
          </motion.h2>

          <div className="w-16 h-1 bg-gradient-to-r from-gold to-primary mx-auto rounded-full mb-6"></div>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-charcoal-muted leading-relaxed font-normal"
          >
            We believe a child grasps profound spiritual concepts best when taught in their most comforting mother tongue.
          </motion.p>
        </div>

        {/* 5 Languages Display Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-ivory border border-gold/30 hover:border-gold hover:bg-white transition-all duration-300 text-center flex flex-col justify-between shadow-xs hover:shadow-xl group"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-white border border-gold/40 flex items-center justify-center mx-auto mb-3 shadow-xs group-hover:scale-110 transition-transform">
                  <LangIcon className="w-5 h-5 text-primary" />
                </div>
                
                <div className="text-xl sm:text-2xl font-serif font-bold text-gold-700 mb-1 group-hover:text-primary transition-colors">
                  {lang.native}
                </div>

                <h3 className="text-base font-bold text-primary mb-0.5">
                  {lang.name}
                </h3>

                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                  {lang.script}
                </span>

                <div className="p-2 rounded-lg bg-white/70 border border-gold/20 mb-3 text-[11px] text-primary font-medium italic">
                  "{lang.greeting}"
                </div>

                <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                  {lang.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gold/20 text-[10px] font-bold text-gold-700 uppercase tracking-wider">
                Native Tutors Available
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Regional Languages Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 rounded-2xl bg-ivory-100 border-2 border-gold/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-white text-gold-800 shrink-0 border border-gold/30 shadow-xs">
              <MessageCircleQuestion className="w-6 h-6 text-gold-700" />
            </div>
            <div>
              <h4 className="text-base font-bold text-primary">
                Need instruction in another language or bilingual blend?
              </h4>
              <p className="text-xs text-charcoal-muted mt-0.5">
                Our admissions department can accommodate bilingual blends (e.g. English + Urdu or English + Malayalam) according to your child's preference.
              </p>
            </div>
          </div>

          <a
            href="#enquiry"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-primary hover:bg-forest text-ivory text-xs font-bold uppercase tracking-wider transition-colors border border-gold/40 shadow-xs cursor-pointer"
          >
            Request Language
          </a>
        </motion.div>

      </div>
    </section>
  );
}
