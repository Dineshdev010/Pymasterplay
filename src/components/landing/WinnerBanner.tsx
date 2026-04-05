import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, ArrowRight, Ticket, Gift, Sparkles, CalendarClock } from "lucide-react";
import { Link } from "react-router-dom";
import { problems } from "@/data/problems";
import { useProgress } from "@/contexts/ProgressContext";
import confetti from "canvas-confetti";
import type { Variants } from "framer-motion";

// GSAP-style cinematic stagger animations
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const slideUpItem: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 150, damping: 15 }
  }
};

export function WinnerBanner() {
  const { progress } = useProgress();
  const totalProblems = problems.length;
  const solved = progress?.solvedProblems?.length || 0;
  const percentage = Math.min(Math.round((solved / totalProblems) * 100), 100);
  const isCompleted = solved >= totalProblems;
  
  const [isShaking, setIsShaking] = useState(false);

  const triggerLottery = () => {
    if (!isCompleted || isShaking) return;
    setIsShaking(true);
    // Violent vibration/shake effect for 2.5 seconds
    setTimeout(() => {
      setIsShaking(false);
      // Explode confetti heavily to simulate winning/revealing
      confetti({
        particleCount: 250,
        spread: 140,
        origin: { y: 0.5 },
        colors: ["#FFD700", "#F59E0B", "#10B981", "#3B82F6", "#ef4444"]
      });
    }, 2500); 
  };

  return (
    <section className="py-12 px-4 relative z-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          whileHover={{ scale: 1.015 }}
          className={`relative overflow-hidden rounded-[2rem] border-2 shadow-2xl transition-all duration-500 ${
            isCompleted 
              ? "border-green-500/60 shadow-[0_0_40px_rgba(34,197,94,0.3)] bg-gradient-to-r from-green-500/10 via-emerald-400/10 to-green-500/10" 
              : "border-python-yellow/50 shadow-[0_0_40px_rgba(250,204,21,0.25)] bg-gradient-to-r from-python-yellow/10 via-reward-gold/15 to-python-yellow/10"
          }`}
        >
          {/* Framer-motion shimmer overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] w-[150%] pointer-events-none"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
          />

          <motion.div variants={staggerContainer} className="relative p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8">
            {/* Interactive Trophy / Lottery Box icon */}
            <motion.div
              variants={slideUpItem}
              animate={isShaking ? {
                x: [-12, 12, -12, 12, -8, 8, -4, 4, 0],
                y: [0, -10, 0, -10, 0, -5, 0],
                rotate: [-25, 25, -25, 25, -10, 10, 0],
                scale: [1, 1.2, 1.2, 1.1, 1]
              } : { 
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={isShaking ? { duration: 0.8, repeat: 3 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className={`relative shrink-0 ${isCompleted ? "cursor-pointer" : ""}`}
              onClick={triggerLottery}
            >
              <div className="text-7xl sm:text-8xl drop-shadow-[0_0_30px_rgba(255,215,0,0.6)] select-none">
                {isCompleted ? "🎟️" : "🏆"}
              </div>
              
              {/* Click me badge if completed */}
              {isCompleted && !isShaking && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-3 -right-3 bg-red-500 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-lg shadow-red-500/50"
                >
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="block"
                  >
                    CLICK ME!
                  </motion.span>
                </motion.div>
              )}
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 text-center md:text-left">
              <motion.div variants={slideUpItem} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm mb-4 border ${
                isCompleted ? "bg-green-500/20 text-green-500 border-green-500/30" : "bg-python-yellow/20 text-python-yellow border-python-yellow/30"
              }`}>
                {isCompleted ? <Gift className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
                {isCompleted ? "Lottery Completely Unlocked!" : "Grand Lottery Challenge"}
              </motion.div>
              
              <motion.h2 variants={slideUpItem} className="text-3xl sm:text-5xl font-black text-foreground mb-3 tracking-tight">
                Win <span className="bg-clip-text text-transparent bg-gradient-to-r from-python-yellow via-yellow-400 to-reward-gold drop-shadow-sm">₹100,000</span> Real Cash! 💰
              </motion.h2>

              <motion.div variants={slideUpItem} className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold rounded-md mb-4 animate-pulse">
                <CalendarClock className="w-3.5 h-3.5" />
                Prize is strictly allotted ONCE a year!
              </motion.div>
              
              <motion.p variants={slideUpItem} className="text-base sm:text-lg text-muted-foreground mb-6 font-medium max-w-2xl mx-auto md:mx-0 leading-relaxed">
                {isCompleted 
                  ? "Incredible job! You have solved all coding problems! You are now officially entered into the Annual Grand Lottery. Click the glowing ticket to shake the virtual lottery box!"
                  : "Finish ALL coding problems to secure your entry into the Grand Lottery Draw! Once a year, the final winner is chosen purely by a transparent, real-time shaking lottery system."}
              </motion.p>

              {/* Enhanced Progress bar */}
              <motion.div variants={slideUpItem} className="flex flex-col gap-2 mb-8 max-w-md mx-auto md:mx-0">
                <div className="flex justify-between items-end px-1">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Your Progress</span>
                  <span className={`text-sm font-black px-2 py-0.5 rounded-md ${isCompleted ? "bg-green-500/20 text-green-500" : "bg-python-yellow/20 text-python-yellow"}`}>
                    {solved} / {totalProblems} Solved
                  </span>
                </div>
                <div className="w-full h-4 bg-secondary/80 rounded-full overflow-hidden border border-border/50 shadow-inner">
                  <motion.div
                    className={`h-full rounded-full relative overflow-hidden ${
                      isCompleted ? "bg-gradient-to-r from-green-400 to-emerald-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
                                  : "bg-gradient-to-r from-python-yellow to-reward-gold shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                    }`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, type: "spring", bounce: 0.3, delay: 0.6 }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-white/30 skew-x-[-20deg] w-[200%]"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Call to Action Button */}
              <motion.div variants={slideUpItem}>
                {!isCompleted ? (
                  <Link
                    to="/problems"
                    className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-python-yellow text-background text-base font-black hover:bg-yellow-400 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(250,204,21,0.3)] overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Start Coding Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 rounded-xl" />
                  </Link>
                ) : (
                  <button
                    onClick={triggerLottery}
                    disabled={isShaking}
                    className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-green-500 text-white text-base font-black hover:bg-green-400 transition-all hover:scale-105 active:scale-95 shadow-[0_0_35px_rgba(34,197,94,0.4)] overflow-hidden disabled:opacity-80 disabled:hover:scale-100"
                  >
                    <Sparkles className={`w-5 h-5 ${!isShaking && "animate-pulse"}`} />
                    <span className="relative z-10">
                      {isShaking ? "Shaking the Lottery Box..." : "Reveal My Lottery Status!"}
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 rounded-xl" />
                  </button>
                )}
              </motion.div>
            </div>

            {/* Floating Background Element */}
            <motion.div 
              className="absolute right-[-5%] top-[-10%] opacity-10 pointer-events-none hidden md:block"
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <Ticket className="w-[300px] h-[300px] text-foreground" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
