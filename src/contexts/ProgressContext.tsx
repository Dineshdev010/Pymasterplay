// ============================================================
// PROGRESS CONTEXT — src/contexts/ProgressContext.tsx
// The "brain" of the reward system. Manages all user progress:
// - Solved problems, completed lessons, exercises
// - Wallet (virtual currency), XP, streaks
// - Celebration modals for milestones
// - Star catching from the landing page
// ============================================================

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from "react";
import {
  UserProgress,
  getProgress,
  saveProgress,
  recordActivity,
  getTodayLocalDateString,
  getRewardForDifficulty,
  canRecoverStreak,
  recoverStreak,
  getStreakRecoveryCost,
  mergeProgress,
  profileRowToProgress,
  progressToProfileUpdate,
  defaultProgress,
} from "@/lib/progress";
import { playCelebrationSound, playApplauseSound, playLevelUpSound } from "@/lib/sounds";
import { getEarnedBadges } from "@/lib/badges";
import { problems } from "@/data/problems";
import confetti from "canvas-confetti";
import { useAuth } from "./AuthContext";
import { supabase } from "@/lib/supabase";

// ---------- TypeScript interface for the context ----------
// Every function and value that child components can access
interface ProgressContextType {
  progress: UserProgress;                // Current user progress object
  solveProblem: (problemId: string, difficulty: string) => void;  // Mark a problem as solved
  completeLesson: (lessonId: string) => void;   // Mark a lesson as completed
  completeExercise: (exerciseKey: string) => void; // Mark an exercise as completed
  logActivity: () => void;               // Record daily activity (for streak)
  catchStar: (xpGain: number) => void;   // Catch a shooting star for XP
  addDailyStar: () => void;              // Catch a GTA-style daily task star
  unlockLesson: (lessonId: string, cost?: number) => boolean;   // Unlock a lesson, optionally charging wallet
  unlockSolution: (exerciseKey: string, cost?: number) => boolean; // Unlock a solution once, optionally charging wallet
  attemptStreakRecovery: () => boolean;   // Try to restore a broken streak
  addWallet: (amount: number) => void;   // Add/subtract from wallet
  addTimeSpent: (seconds: number) => void; // Add time spent learning
  canRecover: boolean;                   // Whether streak recovery is available
  recoveryCost: number;                  // Cost to recover the streak
  showCelebration: boolean;              // Whether to show the celebration modal
  celebrationData: { title: string; subtitle: string; emoji: string; reward?: string } | null;
  dismissCelebration: () => void;        // Close the celebration modal
  resetLesson: (lessonId: string) => void; // Reset a specific lesson's progress
}

// Create the context (null by default — must be inside Provider)
const ProgressContext = createContext<ProgressContextType | null>(null);

// ---------- Streak milestone definitions ----------
// When user hits these streak days, they get a celebration + bonus cash
const STREAK_MILESTONES: Record<7 | 14 | 30 | 100, { title: string; subtitle: string; emoji: string; reward: string }> = {
  7: { title: "🔥 1 Week Streak!", subtitle: "You've coded for 7 days straight! You're building a habit!", emoji: "🔥", reward: "+$10 bonus" },
  14: { title: "⚡ 2 Week Warrior!", subtitle: "14 days of consistency! You're becoming unstoppable!", emoji: "⚡", reward: "+$25 bonus" },
  30: { title: "🏆 Monthly Master!", subtitle: "30 days of coding! You've proven your dedication!", emoji: "🏆", reward: "+$50 bonus" },
  100: { title: "💎 Legendary Coder!", subtitle: "100 DAY STREAK! You're in the top 1% of coders!", emoji: "💎", reward: "+$200 bonus" },
};

// Cash reward amounts for each streak milestone
const STREAK_REWARDS: Record<7 | 14 | 30 | 100, number> = { 7: 10, 14: 25, 30: 50, 100: 200 };
const TIME_GIFT_INTERVAL_SECONDS = 60 * 60;
const TIME_GIFT_REWARD = 5;
const CLOUD_SYNC_DEBOUNCE_MS = 8000;

