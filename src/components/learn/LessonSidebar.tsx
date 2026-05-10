import { Link } from "react-router-dom";
import { BookOpen, Search, Play, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categoryTone, getLocalizedLesson, LearnLanguage, pageTextTranslations } from "@/data/learnPageData";
import { lessons } from "@/data/lessons";
import { motion, AnimatePresence } from "framer-motion";

interface LessonSidebarProps {
  t: typeof pageTextTranslations.english;
  lessonSearch: string;
  setLessonSearch: (val: string) => void;
  progress: any; // We'll type this properly if possible, but any is ok for now given it's from context
  categories: string[];
  getLessonsByCategory: (cat: string) => typeof lessons;
  language: LearnLanguage;
  selectedId: string | null;
  handleSelectLesson: (lessonId: string, index: number, unlocked: boolean) => void;
  isLessonUnlocked: (index: number) => boolean;
  getLessonProgress: (lessonId: string) => number;
}

export function LessonSidebar({
  t,
  lessonSearch,
  setLessonSearch,
  progress,
  categories,
  getLessonsByCategory,
  language,
  selectedId,
  handleSelectLesson,
  isLessonUnlocked,
  getLessonProgress,
}: LessonSidebarProps) {
  return (
    <aside id="tour-learn-sidebar" className="w-72 border-r border-border bg-surface-1 overflow-y-auto shrink-0 hidden md:block">
      <div className="p-4 border-b border-border space-y-3">
        <h2 className="font-semibold text-foreground flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" /> {t.lessonsTitle}
        </h2>
        
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input 
            type="text"
            placeholder="Search topics..."
            value={lessonSearch}
            onChange={(e) => setLessonSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-surface-2 border border-border rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all"
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[10px] text-muted-foreground">
            {progress.completedLessons.length}/{lessons.length} {t.completed}
          </p>
          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Play className="w-2.5 h-2.5" /> {t.unlockInfo}
          </p>
        </div>
        
        <Button asChild size="sm" variant="outline" className="h-8 w-full justify-start text-[11px]">
          <Link to="/python-quiz-100">{t.takeQuiz}</Link>
        </Button>
      </div>
      <nav className="p-2">
        {categories.map(cat => {
          const catLessons = getLessonsByCategory(cat);
          return (
            <div key={cat} className="mb-3">
              <div className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider ${categoryTone[cat].label}`}>
                {categoryTone[cat].heading}
              </div>
              {catLessons.map((lesson) => {
                const localizedLesson = getLocalizedLesson(lesson, language) ?? lesson;
                const globalIndex = lessons.indexOf(lesson);
                const unlocked = isLessonUnlocked(globalIndex);
                const exercisesDone = getLessonProgress(lesson.id);
                const allDone = exercisesDone === 3;
                return (
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: globalIndex * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    key={lesson.id}
                    onClick={() => handleSelectLesson(lesson.id, globalIndex, unlocked)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all duration-300 mb-1 ${
                      !unlocked
                        ? "text-muted-foreground/50 hover:bg-surface-2/50 cursor-pointer border border-transparent"
                        : selectedId === lesson.id
                        ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                        : "text-muted-foreground hover:bg-surface-2 hover:text-foreground border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {!unlocked ? (
                        <div className="w-5 h-5 rounded-md bg-surface-2/80 flex items-center justify-center shrink-0">
                          <Lock className="w-3 h-3 text-muted-foreground/60" />
                        </div>
                      ) : allDone ? (
                        <div className="w-5 h-5 rounded-md bg-streak-green/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-streak-green" />
                        </div>
                      ) : (
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${
                          selectedId === lesson.id ? "bg-primary/20 text-primary" : "bg-surface-2 text-muted-foreground"
                        }`}>
                          {globalIndex + 1}
                        </div>
                      )}
                      <span className={`truncate flex-1 font-medium ${selectedId === lesson.id ? "text-primary" : ""}`}>
                        {localizedLesson.title}
                      </span>
                      {!unlocked && (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-primary/70 flex items-center gap-0.5 bg-primary/5 px-1.5 py-0.5 rounded-sm">
                          <Play className="w-2.5 h-2.5" /> $100
                        </span>
                      )}
                    </div>
                    {/* Progress bar for unlocked lessons */}
                    <AnimatePresence>
                      {unlocked && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-2 flex items-center gap-2.5 pl-7"
                        >
                          <div className="flex-1 h-1.5 bg-surface-2/80 rounded-full overflow-hidden relative">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(exercisesDone / 3) * 100}%` }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                              className={`absolute left-0 top-0 h-full rounded-full ${
                                allDone ? "bg-streak-green shadow-[0_0_8px_rgba(34,197,94,0.4)]" : exercisesDone > 0 ? "bg-python-yellow" : "bg-muted-foreground/20"
                              }`}
                            />
                          </div>
                          <span className={`text-[9px] font-bold tracking-wider tabular-nums ${
                            allDone ? "text-streak-green" : exercisesDone > 0 ? "text-python-yellow" : "text-muted-foreground/60"
                          }`}>
                            {exercisesDone}/3
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
