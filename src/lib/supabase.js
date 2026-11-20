import { createClient } from '@supabase/supabase-js';

// Default Supabase configuration for multi-device cloud synchronization
// Safe for client frontend: Supabase anon key is a public key guarded by PostgreSQL Row Level Security (RLS)
const DEFAULT_SUPABASE_URL = 'https://yipmhiqoxtyzafvuzuzg.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpcG1oaXFveHR5emFmdnV6dXpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUwOTk5NzIsImV4cCI6MjExMDY3NTk3Mn0.i09Gzp7IM_qIXYwMy_TlMuHh4EUEKpdkOO7z1AEBbfM';

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL).trim();
const cleanUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY).trim();

export const isSupabaseConfigured = Boolean(
  cleanUrl &&
  supabaseAnonKey &&
  cleanUrl !== '' &&
  supabaseAnonKey !== '' &&
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
 * Normalizes an enquiry record from either Supabase or local storage into a consistent schema
 */
export function normalizeRecord(r) {
  if (!r) return null;
  return {
    id: r.id || ('enq_' + Math.random().toString(36).slice(2, 9)),
    student_name: r.student_name || r.studentName || r.student || 'Prospective Student',
    student_age: r.student_age !== undefined && r.student_age !== null ? r.student_age : (r.studentAge || ''),
    parent_name: r.parent_name || r.parentName || r.parent || 'Parent / Guardian',
    email: (r.email || '').toLowerCase().trim(),
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

/**
 * Automatically syncs any offline/device-local enquiries to Supabase cloud.
 * This rescues any enquiries previously entered on a specific device and makes them visible everywhere.
 */
export async function syncPendingLocalEnquiries() {
  if (!supabase) return { synced: 0 };

  try {
    const rawLocal = localStorage.getItem('hikhma_admissions_local');
    if (!rawLocal) return { synced: 0 };

    const localList = JSON.parse(rawLocal);
    if (!Array.isArray(localList) || localList.length === 0) return { synced: 0 };

    // Fetch existing records from Supabase to prevent duplicates
    const { data: cloudRecords, error: fetchErr } = await supabase
      .from('admission_enquiries')
      .select('id, email, student_name');

    if (fetchErr) {
      console.warn('Could not query Supabase cloud for sync verification:', fetchErr);
      return { synced: 0 };
    }

    const cloudKeySet = new Set(
      (cloudRecords || []).map(r => `${(r.email || '').toLowerCase()}-${(r.student_name || '').toLowerCase()}`)
    );
    const cloudIdSet = new Set((cloudRecords || []).map(r => r.id));

    let syncedCount = 0;
    const remainingLocal = [];

    for (const item of localList) {
      const normalized = normalizeRecord(item);
      const matchKey = `${normalized.email}-${normalized.student_name.toLowerCase()}`;

      // Check if already in cloud
      if (cloudIdSet.has(item.id) || cloudKeySet.has(matchKey)) {
        continue;
      }

      // Unsynced local enquiry: upload to cloud
      try {
        const { data: inserted, error: insertErr } = await supabase
          .from('admission_enquiries')
          .insert([
            {
              parent_name: normalized.parent_name,
              email: normalized.email,
              phone: normalized.phone,
              country: normalized.country,
              student_name: normalized.student_name,
              student_age: parseInt(normalized.student_age, 10) || 7,
              preferred_language: normalized.preferred_language,
              fiqh_preference: normalized.fiqh_preference,
              interested_courses: normalized.interested_courses,
              preferred_timing: normalized.preferred_timing,
              additional_message: normalized.additional_message || null,
              consent: normalized.consent,
              status: normalized.status || 'new'
            }
          ])
          .select();

        if (!insertErr && inserted && inserted.length > 0) {
          syncedCount++;
          cloudKeySet.add(matchKey);
          cloudIdSet.add(inserted[0].id);
        } else {
          console.warn('Could not sync local record to cloud:', insertErr);
          remainingLocal.push(item);
        }
      } catch (err) {
        console.warn('Network exception while syncing local record:', err);
        remainingLocal.push(item);
      }
    }

    // Retain only genuinely unsynced items in localStorage
    if (remainingLocal.length > 0) {
      localStorage.setItem('hikhma_admissions_local', JSON.stringify(remainingLocal));
    } else {
      localStorage.removeItem('hikhma_admissions_local');
    }

    return { synced: syncedCount };
  } catch (err) {
    console.error('Error in syncPendingLocalEnquiries:', err);
    return { synced: 0 };
  }
}

/**
 * Submit an admission enquiry to the Supabase database.
 * Directly uploads to Supabase cloud so all devices see the data immediately.
 */
export async function submitAdmissionEnquiry(payload) {
  const preparedData = {
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
    status: 'new'
  };

  // 1. Submit directly to Supabase cloud
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('admission_enquiries')
        .insert([preparedData])
        .select();

      if (!error && data && data.length > 0) {
        const savedRecord = normalizeRecord(data[0]);

        // Keep local cache cleanly updated
        try {
          const existing = JSON.parse(localStorage.getItem('hikhma_admissions_local') || '[]');
          const filtered = existing.filter(
            e => e.id !== savedRecord.id && 
            !((e.email || '').toLowerCase() === savedRecord.email && (e.student_name || '').toLowerCase() === savedRecord.student_name.toLowerCase())
          );
          localStorage.setItem('hikhma_admissions_local', JSON.stringify([savedRecord, ...filtered]));
        } catch (e) {}

        return {
          success: true,
          data: savedRecord,
          cloudSaved: true
        };
      } else if (error) {
        console.error('Supabase insertion error:', error);
      }
    } catch (err) {
      console.error('Network exception during Supabase submission:', err);
    }
  }

  // 2. Offline / local fallback
  const fallbackRecord = {
    ...preparedData,
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'enq_' + Date.now(),
    created_at: new Date().toISOString(),
    _pendingSync: true
  };

  try {
    const existing = JSON.parse(localStorage.getItem('hikhma_admissions_local') || '[]');
    localStorage.setItem('hikhma_admissions_local', JSON.stringify([fallbackRecord, ...existing]));
  } catch (err) {
    console.warn('Local storage cache warning:', err);
  }

  return {
    success: true,
    warning: 'Saved locally on this device. Will sync to cloud automatically when online.',
    data: fallbackRecord,
    cloudSaved: false
  };
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

/**
 * Fetch admission enquiries from Supabase cloud database.
 * Syncs any pending local enquiries first, then retrieves all records from cloud.
 */
export async function fetchAdmissionEnquiries() {
  // 1. Sync any local enquiries from this device to cloud
  await syncPendingLocalEnquiries();

  let supabaseData = [];
  let supabaseError = null;

  // 2. Query cloud database (authoritative source of truth across all devices)
  if (supabase) {
    try {
      const res = await supabase
        .from('admission_enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!res.error && res.data) {
        supabaseData = res.data.map(normalizeRecord).filter(Boolean);
      } else if (res.error) {
        supabaseError = res.error.message || JSON.stringify(res.error);
        console.error('Error querying admission_enquiries:', res.error);
      }
    } catch (err) {
      supabaseError = err.message;
      console.error('Network error querying admission_enquiries:', err);
    }
  }

  // 3. Check for any pending local records that haven't synced yet
  let localData = [];
  try {
    const rawLocal = JSON.parse(localStorage.getItem('hikhma_admissions_local') || '[]');
    localData = rawLocal.map(normalizeRecord).filter(Boolean);
  } catch (e) {
    localData = [];
  }

  // 4. Merge: Supabase cloud records are authoritative
  const combinedMap = new Map();
  const seenSignatures = new Set();

  supabaseData.forEach(item => {
    combinedMap.set(item.id, item);
    seenSignatures.add(`${item.email}-${item.student_name.toLowerCase()}`);
  });

  // Only append local records if not present in cloud
  localData.forEach(item => {
    const sig = `${item.email}-${item.student_name.toLowerCase()}`;
    if (!combinedMap.has(item.id) && !seenSignatures.has(sig)) {
      combinedMap.set(item.id, item);
      seenSignatures.add(sig);
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
    activeTableName: 'admission_enquiries',
    isRlsRestricted: false
  };
}

export async function updateEnquiryStatus(id, newStatus) {
  // 1. Optimistic local update
  try {
    const local = JSON.parse(localStorage.getItem('hikhma_admissions_local') || '[]');
    const updated = local.map(item => item.id === id ? { ...item, status: newStatus } : item);
    localStorage.setItem('hikhma_admissions_local', JSON.stringify(updated));
  } catch (e) {}

  // 2. Update Supabase cloud
  if (!supabase) return { success: true };

  try {
    const { data, error } = await supabase
      .from('admission_enquiries')
      .update({ status: newStatus })
      .eq('id', id)
      .select();

    if (!error) {
      return { success: true, data: data?.[0] };
    } else {
      console.error('Supabase update status error:', error);
      return { success: false, error: error.message };
    }
  } catch (err) {
    console.error('Network error during status update:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Helper to generate a demo enquiry for testing the admin dashboard across devices
 */
export async function createSampleAdmissionEnquiry() {
  const samplePayload = {
    parentName: 'Zayd Al-Mansoor',
    email: `zayd.mansoor.${Date.now().toString().slice(-4)}@example.com`,
    phone: '+44 7911 123456',
    country: 'United Kingdom',
    studentName: 'Bilal Al-Mansoor',
    studentAge: 10,
    preferredLanguage: 'English',
    fiqhPreference: "Shafi'i",
    interestedCourses: ['Quran / Nazira', 'Tajweed', 'Islamic Studies'],
    preferredTiming: 'Evening (After School)',
    additionalMessage: 'Completed Noorani Qaida previously. Looking for 1-on-1 Tajweed and basic Fiqh.',
    consent: true
  };

  return await submitAdmissionEnquiry(samplePayload);
}
