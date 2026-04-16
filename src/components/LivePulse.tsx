import { useEffect, useMemo, useState } from "react";
import { Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DEFAULT_ROTATION_WINDOW_MS, getCurrentMetricWindow, getSharedLiveCodersCount } from "@/lib/liveMetrics";

interface LivePulseProps {
  className?: string;
}

export function LivePulse({ className = "" }: LivePulseProps) {
  const initialWindow = useMemo(() => getCurrentMetricWindow(DEFAULT_ROTATION_WINDOW_MS), []);
  const [windowKey, setWindowKey] = useState(initialWindow);

  useEffect(() => {
    const syncWindow = () => setWindowKey(getCurrentMetricWindow(DEFAULT_ROTATION_WINDOW_MS));
    const interval = setInterval(syncWindow, 5000);

    return () => clearInterval(interval);
  }, []);

  const count = getSharedLiveCodersCount(windowKey);

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-slate-950/80 px-3 py-1.5 shadow-[0_12px_30px_rgba(16,185,129,0.12)] backdrop-blur-md ${className}`}>
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </span>
      <div className="flex items-center gap-1.5">
        <Users className="h-3.5 w-3.5 text-emerald-400" />
        <AnimatePresence mode="wait">
          <motion.span
            key={count}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-[11px] font-semibold text-white tabular-nums"
          >
            {count.toLocaleString()}
          </motion.span>
        </AnimatePresence>
        <span className="h-1 w-1 rounded-full bg-emerald-400/70" />
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-100/75">
          Masters Coding
        </span>
      </div>
    </div>
  );
}
