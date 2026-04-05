// ============================================================
// GETTING STARTED SECTION — src/components/landing/GettingStartedSection.tsx
// A 4-step guide for new users explaining how to use the platform:
// 1. Start with Lessons → 2. Practice in Editor →
// 3. Solve Problems → 4. Track Your Progress
// Each step is a clickable card that navigates to the relevant page.
// ============================================================

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Terminal, Code, Trophy, Compass } from "lucide-react";
import { fadeUp } from "./HeroSection";

// ---------- Step definitions ----------
// Each step has a number, title, description, icon, link, and color scheme
const gettingStartedSteps = [
  { step: 1, title: "Start with Lessons", desc: "Begin with Python Fundamentals — learn variables, syntax, and your first program", icon: BookOpen, link: "/learn", color: "text-primary", bg: "bg-primary/10 border-primary/20" },
  { step: 2, title: "Practice in the Editor", desc: "Open the built-in code editor and run Python code right in your browser", icon: Terminal, link: "/compiler", color: "text-streak-green", bg: "bg-streak-green/10 border-streak-green/20" },
  { step: 3, title: "Solve Problems", desc: "Test your skills with 50+ coding challenges from basic to expert", icon: Code, link: "/problems", color: "text-python-yellow", bg: "bg-python-yellow/10 border-python-yellow/20" },
  { step: 4, title: "Track Your Progress", desc: "Watch your streak grow, earn rewards, and climb the leaderboard", icon: Trophy, link: "/dashboard", color: "text-reward-gold", bg: "bg-reward-gold/10 border-reward-gold/20" },
];

export function GettingStartedSection() {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section header with "New to Python?" badge */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-streak-green/10 border border-streak-green/20 text-streak-green text-sm mb-4">
            <Compass className="w-3.5 h-3.5" /> New to Python?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2">Getting Started Guide</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm sm:text-base">Follow these 4 simple steps to go from zero to Python hero</p>
        </motion.div>

        {/* Steps grid — 4 clickable cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {gettingStartedSteps.map((item, i) => (
            <motion.div
              key={item.step}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              onClick={() => navigate(item.link)}
              className={`group relative cursor-pointer rounded-2xl p-5 sm:p-6 border ${item.bg} hover:-translate-y-2 transition-all duration-300`}
            >
              {/* Step icon */}
              <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-3`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              {/* Step number label */}
              <div className={`text-xs font-bold ${item.color} mb-1`}>Step {item.step}</div>
              {/* Step title and description */}
              <h3 className="font-bold text-foreground mb-1 text-sm sm:text-base">{item.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              {/* Arrow icon — appears on hover */}
              <ArrowRight className={`absolute top-5 right-4 w-4 h-4 ${item.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
