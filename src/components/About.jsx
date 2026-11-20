import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Landmark, 
  Users, 
  Laptop, 
  Compass, 
  UserCheck, 
  Globe2, 
  ShieldCheck, 
  FileText,
  Award
} from 'lucide-react';
import Logo from './Logo';

export default function About() {
  const institutionalFacts = [
    {
      icon: <Building2 className="w-5 h-5 text-primary" />,
      label: 'Institution',
      value: 'Hikhma Islamic School',
      desc: 'Official Online Islamic Educational Institution'
    },
    {
      icon: <Landmark className="w-5 h-5 text-gold-700" />,
      label: 'Management',
      value: 'NextGen Organisation',
      desc: 'Institutional governance, administration & quality assurance'
    },
    {
      icon: <Users className="w-5 h-5 text-primary" />,
      label: 'Age Group',
      value: '5–18 Years',
      desc: 'Elementary to high-school young learners'
    },
    {
      icon: <Laptop className="w-5 h-5 text-gold-700" />,
      label: 'Learning Mode',
      value: 'Online / Remote',
      desc: 'Live interactive 1-on-1 classrooms with supervised screen sharing'
    },
    {
      icon: <Compass className="w-5 h-5 text-primary" />,
      label: 'Jurisprudence',
      value: "Shafi'i and Hanafi",
      desc: 'Structured curricula aligned strictly with traditional Madhhab texts'
    },
    {
      icon: <UserCheck className="w-5 h-5 text-gold-700" />,
      label: 'Teaching',
      value: 'Individual 1-on-1 Mentorship',
      desc: 'Dedicated private teacher per student with tailored pacing'
    },
    {
      icon: <Globe2 className="w-5 h-5 text-primary" />,
      label: 'Accessibility',
      value: 'Students Worldwide',
      desc: 'Active student cohorts coordinating across all global time zones'
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Two-Column Header with Architecture Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Image with Noorani Qaida Student */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border-2 border-gold/30 shadow-xl bg-ivory">
              <img
                src="/images/noorani-qaida-student.jpg"
                alt="Young student learning Noorani Qaida and Quranic Arabic at home with Hikhma Islamic School"
                loading="lazy"
                className="w-full h-[400px] object-cover object-center filter brightness-[0.98] hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay Badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/90 text-primary font-bold text-[10px] uppercase tracking-wider mb-2">
                    <Award className="w-3.5 h-3.5" />
                    <span>Nurturing From Age 5 to 18</span>
                  </div>
                  <h4 className="font-serif text-lg text-ivory font-bold">
                    Structured Noorani &amp; Quranic Foundations
                  </h4>
                </div>
              </div>
            </div>

            {/* Corner Decorative Accent */}
            <div className="hidden sm:block absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-gold rounded-tr-2xl pointer-events-none"></div>
          </motion.div>

          {/* Right Column: Institutional Statement */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ivory border border-gold/40 text-primary text-[10px] font-bold uppercase tracking-widest">
              <FileText className="w-3.5 h-3.5 text-gold" />
              <span>About Our School</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary tracking-tight">
              About Hikhma Islamic School
            </h2>
            
            <div className="w-16 h-1 bg-gradient-to-r from-gold to-primary rounded-full"></div>

            {/* Institutional Quote */}
            <div className="relative p-6 sm:p-7 rounded-2xl bg-ivory border border-gold/30 shadow-xs">
              <p className="text-base sm:text-lg text-charcoal leading-relaxed font-normal italic">
                "Hikhma Islamic School, managed and operated by NextGen Organisation, is an inclusive, globally accessible online Islamic educational institution dedicated to nurturing young minds aged 5 to 18 through structured, authentic, and practical Islamic learning."
              </p>
              
              <div className="mt-4 pt-4 border-t border-gold/20 flex items-center justify-between text-xs text-charcoal-muted">
                <span className="font-bold text-primary">Department of Islamic Education</span>
                <span className="text-gold-700 font-semibold">NextGen Organisation</span>
              </div>
            </div>

            <p className="text-sm text-charcoal-muted leading-relaxed">
              We bridge traditional orthodox scholarship with the modern convenience of home learning. Every student is paired with a dedicated tutor who understands their personal learning curve, character, and spiritual needs.
            </p>
          </motion.div>

        </div>

        {/* Structured Institutional Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {institutionalFacts.map((fact, index) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`p-5 rounded-2xl border transition-all duration-300 hover:shadow-md ${
                index === 0 
                  ? 'bg-ivory border-gold/40 sm:col-span-2 lg:col-span-1' 
                  : 'bg-white border-charcoal-border hover:border-gold/50'
              }`}
            >
              <div className="flex items-center gap-3 mb-2.5">
                <div className="p-2.5 rounded-xl bg-ivory-50 border border-gold/20 shadow-xs">
                  {fact.icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {fact.label}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-primary">
                    {fact.value}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-charcoal-muted leading-relaxed pl-12">
                {fact.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
