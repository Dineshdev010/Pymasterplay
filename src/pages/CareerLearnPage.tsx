// ============================================================
// CAREER LEARN PAGE — src/pages/CareerLearnPage.tsx
// Individual career track learning page (Data Science, Web Dev,
// AI/ML, etc.) with sequential lesson unlocking.
// ============================================================
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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
import { cancelActivePythonExecution, getPythonExecutionTimeoutMs, preloadPyodide } from "@/lib/piston";
import { BookOpen, CheckCircle2, ChevronRight, Lock, ArrowLeft, Terminal as TerminalIcon, Database, Play, RotateCcw, Square, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

type LearnLanguage = "english" | "tamil" | "kannada" | "telugu" | "hindi";

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
  return `radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.25), transparent 60%), linear-gradient(140deg, rgba(10, 18, 35, 0.95), rgba(2, 6, 23, 0.98))`;
}

export default function CareerLearnPage() {
  const { trackId } = useParams<{ trackId: string }>();
  const { language } = useLanguage();
  const { user } = useAuth();
  const track = careerTracks.find(t => t.id === trackId);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sqlPlayground, setSqlPlayground] = useState("");
  const [sqlOutput, setSqlOutput] = useState("");
  const [isSqlRunning, setIsSqlRunning] = useState(false);
  const [showDataset, setShowDataset] = useState(false);
  const { progress, resetLesson } = useProgress();
  const navigate = useNavigate();
  const timeoutSeconds = Math.round(getPythonExecutionTimeoutMs() / 1000);

  // Derive track type flags unconditionally (before any early return)
  const isSqlTrack = (track?.language ?? "python") === "sql" || track?.id === "sql";
  const isBashTrack = (track?.language ?? "python") === "bash" || track?.id === "git";

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
    if (!track) return;
    if (selectedId) return;
    if (track.lessons.length === 0) return;

    setSelectedId(track.lessons[0].id);
  }, [selectedId, track]);

  useEffect(() => {
    if (!isSqlTrack) return;
    if (!selectedLesson) return;
    setSqlPlayground(selectedLesson.codeExample);
    setSqlOutput("");
    setIsSqlRunning(false);
  }, [isSqlTrack, selectedLesson?.id]); // eslint-disable-line react-hooks/exhaustive-deps

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
    setIsSqlRunning(true);
    setSqlOutput(`Running SQL (up to ${timeoutSeconds}s)...`);
    const result = await executeSql(sqlPlayground);
    if (result.error && !result.output) {
      setSqlOutput(`Error:\n${result.error}`);
    } else {
      setSqlOutput(result.output || result.error);
    }
    setIsSqlRunning(false);
  };

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

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-black/40 backdrop-blur-2xl overflow-y-auto shrink-0 hidden md:block z-20 shadow-2xl">
        <div className="p-4 border-b border-border">
          <Button asChild variant="ghost" size="sm" className="h-7 text-xs gap-1 mb-2 -ml-2">
            <Link to="/"><ArrowLeft className="w-3 h-3" /> Home</Link>
          </Button>
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" /> {track.title}
          </h2>
          <p className="text-xs text-muted-foreground mt-1">{track.description}</p>
        </div>
        <nav className="p-2">
          {track.lessons.map((lesson, i) => {
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
                  setSelectedId(lesson.id);
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
          })}
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-y-auto relative scroll-smooth">
        {/* Track Progress Sticky Bar */}
        <div className="sticky top-0 z-50 w-full bg-black/30 backdrop-blur-2xl border-b border-white/10 px-4 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
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
            className="max-w-4xl mx-auto px-4 sm:px-8 py-8 md:py-12 mt-4 mb-12 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
          >
            {/* Mobile back button */}
            <button 
              onClick={() => setSelectedId(null)} 
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
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60 drop-shadow-sm">{selectedLesson.title}</h1>
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
                          setSelectedId(first.id);
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
                if (line.startsWith("### ")) return <h3 key={i} className="text-xl font-semibold tracking-tight text-white/90 mt-8 mb-3">{line.replace("### ", "")}</h3>;
                if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold tracking-tight text-white mt-10 mb-4 drop-shadow-sm">{line.replace("## ", "")}</h2>;
                if (line.startsWith("- ")) return <li key={i} className="text-muted-foreground ml-4 list-disc">{line.replace("- ", "")}</li>;
                if (line.trim() === "") return <br key={i} />;
                return <p key={i} className="text-muted-foreground leading-relaxed">{line}</p>;
              })}
            </div>

            {/* Code Example */}
            {!isSqlTrack && (
              <div className="code-block mb-8">
                <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                  <span className="text-xs text-muted-foreground font-mono">{isBashTrack ? "terminal" : "example.py"}</span>
                  {isBashTrack ? null : (
                    <Button asChild size="sm" variant="outline" className="h-7 text-xs gap-1">
                      <Link to={`/compiler?code=${encodeURIComponent(selectedLesson.codeExample)}`}>
                        <TerminalIcon className="w-3 h-3" /> Try in Compiler
                      </Link>
                    </Button>
                  )}
                </div>
                <pre className="p-4 text-sm font-mono text-foreground overflow-x-auto leading-relaxed">
                  {selectedLesson.codeExample}
                </pre>
              </div>
            )}

	            {/* SQL Playground */}
	            {isSqlTrack && (
	              <div className="mb-8">
	                <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
	                  <div className="min-w-[14rem]">
	                    <h3 className="text-lg font-semibold text-foreground">SQL Editor</h3>
	                    <p className="text-xs text-muted-foreground">
	                      Dataset: <span className="font-mono text-foreground">{SQL_PRACTICE_DB_NAME}</span> ({SQL_PRACTICE_DB_TABLES.join(", ")})
	                    </p>
	                  </div>
	                  <div className="flex items-center gap-2 flex-wrap">
	                    <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => setShowDataset(true)}>
	                      <Database className="w-3 h-3" /> View Example Data
	                    </Button>
	                    <Button
	                      size="sm"
	                      variant="ghost"
	                      className="h-7 text-xs gap-1 text-muted-foreground hover:text-foreground"
	                      onClick={() => {
	                        setSqlPlayground(selectedLesson.codeExample);
	                        setSqlOutput("");
	                      }}
	                    >
	                      <RotateCcw className="w-3 h-3" /> Reset
	                    </Button>
	                    {isSqlRunning ? (
	                      <Button size="sm" variant="destructive" className="h-7 text-xs gap-1" onClick={cancelActivePythonExecution}>
	                        <Square className="w-3 h-3" /> Stop
	                      </Button>
	                    ) : (
	                      <Button size="sm" className="h-7 text-xs gap-1" onClick={runSqlPlayground}>
	                        <Play className="w-3 h-3" /> Run SQL
	                      </Button>
	                    )}
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
	                  {sqlOutput && (
	                    <pre className="border-t border-border px-4 py-3 text-xs font-mono whitespace-pre-wrap text-foreground">
	                      {sqlOutput}
	                    </pre>
	                  )}
	                </div>

	                <Dialog open={showDataset} onOpenChange={setShowDataset}>
	                  <DialogContent className="max-w-3xl">
	                    <DialogHeader>
	                      <DialogTitle>Example Data (SQLite)</DialogTitle>
	                      <DialogDescription>
	                        This SQL script is loaded before every run so the editor always starts with the same data.
	                      </DialogDescription>
	                    </DialogHeader>
	                    <pre className="max-h-[60vh] overflow-auto rounded-lg border border-border bg-surface-1 p-3 text-xs font-mono whitespace-pre-wrap text-foreground">
	                      {SQL_PRACTICE_DB_SETUP_SQL}
	                    </pre>
	                  </DialogContent>
	                </Dialog>
	              </div>
	            )}
	
	            {/* Exercises */}
	            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Exercises
                {!isExerciseUnlocked(selectedLesson.id, "intermediate") && (
                  <span className="text-sm font-normal text-muted-foreground ml-2">— Complete beginner to unlock next</span>
                )}
              </h3>
              <div className="space-y-3">
                {(["beginner", "intermediate", "advanced"] as const).map(level => (
                  isBashTrack ? (
                    <GitTerminalEditor
                      key={level}
                      exercise={selectedLesson.exercises[level]}
                      level={level}
                      lessonId={selectedLesson.id}
                      locked={!isExerciseUnlocked(selectedLesson.id, level)}
                    />
                  ) : isSqlTrack ? (
                    <SqlExerciseEditor
                      key={level}
                      exercise={selectedLesson.exercises[level]}
                      level={level}
                      lessonId={selectedLesson.id}
                      locked={!isExerciseUnlocked(selectedLesson.id, level)}
                    />
                  ) : (
                    <ExerciseEditor
                      key={level}
                      exercise={selectedLesson.exercises[level]}
                      level={level}
                      lessonId={selectedLesson.id}
                      locked={!isExerciseUnlocked(selectedLesson.id, level)}
                      language={track.language || "python"}
                    />
                  )
                ))}
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
                        setSelectedId(next.id);
                      }}
                      className="gap-1"
                    >
                      Next <ChevronRight className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              );
            })()}
            </motion.div>
          ) : (
            <motion.div 
              key="fallback"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center text-center px-6 py-6 overflow-y-auto max-h-[calc(100dvh-3.5rem)]"
            >
            <BookOpen className="w-12 h-12 text-muted-foreground/30 mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">{track.title}</h2>
            <p className="text-muted-foreground mb-6">Select a lesson from the sidebar to start learning</p>
            {/* Mobile lesson list */}
            <div className="md:hidden w-full max-w-md space-y-2">
              {track.lessons.map((lesson, i) => {
                const localizedLesson = getLocalizedCareerLesson(lesson, language) ?? lesson;
                const unlocked = isLessonUnlocked(i);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      if (!unlocked) return;
                      if (!ensureAuthForLessonIndex(i)) return;
                      setSelectedId(lesson.id);
                    }}
                    disabled={!unlocked}
                    className={`w-full flex items-center justify-between px-4 py-3 bg-card border border-border rounded-lg transition-colors ${unlocked ? "hover:border-primary/40" : "opacity-40 cursor-not-allowed"}`}
                  >
                    <div className="flex items-center gap-3">
                      {unlocked ? <BookOpen className="w-4 h-4 text-primary" /> : <Lock className="w-4 h-4 text-muted-foreground" />}
                      <div className="text-left">
                        <div className="text-sm font-medium text-foreground">{localizedLesson.title}</div>
                        <div className="text-xs text-muted-foreground">{localizedLesson.description}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
        </AnimatePresence>
        </div>
        </div>
      </div>
    </div>
  );
}


