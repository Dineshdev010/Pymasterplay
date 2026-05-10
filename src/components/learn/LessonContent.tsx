import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, RotateCcw, BookOpen, Terminal, Lock, Play, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Editor from "@monaco-editor/react";
import { ExerciseEditor } from "@/components/ExerciseEditor";
import { motion, AnimatePresence } from "framer-motion";
import {
  categoryTone,
  topicCoverage,
  beginnerMastery,
  getLessonHeadings,
  getKeywordGuidesForLine,
  getLocalizedLesson,
  extractGlossaryTerms,
  getLessonClarityGuide,
  getDataTypeUsageGuide,
  getLessonNarrative,
  getLessonQuickExamples,
  getLessonUsagePlaybook,
  pageTextTranslations,
  LearnLanguage,
  getCategoryColor,
} from "@/data/learnPageData";
import { lessons } from "@/data/lessons";

interface LessonContentProps {
  t: typeof pageTextTranslations.english;
  tt: (key: string, fallback: string) => string;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  selectedLesson: any;
  language: LearnLanguage;
  categories: string[];
  getLessonsByCategory: (cat: string) => any[];
  handleSelectLesson: (lessonId: string, index: number, unlocked: boolean) => void;
  isLessonUnlocked: (index: number) => boolean;
  getLessonProgress: (lessonId: string) => number;
  isExerciseUnlocked: (lessonId: string, level: "beginner" | "intermediate" | "advanced") => boolean;
  resetLesson: (lessonId: string) => void;
  handleAdUnlock: (lessonId: string) => void;
  handleWalletUnlock: (lessonId: string) => void;
}

