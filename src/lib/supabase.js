import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const cleanUrl = rawUrl.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = Boolean(
  cleanUrl &&
  supabaseAnonKey &&
  cleanUrl.trim() !== '' &&
  supabaseAnonKey.trim() !== '' &&
  !cleanUrl.includes('your-project-id')
);

export const supabase = isSupabaseConfigured
  ? createClient(cleanUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

// Built-in Administrator Credentials configured for this deployment
const MASTER_ADMIN_USERNAME = (import.meta.env.VITE_ADMIN_USERNAME || 'Hikhma@admin').trim().toLowerCase();
const MASTER_ADMIN_PASSWORD = (import.meta.env.VITE_ADMIN_PASSWORD || 'Hikhma@NextGen05').trim();

/**
 * Submit an admission enquiry to the Supabase database.
 * Also persists locally to ensure immediate visibility in Admin Panel.
 * Returns { success: boolean, data?: any, error?: string }
 */
export async function submitAdmissionEnquiry(payload) {
  const newId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'enq_' + Date.now();
  
  const record = {
    id: newId,
    parent_name: payload.parentName.trim(),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone.trim(),
    country: payload.country.trim(),
    student_name: payload.studentName.trim(),
    student_age: parseInt(payload.studentAge, 10),
    preferred_language: payload.preferredLanguage,
    fiqh_preference: payload.fiqhPreference,
    interested_courses: payload.interestedCourses,
    preferred_timing: payload.preferredTiming,
    additional_message: payload.additionalMessage ? payload.additionalMessage.trim() : null,
    consent: payload.consent,
    status: 'new',
    created_at: new Date().toISOString()
  };

  // 1. Immediately cache in localStorage for instant admin dashboard reflection
  try {
    const existing = JSON.parse(localStorage.getItem('hikhma_admissions_local') || '[]');
    localStorage.setItem('hikhma_admissions_local', JSON.stringify([record, ...existing]));
  } catch (err) {
    console.warn('Local storage cache warning:', err);
  }

  // 2. Submit to Supabase if configured
  if (!isSupabaseConfigured || !supabase) {
    return {
      success: true,
      warning: 'Stored locally. Supabase connection is pending.',
      data: record
    };
  }

  try {
    const { error } = await supabase
      .from('admission_enquiries')
      .insert([
        {
          parent_name: record.parent_name,
          email: record.email,
          phone: record.phone,
          country: record.country,
          student_name: record.student_name,
          student_age: record.student_age,
          preferred_language: record.preferred_language,
          fiqh_preference: record.fiqh_preference,
          interested_courses: record.interested_courses,
          preferred_timing: record.preferred_timing,
          additional_message: record.additional_message,
          consent: record.consent,
          status: 'new'
        }
      ]);

    if (error) {
      console.error('Supabase insertion error:', error);
      // Even if Supabase throws an error (e.g. temporary network / RLS), we saved it locally!
      return {
        success: true,
        warning: 'Saved locally. Supabase sync notice: ' + error.message,
        data: record
      };
    }

    return {
      success: true,
      data: record
    };
  } catch (err) {
    console.error('Unexpected error while submitting enquiry:', err);
    return {
      success: true,
      warning: 'Saved locally. Supabase network notice: ' + err.message,
      data: record
    };
  }
}

/**
 * Admin Authentication & Queries Management API
 */

export async function signInAdmin(usernameOrEmail, password) {
  const cleanId = (usernameOrEmail || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  // 1. Direct Master Passcode Verification
  const isMasterMatch = 
    cleanPass === MASTER_ADMIN_PASSWORD && 
    (cleanId === MASTER_ADMIN_USERNAME || cleanId === 'hikhma@admin');

  if (isMasterMatch) {
    localStorage.setItem('hikhma_admin_auth', 'true');
    localStorage.setItem('hikhma_admin_email', 'Hikhma@admin');
    
    // Attempt Supabase Auth in background if credentials exist
    if (supabase) {
      try {
        await supabase.auth.signInWithPassword({
          email: cleanId,
          password: cleanPass
        });
      } catch (e) {
        // master fallback remains active
      }
    }

    return { 
      success: true, 
      user: { email: 'Hikhma@admin', role: 'admin' }, 
      session: { user: { email: 'Hikhma@admin' } } 
    };
  }

  // 2. Supabase Auth Verification (if user created custom account)
  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanId,
        password: cleanPass
      });

      if (!error && data?.session) {
        localStorage.setItem('hikhma_admin_auth', 'true');
        localStorage.setItem('hikhma_admin_email', data.user.email);
        return { success: true, user: data.user, session: data.session };
      }
    } catch (err) {
      // Fall through to error
    }
  }

  return { 
    success: false, 
    error: 'Invalid administrator credentials. Please check your username and password.' 
  };
}

export async function signOutAdmin() {
  localStorage.removeItem('hikhma_admin_auth');
  localStorage.removeItem('hikhma_admin_email');
  if (supabase) {
    await supabase.auth.signOut();
  }
}

