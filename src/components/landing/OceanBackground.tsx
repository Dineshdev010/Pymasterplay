import { useEffect, useState } from "react";
import { animate, motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export function OceanBackground() {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [clockIsNight, setClockIsNight] = useState(() => {
    const hour = new Date().getHours();
    return hour < 6 || hour >= 18;
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 35, damping: 26, mass: 0.8 });
  const smoothY = useSpring(mouseY, { stiffness: 35, damping: 26, mass: 0.8 });

  const drift = useMotionValue(0);
  const swell = useMotionValue(0);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());

    const onVisibility = () => setIsVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();
    return () => document.removeEventListener("visibilitychange", onVisibility);
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

  useEffect(() => {
    if (reducedMotion) return;
    if (!isVisible) return;
    if ("ontouchstart" in window && navigator.maxTouchPoints > 0) return;

    let ticking = false;
    const onMouseMove = (event: MouseEvent) => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        mouseX.set((event.clientX / window.innerWidth - 0.5) * 12);
        mouseY.set((event.clientY / window.innerHeight - 0.5) * 10);
        ticking = false;
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [isVisible, mouseX, mouseY, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    if (!isVisible) return;

    const driftAnim = animate(drift, 1, { duration: 22, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" });
    const swellAnim = animate(swell, 1, { duration: 12, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" });
    return () => {
      driftAnim.stop();
      swellAnim.stop();
    };
  }, [drift, isVisible, reducedMotion, swell]);

  const cameraX = useTransform(smoothX, (value) => value * 0.18);
  const cameraY = useTransform(smoothY, (value) => value * 0.14);

  const waveLift1 = useTransform(swell, (value) => (value - 0.5) * 14);
  const waveLift2 = useTransform(swell, (value) => (value - 0.5) * -18);
  const waveLift3 = useTransform(swell, (value) => (value - 0.5) * 10);
  const causticShift = useTransform(drift, (value) => `${Math.round(value * 120)}px ${Math.round(value * 70)}px`);

  const oceanTilt = useMotionTemplate`rotateX(${useTransform(smoothY, (v) => `${62 + v * 0.12}deg`)}) rotateY(${useTransform(
    smoothX,
    (v) => `${v * 0.12}deg`,
  )})`;

  // If user forces a theme, keep it consistent, but still shift tones a bit by clock.
  const variant: "day" | "night" | "dawn" | "twilight" =
    theme === "light"
      ? clockIsNight
        ? "dawn"
        : "day"
      : clockIsNight
        ? "night"
        : "twilight";

  const baseGradient =
    variant === "day"
      ? "radial-gradient(ellipse_at_50%_10%,rgba(125,211,252,0.36),transparent_58%),radial-gradient(ellipse_at_20%_30%,rgba(34,211,238,0.22),transparent_60%),radial-gradient(ellipse_at_75%_55%,rgba(16,185,129,0.12),transparent_62%),linear-gradient(to_bottom,rgba(224,242,254,0.72),rgba(2,6,23,0.95))"
      : variant === "dawn"
        ? "radial-gradient(ellipse_at_50%_8%,rgba(251,191,36,0.16),transparent_55%),radial-gradient(ellipse_at_30%_22%,rgba(56,189,248,0.18),transparent_60%),radial-gradient(ellipse_at_75%_48%,rgba(16,185,129,0.10),transparent_62%),linear-gradient(to_bottom,rgba(2,6,23,0.90),rgba(2,6,23,0.98))"
        : variant === "twilight"
          ? "radial-gradient(ellipse_at_55%_10%,rgba(56,189,248,0.18),transparent_58%),radial-gradient(ellipse_at_20%_30%,rgba(34,211,238,0.14),transparent_60%),radial-gradient(ellipse_at_75%_55%,rgba(16,185,129,0.10),transparent_62%),linear-gradient(to_bottom,rgba(15,23,42,0.92),rgba(2,6,23,0.98))"
          : "radial-gradient(ellipse_at_50%_12%,rgba(56,189,248,0.14),transparent_58%),radial-gradient(ellipse_at_20%_30%,rgba(34,211,238,0.10),transparent_60%),radial-gradient(ellipse_at_75%_55%,rgba(16,185,129,0.08),transparent_62%),linear-gradient(to_bottom,rgba(2,6,23,0.95),rgba(2,6,23,0.99))";

  const waterPlaneGradient =
    variant === "day"
      ? "linear-gradient(to bottom, rgba(125,211,252,0.18), rgba(34,211,238,0.14), rgba(16,185,129,0.08), transparent 70%), repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 46px), repeating-linear-gradient(0deg, rgba(255,255,255,0.10) 0px, rgba(255,255,255,0.10) 1px, transparent 1px, transparent 46px)"
      : variant === "dawn"
        ? "linear-gradient(to bottom, rgba(251,191,36,0.10), rgba(56,189,248,0.12), rgba(34,211,238,0.08), transparent 70%), repeating-linear-gradient(90deg, rgba(255,255,255,0.10) 0px, rgba(255,255,255,0.10) 1px, transparent 1px, transparent 46px), repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 46px)"
        : "linear-gradient(to bottom, rgba(56,189,248,0.10), rgba(34,211,238,0.08), rgba(16,185,129,0.05), transparent 70%), repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 46px), repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 46px)";

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-background">
      {/* Deep ocean gradient */}
      <div className="absolute inset-0" style={{ background: baseGradient }} />

      {/* Horizon glow */}
      <div
        className="absolute inset-0 mix-blend-screen"
        style={{
          opacity: variant === "day" ? 0.78 : variant === "dawn" ? 0.62 : 0.5,
          background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.10), transparent 55%)",
        }}
      />

      {/* Caustics light pattern (subtle) */}
      <motion.div
        className="absolute inset-0 opacity-35 mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.20) 0px, transparent 38px), radial-gradient(circle at 75% 35%, rgba(255,255,255,0.18) 0px, transparent 44px), radial-gradient(circle at 55% 70%, rgba(255,255,255,0.14) 0px, transparent 52px)",
          backgroundSize: "240px 220px",
          backgroundPosition: causticShift,
          filter: "blur(0.6px)",
        }}
        animate={reducedMotion || !isVisible ? { opacity: 0.22 } : { opacity: [0.16, 0.34, 0.16] }}
        transition={{ duration: 8, repeat: reducedMotion || !isVisible ? 0 : Infinity, ease: "easeInOut" }}
      />

      {/* 3D wave field */}
      <motion.div
        className="absolute inset-0"
        style={{
          perspective: 900,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Water plane */}
        <motion.div
          className="absolute left-1/2 top-[48%] h-[70vh] w-[130vw] -translate-x-1/2 rounded-[3rem] opacity-95"
          style={{
            transform: useMotionTemplate`translate3d(${cameraX}px, ${cameraY}px, -260px) ${oceanTilt}`,
            backgroundImage: waterPlaneGradient,
            maskImage: "radial-gradient(circle at 50% 45%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 72%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 45%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 72%)",
          }}
          animate={reducedMotion || !isVisible ? { opacity: 0.72 } : { opacity: [0.62, 0.95, 0.62] }}
          transition={{ duration: 14, repeat: reducedMotion || !isVisible ? 0 : Infinity, ease: "easeInOut" }}
        />

        {/* Wave layer 1 */}
        <motion.div
          className="absolute left-[-20%] top-[58%] h-[34vh] w-[200vw] opacity-65"
          style={{
            transform: useMotionTemplate`translate3d(${useTransform(cameraX, (v) => v * 0.8)}px, ${useTransform(
              cameraY,
              (v) => v * 0.65,
            )}px, -160px) ${useMotionTemplate`rotateX(68deg)`}`,
          }}
          animate={reducedMotion || !isVisible ? { x: "0%" } : { x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: reducedMotion || !isVisible ? 0 : Infinity, ease: "linear" }}
        >
          <motion.div
            className="h-full w-full"
            style={{
              y: waveLift1,
              backgroundImage:
                "radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.14), transparent 55%), radial-gradient(ellipse at 55% 55%, rgba(255,255,255,0.10), transparent 60%), radial-gradient(ellipse at 85% 45%, rgba(255,255,255,0.12), transparent 58%)",
              filter: "blur(10px)",
            }}
          />
        </motion.div>

        {/* Wave layer 2 (foam) */}
        <motion.div
          className="absolute left-[-25%] top-[66%] h-[30vh] w-[200vw] opacity-55 mix-blend-screen"
          style={{
            transform: useMotionTemplate`translate3d(${useTransform(cameraX, (v) => v * 1.05)}px, ${useTransform(
              cameraY,
              (v) => v * 0.9,
            )}px, -110px) rotateX(72deg)`,
          }}
          animate={reducedMotion || !isVisible ? { x: "0%" } : { x: ["-25%", "0%"] }}
          transition={{ duration: 28, repeat: reducedMotion || !isVisible ? 0 : Infinity, ease: "linear" }}
        >
          <motion.div
            className="h-full w-full"
            style={{
              y: waveLift2,
              backgroundImage:
                "repeating-radial-gradient(circle at 20% 55%, rgba(255,255,255,0.18) 0px, transparent 22px), repeating-radial-gradient(circle at 70% 45%, rgba(255,255,255,0.14) 0px, transparent 26px)",
              backgroundSize: "220px 180px",
              filter: "blur(8px)",
            }}
          />
        </motion.div>

        {/* Wave layer 3 (deep swells) */}
        <motion.div
          className="absolute left-[-18%] top-[72%] h-[28vh] w-[200vw] opacity-45"
          style={{
            transform: useMotionTemplate`translate3d(${useTransform(cameraX, (v) => v * 1.25)}px, ${useTransform(
              cameraY,
              (v) => v * 1.05,
            )}px, -80px) rotateX(76deg)`,
          }}
          animate={reducedMotion || !isVisible ? { x: "0%" } : { x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: reducedMotion || !isVisible ? 0 : Infinity, ease: "linear" }}
        >
          <motion.div
            className="h-full w-full"
            style={{
              y: waveLift3,
              backgroundImage:
                "radial-gradient(ellipse at 15% 45%, rgba(56,189,248,0.22), transparent 60%), radial-gradient(ellipse at 55% 60%, rgba(34,211,238,0.18), transparent 62%), radial-gradient(ellipse at 88% 42%, rgba(16,185,129,0.14), transparent 64%)",
              filter: "blur(14px)",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
