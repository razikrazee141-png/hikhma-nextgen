import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Quote, 
  Star, 
  ShieldCheck, 
  Award, 
  MapPin, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Amina Al-Sayed',
      relation: 'Mother of Rayan (Age 8)',
      location: 'London, United Kingdom',
      program: 'Shafi’i Fiqh & Quranic Tajweed',
      rating: 5,
      review: 'Finding an online school that teaches authentic Shafi’i fiqh with proper pedagogical structure in the UK was nearly impossible until we discovered Hikhma. The 1-on-1 tutor has been remarkably patient and my son looks forward to his class every evening without fuss.',
      highlight: 'Dedicated Shafi’i curriculum and exceptional tutor patience'
    },
    {
      id: 2,
      name: 'Dr. Tariq Mahmood',
      relation: 'Father of Bilal (Age 12) & Sarah (Age 9)',
      location: 'Dallas, Texas, USA',
      program: 'Hanafi Fiqh & Arabic Recitation',
      rating: 5,
      review: 'NextGen Organisation’s oversight is evident in the quality of education. The scheduling coordinates seamlessly with American CST school hours, and the monthly progress appraisals keep us completely involved in our children’s spiritual development.',
      highlight: 'Seamless US time-zone coordination & detailed monthly reports'
    },
    {
      id: 3,
      name: 'Fatima Zahra',
      relation: 'Mother of Maryam (Age 6)',
      location: 'Dubai, United Arab Emirates',
      program: 'Noorani Qaida & Basic Akhlaq',
      rating: 5,
      review: 'Our daughter started from basic letter recognition and within 4 months is pronouncing complex Makharij correctly. The female mentor is nurturing, warm, and highly qualified. Truly grateful for this institution.',
      highlight: 'Warm 1-on-1 female mentor with rapid phonetics mastery'
    },
    {
      id: 4,
      name: 'Mohammed Zubair',
      relation: 'Father of Zayd (Age 14)',
      location: 'Bangalore, India',
      program: 'Aqeedah, Seerah & Islamic Manners',
      rating: 5,
      review: 'In today’s digital era, protecting our teenagers’ core values is our biggest priority. Hikhma provides reasoned, orthodox answers to their questions and instills profound love for Prophet Muhammad ﷺ and Islamic heritage.',
      highlight: 'Fortifying teenage faith with orthodox scholarship & critical clarity'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden border-b border-charcoal-border">
      {/* Subtle Ambient Orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ivory border border-gold/40 text-primary text-[10px] font-bold uppercase tracking-widest mb-3"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-gold-700" />
            <span>Parent &amp; Guardian Endorsements</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-3 tracking-tight"
          >
            Trusted by Muslim Families Worldwide
          </motion.h2>

          <div className="w-16 h-1 bg-gradient-to-r from-gold to-primary mx-auto rounded-full mb-6"></div>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-charcoal-muted leading-relaxed font-normal"
          >
            Hear from parents across the UK, North America, the GCC, and India about how our dedicated 1-on-1 mentors have touched their children's lives.
          </motion.p>
        </div>

        {/* 4 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-7 sm:p-8 rounded-3xl bg-ivory border border-gold/30 hover:border-gold shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* Gold Quote Watermark */}
              <Quote className="w-12 h-12 text-gold-300/30 absolute top-6 right-6 pointer-events-none group-hover:text-gold-400/40 transition-colors" />

              <div>
                {/* Rating & Verified Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-emerald-800 text-[10px] font-bold uppercase tracking-wider border border-emerald-800/20 shadow-xs">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified Enrollment</span>
                  </span>
                </div>

                {/* Highlight Quote */}
                <p className="text-xs font-bold text-gold-800 mb-2 uppercase tracking-wide">
                  "{item.highlight}"
                </p>

                {/* Main Review Body */}
                <p className="text-sm sm:text-base text-charcoal leading-relaxed font-normal italic mb-6">
                  "{item.review}"
                </p>
              </div>

              {/* Author & Context Strip */}
              <div className="pt-4 border-t border-gold/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-serif font-bold text-primary text-sm sm:text-base">
                    {item.name}
                  </h4>
                  <p className="text-charcoal-muted text-xs">
                    {item.relation}
                  </p>
                </div>

                <div className="text-left sm:text-right space-y-0.5">
                  <span className="inline-flex items-center gap-1 text-[11px] text-charcoal-light font-medium">
                    <MapPin className="w-3 h-3 text-gold-700" />
                    <span>{item.location}</span>
                  </span>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {item.program}
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Institutional Quality Guarantee Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 p-6 rounded-2xl bg-white border border-gold/40 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-ivory border border-gold/30 flex items-center justify-center text-primary shrink-0">
              <Award className="w-6 h-6 text-gold-700" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-primary text-base">
                100% Satisfaction &amp; Transparent Progress Guarantee
              </h4>
              <p className="text-xs text-charcoal-muted mt-0.5">
                Every child is assessed before placement. If the mentor-student chemistry isn't ideal, an alternative mentor is assigned promptly.
              </p>
            </div>
          </div>

          <a
            href="#enquiry"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-primary hover:bg-forest text-ivory text-xs font-bold uppercase tracking-wider transition-colors border border-gold/40 shadow-xs cursor-pointer"
          >
            Enrol Your Child
          </a>
        </motion.div>

      </div>
    </section>
  );
}
