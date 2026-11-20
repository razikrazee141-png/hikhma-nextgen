import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Clock4, CalendarCheck, Home, ArrowRight } from 'lucide-react';

export default function FlexibleLearning() {
  const highlights = [
    {
      icon: <Globe2 className="w-5 h-5 text-primary" />,
      title: 'Global Time Zone Synchronisation',
      desc: 'Whether in North America, Europe, GCC, India, or Asia-Pacific, our mentors adapt to your local time zone.'
    },
    {
      icon: <CalendarCheck className="w-5 h-5 text-gold-700" />,
      title: 'Harmonised with Regular School Hours',
      desc: 'Class slots are scheduled around secular school hours and family weekends so children learn without fatigue.'
    },
    {
      icon: <Home className="w-5 h-5 text-primary" />,
      title: 'Comfort and Safety of Home',
      desc: 'Save travel time and ensure peace of mind. Parents can easily observe and support their child’s lessons.'
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-ivory bg-islamic-pattern relative border-y border-charcoal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Context & Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-5 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-gold/40 text-primary text-[10px] font-bold uppercase tracking-widest">
              <Clock4 className="w-3.5 h-3.5 text-gold" />
              <span>Worldwide Accessibility</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary leading-tight">
              Flexible Learning, Anywhere in the World
            </h2>
            
            <p className="text-base text-charcoal-muted leading-relaxed font-normal">
              Every child has a unique educational rhythm. Class schedules are fully customised according to the student’s school timetable, family availability, and local time zone.
            </p>

            <div className="pt-1">
              <a
                href="#enquiry"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-gold-700 transition-colors"
              >
                <span>Discuss tailored timings for your child</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: 3 Structured Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -3 }}
                className="p-6 rounded-2xl bg-white border border-charcoal-border shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 rounded-xl bg-ivory border border-gold/30 w-fit mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-bold text-primary mb-2 leading-snug">
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

      </div>
    </section>
  );
}
