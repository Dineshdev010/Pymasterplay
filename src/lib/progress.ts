// ============================================================
// PROGRESS SYSTEM — src/lib/progress.ts
// Manages user progress data using localStorage.
// Handles streaks, XP, wallet, activity tracking, and more.
// ============================================================

// --- TypeScript Interface: defines the shape of user progress data ---
export interface UserProgress {
  wallet: number; // Virtual currency earned by solving problems
  streak: number; // Number of consecutive days of coding
  lastCodingDate: string | null; // Last date the user coded (YYYY-MM-DD)
  solvedProblems: string[]; // Array of solved problem IDs
  completedLessons: string[]; // Array of completed lesson IDs
  completedExercises: string[]; // Array like "lessonId:beginner", "lessonId:intermediate"
  unlockedLessons: string[]; // Lesson IDs unlocked by spending wallet cash
  xp: number; // Experience points earned
  activityMap: Record<string, number>; // Maps "YYYY-MM-DD" → activity count for that day
  starsCaught: number; // How many shooting stars the user has caught
  previousStreak: number; // Streak value before it was broken (for recovery)
  streakBrokenDate: string | null; // Date when the streak was broken
  dailyStars: number; // For the GTA-style daily wanted level
  lastStarDate: string | null; // Date when the last daily star was earned
  timeSpent: number; // Total time spent learning in seconds
}

// Key used to store progress in localStorage
const STORAGE_KEY = "pymaster_progress";

// Default values for a new user
const defaultProgress: UserProgress = {
  wallet: 0,
  streak: 0,
  lastCodingDate: null,
  solvedProblems: [],
  completedLessons: [],
  completedExercises: [],
  unlockedLessons: [],
  xp: 0,
  activityMap: {},
  starsCaught: 0,
  previousStreak: 0,
  streakBrokenDate: null,
  dailyStars: 0,
  lastStarDate: null,
  timeSpent: 0,
};

/**
 * Load progress from localStorage.
 * Falls back to default values if nothing is saved or if data is corrupted.
 */
export function getProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...defaultProgress,
        ...parsed,
        solvedProblems: Array.isArray(parsed.solvedProblems) ? parsed.solvedProblems : defaultProgress.solvedProblems,
        completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : defaultProgress.completedLessons,
        completedExercises: Array.isArray(parsed.completedExercises) ? parsed.completedExercises : defaultProgress.completedExercises,
        unlockedLessons: Array.isArray(parsed.unlockedLessons) ? parsed.unlockedLessons : defaultProgress.unlockedLessons,
      };
    }
  } catch {}
  return { ...defaultProgress };
}

/**
 * Save progress to localStorage.
 * Called whenever progress changes (via ProgressContext).
 */
