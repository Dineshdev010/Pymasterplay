import { useEffect, useMemo, useState } from "react";
import { Activity } from "lucide-react";
import { DEFAULT_ROTATION_WINDOW_MS, getCurrentMetricWindow, getSharedLiveCodersCount } from "@/lib/liveMetrics";

type ActiveUsersBannerMode = "fixed" | "inline";

export function ActiveUsersBanner({ mode = "fixed" }: { mode?: ActiveUsersBannerMode }) {
  const initialWindow = useMemo(() => getCurrentMetricWindow(DEFAULT_ROTATION_WINDOW_MS), []);
  const [windowKey, setWindowKey] = useState(initialWindow);

  useEffect(() => {
    const syncWindow = () => setWindowKey(getCurrentMetricWindow(DEFAULT_ROTATION_WINDOW_MS));
    const interval = setInterval(syncWindow, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeUsers = getSharedLiveCodersCount(windowKey);

  const pill = (
    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-slate-950/80 px-3 py-1.5 text-[11px] shadow-[0_12px_30px_rgba(16,185,129,0.12)] backdrop-blur-md">
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </span>
      <Activity className="h-3.5 w-3.5 text-emerald-400" />
      <span className="font-semibold text-white tabular-nums">{activeUsers.toLocaleString()}</span>
      <span className="h-1 w-1 rounded-full bg-emerald-400/70" />
      <span className="text-emerald-100/75">active</span>
    </div>
  );

  if (mode === "inline") return pill;

  return (
    <div className="fixed left-2 top-[calc(env(safe-area-inset-top)+4.2rem)] z-[998] sm:left-4 sm:top-[4.15rem] max-w-[calc(100vw-1rem)]">
      {pill}
    </div>
  );
}
