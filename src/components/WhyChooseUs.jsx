import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserCheck, 
  GraduationCap, 
  Scale, 
  CalendarClock, 
  Globe, 
  Languages, 
  Sparkles, 
  MessageSquare,
  Award,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export default function WhyChooseUs() {
  const points = [
    {
      title: 'Individual Attention for Every Student',
      desc: 'No shared classroom distractions. The entire session is tailored to your child’s unique questions, strengths, and spiritual growth.',
      icon: <UserCheck className="w-5 h-5 text-primary" />,
      badge: '1-on-1 Dedicated'
    },
    {
      title: 'Vetted & Qualified Personal Tutors',
      desc: 'Patient, accredited Islamic educators who form a consistent mentor relationship with your child over time.',
      icon: <GraduationCap className="w-5 h-5 text-gold-700" />,
      badge: 'Certified Mentors'
    },
    {
      title: "Separate Shafi'i & Hanafi Options",
      desc: "Learn according to your family’s traditional school of jurisprudence (Madhhab) without confusion or compromise.",
      icon: <Scale className="w-5 h-5 text-primary" />,
      badge: 'Traditional Madhhab'
    },
    {
      title: 'Flexible Class Timings',
      desc: 'Sessions coordinated around regular school hours, weekend family schedules, and after-school commitments.',
      icon: <CalendarClock className="w-5 h-5 text-gold-700" />,
      badge: 'Global Schedules'
    },
    {
      title: 'Global Online Accessibility',
      desc: 'Connect seamlessly from home anywhere in the world across the UK, USA, Gulf/Middle East, India, Canada, and Australia.',
      icon: <Globe className="w-5 h-5 text-primary" />,
      badge: 'Worldwide'
    },
    {
      title: 'Multilingual Instruction',
      desc: 'Instruction offered in English, Urdu, Kannada, Malayalam, and Tamil to match the language your child is most receptive to.',
      icon: <Languages className="w-5 h-5 text-gold-700" />,
      badge: '5 Languages'
    },
    {
      title: 'Practical Application-Based Islam',
      desc: 'Emphasis on real-life implementation: correct Wudu, mindful Salah, sunnah etiquettes, and righteous character (Adab).',
      icon: <Sparkles className="w-5 h-5 text-primary" />,
      badge: 'Living Islam'
    },
    {
      title: 'Continuous Parent Appraisals',
      desc: 'Periodic assessments, constructive feedback, and direct access to your child’s tutor for continuous alignment.',
      icon: <MessageSquare className="w-5 h-5 text-gold-700" />,
      badge: 'Monthly Reports'
    }
  ];

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-ivory bg-islamic-pattern relative border-b border-charcoal-border overflow-hidden">
      
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-gold/40 text-primary text-[10px] font-bold uppercase tracking-widest mb-3 shadow-xs"
          >
            <Award className="w-3.5 h-3.5 text-gold-700" />
            <span>Institutional Strengths</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-3 tracking-tight"
          >
            Why Choose Hikhma Islamic School?
          </motion.h2>

          <div className="w-16 h-1 bg-gradient-to-r from-gold to-primary mx-auto rounded-full mb-6"></div>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-charcoal-muted leading-relaxed font-normal"
          >
            We unite authentic traditional scholarship with modern educational quality, giving Muslim parents worldwide the confidence that their children are in trusted hands.
          </motion.p>
        </div>

        {/* 8 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-white border border-charcoal-border shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-gold/60 relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-ivory border border-gold/30 w-fit group-hover:scale-110 transition-transform duration-300 shadow-xs">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold text-gold-700 uppercase tracking-wider px-2 py-0.5 rounded bg-ivory border border-gold/25">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-serif font-bold text-primary mb-2 leading-snug group-hover:text-forest transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-charcoal-border/50 flex items-center gap-1.5 text-xs text-primary font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-600" />
                <span>NextGen Verified Standard</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
