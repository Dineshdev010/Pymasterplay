// ============================================================
// CTA SECTION — src/components/landing/CTASection.tsx
// Final call-to-action at the bottom of the landing page.
// Two buttons: "Start Now — It's Free" and "Browse Python Jobs".
// Uses a gradient background and scale-in animation.
// ============================================================

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Rocket, GraduationCap, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

// Scale-in animation — card pops in from slightly smaller
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.1, duration: 0.4 } }),
};

export function CTASection() {
  return (
    <section className="relative border-t border-border overflow-hidden">
      {/* Subtle gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-24 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={0}>
          {/* Graduation cap icon */}
          <GraduationCap className="w-12 sm:w-16 h-12 sm:h-16 text-primary mx-auto mb-6 opacity-80" />
          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Become a Pythonista?</h2>
          {/* Subtitle */}
          <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-lg mx-auto">
            Join thousands of learners mastering Python with clear lessons and hands-on practice. It's free!
          </p>
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            {/* Primary CTA — Start Learning */}
            <Button asChild size="lg" className="gap-2 text-base h-12 px-8 bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25">
              <Link to="/learn">
                <Rocket className="w-4 h-4" /> Start Now — It's Free <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            {/* Secondary CTA — Browse Jobs */}
            <Button asChild variant="outline" size="lg" className="gap-2 text-base h-12 px-8 border-border hover:bg-surface-2">
              <Link to="/jobs">
                <Briefcase className="w-4 h-4" /> Browse Python Jobs
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
