import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, CheckCircle2, Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTour } from "@/contexts/TourContext";

// ─── Types ────────────────────────────────────────────────────────────────────
interface HighlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface TooltipPos {
  top?: number;
  left?: number;
  transform?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const PADDING     = 10;   // gutter around highlighted element
const TOOLTIP_W   = 340;  // must match w-[340px] below
const MARGIN      = 18;   // safe edge margin from viewport
const POLL_INTERVAL_MS  = 150;
const POLL_MAX_ATTEMPTS = 40; // 40 × 150 ms = 6 s max wait

// Page labels for the breadcrumb shown in the tooltip
const PAGE_LABELS: Record<string, string> = {
  "/":               "🏠 Home",
  "/learn":          "📖 Learn Python",
  "/compiler":       "💻 Compiler",
  "/problems":       "🔥 Problems",
  "/dsa":            "🧠 DSA",
  "/quick-prep":     "⚡ Quick Prep",
  "/leaderboard":    "🏆 Leaderboard",
  "/jobs":           "💼 Python Jobs",
  "/career-roadmap": "🗺️ Career Roadmap",
  "/linux-learn":    "🐧 Linux Mastery",
};

// ─── Component ────────────────────────────────────────────────────────────────
export const GuidedTour: React.FC = () => {
  const { isActive, currentStepIndex, steps, nextStep, prevStep, endTour } = useTour();

  const [highlight,    setHighlight]    = useState<HighlightRect | null>(null);
  const [tooltipPos,   setTooltipPos]   = useState<TooltipPos>({});
  const [elementReady, setElementReady] = useState(false);

  const stepsRef  = useRef(steps);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Keep stepsRef in sync without retriggering effects
  useEffect(() => { stepsRef.current = steps; }, [steps]);

  // ── Position calculator ────────────────────────────────────────────────────
  const computePosition = useCallback((): boolean => {
    const step    = stepsRef.current[currentStepIndex];
    if (!step) return false;

    const element = step.targetId ? document.getElementById(step.targetId) : null;

    if (element) {
      const rect = element.getBoundingClientRect();

      setHighlight({
        top:    rect.top  - PADDING + window.scrollY,
        left:   rect.left - PADDING + window.scrollX,
        width:  rect.width  + PADDING * 2,
        height: rect.height + PADDING * 2,
      });

      // Horizontal centre, clamped to viewport
      const halfW = TOOLTIP_W / 2;
      let left = rect.left + window.scrollX + rect.width / 2;
      if (left - halfW < MARGIN)                        left = halfW + MARGIN;
      if (left + halfW > window.innerWidth - MARGIN)    left = window.innerWidth - halfW - MARGIN;

      const belowTop    = rect.bottom + PADDING + 14 + window.scrollY;
      const fitsBelow   = rect.bottom + PADDING + 14 + 240 < window.innerHeight;
      const aboveTop    = rect.top - PADDING - 240 + window.scrollY;

      setTooltipPos({
        top:       fitsBelow ? belowTop : Math.max(aboveTop, window.scrollY + MARGIN),
        left,
        transform: "translateX(-50%)",
      });

      element.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return true;
    } else {
      // No target — centre the tooltip on screen
      setHighlight(null);
      setTooltipPos({
        top:       window.innerHeight / 2 + window.scrollY,
        left:      window.innerWidth  / 2,
        transform: "translate(-50%, -50%)",
      });
      return !step.targetId; // ready immediately if no targetId was requested
    }
  }, [currentStepIndex]);

  // ── Poll for target element after each step change ─────────────────────────
  // This handles lazy-loaded pages (Suspense) and page-transition delays.
  useEffect(() => {
    if (!isActive) return;

    setElementReady(false);
    setHighlight(null);

    const targetId = stepsRef.current[currentStepIndex]?.targetId;

    if (!targetId) {
      // No element needed — position immediately
      computePosition();
      setElementReady(true);
      return;
    }

    let attempts = 0;

    const poll = setInterval(() => {
      attempts++;
      const found = computePosition();
      if (found || attempts >= POLL_MAX_ATTEMPTS) {
        clearInterval(poll);
        setElementReady(true);
      }
    }, POLL_INTERVAL_MS);

    return () => clearInterval(poll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, currentStepIndex, steps.length]);

  // ── Recompute on resize / scroll once element is found ────────────────────
  useEffect(() => {
    if (!elementReady) return;
    window.addEventListener("resize",  computePosition);
    window.addEventListener("scroll",  computePosition, { passive: true });
    return () => {
      window.removeEventListener("resize",  computePosition);
      window.removeEventListener("scroll",  computePosition);
    };
  }, [elementReady, computePosition]);

  if (!isActive) return null;

  const currentStep = stepsRef.current[currentStepIndex];
  const isLast      = currentStepIndex === steps.length - 1;
  const isLoading   = !elementReady;
  const pageLabel   = currentStep?.page ? PAGE_LABELS[currentStep.page] ?? currentStep.page : null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none" aria-live="polite">

      {/* ── Dim Backdrop (clicking ends tour) ─────────────────────────────── */}
      <div
        className="absolute inset-0 bg-black/65 pointer-events-auto"
        onClick={endTour}
      />

      {/* ── Spotlight Ring ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {highlight && elementReady && (
          <motion.div
            key={`hl-${currentStepIndex}`}
            layoutId="tour-spotlight"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1  }}
            exit   ={{ opacity: 0             }}
            transition={{ duration: 0.22 }}
            className="absolute rounded-xl pointer-events-none"
            style={{
              top:       highlight.top,
              left:      highlight.left,
              width:     highlight.width,
              height:    highlight.height,
              boxShadow: "0 0 0 3px hsl(var(--primary)), 0 0 30px 6px hsl(var(--primary) / 0.4)",
              zIndex:    9999,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Tooltip Card ──────────────────────────────────────────────────── */}
      <motion.div
        ref={tooltipRef}
        key={`step-${currentStepIndex}`}
        initial={{ opacity: 0, y: 12, scale: 0.94 }}
        animate={{ opacity: 1, y: 0,  scale: 1    }}
        exit   ={{ opacity: 0, y: -6, scale: 0.96  }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="absolute pointer-events-auto w-[340px] rounded-2xl overflow-hidden shadow-2xl"
        style={{
          ...tooltipPos,
          zIndex:     10000,
          background: "rgba(10, 13, 24, 0.96)",
          backdropFilter: "blur(24px)",
          border:     "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Top accent gradient bar */}
        <div className="h-[3px] w-full bg-gradient-to-r from-primary/30 via-primary to-primary/30" />

        <div className="px-5 pt-4 pb-5">

          {/* Page breadcrumb */}
          {pageLabel && (
            <div className="flex items-center gap-1.5 mb-3">
              <MapPin className="h-3 w-3 text-primary/60 shrink-0" />
              <span className="text-[10px] font-mono text-primary/70 tracking-wide">{pageLabel}</span>
              <span className="ml-auto text-[10px] text-slate-600 font-mono">
                {currentStepIndex + 1} / {steps.length}
              </span>
            </div>
          )}

          {/* Header */}
          <div className="flex items-start justify-between mb-2.5 gap-2">
            <h3 className="text-[15px] font-bold text-white leading-snug flex items-center gap-2">
              {isLoading && (
                <Loader2 className="h-4 w-4 animate-spin text-primary shrink-0" />
              )}
              {currentStep?.title}
            </h3>
            <button
              onClick={endTour}
              className="shrink-0 text-slate-600 hover:text-white transition-colors mt-0.5"
              aria-label="Close tour"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Content */}
          <p className="text-[13px] text-slate-300 leading-relaxed mb-5">
            {isLoading && currentStep?.page
              ? `Navigating to ${pageLabel ?? currentStep.page}…`
              : currentStep?.content}
          </p>

          {/* Footer: dots + buttons */}
          <div className="flex items-center justify-between">

            {/* Step progress dots */}
            <div className="flex gap-1 items-center">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentStepIndex
                      ? "w-5 h-1.5 bg-primary"
                      : i < currentStepIndex
                      ? "w-1.5 h-1.5 bg-primary/40"
                      : "w-1.5 h-1.5 bg-slate-700"
                  }`}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-2">
              {currentStepIndex > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevStep}
                  disabled={isLoading}
                  className="text-slate-400 hover:text-white h-8 px-2.5 gap-1 text-xs disabled:opacity-40"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </Button>
              )}
              <Button
                size="sm"
                onClick={nextStep}
                disabled={isLoading}
                className="h-8 px-3.5 bg-primary hover:bg-primary/90 text-white font-semibold text-xs gap-1.5 shadow-lg shadow-primary/25 disabled:opacity-40"
              >
                {isLast ? (
                  <><CheckCircle2 className="h-3.5 w-3.5" /> Done!</>
                ) : (
                  <>Next <ArrowRight className="h-3.5 w-3.5" /></>
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
