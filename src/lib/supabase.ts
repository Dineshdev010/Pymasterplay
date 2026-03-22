import { createClient } from "@supabase/supabase-js";

// =========================================================================
// SUPABASE CLIENT SETUP - src/lib/supabase.ts
// =========================================================================
// Instructions for the Developer:
// 1. Create a project at https://supabase.com
// 2. Go to Project Settings -> API
// 3. Copy your URL and anon key into your frontend .env file:
//      VITE_SUPABASE_URL="https://your-project.supabase.co"
//      VITE_SUPABASE_ANON_KEY="your-anon-key"
// =========================================================================

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * ---------------------------------------------------------
 * RECOMMENDED DATABASE SCHEMA SETUP (Run in Supabase SQL Editor)
 * ---------------------------------------------------------
 * 
 * -- 1. Create the Users/Progress Table
 * CREATE TABLE public.profiles (
 *   id uuid references auth.users not null primary key,
 *   email text,
 *   display_name text,
 *   wallet numeric default 0,
 *   streak integer default 0,
 *   xp integer default 0,
 *   stars_caught integer default 0,
 *   daily_stars integer default 0,
 *   solved_problems jsonb default '[]'::jsonb,
 *   updated_at timestamp with time zone default timezone('utc'::text, now())
 * );
 * 
 * -- 2. Create the Problems Table (For 500+ Questions)
 * CREATE TABLE public.problems (
 *   id text primary key,
 *   title text not null,
 *   difficulty text not null,
 *   description text not null,
 *   constraints jsonb,
 *   starter_code text,
 *   solution text,
 *   solution_explanation text,
 *   examples jsonb,
 *   test_cases jsonb
 * );
 * 
 * -- 3. Turn on Realtime for Leaderboards
 * ALTER PUBLICATION supabase_realtime ADD TABLE profiles;
 */
