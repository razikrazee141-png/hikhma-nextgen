import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Curriculum from './components/Curriculum';
import Methodology from './components/Methodology';
import WhyChooseUs from './components/WhyChooseUs';
import LanguagesSupported from './components/Languages';
import FlexibleLearning from './components/FlexibleLearning';
import VisionStatement from './components/VisionStatement';
import AdmissionForm from './components/AdmissionForm';
import Footer from './components/Footer';
import AdminPage from './pages/AdminPage';

// Public Institutional Website Component
function PublicWebsite() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory text-charcoal antialiased selection:bg-primary selection:text-ivory">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Curriculum Section */}
        <Curriculum />

        {/* Learning Methodology */}
        <Methodology />

        {/* Why Choose Hikhma? */}
        <WhyChooseUs />

        {/* Languages Supported */}
        <LanguagesSupported />

        {/* Flexible Learning */}
        <FlexibleLearning />

        {/* Vision Statement */}
        <VisionStatement />

        {/* Admission Enquiry Form (Core Conversion) */}
        <AdmissionForm />
      </main>

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
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