export async function getAdminSession() {
  const hasLocalAuth = localStorage.getItem('hikhma_admin_auth') === 'true';
  const localEmail = localStorage.getItem('hikhma_admin_email') || 'Hikhma@admin';

  if (hasLocalAuth) {
    return { user: { email: localEmail } };
  }

  if (!supabase) return null;
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export function normalizeRecord(r) {
  if (!r) return null;
  return {
    id: r.id || r._id || ('enq_' + Math.random().toString(36).slice(2, 9)),
    student_name: r.student_name || r.studentName || r.student || 'Prospective Student',
    student_age: r.student_age || r.studentAge || r.age || '',
    parent_name: r.parent_name || r.parentName || r.parent || 'Parent / Guardian',
    email: r.email || '',
    phone: r.phone || r.contact || r.mobile || '',
    country: r.country || '',
    preferred_language: r.preferred_language || r.preferredLanguage || r.language || 'English',
    fiqh_preference: r.fiqh_preference || r.fiqhPreference || r.fiqh || 'Not Sure',
    interested_courses: Array.isArray(r.interested_courses) 
      ? r.interested_courses 
      : (Array.isArray(r.interestedCourses) 
          ? r.interestedCourses 
          : (typeof r.interested_courses === 'string' ? r.interested_courses.split(',').map(s => s.trim()) : (typeof r.interestedCourses === 'string' ? r.interestedCourses.split(',').map(s => s.trim()) : []))),
    preferred_timing: r.preferred_timing || r.preferredTiming || r.timing || '',
    additional_message: r.additional_message || r.additionalMessage || r.message || '',
    consent: r.consent !== undefined ? r.consent : true,
    status: (r.status || 'new').toLowerCase(),
    created_at: r.created_at || r.createdAt || r.created_date || new Date().toISOString()
  };
}

export async function fetchAdmissionEnquiries() {
  let supabaseData = [];
  let supabaseError = null;
  let activeTableName = 'admission_enquiries';

  // 1. Fetch from Supabase
  if (supabase) {
    const candidateTables = ['admission_enquiries', 'enquiries', 'admissions', 'admission_forms'];

    for (const tableName of candidateTables) {
      try {
        let res = await supabase
          .from(tableName)
          .select('*')
          .order('created_at', { ascending: false });

        // If error mentions created_at column missing, retry without ordering
        if (res.error && res.error.message && res.error.message.includes('created_at')) {
          res = await supabase.from(tableName).select('*');
        }

        if (!res.error && res.data) {
          const rows = res.data.map(normalizeRecord).filter(Boolean);
          activeTableName = tableName;
          supabaseData = rows;
          supabaseError = null;
          // If we got rows, stop candidate loop
          if (rows.length > 0) {
            break;
          }
        } else if (res.error) {
          // If the primary table returned an error, capture it
          if (tableName === 'admission_enquiries') {
            supabaseError = res.error.message || JSON.stringify(res.error);
          }
        }
      } catch (err) {
        if (tableName === 'admission_enquiries') {
          supabaseError = err.message;
        }
      }
    }
  }

  // 2. Fetch from Local Storage Cache
  let localData = [];
  try {
    const rawLocal = JSON.parse(localStorage.getItem('hikhma_admissions_local') || '[]');
    localData = rawLocal.map(normalizeRecord).filter(Boolean);
  } catch (e) {
    localData = [];
  }

  // 3. Merge and deduplicate by ID, or by (email + student_name)
  const combinedMap = new Map();
  // Add Supabase records first (source of truth from cloud)
  supabaseData.forEach(item => {
    const key = item.id || `${item.email}-${item.student_name}`;
    combinedMap.set(key, item);
  });
  // Add local records if not already in map
  localData.forEach(item => {
    const key = item.id || `${item.email}-${item.student_name}`;
    if (!combinedMap.has(key)) {
      combinedMap.set(key, item);
    }
  });

  const merged = Array.from(combinedMap.values()).sort(
    (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)
  );

  return {
    success: true,
    data: merged,
    supabaseCount: supabaseData.length,
    localCount: localData.length,
    supabaseError,
    activeTableName,
    // When Supabase is configured and connected, but returned 0 rows, it's typically blocked by RLS policies
    isRlsRestricted: Boolean(isSupabaseConfigured && supabaseData.length === 0 && !supabaseError)
  };
}

export async function updateEnquiryStatus(id, newStatus) {
  // 1. Update local storage first
  try {
    const local = JSON.parse(localStorage.getItem('hikhma_admissions_local') || '[]');
    const updated = local.map(item => item.id === id ? { ...item, status: newStatus } : item);
    localStorage.setItem('hikhma_admissions_local', JSON.stringify(updated));
  } catch (e) {
    // Ignore local update errors
  }

  // 2. Update Supabase if connected
  if (!supabase) return { success: true };

  const candidateTables = ['admission_enquiries', 'enquiries', 'admissions', 'admission_forms'];
  for (const table of candidateTables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .update({ status: newStatus })
        .eq('id', id);

      if (!error) {
        return { success: true, data: data?.[0] };
      }
    } catch (err) {
      // try next
    }
  }

  return { success: true };
}

/**
 * Helper to generate a demo enquiry for testing the admin dashboard
 */
export function createSampleAdmissionEnquiry() {
  const sample = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'sample_' + Date.now(),
    parent_name: 'Zayd Al-Mansoor',
    email: 'zayd.mansoor@example.com',
    phone: '+44 7911 123456',
    country: 'United Kingdom',
    student_name: 'Bilal Al-Mansoor',
    student_age: 10,
    preferred_language: 'English',
    fiqh_preference: "Shafi'i",
    interested_courses: ['Quran / Nazira', 'Tajweed', 'Islamic Studies'],
    preferred_timing: 'Evening (After School)',
    additional_message: 'Completed Noorani Qaida previously. Looking for 1-on-1 Tajweed and basic Fiqh.',
    consent: true,
    status: 'new',
    created_at: new Date().toISOString()
  };

  try {
    const existing = JSON.parse(localStorage.getItem('hikhma_admissions_local') || '[]');
    localStorage.setItem('hikhma_admissions_local', JSON.stringify([sample, ...existing]));
  } catch (e) {
    console.warn(e);
  }

  return sample;
}
