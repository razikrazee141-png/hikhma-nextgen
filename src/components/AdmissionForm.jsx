import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  AlertCircle, 
  Loader2, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  BookOpen, 
  Clock, 
  ShieldCheck, 
  Check, 
  RotateCcw, 
  FileCheck2, 
  Lock,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitAdmissionEnquiry, isSupabaseConfigured } from '../lib/supabase';
import Logo from './Logo';

const COURSES_OPTIONS = [
  'Quran / Nazira',
  'Tajweed',
  'Hifz Support',
  'Islamic Studies',
  'Fiqh',
  'Aqeedah',
  'Seerah',
  'Adab & Akhlaq'
];

const LANGUAGE_OPTIONS = [
  'English',
  'Urdu',
  'Kannada',
  'Malayalam',
  'Tamil',
  'Other / Regional'
];

const TIMING_OPTIONS = [
  'Morning (Before School)',
  'Afternoon',
  'Evening (After School)',
  'Night',
  'Weekend Intensive',
  'Flexible / Any Available Slot'
];

const COMMON_COUNTRIES = [
  'United Kingdom',
  'United States',
  'United Arab Emirates',
  'Saudi Arabia',
  'India',
  'Canada',
  'Australia',
  'Qatar',
  'Kuwait',
  'Oman',
  'Bahrain',
  'Singapore',
  'Malaysia',
  'South Africa',
  'Germany',
  'Other'
];

const INITIAL_FORM_STATE = {
  parentName: '',
  email: '',
  phone: '',
  country: 'United Kingdom',
  studentName: '',
  studentAge: '',
  preferredLanguage: 'English',
  fiqhPreference: 'Not Sure',
  interestedCourses: ['Quran / Nazira', 'Tajweed'],
  preferredTiming: 'Evening (After School)',
  additionalMessage: '',
  consent: false
};

