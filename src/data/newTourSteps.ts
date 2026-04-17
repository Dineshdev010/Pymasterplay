import { Step } from "react-joyride";

export const TOUR_STEPS: Record<string, Step[]> = {
  home: [
    {
      target: "#tour-hero",
      title: "Welcome to PyMaster!",
      content: "Master Python from scratch with interactive lessons, real-world coding challenges, and career-focused prep.",
      placement: "bottom",
      skipBeacon: true,
    },
    {
      target: "#tour-game",
      title: "Play while you Learn",
      content: "Experience our unique Drag-and-Drop Python game. Build complex logic without typing, perfect for building intuition.",
      placement: "top",
    },
    {
      target: "#tour-roadmap",
      title: "A Clear Path Forward",
      content: "Follow our structured curriculum. Every step is designed to take you from a curious beginner to a job-ready engineer.",
      placement: "top",
    },
    {
      target: "[data-tour='sidebar-progress']",
      title: "Track Your Growth",
      content: "Watch your levels grow. Every lesson completed and problem solved adds to your XP and Streak.",
      placement: "right",
    }
  ],
  learn: [
    {
      target: "#tour-learn-roadmap",
      title: "Learning Roadmap",
      content: "All lessons are mapped to a clear progression tree. Complete one to unlock the next!",
      placement: "bottom",
      skipBeacon: true,
    },
    {
      target: "#tour-learn-sidebar",
      title: "Curated Lessons",
      content: "Switch between different Python modules here. We cover everything from Basics to Advanced Data Science.",
      placement: "right",
    }
  ],
  compiler: [
    {
      target: "#tour-compiler-lang",
      title: "Multi-Language Support",
      content: "Swap between Python, SQL, and Linux environments instantly. No setup required.",
      placement: "bottom",
      skipBeacon: true,
    },
    {
      target: "#tour-compiler-editor",
      title: "Pro Editor",
      content: "Write code with full IntelliSense and syntax highlighting. Powered by the same engine as VS Code.",
      placement: "bottom",
    },
    {
      target: "#tour-compiler-run",
      title: "Instant Results",
      content: "Run your code directly in the browser using WebAssembly. Speed meets safety.",
      placement: "bottom",
    }
  ],
  problems: [
    {
      target: "#tour-problems-filters",
      title: "Find Your Challenge",
      content: "Filter problems by difficulty or targeted company interviews like Google, Amazon, or Meta.",
      placement: "bottom",
      skipBeacon: true,
    },
    {
      target: "#tour-problem-card",
      title: "Start Solving",
      content: "Solve problems to earn XP, Coins, and Badges. Every solution counts toward your global rank.",
      placement: "top",
    }
  ],
  leaderboard: [
    {
      target: "#tour-leader-header",
      title: "Global Standings",
      content: "See how you rank against thousands of learners worldwide.",
      placement: "bottom",
      skipBeacon: true,
    },
    {
      target: "#tour-leader-trophies",
      title: "Trophy Cabinet",
      content: "Collect stars from riddles and challenges to unlock prestigious trophies.",
      placement: "top",
    }
  ],
  prep: [
    {
      target: "#tour-prep-header",
      title: "Quick Prep Hub",
      content: "Prepare for interviews across 5 major technologies with curated cheatsheets and snippets.",
      placement: "bottom",
      skipBeacon: true,
    },
    {
      target: "#tour-prep-tabs",
      title: "Switch Tech",
      content: "Fast switcher for Python, SQL, Pandas, Linux, and Git. Everything you need in one place.",
      placement: "bottom",
    },
    {
      target: "#tour-prep-search",
      title: "Instant Search",
      content: "Find specific snippets instantly. You can also favorite items for later study.",
      placement: "bottom",
    }
  ]
};
