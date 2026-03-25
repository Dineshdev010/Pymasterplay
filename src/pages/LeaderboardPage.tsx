// ============================================================
// LEADERBOARD PAGE — src/pages/LeaderboardPage.tsx
// Displays a competitive leaderboard with sortable columns,
// trophy tiers, and the current user highlighted.
// ============================================================
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, Flame, Code, Wallet, Medal, Crown, Award, Star, Lock } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { getTrophyForStars } from "@/lib/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { readLeaderboardCache, writeLeaderboardCache, type CachedLeaderboardRow } from "@/lib/leaderboardCache";

type SortKey = "xp" | "problemsSolved" | "streak" | "wallet";
type LeaderboardWindow = "all-time" | "weekly";

interface LeaderboardUser {
  userId?: string;
  rank: number;
  name: string;
  avatarLabel: string;
  avatarUrl?: string;
  xp: number;
  problemsSolved: number;
  streak: number;
  wallet: number;
  emoji?: string;
  isYou?: boolean;
  weeklyMomentum: number;
}

interface LeaderboardRow {
  user_id: string;
  display_name: string;
  avatar_url?: string;
  xp: number;
  solved_count: number;
  streak: number;
  wallet: number;
}

function mapLeaderboardRows(rows: LeaderboardRow[], currentUserId?: string, currentEmoji?: string) {
  return rows.map((row) => ({
    userId: row.user_id,
    rank: 0,
    name: row.display_name,
    avatarLabel: row.display_name.slice(0, 2).toUpperCase(),
    avatarUrl: row.avatar_url || "",
    xp: row.xp,
    problemsSolved: row.solved_count,
    streak: row.streak,
    wallet: row.wallet,
    emoji: row.user_id === currentUserId ? currentEmoji : undefined,
    isYou: row.user_id === currentUserId,
    weeklyMomentum: row.streak * 20 + Math.min(row.solved_count, 20) * 8 + Math.floor(row.xp / 150),
  }));
}

// Trophy tier definitions with thresholds (8 tiers)
const trophyTiers = [
  { emoji: "🐍", title: "Python Trophy", minStars: 2000, color: "text-streak-green", bg: "bg-streak-green/10 border-streak-green/30", desc: "Catch 2000 stars", legendary: true },
  { emoji: "🐉", title: "Dragon Master", minStars: 1000, color: "text-destructive", bg: "bg-destructive/10 border-destructive/30", desc: "Catch 1000 stars" },
  { emoji: "👑", title: "Legendary Crown", minStars: 500, color: "text-streak-green", bg: "bg-streak-green/10 border-streak-green/30", desc: "Catch 500 stars" },
  { emoji: "🌟", title: "Supernova", minStars: 350, color: "text-expert-purple", bg: "bg-expert-purple/10 border-expert-purple/30", desc: "Catch 350 stars" },
  { emoji: "💎", title: "Diamond", minStars: 200, color: "text-primary", bg: "bg-primary/10 border-primary/30", desc: "Catch 200 stars" },
  { emoji: "🏆", title: "Gold", minStars: 100, color: "text-python-yellow", bg: "bg-python-yellow/10 border-python-yellow/30", desc: "Catch 100 stars" },
  { emoji: "🥈", title: "Silver", minStars: 50, color: "text-muted-foreground", bg: "bg-muted/10 border-muted-foreground/30", desc: "Catch 50 stars" },
  { emoji: "🥉", title: "Bronze", minStars: 20, color: "text-reward-gold", bg: "bg-reward-gold/10 border-reward-gold/30", desc: "Catch 20 stars" },
];

const rankIcons: Record<number, React.ReactNode> = {
  1: <Crown className="w-5 h-5 text-python-yellow" />,
  2: <Medal className="w-5 h-5 text-muted-foreground" />,
  3: <Award className="w-5 h-5 text-reward-gold" />,
};

const rankBg: Record<number, string> = {
  1: "bg-python-yellow/5 border-python-yellow/20",
  2: "bg-muted/30 border-muted-foreground/20",
  3: "bg-reward-gold/5 border-reward-gold/20",
};

