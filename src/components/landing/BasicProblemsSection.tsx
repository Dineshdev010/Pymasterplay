// ============================================================
// BASIC PROBLEMS SECTION — src/components/landing/BasicProblemsSection.tsx
// A two-column section showcasing the 50 basic Python problems.
// Left side: description with feature list and CTA button.
// Right side: a mock code editor showing a sample problem/solution.
// ============================================================

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp } from "./HeroSection";

// Scale-in animation for the code preview
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.1, duration: 0.4 } }),
};

export function BasicProblemsSection() {
  return (
    <section className="relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
        {/* Two-column grid layout */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left column — description and feature list */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            {/* "New: 50 Basic Problems" badge */}
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-streak-green/10 border border-streak-green/20 text-streak-green text-sm mb-4">
              <Star className="w-3.5 h-3.5" /> New: 50 Basic Problems
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Start With the <span className="text-streak-green">Basics</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              Our curated collection of 50 basic Python problems covers everything a beginner needs — 
              variables, strings, loops, functions, and more.
            </p>
            {/* Feature list with checkmark icons */}
            <div className="space-y-3 mb-6">
              {["Print & Input exercises", "String manipulation", "Loop patterns", "List operations", "Function basics"].map((item, i) => (
                <motion.div key={item} className="flex items-center gap-2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}>
                  <div className="w-5 h-5 rounded-full bg-streak-green/20 flex items-center justify-center">
                    <Zap className="w-3 h-3 text-streak-green" />
                  </div>
                  <span className="text-sm text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
            {/* CTA button to problems page */}
            <Button asChild className="gap-2 bg-streak-green hover:bg-streak-green/90 text-primary-foreground">
              <Link to="/problems">
                Try Basic Problems <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Right column — mock code editor preview */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={0}
            className="bg-card border border-border rounded-2xl overflow-hidden"
          >
            {/* Editor title bar with traffic light dots */}
            <div className="px-4 py-3 border-b border-border bg-surface-2 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-python-yellow/60" />
              <div className="w-3 h-3 rounded-full bg-streak-green/60" />
              <span className="text-xs text-muted-foreground ml-2 font-mono">basic_problem.py</span>
            </div>
            {/* Sample Python code */}
            <pre className="p-4 sm:p-6 text-xs sm:text-sm font-mono text-foreground leading-relaxed overflow-x-auto">
{`# Problem: Reverse a String
# Write a function that reverses 
# a given string

def reverse_string(s):
    return s[::-1]

# Test it!
result = reverse_string("Python")
print(result)  # "nohtyP" ✓

# You earned $5! 🎉`}
            </pre>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
