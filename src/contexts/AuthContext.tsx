// ============================================================
// AUTH CONTEXT — src/contexts/AuthContext.tsx
// Provides authentication state and methods to the entire app.
// Switched from Firebase to Supabase!
// ============================================================

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabase";

// --- Custom User interface to match previous app expectation ---
export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Map Supabase User to our local AppUser interface safely
  const mapUser = (sbUser: any): AppUser | null => {
    if (!sbUser) return null;
    return {
      uid: sbUser.id,
      email: sbUser.email || null,
      displayName: sbUser.user_metadata?.displayName || sbUser.user_metadata?.full_name || null,
    };
  };

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(mapUser(session?.user));
      setLoading(false);
    });

    // 2. Listen for auth changes (login/logout/token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(mapUser(session?.user));
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- Email/Password Login ---
  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) throw error;
  };

  // --- Email/Password Signup ---
  const signup = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          displayName: name.trim(), // Custom metadata
        },
      },
    });
    if (error) throw error;

    // Supabase Auth officially created the user. Now create their profiles row.
    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        email: data.user.email,
        display_name: name,
        wallet: 0,
        streak: 0,
        xp: 0,
        stars_caught: 0,
        daily_stars: 0,
        solved_problems: [],
      });
    }
  };

  // --- Logout ---
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  // --- Password Reset ---
  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });
    if (error) throw error;
  };

  // --- Google Sign-In ---
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, resetPassword, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
