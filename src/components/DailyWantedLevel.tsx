import { useProgress } from "@/contexts/ProgressContext";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export function DailyWantedLevel() {
  const { progress } = useProgress();
  
  // Create an array of 3 booleans depending on how many stars the user has
  const starsArray = [
    progress.dailyStars >= 1,
    progress.dailyStars >= 2,
    progress.dailyStars >= 3
  ];

  return (
    <div className="fixed top-24 right-4 sm:right-8 z-50 flex flex-col items-end gap-1 pointer-events-none">
      <div className="flex gap-1.5 p-2 sm:p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl">
        {starsArray.map((isCaught, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Star 
              className={`w-6 h-6 sm:w-8 sm:h-8 transition-all duration-500 ${
                isCaught 
                  ? "fill-yellow-400 text-yellow-500 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" 
                  : "fill-transparent text-white/30"
              }`}
            />
          </motion.div>
        ))}
      </div>
      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/60 drop-shadow-md pr-1">
        Daily Tasks
      </span>
    </div>
  );
}