export function LessonContent({
  t,
  tt,
  selectedId,
  setSelectedId,
  selectedLesson,
  language,
  categories,
  getLessonsByCategory,
  handleSelectLesson,
  isLessonUnlocked,
  getLessonProgress,
  isExerciseUnlocked,
  resetLesson,
  handleAdUnlock,
  handleWalletUnlock,
}: LessonContentProps) {
  const selectedLessonHeadings = selectedLesson ? getLessonHeadings(selectedLesson.content) : [];
  
  const selectedLessonGlossary = useMemo(
    () => (selectedLesson ? extractGlossaryTerms(selectedLesson.content) : []),
    [selectedLesson]
  );
  
  const selectedLessonClarityGuide = useMemo(
    () => (selectedLesson ? getLessonClarityGuide(selectedLesson.id, selectedLesson.title, language) : null),
    [selectedLesson, language]
  );
  
  const selectedLessonDataTypeGuide = useMemo(
    () => (selectedLesson ? getDataTypeUsageGuide(selectedLesson.id) : []),
    [selectedLesson]
  );
  
  const selectedLessonNarrative = useMemo(
    () => (selectedLesson ? getLessonNarrative(selectedLesson.id, selectedLesson.title, language) : null),
    [selectedLesson, language]
  );
  
  const selectedLessonQuickExamples = useMemo(
    () => (selectedLesson ? getLessonQuickExamples(selectedLesson.title) : []),
    [selectedLesson]
  );
  
  const selectedLessonUsagePlaybook = useMemo(
    () => (selectedLesson ? getLessonUsagePlaybook(selectedLesson.title) : null),
    [selectedLesson]
  );

  const exampleEditorHeight = useMemo(() => {
    if (!selectedLesson) return 220;
    const lineCount = selectedLesson.codeExample.split("\n").length;
    return Math.min(460, Math.max(200, lineCount * 22 + 24));
  }, [selectedLesson]);

  return (
    <div className="flex-1 overflow-y-auto">
      <AnimatePresence mode="wait">
        {selectedLesson ? (
          <motion.div 
            key={selectedLesson.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            id="tour-learn-lesson" 
            className="w-full max-w-none px-4 sm:px-6 py-6 md:py-8"
          >
            {/* Mobile back button */}
          <button 
            onClick={() => setSelectedId(null)} 
            className="md:hidden flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {t.allLessons}
          </button>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 flex-wrap">
            <span className={`px-2 py-0.5 rounded-full border ${categoryTone[selectedLesson.category as keyof typeof categoryTone]?.badge ?? "bg-secondary text-foreground border-border"}`}>
              {selectedLesson.category}
            </span>
            {getLessonProgress(selectedLesson.id) === 3 && (
              <span className="px-2 py-0.5 rounded-full bg-streak-green/10 text-streak-green border border-streak-green/20">
                {tt("allExercisesComplete", "✓ All exercises complete")}
              </span>
            )}
          </div>
          
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{selectedLesson.title}</h1>
            {getLessonProgress(selectedLesson.id) > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 text-[10px] sm:text-xs gap-1.5 opacity-60 hover:opacity-100 shrink-0 hover:border-destructive/30 hover:text-destructive hover:bg-destructive/10" 
                onClick={() => {
                  if (window.confirm(tt("resetLessonConfirm", "Reset progress for this lesson? You will need to complete these exercises again."))) {
                    resetLesson(selectedLesson.id);
                  }
                }}
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">{t.resetLesson}</span>
                <span className="sm:hidden">{t.reset}</span>
              </Button>
            )}
          </div>
          <p className="text-muted-foreground mb-6">{selectedLesson.description}</p>

          {selectedLessonClarityGuide && (
            <div className="mb-6 rounded-2xl border border-primary/25 bg-primary/5 p-4 sm:p-5">
              <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3">{tt("clearLearningMode", "Crystal Clear Learning Mode")}</h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p><span className="font-semibold text-foreground">Simple summary:</span> {selectedLessonClarityGuide.summary}</p>
                <p><span className="font-semibold text-foreground">Easy analogy:</span> {selectedLessonClarityGuide.analogy}</p>
                <div>
                  <div className="font-semibold text-foreground mb-1">Step-by-step</div>
                  <ul className="space-y-1.5">
                    {selectedLessonClarityGuide.steps.map((step) => (
                      <li key={step} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-streak-green mt-0.5 shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">Where to use this in real work</div>
                  <ul className="space-y-1.5">
                    {selectedLessonClarityGuide.whereToUse.map((useCase) => (
                      <li key={useCase} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">Common mistakes to avoid</div>
                  <ul className="space-y-1.5">
                    {selectedLessonClarityGuide.commonMistakes.map((mistake) => (
                      <li key={mistake} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-python-yellow shrink-0" />
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p><span className="font-semibold text-foreground">Quick self-check:</span> {selectedLessonClarityGuide.quickCheck}</p>
              </div>
            </div>
          )}

          {selectedLessonHeadings.length > 0 && (
            <div className="mb-6 rounded-2xl border border-border bg-card/60 p-4">
              <div className="text-sm font-semibold text-foreground mb-3">{t.inThisLesson}</div>
              <div className="flex flex-wrap gap-2">
                {selectedLessonHeadings.map((heading) => (
                  <span key={heading} className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground">
                    {heading}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selectedLessonGlossary.length > 0 && (
            <div className="mb-6 rounded-2xl border border-border bg-card/60 p-4">
              <div className="text-sm font-semibold text-foreground mb-3">{t.keyTerms}</div>
              <div className="flex flex-wrap gap-2">
                {selectedLessonGlossary.map((term) => (
                  <span key={term} className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground">
                    {term}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selectedLessonDataTypeGuide.length > 0 && (
            <div className="mb-6 rounded-2xl border border-primary/25 bg-primary/5 p-4 sm:p-5">
              <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3">{tt("howToUseDataTypes", "How To Use Each Data Type")}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {selectedLessonDataTypeGuide.map((item) => (
                  <div key={item.name} className="rounded-xl border border-border bg-background/80 p-3">
                    <div className="text-sm font-semibold text-foreground mb-1">{item.name}</div>
                    <p className="text-sm text-muted-foreground mb-1">
                      <span className="font-medium text-foreground">Stores:</span> {item.whatItStores}
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">
                      <span className="font-medium text-foreground">Use when:</span> {item.whenToUse}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Example:</span> <code>{item.example}</code>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedLessonNarrative && (
            <div className="mb-6 rounded-2xl border border-border bg-card/70 p-4 sm:p-5">
              <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3">{tt("fullLessonExplanation", "Full Lesson Explanation")}</h2>
              <p className="text-[15px] sm:text-base text-muted-foreground leading-relaxed mb-3">
                {selectedLessonNarrative.explanation}
              </p>
              <div className="mb-3">
                <div className="font-semibold text-foreground mb-1">Where you will use this</div>
                <ul className="space-y-1.5">
                  {selectedLessonNarrative.practicalUse.map((item) => (
                    <li key={item} className="text-[15px] sm:text-base text-muted-foreground leading-relaxed flex gap-2">
                      <span className="text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-semibold text-foreground mb-1">How to apply it in code</div>
                <ul className="space-y-1.5">
                  {selectedLessonNarrative.implementationFlow.map((step) => (
                    <li key={step} className="text-[15px] sm:text-base text-muted-foreground leading-relaxed flex gap-2">
                      <span className="text-primary">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {selectedLessonQuickExamples.length > 0 && (
            <div className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
              <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3">{tt("quickRunnableExamples", "Quick Runnable Examples")}</h2>
              <div className="grid gap-3">
                {selectedLessonQuickExamples.map((example, index) => (
                  <div key={`${example.label}-${index}`} className="rounded-xl border border-border bg-background/80 p-3">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <div className="text-sm font-semibold text-foreground">{example.label}</div>
                      <Button asChild size="sm" variant="outline" className="h-7 text-xs gap-1">
                        <Link to={`/compiler?code=${encodeURIComponent(example.code)}`}>
                          <Terminal className="w-3 h-3" /> {tt("tryInCompiler", "Try in Compiler")}
                        </Link>
                      </Button>
                    </div>
                    <pre className="rounded-lg border border-border bg-surface-1/60 p-2 text-xs sm:text-sm font-mono text-foreground whitespace-pre-wrap overflow-x-auto">
                      {example.code}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedLessonUsagePlaybook && (
            <div className="mb-6 rounded-2xl border border-primary/25 bg-primary/5 p-4 sm:p-5">
              <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3">{tt("useInRealCode", "How To Use This In Real Code")}</h2>
              <div className="mb-3">
                <div className="font-semibold text-foreground mb-1">When to use</div>
                <ul className="space-y-1.5">
                  {selectedLessonUsagePlaybook.whenToUse.map((item) => (
                    <li key={item} className="text-[15px] sm:text-base text-muted-foreground leading-relaxed flex gap-2">
                      <span className="text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-3">
                <div className="font-semibold text-foreground mb-1">How to apply</div>
                <ul className="space-y-1.5">
                  {selectedLessonUsagePlaybook.howToApply.map((step) => (
                    <li key={step} className="text-[15px] sm:text-base text-muted-foreground leading-relaxed flex gap-2">
                      <span className="text-primary">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-background/80 p-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="text-sm font-semibold text-foreground">{tt("starterPattern", "Starter pattern")}</div>
                  <Button asChild size="sm" variant="outline" className="h-7 text-xs gap-1">
                    <Link to={`/compiler?code=${encodeURIComponent(selectedLessonUsagePlaybook.starterPattern)}`}>
                      <Terminal className="w-3 h-3" /> {tt("tryInCompiler", "Try in Compiler")}
                    </Link>
                  </Button>
                </div>
                <pre className="rounded-lg border border-border bg-surface-1/60 p-2 text-xs sm:text-sm font-mono text-foreground whitespace-pre-wrap overflow-x-auto">
                  {selectedLessonUsagePlaybook.starterPattern}
                </pre>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="mb-8 max-w-[85ch] mx-auto">
            {selectedLesson.content.split("\n").map((line: string, i: number) => {
              const tone = getCategoryColor(selectedLesson.category);
              
              if (line.startsWith("### ")) {
                return (
                  <h3 key={i} className={`text-xl sm:text-2xl font-bold ${tone.label} mt-10 mb-5 flex items-center gap-3 bg-surface-1/50 py-2 px-4 rounded-r-xl border-l-4 border-current shadow-sm`}>
                    {line.replace("### ", "")}
                  </h3>
                );
              }
              if (line.startsWith("## ")) {
                return (
                  <h2 key={i} className={`text-2xl sm:text-3xl font-extrabold ${tone.label} mt-12 mb-6 pb-3 border-b-2 border-current/20`}>
                    {line.replace("## ", "")}
                  </h2>
                );
              }
              
              if (line.startsWith("- ")) {
                const guides = getKeywordGuidesForLine(line);
                return (
                  <div key={i} className="space-y-4 my-5 ml-4">
                    <p className="text-[15px] sm:text-[17px] text-foreground/90 leading-relaxed flex gap-3 items-start">
                      <span className={`mt-2 h-2 w-2 rounded-full ${tone.label.replace("text-", "bg-")} shrink-0 shadow-sm`} />
                      <span className="font-medium">{line.replace("- ", "")}</span>
                    </p>
                    {guides.map(({ token, guide }) => (
                      <div key={`${i}-${token}`} className={`ml-6 rounded-xl border border-border ${tone.bg} p-4 shadow-sm hover:shadow-md transition-shadow`}>
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`p-2 rounded-lg bg-background border border-border ${tone.label}`}>
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-base font-bold text-foreground">{token}</p>
                            <p className="text-sm text-muted-foreground leading-snug">
                              <span className="font-bold text-foreground/80 uppercase text-[10px] tracking-wider mr-1">Usage:</span> {guide.howToUse}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-background/40 px-2 py-1 rounded-md w-fit mb-3">
                          <CheckCircle2 className="w-3 h-3 text-streak-green" />
                          <span className="font-medium">Best for: {guide.whereToUse}</span>
                        </div>

                        {guide.example && (
                          <div className="rounded-lg border border-border bg-surface-1/80 overflow-hidden">
                            <div className="px-3 py-1.5 border-b border-border bg-muted/30 flex items-center justify-between">
                              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Example Snippet</span>
                              <Button asChild size="sm" variant="ghost" className="h-6 text-[10px] px-2 gap-1.5 hover:bg-primary/10 hover:text-primary">
                                <Link to={`/compiler?code=${encodeURIComponent(guide.example)}`}>
                                  <Terminal className="w-3 h-3" /> {tt("run", "Run")}
                                </Link>
                              </Button>
                            </div>
                            <pre className="p-3 overflow-x-auto whitespace-pre-wrap text-sm text-foreground font-mono leading-relaxed">
                              {guide.example}
                            </pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              }
              if (line.trim() === "") return <div key={i} className="h-6" />;
              
              const inlineGuides = getKeywordGuidesForLine(line);
              if (inlineGuides.length > 0) {
                return (
                  <div key={i} className="space-y-4 my-5">
                    <p className="text-[15px] sm:text-[17px] text-foreground/90 leading-relaxed tracking-wide">{line}</p>
                    {inlineGuides.map(({ token, guide }) => (
                      <div key={`${i}-${token}`} className={`rounded-xl border border-border ${tone.bg} p-4 shadow-sm`}>
                         <div className="flex items-start gap-3 mb-2">
                          <div className={`p-2 rounded-lg bg-background border border-border ${tone.label}`}>
                            <Play className="w-4 h-4" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-base font-bold text-foreground">{token}</p>
                            <p className="text-sm text-muted-foreground leading-snug">
                              <span className="font-bold text-foreground/80 uppercase text-[10px] tracking-wider mr-1">Concept:</span> {guide.howToUse}
                            </p>
                          </div>
                        </div>
                        {guide.example && (
                          <div className="mt-3 rounded-lg border border-border bg-surface-1/80 overflow-hidden">
                            <div className="px-3 py-1.5 border-b border-border bg-muted/30 flex items-center justify-between">
                              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Interactive Example</span>
                              <Button asChild size="sm" variant="ghost" className="h-6 text-[10px] px-2 gap-1.5">
                                <Link to={`/compiler?code=${encodeURIComponent(guide.example)}`}>
                                  <Terminal className="w-3 h-3" /> Run
                                </Link>
                              </Button>
                            </div>
                            <pre className="p-3 overflow-x-auto whitespace-pre-wrap text-sm text-foreground font-mono">
                              {guide.example}
                            </pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              }
              return <p key={i} className="text-[15px] sm:text-[17px] text-foreground/90 leading-relaxed tracking-wide mb-5">{line}</p>;
            })}
          </div>

          {/* Code Example */}
          <div className="code-block mb-8">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs text-muted-foreground font-mono">example.py</span>
              </div>
              <Button asChild size="sm" variant="outline" className="h-7 text-xs gap-1">
                <Link to={`/compiler?code=${encodeURIComponent(selectedLesson.codeExample)}`}>
                  <Terminal className="w-3 h-3" /> {tt("tryInCompiler", "Try in Compiler")}
                </Link>
              </Button>
            </div>
            <Editor
              height={exampleEditorHeight}
              language="python"
              theme="vs-dark"
              value={selectedLesson.codeExample}
              options={{
                readOnly: true,
                domReadOnly: true,
                minimap: { enabled: false },
                lineNumbers: "on",
                fontSize: 14,
                fontFamily: "'JetBrains Mono', monospace",
                scrollBeyondLastLine: false,
                wordWrap: "on",
                automaticLayout: true,
                contextmenu: false,
                renderLineHighlight: "none",
                cursorStyle: "line-thin",
                padding: { top: 14, bottom: 12 },
              }}
            />
          </div>

          {/* Exercises */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">
               {t.exercises}
              <span className="text-sm font-normal text-muted-foreground ml-2">
                — {t.complete3}
              </span>
            </h3>
            <div className="space-y-3">
              {(["beginner", "intermediate", "advanced"] as const).map(level => (
                <ExerciseEditor
                  key={`${selectedLesson.id}:${level}`}
                  exercise={selectedLesson.exercises[level]}
                  level={level}
                  lessonId={selectedLesson.id}
                  locked={!isExerciseUnlocked(selectedLesson.id, level)}
                  language="python"
                />
              ))}
            </div>
          </div>

          {/* Next chapter button */}
          {(() => {
            const currentIndex = lessons.findIndex(l => l.id === selectedLesson.id);
            const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
            const canProceed = nextLesson && isLessonUnlocked(currentIndex + 1);
            
            if (!nextLesson) return null;
            
            return (
              <div className={`p-4 rounded-lg border ${canProceed ? "border-primary/30 bg-primary/5" : "border-border bg-surface-1"}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {canProceed ? (
                      <CheckCircle2 className="w-5 h-5 text-streak-green" />
                    ) : (
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {canProceed ? t.nextUnlocked : t.lockedText}
                      </p>
                      <p className="text-xs text-muted-foreground">{getLocalizedLesson(nextLesson, language)?.title ?? nextLesson.title}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!canProceed && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAdUnlock(nextLesson.id)}
                          className="gap-1 text-primary border-primary/30 hover:bg-primary/10"
                        >
                          <Play className="w-3 h-3" /> {t.sponsor}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleWalletUnlock(nextLesson.id)}
                          className="gap-1 text-reward-gold border-reward-gold/30 hover:bg-reward-gold/10"
                        >
                          {tt("pay100", "Pay $100")}
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      disabled={!canProceed}
                      onClick={() => setSelectedId(nextLesson.id)}
                      className="gap-1"
                    >
                      {t.next} <ChevronRight className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })()}
          </motion.div>
        ) : (
          <motion.div 
            key="empty-state"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            id="tour-learn-header" 
            className="flex flex-col items-center md:justify-center h-full text-center px-4 sm:px-6 py-6 overflow-y-auto"
          >
          <BookOpen className="w-12 h-12 text-muted-foreground/30 mb-4 hidden md:block" />
          <h2 className="text-xl font-semibold text-foreground mb-2">{t.selectLesson}</h2>
          <p className="text-muted-foreground mb-6 hidden md:block">{t.selectLessonDesc}</p>

          <div className="w-full max-w-5xl mb-6 rounded-2xl border border-primary/25 bg-primary/5 p-5 text-left">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-base font-semibold text-foreground">200 Python Quiz</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {tt("quizBlockDesc", "Practice all core Python topics with 100 MCQ questions and instant explanations.")}
                </p>
              </div>
              <Button asChild>
                <Link to="/python-quiz-100">{t.startQuiz}</Link>
              </Button>
            </div>
          </div>

          <div id="tour-learn-roadmap" className="w-full max-w-5xl mb-8 grid gap-4 sm:grid-cols-2 text-left">
            {topicCoverage.map((group) => (
              <div key={group.title} className="rounded-2xl border border-border bg-card/60 p-4">
                <div className="text-sm font-semibold text-foreground mb-3">{group.title}</div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full max-w-5xl mb-8 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-left">
            <div className="text-base font-semibold text-foreground mb-3">{t.beginnerMastery}</div>
            <p className="text-sm text-muted-foreground mb-4">
              {tt(
                "beginnerMasteryDesc",
                "If someone completes the beginner track carefully, these are the core skills they should understand clearly before moving ahead.",
              )}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {beginnerMastery.map((item) => (
                <div key={item} className="rounded-xl border border-border bg-background/80 px-3 py-2 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile lesson list grouped by category */}
          <div id="tour-learn-mobile-list" className="md:hidden w-full max-w-md space-y-4 text-left">
            {categories.map(cat => (
              <div key={cat}>
                <h3 className={`text-sm font-bold uppercase tracking-wider mb-2 ${categoryTone[cat].label}`}>
                  {categoryTone[cat].heading}
                </h3>
                <div className="space-y-2">
                  {getLessonsByCategory(cat).map(lesson => {
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
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        key={lesson.id}
                        onClick={() => handleSelectLesson(lesson.id, globalIndex, unlocked)}
                        className={`w-full px-4 py-3 bg-card border border-border rounded-xl transition-all shadow-sm ${
                          unlocked ? "hover:border-primary/40 hover:shadow-md" : "hover:border-reward-gold/40"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3.5">
                            {!unlocked ? (
                              <div className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center shrink-0">
                                <Lock className="w-4 h-4 text-muted-foreground/60" />
                              </div>
                            ) : allDone ? (
                              <div className="w-8 h-8 rounded-lg bg-streak-green/10 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-4 h-4 text-streak-green" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                <BookOpen className="w-4 h-4 text-primary" />
                              </div>
                            )}
                            <div className="text-left">
                              <div className="text-sm font-bold text-foreground">{localizedLesson.title}</div>
                              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{localizedLesson.category}</div>
                            </div>
                          </div>
                          {!unlocked ? (
                            <span className="text-[10px] font-bold tracking-widest text-primary flex items-center gap-1 uppercase bg-primary/5 px-2 py-1 rounded-sm"><Play className="w-3 h-3" />$100</span>
                          ) : (
                            <span className={`text-[11px] font-bold tabular-nums tracking-widest ${allDone ? "text-streak-green" : "text-muted-foreground/70"}`}>{exercisesDone}/3</span>
                          )}
                        </div>
                        {unlocked && (
                          <div className="mt-3 h-1.5 bg-surface-2/80 rounded-full overflow-hidden relative">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(exercisesDone / 3) * 100}%` }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                              className={`absolute left-0 top-0 h-full transition-all duration-300 ${
                                allDone ? "bg-streak-green shadow-[0_0_8px_rgba(34,197,94,0.4)]" : exercisesDone > 0 ? "bg-python-yellow" : "bg-muted-foreground/20"
                              }`}
                            />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
