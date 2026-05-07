import { useEffect, useMemo, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  CircleHelp, 
  Sparkles, 
  Target, 
  Info,
  Trophy,
  VolumeX,
  Volume2,
  FastForward,
  Check,
  X,
  Zap,
  RotateCcw,
  BookOpen,
  Keyboard,
  Heart,
  Timer,
  Database,
  Terminal,
  BarChart3,
  Cloud as CloudIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { pythonQuizQuestions } from "@/data/pythonQuizQuestions";
import { useToast } from "@/hooks/use-toast";
import { QuizQuestionMap } from "@/components/QuizQuestionMap";
import { PythonHighlight } from "@/components/PythonHighlight";
import { StreakFire } from "@/components/StreakFire";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import * as sounds from "@/lib/sounds";

const canonical = "https://pymaster.pro/python-quiz-100";
const QUIZ_PROGRESS_STORAGE_KEY = "pymaster_quiz_progress_v2";
const SOUND_PREF_KEY = "pymaster_sound_muted";

type QuizProgressSnapshot = {
  allTotal: number;
  allAnswered: number;
  allScore: number;
  trickyTotal: number;
  trickyAnswered: number;
  trickyScore: number;
  updatedAt: string;
};

type PersistedQuizState = QuizProgressSnapshot & {
  version: 3;
  mode: "all" | "tricky";
  current: number;
  revealed: Record<number, boolean>;
  answers: Record<number, string>;
  studyMode: boolean;
  autoAdvance: boolean;
  streak: number;
  maxStreak: number;
  lives: number;
  livesRefillAt: string | null;
};

function readPersistedQuizState(): PersistedQuizState | null {
  if (typeof window === "undefined") return null;
  try {
    const parsed = JSON.parse(localStorage.getItem(QUIZ_PROGRESS_STORAGE_KEY) || "{}") as Partial<PersistedQuizState>;
    if (!parsed || typeof parsed !== "object") return null;
    
    return {
      version: 3,
      mode: parsed.mode === "tricky" ? "tricky" : "all",
      current: typeof parsed.current === "number" ? parsed.current : 0,
      revealed: parsed.revealed || {},
      answers: parsed.answers || {},
      studyMode: parsed.studyMode !== false,
      autoAdvance: parsed.autoAdvance !== false,
      streak: typeof parsed.streak === "number" ? parsed.streak : 0,
      maxStreak: typeof parsed.maxStreak === "number" ? parsed.maxStreak : 0,
      lives: typeof parsed.lives === "number" ? parsed.lives : 3,
      livesRefillAt: typeof parsed.livesRefillAt === "string" ? parsed.livesRefillAt : null,
      allTotal: typeof parsed.allTotal === "number" ? parsed.allTotal : pythonQuizQuestions.length,
      allAnswered: typeof parsed.allAnswered === "number" ? parsed.allAnswered : 0,
      allScore: typeof parsed.allScore === "number" ? parsed.allScore : 0,
      trickyTotal: typeof parsed.trickyTotal === "number" ? parsed.trickyTotal : 0,
      trickyAnswered: typeof parsed.trickyAnswered === "number" ? parsed.trickyAnswered : 0,
      trickyScore: typeof parsed.trickyScore === "number" ? parsed.trickyScore : 0,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
    };
  } catch {
    return null;
  }
}

export default function PythonQuizPage() {
  const persistedState = readPersistedQuizState();
  const { toast } = useToast();
  
  const [current, setCurrent] = useState(persistedState?.current ?? 0);
  const [answers, setAnswers] = useState<Record<number, string>>(persistedState?.answers ?? {});
  const [revealed, setRevealed] = useState<Record<number, boolean>>(persistedState?.revealed ?? {});
  const [mode, setMode] = useState<"all" | "tricky">(persistedState?.mode ?? "all");
  const [studyMode, setStudyMode] = useState(persistedState?.studyMode ?? true);
  const [autoAdvance, setAutoAdvance] = useState(persistedState?.autoAdvance ?? true);
  const [streak, setStreak] = useState(persistedState?.streak ?? 0);
  const [maxStreak, setMaxStreak] = useState(persistedState?.maxStreak ?? 0);
  const [lives, setLives] = useState(persistedState?.lives ?? 3);
  const [livesRefillAt, setLivesRefillAt] = useState<string | null>(persistedState?.livesRefillAt ?? null);
  const [direction, setDirection] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem(SOUND_PREF_KEY) !== "false"; // Default muted
  });

  useEffect(() => {
    if (livesRefillAt) {
      const checkRefill = () => {
        const refillTime = new Date(livesRefillAt).getTime();
        if (Date.now() >= refillTime) {
          setLives(3);
          setLivesRefillAt(null);
          toast({ title: "Lives Restored!", description: "You are ready to enter the arena again." });
        }
      };
      checkRefill();
      const interval = setInterval(checkRefill, 1000);
      return () => clearInterval(interval);
    }
  }, [livesRefillAt]);

  const refillCountdown = useMemo(() => {
    if (!livesRefillAt) return "";
    const diff = new Date(livesRefillAt).getTime() - Date.now();
    if (diff <= 0) return "";
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return `${h}h ${m}m ${s}s`;
  }, [livesRefillAt]);

  const trickyPool = useMemo(() => pythonQuizQuestions.filter((q) => q.topic.startsWith("Tricky:")), []);

  const activeQuestions = useMemo(
    () =>
      mode === "tricky"
        ? pythonQuizQuestions.filter((q) => q.topic.startsWith("Tricky:"))
        : pythonQuizQuestions,
    [mode],
  );

  const total = activeQuestions.length;
  const question = activeQuestions[Math.min(current, Math.max(total - 1, 0))];

  const quizTitle = `${total} Python Quiz Questions | PyMaster`;
  const quizDescription = `Practice ${total} Python quiz questions with answers and explanations. Improve Python fundamentals through quick MCQ practice.`;

  const answeredCount = useMemo(
    () => activeQuestions.filter((q) => answers[q.id] !== undefined).length,
    [activeQuestions, answers],
  );

  const score = useMemo(() => {
    return activeQuestions.reduce((acc, q) => {
      if (answers[q.id] === q.answer) return acc + 1;
      return acc;
    }, 0);
  }, [activeQuestions, answers]);

  const progressPercent = Math.round(((current + 1) / total) * 100);

  const toggleMute = () => {
    const newVal = !isMuted;
    setIsMuted(newVal);
    localStorage.setItem(SOUND_PREF_KEY, String(newVal));
  };

  const goNext = useCallback(() => {
    if (current < total - 1) {
      setDirection(1);
      setCurrent((prev) => prev + 1);
      setFeedback(null);
    } else if (answeredCount === total) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
      toast({
        title: "Quiz Completed!",
        description: `You scored ${score} out of ${total}. Great job!`,
      });
    }
  }, [current, total, answeredCount, score, toast]);

  const goPrev = useCallback(() => {
    if (current > 0) {
      setDirection(-1);
      setCurrent((prev) => prev - 1);
      setFeedback(null);
    }
  }, [current]);

  const handleSelect = (option: string) => {
    const isCorrect = option === question.answer;
    const wasAlreadyAnswered = answers[question.id] !== undefined;
    
    if (wasAlreadyAnswered && !studyMode) return;
    
    setAnswers((prev) => ({ ...prev, [question.id]: option }));
    
    if (studyMode) {
      setRevealed((prev) => ({ ...prev, [question.id]: true }));
      setFeedback(isCorrect ? "correct" : "wrong");
      
      if (isCorrect) {
        sounds.playSuccessSound();
        const newStreak = streak + 1;
        setStreak(newStreak);
        setMaxStreak(Math.max(maxStreak, newStreak));
        
        if (newStreak % 10 === 0) {
          confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
          toast({ title: `🔥 ${newStreak} Question Streak!`, description: "You are unstoppable!" });
        }

        if (autoAdvance) {
          setTimeout(() => {
            setCurrent(curr => {
              const currentQ = activeQuestions[curr];
              if (currentQ?.id === question.id && curr < total - 1) {
                setDirection(1);
                setFeedback(null);
                return curr + 1;
              }
              return curr;
            });
          }, 1800);
        }
      } else {
        sounds.playErrorSound();
        setStreak(0);
        const newLives = Math.max(0, lives - 1);
        setLives(newLives);
        if (newLives === 0 && !livesRefillAt) {
          const refillTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
          setLivesRefillAt(refillTime);
          toast({ title: "Out of Lives!", description: "Come back in 24 hours for a refill.", variant: "destructive" });
        }
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (["1", "2", "3", "4"].includes(e.key)) {
        const idx = parseInt(e.key) - 1;
        if (question.options[idx]) handleSelect(question.options[idx]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, question, handleSelect]);

  useEffect(() => {
    const snapshot: PersistedQuizState = {
      version: 3,
      mode,
      current,
      revealed,
      answers,
      studyMode,
      autoAdvance,
      streak,
      maxStreak,
      lives,
      livesRefillAt,
      allTotal: pythonQuizQuestions.length,
      allAnswered: pythonQuizQuestions.filter((q) => answers[q.id] !== undefined).length,
      allScore: pythonQuizQuestions.reduce((acc, q) => (answers[q.id] === q.answer ? acc + 1 : acc), 0),
      trickyTotal: trickyPool.length,
      trickyAnswered: trickyPool.filter((q) => answers[q.id] !== undefined).length,
      trickyScore: trickyPool.reduce((acc, q) => (answers[q.id] === q.answer ? acc + 1 : acc), 0),
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(QUIZ_PROGRESS_STORAGE_KEY, JSON.stringify(snapshot));
  }, [answers, current, mode, revealed, studyMode, autoAdvance, streak, maxStreak, trickyPool]);

  if (!question) return null;

  const isCurrentAnswered = answers[question.id] !== undefined;
  const isCurrentRevealed = revealed[question.id] || false;
  const isCurrentCorrect = isCurrentAnswered && answers[question.id] === question.answer;

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      <Helmet>
        <title>{quizTitle}</title>
        <meta name="description" content={quizDescription} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 bg-primary/5 blur-[120px]" />
      </div>

      <div className="mb-8 rounded-[2rem] border border-primary/20 bg-card/40 p-6 backdrop-blur-xl shadow-2xl sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
                <Zap className="h-3 w-3" /> Python Master Arena
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-500 ring-1 ring-inset ring-red-500/20">
                <div className="flex items-center gap-0.5">
                  {[...Array(3)].map((_, i) => (
                    <Heart key={i} className={cn("h-3 w-3", i < lives ? "fill-red-500 text-red-500" : "text-muted-foreground/30")} />
                  ))}
                </div>
                <span className="ml-1">{lives}/3 Lives</span>
              </div>
              
              {/* Premium Arena Switcher */}
              <div className="flex items-center gap-2 rounded-2xl bg-white/5 p-1.5 ring-1 ring-white/10 ml-2 shadow-xl backdrop-blur-md group/switcher">
                <div className="px-2 text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 hidden sm:block">Switch</div>
                
                {[
                  { id: "python", name: "Python", icon: Zap, color: "text-primary", bg: "bg-primary/20", path: "/python-quiz-100", active: true },
                  { id: "sql", name: "SQL", icon: Database, color: "text-blue-400", bg: "bg-blue-400/20", path: "/arena/sql" },
                  { id: "linux", name: "Linux", icon: Terminal, color: "text-expert-purple", bg: "bg-expert-purple/20", path: "/arena/linux" },
                  { id: "pandas", name: "Pandas", icon: BarChart3, color: "text-python-yellow", bg: "bg-python-yellow/20", path: "/arena/pandas" },
                  { id: "cloud", name: "Cloud", icon: CloudIcon, color: "text-orange-400", bg: "bg-orange-400/20", path: "/arena/cloud" },
                ].map((arena) => (
                  <motion.div key={arena.id} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to={arena.path} 
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300",
                        arena.active ? cn(arena.bg, arena.color, "ring-1 ring-inset ring-current/30 shadow-[0_0_15px_rgba(0,0,0,0.2)]") : "text-muted-foreground hover:bg-white/10 hover:text-foreground"
                      )}
                    >
                      <arena.icon className={cn("h-4 w-4", arena.active && "fill-current")} />
                      <span className={cn("text-[10px] font-black uppercase tracking-wider overflow-hidden transition-all duration-300", arena.active ? "w-auto opacity-100" : "w-0 opacity-0 group-hover/switcher:w-auto group-hover/switcher:opacity-100")}>
                        {arena.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <StreakFire streak={streak} size="sm" showQuote />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
              Python <span className="text-primary">Quiz</span> Challenge
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-2xl bg-muted/50 p-1 ring-1 ring-border" title="Auto-advance after correct answer">
              <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-tighter text-muted-foreground flex items-center gap-1.5"><FastForward className="h-3 w-3"/> Auto</div>
              <button onClick={() => setAutoAdvance(!autoAdvance)} className={cn("relative h-8 w-14 rounded-xl transition-all", autoAdvance ? "bg-primary" : "bg-zinc-700")}><div className={cn("absolute top-1 h-6 w-6 rounded-lg bg-white shadow-md transition-all", autoAdvance ? "left-7" : "left-1")} /></button>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleMute} className="rounded-xl h-10 w-10">
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <div className="flex rounded-2xl bg-muted/50 p-1 ring-1 ring-border">
              <button onClick={() => setMode("all")} className={cn("rounded-xl px-4 py-2 text-xs font-bold transition-all", mode === "all" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}>All</button>
              <button onClick={() => setMode("tricky")} className={cn("rounded-xl px-4 py-2 text-xs font-bold transition-all", mode === "tricky" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}>Tricky</button>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-muted/50 p-1 ring-1 ring-border">
              <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">Study Mode</div>
              <button onClick={() => setStudyMode(!studyMode)} className={cn("relative h-8 w-14 rounded-xl transition-all", studyMode ? "bg-primary" : "bg-zinc-700")}><div className={cn("absolute top-1 h-6 w-6 rounded-lg bg-white shadow-md transition-all", studyMode ? "left-7" : "left-1")} /></button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border/50 pt-8 sm:grid-cols-4">
          <div className="space-y-1"><div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Progress</div><div className="text-2xl font-black text-foreground">{answeredCount}<span className="text-sm font-medium text-muted-foreground">/{total}</span></div></div>
          <div className="space-y-1"><div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Accuracy</div><div className="text-2xl font-black text-foreground">{answeredCount > 0 ? Math.round((score / answeredCount) * 100) : 0}%</div></div>
          <div className="space-y-1"><div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Best Streak</div><div className="text-2xl font-black text-orange-500">{maxStreak}</div></div>
          <div className="space-y-1"><div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Points</div><div className="text-2xl font-black text-foreground">{score * 10}</div></div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-6">
          <div className={cn("relative overflow-hidden rounded-[2.5rem] border transition-colors duration-500 bg-card shadow-xl", isCurrentRevealed && (isCurrentCorrect ? "border-green-500/30 shadow-green-500/5" : "border-red-500/30 shadow-red-500/5"))}>
            <div className="absolute left-0 top-0 h-1.5 w-full bg-muted">
              <motion.div className="h-full bg-primary shadow-[0_0_15px_rgba(59,130,246,0.5)]" initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 0.5 }} />
            </div>

            <div className="p-6 sm:p-10 relative">
              {/* Lockdown Overlay */}
              <AnimatePresence>
                {lives === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl rounded-[2.5rem] p-8 text-center"
                  >
                    <div className="mb-6 rounded-full bg-red-500/10 p-6 ring-4 ring-red-500/10">
                      <Timer className="h-16 w-16 text-red-500 animate-pulse" />
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">Arena Lockdown</h2>
                    <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
                      You've run out of lives! To maintain high learning standards, the arena is closed for a brief cool-down.
                    </p>
                    <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-xl w-full max-w-xs">
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Lives Refill In</div>
                      <div className="text-4xl font-black text-primary tabular-nums tracking-tighter">{refillCountdown || "Refilling..."}</div>
                    </div>
                    <Button asChild variant="outline" className="mt-8 rounded-xl h-12 px-8 font-bold">
                      <Link to="/learn">Revise Lessons While You Wait</Link>
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Feedback Overlay */}
              <AnimatePresence>
                {feedback && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.5 }}
                    className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                  >
                    <div className={cn(
                      "flex flex-col items-center gap-2 rounded-full px-8 py-4 backdrop-blur-md shadow-2xl",
                      feedback === "correct" ? "bg-green-500/20 text-green-500 border border-green-500/50" : "bg-red-500/20 text-red-500 border border-red-500/50"
                    )}>
                      {feedback === "correct" ? <Check className="h-12 w-12 stroke-[3px]" /> : <X className="h-12 w-12 stroke-[3px]" />}
                      <span className="text-2xl font-black uppercase tracking-tighter">{feedback}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div key={question.id} custom={direction} initial={{ opacity: 0, x: direction * 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -direction * 50 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-2xl bg-primary/10 border border-primary/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-primary shadow-sm"><CircleHelp className="h-4 w-4" />{question.topic}</div>
                    <div className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em] bg-white/5 px-3 py-1 rounded-full border border-white/5">Question {current + 1}</div>
                  </div>

                  <div className="space-y-6">
                    {question.question.split("\n\n").map((part, i) => (
                      <div key={i} className="text-xl font-bold leading-relaxed text-foreground sm:text-2xl">
                        {part.startsWith("```") ? (
                          <div className="relative mt-4 overflow-hidden rounded-2xl border border-border/50 bg-zinc-950 p-6 font-mono text-sm leading-relaxed shadow-inner">
                            <div className="absolute right-4 top-4 text-[10px] font-bold uppercase tracking-widest text-zinc-600">Python</div>
                            <PythonHighlight code={part.replace(/```python|```/g, "").trim()} />
                          </div>
                        ) : (
                          part.split(/(`[^`]+`)/g).map((subPart, j) => 
                            subPart.startsWith("`") && subPart.endsWith("`") ? (
                              <code key={j} className="rounded-lg bg-primary/10 px-2 py-0.5 font-mono text-primary text-lg sm:text-xl">
                                {subPart.replace(/`/g, "")}
                              </code>
                            ) : subPart
                          )
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-3">
                    {question.options.map((option, idx) => {
                      const isSelected = answers[question.id] === option;
                      const isCorrect = option === question.answer;
                      const showResult = isCurrentRevealed || (isCurrentAnswered && studyMode);
                      const state = !showResult ? (isSelected ? "selected" : "idle") : (isCorrect ? "correct" : (isSelected ? "wrong" : "idle"));

                      return (
                        <motion.button 
                          key={idx} 
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleSelect(option)} 
                          className={cn(
                            "group relative flex items-center gap-4 rounded-3xl border p-4 text-left transition-all duration-500 sm:p-5", 
                            state === "idle" && "border-white/5 bg-white/[0.03] hover:border-primary/50 hover:bg-white/[0.08]", 
                            state === "selected" && "border-primary bg-primary/10 ring-1 ring-primary/30", 
                            state === "correct" && "border-green-500/50 bg-green-500/10 ring-1 ring-green-500/30", 
                            state === "wrong" && "border-red-500/50 bg-red-500/10 ring-1 ring-red-500/30"
                          )}
                        >
                          <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border-2 font-black transition-all duration-500", state === "idle" && "border-white/10 bg-white/5 text-muted-foreground group-hover:border-primary/50 group-hover:text-primary", state === "selected" && "border-primary bg-primary text-white", state === "correct" && "border-green-500 bg-green-500 text-white", state === "wrong" && "border-red-500 bg-red-500 text-white")}>{String.fromCharCode(65 + idx)}</div>
                          <span className="flex-1 font-bold text-foreground sm:text-lg">{option}</span>
                          {showResult && isCorrect && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]"><CheckCircle2 className="h-7 w-7" /></motion.div>}
                        </motion.button>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {(isCurrentRevealed || (isCurrentAnswered && studyMode)) && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={cn("rounded-3xl border p-6", isCurrentCorrect ? "border-green-500/20 bg-green-500/5" : "border-blue-500/20 bg-blue-500/5")}>
                        <div className={cn("mb-2 flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]", isCurrentCorrect ? "text-green-500" : "text-blue-500")}>
                          <Info className="h-4 w-4" /> {isCurrentCorrect ? "Correct!" : "Explanation"}
                        </div>
                        <p className="text-sm leading-relaxed text-foreground sm:text-base">{question.explanation}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>

              <div className="mt-12 flex flex-col gap-4 border-t border-border/50 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={goPrev} disabled={current === 0} className="h-12 rounded-xl px-6 font-bold"><ChevronLeft className="mr-2 h-5 w-5" /> Prev</Button>
                  <Button variant="outline" onClick={() => { setAnswers({}); setRevealed({}); setCurrent(0); setStreak(0); setFeedback(null); toast({ title: "Progress Reset", description: "You can start fresh now." }); }} className="h-12 w-12 rounded-xl p-0" title="Reset Progress"><RotateCcw className="h-5 w-5" /></Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" onClick={() => setRevealed(prev => ({ ...prev, [question.id]: !isCurrentRevealed }))} className="h-12 rounded-xl px-6 font-bold">{isCurrentRevealed ? "Hide Answer" : "Reveal Answer"}</Button>
                  <Button onClick={goNext} disabled={current === total - 1 && answeredCount < total} className="h-12 rounded-xl bg-primary px-10 font-bold shadow-lg shadow-primary/25">{current === total - 1 ? "Finish" : "Next Question"}<ChevronRight className="ml-2 h-5 w-5" /></Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl bg-muted/30 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-background p-2 ring-1 ring-border"><Keyboard className="h-5 w-5 text-primary" /></div>
              <div className="text-xs text-muted-foreground"><span className="font-bold text-foreground">Shortcuts:</span> Keys <span className="rounded bg-background px-1.5 py-0.5 ring-1 ring-border">1-4</span> to select, <span className="rounded bg-background px-1.5 py-0.5 ring-1 ring-border">Arrows</span> to navigate.</div>
            </div>
            <Button asChild variant="link" className="text-primary font-bold"><Link to="/learn" className="flex items-center gap-2"><BookOpen className="h-4 w-4" /> Revise Lessons</Link></Button>
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
          <QuizQuestionMap questions={activeQuestions} answers={answers} currentIdx={current} onSelect={(idx) => { setDirection(idx > current ? 1 : -1); setCurrent(idx); setFeedback(null); }} mode={mode} />
          
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm text-center space-y-3">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Active Streak</div>
            <div className="flex justify-center"><StreakFire streak={streak} size="lg" showQuote /></div>
            <p className="text-[10px] text-muted-foreground italic">Get 10 in a row for a bonus!</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-bold text-foreground uppercase tracking-wider">Session Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-sm text-muted-foreground"><div className="h-2 w-2 rounded-full bg-primary" /> Answered</div><div className="text-sm font-bold text-foreground">{answeredCount}</div></div>
              <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-sm text-muted-foreground"><div className="h-2 w-2 rounded-full bg-green-500" /> Correct</div><div className="text-sm font-bold text-green-500">{score}</div></div>
              <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-sm text-muted-foreground"><div className="h-2 w-2 rounded-full bg-red-500" /> Accuracy</div><div className="text-sm font-bold text-foreground">{answeredCount > 0 ? Math.round((score/answeredCount)*100) : 0}%</div></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
