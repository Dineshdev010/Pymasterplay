import { useState, useEffect } from "react";
import { Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LivePulseProps {
  className?: string;
}

/**
 * LivePulse Component
 * Displays a glowing "Live" indicator with a fluctuating number of masters coding.
 * Provides a sense of community and real-time activity.
 */
export function LivePulse({ className = "" }: LivePulseProps) {
  const [count, setCount] = useState(1245);

  // Simulate real-time fluctuation around a base number
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        return prev + change;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      
      <div className="flex items-center gap-1.5">
        <Users className="w-3.5 h-3.5 text-emerald-500" />
        <AnimatePresence mode="wait">
          <motion.span
            key={count}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 tabular-nums"
          >
            {count.toLocaleString()}
          </motion.span>
        </AnimatePresence>
        <span className="text-[10px] font-medium text-emerald-600/70 dark:text-emerald-400/70 uppercase tracking-wider">
          Masters Coding
        </span>
      </div>
    </div>
  );
}