export function saveProgress(progress: UserProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// --- Activity Recording ---

export interface ActivityResult {
  progress: UserProgress; // Updated progress after recording activity
  streakMilestone?: 7 | 14 | 30 | 100; // If user just hit a milestone
}

/**
 * Record a coding activity for today.
 * - Increments the activity count for today
 * - Updates streak: +1 if consecutive, reset to 1 if gap
 * - Returns any streak milestone hit (7, 14, 30, 100 days)
 */
export function recordActivity(progress: UserProgress): ActivityResult {
  // Use local date (not UTC) to avoid timezone issues breaking streaks
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  
  const updated = { ...progress };
  updated.activityMap = { ...progress.activityMap };
  updated.activityMap[today] = (updated.activityMap[today] || 0) + 1; // Increment today's count

  let streakMilestone: 7 | 14 | 30 | 100 | undefined;

  // Only update streak if today is a new day (not already counted)
  if (progress.lastCodingDate !== today) {
    // Calculate yesterday's date string
    const yesterdayDate = new Date(now);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = `${yesterdayDate.getFullYear()}-${String(yesterdayDate.getMonth() + 1).padStart(2, "0")}-${String(yesterdayDate.getDate()).padStart(2, "0")}`;
    
    const prevStreak = progress.streak;
    
    if (progress.lastCodingDate === yesterday) {
      // User coded yesterday too → continue the streak
      updated.streak = progress.streak + 1;
    } else {
      // Gap detected → streak is broken
      if (progress.streak > 1) {
        // Save the broken streak for possible recovery
        updated.previousStreak = progress.streak;
        updated.streakBrokenDate = today;
      }
      updated.streak = 1; // Start fresh
    }
    updated.lastCodingDate = today;

    // Check if we just crossed a milestone (7, 14, 30, or 100 days)
    const milestones: (7 | 14 | 30 | 100)[] = [7, 14, 30, 100];
    for (const m of milestones) {
      if (prevStreak < m && updated.streak >= m) {
        streakMilestone = m;
        break;
      }
    }
  }

  return { progress: updated, streakMilestone };
}

/**
 * Get a title based on streak length.
 * Used in the dashboard and navbar to show user rank.
 */
export function getStreakTitle(streak: number): string {
  if (streak >= 100) return "Python Master";
  if (streak >= 30) return "Dedicated Coder";
  if (streak >= 7) return "Python Explorer";
  return "Python Beginner";
}

/**
 * Get trophy info based on how many stars the user has caught.
 * Returns the current trophy emoji, title, and how many stars until the next tier.
 */
export function getTrophyForStars(stars: number): { emoji: string; title: string; next: number } {
  if (stars >= 2000) return { emoji: "🐍", title: "Python Trophy", next: 0 };
  if (stars >= 1000) return { emoji: "🐉", title: "Dragon Master", next: 2000 };
  if (stars >= 500) return { emoji: "👑", title: "Legendary Crown", next: 1000 };
  if (stars >= 350) return { emoji: "🌟", title: "Supernova", next: 500 };
  if (stars >= 200) return { emoji: "💎", title: "Diamond", next: 350 };
  if (stars >= 100) return { emoji: "🏆", title: "Gold", next: 200 };
  if (stars >= 50) return { emoji: "🥈", title: "Silver", next: 100 };
  if (stars >= 20) return { emoji: "🥉", title: "Bronze", next: 50 };
  return { emoji: "⭐", title: "Star Catcher", next: 20 };
}

/**
 * Get wallet reward amount based on problem difficulty.
 * Harder problems pay more virtual currency.
 */
export function getRewardForDifficulty(difficulty: string): number {
  switch (difficulty) {
    case "basic": return 5;
    case "junior": return 10;
    case "intermediate": return 25;
    case "advanced": return 50;
    case "expert": return 100;
    default: return 5;
  }
}

/**
 * Calculate the cost to recover a broken streak.
 * Longer streaks cost more to recover (they're more valuable).
 */
export function getStreakRecoveryCost(previousStreak: number): number {
  if (previousStreak >= 100) return 150;
  if (previousStreak >= 30) return 75;
  if (previousStreak >= 14) return 40;
  if (previousStreak >= 7) return 20;
  return 10;
}

/**
 * Check if the user can recover their broken streak.
 * Recovery is only possible on the same day the streak was broken.
 */
export function canRecoverStreak(progress: UserProgress): boolean {
  if (!progress.streakBrokenDate || progress.previousStreak < 2) return false;
  const today = new Date().toISOString().split("T")[0];
  return progress.streakBrokenDate === today;
}

/**
 * Attempt to recover a broken streak by spending wallet money.
 * Returns the updated progress if successful, or null if not possible.
 */
export function recoverStreak(progress: UserProgress): UserProgress | null {
  if (!canRecoverStreak(progress)) return null;
  const cost = getStreakRecoveryCost(progress.previousStreak);
  if (progress.wallet < cost) return null;
  
  return {
    ...progress,
    wallet: progress.wallet - cost, // Deduct the recovery cost
    streak: progress.previousStreak + 1, // Restore streak + 1 for today
    previousStreak: 0, // Clear recovery data
    streakBrokenDate: null,
  };
}
