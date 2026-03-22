// ============================================================
// ROADMAP SECTION — src/components/landing/RoadmapSection.tsx
// Shows a 5-step learning path from Python Basics to OOP & Advanced.
// Each step is a card linked to the /learn page.
// On desktop, a connecting gradient line runs behind the cards.
// ============================================================

import { Link } from "react-router-dom";
import { motion, type Easing } from "framer-motion";
import { BookOpen, Code, Zap, Target, Trophy } from "lucide-react";
import { fadeUp } from "./HeroSection";

// ---------- Roadmap step definitions ----------
// Each step has a title, short description, icon, gradient color, and link
const roadmapItems = [
  { title: "Python Basics", desc: "Variables, syntax, data types", icon: BookOpen, color: "from-primary to-primary/60", link: "/learn" },
  { title: "Control Flow", desc: "Conditions, loops, logic", icon: Zap, color: "from-streak-green to-streak-green/60", link: "/learn" },
  { title: "Functions", desc: "Reusable code, modules", icon: Code, color: "from-python-yellow to-python-yellow/60", link: "/learn" },
  { title: "Data Structures", desc: "Lists, dicts, sets", icon: Target, color: "from-reward-gold to-reward-gold/60", link: "/learn" },
  { title: "OOP & Advanced", desc: "Classes, decorators", icon: Trophy, color: "from-expert-purple to-expert-purple/60", link: "/learn" },
];

export function RoadmapSection() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
      {/* Section header */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12 sm:mb-16">
        <span className="text-primary text-sm font-semibold tracking-wider uppercase">Learning Path</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2">Your Python Roadmap</h2>
        <p className="text-muted-foreground mt-3">Follow the path from zero to Python hero</p>
      </motion.div>
      <div className="relative">
        {/* Connecting gradient line — visible only on desktop (md+) */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-expert-purple/20 -translate-y-1/2" />
        {/* Roadmap step cards */}
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch">
          {roadmapItems.map((item, i) => (
            <motion.div
              key={item.title}
              className="flex-1 relative"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
            >
              <Link to={item.link} className="relative bg-card border border-border rounded-2xl p-5 sm:p-6 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 h-full block">
                {/* Step icon with gradient background */}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3`}>
                  <item.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                {/* Step number label */}
                <div className="text-xs font-semibold text-primary mb-1">Step {i + 1}</div>
                <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
