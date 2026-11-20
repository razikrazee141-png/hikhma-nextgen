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
  CheckCircle2
} from 'lucide-react';

export default function WhyChooseUs() {
  const points = [
    {
      title: 'Individual Attention for Every Student',
      desc: 'No shared classroom distractions. The entire session is tailored to your child’s unique questions, strengths, and spiritual growth.',
      icon: <UserCheck className="w-5 h-5 text-primary" />
    },
    {
      title: 'Dedicated Personal Tutors',
      desc: 'Qualified, vetted, and patient Islamic educators who form a consistent mentor relationship with your child over time.',
      icon: <GraduationCap className="w-5 h-5 text-gold-700" />
    },
    {
      title: "Separate Shafi'i & Hanafi Options",
      desc: "Learn according to your family’s traditional school of jurisprudence (Madhhab) without confusion or compromise.",
      icon: <Scale className="w-5 h-5 text-primary" />
    },
    {
      title: 'Flexible Class Timings',
      desc: 'Sessions coordinated around regular school hours, weekend family schedules, and after-school commitments.',
      icon: <CalendarClock className="w-5 h-5 text-gold-700" />
    },
    {
      title: 'Global Online Accessibility',
      desc: 'Connect seamlessly from home anywhere in the world across the UK, USA, Gulf/Middle East, India, Canada, and Australia.',
      icon: <Globe className="w-5 h-5 text-primary" />
    },
    {
      title: 'Multilingual Instruction',
      desc: 'Instruction offered in English, Urdu, Kannada, Malayalam, and Tamil to match the language your child is most receptive to.',
      icon: <Languages className="w-5 h-5 text-gold-700" />
    },
    {
      title: 'Practical Islamic Education',
      desc: 'Emphasis on real-life implementation: correct Wudu, mindful Salah, sunnah etiquettes, and righteous character (Adab).',
      icon: <Sparkles className="w-5 h-5 text-primary" />
    },
    {
      title: 'Parent Progress Communication',
      desc: 'Periodic assessments, constructive feedback, and direct access to your child’s tutor for continuous alignment.',
      icon: <MessageSquare className="w-5 h-5 text-gold-700" />
    }
  ];

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-ivory bg-islamic-pattern relative border-b border-charcoal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-gold/40 text-primary text-[10px] font-bold uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5 text-gold" />
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-3 tracking-tight">
            Why Choose Hikhma Islamic School?
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-gold to-primary mx-auto rounded-full mb-6"></div>
          <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed font-normal">
            We unite authentic traditional scholarship with modern educational quality, giving Muslim parents worldwide the confidence that their children are in trusted hands.
          </p>
        </div>

        {/* 8 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -3 }}
              className="p-6 rounded-2xl bg-white border border-charcoal-border shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:border-gold/50"
            >
              <div>
                <div className="p-3 rounded-xl bg-ivory border border-gold/30 w-fit mb-4 group-hover:scale-105 transition-transform duration-200">
                  {item.icon}
                </div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-primary mb-2 leading-snug group-hover:text-forest transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
