import React, { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence, type Easing } from "framer-motion";
import { 
  ArrowLeft, Brain, BookOpen, Target, Zap, Search, 
  CheckCircle2, Code, PlayCircle, ExternalLink, 
  Lightbulb, CheckCheck, TrendingUp, AlertTriangle,
  HelpCircle, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { problems, type Problem } from "@/data/problems";
import { 
  dsaTopics, 
  categories, 
  tCategory, 
  getLocalizedDSATopic, 
  getLevelLabel, 
  getTopicPlaybook, 
  getRelatedProblems, 
  buildYouTubeSearchUrl, 
  parseNodesFromCode, 
  parseNumberList, 
  parseTokenList, 
  inferVisualizationType, 
  extractSeedInput, 
  buildTreeLevels,
  masteredTopicsStorageKey,
  type DSATopic
} from "@/data/dsaData";
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" as Easing } }),
};


export default function DSAPage() {
  const canonical = "https://pymaster.pro/dsa";
  const [searchParams, setSearchParams] = useSearchParams();
  const topicIdFromUrl = searchParams.get("topic");
  
  const { language } = useLanguage();

  // Use URL as source of truth for the selected topic ID
  const selectedTopicId = topicIdFromUrl;

  const [visualInput, setVisualInput] = useState("1,2,3,4,5");
  const [windowStart, setWindowStart] = useState(0);
  const [windowSize, setWindowSize] = useState(3);
  const [activeProblem, setActiveProblem] = useState<Problem | null>(null);
  const [activeVisualization, setActiveVisualization] = useState<"array" | "string" | "sliding-window" | "linked-list" | "tree" | "graph">("array");
  const [linkedListCodeInput, setLinkedListCodeInput] = useState(
    "head = ListNode(1)\nhead.next = ListNode(2)\nhead.next.next = ListNode(3)\nhead.next.next.next = ListNode(4)",
  );
  const [linkedListNodes, setLinkedListNodes] = useState<number[]>([1, 2, 3, 4]);
  const [masteredTopics, setMasteredTopics] = useState<string[]>([]);
  const [activePlaybookTab, setActivePlaybookTab] = useState<"plan" | "strategy" | "pitfalls">("plan");

  const topic = useMemo(() => {
    const base = dsaTopics.find((t) => t.id === selectedTopicId);
    return getLocalizedDSATopic(base, language);
  }, [language, selectedTopicId]);

  const relatedProblems = useMemo(() => (topic ? getRelatedProblems(topic.id) : []), [topic]);
  const arrayValues = useMemo(() => parseNumberList(visualInput), [visualInput]);
  const stringValues = useMemo(() => visualInput.replace(/\s+/g, ""), [visualInput]);
  const graphEdges = useMemo(() => parseTokenList(visualInput), [visualInput]);
  const treeLevels = useMemo(() => buildTreeLevels(arrayValues), [arrayValues]);
  const masteredCount = masteredTopics.length;
  const masteredPct = Math.round((masteredCount / dsaTopics.length) * 100);
  const playbook = topic ? getTopicPlaybook(topic) : null;

  const difficultyColor = {
    Easy: "text-streak-green bg-streak-green/10 border-streak-green/30",
    Medium: "text-python-yellow bg-python-yellow/10 border-python-yellow/30",
    Hard: "text-destructive bg-destructive/10 border-destructive/30",
  };

  const handleTopicSelect = (id: string | null) => {
    if (id) {
      setSearchParams({ topic: id }, { replace: true });
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("topic");
      setSearchParams(newParams, { replace: true });
    }
  };

  useEffect(() => {
    if (!topic) return;
    setActiveProblem(null);
    setActiveVisualization(inferVisualizationType(topic.id));
    setVisualInput(topic.id === "graphs" ? "A-B,B-C,C-D,D-E" : "1,2,3,4,5");
    setWindowStart(0);
    setWindowSize(3);
  }, [topic?.id]); // Only reset when the topic ID actually changes

  useEffect(() => {
    try {
      const stored = localStorage.getItem(masteredTopicsStorageKey);
      if (!stored) return;
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setMasteredTopics(parsed.filter((value): value is string => typeof value === "string"));
      }
    } catch {
      setMasteredTopics([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(masteredTopicsStorageKey, JSON.stringify(masteredTopics));
    } catch {
      // Ignore storage failures gracefully.
    }
  }, [masteredTopics]);



  return (
    <div className="flex flex-col h-[calc(100dvh-3.5rem)] overflow-hidden bg-background/95">
      <Helmet>
        <title>Data Structures & Algorithms in Python | PyMaster Mastery</title>
        <meta
          name="description"
          content="Master Data Structures and Algorithms with interactive explanations, visual diagrams, and Python code examples. Learn fundamental patterns like Sliding Window, Two Pointers, and Binary Search."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Python DSA Guide: Patterns & Fundamentals" />
        <meta property="og:description" content="A comprehensive guide to mastering DSA with Python. Visual explanations, complexity analysis, and pattern detection tips." />
        <meta property="og:image" content="https://pymaster.pro/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Python DSA Guide: Patterns & Fundamentals" />
        <meta name="twitter:description" content="Master DSA with Python visual examples." />
      </Helmet>

      {/* Crawlable Description for SEO/AdSense */}
      <div className="bg-surface-1 border-b border-border/40 px-4 py-2 shrink-0">
        <p className="text-[10px] text-muted-foreground/70 max-w-7xl mx-auto leading-relaxed">
          <strong>PyMaster DSA Guide:</strong> Master Data Structures and Algorithms (DSA) with our comprehensive guide featuring 
          <strong>interactive explanations</strong>, <strong>visual diagrams</strong>, and <strong>Python code examples</strong>. 
          Learn fundamental patterns like <strong>Sliding Window</strong>, <strong>Two Pointers</strong>, <strong>Binary Search</strong>, and <strong>Recursion</strong>. 
          Each topic includes <strong>time and space complexity analysis</strong>, <strong>pattern detection tips</strong> for coding interviews, and <strong>real-world applications</strong> to help you excel in technical rounds at top tech companies.
        </p>
      </div>

      <div className="flex flex-1 min-h-0 flex-col md:flex-row">

      
      {/* Sidebar */}
      <aside className="w-72 border-r border-border bg-card/70 backdrop-blur-md overflow-y-auto scrollbar-none shrink-0 hidden md:block z-10">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" /> 🧠 DSA Mastery
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            {dsaTopics.length} topics • Pattern-based learning
          </p>
          <div className="mt-3 rounded-xl border border-border bg-card/60 p-3">
            <div className="text-[11px] font-semibold text-foreground">Choose your level</div>
            <div className="mt-2 space-y-2 text-[11px] leading-5 text-muted-foreground">
              <div><span className="font-semibold text-foreground">Beginner:</span> learn the “what” and “why” with easy examples.</div>
              <div><span className="font-semibold text-foreground">Intermediate:</span> spot repeatable patterns across problems.</div>
              <div><span className="font-semibold text-foreground">Advanced:</span> handle DP/graphs and explain tradeoffs clearly.</div>
            </div>
            <div className="mt-3 rounded-lg border border-primary/20 bg-primary/5 p-2.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-foreground">Pattern Progress</span>
                <span className="text-primary">{masteredCount}/{dsaTopics.length}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-1">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${masteredPct}%` }} />
              </div>
            </div>
          </div>
        </div>
        <nav className="p-2">
          {categories.map(cat => {
            const catTopics = dsaTopics.filter(t => t.category === cat.id);
            return (
              <div key={cat.id} className="mb-3">
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary">
                  {tCategory(cat.title, language)}
                </div>
                {catTopics.map(t => (

                  <button
                    key={t.id}
                    onClick={() => handleTopicSelect(t.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-md text-sm flex items-center gap-2 transition-colors mb-0.5 ${
                      selectedTopicId === t.id
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    <span>{t.emoji}</span>
                    <span className="truncate flex-1">
                      {getLocalizedDSATopic(t, language)?.title ?? t.title}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${difficultyColor[t.difficulty]}`}>
                      {t.difficulty}
                    </span>
                  </button>
                ))}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Content area with unique scrollbar */}
      <div className="flex-1 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
        {topic ? (
          <div className="w-full max-w-5xl px-4 sm:px-6 md:px-8 py-6 md:py-8">
            {/* Mobile back button */}

            <button 
              onClick={() => handleTopicSelect(null)} 
              className="md:hidden flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> All Topics
            </button>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">{topic.emoji}</span>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">{topic.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${difficultyColor[topic.difficulty]}`}>
                    {topic.difficulty}
                  </span>
                  <span className="text-xs text-muted-foreground">{getLevelLabel(topic.category)}</span>
                </div>
              </div>
              <Button
                type="button"
                variant={masteredTopics.includes(topic.id) ? "default" : "outline"}
                size="sm"
                className="ml-auto"
                onClick={() =>
                  setMasteredTopics((current) =>
                    current.includes(topic.id) ? current.filter((id) => id !== topic.id) : [...current, topic.id],
                  )
                }
              >
                {masteredTopics.includes(topic.id) ? "Mastered" : "Mark Mastered"}
              </Button>
            </div>

            {/* Visual Explanation */}
            <motion.div
              initial="hidden" animate="visible" variants={fadeUp} custom={0}
              className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-5 mb-6"
            >
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-python-yellow shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">💡 Visual Analogy</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{topic.visualExplanation}</p>
                </div>
              </div>
            </motion.div>

            {/* What is it */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1} className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" /> What is it?
              </h2>
              <p className="text-muted-foreground leading-relaxed">{topic.whatIsIt}</p>
            </motion.div>

            {/* Why use it */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2} className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-streak-green" /> Why use it?
              </h2>
              <p className="text-muted-foreground leading-relaxed">{topic.whyUseIt}</p>
            </motion.div>

            {/* When to use */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-python-yellow" /> When to use it
              </h2>
              <ul className="space-y-1.5">
                {topic.whenToUse.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-streak-green shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* 🔍 Pattern Detection — KEY SECTION */}
            <motion.div
              initial="hidden" animate="visible" variants={fadeUp} custom={4}
              className="bg-card border-2 border-primary/30 rounded-xl p-5 mb-6"
            >
              <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" /> 🔍 Pattern Detection
              </h2>
              <p className="text-xs text-muted-foreground mb-3">When you see these clues in a problem, this data structure/pattern is likely the answer:</p>
              <div className="space-y-2">
                {topic.patternDetection.map((pattern, i) => (
                  <div key={i} className="bg-surface-1 rounded-lg px-4 py-2.5 text-sm text-foreground font-mono">
                    {pattern}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Complexity */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={5} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="bg-surface-1 border border-border rounded-lg p-4">
                <div className="text-xs text-muted-foreground mb-1">⏱️ Time Complexity</div>
                <div className="text-sm font-mono text-foreground">{topic.timeComplexity}</div>
              </div>
              <div className="bg-surface-1 border border-border rounded-lg p-4">
                <div className="text-xs text-muted-foreground mb-1">💾 Space Complexity</div>
                <div className="text-sm font-mono text-foreground">{topic.spaceComplexity}</div>
              </div>
            </motion.div>

            {playbook && (
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={5} className="mb-8 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                <div className="flex border-b border-border bg-muted/30">
                  {[
                    { id: "plan", label: "Solve Plan", icon: CheckCheck },
                    { id: "strategy", label: "Strategy & Tradeoffs", icon: TrendingUp },
                    { id: "pitfalls", label: "Pitfalls & Cases", icon: AlertTriangle },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActivePlaybookTab(tab.id as any)}
                      className={`flex flex-1 items-center justify-center gap-2 py-4 text-xs font-bold uppercase tracking-widest transition-all ${
                        activePlaybookTab === tab.id
                          ? "bg-background text-primary border-b-2 border-primary"
                          : "text-muted-foreground hover:bg-background/50"
                      }`}
                    >
                      <tab.icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  ))}
                </div>
                
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {activePlaybookTab === "plan" && (
                      <motion.div
                        key="plan"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                          <Zap className="w-4 h-4 text-python-yellow" /> Guided Step-by-Step Path
                        </h3>
                        <div className="grid gap-4">
                          {playbook.practicePath.map((step, idx) => (
                            <div key={idx} className="flex gap-4 group">
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full border-2 border-primary/30 bg-primary/10 flex items-center justify-center text-xs font-bold text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                  {idx + 1}
                                </div>
                                {idx < playbook.practicePath.length - 1 && <div className="w-0.5 h-full bg-border my-1" />}
                              </div>
                              <div className="pb-4">
                                <p className="text-sm text-muted-foreground leading-relaxed pt-1">{step}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
                          <h4 className="text-xs font-bold text-primary uppercase mb-2">Dry Run Checklist</h4>
                          <ul className="space-y-2">
                            {playbook.dryRunSteps.map((s, i) => (
                              <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-primary" /> {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}

                    {activePlaybookTab === "strategy" && (
                      <motion.div
                        key="strategy"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid gap-6 sm:grid-cols-2"
                      >
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold text-foreground uppercase flex items-center gap-2">
                            <Brain className="w-4 h-4 text-streak-green" /> Complexity Tradeoffs
                          </h4>
                          <ul className="space-y-3">
                            {playbook.complexityNotes.map((note, i) => (
                              <li key={i} className="flex gap-3 text-sm text-muted-foreground bg-surface-1/50 p-3 rounded-lg border border-border">
                                <CheckCircle2 className="w-4 h-4 text-streak-green shrink-0 mt-0.5" />
                                {note}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold text-foreground uppercase flex items-center gap-2">
                            <Target className="w-4 h-4 text-primary" /> Interview Follow-ups
                          </h4>
                          <div className="space-y-2">
                            {playbook.interviewVariants.map((v, i) => (
                              <div key={i} className="text-sm text-muted-foreground p-3 rounded-lg border border-border bg-background flex items-center justify-between group hover:border-primary/50 transition-colors">
                                <span>{v}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activePlaybookTab === "pitfalls" && (
                      <motion.div
                        key="pitfalls"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid gap-6 sm:grid-cols-2"
                      >
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold text-python-yellow uppercase flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" /> Common Pitfalls
                          </h4>
                          <div className="grid gap-3">
                            {playbook.pitfalls.map((p, i) => (
                              <div key={i} className="text-sm text-muted-foreground p-4 rounded-xl border border-python-yellow/20 bg-python-yellow/5">
                                • {p}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold text-reward-gold uppercase flex items-center gap-2">
                            <HelpCircle className="w-4 h-4" /> Edge Case Checklist
                          </h4>
                          <div className="grid grid-cols-1 gap-2">
                            {playbook.edgeCases.map((e, i) => (
                              <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-surface-1">
                                <div className="w-2 h-2 rounded-full bg-reward-gold" />
                                <span className="text-sm text-muted-foreground">{e}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Code Example */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={6} className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Code className="w-4 h-4 text-primary" /> 💻 Code Example
                </h2>
                <Button asChild size="sm" variant="outline" className="h-7 text-xs gap-1">
                  <Link to={`/compiler?code=${encodeURIComponent(topic.codeExample)}`}>
                    ▶ Try in Editor
                  </Link>
                </Button>
              </div>
              <div className="code-block">
                <pre className="p-4 text-xs sm:text-sm font-mono text-foreground overflow-x-auto leading-relaxed">
                  {topic.codeExample}
                </pre>
              </div>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={6} className="mb-6 rounded-xl border border-border bg-card p-4 sm:p-5">
              <h3 className="text-base font-semibold text-foreground mb-2">Problem Visual Lab</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Visualize DSA problems across multiple structures. Pick a mode, load a problem, and inspect the shape of data.
              </p>

              <div className="mb-4 grid gap-2 sm:grid-cols-3">
                {(["array", "string", "sliding-window", "linked-list", "tree", "graph"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setActiveVisualization(mode)}
                    className={`rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                      activeVisualization === mode
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {mode.replace("-", " ")}
                  </button>
                ))}
              </div>

              <div className="rounded-lg border border-border bg-surface-1 p-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  {activeProblem ? `Input from: ${activeProblem.title}` : "Custom Input"}
                </div>
                <input
                  value={visualInput}
                  onChange={(e) => setVisualInput(e.target.value)}
                  placeholder={activeVisualization === "graph" ? "A-B,B-C,C-D" : "1,2,3,4,5"}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary/50"
                />
              </div>

              {activeVisualization === "sliding-window" && (
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <label className="text-xs text-muted-foreground">
                    Window Start
                    <input
                      type="number"
                      min={0}
                      value={windowStart}
                      onChange={(e) => setWindowStart(Math.max(0, Number(e.target.value) || 0))}
                      className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground outline-none focus:border-primary/50"
                    />
                  </label>
                  <label className="text-xs text-muted-foreground">
                    Window Size
                    <input
                      type="number"
                      min={1}
                      value={windowSize}
                      onChange={(e) => setWindowSize(Math.max(1, Number(e.target.value) || 1))}
                      className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground outline-none focus:border-primary/50"
                    />
                  </label>
                </div>
              )}

              {activeVisualization === "linked-list" && (
                <div className="mt-3 rounded-lg border border-border bg-surface-1 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Code Input</div>
                  <textarea
                    value={linkedListCodeInput}
                    onChange={(e) => setLinkedListCodeInput(e.target.value)}
                    className="h-24 w-full rounded-md border border-border bg-background px-3 py-2 text-xs font-mono text-foreground outline-none focus:border-primary/50"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-3 w-full"
                    onClick={() => {
                      const values = parseNodesFromCode(linkedListCodeInput);
                      if (values.length > 0) {
                        setLinkedListNodes(values);
                        setVisualInput(values.join(","));
                      }
                    }}
                  >
                    Parse Nodes From Code
                  </Button>
                </div>
              )}

              <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background/50 p-6 min-h-[250px] flex items-center justify-center">
                {activeVisualization === "array" && (
                  <div className="flex items-end gap-3 h-40">
                    {arrayValues.map((value, idx) => (
                      <motion.div
                        key={`${value}-${idx}`}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex flex-col items-center group"
                      >
                        <motion.div
                          className="w-12 rounded-t-lg bg-gradient-to-t from-primary/80 to-primary text-center text-[10px] text-white flex items-start justify-center pt-1 glow-primary"
                          style={{ height: `${Math.max(30, Math.min(160, value * 10))}px` }}
                        >
                          {value}
                        </motion.div>
                        <div className="mt-2 text-xs font-medium text-foreground">{value}</div>
                        <div className="text-[10px] text-muted-foreground font-mono">i={idx}</div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeVisualization === "string" && (
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {stringValues.split("").map((ch, idx) => (
                      <motion.div
                        key={`${ch}-${idx}`}
                        layout
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-12 h-16 rounded-xl border border-primary/30 bg-primary/10 flex flex-col items-center justify-center shadow-lg"
                      >
                        <div className="text-xl font-bold text-foreground">{ch}</div>
                        <div className="text-[10px] text-muted-foreground font-mono">{idx}</div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeVisualization === "sliding-window" && (
                  <div className="flex items-center justify-center gap-2 relative p-4">
                    {arrayValues.map((value, idx) => {
                      const inWindow = idx >= windowStart && idx < windowStart + windowSize;
                      return (
                        <motion.div
                          key={`${value}-${idx}`}
                          layout
                          className={`relative w-14 h-20 rounded-xl border flex flex-col items-center justify-center transition-all duration-500 ${
                            inWindow 
                              ? "border-python-yellow bg-python-yellow/20 shadow-md scale-110 z-10" 
                              : "border-border bg-surface-1 opacity-50"
                          }`}
                        >
                          <div className="text-lg font-bold text-foreground">{value}</div>
                          <div className="text-[10px] text-muted-foreground font-mono">{idx}</div>
                          {idx === windowStart && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-python-yellow uppercase tracking-tighter">Start</div>
                          )}
                          {idx === windowStart + windowSize - 1 && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-python-yellow uppercase tracking-tighter">End</div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {activeVisualization === "linked-list" && (
                  <div className="flex flex-wrap items-center justify-center gap-y-8 gap-x-0 py-8">
                    {(linkedListNodes.length ? linkedListNodes : parseNumberList(visualInput)).map((value, index, arr) => (
                      <motion.div key={`${value}-${index}`} layout className="flex items-center">
                        <motion.div 
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="w-20 h-24 rounded-2xl border-2 border-primary/30 bg-card flex flex-col items-center justify-center shadow-md relative"
                        >
                          <div className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Data</div>
                          <div className="text-xl font-black text-foreground">{value}</div>
                          <div className="mt-2 w-full border-t border-border flex items-center justify-center h-6">
                            <div className="w-2 h-2 rounded-full bg-primary/60" />
                          </div>
                        </motion.div>
                        {index < arr.length - 1 && (
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: 40 }}
                            className="h-0.5 bg-gradient-to-r from-primary to-primary/20 relative"
                          >
                            <ArrowRight className="absolute -right-2 -top-2 w-4 h-4 text-primary" />
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                    <div className="ml-4 flex items-center">
                      <div className="w-16 h-10 rounded-lg border border-dashed border-border flex items-center justify-center text-[10px] font-mono text-muted-foreground">
                        NULL
                      </div>
                    </div>
                  </div>
                )}

                {activeVisualization === "tree" && (
                  <div className="flex flex-col items-center gap-8 py-4">
                    {treeLevels.map((level, levelIdx) => (
                      <motion.div 
                        key={levelIdx} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: levelIdx * 0.2 }}
                        className="flex justify-center gap-8 md:gap-16 relative"
                      >
                        {level.map((value, idx) => (
                          <div key={`${value}-${idx}`} className="relative">
                            <motion.div 
                              whileHover={{ scale: 1.1 }}
                              className="w-14 h-14 rounded-full border-2 border-streak-green/40 bg-streak-green/10 flex items-center justify-center text-lg font-bold text-foreground shadow-md shadow-lg z-10 relative"
                            >
                              {value}
                            </motion.div>
                            {/* Connector lines could be added here with SVG if we want to be super premium */}
                          </div>
                        ))}
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeVisualization === "graph" && (
                  <div className="flex flex-wrap items-center justify-center gap-6 py-8">
                    {graphEdges.map((edge, idx) => {
                      const [from, to] = edge.split("-");
                      return (
                        <motion.div
                          key={edge}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-2 group"
                        >
                          <div className="w-12 h-12 rounded-full border border-border bg-surface-1 flex items-center justify-center text-sm font-bold text-foreground group-hover:border-primary transition-colors">
                            {from}
                          </div>
                          <div className="h-0.5 w-12 bg-border relative">
                            <div className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                          </div>
                          <div className="w-12 h-12 rounded-full border border-border bg-surface-1 flex items-center justify-center text-sm font-bold text-foreground group-hover:border-primary transition-colors">
                            {to}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Real World */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={7} className="bg-surface-1 border border-border rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-reward-gold" /> 🌍 Real-World Applications
              </h3>
              <p className="text-sm text-muted-foreground">{topic.realWorldUse}</p>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={7} className="bg-surface-1 border border-border rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-red-500" /> Problem Videos (YouTube)
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                These are matched from your PyMaster problem set. Open the problem, watch explanations, or load problem input into the visual lab.
              </p>
              <div className="space-y-2">
                {relatedProblems.length > 0 ? relatedProblems.map((problem: Problem) => (
                  <div key={problem.id} className="flex flex-col gap-2 rounded-lg border border-border bg-background p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-medium text-foreground">{problem.title}</div>
                        <div className="text-xs text-muted-foreground">{problem.difficulty}</div>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8"
                        onClick={() => {
                          setActiveProblem(problem);
                          setActiveVisualization(inferVisualizationType(topic.id, problem));
                          setVisualInput(extractSeedInput(problem));
                          const seeded = parseNodesFromCode(problem.starterCode || "");
                          if (seeded.length) setLinkedListNodes(seeded);
                        }}
                      >
                        Visualize
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button asChild variant="outline" size="sm" className="h-8">
                        <Link to={`/problems/${problem.id}`}>Open Problem</Link>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="h-8 gap-1">
                        <a href={buildYouTubeSearchUrl(problem.title)} target="_blank" rel="noreferrer">
                          YouTube <ExternalLink className="w-3 h-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                )) : (
                  <div className="text-sm text-muted-foreground">
                    No direct mapping found yet. Open practice problems and search by this topic title on YouTube.
                  </div>
                )}
              </div>
            </motion.div>

            {/* Practice link */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="gap-2">
                <Link to="/problems">
                  🏋️ Practice Problems <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2">
                <Link to={`/compiler?code=${encodeURIComponent(topic.codeExample)}`}>
                  💻 Code Playground
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center md:justify-center h-full text-center px-4 sm:px-6 py-6 overflow-y-auto">
            <Brain className="w-12 h-12 text-muted-foreground/30 mb-4 hidden md:block" />
            <h2 id="tour-dsa-header" className="text-xl font-semibold text-foreground mb-1">🧠 DSA Mastery</h2>
            <p className="text-muted-foreground mb-6 max-w-md text-sm">
              Learn Data Structures & Algorithms with pattern detection and real-world examples.
            </p>


            {/* Desktop placeholder */}
            <p className="text-muted-foreground hidden md:block">Choose a topic from the sidebar to start learning</p>
            <div className="hidden md:block mt-6 w-full max-w-2xl text-left">
              <div className="grid gap-4 md:grid-cols-3">
                <section className="rounded-xl border border-border bg-card/70 p-4">
                  <h3 className="text-sm font-semibold text-foreground">Beginner</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-6">
                    Best for school students, college beginners, and anyone new to coding interviews.
                  </p>
                  <ul className="mt-3 space-y-1 text-xs text-muted-foreground leading-6 list-disc pl-4">
                    <li>Understand arrays, strings, stacks, queues, and hash maps</li>
                    <li>Explain problems in simple words before writing code</li>
                    <li>Learn Big-O like “how time grows”</li>
                  </ul>
                </section>
                <section className="rounded-xl border border-border bg-card/70 p-4">
                  <h3 className="text-sm font-semibold text-foreground">Intermediate</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-6">
                    Ideal when you can code, but you want a repeatable method to solve new problems.
                  </p>
                  <ul className="mt-3 space-y-1 text-xs text-muted-foreground leading-6 list-disc pl-4">
                    <li>Master patterns: two pointers, sliding window, binary search</li>
                    <li>Pick the right structure quickly (set vs dict vs heap)</li>
                    <li>Write cleaner, testable solutions</li>
                  </ul>
                </section>
                <section className="rounded-xl border border-border bg-card/70 p-4">
                  <h3 className="text-sm font-semibold text-foreground">Advanced</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-6">
                    For tougher interviews and deeper reasoning: dynamic programming and graphs.
                  </p>
                  <ul className="mt-3 space-y-1 text-xs text-muted-foreground leading-6 list-disc pl-4">
                    <li>Break DP into states, transitions, and base cases</li>
                    <li>Use BFS/DFS correctly and explain why it works</li>
                    <li>Discuss tradeoffs confidently (time vs memory)</li>
                  </ul>
                </section>
              </div>
              <p className="mt-4 text-xs text-muted-foreground leading-6">
                Expectation: you don’t need to be “good at math” to learn DSA. You just need patience, practice, and a step-by-step plan. Start
                with one beginner topic, write the code, then practice 2–3 problems from <Link to="/problems" className="text-primary hover:underline">Problems</Link>.
              </p>
            </div>

            {/* Mobile topic list */}
            <div id="tour-dsa-categories" className="md:hidden w-full max-w-lg space-y-5 text-left">
              {categories.map((cat, catIdx) => (
                <div key={cat.id}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5 px-1">{tCategory(cat.title, language)}</h3>
                  <p className="text-[11px] text-muted-foreground mb-2 px-1">{tCategory(cat.desc, language)}</p>
                  <div className="space-y-1.5">
                    {dsaTopics.filter(t => t.category === cat.id).map((t, tIdx) => (
                      // Localize per-topic title in the list.
                      <button
                        key={t.id}
                        onClick={() => handleTopicSelect(t.id)}
                        id={catIdx === 0 && tIdx === 0 ? "tour-dsa-topic" : undefined}
                        className="w-full flex items-center gap-3 px-3 py-2.5 bg-card border border-border rounded-lg hover:border-primary/40 active:bg-secondary/50 transition-colors"
                      >
                        <span className="text-lg shrink-0">{t.emoji}</span>
                        <div className="flex-1 text-left min-w-0">
                          <div className="text-sm font-medium text-foreground truncate">
                            {getLocalizedDSATopic(t, language)?.title ?? t.title}
                          </div>
                        </div>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full border shrink-0 ${difficultyColor[t.difficulty]}`}>
                          {t.difficulty}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