export default function AdmissionForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const validate = () => {
    const errs = {};

    if (!formData.parentName || formData.parentName.trim().length < 2) {
      errs.parentName = 'Parent or Guardian full name is required (min 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    const phoneDigits = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone || phoneDigits.length < 6) {
      errs.phone = 'Valid WhatsApp or contact number is required (min 6 digits).';
    }

    if (!formData.country || formData.country.trim() === '') {
      errs.country = 'Please select your country of residence.';
    }

    if (!formData.studentName || formData.studentName.trim().length < 2) {
      errs.studentName = 'Student full name is required (min 2 characters).';
    }

    const ageNum = parseInt(formData.studentAge, 10);
    if (!formData.studentAge || isNaN(ageNum) || ageNum < 5 || ageNum > 18) {
      errs.studentAge = 'Student age must be between 5 and 18 years old.';
    }

    if (!formData.preferredLanguage) {
      errs.preferredLanguage = 'Please select a preferred language of instruction.';
    }

    if (!formData.fiqhPreference) {
      errs.fiqhPreference = 'Please select a jurisprudence preference.';
    }

    if (!formData.interestedCourses || formData.interestedCourses.length === 0) {
      errs.interestedCourses = 'Please select at least one course of interest.';
    }

    if (!formData.preferredTiming) {
      errs.preferredTiming = 'Please specify a preferred class timing.';
    }

    if (!formData.consent) {
      errs.consent = 'You must confirm consent to be contacted regarding this enquiry.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const toggleCourse = (course) => {
    setFormData(prev => {
      const exists = prev.interestedCourses.includes(course);
      const updated = exists
        ? prev.interestedCourses.filter(c => c !== course)
        : [...prev.interestedCourses, course];
      return { ...prev, interestedCourses: updated };
    });

    if (errors.interestedCourses) {
      setErrors(prev => ({ ...prev, interestedCourses: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validate()) {
      const firstErrorKey = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstErrorKey);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus(null);

    const result = await submitAdmissionEnquiry(formData);

    setIsSubmitting(false);

    if (result.success) {
      setSubmissionStatus('success');
      setSubmittedData({ ...formData });
      setFormData(INITIAL_FORM_STATE);
      setErrors({});

      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#C69B48', '#064E3B', '#FAF7EF', '#FFFFFF']
        });
      } catch (err) {
        // decorative
      }
    } else {
      setSubmissionStatus('error');
      setErrorMessage(result.error || 'Failed to submit admission enquiry. Please verify details and try again.');
    }
  };

  const handleReset = () => {
    setSubmissionStatus(null);
    setErrorMessage('');
    setSubmittedData(null);
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
  };

  return (
    <section id="enquiry" className="py-20 lg:py-28 bg-ivory relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-gold/40 text-primary text-[10px] font-bold uppercase tracking-widest mb-3">
            <FileCheck2 className="w-3.5 h-3.5 text-gold" />
            <span>Online Admissions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-3 tracking-tight">
            Admission Enquiry Form
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-gold to-primary mx-auto rounded-full mb-4"></div>
          <p className="text-base text-charcoal-muted max-w-xl mx-auto font-normal">
            Take the first step towards personalized, authentic Islamic education for your child. Complete this form to connect with our admissions office.
          </p>
        </div>

        {/* Success Confirmation State */}
        {submissionStatus === 'success' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-white border-2 border-primary/20 p-8 sm:p-12 shadow-2xl text-center"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-primary flex items-center justify-center mx-auto mb-4 border border-emerald-300">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700 block mb-1">
              Admission Enquiry Received
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-3">
              JazakAllahu Khairan!
            </h3>
            <p className="text-charcoal-muted max-w-lg mx-auto text-sm sm:text-base leading-relaxed mb-6">
              Thank you for trusting Hikhma Islamic School. Your admission enquiry has been successfully received by <strong>NextGen Organisation</strong>.
            </p>

            {submittedData && (
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-ivory border border-charcoal-border text-left text-xs sm:text-sm space-y-2.5 mb-6">
                <div className="flex justify-between border-b border-charcoal-border/60 pb-1.5 text-charcoal-muted">
                  <span>Student Name:</span>
                  <span className="font-bold text-charcoal">{submittedData.studentName} (Age: {submittedData.studentAge})</span>
                </div>
                <div className="flex justify-between border-b border-charcoal-border/60 pb-1.5 text-charcoal-muted">
                  <span>Parent / Guardian:</span>
                  <span className="font-bold text-charcoal">{submittedData.parentName}</span>
                </div>
                <div className="flex justify-between border-b border-charcoal-border/60 pb-1.5 text-charcoal-muted">
                  <span>Jurisprudence Stream:</span>
                  <span className="font-bold text-primary">{submittedData.fiqhPreference}</span>
                </div>
                <div className="flex justify-between border-b border-charcoal-border/60 pb-1.5 text-charcoal-muted">
                  <span>Selected Language:</span>
                  <span className="font-bold text-charcoal">{submittedData.preferredLanguage}</span>
                </div>
                <div className="flex justify-between text-charcoal-muted pt-1">
                  <span>Interested Courses:</span>
                  <span className="font-bold text-charcoal text-right">{submittedData.interestedCourses.join(', ')}</span>
                </div>
              </div>
            )}

            <div className="p-4 rounded-xl bg-primary/5 border border-primary/15 max-w-lg mx-auto text-xs text-primary mb-6">
              <strong>Next Steps:</strong> An academic admissions coordinator from <strong>NextGen Organisation</strong> will reach out via WhatsApp / Email within 24 hours to schedule an introductory evaluation.
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-primary hover:bg-forest text-ivory text-xs font-bold uppercase tracking-wider transition-colors shadow-sm border border-gold/40"
            >
              <RotateCcw className="w-4 h-4 text-gold" />
              <span>Submit Another Admission Enquiry</span>
            </button>
          </motion.div>
        )}

        {/* Premium Dark Emerald Panel Form Container */}
        {submissionStatus !== 'success' && (
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            noValidate
            className="rounded-3xl bg-forest-dark border-2 border-gold/40 p-6 sm:p-10 lg:p-12 shadow-2xl text-white relative overflow-hidden"
          >
            {/* Subtle Top Ambient Gold Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/30 via-gold to-gold/30"></div>

            {/* Top Identity Header inside Form */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-emerald-800/80 gap-4">
              <Logo variant="light" size="default" />
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-200">
                <Lock className="w-3.5 h-3.5 text-gold" />
                <span>Student Privacy &amp; Data Protection</span>
              </div>
            </div>

            {/* Error Message Alert */}
            {submissionStatus === 'error' && (
              <div className="mb-8 p-4 rounded-xl bg-red-900/60 border border-red-500 text-red-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <h4 className="font-bold text-white mb-0.5">Submission Error</h4>
                  <p className="text-xs text-red-200">{errorMessage}</p>
                </div>
              </div>
            )}

            <div className="space-y-10">
              
              {/* SECTION 1: PARENT INFORMATION */}
              <div>
                <div className="flex items-center gap-2.5 pb-3 mb-5 border-b border-emerald-800/80">
                  <span className="w-6 h-6 rounded-full bg-gold text-primary font-bold text-xs flex items-center justify-center">1</span>
                  <h3 className="text-base font-serif font-bold text-ivory">
                    Parent / Legal Guardian Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div id="parentName">
                    <label className="block text-[11px] font-bold text-gold-200 uppercase tracking-wider mb-2">
                      Parent / Guardian Full Name <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      placeholder="e.g. Abdullah Khan"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-xl border bg-emerald-950/70 text-sm text-white placeholder:text-emerald-400/50 transition-colors focus:ring-2 focus:ring-gold ${
                        errors.parentName ? 'border-red-400' : 'border-emerald-700/80 focus:border-gold'
                      }`}
                    />
                    {errors.parentName && (
                      <p className="mt-1 text-xs text-red-300 font-medium">{errors.parentName}</p>
                    )}
                  </div>

                  <div id="email">
                    <label className="block text-[11px] font-bold text-gold-200 uppercase tracking-wider mb-2">
                      Email Address <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="parent@example.com"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-xl border bg-emerald-950/70 text-sm text-white placeholder:text-emerald-400/50 transition-colors focus:ring-2 focus:ring-gold ${
                        errors.email ? 'border-red-400' : 'border-emerald-700/80 focus:border-gold'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-300 font-medium">{errors.email}</p>
                    )}
                  </div>

                  <div id="phone">
                    <label className="block text-[11px] font-bold text-gold-200 uppercase tracking-wider mb-2">
                      WhatsApp / Contact Number <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+44 7123 456789 or +91 98765 43210"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-xl border bg-emerald-950/70 text-sm text-white placeholder:text-emerald-400/50 transition-colors focus:ring-2 focus:ring-gold ${
                        errors.phone ? 'border-red-400' : 'border-emerald-700/80 focus:border-gold'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-300 font-medium">{errors.phone}</p>
                    )}
                  </div>

                  <div id="country">
                    <label className="block text-[11px] font-bold text-gold-200 uppercase tracking-wider mb-2">
                      Country of Residence <span className="text-gold-400">*</span>
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border border-emerald-700/80 bg-emerald-950/70 text-sm text-white focus:border-gold focus:ring-2 focus:ring-gold"
                    >
                      {COMMON_COUNTRIES.map(c => (
                        <option key={c} value={c} className="bg-emerald-950 text-white">{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: STUDENT INFORMATION */}
              <div>
                <div className="flex items-center gap-2.5 pb-3 mb-5 border-b border-emerald-800/80">
                  <span className="w-6 h-6 rounded-full bg-gold text-primary font-bold text-xs flex items-center justify-center">2</span>
                  <h3 className="text-base font-serif font-bold text-ivory">
                    Student Academic Profile
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div id="studentName">
                    <label className="block text-[11px] font-bold text-gold-200 uppercase tracking-wider mb-2">
                      Student Full Name <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="e.g. Maryam Khan"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-xl border bg-emerald-950/70 text-sm text-white placeholder:text-emerald-400/50 transition-colors focus:ring-2 focus:ring-gold ${
                        errors.studentName ? 'border-red-400' : 'border-emerald-700/80 focus:border-gold'
                      }`}
                    />
                    {errors.studentName && (
                      <p className="mt-1 text-xs text-red-300 font-medium">{errors.studentName}</p>
                    )}
                  </div>

                  <div id="studentAge">
                    <label className="block text-[11px] font-bold text-gold-200 uppercase tracking-wider mb-2">
                      Student Age (5–18 years) <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="number"
                      name="studentAge"
                      min="5"
                      max="18"
                      value={formData.studentAge}
                      onChange={handleChange}
                      placeholder="e.g. 9"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-xl border bg-emerald-950/70 text-sm text-white placeholder:text-emerald-400/50 transition-colors focus:ring-2 focus:ring-gold ${
                        errors.studentAge ? 'border-red-400' : 'border-emerald-700/80 focus:border-gold'
                      }`}
                    />
                    {errors.studentAge && (
                      <p className="mt-1 text-xs text-red-300 font-medium">{errors.studentAge}</p>
                    )}
                  </div>

                  <div id="preferredLanguage">
                    <label className="block text-[11px] font-bold text-gold-200 uppercase tracking-wider mb-2">
                      Preferred Language of Instruction <span className="text-gold-400">*</span>
                    </label>
                    <select
                      name="preferredLanguage"
                      value={formData.preferredLanguage}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border border-emerald-700/80 bg-emerald-950/70 text-sm text-white focus:border-gold focus:ring-2 focus:ring-gold"
                    >
                      {LANGUAGE_OPTIONS.map(lang => (
                        <option key={lang} value={lang} className="bg-emerald-950 text-white">{lang}</option>
                      ))}
                    </select>
                  </div>

                  <div id="fiqhPreference">
                    <label className="block text-[11px] font-bold text-gold-200 uppercase tracking-wider mb-2">
                      Jurisprudence Stream (Madhhab) <span className="text-gold-400">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Shafi'i", 'Hanafi', 'Not Sure'].map(fiqh => (
                        <button
                          key={fiqh}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, fiqhPreference: fiqh }));
                            if (errors.fiqhPreference) setErrors(prev => ({ ...prev, fiqhPreference: null }));
                          }}
                          className={`py-2.5 px-2 text-xs font-bold rounded-xl border text-center transition-all ${
                            formData.fiqhPreference === fiqh
                              ? 'bg-gold text-primary border-gold shadow-md'
                              : 'bg-emerald-950/70 text-emerald-200 border-emerald-700/80 hover:border-gold/50'
                          }`}
                        >
                          {fiqh}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Courses Multi-Select */}
                <div id="interestedCourses" className="mt-6">
                  <label className="block text-[11px] font-bold text-gold-200 uppercase tracking-wider mb-2.5">
                    Curriculum Streams of Interest (Multi-Select) <span className="text-gold-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {COURSES_OPTIONS.map(course => {
                      const isSelected = formData.interestedCourses.includes(course);
                      return (
                        <button
                          key={course}
                          type="button"
                          onClick={() => toggleCourse(course)}
                          className={`p-3 rounded-xl border text-xs font-semibold text-left flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-emerald-800 text-white border-gold shadow-sm'
                              : 'bg-emerald-950/70 text-emerald-200 border-emerald-700/80 hover:border-gold/40'
                          }`}
                        >
                          <span>{course}</span>
                          <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-gold border-gold text-primary' : 'border-emerald-600'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.interestedCourses && (
                    <p className="mt-1.5 text-xs text-red-300 font-medium">{errors.interestedCourses}</p>
                  )}
                </div>
              </div>

              {/* SECTION 3: LEARNING PREFERENCES */}
              <div>
                <div className="flex items-center gap-2.5 pb-3 mb-5 border-b border-emerald-800/80">
                  <span className="w-6 h-6 rounded-full bg-gold text-primary font-bold text-xs flex items-center justify-center">3</span>
                  <h3 className="text-base font-serif font-bold text-ivory">
                    Learning Preferences &amp; Schedule
                  </h3>
                </div>

                <div className="space-y-5">
                  <div id="preferredTiming">
                    <label className="block text-[11px] font-bold text-gold-200 uppercase tracking-wider mb-2">
                      Preferred Class Timing Window <span className="text-gold-400">*</span>
                    </label>
                    <select
                      name="preferredTiming"
                      value={formData.preferredTiming}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border border-emerald-700/80 bg-emerald-950/70 text-sm text-white focus:border-gold focus:ring-2 focus:ring-gold"
                    >
                      {TIMING_OPTIONS.map(t => (
                        <option key={t} value={t} className="bg-emerald-950 text-white">{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gold-200 uppercase tracking-wider mb-2">
                      Additional Message or Special Learning Requests <span className="text-emerald-400 text-normal">(Optional)</span>
                    </label>
                    <textarea
                      name="additionalMessage"
                      rows={3}
                      value={formData.additionalMessage}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder="State previous Quranic level, specific dialect/regional requests, or sibling coordination..."
                      className="w-full px-4 py-3 rounded-xl border border-emerald-700/80 bg-emerald-950/70 text-sm text-white placeholder:text-emerald-400/50 focus:border-gold focus:ring-2 focus:ring-gold"
                    ></textarea>
                  </div>

                  <div id="consent" className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="mt-1 w-4 h-4 rounded border-emerald-600 bg-emerald-950 text-gold focus:ring-gold"
                      />
                      <span className="text-xs text-emerald-100/90 leading-relaxed">
                        I confirm that I am the parent or legal guardian of the student, and I authorize <strong>Hikhma Islamic School / NextGen Organisation</strong> to contact me regarding admission, placement, and class scheduling via WhatsApp, phone, or email. <span className="text-gold-400">*</span>
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mt-1 text-xs text-red-300 font-medium pl-7">{errors.consent}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Prominent Golden Action Button */}
              <div className="pt-6 border-t border-emerald-800/80">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto sm:min-w-[320px] max-w-full flex items-center justify-center gap-3 px-6 sm:px-9 py-4 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm text-primary bg-gradient-to-r from-gold-400 via-gold to-gold-400 hover:from-gold hover:to-gold-600 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mx-auto border border-gold-300"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-primary" />
                      <span>Submit Admission Enquiry</span>
                    </>
                  )}
                </motion.button>
                <p className="text-center text-[11px] text-emerald-300/80 mt-3.5">
                  Direct admission enquiry • No registration fees required for submitting enquiry
                </p>
              </div>

            </div>
          </motion.form>
        )}

      </div>
    </section>
  );
}
