// ============================================================
// LANDING PAGE — src/pages/LandingPage.tsx
// The main homepage users see at "/". Assembles all landing
// sections in order: hero, getting started, features, roadmap,
// problems preview, testimonials, career roadmap, and CTA.
// Also includes the animated space background and shooting stars.
// ============================================================

import { Helmet } from "react-helmet-async";
import { Suspense, useEffect, useState } from "react";
import { VantaBackground } from "@/components/VantaBackground";
import { ShootingStars } from "@/components/ShootingStars";
import { DailyWantedLevel } from "@/components/DailyWantedLevel";
import { HeroSection } from "@/components/landing/HeroSection";
import { GettingStartedSection } from "@/components/landing/GettingStartedSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { RoadmapSection } from "@/components/landing/RoadmapSection";
import { BasicProblemsSection } from "@/components/landing/BasicProblemsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CareerRoadmap } from "@/components/CareerRoadmap";
import { FutureLearningSection } from "@/components/landing/FutureLearningSection";
import { CTASection } from "@/components/landing/CTASection";
import { WinnerBanner } from "@/components/landing/WinnerBanner";
import { LiveActivityFeed } from "@/components/landing/LiveActivityFeed";
import { GoogleAd } from "@/components/ads/GoogleAd";

// Simple loading fallback for sections
const SectionLoading = () => <div className="h-96 bg-surface-1 animate-pulse rounded-lg" />;

export default function LandingPage() {
  const [hideFloatingBadges, setHideFloatingBadges] = useState(false);

  useEffect(() => {
    const syncSidebarState = (event?: Event) => {
      const nextOpen =
        event && "detail" in event && typeof (event as CustomEvent<{ open?: boolean }>).detail?.open === "boolean"
          ? Boolean((event as CustomEvent<{ open?: boolean }>).detail.open)
          : document.body.dataset.sidebarOpen === "true";
      setHideFloatingBadges(nextOpen);
    };

    syncSidebarState();
    window.addEventListener("pymaster-sidebar-change", syncSidebarState as EventListener);

    return () => {
      window.removeEventListener("pymaster-sidebar-change", syncSidebarState as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden relative w-full">
      <Helmet>
        <title>PyMaster | Learn Python with Lessons, Challenges, Jobs, and Certificates</title>
        <meta name="description" content="Learn Python with structured lessons, coding challenges, interview prep, a browser compiler, certificate pathways, and a practical Python job board." />
        <meta name="keywords" content="Python, Learn Python, Python Course, Coding Interview, Data Structures, Algorithms" />
        <meta property="og:title" content="PyMaster | Learn Python with Real Practice" />
        <meta property="og:description" content="Structured Python learning, coding challenges, quick prep, career tracks, and certificate pathways in one platform." />
        <meta name="twitter:title" content="PyMaster | Learn Python with Real Practice" />
        <meta name="twitter:description" content="Structured Python lessons, interactive challenges, and practical job-focused prep." />
      </Helmet>
      {/* Restored Native VantaJS Clouds - Guaranteed smooth functionality */}
      <VantaBackground />
      {/* Clickable shooting stars that quiz users with Python riddles for XP */}
      <ShootingStars />
      {!hideFloatingBadges && <DailyWantedLevel />}
      {!hideFloatingBadges && (
        <div className="fixed left-3 top-[6.1rem] z-[998] hidden sm:block sm:left-4">
          <LiveActivityFeed />
        </div>
      )}
      {/* Main hero with headline, CTA buttons, and quick stats */}
      <HeroSection />
      {/* Visual divider between sections */}
      <div className="section-divider py-2" />
      {/* 4-step getting started guide for new users */}
      <GettingStartedSection />
      {/* 6 feature cards (lessons, editor, problems, rewards, streaks, difficulty) */}
      <FeaturesSection />
      <section className="container mx-auto px-4 sm:px-6 py-4">
        <GoogleAd
          slot={import.meta.env.VITE_ADSENSE_SLOT_HOME}
          label="Sponsored Learning Pick"
          minHeight={170}
        />
      </section>
      {/* 5-step learning path from basics to advanced */}
      <RoadmapSection />
      {/* Preview of the 50 basic problems with code example */}
      <BasicProblemsSection />
      {/* $10K winner challenge banner */}
      <WinnerBanner />
      {/* User testimonials grid */}
      <TestimonialsSection />
      {/* Career paths section (Data, Web, AI, etc.) with expandable details */}
      <CareerRoadmap />
      {/* Coming soon: Java, JavaScript, React, AI/ML courses */}
      <FutureLearningSection />
      {/* Final call-to-action with "Start Now" and "Browse Jobs" buttons */}
      <CTASection />
    </div>
  );
}
