import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Curriculum from './components/Curriculum';
import Methodology from './components/Methodology';
import WhyChooseUs from './components/WhyChooseUs';
import LanguagesSupported from './components/Languages';
import FlexibleLearning from './components/FlexibleLearning';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import VisionStatement from './components/VisionStatement';
import AdmissionForm from './components/AdmissionForm';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import AdminPage from './pages/AdminPage';
import { syncPendingLocalEnquiries } from './lib/supabase';

// Public Institutional Website Component
function PublicWebsite() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory text-charcoal antialiased selection:bg-primary selection:text-ivory relative">
      {/* Global Scroll Progress Bar */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* About Section & Leadership Governance */}
        <About />

        {/* Academic Curriculum Section */}
        <Curriculum />

        {/* Learning Methodology & 4-Step Pathway */}
        <Methodology />

        {/* Why Choose Hikhma */}
        <WhyChooseUs />

        {/* Languages Supported */}
        <LanguagesSupported />

        {/* Flexible Learning Worldwide */}
        <FlexibleLearning />

        {/* Parent & Scholar Endorsements */}
        <div id="testimonials">
          <Testimonials />
        </div>

        {/* Frequently Asked Questions */}
        <FAQ />

        {/* Vision Statement */}
        <VisionStatement />

        {/* Admission Enquiry Form (Core Conversion) */}
        <AdmissionForm />
      </main>

      {/* Floating Action Pill & Back to Top */}
      <FloatingActions />

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    // Sync any pending enquiries from previous offline/disconnected submissions on this device
    syncPendingLocalEnquiries();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Restricted Admin Portal - Accessed solely by typing /admin in browser URL */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/*" element={<AdminPage />} />

        {/* Public Institutional Website */}
        <Route path="/" element={<PublicWebsite />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
