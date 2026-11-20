-- ==============================================================================
-- Hikhma Islamic School - Database Schema & Row Level Security (RLS)
-- Managed and Operated by NextGen Organisation
-- ==============================================================================

-- 1. Create admission_enquiries table
CREATE TABLE IF NOT EXISTS public.admission_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    country TEXT NOT NULL,
    student_name TEXT NOT NULL,
    student_age INTEGER NOT NULL CHECK (student_age >= 5 AND student_age <= 18),
    preferred_language TEXT NOT NULL,
    fiqh_preference TEXT NOT NULL DEFAULT 'Not Sure',
    interested_courses TEXT[] NOT NULL DEFAULT '{}',
    preferred_timing TEXT NOT NULL,
    additional_message TEXT,
    consent BOOLEAN NOT NULL DEFAULT true CHECK (consent = true),
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'contacted', 'enrolled', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Create index for efficient querying by status and submission date
CREATE INDEX IF NOT EXISTS idx_admission_enquiries_created_at ON public.admission_enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admission_enquiries_status ON public.admission_enquiries (status);
CREATE INDEX IF NOT EXISTS idx_admission_enquiries_email ON public.admission_enquiries (email);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.admission_enquiries ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policy: Allow anonymous visitors / public frontend to INSERT valid enquiries only
-- Anonymous and authenticated clients can submit admission forms
DROP POLICY IF EXISTS "Allow anonymous visitors to insert admission enquiries" ON public.admission_enquiries;
CREATE POLICY "Allow anonymous visitors to insert admission enquiries"
    ON public.admission_enquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        -- Validate mandatory fields and constraints at DB level
        parent_name IS NOT NULL AND length(trim(parent_name)) > 1 AND
        email IS NOT NULL AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND
        phone IS NOT NULL AND length(trim(phone)) >= 5 AND
        country IS NOT NULL AND length(trim(country)) >= 2 AND
        student_name IS NOT NULL AND length(trim(student_name)) > 1 AND
        student_age >= 5 AND student_age <= 18 AND
        consent = true
    );

-- 5. RLS Policy: Allow read and update access for administrative portal
DROP POLICY IF EXISTS "Restrict read access to authenticated administrators only" ON public.admission_enquiries;
DROP POLICY IF EXISTS "Allow read access to admission enquiries" ON public.admission_enquiries;
CREATE POLICY "Allow read access to admission enquiries"
    ON public.admission_enquiries
    FOR SELECT
    TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "Restrict update access to authenticated administrators only" ON public.admission_enquiries;
DROP POLICY IF EXISTS "Allow update access to admission enquiries" ON public.admission_enquiries;
CREATE POLICY "Allow update access to admission enquiries"
    ON public.admission_enquiries
    FOR UPDATE
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Restrict delete access to authenticated administrators only" ON public.admission_enquiries;
CREATE POLICY "Restrict delete access to authenticated administrators only"
    ON public.admission_enquiries
    FOR DELETE
    TO authenticated
    USING (auth.role() = 'authenticated');

-- 6. Add comment documentation
COMMENT ON TABLE public.admission_enquiries IS 'Admission enquiries submitted through Hikhma Islamic School institutional website (NextGen Organisation)';
COMMENT ON COLUMN public.admission_enquiries.parent_name IS 'Full name of parent or legal guardian';
COMMENT ON COLUMN public.admission_enquiries.student_name IS 'Full name of prospective student';
COMMENT ON COLUMN public.admission_enquiries.student_age IS 'Age of student (must be between 5 and 18)';
COMMENT ON COLUMN public.admission_enquiries.fiqh_preference IS 'Jurisprudence stream: Shafii, Hanafi, or Not Sure';
COMMENT ON COLUMN public.admission_enquiries.consent IS 'Explicit parent agreement to be contacted for admission counselling';
