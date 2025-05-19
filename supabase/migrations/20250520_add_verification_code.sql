
-- Add verification_code column to registrations table if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                    WHERE table_schema = 'public' 
                    AND table_name = 'registrations' 
                    AND column_name = 'verification_code') THEN
        ALTER TABLE public.registrations ADD COLUMN verification_code TEXT;
    END IF;
END
$$;
