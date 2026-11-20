import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Award, Landmark } from 'lucide-react';

export default function VisionStatement() {
  return (
    <section className="py-24 lg:py-32 bg-emerald-pattern text-white relative overflow-hidden">
      
      {/* Decorative Gold Radial Vignette with Subtle Breathing Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/10 rounded-full blur-3xl animate-pulse-subtle"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Institutional Pill */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest/80 border border-gold/40 text-gold-300 text-xs font-bold tracking-widest uppercase mb-8 shadow-sm backdrop-blur-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>Our Sacred Mandate &amp; Institutional Vision</span>
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
        </motion.div>

        {/* Central Quotation Display */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative py-4 px-4 sm:px-10"
        >
          <div className="font-serif text-5xl sm:text-7xl text-gold/30 select-none mb-1 leading-none font-bold">“</div>
          
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-ivory leading-relaxed tracking-tight max-w-4xl mx-auto">
            To bridge authentic Islamic scholarship with modern educational convenience, delivering high-standard, individualized religious education that instills lifelong Islamic values in every home.
          </blockquote>

          <div className="font-serif text-5xl sm:text-7xl text-gold/30 select-none mt-2 leading-none font-bold">”</div>
        </motion.div>

        {/* Attribution Seal */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 pt-8 border-t border-emerald-800/80 max-w-md mx-auto flex flex-col items-center"
        >
          <div className="w-10 h-10 rounded-full bg-forest border border-gold/40 flex items-center justify-center mb-2 shadow-xs">
            <Landmark className="w-5 h-5 text-gold-400" />
          </div>
          <span className="text-sm font-serif font-bold text-gold-300 tracking-wider">
            HIKHMA ISLAMIC SCHOOL
          </span>
          <span className="text-xs text-emerald-200 tracking-widest uppercase font-semibold mt-1">
            Governed &amp; Operated by NextGen Organisation
          </span>
        </motion.div>

      </div>
    </section>
  );
}
