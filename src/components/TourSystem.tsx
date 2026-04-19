import React, { useEffect, useState, useCallback } from "react";
import { Joyride, type EventData, type Step, type TooltipRenderProps } from "react-joyride";
import { TOUR_STEPS } from "@/data/newTourSteps";
import { useTheme } from "@/components/ThemeProvider";
import { ArrowLeft, ArrowRight, X, Sparkles } from "lucide-react";

const LS_TOUR_KEY = "pymaster_tours_seen";

interface TourState {
  run: boolean;
  steps: Step[];
  tourKey: string;
}

const CustomTooltip = ({
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  skipProps,
  tooltipProps,
  isLastStep,
  size,
}: TooltipRenderProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      {...tooltipProps}
      className={`flex flex-col w-[420px] max-w-[95vw] rounded-2xl overflow-hidden shadow-2xl font-sans relative ${
        isDark ? "bg-[#1f2937] border border-gray-700 text-white" : "bg-white border text-slate-900 shadow-xl"
      }`}
    >
      {/* Top Banner section */}
      <div className={`relative h-48 overflow-hidden flex flex-col items-center justify-center p-6 text-center ${
        isDark ? "bg-gradient-to-br from-indigo-900/80 to-slate-800" : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        {/* Glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
        
        <div className={`p-4 rounded-2xl relative z-10 shadow-lg backdrop-blur-md mb-4 ${
          isDark ? "bg-white/10 border border-white/20" : "bg-white/60 border border-white"
        }`}>
          <Sparkles className={`w-10 h-10 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
        </div>
        
        {/* Progress text overlay at top instead of Joyride default */}
        <div className="absolute top-3 left-4 text-xs font-semibold tracking-wider uppercase opacity-60">
          Step {index + 1} of {size}
        </div>
      </div>

      {/* Main Content */}
      <div className={`px-8 pt-6 pb-8 flex flex-col flex-1 transform translate-y-[-10px] rounded-t-2xl ${
        isDark ? "bg-[#1f2937]" : "bg-white"
      }`}>
        <h3 className="text-xl font-bold mb-3 tracking-tight text-center">
          {step.title}
        </h3>
        <p className={`text-[0.95rem] leading-relaxed text-center mb-6 ${
          isDark ? "text-gray-300" : "text-slate-600"
        }`}>
          {step.content}
        </p>

        {/* Primary Action Button (like the "Try Now" button in the mockup) inside the card */}
        <div className="flex justify-center mt-auto">
          <button
            {...primaryProps}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-blue-500/20"
          >
            {isLastStep ? "Got it, let's go!" : "Try now"}
          </button>
        </div>
      </div>

      {/* Bottom Floating Navigation (Styled as separated from the card visually) */}
      <div className={`px-6 py-4 flex items-center justify-between border-t ${
        isDark ? "border-gray-700/50 bg-[#161c24]" : "border-slate-100 bg-slate-50"
      }`}>
        
        {/* Back Button */}
        <button
          {...backProps}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
            index > 0 
              ? isDark ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-blue-100 hover:bg-blue-200 text-blue-700"
              : "opacity-0 pointer-events-none"
          }`}
          disabled={index === 0}
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Navigation Dots */}
        <div className="flex gap-2 mx-auto">
          {Array.from({ length: size }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index 
                  ? "w-4 bg-blue-500" 
                  : `w-2 ${isDark ? "bg-gray-600" : "bg-slate-300"}`
              }`}
            />
          ))}
        </div>

        {/* Next/Finish navigation */}
        <button
          {...primaryProps}
          className={`flex items-center gap-1.5 px-5 py-2 text-sm font-semibold rounded-full transition-colors ${
            isDark 
              ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30" 
              : "bg-blue-50 text-blue-700 hover:bg-blue-100"
          }`}
        >
           {isLastStep ? "Finish" : "Next"}
           {!isLastStep && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Close button strictly matching top-right styling */}
      {!isLastStep && (
        <button
          {...skipProps}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-colors"
          aria-label="Skip tour"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export const TourSystem: React.FC = () => {
  const [state, setState] = useState<TourState>({
    run: false,
    steps: [],
    tourKey: "",
  });

  const getSeenTours = useCallback((): string[] => {
    try {
      return JSON.parse(localStorage.getItem(LS_TOUR_KEY) || "[]");
    } catch {
      return [];
    }
  }, []);

  const markTourAsSeen = useCallback((key: string) => {
    const seen = getSeenTours();
    if (!seen.includes(key)) {
      localStorage.setItem(LS_TOUR_KEY, JSON.stringify([...seen, key]));
    }
  }, [getSeenTours]);

  const startTour = useCallback((key: string, force = false) => {
    const steps = TOUR_STEPS[key];
    if (!steps) return;

    if (!force) {
      const seen = getSeenTours();
      if (seen.includes(key)) return;
    }

    setState({
      run: true,
      steps,
      tourKey: key,
    });
  }, [getSeenTours]);

  useEffect(() => {
    const handleStartTour = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { tourKey, force } = customEvent.detail;
      startTour(tourKey, force);
    };

    window.addEventListener("pymaster-start-tour", handleStartTour);
    return () => window.removeEventListener("pymaster-start-tour", handleStartTour);
  }, [startTour]);

  const handleJoyrideCallback = (data: EventData) => {
    const { status, action } = data;
    const finishedStatuses: string[] = ["finished", "skipped"];

    if (finishedStatuses.includes(status) || action === "close") {
      if (state.tourKey) {
        markTourAsSeen(state.tourKey);
      }
      setState({ run: false, steps: [], tourKey: "" });
    }
  };

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideBackButton
      run={state.run}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={state.steps}
      tooltipComponent={CustomTooltip}
      floaterProps={{
        hideArrow: true, // we remove the arrow to have a clean, disconnected floating card
      }}
      options={{
        zIndex: 10000,
        overlayColor: "rgba(0, 0, 0, 0.75)",
      }}
    />
  );
};

// Global helper to trigger tour from anywhere
export const triggerTour = (tourKey: string, force = false) => {
  const event = new CustomEvent("pymaster-start-tour", { detail: { tourKey, force } });
  window.dispatchEvent(event);
};
