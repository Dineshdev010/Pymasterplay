const LEADERBOARD_CACHE_KEY = "pymaster_leaderboard_cache_v1";
const LEADERBOARD_CACHE_TTL_MS = 2 * 60 * 1000;

export interface CachedLeaderboardRow {
  user_id: string;
  display_name: string;
  avatar_url?: string;
  xp: number;
  solved_count: number;
  streak: number;
  wallet: number;
}

interface LeaderboardCacheShape {
  savedAt: number;
  rows: CachedLeaderboardRow[];
}

export function readLeaderboardCache(): CachedLeaderboardRow[] | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(LEADERBOARD_CACHE_KEY) || "null") as LeaderboardCacheShape | null;
    if (!parsed || !Array.isArray(parsed.rows) || typeof parsed.savedAt !== "number") {
      return null;
    }

    if (Date.now() - parsed.savedAt > LEADERBOARD_CACHE_TTL_MS) {
      window.localStorage.removeItem(LEADERBOARD_CACHE_KEY);
      return null;
    }

    return parsed.rows;
  } catch {
    return null;
  }
}

export function writeLeaderboardCache(rows: CachedLeaderboardRow[]): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const payload: LeaderboardCacheShape = {
      savedAt: Date.now(),
      rows,
    };
    window.localStorage.setItem(LEADERBOARD_CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore cache write failures to keep the UI resilient.
  }
}
