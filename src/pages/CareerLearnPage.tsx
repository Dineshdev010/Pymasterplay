// ============================================================
// CAREER LEARN PAGE — src/pages/CareerLearnPage.tsx
// Individual career track learning page (Data Science, Web Dev,
// AI/ML, etc.) with sequential lesson unlocking.
// ============================================================
import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate, useParams, Link, useSearchParams } from "react-router-dom";
import { careerTracks } from "@/data/careerLessons";
import { useProgress } from "@/contexts/ProgressContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { ExerciseEditor } from "@/components/ExerciseEditor";
import { SqlExerciseEditor } from "@/components/SqlExerciseEditor";
import { GitTerminalEditor } from "@/components/GitTerminalEditor";
import Editor from "@monaco-editor/react";
import { SQL_PRACTICE_DB_NAME, SQL_PRACTICE_DB_SETUP_SQL, SQL_PRACTICE_DB_TABLES } from "@/data/sqlSampleData";
import { executeSql } from "@/lib/sqlRunner";
import { SqlTableView } from "@/components/SqlTableView";
import { SqlSchemaTable } from "@/components/SqlSchemaTable";
import { cancelActivePythonExecution, getPythonExecutionTimeoutMs, preloadPyodide } from "@/lib/piston";
import { BookOpen, CheckCircle2, ChevronRight, Lock, ArrowLeft, Terminal as TerminalIcon, Database, Play, RotateCcw, Square, Trophy, Star, Volume2, Languages, Loader2, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

type LearnLanguage = "english" | "tamil" | "kannada" | "telugu" | "hindi";
type SqlDialect = "sqlite" | "postgresql" | "mysql" | "dbsql";

const SQL_DIALECTS: Array<{ id: SqlDialect; label: string; shortLabel: string }> = [
  { id: "sqlite", label: "SQLite", shortLabel: "SQLite" },
  { id: "postgresql", label: "PostgreSQL", shortLabel: "Postgres" },
  { id: "mysql", label: "MySQL", shortLabel: "MySQL" },
  { id: "dbsql", label: "DB SQL", shortLabel: "DB SQL" },
];

const SQL_DIALECT_GUIDES: Record<SqlDialect, { title: string; description: string; bullets: string[]; example: string; runnerNote: string }> = {
  sqlite: {
    title: "SQLite Lessons",
    description: "Lightweight SQL for local apps, browsers, mobile apps, and quick practice.",
    bullets: [
      "Uses `LIMIT` for row limits and `||` for string concatenation.",
      "Date helpers include `date('now')` and `strftime(...)`.",
      "Great for learning core SQL because setup is tiny and feedback is fast.",
    ],
    example: "-- SQLite\nSELECT name, price\nFROM products\nORDER BY price DESC\nLIMIT 3;",
    runnerNote: "The editor and exercises run with SQLite in the browser.",
  },
  postgresql: {
    title: "PostgreSQL Lessons",
    description: "Production-grade SQL with richer types, stronger constraints, and powerful analytics features.",
    bullets: [
      "Use `ILIKE` for case-insensitive text matching.",
      "Use `SERIAL`, `GENERATED ... AS IDENTITY`, JSONB, arrays, and rich date/time types in real projects.",
      "Most SELECT, JOIN, GROUP BY, CTE, and window-function lessons transfer directly from SQLite.",
    ],
    example: "-- PostgreSQL\nSELECT name, price\nFROM products\nWHERE name ILIKE '%book%'\nORDER BY price DESC\nLIMIT 3;",
    runnerNote: "PostgreSQL notes are learning guidance; this browser runner still executes SQLite.",
  },
  mysql: {
    title: "MySQL Lessons",
    description: "The world's most popular open-source database, powering millions of web applications.",
    bullets: [
      "Use backticks (`) to wrap table and column names to avoid reserved word conflicts.",
      "Supports `LIMIT offset, row_count` for pagination (very common in web apps).",
      "Features rich string functions like `CONCAT()`, `DATE_FORMAT()`, and `IFNULL()`.",
    ],
    example: "-- MySQL\nSELECT `name`, `price` \nFROM `products` \nWHERE `status` = 'active' \nORDER BY `price` DESC \nLIMIT 5;",
    runnerNote: "MySQL syntax examples are for learning; execution in this browser remains SQLite.",
  },
  dbsql: {
    title: "Database SQL Lessons",
    description: "Portable SQL habits that work across SQLite, PostgreSQL, MySQL, SQL Server, and cloud warehouses.",
    bullets: [
      "Always name columns explicitly instead of relying on `SELECT *`.",
      "Use `ORDER BY` whenever the row order matters.",
      "Prefer clear aliases, stable joins, constraints, indexes, and transaction-safe changes.",
    ],
    example: "-- Portable DB SQL\nSELECT p.name, p.price\nFROM products AS p\nWHERE p.price >= 1000\nORDER BY p.price DESC, p.name;",
    runnerNote: "Generic SQL examples are designed to stay close to standard SQL; execution is SQLite-backed here.",
  },
};

function getLocalizedCareerLesson(
  lesson: (typeof careerTracks)[number]["lessons"][number] | undefined,
  language: LearnLanguage,
) {
  if (!lesson) return undefined;
  if (language === "english") return lesson;
  const localized = lesson.translations?.[language];
  if (!localized) return lesson;

  return {
    ...lesson,
    title: localized.title ?? lesson.title,
    description: localized.description ?? lesson.description,
    category: localized.category ?? lesson.category,
    content: localized.content ?? lesson.content,
    codeExample: localized.codeExample ?? lesson.codeExample,
  };
}

function buildLessonPattern(strokeHex: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'><g fill='none' stroke='${strokeHex}' stroke-width='1'><circle cx='30' cy='30' r='20'/><circle cx='190' cy='50' r='16'/><path d='M0 110h220M110 0v220'/><path d='M20 200L80 140L140 200'/></g></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function getLessonWallpaper(trackId: string, lessonTitle?: string, category?: string) {
  const topic = `${trackId} ${lessonTitle ?? ""} ${category ?? ""}`.toLowerCase();

  // Premium Mesh Gradients
  if (topic.includes("cloud") || topic.includes("mlops") || topic.includes("deploy")) {
    return `radial-gradient(circle at 20% 30%, rgba(37, 99, 235, 0.4), transparent 50%), radial-gradient(circle at 80% 70%, rgba(14, 165, 233, 0.3), transparent 50%), linear-gradient(140deg, rgba(9, 22, 45, 0.95), rgba(15, 23, 42, 0.98))`;
  }
  if (topic.includes("sql") || topic.includes("database") || topic.includes("etl")) {
    return `radial-gradient(circle at 10% 20%, rgba(8, 145, 178, 0.35), transparent 50%), radial-gradient(circle at 90% 80%, rgba(16, 185, 129, 0.25), transparent 50%), linear-gradient(140deg, rgba(8, 24, 32, 0.95), rgba(2, 6, 23, 0.98))`;
  }
  if (topic.includes("linux") || topic.includes("bash") || topic.includes("terminal") || topic.includes("git")) {
    return `radial-gradient(circle at 30% 20%, rgba(34, 197, 94, 0.3), transparent 50%), radial-gradient(circle at 70% 80%, rgba(20, 184, 166, 0.25), transparent 50%), linear-gradient(140deg, rgba(8, 26, 16, 0.95), rgba(2, 44, 34, 0.98))`;
  }
  if (topic.includes("ai") || topic.includes("ml") || topic.includes("neural") || topic.includes("nlp") || topic.includes("agent")) {
    return `radial-gradient(circle at 20% 40%, rgba(147, 51, 234, 0.4), transparent 50%), radial-gradient(circle at 80% 60%, rgba(236, 72, 153, 0.3), transparent 50%), linear-gradient(140deg, rgba(24, 14, 42, 0.95), rgba(10, 2, 20, 0.98))`;
  }
  if (topic.includes("web") || topic.includes("api") || topic.includes("http") || topic.includes("auth")) {
    return `radial-gradient(circle at 15% 25%, rgba(59, 130, 246, 0.35), transparent 50%), radial-gradient(circle at 85% 75%, rgba(99, 102, 241, 0.3), transparent 50%), linear-gradient(140deg, rgba(13, 20, 40, 0.95), rgba(4, 10, 20, 0.98))`;
  }
  if (topic.includes("data") || topic.includes("pandas") || topic.includes("analysis")) {
    return `radial-gradient(circle at 25% 35%, rgba(234, 179, 8, 0.3), transparent 50%), radial-gradient(circle at 75% 65%, rgba(249, 115, 22, 0.25), transparent 50%), linear-gradient(140deg, rgba(26, 21, 15, 0.95), rgba(10, 5, 2, 0.98))`;
  }
  if (topic.includes("security") || topic.includes("cyber")) {
    return `radial-gradient(circle at 20% 20%, rgba(239, 68, 68, 0.35), transparent 50%), radial-gradient(circle at 80% 80%, rgba(185, 28, 28, 0.3), transparent 50%), linear-gradient(140deg, rgba(38, 12, 16, 0.95), rgba(10, 2, 4, 0.98))`;
  }
  if (topic.includes("english") || topic.includes("grammar") || topic.includes("vocab")) {
    return `radial-gradient(circle at 30% 30%, rgba(16, 185, 129, 0.2), transparent 50%), radial-gradient(circle at 70% 70%, rgba(14, 165, 233, 0.2), transparent 50%), linear-gradient(140deg, rgba(17, 24, 39, 0.95), rgba(10, 15, 25, 0.98))`;
  }
  return `radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.25), transparent 60%), linear-gradient(140deg, rgba(10, 18, 35, 0.95), rgba(2, 6, 23, 0.98))`;
}

function buildLanguagePattern(strokeHex: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><g fill='none' stroke='${strokeHex}' stroke-width='0.5' opacity='0.3' font-family='serif' font-size='12'><text x='10' y='20'>A</text><text x='140' y='30'>Z</text><text x='80' y='80'>&amp;</text><text x='20' y='140'>abc</text><circle cx='130' cy='120' r='10'/><path d='M0 80h160M80 0v160'/></g></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export default function CareerLearnPage() {
  const { trackId } = useParams<{ trackId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { language } = useLanguage();
  const { user } = useAuth();
  const track = careerTracks.find(t => t.id === trackId);
  const [selectedId, setSelectedId] = useState<string | null>(searchParams.get("lesson"));
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [sqlPlayground, setSqlPlayground] = useState("");
  const [sqlOutput, setSqlOutput] = useState("");
  const [isSqlRunning, setIsSqlRunning] = useState(false);
  const [sqlViewMode, setSqlViewMode] = useState<"text" | "table">("table");
  const [rawSqlResult, setRawSqlResult] = useState("");
  const [showDataset, setShowDataset] = useState(false);
  const [datasetViewMode, setDatasetViewMode] = useState<"code" | "table">("code");
  const [schemaViewMode, setSchemaViewMode] = useState<"raw" | "table">("table");
  const [selectedDatasetTable, setSelectedDatasetTable] = useState<string>(SQL_PRACTICE_DB_TABLES[0]);
  const [datasetTableResults, setDatasetTableResults] = useState<Record<string, string>>({});
  const [isDatasetLoading, setIsDatasetLoading] = useState(false);
  const [sqlDialect, setSqlDialect] = useState<SqlDialect>("sqlite");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sqlHistory, setSqlHistory] = useState<string[]>([]);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const { progress, resetLesson } = useProgress();
  const navigate = useNavigate();
  const timeoutSeconds = Math.round(getPythonExecutionTimeoutMs() / 1000);

  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    setIsPageLoading(true);
    const timer = setTimeout(() => setIsPageLoading(false), 600);
    return () => clearTimeout(timer);
  }, [trackId]);

  useEffect(() => {
    const id = searchParams.get("lesson");
    if (id && id !== selectedId) {
      setSelectedId(id);
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedId && scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedId]);

  const handleLessonSelect = (id: string | null) => {
    setSelectedId(id);
    if (id) {
      setSearchParams({ lesson: id }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  // Derive track type flags unconditionally (before any early return)
  const isSqlTrack = track?.id === "sql";
  const isBashTrack = track?.language === "bash";
  const isEnglishTrack = track?.id === "english-mastery";

  const handleSpeak = (text: string) => {
    if (!window.speechSynthesis) {
      toast.error("Speech synthesis not supported in this browser.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // Eagerly preload Pyodide for Python tracks so it's ready by the time the user opens an exercise
  useEffect(() => {
    if (!isSqlTrack && !isBashTrack) {
      preloadPyodide();
    }
  }, [isSqlTrack, isBashTrack]);

  const sqlCategories = useMemo(() => {
    if (!isSqlTrack || !track) return [];
    const set = new Set<string>();
    for (const lesson of track.lessons) {
      if (lesson.category) set.add(lesson.category);
    }
    return Array.from(set);
  }, [isSqlTrack, track]);

  const sqlDialectGuide = SQL_DIALECT_GUIDES[sqlDialect];

  const loadDatasetTable = async (tableName: string) => {
    if (datasetTableResults[tableName]) return;
    setIsDatasetLoading(true);
    try {
      const result = await executeSql(`SELECT * FROM ${tableName} LIMIT 50;`);
      if (result.output) {
        setDatasetTableResults(prev => ({ ...prev, [tableName]: result.output }));
      } else if (result.error) {
        toast.error(`Failed to load table ${tableName}: ${result.error}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDatasetLoading(false);
    }
  };

  useEffect(() => {
    if (showDataset && datasetViewMode === "table") {
      loadDatasetTable(selectedDatasetTable);
    }
  }, [showDataset, datasetViewMode, selectedDatasetTable]);

  const selectedLesson = useMemo(() => {
    const baseLesson = track?.lessons.find((l) => l.id === selectedId);
    return getLocalizedCareerLesson(baseLesson, language);
  }, [language, selectedId, track]);
  const lessonWallpaper = useMemo(
    () => getLessonWallpaper(track?.id ?? "", selectedLesson?.title, selectedLesson?.category),
    [selectedLesson?.category, selectedLesson?.title, track?.id],
  );

  // Auto-open the first lesson so the page never feels empty on first visit.
  useEffect(() => {
    if (selectedId) return;
    if (track?.lessons.length === 0) return;

    // Only auto-open on large screens to show the dashboard/list on mobile
    if (window.innerWidth >= 768 && track) {
      setSelectedId(track.lessons[0].id);
    }
  }, [selectedId, track]);

  // Reset selectedId if it doesn't belong to the current track
  useEffect(() => {
    if (track && selectedId) {
      const isValid = track.lessons.some(l => l.id === selectedId);
      if (!isValid) {
        setSelectedId(track.lessons[0]?.id || null);
      }
    }
  }, [track, selectedId]);

  useEffect(() => {
    if (!isSqlTrack) return;
    if (!selectedLesson) return;
    setSqlPlayground(sqlDialect === "sqlite" ? selectedLesson.codeExample : sqlDialectGuide.example);
    setSqlOutput("");
    setRawSqlResult("");
    setIsSqlRunning(false);
  }, [isSqlTrack, selectedLesson?.id, sqlDialect]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!track) {
    return (
      <div className="flex min-h-[calc(100dvh-3.5rem)] items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Career track not found</p>
          <Button asChild variant="outline"><Link to="/">Go Home</Link></Button>
        </div>
      </div>
    );
  }

  const ensureAuthForLessonIndex = (index: number): boolean => {
    if (index === 0) return true; // first module free
    if (user) return true;
    toast.info("Sign in required", { description: "Create an account to continue beyond the first module." });
    navigate("/auth");
    return false;
  };

  const isLessonUnlocked = (index: number): boolean => {
    if (index === 0) return true;
    const prevLesson = track.lessons[index - 1];
    return progress.completedExercises.includes(`${prevLesson.id}:beginner`);
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

  const runSqlPlayground = async () => {
    if (sqlDialect !== "sqlite") {
      toast.info("SQLite runner active", {
        description: `${SQL_DIALECT_GUIDES[sqlDialect].title} are shown as guidance. Switch to SQLite to execute in the browser.`,
      });
      return;
    }
    const currentQuery = sqlPlayground.trim();
    if (!currentQuery) return;

    setIsSqlRunning(true);
    setSqlOutput(`Running SQL (up to ${timeoutSeconds}s)...`);
    setExecutionTime(null);
    const start = performance.now();
    
    // Add to history
    setSqlHistory(prev => {
      const filtered = prev.filter(q => q !== currentQuery);
      return [currentQuery, ...filtered].slice(0, 10);
    });

    const result = await executeSql(currentQuery);
    const end = performance.now();
    setExecutionTime(end - start);
    setRawSqlResult(result.output);
    if (result.error && !result.output) {
      setSqlOutput(`Error:\n${result.error}`);
    } else {
      setSqlOutput(result.output || result.error);
    }
    setIsSqlRunning(false);
  };

  // Keyboard shortcut for SQL run
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        if (isSqlTrack && selectedId && !selectedLesson?.exercises) {
          // Only run playground if not in an exercise component
          runSqlPlayground();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSqlTrack, selectedId, sqlPlayground, sqlDialect]);

  const trackProgress = useMemo(() => {
    if (!track) return 0;
    const totalExercises = track.lessons.length * 3;
    const completed = track.lessons.reduce((acc, l) => acc + getLessonProgress(l.id), 0);
    return Math.round((completed / totalExercises) * 100);
  }, [track, progress.completedExercises]);

  useEffect(() => {
    if (selectedLesson && getLessonProgress(selectedLesson.id) === 3) {
      const key = `confetti-${selectedLesson.id}`;
      if (!sessionStorage.getItem(key)) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]
        });
        sessionStorage.setItem(key, "true");
        toast.success("Lesson Mastered!", { 
          description: `You've completed all exercises for ${selectedLesson.title}`,
          icon: <Trophy className="w-4 h-4 text-reward-gold" />
        });
      }
    }
  }, [selectedLesson?.id, progress.completedExercises]);
  if (isPageLoading) {
    return (
      <div className="flex min-h-[calc(100dvh-3.5rem)] items-center justify-center bg-background/50 backdrop-blur-sm">
        <div className="text-center space-y-4 animate-in fade-in zoom-in duration-500">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
          <h2 className="text-2xl font-bold text-foreground">Initializing {track?.title || "Track"}...</h2>
          <p className="text-muted-foreground text-sm">Preparing your learning environment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 border-r border-border bg-card overflow-y-auto shrink-0 hidden md:block z-20 shadow-2xl">
        <div className="p-4 border-b border-border space-y-4">
          <div>
            <Button asChild variant="ghost" size="sm" className="h-7 text-xs gap-1 mb-2 -ml-2">
              <Link to="/"><ArrowLeft className="w-3 h-3" /> Home</Link>
            </Button>
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" /> {track.title}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">{track.description}</p>
          </div>
          
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] uppercase font-black tracking-widest text-muted-foreground/60">
              <span>Goal: Next Badge</span>
              <span>{trackProgress}%</span>
            </div>
            <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden border border-border">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${trackProgress}%` }}
                className="h-full bg-gradient-to-r from-primary to-indigo-400 rounded-full"
              />
            </div>
          </div>
        </div>
        <nav className="p-2 space-y-4">
          {isSqlTrack ? (
            // Grouped SQL Sidebar
            sqlCategories.map((cat) => (
              <div key={cat} className="space-y-1">
                <div className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 border-l border-primary/20 ml-2 mb-1">
                  {cat}
                </div>
                {track.lessons
                  .filter((l) => l.category === cat)
                  .map((lesson) => {
                    const i = track.lessons.findIndex((l) => l.id === lesson.id);
                    const unlocked = isLessonUnlocked(i);
                    const exercisesDone = getLessonProgress(lesson.id);
                    const allDone = exercisesDone === 3;
                    return (
                      <motion.button
                        key={lesson.id}
                        whileHover={unlocked ? { x: 4 } : {}}
                        whileTap={unlocked ? { scale: 0.98 } : {}}
                        onClick={() => {
                          if (!unlocked) return;
                          if (!ensureAuthForLessonIndex(i)) return;
                          handleLessonSelect(lesson.id);
                        }}
                        disabled={!unlocked}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
                          !unlocked ? "text-muted-foreground/30 cursor-not-allowed"
                            : selectedId === lesson.id ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                            : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                        }`}
                      >
                        {!unlocked ? <Lock className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />
                          : allDone ? <CheckCircle2 className="w-3.5 h-3.5 text-streak-green shrink-0" />
                          : <span className="w-3.5 h-3.5 rounded-full border border-border text-[9px] flex items-center justify-center shrink-0 bg-background">{exercisesDone > 0 ? exercisesDone : i + 1}</span>
                        }
                        <span className="truncate flex-1 text-xs">{lesson.title.split(". ")[1] || lesson.title}</span>
                      </motion.button>
                    );
                  })}
              </div>
            ))
          ) : (
            // Default Sidebar
            track.lessons.map((lesson, i) => {
              const localizedLesson = getLocalizedCareerLesson(lesson, language) ?? lesson;
              const unlocked = isLessonUnlocked(i);
              const exercisesDone = getLessonProgress(lesson.id);
              const allDone = exercisesDone === 3;
              return (
                <motion.button
                  key={lesson.id}
                  whileHover={unlocked ? { x: 4 } : {}}
                  whileTap={unlocked ? { scale: 0.98 } : {}}
                  onClick={() => {
                    if (!unlocked) return;
                    if (!ensureAuthForLessonIndex(i)) return;
                    handleLessonSelect(lesson.id);
                  }}
                  disabled={!unlocked}
                  className={`w-full text-left px-3 py-2.5 rounded-md text-sm flex items-center gap-2 transition-colors mb-0.5 ${
                    !unlocked ? "text-muted-foreground/40 cursor-not-allowed"
                      : selectedId === lesson.id ? "bg-secondary text-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }`}
                >
                  {!unlocked ? <Lock className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                    : allDone ? <CheckCircle2 className="w-4 h-4 text-streak-green shrink-0" />
                    : <span className="w-4 h-4 rounded-full border border-border text-[10px] flex items-center justify-center shrink-0 bg-background">{exercisesDone > 0 ? exercisesDone : i + 1}</span>
                  }
                  <span className="truncate flex-1">{localizedLesson.title}</span>
                  {unlocked && exercisesDone > 0 && !allDone && (
                    <span className="text-[10px] text-reward-gold bg-reward-gold/10 px-1.5 py-0.5 rounded-full font-bold">{exercisesDone}/3</span>
                  )}
                </motion.button>
              );
            })
          )}
        </nav>
      </aside>

      {/* Content */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto relative scroll-smooth bg-background/20"
      >
        {!selectedId ? (
          <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
                <Trophy className="w-10 h-10 text-reward-gold" /> {track.title}
              </h1>
              <p className="text-lg text-muted-foreground">{track.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isSqlTrack ? (
              <div className="space-y-12">
                {sqlCategories.map((cat) => (
                  <div key={cat} className="space-y-6">
                    <div className="flex items-center gap-4">
                      <h2 className="text-xl font-black uppercase tracking-[0.2em] text-primary/70">{cat}</h2>
                      <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {track.lessons
                        .filter((l) => l.category === cat)
                        .map((lesson) => {
                          const i = track.lessons.findIndex((l) => l.id === lesson.id);
                          const unlocked = isLessonUnlocked(i);
                          const progressCount = getLessonProgress(lesson.id);
                          const isCurrent = unlocked && progressCount < 3;
                          return (
                            <button
                              key={lesson.id}
                              onClick={() => {
                                if (!unlocked) return;
                                handleLessonSelect(lesson.id);
                              }}
                              disabled={!unlocked}
                              className={`p-5 rounded-3xl border-2 text-left transition-all relative overflow-hidden group ${
                                !unlocked ? "bg-muted/30 border-border/50 opacity-60 cursor-not-allowed" 
                                  : isCurrent ? "bg-primary/5 border-primary/40 shadow-xl shadow-primary/5 scale-[1.02]" 
                                  : "bg-card border-border hover:border-primary/30"
                              }`}
                            >
                              {progressCount === 3 && (
                                <div className="absolute top-4 right-4 bg-streak-green/20 text-streak-green p-1 rounded-full">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                </div>
                              )}
                              <div className="space-y-4">
                                <div className="space-y-1">
                                  <h3 className="font-bold text-base group-hover:text-primary transition-colors">{lesson.title}</h3>
                                  <p className="text-xs text-muted-foreground line-clamp-2">{lesson.description}</p>
                                </div>
                                <div className="pt-1">
                                  <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full transition-all duration-1000 ${progressCount === 3 ? "bg-streak-green" : "bg-primary"}`}
                                      style={{ width: `${(progressCount / 3) * 100}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {track.lessons.map((lesson, i) => {
                  const unlocked = isLessonUnlocked(i);
                  const progressCount = getLessonProgress(lesson.id);
                  const isCurrent = unlocked && progressCount < 3;
                  
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        if (!unlocked) return;
                        handleLessonSelect(lesson.id);
                      }}
                      disabled={!unlocked}
                      className={`p-6 rounded-[2rem] border-2 text-left transition-all relative overflow-hidden group ${
                        !unlocked ? "bg-muted/30 border-border/50 opacity-60 cursor-not-allowed" 
                          : isCurrent ? "bg-primary/5 border-primary/40 shadow-xl shadow-primary/5 scale-[1.02]" 
                          : "bg-card border-border hover:border-primary/30"
                      }`}
                    >
                      {progressCount === 3 && (
                        <div className="absolute top-4 right-4 bg-streak-green/20 text-streak-green p-1 rounded-full">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      )}
                      <div className="space-y-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl ${
                          !unlocked ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
                        }`}>
                          {i + 1}
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-bold text-lg">{lesson.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{lesson.description}</p>
                        </div>
                        
                        <div className="pt-2">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1.5">
                            <span>Progress</span>
                            <span>{progressCount}/3 Exercises</span>
                          </div>
                          <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-1000 ${progressCount === 3 ? "bg-streak-green" : "bg-primary"}`}
                              style={{ width: `${(progressCount / 3) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
            </div>
          </div>
        ) : (
          <div className="flex-1">
        {/* Track Progress Sticky Bar */}
        <div className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-2xl border-b border-border px-4 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          <div className="max-w-3xl mx-auto flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider mb-1">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Star className="w-3 h-3 text-reward-gold fill-reward-gold" /> Track Progress
                </span>
                <span className="text-primary">{trackProgress}%</span>
              </div>
              <Progress value={trackProgress} className="h-1.5" />
            </div>
          </div>
        </div>

        <div className="relative min-h-full">
          <div 
            className="flex-1 p-4 md:p-8 relative"
            style={{ 
              backgroundImage: isEnglishTrack ? buildLanguagePattern("#3b82f6") : buildLessonPattern("#3b82f6"),
              backgroundSize: "400px 400px"
            }}
          >
            <div className="max-w-4xl mx-auto space-y-8">
              {isEnglishTrack && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-[2rem] bg-gradient-to-br from-primary/10 via-background to-background border border-primary/20 shadow-xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Languages className="w-32 h-32" />
                  </div>
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-primary mb-2">
                        <Trophy className="w-5 h-5 text-reward-gold animate-bounce" />
                        <span className="text-xs font-black uppercase tracking-widest">Level Objective</span>
                      </div>
                      <h1 className="text-3xl font-black tracking-tight text-foreground">{selectedLesson?.title}</h1>
                      <p className="text-muted-foreground font-medium">{selectedLesson?.description}</p>
                    </div>
                    <div className="flex items-center gap-4 bg-background/50 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                      <div className="text-center">
                        <div className="text-2xl font-black text-primary">{progress.wallet.toLocaleString()}</div>
                        <div className="text-[10px] font-bold uppercase tracking-tighter opacity-50">Points</div>
                      </div>
                      <div className="w-[1px] h-10 bg-white/10" />
                      <div className="text-center">
                        <div className="text-2xl font-black text-streak-green">{progress.streak}</div>
                        <div className="text-[10px] font-bold uppercase tracking-tighter opacity-50">Streak</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          <motion.div
            className="pointer-events-none absolute inset-0 transition-all duration-1000"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8, backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            style={{
              backgroundImage: lessonWallpaper,
              backgroundSize: "200% 200%",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
          <div className="relative z-10">
          <AnimatePresence mode="wait">
          {selectedLesson ? (
          <motion.div 
            key={selectedLesson.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-4xl mx-auto px-4 sm:px-8 py-8 md:py-12 mt-4 mb-12 bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
          >
            {/* Mobile back button */}
            <button 
              onClick={() => handleLessonSelect(null)} 
              className="md:hidden flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> All Lessons
            </button>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {track.title}
              </span>
              {isSqlTrack && selectedLesson.category && (
                <span className="px-2 py-0.5 rounded-full bg-secondary/60 text-foreground border border-border">
                  {selectedLesson.category}
                </span>
              )}
              {getLessonProgress(selectedLesson.id) === 3 && (
                <span className="px-2 py-0.5 rounded-full bg-streak-green/10 text-streak-green border border-streak-green/20">
                  ✓ Complete
                </span>
              )}
            </div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground drop-shadow-sm">{selectedLesson.title}</h1>
              {getLessonProgress(selectedLesson.id) > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 text-[10px] sm:text-xs gap-1.5 opacity-60 hover:opacity-100 shrink-0 hover:border-destructive/30 hover:text-destructive hover:bg-destructive/10" 
                  onClick={() => {
                    if (window.confirm("Reset progress for this lesson? You will need to complete these exercises again.")) {
                      resetLesson(selectedLesson.id);
                    }
                  }}
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">Reset Lesson</span>
                  <span className="sm:hidden">Reset</span>
                </Button>
              )}
            </div>
            <p className="text-muted-foreground mb-6">{selectedLesson.description}</p>

            {/* Relocated Dialect Toggle (Now inside header below) */}

            {isSqlTrack && sqlCategories.length > 0 && (
              <div className="mb-6">
                <div className="text-xs text-muted-foreground mb-2">SQL lesson types</div>
                <div className="flex flex-wrap gap-2">
                  {sqlCategories.map((cat) => (
                    <Button
                      key={cat}
                      size="sm"
                      variant={selectedLesson.category === cat ? "default" : "outline"}
                      className="h-7 text-xs"
                      onClick={() => {
                        const first = track.lessons.find((l) => l.category === cat);
                        if (!first) return;
                        const firstIndex = track.lessons.findIndex((l) => l.id === first.id);
                        if (firstIndex >= 0 && isLessonUnlocked(firstIndex)) {
                          handleLessonSelect(first.id);
                        }
                      }}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="mb-8">
              {selectedLesson.content.split("\n").map((line, i) => {
                if (line.startsWith("### ")) return <h3 key={i} className="text-xl font-semibold tracking-tight text-foreground mt-8 mb-3">{line.replace("### ", "")}</h3>;
                if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold tracking-tight text-foreground mt-10 mb-4">{line.replace("## ", "")}</h2>;
                if (line.startsWith("- ")) return <li key={i} className="text-muted-foreground ml-4 list-disc">{line.replace("- ", "")}</li>;
                if (line.trim() === "") return <br key={i} />;
                return <p key={i} className="text-muted-foreground leading-relaxed">{line}</p>;
              })}
            </div>

            {/* Code Example / Pronunciation */}
            {!isSqlTrack && (
              <div className="code-block mb-8 relative group/card">
                <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface-1">
                  <span className="text-xs text-muted-foreground font-mono">
                    {isEnglishTrack ? "Pronunciation Guide" : isBashTrack ? "terminal" : "example.py"}
                  </span>
                  <div className="flex items-center gap-2">
                    {isEnglishTrack && (
                      <div className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black uppercase text-primary tracking-widest hidden sm:block">
                        Interactive
                      </div>
                    )}
                    {isEnglishTrack && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 text-xs gap-1 text-primary hover:bg-primary/10"
                        onClick={() => handleSpeak(selectedLesson.codeExample.split("\n")[0] || selectedLesson.codeExample)}
                      >
                        <Volume2 className="w-3 h-3" /> Listen
                      </Button>
                    )}
                    {!isBashTrack && !isEnglishTrack && (
                      <Button asChild size="sm" variant="outline" className="h-7 text-xs gap-1">
                        <Link to={`/compiler?code=${encodeURIComponent(selectedLesson.codeExample)}`}>
                          <TerminalIcon className="w-3 h-3" /> Try in Compiler
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
                <pre className="p-4 text-sm font-mono text-foreground overflow-x-auto leading-relaxed bg-surface-2">
                  {selectedLesson.codeExample}
                </pre>
              </div>
            )}

	            {/* SQL Playground */}
	            {isSqlTrack && (
	              <div className="mb-8">
	                <div className="flex flex-col gap-4 mb-4">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex-1 min-w-[14rem]">
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                          <TerminalIcon className="w-5 h-5 text-primary" /> SQL Playground
                        </h3>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                          Mode: <span className="text-primary">{SQL_DIALECTS.find((d) => d.id === sqlDialect)?.label}</span>
                          {" "}· Dataset: <span className="text-primary">{SQL_PRACTICE_DB_NAME}</span>
                          {executionTime !== null && (
                            <span className="text-streak-green ml-2 opacity-70">
                              · Took {executionTime.toFixed(0)}ms
                            </span>
                          )}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 bg-background/50 p-1 rounded-lg border border-border shadow-sm">
                        {SQL_DIALECTS.map((dialect) => (
                          <Button
                            key={dialect.id}
                            size="sm"
                            variant="ghost"
                            className={`h-7 px-2.5 text-[10px] font-bold transition-all ${
                              sqlDialect === dialect.id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                            }`}
                            onClick={() => setSqlDialect(dialect.id)}
                          >
                            {dialect.shortLabel}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        {sqlHistory.length > 0 && (
                          <div className="relative group">
                            <Button size="sm" variant="outline" className="h-8 text-xs gap-1 border-border/50">
                              <RotateCcw className="w-3 h-3" /> History
                            </Button>
                            <div className="absolute top-full left-0 mt-1 w-64 bg-card border border-border rounded-lg shadow-xl hidden group-hover:block z-50 overflow-hidden">
                              <div className="p-2 border-b border-border bg-muted/30 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Recent Queries</div>
                              <div className="max-h-48 overflow-y-auto p-1">
                                {sqlHistory.map((q, i) => (
                                  <button
                                    key={i}
                                    onClick={() => setSqlPlayground(q)}
                                    className="w-full text-left p-2 text-[10px] font-mono whitespace-nowrap overflow-hidden text-ellipsis hover:bg-primary/10 hover:text-primary rounded transition-colors border-b border-border last:border-0"
                                  >
                                    {q}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-xs gap-1 border-border/50"
                          onClick={() => setShowDataset(true)}
                        >
                          <Database className="w-3 h-3" /> Schema
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex rounded-md border border-border p-0.5 bg-background">
                          <Button
                            size="sm"
                            variant="ghost"
                            className={`h-6 text-[10px] px-2 ${sqlViewMode === "table" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
                            onClick={() => setSqlViewMode("table")}
                          >
                            Table
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className={`h-6 text-[10px] px-2 ${sqlViewMode === "text" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
                            onClick={() => setSqlViewMode("text")}
                          >
                            Raw
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          className="h-8 gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95"
                          onClick={runSqlPlayground}
                          disabled={isSqlRunning || sqlDialect !== "sqlite"}
                        >
                          {isSqlRunning ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Play className="w-4 h-4 fill-current" />
                          )}
                          {sqlDialect === "sqlite" ? "Execute" : "SQLite Only"}
                        </Button>
                      </div>
                    </div>
                  </div>

	                <div className="border border-border rounded-lg overflow-hidden bg-card">
	                  <div className="h-56">
	                    <Editor
	                      height="100%"
	                      language="sql"
	                      theme="vs-dark"
	                      value={sqlPlayground}
	                      onChange={(v) => setSqlPlayground(v || "")}
	                      options={{
	                        fontSize: 13,
	                        fontFamily: "'JetBrains Mono', monospace",
	                        minimap: { enabled: false },
	                        padding: { top: 12 },
	                        scrollBeyondLastLine: false,
	                        wordWrap: "on",
	                        lineNumbers: "on",
	                        automaticLayout: true,
	                      }}
	                    />
	                  </div>
                      <div className="flex-1 bg-surface-1 border border-border rounded-lg overflow-hidden flex flex-col font-mono text-xs">
                {sqlOutput && (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    {sqlViewMode === "table" && rawSqlResult ? (
                      <SqlTableView csvOutput={rawSqlResult} />
                    ) : (
                      <pre className="flex-1 p-4 whitespace-pre-wrap overflow-auto custom-scrollbar">
                        {sqlOutput}
                      </pre>
                    )}
                  </div>
                )}
                {!sqlOutput && (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground italic">
                    Output will appear here...
                  </div>
                )}
              </div>
	                </div>

	                <Dialog open={showDataset} onOpenChange={setShowDataset}>
	                  <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
	                    <DialogHeader>
	                      <DialogTitle className="flex items-center gap-2">
                          <Database className="w-5 h-5 text-primary" />
                          Dataset: {SQL_PRACTICE_DB_NAME}
                        </DialogTitle>
	                      <DialogDescription>
	                        Review the underlying data and schema used for the SQL exercises.
	                      </DialogDescription>
	                    </DialogHeader>

                      <Tabs value={datasetViewMode} onValueChange={(v) => setDatasetViewMode(v as any)} className="flex-1 flex flex-col overflow-hidden">
                        <TabsList className="grid w-fit grid-cols-2 mb-4">
                          <TabsTrigger value="code" className="gap-2">
                            <TerminalIcon className="w-3.5 h-3.5" /> Schema (SQL)
                          </TabsTrigger>
                          <TabsTrigger value="table" className="gap-2">
                            <Database className="w-3.5 h-3.5" /> Data Preview
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="code" className="flex-1 flex flex-col gap-4 overflow-hidden m-0">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2 bg-secondary/30 p-1 rounded-lg border border-border/50">
                              <Button
                                size="sm"
                                variant={schemaViewMode === "table" ? "default" : "ghost"}
                                className={`h-8 text-xs gap-2 ${schemaViewMode === "table" ? "shadow-sm" : ""}`}
                                onClick={() => setSchemaViewMode("table")}
                              >
                                <Database className="w-3.5 h-3.5" /> Structured Table
                              </Button>
                              <Button
                                size="sm"
                                variant={schemaViewMode === "raw" ? "default" : "ghost"}
                                className={`h-8 text-xs gap-2 ${schemaViewMode === "raw" ? "shadow-sm" : ""}`}
                                onClick={() => setSchemaViewMode("raw")}
                              >
                                <TerminalIcon className="w-3.5 h-3.5" /> Raw SQL
                              </Button>
                            </div>
                            <div className="hidden md:flex items-center gap-4 text-[10px] uppercase font-bold text-muted-foreground/60 tracking-widest bg-muted/20 px-3 py-1.5 rounded-full border border-border/50">
                              <span className="flex items-center gap-1.5"><Key className="w-3 h-3 text-reward-gold" /> Primary Key</span>
                              <div className="w-px h-3 bg-border" />
                              <span className="flex items-center gap-1.5"><Database className="w-3 h-3 text-primary" /> Foreign Key</span>
                            </div>
                          </div>

                          <div className="flex-1 overflow-auto custom-scrollbar">
                            {schemaViewMode === "raw" ? (
                              <pre className="rounded-xl border border-border bg-surface-1 p-4 text-xs font-mono whitespace-pre-wrap text-foreground leading-relaxed shadow-inner">
                                {SQL_PRACTICE_DB_SETUP_SQL}
                              </pre>
                            ) : (
                              <div className="space-y-6">
                                <SqlSchemaTable />
                                
                                {/* Visual Relationship Guide */}
                                <div className="mt-12 p-6 rounded-2xl border border-primary/20 bg-primary/5 space-y-4">
                                  <h4 className="text-sm font-black uppercase tracking-[0.2em] text-primary/70">Database Architecture</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                      <div className="text-xs font-bold text-foreground">Data Flow</div>
                                      <div className="space-y-2">
                                        {[
                                          { from: "customers", to: "orders", rel: "1 : N" },
                                          { from: "orders", to: "order_items", rel: "1 : N" },
                                          { from: "products", to: "order_items", rel: "1 : N" },
                                          { from: "products", to: "product_reviews", rel: "1 : N" },
                                        ].map((rel, i) => (
                                          <div key={i} className="flex items-center gap-2 text-[10px] font-mono">
                                            <span className="text-primary font-bold">{rel.from}</span>
                                            <ChevronRight className="w-3 h-3 opacity-30" />
                                            <span className="text-reward-gold font-bold">{rel.to}</span>
                                            <span className="ml-auto text-muted-foreground bg-muted px-1.5 rounded">{rel.rel}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="text-[10px] text-muted-foreground leading-relaxed italic">
                                      This database uses standard 3rd Normal Form principles. Foreign keys ensure referential integrity. When a customer is deleted, their orders and reviews are also removed (CASCADE).
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </TabsContent>

                        <TabsContent value="table" className="flex-1 flex flex-col gap-4 overflow-hidden m-0">
                          <div className="flex flex-wrap gap-2 bg-secondary/30 p-2 rounded-lg border border-border/50">
                            {SQL_PRACTICE_DB_TABLES.map(table => (
                              <Button
                                key={table}
                                variant={selectedDatasetTable === table ? "default" : "ghost"}
                                size="sm"
                                className={`h-8 text-xs px-4 rounded-md transition-all ${
                                  selectedDatasetTable === table ? "shadow-md scale-105" : "hover:bg-secondary"
                                }`}
                                onClick={() => setSelectedDatasetTable(table)}
                              >
                                {table}
                              </Button>
                            ))}
                          </div>

                          <div className="flex-1 border border-border rounded-lg overflow-hidden bg-surface-1 relative shadow-inner">
                            {isDatasetLoading && (
                              <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[2px] z-20">
                                <div className="flex flex-col items-center gap-2">
                                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                  <span className="text-xs font-bold animate-pulse text-primary">Fetching table data...</span>
                                </div>
                              </div>
                            )}
                            
                            <div className="h-full overflow-auto custom-scrollbar">
                              {datasetTableResults[selectedDatasetTable] ? (
                                <SqlTableView csvOutput={datasetTableResults[selectedDatasetTable]} />
                              ) : (
                                <div className="h-full flex items-center justify-center text-muted-foreground italic text-sm">
                                  {!isDatasetLoading && "No data available for this table."}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-between px-1">
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1.5 italic">
                              <Star className="w-3 h-3 text-reward-gold" /> All data is reset to these defaults before every run.
                            </span>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              LIMIT 50 rows
                            </span>
                          </div>
                        </TabsContent>
                      </Tabs>
	                  </DialogContent>
	                </Dialog>
	              </div>
	            )}

	            {/* Exercises */}
	            <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  Exercises
                  {!isExerciseUnlocked(selectedLesson.id, "intermediate") && (
                    <span className="text-sm font-normal text-muted-foreground ml-2">— Complete beginner to unlock next</span>
                  )}
                </h3>
                <div className="space-y-3">
                  {(["beginner", "intermediate", "advanced"] as const).map(level => {
                    const ex = selectedLesson.exercises[level];
                    if (!ex) return null;

                    return isBashTrack ? (
                      <GitTerminalEditor
                        key={level}
                        exercise={ex}
                        level={level}
                        lessonId={selectedLesson.id}
                        locked={!isExerciseUnlocked(selectedLesson.id, level)}
                      />
                    ) : isSqlTrack ? (
                      <SqlExerciseEditor
                        key={level}
                        exercise={ex}
                        level={level}
                        lessonId={selectedLesson.id}
                        locked={!isExerciseUnlocked(selectedLesson.id, level)}
                      />
                    ) : (
                      <ExerciseEditor
                        key={level}
                        exercise={ex}
                        level={level}
                        lessonId={selectedLesson.id}
                        locked={!isExerciseUnlocked(selectedLesson.id, level)}
                        language={isEnglishTrack ? "english" : (track.language || "python")}
                      />
                    );
                  })}
                </div>
              </div>

            {/* Next lesson */}
            {(() => {
              const ci = track.lessons.findIndex(l => l.id === selectedLesson.id);
              const next = ci < track.lessons.length - 1 ? track.lessons[ci + 1] : null;
              const localizedNext = getLocalizedCareerLesson(next ?? undefined, language);
              const canProceed = next && isLessonUnlocked(ci + 1);
              if (!next) return null;
              return (
                <div className={`p-4 rounded-lg border ${canProceed ? "border-primary/30 bg-primary/5" : "border-border bg-surface-1 opacity-60"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {canProceed ? <CheckCircle2 className="w-5 h-5 text-streak-green" /> : <Lock className="w-5 h-5 text-muted-foreground" />}
                      <div>
                        <p className="text-sm font-medium text-foreground">{canProceed ? "Next Lesson Unlocked! (You can proceed or finish remaining exercises)" : "Complete beginner exercise to unlock"}</p>
                        <p className="text-xs text-muted-foreground">{localizedNext?.title ?? next.title}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      disabled={!canProceed}
                      onClick={() => {
                        if (!next) return;
                        const nextIndex = track.lessons.findIndex((l) => l.id === next.id);
                        if (nextIndex >= 0 && !ensureAuthForLessonIndex(nextIndex)) return;
                        handleLessonSelect(next.id);
                      }}
                      className="gap-1"
                    >
                      Next <ChevronRight className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              );
            })()}
            {/* End of content */}
            </motion.div>
          ) : null}
          </AnimatePresence>
          </div>
        </div>
        </div>
      )}
      </div>
    </div>
  );
}


