import { motion } from "framer-motion";
import { getEarnedBadges } from "@/lib/badges";
import { useProgress } from "@/contexts/ProgressContext";
import { problems } from "@/data/problems";
import { Lock } from "lucide-react";

export function BadgeDisplay() {
  const { progress } = useProgress();
  const badgeStatuses = getEarnedBadges(progress.solvedProblems, problems);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
        🏅 Completion Badges
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {badgeStatuses.map(({ badge, earned, progress: solved, total }, i) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
              earned
                ? "bg-primary/10 border-primary/30 shadow-lg shadow-primary/10"
                : "bg-card border-border opacity-60"
            }`}
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20">
              <img
                src={badge.image}
                alt={badge.title}
                className={`w-full h-full object-contain ${earned ? "" : "grayscale"}`}
              />
              {!earned && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/40 rounded-full">
                  <Lock className="w-5 h-5 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-foreground">{badge.title}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {earned ? "✅ Earned!" : `${solved}/${total} solved`}
              </p>
              {!earned && (
                <div className="w-full h-1.5 bg-secondary rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${total > 0 ? (solved / total) * 100 : 0}%` }}
                  />
                </div>
              )}
            </div>
            {earned && (
              <motion.div
                className="absolute -top-1 -right-1 text-lg"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
