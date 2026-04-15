import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { careerTracks } from "@/data/careerLessons";
import { useProgress } from "@/contexts/ProgressContext";
import { LinuxTerminalEditor } from "@/components/LinuxTerminalEditor";
import { LinuxSymbolsBackground } from "@/components/LinuxSymbolsBackground";
import { 
  CheckCircle2, 
  ChevronRight, 
  Lock, 
  Award, 
  Layout,
  Search,
  BookOpen,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

type ExerciseLevel = "beginner" | "intermediate" | "advanced";
const exerciseLevels: ExerciseLevel[] = ["beginner", "intermediate", "advanced"];

function getRenderedContent(content: string) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let inCode = false;
  let codeBuffer: string[] = [];
  let bulletBuffer: string[] = [];

  const flushCode = (key: string) => {
    if (!codeBuffer.length) return;
    blocks.push(
      <pre key={key} className="mt-4 rounded-xl border border-white/10 bg-[#0d1117] p-4 overflow-x-auto text-sm text-emerald-300/90 font-mono leading-relaxed">
        {codeBuffer.join("\n")}
      </pre>,
    );
    codeBuffer = [];
  };

  const flushBullets = (key: string) => {
    if (!bulletBuffer.length) return;
    blocks.push(
      <ul key={key} className="space-y-2 mt-3">
        {bulletBuffer.map((item, idx) => (
          <li key={`${key}-${idx}`} className="text-white/80 flex items-start gap-3">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>,
    );
    bulletBuffer = [];
  };

  lines.forEach((rawLine, i) => {
    const line = rawLine.trimEnd();
    const key = `line-${i}`;

    if (line.startsWith("```")) {
      flushBullets(`${key}-bullets`);
      if (inCode) {
        flushCode(`${key}-code`);
        inCode = false;
      } else {
        inCode = true;
      }
      return;
    }

    if (inCode) {
      codeBuffer.push(rawLine);
      return;
    }

    if (line.startsWith("## ")) {
      flushBullets(`${key}-bullets`);
      blocks.push(
        <h3 key={key} className="text-2xl md:text-3xl font-bold text-white mt-10 mb-3">
          {line.replace("## ", "")}
        </h3>,
      );
      return;
    }

    if (line.startsWith("### ")) {
      flushBullets(`${key}-bullets`);
      blocks.push(
        <h4 key={key} className="text-lg font-semibold text-emerald-300 mt-6 mb-2">
          {line.replace("### ", "")}
        </h4>,
      );
      return;
    }

    if (line.startsWith("- ")) {
      bulletBuffer.push(line.replace("- ", ""));
      return;
    }

    flushBullets(`${key}-bullets`);
    if (!line) {
      blocks.push(<div key={key} className="h-3" />);
      return;
    }

    blocks.push(
      <p key={key} className="text-white/85 leading-7">
        {line}
      </p>,
    );
  });

  flushBullets("end-bullets");
  if (inCode) {
    flushCode("end-code");
  }

  return blocks;
}

export default function LinuxLearningPage() {
  const { progress } = useProgress();
  const track = useMemo(() => careerTracks.find(t => t.id === "linux"), []);
  const [selectedId, setSelectedId] = useState<string | null>(track?.lessons[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState("");
  const safeLessons = track?.lessons ?? [];

  const isLessonUnlocked = (index: number): boolean => {
    if (!track) return false;
    if (index === 0) return true;
    const prevLesson = safeLessons[index - 1];
    if (!prevLesson?.id) return false;
    return progress.completedExercises.includes(`${prevLesson.id}:beginner`);
  };

  const isExerciseUnlocked = (lessonId: string, level: ExerciseLevel): boolean => {
    if (level === "beginner") return true;
    if (level === "intermediate") return progress.completedExercises.includes(`${lessonId}:beginner`);
    return progress.completedExercises.includes(`${lessonId}:intermediate`);
  };

  const getLessonProgress = (lessonId: string) => {
    return exerciseLevels.filter((level) => progress.completedExercises.includes(`${lessonId}:${level}`)).length;
  };

  const unlockedLessons = useMemo(() => {
    return safeLessons.filter((_, index) => isLessonUnlocked(index));
  }, [safeLessons, progress.completedExercises]);

  useEffect(() => {
    if (!track) return;
    const selectedIndex = safeLessons.findIndex((lesson) => lesson.id === selectedId);
    const selectedValid = selectedIndex >= 0 && isLessonUnlocked(selectedIndex);
    if (!selectedValid) {
      setSelectedId(unlockedLessons[unlockedLessons.length - 1]?.id ?? safeLessons[0]?.id ?? null);
    }
  }, [selectedId, track, safeLessons, unlockedLessons]);

  const selectedLesson = useMemo(() => {
    if (!track) return null;
    return safeLessons.find((l: { id: string }) => l.id === selectedId) || safeLessons[0] || null;
  }, [track, safeLessons, selectedId]);

  if (!track || !selectedLesson) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 min-h-[60vh]">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-emerald-500/10 animate-pulse"></div>
          </div>
        </div>
        <div className="space-y-2 text-center">
          <h2 className="text-emerald-500 font-mono text-sm tracking-[0.3em] uppercase animate-pulse">Initializing_Kernel</h2>
          <p className="text-emerald-500/40 font-mono text-[10px] uppercase tracking-widest">Accessing_Mastery_Data_Stream...</p>
        </div>
      </div>
    );
  }

  const currentIndex = safeLessons.findIndex((l: { id: string }) => l.id === selectedLesson.id);
  const completedExerciseCount = safeLessons.reduce((acc, lesson) => acc + getLessonProgress(lesson.id), 0);
  const totalExerciseCount = safeLessons.length * exerciseLevels.length;
  const filteredLessons = safeLessons.filter((lesson) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (lesson.title ?? "").toLowerCase().includes(query) || (lesson.description ?? "").toLowerCase().includes(query);
  });
  const selectedLessonContent = useMemo(() => getRenderedContent(selectedLesson.content ?? ""), [selectedLesson.content]);
  const prevLesson = currentIndex > 0 ? safeLessons[currentIndex - 1] : null;
  const nextLesson = safeLessons[currentIndex + 1];
  const canGoPrev = Boolean(prevLesson);
  const canGoNext = Boolean(nextLesson && isLessonUnlocked(currentIndex + 1));

  return (
    <div className="relative flex flex-col text-white selection:bg-emerald-500/30 overflow-x-hidden bg-black">
      <Helmet>
        <title>Linux Mastery | PyMaster</title>
        <meta name="description" content="Master Linux terminal and server administration with real-time exercises." />
      </Helmet>
      <LinuxSymbolsBackground />
      
      <main className="relative z-10 grid min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-3.5rem)] lg:h-[calc(100svh-3.5rem)] lg:grid-cols-[380px_1fr] overflow-y-auto lg:overflow-hidden">
        {/* Left: Content & Roadmap */}
        <aside className="border-r border-white/5 bg-white/[0.01] flex flex-col lg:h-full overflow-hidden">
          {/* Tabs for Sidebar */}
          <div className="p-4 border-b border-white/5 bg-black/40 space-y-3">
            <div className="flex-1 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2">
              <Layout className="w-4 h-4" /> Curriculum
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                <div className="text-white/50 mb-1 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> Unlocked
                </div>
                <div className="font-semibold text-white">{unlockedLessons.length}/{safeLessons.length}</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                <div className="text-white/50 mb-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Progress
                </div>
                <div className="font-semibold text-white">{completedExerciseCount}/{totalExerciseCount}</div>
              </div>
            </div>
            <label className="relative block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lesson..."
                className="w-full rounded-lg border border-white/10 bg-black/30 py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-emerald-500/50"
              />
            </label>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
            {filteredLessons.map((lesson) => {
              const i = safeLessons.findIndex((item) => item.id === lesson.id);
              const unlocked = isLessonUnlocked(i);
              const progressCount = getLessonProgress(lesson.id);
              const isSelected = selectedId === lesson.id;
              
              return (
                <button
                  key={lesson.id}
                  disabled={!unlocked}
                  onClick={() => setSelectedId(lesson.id)}
                  className={`w-full group text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                    isSelected 
                      ? "bg-emerald-500/10 border-emerald-500/30" 
                      : unlocked 
                        ? "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]" 
                        : "bg-white/[0.01] border-transparent opacity-40 cursor-not-allowed"
                  }`}
                >
                  {isSelected && (
                    <motion.div 
                      layoutId="sidebar-glow" 
                      className="absolute inset-0 bg-emerald-500/5 blur-xl pointer-events-none" 
                    />
                  )}
                  
                  <div className="flex items-start justify-between gap-3 relative z-10">
                    <div className="flex gap-3">
                      <div className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center text-[10px] font-mono shrink-0 transition-colors ${
                        progressCount === 3 
                          ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" 
                          : isSelected 
                            ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" 
                            : "bg-white/5 border-white/10 text-white/30"
                      }`}>
                        {progressCount === 3 ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                      </div>
                      <div>
                        <h3 className={`text-sm font-bold transition-colors ${isSelected ? "text-white" : "text-white/60"}`}>
                          {lesson.title}
                        </h3>
                        {unlocked ? (
                          <div className="flex items-center gap-2 mt-1">
                             <div className="flex items-center gap-1">
                                {[1, 2, 3].map(step => (
                                  <div 
                                    key={step} 
                                    className={`w-1.5 h-1.5 rounded-full ${step <= progressCount ? "bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.5)]" : "bg-white/10"}`} 
                                  />
                                ))}
                             </div>
                             <span className="text-[11px] font-mono text-white/50 uppercase tracking-tighter">
                               {progressCount}/3 modules.bin
                             </span>
                          </div>
                        ) : (
                          <span className="text-xs text-white/40 flex items-center gap-1 mt-1 font-mono">
                            <Lock className="w-2.5 h-2.5" /> ENCRYPTED_BLOCK
                          </span>
                        )}
                      </div>
                    </div>
                    {isSelected && <ChevronRight className="w-4 h-4 text-emerald-500" />}
                  </div>
                </button>
              );
            })}
            {!filteredLessons.length && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
                No lessons match your search.
              </div>
            )}
          </div>
        </aside>

        {/* Right: Active Lesson & Terminal */}
        <div className="bg-black/20 flex flex-col lg:h-full overflow-y-auto">
          <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <div className="text-sm text-white/70">
                Working on <span className="font-semibold text-white">{selectedLesson.title}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!canGoPrev}
                  onClick={() => {
                    if (prevLesson) setSelectedId(prevLesson.id);
                  }}
                  className="border-white/20 bg-transparent"
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  disabled={!canGoNext}
                  onClick={() => {
                    if (nextLesson) setSelectedId(nextLesson.id);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500"
                >
                  Next
                </Button>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLesson.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Lesson Detail Card */}
                <div className="mb-12">
                   <div className="flex items-center gap-4 mb-4">
                     <Badge variant="outline" className="text-emerald-400 border-emerald-400/20 px-3 py-1 font-mono text-xs">
                       LESSON_{currentIndex + 1}.SYS
                     </Badge>
                     {getLessonProgress(selectedLesson.id) === 3 && (
                       <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-3 py-1 font-mono text-xs">
                         STATUS_AUTHORIZED
                       </Badge>
                     )}
                   </div>
                   <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
                     {selectedLesson.title.split('. ')[1] || selectedLesson.title}
                   </h2>
                   <p className="text-xl text-white/90 font-medium leading-relaxed max-w-2xl mb-10 italic border-l-4 border-emerald-500/30 pl-6 drop-shadow-sm">
                     "{selectedLesson.description}"
                   </p>

                   {/* Rich Lesson Content */}
                   <div className="max-w-none space-y-1">
                     {selectedLessonContent}
                   </div>

                   {selectedLesson.codeExample && (
                     <div className="mt-12 group relative">
                       <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-primary/20 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000" />
                       <div className="relative bg-[#0d1117] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                         <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center justify-between">
                           <span className="text-[10px] font-mono text-white/40 font-bold uppercase tracking-widest">EXAMPLE_SHELL</span>
                           <div className="flex gap-1.5">
                             <div className="w-2 h-2 rounded-full bg-white/10" />
                             <div className="w-2 h-2 rounded-full bg-white/10" />
                             <div className="w-2 h-2 rounded-full bg-white/10" />
                           </div>
                         </div>
                         <pre className="p-6 text-emerald-400/90 font-mono text-sm overflow-x-auto leading-relaxed">
                           {selectedLesson.codeExample}
                         </pre>
                       </div>
                     </div>
                   )}
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent my-16" />

                {/* Challenges Section */}
                <div className="mb-24">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-primary/10 p-3 rounded-xl border border-primary/20">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-widest uppercase">System Exercises</h3>
                      <p className="text-sm text-white/40 font-mono italic">Execute commands to gain authorization tokens</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {exerciseLevels.map(level => {
                      const exercise = selectedLesson.exercises?.[level];

                      if (!exercise) {
                        return (
                          <div
                            key={level}
                            className="rounded-xl border border-white/10 bg-black/40 p-6 text-sm text-white/60"
                          >
                            {level} exercise data is unavailable for this lesson.
                          </div>
                        );
                      }

                      return (
                        <LinuxTerminalEditor
                          key={level}
                          exercise={exercise}
                          level={level}
                          lessonId={selectedLesson.id}
                          locked={!isExerciseUnlocked(selectedLesson.id, level)}
                        />
                      );
                    })}
                  </div>

                  {/* Next Lesson Foot-navigation */}
                  {(() => {
                    const next = nextLesson;
                    const canProceed = Boolean(next && isLessonUnlocked(currentIndex + 1));
                    if (!next) return (
                      <div className="mt-12 p-8 rounded-2xl border border-reward-gold/20 bg-reward-gold/5 text-center">
                        <Award className="w-12 h-12 text-reward-gold mx-auto mb-4" />
                        <h4 className="text-xl font-bold text-white uppercase tracking-widest mb-2 shadow-sm">Certification Eligible</h4>
                        <p className="text-white/40 text-sm max-w-sm mx-auto italic">
                          You have decrypted all blocks in the Linux Mastery track. 
                          Check your total XP in the dashboard.
                        </p>
                      </div>
                    );
                    return (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`mt-12 p-6 rounded-2xl border transition-all duration-500 ${
                          canProceed 
                            ? "border-emerald-500/20 bg-emerald-500/[0.03] shadow-lg shadow-emerald-500/5" 
                            : "border-white/5 bg-white/[0.01] opacity-50"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                              canProceed ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-white/5 border-white/10 text-white/20"
                            }`}>
                              {canProceed ? <CheckCircle2 className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                            </div>
                            <div className="text-center sm:text-left">
                              <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-1">
                                {canProceed ? "BLOCK_UNLOCKED" : "SEQUENTIAL_LOCK_ACTIVE"}
                              </p>
                              <h4 className="text-lg font-bold text-white">{next.title}</h4>
                            </div>
                          </div>
                          <Button 
                            disabled={!canProceed} 
                            onClick={() => {
                              setSelectedId(next.id);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }} 
                            className={`h-12 px-6 sm:px-8 rounded-xl font-mono uppercase tracking-widest gap-2 min-w-0 sm:min-w-[180px] ${
                              canProceed ? "bg-emerald-600 hover:bg-emerald-500" : ""
                            }`}
                          >
                            Next Module <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    );
                  })()}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
