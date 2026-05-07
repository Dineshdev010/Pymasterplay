import { useEffect, useMemo, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
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
  Cloud
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { pythonQuizQuestions } from "@/data/pythonQuizQuestions";
import { sqlQuizQuestions } from "@/data/sqlQuizQuestions";
import { pandasQuizQuestions } from "@/data/pandasQuizQuestions";
import { linuxQuizQuestions } from "@/data/linuxQuizQuestions";
import { cloudQuizQuestions } from "@/data/cloudQuizQuestions";
import { useToast } from "@/hooks/use-toast";
import { QuizQuestionMap } from "@/components/QuizQuestionMap";
import { PythonHighlight } from "@/components/PythonHighlight";
import { StreakFire } from "@/components/StreakFire";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import * as sounds from "@/lib/sounds";

type TopicType = "python" | "sql" | "pandas" | "linux" | "cloud";

const TOPIC_CONFIG: Record<TopicType, { 
  name: string, 
  icon: any, 
  questions: any[], 
  color: string,
  desc: string,
  storageKey: string
}> = {
  python: {
    name: "Python",
    icon: Zap,
    questions: pythonQuizQuestions,
    color: "text-primary",
    desc: "Master Python fundamentals, data structures, and tricky syntax.",
    storageKey: "pymaster_quiz_progress_v2"
  },
  sql: {
    name: "SQL",
    icon: Database,
    questions: sqlQuizQuestions,
    color: "text-blue-400",
    desc: "Test your knowledge of JOINs, Aggregations, and Database design.",
    storageKey: "pymaster_sql_quiz_v1"
  },
  pandas: {
    name: "Pandas",
    icon: BarChart3,
    questions: pandasQuizQuestions,
    color: "text-python-yellow",
    desc: "Deep dive into DataFrames, Series, and data manipulation.",
    storageKey: "pymaster_pandas_quiz_v1"
  },
  linux: {
    name: "Linux",
    icon: Terminal,
    questions: linuxQuizQuestions,
    color: "text-expert-purple",
    desc: "Master CLI commands, file permissions, and system administration.",
    storageKey: "pymaster_linux_quiz_v1"
  },
  cloud: {
    name: "Cloud",
    icon: Cloud,
    questions: cloudQuizQuestions,
    color: "text-orange-400",
    desc: "Test your AWS, Azure, and Cloud architecture basics.",
    storageKey: "pymaster_cloud_quiz_v1"
  }
};

const SOUND_PREF_KEY = "pymaster_sound_muted";

type PersistedQuizState = {
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
  updatedAt: string;
};

export default function UniversalQuizPage() {
  const { topic = "python" } = useParams<{ topic: TopicType }>();
  const config = TOPIC_CONFIG[topic as TopicType] || TOPIC_CONFIG.python;
  const { toast } = useToast();

  const readPersistedState = (): Partial<PersistedQuizState> | null => {
    if (typeof window === "undefined") return null;
    try {
      return JSON.parse(localStorage.getItem(config.storageKey) || "{}");
    } catch { return null; }
  };

  const persisted = readPersistedState();
  
  const [current, setCurrent] = useState(persisted?.current ?? 0);
  const [answers, setAnswers] = useState<Record<number, string>>(persisted?.answers ?? {});
  const [revealed, setRevealed] = useState<Record<number, boolean>>(persisted?.revealed ?? {});
  const [mode, setMode] = useState<"all" | "tricky">(persisted?.mode ?? "all");
  const [studyMode, setStudyMode] = useState(persisted?.studyMode ?? true);
  const [autoAdvance, setAutoAdvance] = useState(persisted?.autoAdvance ?? true);
  const [streak, setStreak] = useState(persisted?.streak ?? 0);
  const [maxStreak, setMaxStreak] = useState(persisted?.maxStreak ?? 0);
  const [lives, setLives] = useState(persisted?.lives ?? 3);
  const [livesRefillAt, setLivesRefillAt] = useState<string | null>(persisted?.livesRefillAt ?? null);
  const [direction, setDirection] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem(SOUND_PREF_KEY) !== "false";
  });

  // Lives Refill Logic
  useEffect(() => {
    if (livesRefillAt) {
      const interval = setInterval(() => {
        if (Date.now() >= new Date(livesRefillAt).getTime()) {
          setLives(3);
          setLivesRefillAt(null);
          toast({ title: "Lives Restored!", description: "You are ready to enter the arena again." });
        }
      }, 1000);
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

  const activeQuestions = useMemo(() => {
    if (topic === "python") {
      return mode === "tricky" 
        ? config.questions.filter(q => q.topic.startsWith("Tricky:"))
        : config.questions;
    }
    return config.questions;
  }, [mode, topic, config.questions]);

  const total = activeQuestions.length;
  const question = activeQuestions[Math.min(current, Math.max(total - 1, 0))];

  const goNext = useCallback(() => {
    if (current < total - 1) {
      setDirection(1);
      setCurrent(prev => prev + 1);
      setFeedback(null);
    }
  }, [current, total]);

  const goPrev = useCallback(() => {
    if (current > 0) {
      setDirection(-1);
      setCurrent(prev => prev - 1);
      setFeedback(null);
    }
  }, [current]);

  const handleSelect = (option: string) => {
    if (lives === 0) return;
    const isCorrect = option === question.answer;
    const wasAlreadyAnswered = answers[question.id] !== undefined;
    if (wasAlreadyAnswered && !studyMode) return;
    
    setAnswers(prev => ({ ...prev, [question.id]: option }));
    
    if (studyMode) {
      setRevealed(prev => ({ ...prev, [question.id]: true }));
      setFeedback(isCorrect ? "correct" : "wrong");
      
      if (isCorrect) {
        sounds.playSuccessSound();
        const newStreak = streak + 1;
        setStreak(newStreak);
        setMaxStreak(Math.max(maxStreak, newStreak));
        if (newStreak % 10 === 0) {
          confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
        }
        if (autoAdvance) {
          setTimeout(() => {
            setCurrent(curr => curr < total - 1 ? curr + 1 : curr);
            setFeedback(null);
          }, 1800);
        }
      } else {
        sounds.playErrorSound();
        setStreak(0);
        const newLives = Math.max(0, lives - 1);
        setLives(newLives);
        if (newLives === 0) {
          setLivesRefillAt(new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
        }
      }
    }
  };

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
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(config.storageKey, JSON.stringify(snapshot));
  }, [answers, current, mode, revealed, studyMode, autoAdvance, streak, maxStreak, lives, livesRefillAt, config.storageKey]);

  if (!question) return null;

  const progressPercent = Math.round(((current + 1) / total) * 100);

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      <Helmet>
        <title>{config.name} Arena | PyMaster</title>
      </Helmet>

      <div className="mb-8 rounded-[2rem] border border-primary/20 bg-card/40 p-6 backdrop-blur-xl shadow-2xl sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className={cn("inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ring-primary/20", config.color)}>
                <config.icon className="h-3 w-3" /> {config.name} Master Arena
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
                  { id: "python", name: "Python", icon: Zap, color: "text-primary", bg: "bg-primary/20", path: "/python-quiz-100" },
                  { id: "sql", name: "SQL", icon: Database, color: "text-blue-400", bg: "bg-blue-400/20", path: "/arena/sql" },
                  { id: "linux", name: "Linux", icon: Terminal, color: "text-expert-purple", bg: "bg-expert-purple/20", path: "/arena/linux" },
                  { id: "pandas", name: "Pandas", icon: BarChart3, color: "text-python-yellow", bg: "bg-python-yellow/20", path: "/arena/pandas" },
                  { id: "cloud", name: "Cloud", icon: Cloud, color: "text-orange-400", bg: "bg-orange-400/20", path: "/arena/cloud" },
                ].map((arena) => (
                  <motion.div key={arena.id} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to={arena.path} 
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300",
                        topic === arena.id ? cn(arena.bg, arena.color, "ring-1 ring-inset ring-current/30 shadow-[0_0_15px_rgba(0,0,0,0.2)]") : "text-muted-foreground hover:bg-white/10 hover:text-foreground"
                      )}
                    >
                      <arena.icon className={cn("h-4 w-4", topic === arena.id && "fill-current")} />
                      <span className={cn("text-[10px] font-black uppercase tracking-wider overflow-hidden transition-all duration-300", topic === arena.id ? "w-auto opacity-100" : "w-0 opacity-0 group-hover/switcher:w-auto group-hover/switcher:opacity-100")}>
                        {arena.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <StreakFire streak={streak} size="sm" showQuote />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
              {config.name} <span className="text-primary">Arena</span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-2xl bg-muted/50 p-1 ring-1 ring-border">
              <button onClick={() => setAutoAdvance(!autoAdvance)} className={cn("px-3 py-2 text-[10px] font-bold uppercase rounded-xl transition-all", autoAdvance ? "bg-primary text-white" : "text-muted-foreground")}>Auto Next</button>
              <Button variant="ghost" size="icon" onClick={() => { setIsMuted(!isMuted); localStorage.setItem(SOUND_PREF_KEY, String(!isMuted)); }} className="h-8 w-8">
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-muted/50 p-1 ring-1 ring-border">
              <button onClick={() => setStudyMode(!studyMode)} className={cn("px-3 py-2 text-[10px] font-bold uppercase rounded-xl transition-all", studyMode ? "bg-primary text-white" : "text-muted-foreground")}>Study Mode</button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border/50 pt-8 sm:grid-cols-4 text-center">
          <div><div className="text-[10px] font-bold uppercase text-muted-foreground">Progress</div><div className="text-2xl font-black text-foreground">{Object.keys(answers).length}/{total}</div></div>
          <div><div className="text-[10px] font-bold uppercase text-muted-foreground">Best Streak</div><div className="text-2xl font-black text-orange-500">{maxStreak}</div></div>
          <div><div className="text-[10px] font-bold uppercase text-muted-foreground">Accuracy</div><div className="text-2xl font-black text-foreground">{Object.keys(answers).length > 0 ? Math.round((streak / Object.keys(answers).length) * 100) : 0}%</div></div>
          <div><div className="text-[10px] font-bold uppercase text-muted-foreground">Topic</div><div className={cn("text-2xl font-black", config.color)}>{config.name}</div></div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-6">
          <div className="relative overflow-hidden rounded-[2.5rem] border bg-card shadow-xl p-6 sm:p-10">
            {/* Lockdown Overlay */}
            <AnimatePresence>
              {lives === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl rounded-[2.5rem] p-8 text-center">
                  <Timer className="h-16 w-16 text-red-500 mb-4" />
                  <h2 className="text-3xl font-black text-foreground">Lockdown</h2>
                  <p className="mt-2 text-muted-foreground">Refilling hearts in {refillCountdown}</p>
                  <Button asChild variant="outline" className="mt-8 rounded-xl"><Link to="/learn">Go Revise</Link></Button>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div key={question.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-2xl bg-primary/10 border border-primary/20 px-4 py-1.5 text-xs font-black uppercase text-primary">
                  <CircleHelp className="h-4 w-4" /> {question.topic}
                </div>
                
                <div className="text-xl font-bold leading-relaxed text-foreground sm:text-2xl">
                  {question.question.includes("`") ? (
                    question.question.split(/(`[^`]+`)/g).map((part, i) => 
                      part.startsWith("`") ? <code key={i} className="bg-primary/10 px-1 rounded text-primary">{part.replace(/`/g, "")}</code> : part
                    )
                  ) : question.question}
                </div>

                <div className="grid gap-3">
                  {question.options.map((opt, i) => (
                    <button key={i} onClick={() => handleSelect(opt)} className={cn(
                      "flex items-center gap-4 rounded-3xl border p-5 text-left transition-all",
                      answers[question.id] === opt ? (opt === question.answer ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10") : "border-white/5 bg-white/5 hover:bg-white/10"
                    )}>
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border-2 font-black">{String.fromCharCode(65 + i)}</div>
                      <span className="font-bold">{opt}</span>
                    </button>
                  ))}
                </div>

                {revealed[question.id] && (
                  <div className="rounded-3xl bg-primary/5 p-6 border border-primary/20">
                    <div className="text-[10px] font-bold uppercase text-primary mb-2 flex items-center gap-2"><Info className="h-4 w-4" /> Explanation</div>
                    <p className="text-sm text-muted-foreground">{question.explanation}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex justify-between">
              <Button variant="outline" onClick={goPrev} disabled={current === 0}>Prev</Button>
              <Button onClick={goNext} disabled={current === total - 1}>Next</Button>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
           <QuizQuestionMap questions={activeQuestions} answers={answers} currentIdx={current} onSelect={(idx) => setCurrent(idx)} mode="all" />
        </aside>
      </div>
    </div>
  );
}
