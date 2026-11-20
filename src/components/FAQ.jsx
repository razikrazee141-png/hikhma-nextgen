import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  ChevronDown, 
  BookOpen, 
  Clock, 
  Users, 
  ShieldCheck, 
  Sparkles,
  ArrowRight 
} from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'How do the 1-on-1 online classes work?',
      category: 'Classroom Format',
      answer: 'Each student receives a private, supervised digital classroom session with their dedicated mentor. The tutor utilizes digital interactive Quran and Tajweed interfaces, high-definition audio for precise Makharij articulation, and structured whiteboards. Parents are encouraged to observe sessions from the comfort of their home.'
    },
    {
      question: 'Can we specifically choose between the Shafi’i and Hanafi Madhhab?',
      category: 'Jurisprudence',
      answer: 'Yes, absolutely. Hikhma Islamic School offers dedicated learning streams for both the Shafi’i and Hanafi schools of jurisprudence. Our mentors are qualified in their respective Madhhabs and teach directly from authentic classical texts without blending rulings or causing confusion.'
    },
    {
      question: 'Are female mentors available for young girls?',
      category: 'Mentorship',
      answer: 'Yes. We respect our families’ preferences and have vetted, highly accomplished female Islamic scholars and Ustadhahs available for girls and younger children, ensuring a comfortable, nurturing environment.'
    },
    {
      question: 'How are class timings scheduled across international time zones?',
      category: 'Scheduling',
      answer: 'Our admissions office coordinates with tutors across multiple global time zones (UK, US EST/CST/PST, Gulf/GCC, South Asia, and Australia). We schedule sessions before school, after school, or on weekends according to your family’s routine.'
    },
    {
      question: 'What age group is accepted for admission?',
      category: 'Admissions',
      answer: 'We admit students aged 5 to 18 years old. Young learners begin with foundational phonetics (Noorani / Baghdadi Qaida), while older children and teenagers delve into advanced Tajweed, Fiqh, Aqeedah, and character ethics.'
    },
    {
      question: 'How do parents receive feedback on student progress?',
      category: 'Parent Engagement',
      answer: 'NextGen Organisation enforces rigorous educational standards. Parents receive monthly progress appraisals detailing memorization milestones, Tajweed retention, Fiqh application, and direct tutor notes.'
    },
    {
      question: 'What technical setup is required at home?',
      category: 'Technical',
      answer: 'All you need is a laptop, desktop, tablet, or smartphone with a reliable internet connection, working microphone, and webcam. We guide you through the initial 2-minute connection during your complimentary orientation.'
    }
  ];

  return (
    <section id="faq" className="py-20 lg:py-28 bg-ivory bg-islamic-pattern relative border-b border-charcoal-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-gold/40 text-primary text-[10px] font-bold uppercase tracking-widest mb-3 shadow-xs"
          >
            <HelpCircle className="w-3.5 h-3.5 text-gold-700" />
            <span>Frequently Asked Questions</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-3 tracking-tight"
          >
            Official Institutional FAQs
          </motion.h2>

          <div className="w-16 h-1 bg-gradient-to-r from-gold to-primary mx-auto rounded-full mb-6"></div>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-charcoal-muted leading-relaxed"
          >
            Everything you need to know about our curricula, mentors, admission criteria, and global class scheduling.
          </motion.p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'bg-white border-gold shadow-md' 
                    : 'bg-white/80 hover:bg-white border-charcoal-border hover:border-gold/50 shadow-xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gold-700 uppercase tracking-wider shrink-0 hidden sm:inline-block px-2 py-0.5 rounded bg-ivory border border-gold/30">
                      {faq.category}
                    </span>
                    <h3 className={`font-serif text-sm sm:text-base font-bold transition-colors ${
                      isOpen ? 'text-primary' : 'text-charcoal'
                    }`}>
                      {faq.question}
                    </h3>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-primary text-gold rotate-180' : 'bg-ivory text-charcoal-muted'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-charcoal-muted leading-relaxed border-t border-gold/15">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center p-6 rounded-2xl bg-white border border-gold/30 shadow-xs"
        >
          <h4 className="font-serif font-bold text-primary text-base mb-1">
            Have a specific requirement or question?
          </h4>
          <p className="text-xs text-charcoal-muted max-w-md mx-auto mb-4">
            Our academic counselors are available to review your child’s needs and discuss tailored learning options.
          </p>
          <a
            href="#enquiry"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-forest text-ivory text-xs font-bold uppercase tracking-wider transition-colors border border-gold/40 shadow-xs cursor-pointer"
          >
            <span>Speak with Admissions Office</span>
            <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
