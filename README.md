# Hikhma Islamic School – Official Institutional Website
**Managed and Operated by NextGen Organisation**

Welcome to the official repository for **Hikhma Islamic School**, an online Islamic educational institution providing structured, authentic, and personalised 1-on-1 religious learning for children and teenagers aged 5 to 18 worldwide.

---

## 🏛️ Institutional Overview

- **Institution:** Hikhma Islamic School
- **Management & Governance:** NextGen Organisation
- **Target Age Group:** 5–18 years (Elementary to High School)
- **Pedagogy:** Dedicated 1-on-1 Personal Mentorship
- **Jurisprudence Streams:** Dual alignment with orthodox **Shafi'i** and **Hanafi** Madhhabs
- **Languages Supported:** English, Urdu, Kannada, Malayalam, and Tamil (additional regional languages on request)
- **Coverage:** Global accessibility across all time zones (UK, US, Canada, GCC/Middle East, India, Australia, etc.)

---

## 🔐 Administrative Access Portal (`/admin`)

An administrative portal has been implemented for authorized NextGen admissions staff.
**It is not linked from public visitor menus** and can only be accessed by manually navigating to `/admin` in the browser URL.

### Admin Features:
- **Restricted Access:** Requires administrator authentication via Supabase Auth.
- **KPI Metrics:** Total Enquiries, New / Pending, Contacted, Enrolled, and Shafi'i vs. Hanafi breakdown.
- **Real-Time Search & Filtering:** Filter by status, Madhhab, and search by student/parent name, email, or country.
- **Full Dossier Inspection:** View complete enquiry details, courses selected, notes, and submission timestamps.
- **Direct Communication:** Instant **WhatsApp** button (pre-filled message) and **Email** launcher.
- **Status Updates:** Update enquiry lifecycle (`new` &rarr; `reviewed` &rarr; `contacted` &rarr; `enrolled`).
- **Export to CSV:** One-click spreadsheet download for NextGen admissions board meetings.

### Creating an Administrator Account:
1. Open your **[Supabase Dashboard](https://supabase.com/dashboard)**.
2. Navigate to **Authentication** &rarr; **Users**.
3. Click **Add User** &rarr; **Create User**.
4. Enter your administrator email and chosen password.
5. Visit `http://localhost:3000/admin` in your browser and log in with those credentials!

---

## ⚙️ Environment Variables

Configure your credentials in `.env` (refer to `.env.example`):

```env
# Supabase Project URL
VITE_SUPABASE_URL=https://your-project-id.supabase.co

# Supabase Anonymous / Publishable Key (RLS protected)
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

---

## 💻 Local Development & Build

### Install Dependencies
```bash
pnpm install
```

### Start Development Server
```bash
pnpm run dev
```

### Build for Production
```bash
pnpm run build
```

---

**NextGen Organisation** • *Dedicated to Excellence in Islamic Education*
