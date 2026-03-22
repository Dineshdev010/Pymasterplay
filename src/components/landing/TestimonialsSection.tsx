// ============================================================
// TESTIMONIALS SECTION — src/components/landing/TestimonialsSection.tsx
// Displays user testimonials in a 3-column grid.
// Each card shows star rating, quote text, and user info.
// Uses the fadeUp animation for staggered entrance.
// ============================================================

import { motion } from "framer-motion";
import { Star, Users } from "lucide-react";
import { fadeUp } from "./HeroSection";

// ---------- Testimonial data ----------
// Each testimonial has a name, role, quote text, and star count
const testimonials = [
  { name: "Alex K.", role: "Student", text: "Finally a platform that explains Python without jargon. The exercises actually make sense!", stars: 5 },
  { name: "Maria S.", role: "Career Changer", text: "The basic problems section was perfect for building confidence before tackling harder ones.", stars: 5 },
  { name: "David L.", role: "Self-taught Dev", text: "I love the reward system — it keeps me coming back every day. 30-day streak and counting!", stars: 5 },
];

export function TestimonialsSection() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
      {/* Section header */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12 sm:mb-16">
        <span className="text-primary text-sm font-semibold tracking-wider uppercase">Testimonials</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2">Loved by Learners</h2>
      </motion.div>
      {/* Testimonial cards grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            className="bg-card border border-border rounded-2xl p-5 sm:p-6 hover:border-primary/30 transition-all duration-300"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
          >
            {/* Star rating */}
            <div className="flex gap-1 mb-3">
              {Array.from({ length: t.stars }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-python-yellow text-python-yellow" />
              ))}
            </div>
            {/* Quote text */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">"{t.text}"</p>
            {/* User info with avatar */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
