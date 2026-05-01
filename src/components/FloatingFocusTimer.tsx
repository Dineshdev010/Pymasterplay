import React, { useState } from "react";
import { useFocus } from "@/contexts/FocusContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Focus, Target, Play, Square, Volume2, VolumeX, Minus, Plus, Coffee, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingFocusTimer() {
  const {
    isActive,
    isBreak,
    timeLeft,
    minutes,
    task,
    musicEnabled,
    setTask,
    setMinutes,
    startFocus,
    stopFocus,
    toggleMusic,
    showFocusSettings,
    setShowFocusSettings,
  } = useFocus();

  const [isHovered, setIsHovered] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const adjustTime = (amount: number) => {
    setMinutes(Math.max(1, Math.min(120, minutes + amount)));
  };

  const totalSeconds = minutes * 60;
  const progress = (timeLeft / totalSeconds) * 100;
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  if (!isActive && !showFocusSettings) return null;

  return (
    <>
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .focus-glow {
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
        }
        .break-glow {
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
        }
      `}</style>

      {/* Active Floating Widget */}
      {isActive && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 20 }}
          className="fixed bottom-8 right-8 z-[1000]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={`relative flex items-center gap-4 rounded-3xl border shadow-2xl backdrop-blur-xl px-6 py-4 transition-all duration-500 hover:scale-105 ${
            isBreak 
              ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-100 break-glow" 
              : "bg-indigo-950/40 border-indigo-500/30 text-indigo-100 focus-glow"
          }`}>
            {/* Progress Ring Overlay */}
            <div className="relative w-12 h-12 shrink-0">
              <svg className="w-full h-full -rotate-90 transform">
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  className="stroke-white/10 fill-none"
                  strokeWidth="3"
                />
                <motion.circle
                  cx="24"
                  cy="24"
                  r={radius}
                  className={`${isBreak ? "stroke-emerald-400" : "stroke-indigo-400"} fill-none`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: offset }}
                  transition={{ type: "spring", bounce: 0, duration: 1 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                {isBreak ? (
                  <Coffee className="w-5 h-5 text-emerald-400 animate-pulse" />
                ) : (
                  <Target className="w-5 h-5 text-indigo-400 animate-spin-slow" />
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-mono text-2xl font-black tracking-tight tabular-nums leading-none mb-1">
                {formatTime(timeLeft)}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                {isBreak ? "Break Time" : task ? task : "Deep Focus"}
              </span>
            </div>

            <AnimatePresence>
              {isHovered && (
                <motion.div 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex items-center gap-3 overflow-hidden pl-4 border-l border-white/10 ml-2 h-10"
                >
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 rounded-full hover:bg-white/10 text-white transition-colors" 
                    onClick={toggleMusic}
                    title={musicEnabled ? "Mute Lo-Fi" : "Play Lo-Fi"}
                  >
                    {musicEnabled ? <Volume2 className="w-4 h-4 text-indigo-300" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 rounded-full hover:bg-red-500/20 text-red-400 transition-colors" 
                    onClick={() => setShowQuitConfirm(true)}
                    title="Stop Session"
                  >
                    <Square className="w-4 h-4 fill-current" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Settings / Setup Modal */}
      <AnimatePresence>
        {!isActive && showFocusSettings && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-card/95 border border-white/10 max-w-sm w-full rounded-[2.5rem] overflow-hidden shadow-2xl relative backdrop-blur-2xl"
            >
              {/* Premium Gradient Header */}
              <div className="h-32 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 relative overflow-hidden flex flex-col items-center justify-center text-white">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" />
                
                <Zap className="w-10 h-10 mb-2 drop-shadow-lg" />
                <h2 className="text-2xl font-black tracking-tight drop-shadow-md">DEEP FOCUS</h2>
              </div>

              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-4 right-4 rounded-full h-9 w-9 bg-black/20 hover:bg-black/40 text-white border border-white/10"
                onClick={() => setShowFocusSettings(false)}
              >
                <X className="w-5 h-5" />
              </Button>
              
              <div className="p-8 space-y-8">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-6xl font-mono font-black tracking-tighter text-indigo-500 dark:text-indigo-400">{minutes}</span>
                    <span className="text-xl font-bold text-muted-foreground uppercase tracking-widest">min</span>
                  </div>
                  
                  <div className="flex items-center gap-6 w-full justify-center">
                    <Button variant="outline" size="icon" className="rounded-2xl h-12 w-12 border-border/50 hover:bg-secondary" onClick={() => adjustTime(-5)}><Minus className="w-5 h-5" /></Button>
                    <div className="flex gap-2">
                      <Button 
                        variant={minutes === 25 ? "default" : "secondary"} 
                        className="rounded-xl h-10 px-4 font-bold" 
                        onClick={() => setMinutes(25)}
                      >25</Button>
                      <Button 
                        variant={minutes === 50 ? "default" : "secondary"} 
                        className="rounded-xl h-10 px-4 font-bold" 
                        onClick={() => setMinutes(50)}
                      >50</Button>
                    </div>
                    <Button variant="outline" size="icon" className="rounded-2xl h-12 w-12 border-border/50 hover:bg-secondary" onClick={() => adjustTime(5)}><Plus className="w-5 h-5" /></Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500/70 ml-1">Current Objective</label>
                  <Input 
                    placeholder="What are we working on?" 
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="rounded-2xl h-14 bg-secondary/30 border-border/50 focus:ring-indigo-500/50 text-center text-lg font-medium placeholder:opacity-30"
                  />
                </div>

                <Button 
                  size="lg" 
                  className="w-full rounded-2xl h-14 font-black text-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:scale-[1.02] transition-transform shadow-xl shadow-indigo-500/20" 
                  onClick={startFocus}
                >
                  <Play className="w-6 h-6 mr-3 fill-current" /> ENTER FLOW
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quit Confirmation Modal */}
      <AnimatePresence>
        {showQuitConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-card text-card-foreground border border-white/10 max-w-sm w-full rounded-[2rem] p-8 shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Square className="w-8 h-8 text-red-500 fill-current" />
              </div>
              <h3 className="text-2xl font-black mb-3">Break Flow?</h3>
              <p className="text-muted-foreground text-sm mb-8 leading-relaxed font-medium">
                Quitting now will cancel your current session and reset your progress. Are you sure you want to exit?
              </p>
              <div className="flex gap-4">
                <Button variant="secondary" className="flex-1 rounded-2xl h-12 font-bold" onClick={() => setShowQuitConfirm(false)}>
                  CONTINUE
                </Button>
                <Button variant="destructive" className="flex-1 rounded-2xl h-12 font-bold bg-red-600 hover:bg-red-700" onClick={() => {
                  setShowQuitConfirm(false);
                  stopFocus();
                }}>
                  QUIT
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

