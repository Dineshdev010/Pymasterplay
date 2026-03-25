CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  display_name text,
  wallet numeric NOT NULL DEFAULT 0,
  streak integer NOT NULL DEFAULT 0,
  xp integer NOT NULL DEFAULT 0,
  stars_caught integer NOT NULL DEFAULT 0,
  daily_stars integer NOT NULL DEFAULT 0,
  solved_problems jsonb NOT NULL DEFAULT '[]'::jsonb,
  completed_lessons jsonb NOT NULL DEFAULT '[]'::jsonb,
  completed_exercises jsonb NOT NULL DEFAULT '[]'::jsonb,
  unlocked_lessons jsonb NOT NULL DEFAULT '[]'::jsonb,
  activity_map jsonb NOT NULL DEFAULT '{}'::jsonb,
  last_coding_date text,
  previous_streak integer NOT NULL DEFAULT 0,
  streak_broken_date text,
  last_star_date text,
  time_spent integer NOT NULL DEFAULT 0,
  profile_complete boolean NOT NULL DEFAULT false,
  bio text NOT NULL DEFAULT '',
  avatar_url text NOT NULL DEFAULT '',
  skills jsonb NOT NULL DEFAULT '[]'::jsonb,
  certificate_fee_paid boolean NOT NULL DEFAULT false,
  certificate_fee_amount integer NOT NULL DEFAULT 500,
  certificate_payment_verified_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS display_name text,
  ADD COLUMN IF NOT EXISTS wallet numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS streak integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS xp integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS stars_caught integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS daily_stars integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS solved_problems jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS completed_lessons jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS completed_exercises jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS unlocked_lessons jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS activity_map jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS last_coding_date text,
  ADD COLUMN IF NOT EXISTS previous_streak integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS streak_broken_date text,
  ADD COLUMN IF NOT EXISTS last_star_date text,
  ADD COLUMN IF NOT EXISTS time_spent integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS profile_complete boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS bio text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS avatar_url text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS skills jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS certificate_fee_paid boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS certificate_fee_amount integer NOT NULL DEFAULT 500,
  ADD COLUMN IF NOT EXISTS certificate_payment_verified_at timestamptz,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now());

ALTER TABLE public.profiles
  ALTER COLUMN certificate_fee_amount SET DEFAULT 500;

UPDATE public.profiles
SET certificate_fee_amount = 500
WHERE COALESCE(certificate_fee_amount, 499) = 499;

CREATE TABLE IF NOT EXISTS public.certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rank_level text NOT NULL,
  issued_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE UNIQUE INDEX IF NOT EXISTS certificates_user_id_key ON public.certificates (user_id);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Profiles are viewable by owner" ON public.profiles;
CREATE POLICY "Profiles are viewable by owner"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Profiles are insertable by owner" ON public.profiles;
CREATE POLICY "Profiles are insertable by owner"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Profiles are updatable by owner" ON public.profiles;
CREATE POLICY "Profiles are updatable by owner"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Allow public verification of certificates" ON public.certificates;
DROP POLICY IF EXISTS "Allow owners to read their own certificates" ON public.certificates;
CREATE POLICY "Allow owners to read their own certificates"
ON public.certificates
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.increment_user_rewards(
  user_uuid uuid,
  wallet_gain integer,
  xp_gain integer
) RETURNS void AS $$
BEGIN
  UPDATE public.profiles
  SET wallet = COALESCE(wallet, 0) + wallet_gain,
      xp = COALESCE(xp, 0) + xp_gain,
      updated_at = timezone('utc'::text, now())
  WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

GRANT EXECUTE ON FUNCTION public.increment_user_rewards(uuid, integer, integer) TO authenticated;

CREATE OR REPLACE FUNCTION public.verify_certificate(certificate_uuid uuid)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  rank_level text,
  issued_at timestamptz,
  metadata jsonb
) AS $$
BEGIN
  RETURN QUERY
  SELECT c.id, c.user_id, c.rank_level, c.issued_at, c.metadata
  FROM public.certificates AS c
  WHERE c.id = certificate_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

GRANT EXECUTE ON FUNCTION public.verify_certificate(uuid) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.issue_certificate(requested_rank text DEFAULT NULL)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  rank_level text,
  issued_at timestamptz,
  metadata jsonb
) AS $$
DECLARE
  current_user_id uuid := auth.uid();
  current_xp integer := 0;
  current_name text := 'Python Student';
  computed_rank text := 'Beginner';
BEGIN
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  SELECT
    COALESCE(xp, 0),
    COALESCE(NULLIF(trim(display_name), ''), split_part(COALESCE(email, ''), '@', 1), 'Python Student')
  INTO current_xp, current_name
  FROM public.profiles
  WHERE profiles.id = current_user_id;

  IF current_xp < 100 THEN
    RAISE EXCEPTION 'You need at least 100 XP to unlock a certificate';
  END IF;

  computed_rank := COALESCE(NULLIF(trim(requested_rank), ''), CASE
    WHEN current_xp >= 3000 THEN 'Advanced'
    WHEN current_xp >= 1000 THEN 'Intermediate'
    ELSE 'Beginner'
  END);

  RETURN QUERY
  INSERT INTO public.certificates (user_id, rank_level, metadata)
  VALUES (
    current_user_id,
    computed_rank,
    jsonb_build_object(
      'display_name', current_name,
      'xp', current_xp
    )
  )
  ON CONFLICT (user_id) DO UPDATE
    SET rank_level = EXCLUDED.rank_level,
        metadata = public.certificates.metadata || EXCLUDED.metadata
  RETURNING certificates.id, certificates.user_id, certificates.rank_level, certificates.issued_at, certificates.metadata;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.issue_certificate()
RETURNS TABLE (
  id uuid,
  user_id uuid,
  rank_level text,
  issued_at timestamptz,
  metadata jsonb
) AS $$
BEGIN
  RETURN QUERY SELECT * FROM public.issue_certificate(NULL::text);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

GRANT EXECUTE ON FUNCTION public.issue_certificate(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.issue_certificate() TO authenticated;

CREATE OR REPLACE FUNCTION public.get_leaderboard()
RETURNS TABLE (
  user_id uuid,
  display_name text,
  avatar_url text,
  xp integer,
  solved_count integer,
  streak integer,
  wallet numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    COALESCE(NULLIF(trim(p.display_name), ''), 'Python Learner') AS display_name,
    COALESCE(p.avatar_url, '') AS avatar_url,
    COALESCE(p.xp, 0) AS xp,
    jsonb_array_length(COALESCE(p.solved_problems, '[]'::jsonb)) AS solved_count,
    COALESCE(p.streak, 0) AS streak,
    COALESCE(p.wallet, 0) AS wallet
  FROM public.profiles AS p
  WHERE COALESCE(p.profile_complete, false) = true
  ORDER BY COALESCE(p.xp, 0) DESC, COALESCE(p.streak, 0) DESC, COALESCE(p.wallet, 0) DESC
  LIMIT 100;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

GRANT EXECUTE ON FUNCTION public.get_leaderboard() TO anon, authenticated;
