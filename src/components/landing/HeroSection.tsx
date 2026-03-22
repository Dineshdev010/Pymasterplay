// ============================================================
// HERO SECTION — src/components/landing/HeroSection.tsx
// The main hero banner at the top of the landing page.
// Features: animated headline, CTA buttons, platform stats,
// streak display, floating code snippets, parallax scroll effect.
// Also exports the `fadeUp` animation variant used by other sections.
// ============================================================

import { Link, useNavigate } from "react-router-dom";
import { motion, type Easing } from "framer-motion";
import { ArrowRight, BookOpen, Code, Terminal, Trophy, Flame, Zap, Target, Sparkles, Rocket, Brain, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/contexts/ProgressContext";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { StreakFire } from "@/components/StreakFire";

// ---------- Platform stats shown below the CTA ----------
const stats = [
  { value: "25+", label: "Python Lessons", icon: BookOpen },
  { value: "100+", label: "Coding Problems", icon: Code },
  { value: "5", label: "Difficulty Levels", icon: Target },
  { value: "∞", label: "Practice Time", icon: Flame },
];

// ---------- Shared animation variant ----------
// Used by many landing sections — fades up with staggered delay
export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as Easing } }),
};

// Continuous floating animation for decorative code snippets
const floatingAnimation = {
  y: [-8, 8, -8],
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as Easing },
};

export function HeroSection() {
  const { progress } = useProgress();
  const heroRef = useRef<HTMLDivElement>(null);

  // ---------- Parallax scroll effect ----------
  // As user scrolls down, the hero fades out and slightly shrinks
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,hsl(212_92%_45%_/_0.1),transparent_60%),radial-gradient(ellipse_at_80%_70%,hsl(130_55%_42%_/_0.06),transparent_60%)]" />
      
      {/* Floating code snippet — top left (desktop only) */}
      <motion.div animate={floatingAnimation} className="absolute top-20 left-[10%] hidden lg:block opacity-20">
        <div className="bg-surface-1 border border-border rounded-lg p-3 font-mono text-xs text-muted-foreground">
          <span className="text-primary">def</span> hello():<br/>
          &nbsp;&nbsp;<span className="text-streak-green">print</span>("🐍")
        </div>
      </motion.div>
      {/* Floating code snippet — bottom right (desktop only) */}
      <motion.div animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1.5 } }} className="absolute bottom-32 right-[8%] hidden lg:block opacity-20">
        <div className="bg-surface-1 border border-border rounded-lg p-3 font-mono text-xs text-muted-foreground">
          <span className="text-python-yellow">for</span> i <span className="text-primary">in</span> range(∞):<br/>
          &nbsp;&nbsp;learn()
        </div>
      </motion.div>

      {/* Main hero content with parallax */}
      <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative max-w-5xl mx-auto px-4 sm:px-6 py-24 md:py-32 text-center w-full">
        {/* "Free Python Learning Platform" badge */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-8">
            <Sparkles className="w-3.5 h-3.5" /> Free Python Learning Platform
          </span>
        </motion.div>
        
        {/* Main headline with gradient text */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.1]"
          initial="hidden" animate="visible" variants={fadeUp} custom={1}
        >
          Master Python with{" "}
          <span className="bg-gradient-to-r from-primary via-streak-green to-python-yellow bg-clip-text text-transparent animate-pulse">
            PyMaster
          </span>
          <br />
          <span className="text-python-yellow">Build. Learn. Earn.</span>
        </motion.h1>
        
        {/* Subtitle description */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          initial="hidden" animate="visible" variants={fadeUp} custom={2}
        >
          <span className="font-semibold text-foreground">PyMaster</span> — your free Python learning platform with crystal-clear lessons, 100+ coding challenges, 
          a built-in code editor, and a reward system that keeps you hooked.
        </motion.p>

        {/* Streak display — only shown if user has an active streak */}
        {progress.streak > 0 && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2.5} className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-card/60 backdrop-blur-sm border border-border">
              <StreakFire streak={progress.streak} size="md" showQuote />
              <span className="text-sm text-muted-foreground">day streak</span>
            </div>
          </motion.div>
        )}
        
        {/* CTA buttons — Start Learning + Browse Problems */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12"
          initial="hidden" animate="visible" variants={fadeUp} custom={3}
        >
          <Button asChild size="lg" className="gap-2 text-base h-12 px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25">
            <Link to="/learn">
              <Rocket className="w-4 h-4" /> Start Learning Free <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2 text-base h-12 px-8 border-border hover:bg-surface-2">
            <Link to="/problems">
              <Code className="w-4 h-4" /> Browse Problems
            </Link>
          </Button>
        </motion.div>

        {/* Stats grid — shows platform numbers */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto"
          initial="hidden" animate="visible" variants={fadeUp} custom={4}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-3 sm:p-4 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
            >
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll down indicator — bouncing arrow at the bottom */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs text-muted-foreground">Scroll down</span>
        <ChevronDown className="w-7 h-7 text-primary/70" />
      </motion.div>
    </section>
  );
}
