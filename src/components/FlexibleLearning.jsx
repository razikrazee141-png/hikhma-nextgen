import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Clock4, CalendarCheck, Home, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function FlexibleLearning() {
  const worldZones = [
    { city: 'London', timeZone: 'GMT / BST', region: 'United Kingdom & Europe' },
    { city: 'New York / Chicago', timeZone: 'EST / CST', region: 'North America' },
    { city: 'Dubai / Riyadh', timeZone: 'GST / AST', region: 'GCC & Middle East' },
    { city: 'Mumbai / Delhi', timeZone: 'IST', region: 'South Asia' },
    { city: 'Singapore / KL', timeZone: 'SGT / MYT', region: 'Southeast Asia' },
    { city: 'Sydney / Melbourne', timeZone: 'AEST', region: 'Australia' },
  ];

  const highlights = [
    {
      icon: <Globe2 className="w-5 h-5 text-primary" />,
      title: 'Global Time Zone Synchronisation',
      desc: 'Whether in North America, the UK, the GCC, India, or Asia-Pacific, our mentors adapt directly to your local time zone.'
    },
    {
      icon: <CalendarCheck className="w-5 h-5 text-gold-700" />,
      title: 'Harmonised with Regular School Hours',
      desc: 'Class slots are scheduled before school, after school, or during weekend mornings so children learn without fatigue.'
    },
    {
      icon: <Home className="w-5 h-5 text-primary" />,
      title: 'Comfort, Privacy and Safety of Home',
      desc: 'Save commute stress and ensure peace of mind. Parents can easily observe and support their child’s live lessons.'
    }
  ];

  return (
    <section className="py-20 lg:py-26 bg-ivory bg-islamic-pattern relative border-y border-charcoal-border overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Context & Narrative */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-5 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-gold/40 text-primary text-[10px] font-bold uppercase tracking-widest shadow-xs">
              <Clock4 className="w-3.5 h-3.5 text-gold-700" />
              <span>Worldwide Accessibility</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary leading-tight">
              Flexible Learning, Anywhere in the World
            </h2>
            
            <p className="text-base text-charcoal-muted leading-relaxed font-normal">
              Every child has a unique educational rhythm. Class schedules are fully customised according to the student’s secular school timetable, family availability, and local time zone.
            </p>

            <div className="pt-2">
              <a
                href="#enquiry"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-forest text-ivory text-xs font-bold uppercase tracking-wider transition-colors border border-gold/40 shadow-xs cursor-pointer group"
              >
                <span>Discuss Tailored Timings</span>
                <ArrowRight className="w-4 h-4 text-gold-300 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: 3 Structured Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-white border border-charcoal-border hover:border-gold/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 rounded-xl bg-ivory border border-gold/30 w-fit mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-primary mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Global Active Time Zones Ticker Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 rounded-3xl bg-white border-2 border-gold/40 shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-gold/20">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-serif font-bold text-sm sm:text-base text-primary">
                Active International Student Cohorts Coordinated Daily
              </span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gold-700">
              Synchronised Across 6 Major Global Hubs
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {worldZones.map((zone) => (
              <div 
                key={zone.city}
                className="p-3 rounded-xl bg-ivory border border-charcoal-border/70 text-center"
              >
                <div className="text-xs font-bold text-primary truncate">
                  {zone.city}
                </div>
                <div className="text-[10px] font-semibold text-gold-700">
                  {zone.timeZone}
                </div>
                <div className="text-[9px] text-charcoal-light truncate mt-0.5">
                  {zone.region}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
