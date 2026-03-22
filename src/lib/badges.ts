// ============================================================
// BADGE SYSTEM — src/lib/badges.ts
// Defines achievement badges that users earn by solving
// all problems in a specific difficulty level.
// ============================================================

// --- Badge Images (imported as ES6 modules for Vite bundling) ---
import badgeBasic from "@/assets/badge-basic.png";
import badgeJunior from "@/assets/badge-junior.png";
import badgeIntermediate from "@/assets/badge-intermediate.png";
import badgeAdvanced from "@/assets/badge-advanced.png";
import badgeExpert from "@/assets/badge-expert.png";

// --- Badge Type Definition ---
export interface Badge {
  id: string; // Unique badge identifier
  title: string; // Display name (e.g., "Basic Python Master")
  difficulty: string; // Matches problem difficulty (e.g., "basic", "junior")
  image: string; // Path to badge image
  description: string; // Short description of how to earn it
}

// --- All Available Badges ---
// One badge per difficulty level — earn it by solving ALL problems in that level
export const badges: Badge[] = [
  { id: "basic", title: "Basic Python Master", difficulty: "basic", image: badgeBasic, description: "Complete all Basic problems" },
  { id: "junior", title: "Junior Developer", difficulty: "junior", image: badgeJunior, description: "Complete all Junior problems" },
  { id: "intermediate", title: "Intermediate Coder", difficulty: "intermediate", image: badgeIntermediate, description: "Complete all Intermediate problems" },
  { id: "advanced", title: "Advanced Engineer", difficulty: "advanced", image: badgeAdvanced, description: "Complete all Advanced problems" },
  { id: "expert", title: "Python Expert", difficulty: "expert", image: badgeExpert, description: "Complete all Expert problems" },
];

/**
 * Check which badges the user has earned.
 * 
 * @param solvedProblems - Array of problem IDs the user has solved
 * @param allProblems - Array of all problems (to count totals per difficulty)
 * @returns Array of badge statuses with earned flag and progress
 */
export function getEarnedBadges(
  solvedProblems: string[],
  allProblems: { id: string; difficulty: string }[]
): { badge: Badge; earned: boolean; progress: number; total: number }[] {
  return badges.map((badge) => {
    // Find all problems that match this badge's difficulty
    const problemsInDifficulty = allProblems.filter((p) => p.difficulty === badge.difficulty);
    // Count how many the user has solved
    const solved = problemsInDifficulty.filter((p) => solvedProblems.includes(p.id));
    return {
      badge,
      earned: solved.length >= problemsInDifficulty.length && problemsInDifficulty.length > 0,
      progress: solved.length, // How many solved
      total: problemsInDifficulty.length, // Total in this difficulty
    };
  });
}
