import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

type Variant = "day" | "night" | "dawn" | "twilight";

function pickVariant(theme: "light" | "dark", clockIsNight: boolean): Variant {
  // Keep UI theme consistent but tint the ocean by clock.
  if (theme === "light") return clockIsNight ? "dawn" : "day";
  return clockIsNight ? "night" : "twilight";
}

export function OceanVideoBackground() {
  const { theme } = useTheme();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [clockIsNight, setClockIsNight] = useState(() => {
    const hour = new Date().getHours();
    return hour < 6 || hour >= 18;
  });
  const [hasVideoError, setHasVideoError] = useState(false);

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

  const variant = useMemo(() => pickVariant(theme, clockIsNight), [clockIsNight, theme]);

  // Video files you can add (see `public/bg/README.txt`):
  // - /bg/ocean.webm + /bg/ocean.mp4 (fallback)
  // - optionally: /bg/ocean-day.* and /bg/ocean-night.*
  const baseName = clockIsNight ? "ocean-night" : "ocean-day";
  const webmPrimary = `/bg/${baseName}.webm`;
  const mp4Primary = `/bg/${baseName}.mp4`;
  const webmFallback = "/bg/ocean.webm";
  const mp4Fallback = "/bg/ocean.mp4";

  const overlay = useMemo(() => {
    if (variant === "day") {
      return "radial-gradient(ellipse_at_50%_10%,rgba(125,211,252,0.22),transparent_58%),radial-gradient(ellipse_at_20%_30%,rgba(34,211,238,0.14),transparent_60%),linear-gradient(to_bottom,rgba(255,255,255,0.04),rgba(2,6,23,0.90))";
    }
    if (variant === "dawn") {
      return "radial-gradient(ellipse_at_50%_8%,rgba(251,191,36,0.14),transparent_55%),radial-gradient(ellipse_at_30%_22%,rgba(56,189,248,0.12),transparent_60%),linear-gradient(to_bottom,rgba(2,6,23,0.86),rgba(2,6,23,0.96))";
    }
    if (variant === "twilight") {
      return "radial-gradient(ellipse_at_55%_10%,rgba(56,189,248,0.12),transparent_58%),radial-gradient(ellipse_at_20%_30%,rgba(34,211,238,0.10),transparent_60%),linear-gradient(to_bottom,rgba(15,23,42,0.88),rgba(2,6,23,0.97))";
    }
    return "radial-gradient(ellipse_at_50%_12%,rgba(56,189,248,0.10),transparent_58%),radial-gradient(ellipse_at_20%_30%,rgba(34,211,238,0.08),transparent_60%),linear-gradient(to_bottom,rgba(2,6,23,0.92),rgba(2,6,23,0.985))";
  }, [variant]);

  const videoFilter =
    variant === "day"
      ? "saturate(1.05) contrast(1.02) brightness(1.02)"
      : variant === "dawn"
        ? "saturate(1.02) contrast(1.02) brightness(0.92)"
        : variant === "twilight"
          ? "saturate(1.02) contrast(1.04) brightness(0.82)"
          : "saturate(1.00) contrast(1.05) brightness(0.72)";

  // If the user prefers reduced motion, do not load or autoplay background video at all.
  // The CSS ocean background stays as the fallback.
  if (reducedMotion) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-background">
      {/* Fallback base even if video fails */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse_at_50%_15%,rgba(56,189,248,0.14),transparent_58%),linear-gradient(to_bottom,rgba(2,6,23,0.92),rgba(2,6,23,0.99))",
        }}
      />

      {!hasVideoError ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          onError={() => setHasVideoError(true)}
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
          disableRemotePlayback
          style={{
            filter: videoFilter,
            // Video is intentionally subtle: 5-8% opacity.
            opacity: variant === "day" ? 0.08 : 0.06,
          }}
        >
          {/* Try day/night-specific first, then generic fallback files */}
          <source src={webmPrimary} type="video/webm" />
          <source src={mp4Primary} type="video/mp4" />
          <source src={webmFallback} type="video/webm" />
          <source src={mp4Fallback} type="video/mp4" />
        </video>
      ) : null}

      {/* Day/night tint overlay */}
      <div className="absolute inset-0 mix-blend-screen" style={{ background: overlay, opacity: 0.55 }} />

      {/* Soft vignette */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 35%, transparent 0%, rgba(2,6,23,0.65) 78%)" }} />
    </div>
  );
}