function getNextWeeklyResetLabel() {
  const now = new Date();
  const nextReset = new Date(now);
  const day = now.getDay();
  const daysUntilMonday = day === 1 ? 7 : (8 - day) % 7;
  nextReset.setDate(now.getDate() + daysUntilMonday);
  nextReset.setHours(0, 0, 0, 0);
  return nextReset.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function LeaderboardPage() {
  const { progress } = useProgress();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortKey>("xp");
  const [windowMode, setWindowMode] = useState<LeaderboardWindow>("all-time");
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  // Memoize user trophy to prevent unnecessary recalculations
  const userTrophy = getTrophyForStars(progress?.starsCaught || 0);
  const userEquippedEmoji = typeof localStorage !== "undefined" ? (localStorage.getItem("pymaster_selected_emoji") || "") : "";

  useEffect(() => {
    let active = true;
    setLoading(true);

    const cachedRows = readLeaderboardCache();
    if (cachedRows?.length) {
      setUsers(mapLeaderboardRows(cachedRows as LeaderboardRow[], user?.uid, userEquippedEmoji));
      setLoadError(null);
      setLoading(false);
    }

    supabase.rpc("get_leaderboard").then(({ data, error }) => {
      if (!active) return;

      if (error) {
        console.error("Leaderboard load failed", error);
        if (!cachedRows?.length) {
          setUsers([]);
        }
        setLoadError("Leaderboard data is unavailable right now.");
        setLoading(false);
        return;
      }

      setLoadError(null);
      const rows = ((data || []) as CachedLeaderboardRow[]);
      writeLeaderboardCache(rows);
      const nextUsers = mapLeaderboardRows(rows as LeaderboardRow[], user?.uid, userEquippedEmoji);

      setUsers(nextUsers);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [user?.uid, userEquippedEmoji]);

  const allUsers = useMemo(() => {
    const fallbackName = profile?.displayName || localStorage.getItem("pymaster_name") || "You";
    const currentUserEntry: LeaderboardUser = {
      userId: user?.uid,
      rank: 0,
      name: fallbackName,
      avatarLabel: fallbackName.slice(0, 2).toUpperCase(),
      avatarUrl: profile?.avatarUrl || "",
      xp: progress?.xp || 0,
      problemsSolved: progress?.solvedProblems?.length || 0,
      streak: progress?.streak || 0,
      wallet: progress?.wallet || 0,
      emoji: userEquippedEmoji,
      isYou: true,
      weeklyMomentum: (progress?.streak || 0) * 20 + Math.min(progress?.solvedProblems?.length || 0, 20) * 8 + Math.floor((progress?.xp || 0) / 150),
    };

    const sourceUsers = user
      ? [currentUserEntry, ...users.filter((entry) => entry.userId !== user.uid)]
      : users;

    const getMetricValue = (entry: LeaderboardUser) => {
      if (windowMode === "weekly") {
        if (sortBy === "xp") return entry.weeklyMomentum;
        if (sortBy === "problemsSolved") return Math.min(entry.problemsSolved, 20);
        if (sortBy === "wallet") return Math.min(entry.wallet, 250);
      }

      return entry[sortBy] as number;
    };

    return [...sourceUsers]
      .sort((a, b) => getMetricValue(b) - getMetricValue(a) || b.streak - a.streak || b.xp - a.xp)
      .map((entry, index) => ({ ...entry, rank: index + 1 }));
  }, [profile?.avatarUrl, profile?.displayName, progress?.solvedProblems?.length, progress?.streak, progress?.wallet, progress?.xp, sortBy, user, userEquippedEmoji, users, windowMode]);

  const sortOptions: { key: SortKey; label: string; icon: typeof Trophy }[] = [
    { key: "xp", label: "XP", icon: Trophy },
    { key: "problemsSolved", label: "Problems", icon: Code },
    { key: "streak", label: "Streak", icon: Flame },
    { key: "wallet", label: "Wallet", icon: Wallet },
  ];
  const activeSortLabel = sortBy === "xp" && windowMode === "weekly"
    ? "Momentum"
    : sortOptions.find((option) => option.key === sortBy)?.label || "XP";
  const nextWeeklyResetLabel = getNextWeeklyResetLabel();

  const hasLeaderboardData = allUsers.length > 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Trophy className="w-6 h-6 text-python-yellow" /> Leaderboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {loading
              ? "Loading real rankings..."
              : windowMode === "all-time"
                ? "All-time rankings from real learner profiles"
                : "Weekly view uses current momentum: streak, recent solving pace, and active progress"}
          </p>
          {windowMode === "weekly" && !loading && (
            <p className="text-xs text-primary mt-1">Weekly board resets on {nextWeeklyResetLabel}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-1.5 bg-surface-1 border border-border rounded-lg p-1 overflow-x-auto scrollbar-none">
            {(["all-time", "weekly"] as LeaderboardWindow[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setWindowMode(mode)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                  windowMode === mode ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {mode === "all-time" ? "All-Time" : "Weekly"}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5 bg-surface-1 border border-border rounded-lg p-1 overflow-x-auto scrollbar-none">
            {sortOptions.map(opt => (
              <button
                key={opt.key}
                onClick={() => setSortBy(opt.key)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  sortBy === opt.key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <opt.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {windowMode === "weekly" && opt.key === "xp" ? "Momentum" : opt.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trophy Tiers - Aspiration Section */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
          <Star className="w-5 h-5 text-python-yellow fill-python-yellow" /> Trophy Tiers
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          You have <span className="text-python-yellow font-bold">{progress.starsCaught}</span> stars — 
          Current tier: <span className="font-bold text-foreground">{userTrophy.emoji} {userTrophy.title}</span>
          {userTrophy.next > 0 && <> • Next at <span className="text-primary font-bold">{userTrophy.next}</span> stars</>}
        </p>
        {/* Python Trophy - legendary full-width banner */}
        {(() => {
          const pythonTier = trophyTiers[0];
          const achieved = progress.starsCaught >= pythonTier.minStars;
          const progressPct = Math.min((progress.starsCaught / pythonTier.minStars) * 100, 100);
          return (
            <div className={`relative rounded-xl p-4 border mb-3 transition-all duration-300 overflow-hidden ${
              achieved
                ? "bg-streak-green/10 border-streak-green ring-2 ring-streak-green/50"
                : "bg-surface-1 border-border"
            }`}>
              {achieved && <div className="absolute inset-0 bg-gradient-to-r from-streak-green/5 via-python-yellow/5 to-streak-green/5 animate-pulse pointer-events-none" />}
              <div className="relative flex items-center gap-4">
                <div className={`text-5xl ${achieved ? "animate-bounce" : "grayscale opacity-40"}`}>🐍</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-base font-extrabold ${achieved ? "text-streak-green" : "text-muted-foreground"}`}>Python Trophy</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-streak-green/20 text-streak-green border border-streak-green/40 uppercase tracking-wider">Ultimate</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">The highest honour — catch 2000 stars to become a true Python Master</div>
                  <div className="mt-2 h-2 bg-surface-2 rounded-full overflow-hidden w-full max-w-xs">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${achieved ? "bg-streak-green" : "bg-primary/60"}`}
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-1">
                    {achieved ? "✅ Achieved — You are a Python Master!" : `${progress.starsCaught} / 2000 stars`}
                  </div>
                </div>
                {!achieved && <Lock className="w-5 h-5 text-muted-foreground/40 shrink-0" />}
              </div>
            </div>
          );
        })()}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {trophyTiers.slice(1).map(tier => {
            const achieved = progress.starsCaught >= tier.minStars;
            const progressPct = Math.min((progress.starsCaught / tier.minStars) * 100, 100);
            return (
              <div
                key={tier.title}
                className={`relative rounded-xl p-5 text-center border transition-all duration-300 ${
                  achieved
                    ? `${tier.bg} ring-2 ring-offset-1 ring-offset-background ring-primary/40 scale-[1.03]`
                    : "bg-surface-1 border-border"
                }`}
              >
                {!achieved && (
                  <div className="absolute top-2 right-2">
                    <Lock className="w-3.5 h-3.5 text-muted-foreground/50" />
                  </div>
                )}
                <div className={`text-4xl mb-2 ${achieved ? "" : "grayscale opacity-40"}`}>{tier.emoji}</div>
                <div className={`text-sm font-bold ${achieved ? tier.color : "text-muted-foreground"}`}>{tier.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{tier.desc}</div>
                <div className="mt-3 h-1.5 bg-surface-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${achieved ? "bg-streak-green" : "bg-primary/60"}`}
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <div className="text-[10px] text-muted-foreground mt-1">
                  {achieved ? "✅ Achieved" : `${progress.starsCaught}/${tier.minStars}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {!loading && !hasLeaderboardData && (
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground">Leaderboard Unavailable</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {loadError || "No leaderboard profiles are available yet."}
          </p>
          <div className="mt-4">
            <button
              onClick={() => navigate("/complete-profile")}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Complete Profile
            </button>
          </div>
        </div>
      )}

      {/* Category Leader Spotlight */}
      {hasLeaderboardData && (() => {
        const activeLeader = allUsers[0];
        return (
          <div
            key={`${windowMode}-${sortBy}`}
            className="bg-card border border-border rounded-xl p-6 mb-8 relative overflow-hidden isolate group shadow-sm transition-opacity duration-300"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-bl-full -mr-10 -mt-10 transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none" />
            <div className="flex items-center gap-5 sm:gap-6 relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-2xl sm:text-3xl font-bold text-primary-foreground shrink-0 shadow-lg shadow-primary/30 ring-4 ring-primary/20">
                <Avatar className="h-full w-full">
                  {activeLeader.avatarUrl ? <AvatarImage src={activeLeader.avatarUrl} alt={activeLeader.name} className="object-cover" /> : null}
                  <AvatarFallback className="bg-transparent text-2xl sm:text-3xl font-bold text-primary-foreground">
                    {activeLeader.avatarLabel}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[10px] sm:text-xs font-bold text-primary-foreground bg-primary px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Top {windowMode === "weekly" ? `Weekly ${activeSortLabel}` : activeSortLabel}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-foreground truncate mt-1">
                  {activeLeader.name} {activeLeader.isYou && <span className="text-sm font-bold text-python-yellow ml-2 bg-python-yellow/10 px-2 py-0.5 rounded-full">It's You!</span>}
                </h2>
                <div className="text-muted-foreground mt-1.5 font-medium flex items-center gap-2">
                  <span className="text-foreground text-lg sm:text-xl font-bold font-mono bg-surface-2 px-2 py-0.5 rounded-md">
                    {sortBy === "xp" && windowMode === "weekly" ? activeLeader.weeklyMomentum : activeLeader[sortBy]}
                  </span>
                  {sortBy === "streak" && "🔥 Daily Streak"}
                  {sortBy === "xp" && windowMode === "weekly" && "Weekly Momentum"}
                  {sortBy === "xp" && windowMode === "all-time" && "XP Earned"}
                  {sortBy === "problemsSolved" && "Problems Solved"}
                  {sortBy === "wallet" && "Coins in Wallet"}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Your Stats Card */}
      {hasLeaderboardData && (
      <div className="bg-card border border-border rounded-xl overflow-hidden isolate mb-8 relative z-10">
        {/* Mobile card view */}
        <div className="sm:hidden">
          {allUsers.map(user => (
            <div key={`mobile-${user.rank}`} className={`p-4 mb-3 rounded-xl border transition-all duration-200 ${user.isYou ? "bg-primary/20 border-primary shadow-sm shadow-primary/20" : "bg-surface-1 border-border"}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 bg-primary text-primary-foreground">
                  <Avatar className="h-full w-full">
                    {user.avatarUrl ? <AvatarImage src={user.avatarUrl} alt={user.name} className="object-cover" /> : null}
                    <AvatarFallback className="bg-transparent text-sm font-bold text-primary-foreground">
                      {user.avatarLabel}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <span className="text-sm font-bold text-primary">{user.name}{user.emoji && ` ${user.emoji}`}{user.isYou && ` ${userTrophy.emoji}`}</span>
                  <div className="text-xs text-muted-foreground">Rank #{user.rank}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-surface-1 rounded-lg p-2.5 text-center">
                  <div className={`text-sm font-mono font-semibold ${sortBy === "xp" ? "text-primary" : "text-foreground"}`}>{user.xp.toLocaleString()}</div>
                  <div className="text-[10px] text-muted-foreground">XP</div>
                </div>
                <div className="bg-surface-1 rounded-lg p-2.5 text-center">
                  <div className={`text-sm font-mono font-semibold ${sortBy === "problemsSolved" ? "text-primary" : "text-foreground"}`}>{user.problemsSolved}</div>
                  <div className="text-[10px] text-muted-foreground">Solved</div>
                </div>
                <div className="bg-surface-1 rounded-lg p-2.5 text-center">
                  <div className={`text-sm font-mono font-semibold ${sortBy === "streak" ? "text-primary" : "text-foreground"}`}>{user.streak}🔥</div>
                  <div className="text-[10px] text-muted-foreground">Streak</div>
                </div>
                <div className="bg-surface-1 rounded-lg p-2.5 text-center">
                  <div className={`text-sm font-mono font-semibold ${sortBy === "wallet" ? "text-primary" : "text-foreground"}`}>${user.wallet}</div>
                  <div className="text-[10px] text-muted-foreground">Wallet</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Desktop table view */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-[3rem_1fr_6rem_6rem_6rem_6rem] gap-2 px-4 py-2.5 border-b border-border bg-surface-1 text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
            <span>#</span>
            <span>User</span>
            <span className="text-right">XP</span>
            <span className="text-right">Solved</span>
            <span className="text-right">Streak</span>
            <span className="text-right">Wallet</span>
          </div>
          {allUsers.map(user => (
            <div
              key={`desktop-${user.rank}`}
              className={`grid grid-cols-[3rem_1fr_6rem_6rem_6rem_6rem] gap-2 px-4 py-3 border-b items-center overflow-hidden transition-colors duration-200 ${
                user.isYou ? "bg-primary/15 border-primary shadow-sm relative z-10" : "bg-surface-1 border-border last:border-0"
              }`}
            >
            <span className="text-sm font-medium text-muted-foreground">
              {rankIcons[user.rank] || user.rank}
            </span>
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-primary text-primary-foreground">
                <Avatar className="h-full w-full">
                  {user.avatarUrl ? <AvatarImage src={user.avatarUrl} alt={user.name} className="object-cover" /> : null}
                  <AvatarFallback className="bg-transparent text-xs font-bold text-primary-foreground">
                    {user.avatarLabel}
                  </AvatarFallback>
                </Avatar>
              </div>
              <span className="text-sm font-bold text-primary truncate">
                {user.name}{user.emoji && ` ${user.emoji}`}{user.isYou && ` ${userTrophy.emoji}`}
              </span>
            </div>
            <span className={`text-sm text-right font-mono ${sortBy === "xp" ? "text-primary font-semibold" : "text-muted-foreground"}`}>
              {user.xp.toLocaleString()}
            </span>
            <span className={`text-sm text-right font-mono ${sortBy === "problemsSolved" ? "text-primary font-semibold" : "text-muted-foreground"}`}>
              {user.problemsSolved}
            </span>
            <span className={`text-sm text-right font-mono ${sortBy === "streak" ? "text-primary font-semibold" : "text-muted-foreground"}`}>
              {user.streak}🔥
            </span>
            <span className={`text-sm text-right font-mono ${sortBy === "wallet" ? "text-primary font-semibold" : "text-muted-foreground"}`}>
              ${user.wallet}
            </span>
          </div>
        ))}
        </div>
      </div>
      )}

      {/* How to climb */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">🚀 How to Climb</h2>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          {[
            { emoji: "💻", title: "Solve Problems", desc: "Earn $5–$100 per problem based on difficulty", link: "/problems" },
            { emoji: "🔥", title: "Build Streaks", desc: "Code daily to increase your streak counter", link: "/compiler" },
            { emoji: "⭐", title: "Catch Stars", desc: "Answer riddles on the home page to unlock trophies", link: "/" },
            { emoji: "📚", title: "Complete Lessons", desc: "Finish exercises to earn +25 XP and $5 each", link: "/learn" },
          ].map(item => (
            <button
              key={item.title}
              onClick={() => navigate(item.link)}
              className="flex items-start gap-3 p-3 rounded-lg bg-surface-1 border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 text-left group cursor-pointer w-full"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">{item.emoji}</span>
              <div>
                <div className="font-medium text-foreground">{item.title}</div>
                <div className="text-xs text-muted-foreground">{item.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
