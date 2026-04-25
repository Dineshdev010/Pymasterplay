import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Play, Square, Settings2, ArrowLeft, Focus, Target, Plus, Minus, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";
import { fireRewardConfetti } from "@/lib/confetti";

export default function ProductiveClockPage() {
  const navigate = useNavigate();
  const { addWallet, catchStar } = useProgress();
  
  const [minutes, setMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [task, setTask] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showConfirmQuit, setShowConfirmQuit] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicEnabled, setMusicEnabled] = useState(false);

  // Initialize audio object once
  useEffect(() => {
    // A calm lo-fi or ambient track placeholder
    // In a real app, you'd use a hosted reliable audio file
    audioRef.current = new Audio("https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
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
      // Timer finished!
      setIsActive(false);
      handleTimerComplete();
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

  // Handle Fullscreen changes natively
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleTimerComplete = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.error(err));
    }
    
    if (!isBreak) {
      // Reward logic for completing a focus session
      const xpEarned = Math.floor(minutes / 5) * 10;
      const coinsEarned = Math.floor(minutes / 5) * 5;
      
      catchStar(xpEarned);
      addWallet(coinsEarned);
      fireRewardConfetti();
      
      toast.success("Focus Session Complete! 🎉", {
        description: `You earned +${xpEarned} XP and $${coinsEarned} for focusing for ${minutes} minutes.`,
        duration: 8000,
      });
      
      // Auto-switch to break mode
      setIsBreak(true);
      const breakMins = minutes >= 50 ? 10 : 5;
      setMinutes(breakMins);
      setTimeLeft(breakMins * 60);
    } else {
      toast.success("Break Complete! Ready to focus again?", { duration: 5000 });
      setIsBreak(false);
      setMinutes(25);
      setTimeLeft(25 * 60);
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        toast.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const startTimer = () => {
    if (minutes < 1) {
      toast.error("Please set at least 1 minute.");
      return;
    }
    setIsActive(true);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.error("Fullscreen failed", err));
    }
  };

  const quitTimer = () => {
    setShowConfirmQuit(true);
  };

  const confirmQuit = () => {
    setIsActive(false);
    setShowConfirmQuit(false);
    setTimeLeft(minutes * 60);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.error(err));
    }
    toast.error("Focus session aborted.", {
      description: "You didn't earn any rewards this time. Keep trying!",
    });
  };

  const adjustTime = (amount: number) => {
    if (isActive) return;
    const newMins = Math.max(1, Math.min(120, minutes + amount));
    setMinutes(newMins);
    setTimeLeft(newMins * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Calculate progress circle stroke dasharray
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const totalSeconds = minutes * 60;
  const strokeDashoffset = circumference - (timeLeft / totalSeconds) * circumference;

  return (
    <div className={`min-h-screen w-full transition-colors duration-1000 flex flex-col items-center justify-center relative overflow-hidden ${
      isActive 
        ? isBreak ? "bg-emerald-950 text-emerald-50" : "bg-slate-950 text-slate-50" 
        : "bg-background text-foreground"
    }`}>
      <Helmet>
        <title>{isActive ? `${formatTime(timeLeft)} - Focus` : "Productive Clock | PyMaster"}</title>
      </Helmet>

      {/* Background Animated Gradient / Glow */}
      {isActive && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-30">
           <div className={`absolute w-[60vh] h-[60vh] rounded-full blur-[100px] animate-pulse-slow ${isBreak ? "bg-emerald-600/30" : "bg-primary/30"}`} />
        </div>
      )}

      {/* Top Navbar / Exit (Only visible when not active or paused) */}
      {!isActive && (
        <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center z-10">
          <Button variant="ghost" className="gap-2" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
            Back to App
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => setMusicEnabled(!musicEnabled)} title="Toggle Lo-fi Music">
              {musicEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="icon" onClick={toggleFullScreen} title="Toggle Fullscreen">
              {isFullScreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      )}

      {/* Floating Controls during active session */}
      {isActive && (
        <div className="absolute top-6 right-6 flex gap-3 z-20 opacity-20 hover:opacity-100 transition-opacity">
          <Button variant="outline" size="icon" className="bg-transparent border-white/20 text-white hover:bg-white/10" onClick={() => setMusicEnabled(!musicEnabled)}>
            {musicEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
          <Button variant="outline" size="icon" className="bg-transparent border-white/20 text-white hover:bg-white/10" onClick={toggleFullScreen}>
            {isFullScreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </Button>
        </div>
      )}

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center max-w-md w-full px-6">
        
        {/* Header / State Indicator */}
        <div className="mb-8 flex flex-col items-center">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-semibold tracking-widest uppercase mb-4 ${
            isActive 
              ? isBreak 
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" 
                : "border-primary/30 bg-primary/10 text-primary-300"
              : "border-border bg-muted/50 text-muted-foreground"
          }`}>
            {isBreak ? <Settings2 className="w-4 h-4" /> : <Focus className="w-4 h-4" />}
            {isActive ? (isBreak ? "Break Time" : "Deep Focus") : "Ready to Focus"}
          </div>
          
          {isActive && task && !isBreak && (
             <h2 className="text-xl font-medium text-white/90 text-center">Focusing on: {task}</h2>
          )}
        </div>

        {/* Circular Timer Display */}
        <div className="relative flex items-center justify-center mb-12">
          {/* SVG Circle */}
          <svg width="280" height="280" className="transform -rotate-90">
            {/* Background Track */}
            <circle
              cx="140"
              cy="140"
              r={radius}
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className={isActive ? "text-white/10" : "text-muted"}
            />
            {/* Progress Stroke */}
            <circle
              cx="140"
              cy="140"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={`transition-all duration-1000 ease-linear ${
                isActive 
                  ? isBreak ? "text-emerald-400" : "text-primary-400"
                  : "text-primary"
              }`}
            />
          </svg>

          {/* Time Text Inside Circle */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-6xl font-black font-mono tracking-tighter tabular-nums drop-shadow-sm">
              {formatTime(timeLeft)}
            </span>
            {!isActive && (
              <div className="flex items-center gap-4 mt-4">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => adjustTime(-5)}><Minus className="w-4 h-4" /></Button>
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{minutes} min</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => adjustTime(5)}><Plus className="w-4 h-4" /></Button>
              </div>
            )}
          </div>
        </div>

        {/* Setup Inputs (When not active) */}
        {!isActive && (
          <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground ml-1">What are you focusing on? (Optional)</label>
              <Input 
                placeholder="e.g. Solving 3 DSA questions..." 
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="h-12 bg-background border-border text-center rounded-xl"
              />
            </div>
            
            <Button 
              size="lg" 
              className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 transition-transform active:scale-95"
              onClick={startTimer}
            >
              <Play className="w-5 h-5 mr-2 fill-current" />
              Start Focus Session
            </Button>
            
            <div className="flex gap-2 justify-center pt-2">
              <Button variant="ghost" size="sm" onClick={() => { setMinutes(25); setTimeLeft(25*60); setIsBreak(false); }} className="text-xs rounded-full">25m Pomodoro</Button>
              <Button variant="ghost" size="sm" onClick={() => { setMinutes(50); setTimeLeft(50*60); setIsBreak(false); }} className="text-xs rounded-full">50m Deep Work</Button>
            </div>
          </div>
        )}

        {/* Controls (When active) */}
        {isActive && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button 
              variant="destructive" 
              size="lg"
              className="h-12 px-8 rounded-full bg-red-500/20 text-red-100 hover:bg-red-500/40 border border-red-500/30"
              onClick={quitTimer}
            >
              <Square className="w-4 h-4 mr-2" />
              Give Up
            </Button>
          </div>
        )}

      </div>

      {/* Confirmation Modal for quitting */}
      {showConfirmQuit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-card text-card-foreground border border-border/50 max-w-sm w-full rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold mb-2">Abort Focus Session?</h3>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              If you stop now, you'll lose your current progress and won't earn any XP or coins for this session. Are you sure?
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setShowConfirmQuit(false)}>
                Resume
              </Button>
              <Button variant="destructive" className="flex-1 rounded-xl" onClick={confirmQuit}>
                Yes, Stop
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
