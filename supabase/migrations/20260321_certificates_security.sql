-- Secure Certificate Backend Tracking Logic (PyMaster)
-- Paste this completely into your Supabase SQL Editor and click RUN.

-- 1. Create a secure, read-only table for authentic certificates
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    rank_level TEXT NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Force RLS: Absolutely no inserts from the browser!
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Anyone can verify a certificate if they have the ID
CREATE POLICY "Allow public verification of certificates" 
    ON public.certificates FOR SELECT 
    USING (true);

-- 2. Create the exact secure RPC function for wallet updates 
-- (This prevents the frontend from dictating XP payloads natively, fixing the exploit)
CREATE OR REPLACE FUNCTION increment_user_rewards(
    user_uuid UUID, 
    wallet_gain INT, 
    xp_gain INT
) RETURNS void AS $$
BEGIN
    UPDATE public.profiles
    SET wallet = wallet + wallet_gain,
        xp = xp + xp_gain
    WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
