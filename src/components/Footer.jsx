import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Compass, ShieldCheck, ArrowRight, Award, Landmark, HelpCircle, Star, Sparkles } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e, href) => {
    if (e && e.preventDefault) e.preventDefault();
    if (window.location.pathname !== '/') {
      window.location.href = '/' + href;
      return;
    }
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const headerEl = document.querySelector('header');
      const headerHeight = headerEl ? headerEl.offsetHeight : 75;
      const targetTop = targetElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, targetTop - headerHeight),
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer id="contact" className="bg-[#021B14] text-emerald-100 relative pt-16 pb-12 border-t-2 border-gold/50 overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-emerald-900/80">
          
          {/* Column 1: Brand & Institutional Overview (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <Logo variant="light" size="default" />
            
            <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed font-normal max-w-sm pt-2">
              Hikhma Islamic School, managed and operated by NextGen Organisation, is an inclusive, globally accessible online Islamic educational institution dedicated to nurturing young minds aged 5 to 18 through structured, authentic, and practical Islamic learning.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-900/60 border border-emerald-800 text-xs text-gold-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Managed and Operated by <strong className="text-white">NextGen Organisation</strong></span>
              </div>
            </div>
          </div>

          {/* Column 2: Academic Quick Links (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-serif font-bold text-white tracking-widest uppercase border-b border-emerald-900 pb-2">
              Academic Navigation
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About Our Institution', href: '#about' },
                { name: 'Office of the Managing Director', href: '#leadership' },
                { name: 'Academic Curriculum Tracks', href: '#curriculum' },
                { name: 'Learning Methodology', href: '#methodology' },
                { name: 'Why Choose Hikhma', href: '#why-us' },
                { name: 'Languages of Instruction', href: '#languages' },
                { name: 'Parent Endorsements', href: '#testimonials' },
                { name: 'Frequently Asked Questions', href: '#faq' },
                { name: 'Admission Enquiry', href: '#enquiry' },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className="hover:text-gold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="text-gold text-xs">›</span>
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Admissions Office & Governance (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-serif font-bold text-white tracking-widest uppercase border-b border-emerald-900 pb-2">
              Institutional Governance
            </h4>
            
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              Enquiries regarding individual placement, Shafi'i/Hanafi curricula, and schedule coordination are administered directly by NextGen admissions staff.
            </p>

            <div className="space-y-2.5 pt-1 text-xs text-emerald-200">
              <div className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-emerald-400 block text-[10px] uppercase font-bold tracking-wider">Institution</span>
                  <span className="text-white font-semibold">Hikhma Islamic School</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Award className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-emerald-400 block text-[10px] uppercase font-bold tracking-wider">Governing Body</span>
                  <span className="text-gold-300 font-semibold">NextGen Organisation</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Landmark className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-emerald-400 block text-[10px] uppercase font-bold tracking-wider">Managing Director</span>
                  <span className="text-white font-semibold">Sayyid Fazal Al Bukhari Al Qadiri</span>
                  <span className="text-[10px] text-emerald-300 block">M.Com, Diploma in Arabic and Urdu</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Compass className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-emerald-400 block text-[10px] uppercase font-bold tracking-wider">Jurisprudential Scope</span>
                  <span>Shafi'i &amp; Hanafi Dual Tracks</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#enquiry"
                onClick={(e) => handleScrollTo(e, '#enquiry')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-600 text-primary font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer border border-gold-300"
              >
                <span>Submit Admission Enquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-400/80 text-center sm:text-left">
          <div>
            <p>
              &copy; {currentYear} Hikhma Islamic School. Managed and Operated by <strong className="text-gold-300 font-semibold">NextGen Organisation</strong>.
            </p>
            <p className="text-[11px] text-emerald-400/60 mt-0.5">
              All rights reserved. Dedicated to nurturing authentic Islamic values in every household.
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Shafi'i &amp; Hanafi Streams</span>
            <span>•</span>
            <span>1-on-1 Mentorship</span>
            <span>•</span>
            <span>Ages 5–18</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
