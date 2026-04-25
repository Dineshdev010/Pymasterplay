import React, { useState } from "react";
import { useFocus } from "@/contexts/FocusContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Focus, Target, Play, Square, Volume2, VolumeX, Minus, Plus, Settings2, X } from "lucide-react";
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

  // If not active and settings are hidden, don't show the big modal, just return nothing 
  // (We'll add a launch button in the navbar later)
  if (!isActive && !showFocusSettings) return null;

  return (
    <>
      {/* Active Floating Widget */}
      {isActive && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={`flex items-center gap-4 rounded-full border shadow-2xl backdrop-blur-md px-5 py-3 transition-colors ${
            isBreak 
              ? "bg-emerald-950/80 border-emerald-500/30 text-emerald-100" 
              : "bg-slate-950/80 border-primary/30 text-slate-100"
          }`}>
            <div className="flex items-center gap-2">
              {isBreak ? <Settings2 className="w-4 h-4 text-emerald-400" /> : <Focus className="w-4 h-4 text-primary-400" />}
              <span className="font-mono text-xl font-bold tracking-tight tabular-nums drop-shadow-sm">
                {formatTime(timeLeft)}
              </span>
            </div>
            
            {(task && !isBreak) && (
              <>
                <div className="w-px h-6 bg-white/20 mx-1" />
                <span className="text-sm font-medium text-white/80 max-w-[120px] truncate">{task}</span>
              </>
            )}

            <AnimatePresence>
              {isHovered && (
                <motion.div 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex items-center gap-2 overflow-hidden pl-2 border-l border-white/20 ml-2"
                >
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/20 text-white" onClick={toggleMusic}>
                    {musicEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-red-500/30 text-red-400" onClick={() => setShowQuitConfirm(true)}>
                    <Square className="w-4 h-4" />
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-card border border-border max-w-sm w-full rounded-[2rem] p-6 shadow-2xl relative"
            >
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-4 right-4 rounded-full h-8 w-8"
                onClick={() => setShowFocusSettings(false)}
              >
                <X className="w-4 h-4" />
              </Button>
              
              <div className="text-center mb-6">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Focus className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Focus Session</h2>
                <p className="text-sm text-muted-foreground mt-1">Set a timer and get to work.</p>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <span className="text-5xl font-mono font-black tracking-tighter mb-4">{minutes}:00</span>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="rounded-full" onClick={() => adjustTime(-5)}><Minus className="w-4 h-4" /></Button>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" className="rounded-full text-xs" onClick={() => setMinutes(25)}>25m</Button>
                      <Button variant="secondary" size="sm" className="rounded-full text-xs" onClick={() => setMinutes(50)}>50m</Button>
                    </div>
                    <Button variant="outline" size="icon" className="rounded-full" onClick={() => adjustTime(5)}><Plus className="w-4 h-4" /></Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground ml-1">Task (Optional)</label>
                  <Input 
                    placeholder="e.g. Solving 3 DSA questions..." 
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="rounded-xl bg-background border-border"
                  />
                </div>

                <Button size="lg" className="w-full rounded-xl h-12 font-bold" onClick={startFocus}>
                  <Play className="w-5 h-5 mr-2" /> Start Focus
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
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-card text-card-foreground border border-border/50 max-w-sm w-full rounded-2xl p-6 shadow-2xl"
            >
              <h3 className="text-xl font-bold mb-2">Abort Focus Session?</h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                If you stop now, you'll lose your current progress and won't earn any XP or coins. Are you sure?
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setShowQuitConfirm(false)}>
                  Resume
                </Button>
                <Button variant="destructive" className="flex-1 rounded-xl" onClick={() => {
                  setShowQuitConfirm(false);
                  stopFocus();
                }}>
                  Yes, Stop
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
