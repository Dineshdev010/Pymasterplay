// ============================================================
// LEARN PAGE — src/pages/LearnPage.tsx
// Interactive Python lesson viewer with categorized lessons,
// exercise editor, ad-to-unlock, and progress tracking.
// ============================================================
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { lessons } from "@/data/lessons";
import { useProgress } from "@/contexts/ProgressContext";
import { useAuth } from "@/contexts/AuthContext";
import { AdViewModal } from "@/components/AdViewModal";
import { SPONSOR_DESTINATIONS } from "@/data/ads";
import { BookOpen, CheckCircle2, Lock, Play, Sparkles, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCallback } from "react";
import {
  categoryOrder,
  getCategoryColor,
  topicCoverage,
  beginnerMastery,
  getLocalizedLesson,
  LearnLanguage,
  pageTextTranslations,
} from "@/data/learnPageData";
import { LessonSidebar } from "@/components/learn/LessonSidebar";
import { LessonContent } from "@/components/learn/LessonContent";


export default function LearnPage() {
  const { language } = useLanguage();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { progress, completeLesson, unlockLesson, resetLesson } = useProgress();
  const [lessonSearch, setLessonSearch] = useState("");
  const { user } = useAuth();
  const [bannerDismissed, setBannerDismissed] = useState(() => {
    return localStorage.getItem("pymaster_guest_banner_dismissed") === "true";
  });
  const navigate = useNavigate();
  const categories = categoryOrder.filter((category) => {
    const catLessons = lessons.filter((lesson) => lesson.category === category);
    if (!lessonSearch) return catLessons.length > 0;
    return catLessons.some(l => 
      l.title.toLowerCase().includes(lessonSearch.toLowerCase()) ||
      (l.category as string).toLowerCase().includes(lessonSearch.toLowerCase())
    );
  });
  const text = pageTextTranslations;
  // Keep Learn page UI labels fixed; only lesson content is language-dependent.
  const t = text.english;
  const tt = (key: string, fallback: string) => (t as Record<string, string>)[key] ?? fallback;



  const selectedLesson = useMemo(() => {
    const baseLesson = lessons.find((l) => l.id === selectedId);
    return getLocalizedLesson(baseLesson, language);
  }, [selectedId, language]);
  const canonical = "https://pymaster.pro/learn";
  const pageTitle = selectedLesson
    ? `${selectedLesson.title} Lesson | Learn Python on PyMaster`
    : "Learn Python Online for Free | Beginner to Advanced Lessons | PyMaster";
  const pageDescription = selectedLesson
    ? `Learn ${selectedLesson.title} in Python with clear explanation, practical examples, and hands-on exercises on PyMaster.`
    : "Learn Python online with step-by-step beginner to advanced lessons, practical examples, quizzes, and coding exercises on PyMaster.";
  const pageKeywords = selectedLesson
    ? `learn ${selectedLesson.title} python, ${selectedLesson.title} python tutorial, python ${selectedLesson.title} examples, python practice`
    : "learn python, python tutorial, python for beginners, python exercises, python course online, python interview preparation, python coding practice, python lessons";

  const learnStructuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Learn Python Step by Step",
    description: "Structured Python learning path with clear explanations, code examples, exercises, and progression from beginner to expert.",
    provider: {
      "@type": "Organization",
      name: "PyMaster",
      url: "https://pymaster.pro",
    },
    educationalLevel: "Beginner to Advanced",
    inLanguage: "en",
    url: canonical,
  };
  const webpageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: canonical,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: "PyMaster",
      url: "https://pymaster.pro",
    },
    primaryImageOfPage: "https://pymaster.pro/og-image.png",
    about: lessons.slice(0, 12).map((lesson) => ({
      "@type": "Thing",
      name: lesson.title,
    })),
  };
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://pymaster.pro/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Learn Python",
        item: canonical,
      },
    ],
  };
  const lessonsItemListStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Python Lessons on PyMaster",
    numberOfItems: lessons.length,
    itemListElement: lessons.map((lesson, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: lesson.title,
      description: lesson.description,
    })),
  };
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can beginners learn Python on PyMaster?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Lessons start from fundamentals and provide clear explanations, examples, and exercises for beginners.",
        },
      },
      {
        "@type": "Question",
        name: "Does PyMaster include coding practice?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Each lesson includes exercises and you can run Python code in the built-in compiler.",
        },
      },
      {
        "@type": "Question",
        name: "What Python topics are covered?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The platform covers Python basics, data structures, functions, OOP, files, exceptions, APIs, and advanced topics.",
        },
      },
    ],
  };
  const exampleEditorHeight = useMemo(() => {
    if (!selectedLesson) return 220;
    const lineCount = selectedLesson.codeExample.split("\n").length;
    return Math.min(460, Math.max(200, lineCount * 22 + 24));
  }, [selectedLesson]);

  // A lesson is unlocked if:
  // - It's the first one
  // - All 3 exercises of the previous lesson are completed
  // - User paid $100 to unlock it
  const isLessonUnlocked = (index: number): boolean => {
    if (index === 0) return true;
    const lesson = lessons[index];
    if (progress.unlockedLessons.includes(lesson.id)) return true;
    const prevLesson = lessons[index - 1];
    const levels = ["beginner", "intermediate", "advanced"];
    return levels.every(l => progress.completedExercises.includes(`${prevLesson.id}:${l}`));
  };

  const isExerciseUnlocked = (lessonId: string, level: "beginner" | "intermediate" | "advanced"): boolean => {
    if (level === "beginner") return true;
    if (level === "intermediate") return progress.completedExercises.includes(`${lessonId}:beginner`);
    if (level === "advanced") return progress.completedExercises.includes(`${lessonId}:intermediate`);
    return false;
  };

  const getLessonProgress = (lessonId: string) => {
    const levels = ["beginner", "intermediate", "advanced"] as const;
    return levels.filter(l => progress.completedExercises.includes(`${lessonId}:${l}`)).length;
  };

  const [showAdForLesson, setShowAdForLesson] = useState<string | null>(null);

  const handleAdUnlock = (lessonId: string) => {
    setShowAdForLesson(lessonId);
  };

  const handleAdComplete = () => {
    if (showAdForLesson) {
      unlockLesson(showAdForLesson, 0);
      toast.success(tt("chapterUnlocked", "Chapter unlocked! 🔓"), {
        description: tt("sponsorThanks", "Thanks for viewing the sponsor message."),
      });
      setSelectedId(showAdForLesson);
      setShowAdForLesson(null);
    }
  };

  const handleWalletUnlock = (lessonId: string) => {
    const unlocked = unlockLesson(lessonId);
    if (!unlocked) {
      toast.error(tt("notEnoughCash", "Not enough cash"), {
        description: tt("walletNeed100", "You need $100 in your wallet to unlock this lesson instantly."),
      });
      return;
    }

    toast.success(tt("chapterUnlocked", "Chapter unlocked! 🔓"), {
      description: tt("walletSpent100", "You spent $100 to unlock this lesson."),
    });
    setSelectedId(lessonId);
  };

  const handleSelectLesson = (lessonId: string, index: number, unlocked: boolean) => {

    if (unlocked) {
      setSelectedId(lessonId);
    } else {
      handleAdUnlock(lessonId);
    }
  };

  const getLessonsByCategory = (cat: string) => {
    const catLessons = lessons.filter(l => l.category === cat);
    if (!lessonSearch) return catLessons;
    return catLessons.filter(l => 
      l.title.toLowerCase().includes(lessonSearch.toLowerCase()) ||
      (l.category as string).toLowerCase().includes(lessonSearch.toLowerCase())
    );
  };

  useEffect(() => {
    if (!selectedLesson) return;
    const levels = ["beginner", "intermediate", "advanced"] as const;
    const lessonFullyCompleted = levels.every((level) => progress.completedExercises.includes(`${selectedLesson.id}:${level}`));
    if (lessonFullyCompleted) {
      completeLesson(selectedLesson.id);
    }
  }, [completeLesson, progress.completedExercises, selectedLesson]);

  return (
    <>
    <Helmet>
      <title>{pageTitle}</title>
      <meta
        name="description"
        content={pageDescription}
      />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content="PyMaster" />
      <meta name="language" content="en" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="PyMaster" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content="https://pymaster.pro/og-image.png" />
      <meta property="og:image:alt" content="Learn Python step by step with PyMaster lessons" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content="https://pymaster.pro/og-image.png" />
      <script type="application/ld+json">{JSON.stringify(learnStructuredData)}</script>
      <script type="application/ld+json">{JSON.stringify(webpageStructuredData)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbStructuredData)}</script>
      <script type="application/ld+json">{JSON.stringify(lessonsItemListStructuredData)}</script>
      <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
    </Helmet>
    <AdViewModal
      isOpen={!!showAdForLesson}
      onClose={() => setShowAdForLesson(null)}
      onComplete={handleAdComplete}
      sponsorLink={SPONSOR_DESTINATIONS.lessonUnlock}
      completionTitle={tt("lessonUnlocked", "Lesson unlocked")}
      completionDescription={tt("sponsorThanks", "Thanks for viewing the sponsor message.")}
    />
    {!user && !bannerDismissed && (
      <div className="bg-primary/10 backdrop-blur-md border-b border-primary/20 px-4 py-2.5 sm:py-3 relative group animate-in fade-in slide-in-from-top duration-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 pr-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <p className="text-sm font-medium text-foreground leading-snug">
              You're learning as a guest! Your progress is currently saved in this browser. 
              <span className="hidden md:inline"> Sign in to sync across devices and secure your streak.</span>
            </p>
          </div>
          <Link 
            to="/auth" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 whitespace-nowrap"
          >
            Sign In to Sync
          </Link>
        </div>
        <button 
          onClick={() => {
            setBannerDismissed(true);
            localStorage.setItem("pymaster_guest_banner_dismissed", "true");
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-all hover:bg-secondary rounded-full"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    )}
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col md:h-[calc(100vh-3.5rem)] md:flex-row">
      {/* Sidebar */}
      <LessonSidebar
        t={t}
        lessonSearch={lessonSearch}
        setLessonSearch={setLessonSearch}
        progress={progress}
        categories={categories}
        getLessonsByCategory={getLessonsByCategory}
        language={language}
        selectedId={selectedId}
        handleSelectLesson={handleSelectLesson}
        isLessonUnlocked={isLessonUnlocked}
        getLessonProgress={getLessonProgress}
      />

      {/* Content */}
      <LessonContent
        t={t}
        tt={tt}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        selectedLesson={selectedLesson}
        language={language}
        categories={categories}
        getLessonsByCategory={getLessonsByCategory}
        handleSelectLesson={handleSelectLesson}
        isLessonUnlocked={isLessonUnlocked}
        getLessonProgress={getLessonProgress}
        isExerciseUnlocked={isExerciseUnlocked}
        resetLesson={resetLesson}
        handleAdUnlock={handleAdUnlock}
        handleWalletUnlock={handleWalletUnlock}
      />

    </div>
    </>
  );
}
