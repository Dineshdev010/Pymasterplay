// ============================================================
// FEATURES SECTION — src/components/landing/FeaturesSection.tsx
// Displays 6 key features of the platform in a responsive grid:
// - Crystal Clear Lessons, Built-in Code Editor, 50+ Basic Problems
// - Earn Rewards, Daily Streaks, Progressive Difficulty
// Each card is clickable and navigates to the relevant page.
// Uses the scaleIn animation for a pop-in effect.
// ============================================================

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Terminal, Code, Trophy, Flame, Brain } from "lucide-react";
import { fadeUp } from "./HeroSection";

// Scale-in animation variant — cards pop in from slightly smaller
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.1, duration: 0.4 } }),
};

// ---------- Feature definitions ----------
// Each feature has an icon, title, description, gradient colors, and a link
const features = [
  { icon: BookOpen, title: "Crystal Clear Lessons", desc: "Every concept explained step-by-step with real examples and visual aids", gradient: "from-primary/20 to-primary/5", link: "/learn" },
  { icon: Terminal, title: "Built-in Code Editor", desc: "Write, run, and test Python code directly in your browser — no setup needed", gradient: "from-streak-green/20 to-streak-green/5", link: "/compiler" },
  { icon: Code, title: "50+ Basic Problems", desc: "Master fundamentals with our curated collection of beginner-friendly challenges", gradient: "from-python-yellow/20 to-python-yellow/5", link: "/problems" },
  { icon: Trophy, title: "Earn Rewards", desc: "Get virtual coins for every problem you solve — climb the leaderboard", gradient: "from-reward-gold/20 to-reward-gold/5", link: "/leaderboard" },
  { icon: Flame, title: "Daily Streaks", desc: "Build consistency with streak tracking — don't break the chain!", gradient: "from-destructive/20 to-destructive/5", link: "/dashboard" },
  { icon: Brain, title: "Progressive Difficulty", desc: "Start basic, go expert — problems scale with your growing skills", gradient: "from-expert-purple/20 to-expert-purple/5", link: "/problems" },
];

export function FeaturesSection() {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12 sm:mb-16 bg-card/60 backdrop-blur-xl border border-white/10 p-6 sm:p-10 rounded-3xl inline-block w-full shadow-2xl">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase drop-shadow-sm">Why Choose Us</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 drop-shadow-sm">Everything You Need to Master Python</h2>
          <p className="text-foreground/80 mt-3 max-w-xl mx-auto text-sm sm:text-base drop-shadow-sm">No fluff, no confusion — just clear explanations and hands-on practice</p>
        </motion.div>
        {/* Feature cards grid — 3 columns on large screens */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className={`group relative bg-gradient-to-b ${f.gradient} border border-border rounded-2xl p-5 sm:p-6 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={i}
              onClick={() => navigate(f.link)}
            >
              {/* Feature icon in a bordered box */}
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-card border border-border flex items-center justify-center mb-4 group-hover:border-primary/40 transition-colors">
                <f.icon className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-base sm:text-lg mb-2">{f.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              {/* "Explore →" link that appears on hover */}
              <span className="inline-flex items-center gap-1 mt-3 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <ArrowRight className="w-3 h-3" />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
