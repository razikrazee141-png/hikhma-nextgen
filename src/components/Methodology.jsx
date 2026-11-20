import React from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  CheckSquare2, 
  UserCheck2, 
  Languages, 
  MessageCircle, 
  Mic, 
  TrendingUp, 
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ClipboardCheck,
  UserCheck,
  MonitorCheck,
  FileBadge
} from 'lucide-react';

export default function Methodology() {
  const steps = [
    {
      num: '01',
      title: 'Diagnostic Assessment',
      icon: <ClipboardCheck className="w-5 h-5 text-gold-700" />,
      desc: 'Complimentary evaluation of current Quranic recitation level, Makharij proficiency, and family Madhhab preference.'
    },
    {
      num: '02',
      title: 'Dedicated Mentor Matching',
      icon: <UserCheck className="w-5 h-5 text-primary" />,
      desc: 'Pairing with a vetted, experienced teacher matching student gender preference, language comfort, and learning pace.'
    },
    {
      num: '03',
      title: 'Interactive 1-on-1 Classes',
      icon: <MonitorCheck className="w-5 h-5 text-gold-700" />,
      desc: 'Private digital classrooms with screen sharing, live audio correction, and 100% undivided tutor focus.'
    },
    {
      num: '04',
      title: 'Monthly Progress Reports',
      icon: <FileBadge className="w-5 h-5 text-primary" />,
      desc: 'Structured parent appraisals detailing memorisation milestones, Tajweed retention, and character progression.'
    }
  ];

  const pillars = [
    {
      num: '01',
      title: 'Structured Syllabus & Authentic Guidance',
      icon: <Layers className="w-5 h-5 text-primary" />,
      desc: 'Grounding in orthodox Sunni scholarship with clear pedagogical milestones from beginner phonetics to nuanced jurisprudence.'
    },
    {
      num: '02',
      title: 'Practical, Application-Based Learning',
      icon: <CheckSquare2 className="w-5 h-5 text-gold-700" />,
      desc: 'Active practice of real-world Wudu, Salah movements, daily prophetic etiquettes, and moral reflections in everyday life.'
    },
    {
      num: '03',
      title: 'Dedicated 1-on-1 Personal Mentorship',
      icon: <UserCheck2 className="w-5 h-5 text-primary" />,
      desc: 'Private digital classrooms with 100% undivided tutor focus, ensuring psychological safety and high academic retention.'
    },
    {
      num: '04',
      title: 'Multilingual Learning Environment',
      icon: <Languages className="w-5 h-5 text-gold-700" />,
      desc: 'Explanations delivered in the child’s native comfort language (English, Urdu, Kannada, Malayalam, Tamil) for deep comprehension.'
    }
  ];

  const studentBenefits = [
    {
      title: 'Individual Attention',
      desc: 'Full session duration dedicated exclusively to your child without peer distractions.',
      icon: <UserCheck2 className="w-5 h-5 text-gold-300" />
    },
    {
      title: 'Personalised Learning Pace',
      desc: 'Adapted to your child’s retention curve—no rushing ahead, no holding back.',
      icon: <TrendingUp className="w-5 h-5 text-gold-300" />
    },
    {
      title: 'Precision Pronunciation Guidance',
      desc: 'Live real-time vocal adjustment ensuring correct Arabic Makharij and Tajweed.',
      icon: <Mic className="w-5 h-5 text-gold-300" />
    },
    {
      title: 'Transparent Parent Feedback',
      desc: 'Monthly assessment metrics and direct tutor communication for peace of mind.',
      icon: <MessageCircle className="w-5 h-5 text-gold-300" />
    }
  ];

  return (
    <section id="methodology" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ivory border border-gold/40 text-primary text-[10px] font-bold uppercase tracking-widest mb-3 shadow-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-gold-700" />
            <span>Pedagogical Excellence</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-3 tracking-tight"
          >
            Our Learning Methodology
          </motion.h2>

          <div className="w-16 h-1 bg-gradient-to-r from-gold to-primary mx-auto rounded-full mb-6"></div>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-charcoal-muted leading-relaxed font-normal"
          >
            A structured, 1-on-1 pedagogical approach crafted to build enduring Islamic character, deep spiritual understanding, and genuine love for learning.
          </motion.p>
        </div>

        {/* =========================================================================
            THE 4-STEP HIKHMA LEARNING PATHWAY
            ========================================================================= */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
              The Student Journey
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-primary mt-1">
              How Your Child Begins &amp; Excels
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, idx) => (
              <motion.div
                key={st.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="relative p-6 rounded-2xl bg-ivory border border-gold/40 hover:border-gold shadow-xs hover:shadow-lg transition-all duration-300 group"
              >
                {/* Step badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gold/40 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    {st.icon}
                  </div>
                  <span className="font-mono text-sm font-extrabold text-gold-700 bg-white px-2.5 py-0.5 rounded-full border border-gold/30">
                    STEP {st.num}
                  </span>
                </div>

                <h4 className="font-serif text-base font-bold text-primary mb-2">
                  {st.title}
                </h4>

                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {st.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Split Section: Mentorship Photo & Structured Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left: 4 Pillars Timeline Layout */}
          <div className="lg:col-span-7 space-y-4">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-ivory border border-charcoal-border hover:border-gold/60 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-gold/40 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  {pillar.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-gold-700">{pillar.num}.</span>
                    <h3 className="text-base font-serif font-bold text-primary">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Authentic Photograph of Online Mentorship */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border-2 border-gold/40 shadow-2xl bg-slate-900 group">
              <img
                src="/images/online-learning.jpg"
                alt="Muslim student learning Quran online with dedicated 1-on-1 mentorship"
                loading="lazy"
                className="w-full h-[420px] object-cover object-center filter brightness-[0.98] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-transparent to-transparent flex items-end p-6 text-white">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold text-primary font-bold text-[10px] uppercase tracking-wider mb-2 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Individualised Pacing</span>
                  </span>
                  <h4 className="font-serif text-lg text-ivory font-bold">
                    Supervised, Live 1-on-1 Mentorship
                  </h4>
                  <p className="text-xs text-emerald-200 mt-1">
                    Every lesson is customized to the student's unique learning curve.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* The 4 Student & Parent Assurance Factors Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-emerald-pattern text-white shadow-xl border border-gold/50 relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="text-[10px] uppercase tracking-widest text-gold-300 font-bold mb-1.5 block">
              Our Educational Commitment
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              How Every Child Flourishes at Hikhma
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {studentBenefits.map((benefit, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#08382D]/80 border border-emerald-700/60 backdrop-blur-sm hover:border-gold/50 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center mb-3 text-gold-300 border border-gold/30">
                  {benefit.icon}
                </div>
                <h4 className="text-sm font-bold text-gold-200 mb-1.5">
                  {benefit.title}
                </h4>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
