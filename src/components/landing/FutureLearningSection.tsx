// ============================================================
// FUTURE LEARNING SECTION — src/components/landing/FutureLearningSection.tsx
// Teaser section on the landing page announcing upcoming courses
// like Java, JavaScript, etc. Gives the startup feel.
// ============================================================

import { motion } from "framer-motion";
import { Rocket, Code2, Coffee, Globe, Brain, Sparkles } from "lucide-react";

const upcomingCourses = [
  { emoji: "☕", title: "Java", desc: "Enterprise-grade programming", icon: Coffee, color: "text-orange-400", borderColor: "border-orange-400/30", bgColor: "bg-orange-400/10" },
  { emoji: "🌐", title: "JavaScript", desc: "Web development essentials", icon: Globe, color: "text-yellow-400", borderColor: "border-yellow-400/30", bgColor: "bg-yellow-400/10" },
  { emoji: "⚛️", title: "React", desc: "Modern UI frameworks", icon: Code2, color: "text-cyan-400", borderColor: "border-cyan-400/30", bgColor: "bg-cyan-400/10" },
  { emoji: "🤖", title: "AI / ML", desc: "Machine learning deep dives", icon: Brain, color: "text-purple-400", borderColor: "border-purple-400/30", bgColor: "bg-purple-400/10" },
];

export function FutureLearningSection() {
  return (
    <section className="py-16 px-4 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
            <Rocket className="w-3.5 h-3.5" />
            Coming Soon
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            We're Bringing <span className="text-primary">More Languages</span> to You
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            PyMaster is just the beginning. We're building a complete learning ecosystem with Java, JavaScript, React, and AI/ML courses — all with the same interactive, reward-based approach.
          </p>
        </motion.div>

        {/* Course cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {upcomingCourses.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-xl border ${course.borderColor} ${course.bgColor} p-5 text-center group hover:scale-105 transition-transform duration-300`}
            >
              <div className="text-4xl mb-3">{course.emoji}</div>
              <h3 className={`text-lg font-bold ${course.color}`}>{course.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{course.desc}</p>
              <div className="mt-3 inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3" />
                Coming 2026
              </div>
            </motion.div>
          ))}
        </div>

        {/* Startup note */}
        <motion.p
          className="text-center text-xs text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          🚀 PyMaster is a bootstrapped EdTech startup on a mission to make coding education free and fun for everyone.
        </motion.p>
      </div>
    </section>
  );
}
