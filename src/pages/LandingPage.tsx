// ============================================================
// LANDING PAGE — src/pages/LandingPage.tsx
// The main homepage users see at "/". Assembles all landing
// sections in order: hero, getting started, features, roadmap,
// problems preview, testimonials, career roadmap, and CTA.
// Also includes the animated space background and shooting stars.
// ============================================================

import { Helmet } from "react-helmet-async";
import { lazy, Suspense, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Gamepad2 } from "lucide-react";
import { HeroSection } from "@/components/landing/HeroSection";
import { SkyBackground } from "@/components/landing/SkyBackground";
import { useAuth } from "@/contexts/AuthContext";
import { triggerTour } from "@/components/TourSystem";

// Defer non-critical sections to improve first load performance.
const ShootingStars = lazy(() => import("@/components/ShootingStars").then((m) => ({ default: m.ShootingStars })));
const DailyWantedLevel = lazy(() => import("@/components/DailyWantedLevel").then((m) => ({ default: m.DailyWantedLevel })));
const GettingStartedSection = lazy(() => import("@/components/landing/GettingStartedSection").then((m) => ({ default: m.GettingStartedSection })));
const FeaturesSection = lazy(() => import("@/components/landing/FeaturesSection").then((m) => ({ default: m.FeaturesSection })));
const RoadmapSection = lazy(() => import("@/components/landing/RoadmapSection").then((m) => ({ default: m.RoadmapSection })));
const BasicProblemsSection = lazy(() => import("@/components/landing/BasicProblemsSection").then((m) => ({ default: m.BasicProblemsSection })));
const TestimonialsSection = lazy(() => import("@/components/landing/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection })));
const CareerRoadmap = lazy(() => import("@/components/CareerRoadmap").then((m) => ({ default: m.CareerRoadmap })));
const FutureLearningSection = lazy(() => import("@/components/landing/FutureLearningSection").then((m) => ({ default: m.FutureLearningSection })));
const CTASection = lazy(() => import("@/components/landing/CTASection").then((m) => ({ default: m.CTASection })));
const WinnerBanner = lazy(() => import("@/components/landing/WinnerBanner").then((m) => ({ default: m.WinnerBanner })));
const LiveActivityFeed = lazy(() => import("@/components/landing/LiveActivityFeed").then((m) => ({ default: m.LiveActivityFeed })));

export default function LandingPage() {
  const canonical = "https://pymaster.pro/";
  const [hideFloatingBadges, setHideFloatingBadges] = useState(false);
  const [deferFx, setDeferFx] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Automatically trigger the home tour for logged-in users
    if (user) {
      const timer = setTimeout(() => {
        triggerTour("home");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback;
    if (idle) {
      idle(() => setDeferFx(true), { timeout: 1200 });
      return;
    }

    const t = window.setTimeout(() => setDeferFx(true), 700);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const syncSidebarState = (event?: Event) => {
      const detail =
        event && "detail" in event
          ? ((event as CustomEvent<{ sidebarOpen?: boolean; profileOpen?: boolean }>).detail ?? {})
          : {};
      const sidebarOpen =
        typeof detail.sidebarOpen === "boolean" ? detail.sidebarOpen : document.body.dataset.sidebarOpen === "true";
      const profileOpen =
        typeof detail.profileOpen === "boolean" ? detail.profileOpen : document.body.dataset.navProfileOpen === "true";
      const nextOpen = sidebarOpen || profileOpen;
      setHideFloatingBadges(nextOpen);
    };

    syncSidebarState();
    window.addEventListener("pymaster-sidebar-change", syncSidebarState as EventListener);

    return () => {
      window.removeEventListener("pymaster-sidebar-change", syncSidebarState as EventListener);
    };
  }, []);

  const compactSectionClass = "cv-auto -mt-4 sm:-mt-6";

  return (
    <div className="min-h-screen overflow-x-hidden relative w-full">
      <Helmet>
        <title>PyMaster | Learn Python with Lessons, Challenges, Jobs, and Certificates</title>
        <meta name="description" content="Learn Python with structured lessons, coding challenges, interview prep, a browser compiler, certificate pathways, and a practical Python job board." />
        <meta name="keywords" content="Python, Learn Python, Python Course, Coding Interview, Data Structures, Algorithms" />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content="PyMaster | Learn Python with Real Practice" />
        <meta property="og:description" content="Structured Python learning, coding challenges, quick prep, career tracks, and certificate pathways in one platform." />
        <meta property="og:image" content="https://pymaster.pro/og-image.png" />
        <meta property="og:image:alt" content="PyMaster Python learning platform preview" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PyMaster | Learn Python with Real Practice" />
        <meta name="twitter:description" content="Structured Python lessons, interactive challenges, and practical job-focused prep." />
        <meta name="twitter:image" content="https://pymaster.pro/og-image.png" />
      </Helmet>
      
      <SkyBackground />
      {deferFx && (
        <Suspense fallback={null}>
          <ShootingStars />
        </Suspense>
      )}
      {!hideFloatingBadges && deferFx && (
        <Suspense fallback={null}>
          <DailyWantedLevel />
        </Suspense>
      )}
      {!hideFloatingBadges && (
        <div className="fixed left-2 top-[calc(env(safe-area-inset-top)+4.2rem)] z-[998] flex max-w-[calc(100vw-1rem)] flex-col gap-2 sm:left-4 sm:top-[4.15rem]">
          {deferFx && (
            <div className="hidden sm:block">
              <Suspense fallback={null}>
                <LiveActivityFeed />
              </Suspense>
            </div>
          )}
        </div>
      )}
      
      <HeroSection />
      
      <section id="tour-game" className="container mx-auto px-4 sm:px-6 py-2">
        <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-background/80 p-2 text-primary">
                <Gamepad2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-foreground">Try Our Drag and Drop Python Game</h2>
                <p className="text-sm text-muted-foreground">
                  Build Python code by dragging blocks and dropping them into the canvas.
                </p>
              </div>
            </div>
            <Link
              to="/python-game"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Open Python Game
            </Link>
          </div>
        </div>
      </section>

      <section id="tour-roadmap" className="container mx-auto px-4 sm:px-6 py-2">
        <div className="rounded-2xl border border-border bg-card/80 p-4">
          <h2 className="text-sm font-semibold text-foreground sm:text-base">New: Python Learning For Beginners Guide</h2>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Follow a clear beginner roadmap with daily plan, lessons, compiler practice, and DSA basics.
          </p>
          <Link to="/python-learning-for-beginners" className="mt-2 inline-flex text-sm font-semibold text-primary hover:underline">
            Open beginner guide
          </Link>
        </div>
      </section>

      <div className="section-divider py-1" />

      <div className={compactSectionClass}>
        <Suspense fallback={null}>
          <GettingStartedSection />
        </Suspense>
      </div>

      <div className={compactSectionClass}>
        <Suspense fallback={null}>
          <FeaturesSection />
        </Suspense>
      </div>

      <div className={compactSectionClass}>
        <Suspense fallback={null}>
          <RoadmapSection />
        </Suspense>
      </div>

      <div className={compactSectionClass}>
        <Suspense fallback={null}>
          <BasicProblemsSection />
        </Suspense>
      </div>

      <div className={compactSectionClass}>
        <Suspense fallback={null}>
          <WinnerBanner />
        </Suspense>
      </div>

      <div className={compactSectionClass}>
        <Suspense fallback={null}>
          <TestimonialsSection />
        </Suspense>
      </div>

      <div className={compactSectionClass}>
        <Suspense fallback={null}>
          <CareerRoadmap />
        </Suspense>
      </div>

      <div className={compactSectionClass}>
        <Suspense fallback={null}>
          <FutureLearningSection />
        </Suspense>
      </div>

      <div className={compactSectionClass}>
        <Suspense fallback={null}>
          <CTASection />
        </Suspense>
      </div>
    </div>
  );
}
