import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Key, 
  LogIn, 
  LogOut, 
  Loader2, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Phone, 
  MessageSquare, 
  Calendar, 
  User, 
  BookOpen, 
  Compass, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ExternalLink, 
  ArrowLeft,
  X,
  Eye,
  Sparkles,
  Copy,
  Check,
  PlusCircle,
  AlertTriangle,
  Database
} from 'lucide-react';
import { 
  signInAdmin, 
  signOutAdmin, 
  getAdminSession, 
  fetchAdmissionEnquiries, 
  updateEnquiryStatus, 
  createSampleAdmissionEnquiry,
  syncPendingLocalEnquiries,
  supabase 
} from '../lib/supabase';
import Logo from '../components/Logo';

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard state
  const [enquiries, setEnquiries] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [fiqhFilter, setFiqhFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [supabaseCount, setSupabaseCount] = useState(0);
  const [localCount, setLocalCount] = useState(0);

  // 1. Check existing session on load
  useEffect(() => {
    async function checkAuth() {
      setLoadingSession(true);
      const activeSession = await getAdminSession();
      setSession(activeSession);
      setLoadingSession(false);

      if (activeSession) {
        loadEnquiries(false);
      }
    }
    checkAuth();

    // Listen to Supabase auth state changes
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
        setSession(currentSession);
        if (currentSession) {
          loadEnquiries(false);
        }
      });
      return () => subscription.unsubscribe();
    }
  }, []);

  // 2. Real-time updates & cross-device auto-refresh
  useEffect(() => {
    if (!session) return;

    // Supabase Real-time listener: instantly reflect submissions from other devices
    let channel = null;
    if (supabase) {
      channel = supabase
        .channel('admin-admission-enquiries-realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'admission_enquiries' },
          () => {
            loadEnquiries(true);
          }
        )
        .subscribe();
    }

    // Auto-refresh interval (every 15s) for mobile consistency & offline catchup
    const intervalId = setInterval(() => {
      loadEnquiries(true);
    }, 15000);

    // Refresh when admin switches back to this tab
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        loadEnquiries(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', handleVisibility);

    return () => {
      if (channel && supabase) {
        supabase.removeChannel(channel);
      }
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', handleVisibility);
    };
  }, [session]);

  // 3. Load admission enquiries
  const loadEnquiries = async (isSilent = false) => {
    if (!isSilent) setLoadingData(true);
    setDataError('');
    const res = await fetchAdmissionEnquiries();
    if (res.success) {
      setEnquiries(res.data);
      setSupabaseCount(res.supabaseCount || 0);
      setLocalCount(res.localCount || 0);
      if (res.supabaseError) {
        setDataError(res.supabaseError);
      }
    } else {
      setDataError(res.error || res.supabaseError || 'Failed to load admission enquiries from database.');
    }
    if (!isSilent) setLoadingData(false);
  };

  const handleAddSample = async () => {
    setLoadingData(true);
    await createSampleAdmissionEnquiry();
    await loadEnquiries(false);
  };

  // 3. Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (!email.trim() || !password) {
      setLoginError('Please enter both administrative email and password.');
      return;
    }

    setIsLoggingIn(true);
    const result = await signInAdmin(email, password);
    setIsLoggingIn(false);

    if (result.success) {
      setSession(result.session);
      loadEnquiries();
    } else {
      setLoginError(result.error || 'Invalid administrator login credentials.');
    }
  };

  // 4. Handle logout
  const handleLogout = async () => {
    await signOutAdmin();
    setSession(null);
    setEnquiries([]);
    setSelectedEnquiry(null);
  };

  // 5. Update Status
  const handleStatusChange = async (id, newStatus) => {
    setStatusUpdating(true);
    const res = await updateEnquiryStatus(id, newStatus);
    setStatusUpdating(false);

    if (res.success) {
      setEnquiries(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(prev => ({ ...prev, status: newStatus }));
      }
    } else {
      alert(`Could not update status: ${res.error}`);
    }
  };

  // 6. Export to CSV
  const handleExportCSV = () => {
    if (enquiries.length === 0) {
      alert('No enquiries available to export.');
      return;
    }

    const headers = [
      'Submission Date',
      'Status',
      'Student Name',
      'Student Age',
      'Parent Name',
      'Email',
      'Phone',
      'Country',
      'Fiqh Stream',
      'Language',
      'Preferred Timing',
      'Courses',
      'Additional Message'
    ];

    const rows = enquiries.map(e => [
      `"${new Date(e.created_at).toLocaleString()}"`,
      `"${e.status || 'new'}"`,
      `"${(e.student_name || '').replace(/"/g, '""')}"`,
      e.student_age || '',
      `"${(e.parent_name || '').replace(/"/g, '""')}"`,
      `"${(e.email || '').replace(/"/g, '""')}"`,
      `"${(e.phone || '').replace(/"/g, '""')}"`,
      `"${(e.country || '').replace(/"/g, '""')}"`,
      `"${(e.fiqh_preference || '').replace(/"/g, '""')}"`,
      `"${(e.preferred_language || '').replace(/"/g, '""')}"`,
      `"${(e.preferred_timing || '').replace(/"/g, '""')}"`,
      `"${(Array.isArray(e.interested_courses) ? e.interested_courses.join(', ') : '').replace(/"/g, '""')}"`,
      `"${(e.additional_message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `hikhma-admissions-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 7. Filtered enquiries
  const filteredEnquiries = enquiries.filter(item => {
    const matchesSearch = 
      (item.student_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.parent_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.phone || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.country || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesFiqh = fiqhFilter === 'all' || item.fiqh_preference === fiqhFilter;

    return matchesSearch && matchesStatus && matchesFiqh;
  });

  // KPI Calculations
  const totalCount = enquiries.length;
  const newCount = enquiries.filter(e => e.status === 'new').length;
  const contactedCount = enquiries.filter(e => e.status === 'contacted').length;
  const enrolledCount = enquiries.filter(e => e.status === 'enrolled').length;
  const shafiiCount = enquiries.filter(e => e.fiqh_preference === "Shafi'i").length;
  const hanafiCount = enquiries.filter(e => e.fiqh_preference === "Hanafi").length;

  if (loadingSession) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm font-semibold text-charcoal">Verifying Administrator Access...</p>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 1: ADMIN LOGIN SCREEN (When Not Authenticated)
  // =========================================================================
  if (!session) {
    return (
      <div className="min-h-screen bg-ivory bg-islamic-pattern flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="max-w-md mx-auto w-full flex items-center justify-between mb-8">
          <a href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-charcoal hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 text-gold" />
            <span>Return to Public Website</span>
          </a>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            NextGen Administration
          </span>
        </div>

        {/* Login Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto w-full rounded-3xl bg-forest-dark border-2 border-gold/40 p-8 sm:p-10 shadow-2xl text-white relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/30 via-gold to-gold/30"></div>

          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo variant="light" size="default" showSubtitle={false} />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary border border-gold/40 text-gold-300 text-[10px] font-bold uppercase tracking-widest mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span>Admissions Office</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-ivory">
              Administrator Access Portal
            </h1>
            <p className="text-xs text-emerald-200 mt-1">
              Restricted portal for authorized NextGen admissions staff.
            </p>
          </div>

          {/* Login Error Alert */}
          {loginError && (
            <div className="mb-6 p-4 rounded-xl bg-red-900/60 border border-red-500 text-red-100 flex items-start gap-2.5 text-xs">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold text-gold-200 uppercase tracking-wider mb-2">
                Administrator Username or Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter administrator username"
                  disabled={isLoggingIn}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-emerald-700/80 bg-emerald-950/70 text-sm text-white placeholder:text-emerald-400/50 focus:border-gold focus:ring-2 focus:ring-gold transition-colors"
                />
                <Mail className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gold-200 uppercase tracking-wider mb-2">
                Administrator Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  disabled={isLoggingIn}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-emerald-700/80 bg-emerald-950/70 text-sm text-white placeholder:text-emerald-400/50 focus:border-gold focus:ring-2 focus:ring-gold transition-colors"
                />
                <Key className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm text-primary bg-gradient-to-r from-gold-400 via-gold to-gold-400 hover:from-gold hover:to-gold-600 shadow-lg flex items-center justify-center gap-2 border border-gold-300 disabled:opacity-60 transition-all mt-6"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-primary" />
                  <span>Sign In To Admissions Portal</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Secure Notice */}
          <div className="mt-6 pt-5 border-t border-emerald-800/80 text-center">
            <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-300">
              <Lock className="w-3.5 h-3.5 text-gold" />
              <span>Authorized Administrative Personnel Only</span>
            </div>
          </div>

        </motion.div>

        {/* Bottom Security Footer */}
        <div className="text-center text-xs text-charcoal-muted mt-8">
          NextGen Organisation • Confidential Admissions Portal
        </div>

      </div>
    );
  }

  // =========================================================================
  // VIEW 2: FULL ADMISSIONS ADMINISTRATION DASHBOARD (When Authenticated)
  // =========================================================================
  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      
      {/* Top Admin Navigation Bar */}
      <header className="bg-primary text-white border-b-2 border-gold py-3.5 px-4 sm:px-6 lg:px-8 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <Logo variant="light" size="sm" showSubtitle={false} />
            <div className="border-l border-emerald-700 pl-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold block">
                Admissions Office
              </span>
              <h1 className="text-sm font-bold text-white">
                Enquiries &amp; Placement Management
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-xs">
            <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-forest border border-emerald-700 text-emerald-200 font-medium">
              <User className="w-3.5 h-3.5 text-gold" />
              <span>{session.user?.email || 'Administrator'}</span>
            </span>

            <button
              type="button"
              onClick={handleAddSample}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider text-[11px] transition-colors border border-emerald-600 shadow-xs"
              title="Add a sample enquiry to verify dashboard functionality"
            >
              <PlusCircle className="w-3.5 h-3.5 text-gold" />
              <span>Add Demo Enquiry</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold hover:bg-gold-600 text-primary font-bold uppercase tracking-wider text-[11px] transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-black text-ivory font-bold uppercase tracking-wider text-[11px] transition-colors border border-emerald-800"
            >
              <LogOut className="w-3.5 h-3.5 text-gold" />
              <span>Sign Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* KPI Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-charcoal-border shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Total Enquiries
            </span>
            <span className="text-2xl font-bold font-serif text-primary">{totalCount}</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-gold/40 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 block mb-1">
              New / Pending
            </span>
            <span className="text-2xl font-bold font-serif text-gold-700">{newCount}</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-charcoal-border shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Contacted
            </span>
            <span className="text-2xl font-bold font-serif text-blue-700">{contactedCount}</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-charcoal-border shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Enrolled
            </span>
            <span className="text-2xl font-bold font-serif text-emerald-700">{enrolledCount}</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-charcoal-border shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Shafi'i Stream
            </span>
            <span className="text-2xl font-bold font-serif text-primary">{shafiiCount}</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-charcoal-border shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Hanafi Stream
            </span>
            <span className="text-2xl font-bold font-serif text-forest">{hanafiCount}</span>
          </div>
        </div>

        {/* Controls: Search, Filters & Refresh */}
        <div className="p-5 rounded-2xl bg-white border border-charcoal-border shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search student, parent, email, phone, country..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-charcoal-border text-sm text-charcoal placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Status:</span>
              {['all', 'new', 'reviewed', 'contacted', 'enrolled'].map(st => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                    statusFilter === st 
                      ? 'bg-primary text-ivory' 
                      : 'bg-ivory text-charcoal hover:bg-slate-100 border border-charcoal-border'
                  }`}
                >
                  {st}
                </button>
              ))}

              <button
                type="button"
                onClick={loadEnquiries}
                disabled={loadingData}
                className="p-2 rounded-lg bg-ivory hover:bg-slate-100 text-charcoal border border-charcoal-border transition-colors ml-auto"
                title="Refresh Queries"
              >
                <RefreshCw className={`w-4 h-4 text-primary ${loadingData ? 'animate-spin' : ''}`} />
              </button>
            </div>

          </div>

          {/* Secondary Fiqh Filter */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs">
            <span className="font-bold text-slate-400 uppercase tracking-wider">Madhhab:</span>
            {['all', "Shafi'i", 'Hanafi', 'Not Sure'].map(f => (
              <button
                key={f}
                type="button"
                onClick={() => setFiqhFilter(f)}
                className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  fiqhFilter === f 
                    ? 'bg-gold text-primary' 
                    : 'text-charcoal-muted hover:text-primary'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Database Error Alert */}
        {dataError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-900 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Error querying admissions table:</p>
              <p>{dataError}</p>
            </div>
          </div>
        )}

        {/* Unsynced local records alert */}
        {localCount > 0 && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>{localCount} local record{localCount > 1 ? 's' : ''}</strong> on this device pending synchronization to Supabase cloud.
              </span>
            </div>
            <button
              type="button"
              onClick={() => loadEnquiries(false)}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs transition-colors shrink-0"
            >
              Sync to Cloud Now
            </button>
          </div>
        )}

        {/* Enquiries Table Card */}
        <div className="rounded-2xl bg-white border border-charcoal-border shadow-xs overflow-hidden">
          
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <h3 className="font-serif font-bold text-primary text-base">
                Admission Enquiries Log ({filteredEnquiries.length})
              </h3>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Cloud: {supabaseCount} {localCount > 0 ? `• Local Pending: ${localCount}` : '• Live Synchronized'}</span>
              </span>
            </div>
            <span className="text-xs text-charcoal-muted flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-primary" />
              <span>Real-time Multi-Device Sync</span>
            </span>
          </div>

          {loadingData ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-xs font-semibold">Retrieving admission queries from database...</p>
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="py-16 text-center text-slate-400 max-w-md mx-auto px-4">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="text-base font-bold text-charcoal">No admission enquiries found yet</h4>
              <p className="text-xs text-charcoal-muted mt-1 mb-5">
                New enquiries submitted from the public website will appear here in real-time. You can also generate a demo enquiry right now to preview the full admin experience.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleAddSample}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-forest text-ivory text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                >
                  <PlusCircle className="w-4 h-4 text-gold" />
                  <span>Generate Demo Enquiry</span>
                </button>
                <a
                  href="/#enquiry"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ivory hover:bg-slate-100 text-charcoal text-xs font-bold uppercase tracking-wider transition-colors border border-charcoal-border"
                >
                  <ExternalLink className="w-4 h-4 text-primary" />
                  <span>Open Public Form</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-ivory border-b border-charcoal-border text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Parent / Guardian</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Madhhab</th>
                    <th className="py-3 px-4">Courses</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEnquiries.map((enquiry) => (
                    <tr key={enquiry.id} className="hover:bg-ivory/50 transition-colors">
                      
                      {/* Student */}
                      <td className="py-3.5 px-4 font-semibold text-charcoal">
                        <div className="font-bold text-primary">{enquiry.student_name}</div>
                        <div className="text-[11px] text-slate-500">Age: {enquiry.student_age} • {enquiry.preferred_language}</div>
                      </td>

                      {/* Parent */}
                      <td className="py-3.5 px-4 text-charcoal">
                        <div className="font-semibold">{enquiry.parent_name}</div>
                        <div className="text-[11px] text-slate-500">{enquiry.country}</div>
                      </td>

                      {/* Contact */}
                      <td className="py-3.5 px-4 text-charcoal font-mono text-[11px]">
                        <div>{enquiry.phone}</div>
                        <div className="text-slate-500">{enquiry.email}</div>
                      </td>

                      {/* Madhhab */}
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase tracking-wider ${
                          enquiry.fiqh_preference === "Shafi'i" 
                            ? 'bg-emerald-100 text-primary' 
                            : enquiry.fiqh_preference === "Hanafi" 
                            ? 'bg-amber-100 text-amber-900' 
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {enquiry.fiqh_preference}
                        </span>
                      </td>

                      {/* Courses */}
                      <td className="py-3.5 px-4 max-w-xs truncate text-charcoal-muted">
                        {Array.isArray(enquiry.interested_courses) ? enquiry.interested_courses.join(', ') : 'None'}
                      </td>

                      {/* Status Selector */}
                      <td className="py-3.5 px-4">
                        <select
                          value={enquiry.status || 'new'}
                          onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                          disabled={statusUpdating}
                          className={`text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${
                            enquiry.status === 'enrolled' 
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                              : enquiry.status === 'contacted' 
                              ? 'bg-blue-50 text-blue-800 border-blue-300' 
                              : enquiry.status === 'reviewed' 
                              ? 'bg-purple-50 text-purple-800 border-purple-300' 
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="contacted">Contacted</option>
                          <option value="enrolled">Enrolled</option>
                          <option value="archived">Archived</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right space-x-1">
                        <button
                          type="button"
                          onClick={() => setSelectedEnquiry(enquiry)}
                          className="px-2.5 py-1 rounded bg-ivory hover:bg-slate-200 text-primary font-bold text-[11px] transition-colors"
                        >
                          Details
                        </button>

                        <a
                          href={`https://wa.me/${(enquiry.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Assalamu Alaikum ${enquiry.parent_name}, this is the Admissions Office of Hikhma Islamic School regarding your enquiry for ${enquiry.student_name}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] transition-colors"
                          title="Open WhatsApp Message"
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          <span>WhatsApp</span>
                        </a>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </main>

      {/* =========================================================================
          FULL ENQUIRY DETAILS MODAL DRAWER
          ========================================================================= */}
      <AnimatePresence>
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl rounded-3xl bg-white border-2 border-gold/40 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 bg-primary text-white flex items-center justify-between border-b-2 border-gold">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold block">
                    Admission Enquiry • ID: {selectedEnquiry.id?.slice(0, 8)}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-ivory">
                    {selectedEnquiry.student_name} (Age {selectedEnquiry.student_age})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="p-2 rounded-full hover:bg-forest text-ivory transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 text-xs text-charcoal">
                
                {/* Section 1: Parent & Contact */}
                <div>
                  <h4 className="font-serif font-bold text-primary text-sm mb-3 pb-1 border-b border-slate-200">
                    Parent / Guardian Contact
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Parent Name:</span>
                      <span className="font-bold text-sm text-charcoal">{selectedEnquiry.parent_name}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Country:</span>
                      <span className="font-bold text-sm text-charcoal">{selectedEnquiry.country}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Email Address:</span>
                      <a href={`mailto:${selectedEnquiry.email}`} className="font-bold text-primary hover:underline">{selectedEnquiry.email}</a>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">WhatsApp / Phone:</span>
                      <span className="font-mono font-bold text-charcoal">{selectedEnquiry.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Section 2: Academic Details */}
                <div>
                  <h4 className="font-serif font-bold text-primary text-sm mb-3 pb-1 border-b border-slate-200">
                    Academic Preferences
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Jurisprudence Stream:</span>
                      <span className="font-bold text-primary text-sm">{selectedEnquiry.fiqh_preference}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Instruction Language:</span>
                      <span className="font-bold text-charcoal text-sm">{selectedEnquiry.preferred_language}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Interested Courses:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {Array.isArray(selectedEnquiry.interested_courses) && selectedEnquiry.interested_courses.map(c => (
                          <span key={c} className="px-2.5 py-1 rounded-md bg-ivory border border-gold/40 text-primary font-bold text-[11px]">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Preferred Class Timing:</span>
                      <span className="font-medium text-charcoal">{selectedEnquiry.preferred_timing}</span>
                    </div>
                  </div>
                </div>

                {/* Section 3: Notes & Message */}
                {selectedEnquiry.additional_message && (
                  <div>
                    <h4 className="font-serif font-bold text-primary text-sm mb-2 pb-1 border-b border-slate-200">
                      Parent Notes &amp; Special Considerations
                    </h4>
                    <p className="p-3 rounded-xl bg-ivory border border-charcoal-border leading-relaxed text-charcoal-muted">
                      "{selectedEnquiry.additional_message}"
                    </p>
                  </div>
                )}

                {/* Submission Meta */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Logged to Supabase: {new Date(selectedEnquiry.created_at).toLocaleString()}</span>
                  <span>Consent Verified: Yes</span>
                </div>

              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 bg-ivory border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Update Status:</span>
                  <select
                    value={selectedEnquiry.status || 'new'}
                    onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value)}
                    className="px-2.5 py-1 rounded-lg border border-slate-300 font-bold text-xs"
                  >
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="contacted">Contacted</option>
                    <option value="enrolled">Enrolled</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${(selectedEnquiry.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Assalamu Alaikum ${selectedEnquiry.parent_name}, this is the Admissions Office of Hikhma Islamic School (NextGen Organisation) regarding your enquiry for ${selectedEnquiry.student_name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Message WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:${selectedEnquiry.email}?subject=Hikhma Islamic School - Admission Enquiry for ${encodeURIComponent(selectedEnquiry.student_name)}`}
                    className="px-4 py-2 rounded-lg bg-primary hover:bg-forest text-ivory font-bold text-xs flex items-center gap-1.5 shadow-xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Parent</span>
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
