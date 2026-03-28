import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

type Variant = "day" | "night" | "twilight";

export function SkyBackground() {
  const { theme } = useTheme();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [clockIsNight, setClockIsNight] = useState(() => {
    const hour = new Date().getHours();
    return hour < 6 || hour >= 18;
  });

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const updatePhase = () => {
      const hour = new Date().getHours();
      setClockIsNight(hour < 6 || hour >= 18);
    };
    updatePhase();
    const interval = window.setInterval(updatePhase, 2 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, []);

  const variant: Variant = useMemo(() => {
    if (clockIsNight) return "night";
    // If the UI is forced to dark theme during day, keep the sky a little calmer.
    return theme === "dark" ? "twilight" : "day";
  }, [clockIsNight, theme]);

  const base = useMemo(() => {
    if (variant === "day") {
      return "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.0) 55%), linear-gradient(180deg, rgba(125,211,252,0.92) 0%, rgba(147,197,253,0.55) 38%, rgba(224,242,254,0.18) 72%, rgba(2,6,23,0.86) 100%)";
    }
    if (variant === "twilight") {
      return "radial-gradient(ellipse at 55% 0%, rgba(56,189,248,0.22) 0%, rgba(56,189,248,0.0) 55%), linear-gradient(180deg, rgba(2,6,23,0.94) 0%, rgba(15,23,42,0.92) 45%, rgba(2,6,23,0.98) 100%)";
    }
    return "radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.10) 0%, rgba(56,189,248,0.0) 60%), linear-gradient(180deg, rgba(2,6,23,0.96) 0%, rgba(3,7,18,0.98) 55%, rgba(2,6,23,1) 100%)";
  }, [variant]);

  const glow = useMemo(() => {
    if (variant === "day") {
      return "radial-gradient(circle at 78% 18%, rgba(250,204,21,0.38) 0%, rgba(250,204,21,0.0) 45%)";
    }
    if (variant === "twilight") {
      return "radial-gradient(circle at 72% 18%, rgba(56,189,248,0.16) 0%, rgba(56,189,248,0.0) 48%), radial-gradient(circle at 20% 24%, rgba(168,85,247,0.10) 0%, rgba(168,85,247,0.0) 55%)";
    }
    return "radial-gradient(circle at 22% 20%, rgba(226,232,240,0.18) 0%, rgba(226,232,240,0.0) 46%)";
  }, [variant]);

  const cloudLayer = useMemo(() => {
    // Soft cloud smear pattern. We animate its background-position for movement.
    const alpha = variant === "day" ? 0.20 : variant === "twilight" ? 0.12 : 0.06;
    return `radial-gradient(ellipse at 15% 35%, rgba(255,255,255,${alpha}) 0%, rgba(255,255,255,0) 55%),
radial-gradient(ellipse at 48% 28%, rgba(255,255,255,${alpha * 0.85}) 0%, rgba(255,255,255,0) 58%),
radial-gradient(ellipse at 82% 40%, rgba(255,255,255,${alpha * 0.75}) 0%, rgba(255,255,255,0) 62%)`;
  }, [variant]);

  const starsLayer = useMemo(() => {
    if (variant !== "night") return null;
    return "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.9) 0 1px, transparent 2px), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.85) 0 1px, transparent 2px), radial-gradient(circle at 60% 55%, rgba(255,255,255,0.8) 0 1px, transparent 2px), radial-gradient(circle at 35% 70%, rgba(255,255,255,0.75) 0 1px, transparent 2px)";
  }, [variant]);

  const animateClouds = !reducedMotion;
  const animateTwinkle = !reducedMotion && variant === "night";

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-background">
      {/* Local keyframes so we don't pollute global CSS */}
      <style>
        {`
          @keyframes skyCloudDrift {
            0% { transform: translate3d(-6%, 0, 0) scale(1.02); }
            50% { transform: translate3d(6%, -1.2%, 0) scale(1.03); }
            100% { transform: translate3d(-6%, 0, 0) scale(1.02); }
          }
          @keyframes skyTwinkle {
            0% { opacity: 0.22; }
            50% { opacity: 0.40; }
            100% { opacity: 0.22; }
          }
        `}
      </style>

      {/* Base sky */}
      <div className="absolute inset-0" style={{ background: base }} />

      {/* Sun/Moon glow */}
      <div className="absolute inset-0 mix-blend-screen" style={{ background: glow, opacity: variant === "day" ? 0.95 : 0.7 }} />

      {/* Stars (night only) */}
      {starsLayer ? (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: starsLayer,
            backgroundSize: "520px 420px",
            opacity: 0.28,
            animation: animateTwinkle ? "skyTwinkle 6s ease-in-out infinite" : undefined,
          }}
        />
      ) : null}

      {/* Clouds haze */}
      <div
        className="absolute -inset-12 blur-[2px]"
        style={{
          backgroundImage: cloudLayer,
          backgroundSize: "140% 140%",
          opacity: 1,
          animation: animateClouds ? "skyCloudDrift 46s ease-in-out infinite" : undefined,
        }}
      />

      {/* Soft vignette to keep content readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            variant === "day"
              ? "radial-gradient(circle at 50% 22%, rgba(255,255,255,0.0) 0%, rgba(2,6,23,0.55) 82%)"
              : "radial-gradient(circle at 50% 25%, rgba(255,255,255,0.0) 0%, rgba(2,6,23,0.72) 82%)",
        }}
      />
    </div>
  );
}

