import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useProgress } from "./ProgressContext";
import { fireRewardConfetti } from "@/lib/confetti";

interface FocusContextType {
  isActive: boolean;
  isBreak: boolean;
  timeLeft: number;
  minutes: number;
  task: string;
  musicEnabled: boolean;
  setTask: (task: string) => void;
  setMinutes: (mins: number) => void;
  setMusicEnabled: (enabled: boolean) => void;
  startFocus: () => void;
  stopFocus: () => void;
  finishFocus: () => void;
  toggleMusic: () => void;
  showFocusSettings: boolean;
  setShowFocusSettings: (show: boolean) => void;
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

export function FocusProvider({ children }: { children: React.ReactNode }) {
  const { addWallet, catchStar } = useProgress();
  
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [minutes, setMinutes] = useState(25);
  const [task, setTask] = useState("");
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [showFocusSettings, setShowFocusSettings] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio object once
  useEffect(() => {
    audioRef.current = new Audio("https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle music playing
  useEffect(() => {
    if (audioRef.current) {
      if (musicEnabled && isActive && !isBreak) {
        audioRef.current.play().catch(e => console.error("Audio play failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [musicEnabled, isActive, isBreak]);

  // Main timer logic
  useEffect(() => {
    let interval: number | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      finishFocus();
    }
    
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  // Prevent leaving the page while active
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isActive) {
        const message = "Are you sure you want to leave? Your focus timer will be cancelled and you will lose your progress.";
        e.returnValue = message;
        return message;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isActive]);

  const startFocus = async () => {
    if (minutes < 1) {
      toast.error("Please set at least 1 minute.");
      return;
    }
    
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
      setTimeLeft(minutes * 60);
      setIsActive(true);
      setShowFocusSettings(false);
      toast.success("Focus Session Started!", {
        description: "Stay in the app. If you exit full screen, you will lose your progress!",
      });
    } catch (err) {
      toast.error("Could not enter full screen. Please try again.");
    }
  };

  const stopFocus = () => {
    setIsActive(false);
    setTimeLeft(minutes * 60);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(e => console.log(e));
    }
    toast.error("Focus session aborted.", {
      description: "You didn't earn any rewards this time. Keep trying!",
    });
  };

  const finishFocus = () => {
    setIsActive(false);
    
    if (!isBreak) {
      const xpEarned = Math.floor(minutes / 5) * 10;
      const coinsEarned = Math.floor(minutes / 5) * 5;
      
      catchStar(xpEarned);
      addWallet(coinsEarned);
      fireRewardConfetti();
      
      toast.success("Focus Session Complete! 🎉", {
        description: `You earned +${xpEarned} XP and $${coinsEarned}.`,
        duration: 8000,
      });
      
      // Auto-switch to break mode
      setIsBreak(true);
      const breakMins = minutes >= 50 ? 10 : 5;
      setMinutes(breakMins);
      setTimeLeft(breakMins * 60);
      setIsActive(true); // Auto-start break
    } else {
      toast.success("Break Complete! Ready to focus again?", { duration: 5000 });
      setIsBreak(false);
      setMinutes(25);
      setTimeLeft(25 * 60);
      setShowFocusSettings(true);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(e => console.log(e));
      }
    }
  };

  // Enforce Fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      // If we are active and suddenly not in fullscreen, the user escaped!
      if (isActive && !document.fullscreenElement) {
        setIsActive(false);
        setTimeLeft(minutes * 60);
        setIsBreak(false); // Reset break state too
        toast.error("Focus Session Failed!", {
          description: "You exited full screen. Stay focused inside the app to earn rewards!",
        });
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [isActive, minutes]);

  const toggleMusic = () => {
    setMusicEnabled((prev) => !prev);
  };

  return (
    <FocusContext.Provider
      value={{
        isActive,
        isBreak,
        timeLeft,
        minutes,
        task,
        musicEnabled,
        setTask,
        setMinutes,
        setMusicEnabled,
        startFocus,
        stopFocus,
        finishFocus,
        toggleMusic,
        showFocusSettings,
        setShowFocusSettings,
      }}
    >
      {children}
    </FocusContext.Provider>
  );
}

export const useFocus = () => {
  const context = useContext(FocusContext);
  if (context === undefined) {
    throw new Error("useFocus must be used within a FocusProvider");
  }
  return context;
};