// ============================================================
// PROGRESS PROVIDER — wraps the app to provide progress state
// ============================================================
export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress>(getProgress());
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationData, setCelebrationData] = useState<{ title: string; subtitle: string; emoji: string; reward?: string } | null>(null);
  const [hydratedUserId, setHydratedUserId] = useState<string | null>(null);
  const lastCloudSnapshotRef = useRef<string>("");

  // 1. Fetch from Supabase whenever user logs in or mounts
  useEffect(() => {
    let active = true;

    if (!user) {
      // Fallback to defaults if not logged in
      setProgress(defaultProgress);
      setHydratedUserId(null);
      lastCloudSnapshotRef.current = "";
      return;
    }

    setHydratedUserId(null);

    supabase
      .from("profiles")
      .select(
        "wallet, streak, last_coding_date, solved_problems, completed_lessons, completed_exercises, unlocked_lessons, xp, activity_map, stars_caught, previous_streak, streak_broken_date, daily_stars, last_star_date, time_spent",
      )
      .eq("id", user.uid)
      .single()
      .then(({ data, error }) => {
        if (!active) return;

        if (error) {
          console.error("Cloud Load Error", error);
          const currentLocal = getProgress();
          setProgress(currentLocal);
          setHydratedUserId(user.uid);
          return;
        }

        const remoteProgress = profileRowToProgress(data);
        
        // Use functional setProgress to ensure we don't overwrite progress 
        // made between the start of fetch and now.
        setProgress(prev => {
          const mergedProgress = mergeProgress(prev, remoteProgress);
          // Sync back to local storage immediately
          saveProgress(mergedProgress);
          // Snapshot for the debounce guard
          lastCloudSnapshotRef.current = JSON.stringify(progressToProfileUpdate(mergedProgress));
          return mergedProgress;
        });

        setHydratedUserId(user.uid);
      });

    return () => {
      active = false;
    };
  }, [user]);

  // 2. Auto-save progress to local storage whenever it changes (State → LocalStorage)
  useEffect(() => {
    if (user && hydratedUserId !== user.uid) {
      return;
    }
    saveProgress(progress);
  }, [hydratedUserId, progress, user]);

  // 3. Auto-save progress to Cloud (State → Supabase)
  useEffect(() => {
    if (user && hydratedUserId !== user.uid) {
      return;
    }

    if (!user) {
      return;
    }

    const payload = progressToProfileUpdate(progress);
    
    // SECURITY: Client-side "Sane Limit" Check before syncing to cloud
    if (payload.wallet !== undefined && payload.wallet < 0) {
      console.warn("Security: Attempted to sync negative wallet. Aborting sync.");
      return;
    }
    if (payload.xp !== undefined && payload.xp < 0) {
      console.warn("Security: Attempted to sync negative XP. Aborting sync.");
      return;
    }

    const snapshot = JSON.stringify(payload);
    if (snapshot === lastCloudSnapshotRef.current) {
      return;
    }

    const handler = setTimeout(() => {
      supabase.from("profiles").upsert({
        id: user.uid,
        ...payload,
      }).then(({ error }) => {
        if (error) {
          console.error("Cloud Sync Error", error);
          return;
        }

        lastCloudSnapshotRef.current = snapshot;
      });
    }, CLOUD_SYNC_DEBOUNCE_MS);
    
    return () => clearTimeout(handler);
  }, [hydratedUserId, progress, user]);

  // ---------- Celebration trigger ----------
  const triggerCelebration = useCallback((title: string, subtitle: string, emoji: string, reward?: string) => {
    setCelebrationData({ title, subtitle, emoji, reward });
    setShowCelebration(true);
    playCelebrationSound();
    
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#3776AB", "#FFE873", "#4B8BBE", "#FFD43B"],
    });
  }, []);

  const dismissCelebration = useCallback(() => {
    setShowCelebration(false);
  }, []);

  // ---------- Core logic functions ----------

  const solveProblem = useCallback((problemId: string, difficulty: string) => {
    setProgress((prev) => {
      if (prev.solvedProblems.includes(problemId)) return prev;

      const reward = getRewardForDifficulty(difficulty);
      const { progress: updated, streakMilestone } = recordActivity(prev);

      const next = {
        ...updated,
        wallet: updated.wallet + reward,
        xp: updated.xp + (reward * 2), // XP is double the cash reward
        solvedProblems: [...updated.solvedProblems, problemId],
      };

      // Milestone check
      if (streakMilestone) {
        const milestone = STREAK_MILESTONES[streakMilestone];
        next.wallet += STREAK_REWARDS[streakMilestone];
        // We can't call triggerCelebration here inside setProgress (it's a side effect)
        // so we'll rely on an effect to show it if needed, or just pass it down if we refactor.
      }

      saveProgress(next);
      return next;
    });
    
    playApplauseSound();
  }, []);

  const completeLesson = useCallback((lessonId: string) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;

      const { progress: updated } = recordActivity(prev);
      const next = {
        ...updated,
        xp: updated.xp + 10,
        completedLessons: [...updated.completedLessons, lessonId],
      };

      saveProgress(next);
      return next;
    });
    playCelebrationSound();
  }, []);

  const completeExercise = useCallback((exerciseKey: string) => {
    setProgress((prev) => {
      if (prev.completedExercises.includes(exerciseKey)) return prev;

      const { progress: updated } = recordActivity(prev);
      const next = {
        ...updated,
        xp: updated.xp + 5,
        completedExercises: [...updated.completedExercises, exerciseKey],
      };

      saveProgress(next);
      return next;
    });
  }, []);

  const logActivity = useCallback(() => {
    setProgress((prev) => {
      const { progress: updated } = recordActivity(prev);
      saveProgress(updated);
      return updated;
    });
  }, []);

  const catchStar = useCallback((xpGain: number) => {
    setProgress((prev) => {
      const next = {
        ...prev,
        xp: prev.xp + xpGain,
        starsCaught: prev.starsCaught + 1,
      };
      saveProgress(next);
      return next;
    });
    playCelebrationSound();
  }, []);

  const unlockLesson = useCallback((lessonId: string, cost = 50) => {
    let success = false;
    setProgress((prev) => {
      if (prev.unlockedLessons.includes(lessonId)) {
        success = true;
        return prev;
      }
      if (prev.wallet < cost) return prev;

      success = true;
      const next = {
        ...prev,
        wallet: prev.wallet - cost,
        unlockedLessons: [...prev.unlockedLessons, lessonId],
      };
      saveProgress(next);
      return next;
    });
    return success;
  }, []);

  const unlockSolution = useCallback((exerciseKey: string, cost = 10) => {
    let success = false;
    setProgress((prev) => {
      if (prev.unlockedSolutions.includes(exerciseKey)) {
        success = true;
        return prev;
      }
      if (prev.wallet < cost) return prev;

      success = true;
      const next = {
        ...prev,
        wallet: prev.wallet - cost,
        unlockedSolutions: [...prev.unlockedSolutions, exerciseKey],
      };
      saveProgress(next);
      return next;
    });
    return success;
  }, []);

  const attemptStreakRecovery = useCallback(() => {
    let success = false;
    setProgress((prev) => {
      const recovered = recoverStreak(prev);
      if (recovered) {
        success = true;
        saveProgress(recovered);
        return recovered;
      }
      return prev;
    });
    return success;
  }, []);

  const addWallet = useCallback((amount: number) => {
    setProgress((prev) => {
      const next = { ...prev, wallet: prev.wallet + amount };
      saveProgress(next);
      return next;
    });
  }, []);

  const addTimeSpent = useCallback((seconds: number) => {
    setProgress((prev) => {
      const next = { ...prev, timeSpent: (prev.timeSpent || 0) + seconds };
      
      // Auto-gift wallet every 1 hour of active time
      if (Math.floor(next.timeSpent / TIME_GIFT_INTERVAL_SECONDS) > Math.floor((prev.timeSpent || 0) / TIME_GIFT_INTERVAL_SECONDS)) {
        next.wallet += TIME_GIFT_REWARD;
        // Optimization: Use a local flag or similar to trigger celebration in next render
      }
      
      saveProgress(next);
      return next;
    });
  }, []);

  const addDailyStar = useCallback(() => {
    setProgress((prev) => {
      const today = getTodayLocalDateString();
      const currentStars = prev.lastStarDate === today ? prev.dailyStars : 0;
      if (currentStars >= 5) return prev;

      const next = {
        ...prev,
        dailyStars: currentStars + 1,
        lastStarDate: today,
        xp: prev.xp + 20,
        wallet: prev.wallet + 10,
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const resetLesson = useCallback((lessonId: string) => {
    setProgress((prev) => {
      const next = {
        ...prev,
        completedExercises: prev.completedExercises.filter(key => !key.startsWith(`${lessonId}:`)),
        completedLessons: prev.completedLessons.filter(id => id !== lessonId),
      };
      saveProgress(next);
      return next;
    });
  }, []);

  // ---------- Monitoring XP for Level-Ups ----------
  const prevLevelRef = useRef<number>(Math.floor(progress.xp / 500) + 1);
  useEffect(() => {
    const currentLevel = Math.floor(progress.xp / 500) + 1;
    if (currentLevel > prevLevelRef.current) {
      playLevelUpSound();
      triggerCelebration(
        "🚀 Level Up!",
        `You've reached Level ${currentLevel}! Keep pushing your Python limits.`,
        "⚡",
        "+$50 wallet bonus"
      );
      addWallet(50);
      prevLevelRef.current = currentLevel;
    }
  }, [progress.xp, triggerCelebration, addWallet]);

  const value = {
    progress,
    solveProblem,
    completeLesson,
    completeExercise,
    logActivity,
    catchStar,
    addDailyStar,
    unlockLesson,
    unlockSolution,
    attemptStreakRecovery,
    addWallet,
    addTimeSpent,
    canRecover: canRecoverStreak(progress),
    recoveryCost: getStreakRecoveryCost(progress.previousStreak),
    showCelebration,
    celebrationData,
    dismissCelebration,
    resetLesson,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

// Custom hook for easy access
export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
