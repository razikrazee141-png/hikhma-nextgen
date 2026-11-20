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
  Award,
  GraduationCap,
  Languages,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Quote,
  Check
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
    <section id="about" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      
      {/* Decorative Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Two-Column Header with Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Image with Noorani Qaida Student */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border-2 border-gold/40 shadow-2xl bg-ivory p-2 group">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/images/noorani-qaida-student.jpg"
                  alt="Young student learning Noorani Qaida and Quranic Arabic at home with Hikhma Islamic School"
                  loading="lazy"
                  className="w-full h-[420px] object-cover object-center filter brightness-[0.98] group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay Badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold text-primary font-bold text-[10px] uppercase tracking-wider mb-2 shadow-sm">
                      <Award className="w-3.5 h-3.5" />
                      <span>Foundations from Age 5</span>
                    </div>
                    <h4 className="font-serif text-lg sm:text-xl text-ivory font-bold leading-tight">
                      Structured Noorani &amp; Quranic Foundations
                    </h4>
                    <p className="text-xs text-gold-200 mt-1">
                      Individualized pacing for young minds
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Corner Decorative Accent */}
            <div className="hidden sm:block absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-gold rounded-tr-2xl pointer-events-none"></div>
          </motion.div>

          {/* Right Column: Institutional Statement */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="lg:col-span-7 space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ivory border border-gold/40 text-primary text-[10px] font-bold uppercase tracking-widest shadow-xs">
              <FileText className="w-3.5 h-3.5 text-gold-700" />
              <span>About Our Institution</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary tracking-tight">
              About Hikhma Islamic School
            </h2>
            
            <div className="w-16 h-1 bg-gradient-to-r from-gold to-primary rounded-full"></div>

            {/* Institutional Quote */}
            <div className="relative p-6 sm:p-7 rounded-2xl bg-ivory border border-gold/40 shadow-xs">
              <Quote className="w-8 h-8 text-gold-400/40 absolute top-4 right-4 pointer-events-none" />
              <p className="text-base sm:text-lg text-charcoal leading-relaxed font-normal italic">
                "Hikhma Islamic School, managed and operated by NextGen Organisation, is an inclusive, globally accessible online Islamic educational institution dedicated to nurturing young minds aged 5 to 18 through structured, authentic, and practical Islamic learning."
              </p>
              
              <div className="mt-4 pt-4 border-t border-gold/25 flex items-center justify-between text-xs text-charcoal-muted">
                <span className="font-bold text-primary">Department of Islamic Education</span>
                <span className="text-gold-700 font-bold uppercase tracking-wider text-[11px]">NextGen Organisation</span>
              </div>
            </div>

            <p className="text-sm text-charcoal-muted leading-relaxed">
              We bridge traditional orthodox scholarship with the modern convenience of home learning. Every student is paired with a dedicated tutor who understands their personal learning curve, character, and spiritual needs.
            </p>

            {/* Core Values Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-ivory border border-charcoal-border text-xs font-semibold text-primary">
                <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                <span>Scholarly Fidelity</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-ivory border border-charcoal-border text-xs font-semibold text-primary">
                <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                <span>Individualized Pacing</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-ivory border border-charcoal-border text-xs font-semibold text-primary">
                <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                <span>Moral Character Focus</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Structured Institutional Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {institutionalFacts.map((fact, index) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              whileHover={{ y: -4 }}
              className={`p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                index === 0 
                  ? 'bg-ivory border-gold/50 sm:col-span-2 lg:col-span-1 shadow-xs' 
                  : 'bg-white border-charcoal-border hover:border-gold/60 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3 mb-2.5">
                <div className="p-2.5 rounded-xl bg-ivory-50 border border-gold/30 shadow-xs">
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

        {/* ========================================================================= */}
        {/* INSTITUTIONAL LEADERSHIP & GOVERNANCE: MANAGING DIRECTOR PROFILE */}
        {/* ========================================================================= */}
        <div id="leadership" className="mt-20 pt-16 border-t border-gold/30">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ivory border border-gold/40 text-primary text-[10px] font-bold uppercase tracking-widest mb-3"
            >
              <Landmark className="w-3.5 h-3.5 text-gold-700" />
              <span>Leadership &amp; Governance</span>
            </motion.div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-primary tracking-tight"
            >
              Office of the Managing Director
            </motion.h3>
            
            <div className="w-16 h-1 bg-gradient-to-r from-gold to-primary mx-auto rounded-full mt-3 mb-4"></div>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-charcoal-muted leading-relaxed"
            >
              Guiding Hikhma Islamic School with orthodox scholarly fidelity, modern educational governance, and dedicated moral mentorship.
            </motion.p>
          </div>

          {/* Profile Card Container */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="bg-gradient-to-br from-[#FAF7EF] via-white to-ivory-50 rounded-3xl border-2 border-gold/50 shadow-2xl overflow-hidden p-6 sm:p-10 lg:p-12 relative"
          >
            {/* Subtle Gold Ambient Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Portrait & Credentials Badge */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative group w-full max-w-xs sm:max-w-sm">
                  {/* Outer Accent Glow */}
                  <div className="absolute -inset-1.5 bg-gradient-to-tr from-gold-500 via-primary to-gold-400 rounded-3xl opacity-40 blur-sm group-hover:opacity-75 transition-opacity duration-500"></div>
                  
                  <div className="relative rounded-2xl overflow-hidden border-2 border-gold/70 shadow-2xl bg-forest">
                    <img
                      src="/images/sayyid-fazal-al-bukhari.jpg"
                      alt="Sayyid Fazal Al Bukhari Al Qadiri - Managing Director, NextGen Organisation"
                      className="w-full h-auto max-h-[460px] object-cover object-top filter brightness-[1.01] group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />

                    {/* Official Identity Overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#042821] via-primary/90 to-transparent p-4 sm:p-5 text-white">
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gold text-primary font-bold text-[9px] uppercase tracking-wider mb-1.5 shadow-sm">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Managing Director</span>
                      </div>
                      <h4 className="font-serif text-lg sm:text-xl font-bold text-ivory tracking-wide leading-tight">
                        Sayyid Fazal Al Bukhari Al Qadiri
                      </h4>
                      <p className="text-[11px] text-gold-300 font-medium mt-0.5">
                        MD NextGen Organisation
                      </p>
                    </div>
                  </div>
                </div>

                {/* Qualification Pills */}
                <div className="mt-5 flex flex-wrap justify-center gap-2 max-w-sm text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gold/40 text-primary font-bold text-xs shadow-xs">
                    <GraduationCap className="w-3.5 h-3.5 text-gold-700" />
                    <span>M.Com</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gold/40 text-primary font-bold text-xs shadow-xs">
                    <Languages className="w-3.5 h-3.5 text-gold-700" />
                    <span>Diploma in Arabic and Urdu</span>
                  </span>
                </div>
              </div>

              {/* Right Column: Leadership Bio & Vision */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Executive Title Block */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    <span className="px-3 py-1 rounded-lg bg-emerald-900/10 border border-emerald-900/20 text-primary font-bold text-xs uppercase tracking-wider">
                      Chief Administrator
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-gold/15 border border-gold/30 text-gold-800 font-bold text-xs uppercase tracking-wider">
                      NextGen Organisation
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary tracking-tight">
                    Sayyid Fazal Al Bukhari Al Qadiri
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gold-700 font-semibold tracking-wide mt-1.5">
                    <span>M.Com</span>
                    <span>•</span>
                    <span>Diploma in Arabic and Urdu</span>
                    <span>•</span>
                    <span className="text-primary font-bold">MD NextGen Organisation</span>
                  </div>
                </div>

                {/* Vision Quotation Box */}
                <div className="relative p-5 sm:p-6 rounded-2xl bg-white border border-gold/40 shadow-xs">
                  <Quote className="w-6 h-6 text-gold-400 mb-2 opacity-60" />
                  <p className="text-sm sm:text-base text-charcoal italic leading-relaxed font-normal">
                    "Our objective through NextGen Organisation and Hikhma Islamic School is to revive authentic, orthodox Islamic learning within modern households. By combining venerable scholarly traditions with high-standard remote educational technology, we provide every young Muslim child with dedicated 1-on-1 mentorship that nurtures both sound knowledge and upright character (Adab)."
                  </p>
                  <div className="mt-3 pt-3 border-t border-gold/25 flex items-center justify-between text-xs">
                    <span className="font-bold text-primary">Sayyid Fazal Al Bukhari Al Qadiri</span>
                    <span className="text-gold-700 font-semibold">MD NextGen Organisation</span>
                  </div>
                </div>

                {/* Bio Narrative */}
                <div className="space-y-3 text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                  <p>
                    <strong>Sayyid Fazal Al Bukhari Al Qadiri</strong> serves as the Managing Director of NextGen Organisation, providing executive vision, educational leadership, and administrative stewardship for Hikhma Islamic School. Blending advanced postgraduate commerce qualifications (<strong>M.Com</strong>) with formal classical linguistics credentials in <strong>Arabic and Urdu</strong>, he pairs institutional governance expertise with profound devotion to traditional Islamic scholarship.
                  </p>
                  <p>
                    Under his direction, NextGen Organisation ensures that young learners aged 5 to 18 receive an authentic grounding in Quran recitation, Tajweed, Islamic jurisprudence (in both Shafi'i and Hanafi traditions), and daily Islamic manners, supported by tailored one-on-one private tutors worldwide.
                  </p>
                </div>

                {/* 4 Pillars of Leadership Governance */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-white border border-gold/30 shadow-xs flex items-start gap-3 hover:border-gold transition-colors">
                    <div className="p-2 rounded-lg bg-ivory text-primary shrink-0 border border-gold/30">
                      <Compass className="w-4 h-4 text-gold-700" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-primary">Orthodox Authenticity</h5>
                      <p className="text-[11px] text-charcoal-muted leading-snug mt-0.5">
                        Traditional texts aligned strictly with Shafi'i and Hanafi Madhhab curricula.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-gold/30 shadow-xs flex items-start gap-3 hover:border-gold transition-colors">
                    <div className="p-2 rounded-lg bg-ivory text-primary shrink-0 border border-gold/30">
                      <GraduationCap className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-primary">1-on-1 Personal Mentorship</h5>
                      <p className="text-[11px] text-charcoal-muted leading-snug mt-0.5">
                        Dedicated teacher attention tailored to every student's individual pace.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-gold/30 shadow-xs flex items-start gap-3 hover:border-gold transition-colors">
                    <div className="p-2 rounded-lg bg-ivory text-primary shrink-0 border border-gold/30">
                      <Languages className="w-4 h-4 text-gold-700" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-primary">Arabic &amp; Multilingual Fluency</h5>
                      <p className="text-[11px] text-charcoal-muted leading-snug mt-0.5">
                        Instruction supported in English, Urdu, Malayalam, Kannada, and Tamil.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-gold/30 shadow-xs flex items-start gap-3 hover:border-gold transition-colors">
                    <div className="p-2 rounded-lg bg-ivory text-primary shrink-0 border border-gold/30">
                      <Award className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-primary">Character &amp; Adab Formation</h5>
                      <p className="text-[11px] text-charcoal-muted leading-snug mt-0.5">
                        Nurturing righteous manners, mindful Salah, and practical Islamic ethics.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
