// ============================================================
// MASTER TOUR STEPS — src/data/tourSteps.ts
// Single source of truth for the global guided tour.
// Import MASTER_TOUR_STEPS anywhere you need to start the tour.
// ============================================================

import type { TourStep } from "@/contexts/TourContext";

export const MASTER_TOUR_STEPS: TourStep[] = [
  // ── 1. Welcome ──────────────────────────────────────────────────────────────
  {
    page: "/",
    targetId: "",
    title: "Welcome to PyMaster! 🐍",
    content:
      "We're about to take you on a full platform tour — visiting every key page so you know exactly what's available. Click Next to begin!",
  },
  // ── 2. Navigation bar ───────────────────────────────────────────────────────
  {
    page: "/",
    targetId: "tour-nav-links",
    title: "Your Navigation Hub",
    content:
      "This top navbar gives you instant access to every section. Watch how we navigate through it all during this tour.",
  },
  // ── 3. Learn Python ─────────────────────────────────────────────────────────
  {
    page: "/learn",
    targetId: "",
    title: "📖 Structured Learning Tracks",
    content:
      "Step-by-step Python lessons from absolute beginner to expert — with code exercises built into every lesson. Pick a track and go at your own pace.",
  },
  // ── 4. Compiler — Language Switcher ─────────────────────────────────────────
  {
    page: "/compiler",
    targetId: "tour-compiler-lang",
    title: "💻 Multi-Language Compiler",
    content:
      "Switch between Python, Pandas, SQL, and a full Linux terminal — all running live in your browser. Zero installation needed!",
  },
  // ── 5. Compiler — Editor ────────────────────────────────────────────────────
  {
    page: "/compiler",
    targetId: "tour-compiler-editor",
    title: "✍️ Professional Code Editor",
    content:
      "A Monaco-powered editor with syntax highlighting, smart auto-completion, and keyboard shortcuts. Press Ctrl+Enter (⌘+Enter) to run instantly.",
  },
  // ── 6. Compiler — Run ───────────────────────────────────────────────────────
  {
    page: "/compiler",
    targetId: "tour-compiler-run",
    title: "▶️ One-Click Code Execution",
    content:
      "Hit Run to execute code in a secure browser sandbox powered by WebAssembly. See output, errors, and performance charts in real time.",
  },
  // ── 7. Problems ─────────────────────────────────────────────────────────────
  {
    page: "/problems",
    targetId: "",
    title: "🔥 100+ Coding Challenges",
    content:
      "Practice problems across Junior, Intermediate, and Expert difficulty. Solve them in the built-in editor and watch your XP and rank climb.",
  },
  // ── 8. DSA ──────────────────────────────────────────────────────────────────
  {
    page: "/dsa",
    targetId: "",
    title: "🧠 DSA Mastery",
    content:
      "Master Data Structures & Algorithms with visual explanations and targeted practice sets — designed specifically for cracking tech interviews.",
  },
  // ── 9. Quick Prep ───────────────────────────────────────────────────────────
  {
    page: "/quick-prep",
    targetId: "",
    title: "⚡ Quick Prep Mode",
    content:
      "Short on time? Quick Prep delivers bite-sized interview questions and concept flashcards you can power through in just 10 minutes.",
  },
  // ── 10. Leaderboard ─────────────────────────────────────────────────────────
  {
    page: "/leaderboard",
    targetId: "",
    title: "🏆 Global Leaderboard",
    content:
      "Compete with learners worldwide! Earn XP by solving problems, keeping your streak alive, and catching daily bonus ⭐ stars.",
  },
  // ── 11. Jobs ────────────────────────────────────────────────────────────────
  {
    page: "/jobs",
    targetId: "",
    title: "💼 Python Job Board",
    content:
      "Browse real Python job listings curated for freshers and experienced developers. Find roles that match your skill level and start applying.",
  },
  // ── 12. Career Roadmap ──────────────────────────────────────────────────────
  {
    page: "/career-roadmap",
    targetId: "",
    title: "🗺️ Career Roadmap",
    content:
      "Explore full career tracks — from Python beginner to Web Developer, Data Scientist, ML Engineer, DevOps, and beyond. Follow a proven path.",
  },
  // ── 13. Profile & XP (back home) ────────────────────────────────────────────
  {
    page: "/",
    targetId: "tour-nav-profile",
    title: "🎖️ Your Rank & XP",
    content:
      "Your profile shows your live rank, XP total, current streak, and earned badges. The more you practice, the higher you climb!",
  },
  // ── 14. Finish ──────────────────────────────────────────────────────────────
  {
    page: "/",
    targetId: "",
    title: "🚀 You're All Set!",
    content:
      "That's the full PyMaster tour! Start by picking a learning track or jump straight into the Compiler. Happy coding — and remember to catch those ⭐ stars for bonus XP!",
  },
];
