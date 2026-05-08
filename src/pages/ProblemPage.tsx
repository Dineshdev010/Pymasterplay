// ============================================================
// PROBLEM PAGE — src/pages/ProblemPage.tsx
// Individual coding problem solver with Monaco editor,
// test case runner, solution reveal, and reward system.
// Resets editor state when navigating between problems.
// ============================================================
import React, { useState, useEffect, Suspense, useRef } from "react";
import { useParams, Link } from "react-router-dom";
const Editor = React.lazy(() => import("@monaco-editor/react"));
import confetti from "canvas-confetti";
import { problems, getDifficultyColor, getDifficultyBg, getRecommendedSubjects, type Problem } from "@/data/problems";
import { allSqlProblems, type SQLProblem } from "@/data/sqlProblems";
import { useProgress } from "@/contexts/ProgressContext";
import { getRewardForDifficulty } from "@/lib/progress";
import { cancelActivePythonExecution, executePython, getPythonExecutionTimeoutMs } from "@/lib/piston";
import { executeSql } from "@/lib/sqlRunner";
import { SqlTableView } from "@/components/SqlTableView";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Play, Send, Eye, EyeOff, ArrowLeft, CheckCircle2, XCircle, Wallet, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Square, Building2, BookOpenCheck, Clock3, Lock, Database, Sparkles, Zap } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { CompanyBadge } from "@/components/CompanyBadge";
import { useLanguage } from "@/contexts/LanguageContext";


function normalizeOutput(output: string) {
  if (!output) return "";
  return output
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map(line => line.trimEnd())
    .join("\n")
    .trim();
}

function getCallableName(code: string): string | null {
  const match = code.match(/def\s+([A-Za-z_]\w*)\s*\(/);
  return match?.[1] || null;
}

function buildTestHarness(code: string, callableName: string, input: string) {
  const hasInput = input.trim().length > 0;
  return `${code}

print("---PYMASTER-RESULT---")
__payload = (${hasInput ? input : ""})
if ${hasInput ? "isinstance(__payload, tuple)" : "False"}:
    __args = list(__payload)
elif ${hasInput ? "True" : "False"}:
    __args = [__payload]
else:
    __args = []

__result = ${callableName}(*__args)
if __result is None and __args:
    print(repr(__args[0]))
else:
    print(repr(__result))
`;
}

function getProblemTimerSeconds(problem?: Problem) {
  if (!problem) return 10 * 60;

  const title = (problem.title || "").toLowerCase();
  const description = (problem.description || "").toLowerCase();
  const starterLines = (problem.starterCode || "").split("\n").map((line) => line.trim()).filter(Boolean).length;
  const testCount = (problem.testCases || []).length;

  // Ultra-basic warmups should feel quick.
  if (
    title.includes("hello world") ||
    ((title.includes("print") || description.includes("print")) &&
      problem.difficulty === "basic" &&
      testCount <= 1 &&
      starterLines <= 4)
  ) {
    return 60;
  }

  const baseByDifficulty: Record<Problem["difficulty"], number> = {
    basic: 6 * 60,
    junior: 12 * 60,
    intermediate: 20 * 60,
    advanced: 30 * 60,
    expert: 40 * 60,
  };

  let seconds = baseByDifficulty[problem.difficulty];

  // Lightweight heuristic so each problem gets a more realistic timer.
  if (testCount >= 3) seconds += 2 * 60;
  if (testCount >= 5) seconds += 2 * 60;
  if (starterLines >= 12) seconds += 2 * 60;
  if (starterLines >= 20) seconds += 2 * 60;
  if (description.length < 140 && testCount <= 1 && starterLines <= 6) seconds -= 2 * 60;
  if (/(dp|dynamic programming|graph|tree|backtracking|heap|trie|segment|union find)/i.test((problem.title || "") + " " + (problem.description || ""))) {
    seconds += 3 * 60;
  }

  // Keep timer within a practical range.
  return Math.max(60, Math.min(seconds, 45 * 60));
}

function formatCountdown(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function ProblemPage() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { progress, solveProblem, addWallet, unlockSolution } = useProgress();
  const isMobile = useIsMobile();

  const isSql = id?.startsWith("sql-");
  const currentProblems = isSql ? allSqlProblems : problems;
  const problem = currentProblems.find(p => p.id === id) as any;

  const [code, setCode] = useState(problem?.starterCode || "");
  const [output, setOutput] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const solutionUnlocked = progress.unlockedSolutions.includes(problem?.id);
  const [testResults, setTestResults] = useState<{ passed: boolean; input: string; expected: string }[] | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showDescription, setShowDescription] = useState(!isMobile);
  const [isRunning, setIsRunning] = useState(false);
  const [problemTimeLeft, setProblemTimeLeft] = useState(() => getProblemTimerSeconds(problem));
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());
  const [sqlResult, setSqlResult] = useState<any>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"description" | "editor" | "output">("description");
  const [executionHistory, setExecutionHistory] = useState<number[]>([]);
  const timeoutHandledRef = useRef(false);

  useEffect(() => {
    if (problem) {
      setProblemTimeLeft(getProblemTimerSeconds(problem));
    }
  }, [id, problem]);

  const solved = progress.solvedProblems.includes(problem.id);
  const reward = getRewardForDifficulty(problem.difficulty);
  const problemIndex = currentProblems.findIndex(p => p.id === id);
  const prevProblem = problemIndex > 0 ? currentProblems[problemIndex - 1] : null;
  const nextProblem = problemIndex < currentProblems.length - 1 ? currentProblems[problemIndex + 1] : null;
  const serial = problemIndex + 1;
  const recommendedSubjects = getRecommendedSubjects(problem);

  if (!problem) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100dvh-3.5rem)] text-center px-4">
        <h2 className="text-xl font-bold mb-2">Problem Not Found</h2>
        <p className="text-muted-foreground mb-4">The problem you're looking for doesn't exist or has been moved.</p>
        <Button asChild>
          <Link to="/problems">Back to Problems</Link>
        </Button>
      </div>
    );
  }

  const isLocked = lockedUntil !== null && now < lockedUntil;
  const lockTimeRemaining = isLocked ? Math.ceil((lockedUntil - now) / 1000) : 0;

  // ---------- Live Lock Timer ----------
  useEffect(() => {
    if (!lockedUntil) return;
    const checkLock = () => {
      const currentNow = Date.now();
      setNow(currentNow);
      if (currentNow >= lockedUntil) {
        setLockedUntil(null);
        try {
          const locks = JSON.parse(localStorage.getItem("pymaster_problem_locks") || "{}");
          if (problem) {
            delete locks[problem.id];
            localStorage.setItem("pymaster_problem_locks", JSON.stringify(locks));
          }
        } catch {}
      }
    };
    checkLock();
    const timer = setInterval(checkLock, 1000);
    return () => clearInterval(timer);
  }, [lockedUntil, problem]);

  // ---------- Reset all state when problem changes ----------
  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode || "");
      setOutput("");
      setShowSolution(false);
      setTestResults(null);
      setSubmitted(false);
      setIsRunning(false);
      setSqlResult(null);
      setExecutionTime(null);
      setExecutionHistory([]);
      setProblemTimeLeft(getProblemTimerSeconds(problem));
      timeoutHandledRef.current = false;
      try {
        const locks = JSON.parse(localStorage.getItem("pymaster_problem_locks") || "{}");
        setLockedUntil(locks[problem.id] || null);
      } catch {
        setLockedUntil(null);
      }
    }
  }, [id, problem]);

  useEffect(() => {
    setShowDescription(!isMobile);
  }, [id, isMobile]);

  useEffect(() => {
    if (problemTimeLeft <= 0 || solved) return;
    const timer = window.setInterval(() => {
      setProblemTimeLeft((current) => Math.max(0, current - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [id, solved, problemTimeLeft <= 0]); // Only re-run if id or solved changes, or if we hit zero

  useEffect(() => {
    if (!problem || solved) return;
    if (problemTimeLeft > 0) return;
    if (timeoutHandledRef.current) return;
    timeoutHandledRef.current = true;

    cancelActivePythonExecution();
    setCode(problem.starterCode || "");
    setOutput("");
    setShowSolution(false);
    setTestResults(null);
    setSubmitted(false);
    setIsRunning(false);
    setProblemTimeLeft(getProblemTimerSeconds(problem));

    const lockTime = Date.now() + 60 * 60 * 1000;
    setLockedUntil(lockTime);
    setNow(Date.now());
    try {
      const locks = JSON.parse(localStorage.getItem("pymaster_problem_locks") || "{}");
      locks[problem.id] = lockTime;
      localStorage.setItem("pymaster_problem_locks", JSON.stringify(locks));
    } catch {}

    toast({
      title: "Time is up!",
      description: "You have been locked out of this problem for 1 hour due to timeout.",
      variant: "destructive",
    });
  }, [problem, problemTimeLeft]);

  if (!problem) {
    return <div className="p-8 text-center text-red-500">Problem not found.</div>;
  }

  const canonical = `https://pymaster.pro/problems/${problem.id}`;
  const text = {
    english: { problems: "Problems", prev: "Prev", next: "Next", problemDescription: "Problem Description", examples: "📝 Examples", constraints: "⚠️ Constraints", reward: "reward", companiesAsk: "Companies that ask this question", learnFirst: "Learn these subjects first", learnFirstDesc: "These topics will make this problem much easier to understand and solve.", hideSolution: "Hide Solution", revealSolution: "👀 Reveal Solution ($70)", viewDescription: "View Problem Description", output: "📺 Output", stop: "Stop", run: "▶ Run", submit: "🚀 Submit", loadingCompiler: "Loading Compiler Engine...", loadingCompilerSmall: "Loading compiler engine...", runningInfoPrefix: "Runs in an isolated browser worker with a", runningInfoSuffix: "s safety timeout.", allPassed: "🎉 All tests passed!", streakUpdated: "🔥 Streak updated" },
    tamil: { problems: "பிரச்சினைகள்", prev: "முந்தையது", next: "அடுத்தது", problemDescription: "பிரச்சினை விளக்கம்", examples: "📝 உதாரணங்கள்", constraints: "⚠️ வரம்புகள்", reward: "பரிசு", companiesAsk: "இந்த கேள்வியை கேட்கும் நிறுவனங்கள்", learnFirst: "முதலில் இவற்றை கற்பீர்", learnFirstDesc: "இந்த தலைப்புகள் இந்த பிரச்சினையை எளிதாக புரிந்து தீர்க்க உதவும்.", hideSolution: "தீர்வை மறை", revealSolution: "👀 தீர்வை காண் ($70)", viewDescription: "பிரச்சினை விளக்கத்தை காண்க", output: "📺 வெளியீடு", stop: "நிறுத்து", run: "▶ இயக்கு", submit: "🚀 சமர்ப்பி", loadingCompiler: "கம்பைலர் ஏற்றப்படுகிறது...", loadingCompilerSmall: "கம்பைலர் ஏற்றப்படுகிறது...", runningInfoPrefix: "இந்த குறியீடு தனிமைப்படுத்தப்பட்ட worker-இல் இயங்குகிறது,", runningInfoSuffix: "விநாடி பாதுகாப்பு நேரவரம்புடன்.", allPassed: "🎉 அனைத்து சோதனைகளும் வெற்றி!", streakUpdated: "🔥 தொடர் புதுப்பிக்கப்பட்டது" },
    kannada: { problems: "ಪ್ರಶ್ನೆಗಳು", prev: "ಹಿಂದೆ", next: "ಮುಂದೆ", problemDescription: "ಪ್ರಶ್ನೆಯ ವಿವರಣೆ", examples: "📝 ಉದಾಹರಣೆಗಳು", constraints: "⚠️ ನಿಯಮಗಳು", reward: "ಬಹುಮಾನ", companiesAsk: "ಈ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳುವ ಕಂಪನಿಗಳು", learnFirst: "ಮೊದಲು ಈ ವಿಷಯಗಳನ್ನು ಕಲಿಯಿರಿ", learnFirstDesc: "ಈ ವಿಷಯಗಳು ಈ ಪ್ರಶ್ನೆಯನ್ನು ಸುಲಭವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ.", hideSolution: "ಉತ್ತರ ಮರೆಮಾಡು", revealSolution: "👀 ಉತ್ತರ ತೋರಿಸಿ ($70)", viewDescription: "ಪ್ರಶ್ನೆ ವಿವರಣೆ ನೋಡಿ", output: "📺 ಔಟ್‌ಪುಟ್", stop: "ನಿಲ್ಲಿಸಿ", run: "▶ ಚಾಲನೆ", submit: "🚀 ಸಲ್ಲಿಸಿ", loadingCompiler: "ಕಂಪೈಲರ್ ಲೋಡ್ ಆಗುತ್ತಿದೆ...", loadingCompilerSmall: "ಕಂಪೈಲರ್ ಲೋಡ್ ಆಗುತ್ತಿದೆ...", runningInfoPrefix: "ಈ ಕೋಡ್ ಪ್ರತ್ಯೇಕ worker ನಲ್ಲಿ ನಡೆಯುತ್ತದೆ,", runningInfoSuffix: "ಸೆಕೆಂಡ್ ಭದ್ರತಾ ಮಿತಿಯೊಂದಿಗೆ.", allPassed: "🎉 ಎಲ್ಲಾ ಪರೀಕ್ಷೆಗಳು ಉತ್ತೀರ್ಣ!", streakUpdated: "🔥 ಸ್ಟ್ರೀಕ್ ನವೀಕರಿಸಲಾಗಿದೆ" },
    telugu: { problems: "సమస్యలు", prev: "మునుపటి", next: "తదుపరి", problemDescription: "సమస్య వివరణ", examples: "📝 ఉదాహరణలు", constraints: "⚠️ పరిమితులు", reward: "బహుమతి", companiesAsk: "ఈ ప్రశ్న అడిగే కంపెనీలు", learnFirst: "ముందు ఇవి నేర్చుకోండి", learnFirstDesc: "ఈ టాపిక్స్ ఈ సమస్యను సులభంగా అర్థం చేసుకుని పరిష్కరించేందుకు సహాయపడతాయి.", hideSolution: "పరిష్కారాన్ని దాచు", revealSolution: "👀 పరిష్కారం చూపు ($70)", viewDescription: "సమస్య వివరణ చూడండి", output: "📺 అవుట్‌పుట్", stop: "ఆపు", run: "▶ రన్", submit: "🚀 సమర్పించు", loadingCompiler: "కంపైలర్ లోడ్ అవుతోంది...", loadingCompilerSmall: "కంపైలర్ లోడ్ అవుతోంది...", runningInfoPrefix: "ఇది వేరు చేసిన worker లో నడుస్తుంది,", runningInfoSuffix: "సెకన్ల భద్రతా టైమ్ అవుట్‌తో.", allPassed: "🎉 అన్ని పరీక్షలు పాస్ అయ్యాయి!", streakUpdated: "🔥 స్ట్రీక్ నవీకరించబడింది" },
    hindi: { problems: "समस्याएं", prev: "पिछला", next: "अगला", problemDescription: "समस्या विवरण", examples: "📝 उदाहरण", constraints: "⚠️ सीमाएं", reward: "इनाम", companiesAsk: "यह प्रश्न पूछने वाली कंपनियां", learnFirst: "पहले ये विषय सीखें", learnFirstDesc: "ये विषय इस समस्या को आसानी से समझने और हल करने में मदद करेंगे।", hideSolution: "समाधान छिपाएं", revealSolution: "👀 समाधान दिखाएं ($70)", viewDescription: "समस्या विवरण देखें", output: "📺 आउटपुट", stop: "रोकें", run: "▶ चलाएं", submit: "🚀 सबमिट", loadingCompiler: "कंपाइलर लोड हो रहा है...", loadingCompilerSmall: "कंपाइलर लोड हो रहा है...", runningInfoPrefix: "यह कोड अलग worker में चलता है,", runningInfoSuffix: "सेकंड सुरक्षा टाइमआउट के साथ।", allPassed: "🎉 सभी टेस्ट पास!", streakUpdated: "🔥 स्ट्रीक अपडेट हुई" },
  } as const;
  const t = text[language];

  const handleRun = async () => {
    setIsRunning(true);
    setSqlResult(null);
    setOutput("⏳ Running...");
    setTestResults(null);
    setExecutionTime(null);

    if (isSql) {
        try {
            const fullSql = `${problem.schema}\n${problem.initialData}\n${code}`;
            const result = await executeSql(fullSql);
            setSqlResult(result.output); // Pass raw CSV to table
            setExecutionTime(result.executionTime || null);
            setOutput("");
        } catch (err: any) {
            setOutput(`❌ SQL Error:\n${err.message}`);
        }
        setIsRunning(false);
        return;
    }

    const result = await executePython(code);

    if (result.error && !result.output) {
      setOutput(`❌ Error:\n${result.error}`);
    } else if (result.output) {
      setOutput(`📺 Output:\n${result.output}`);
    } else {
      setOutput("(No output — add print() statements to see results)");
    }

    if (result.executionTime !== undefined) {
      setExecutionHistory(prev => [...prev.slice(-9), result.executionTime!]);
      if (isMobile) setActiveTab("output");
    }
    setExecutionTime(result.executionTime || null);
    setIsRunning(false);
  };

  const handleSubmit = async () => {
    setIsRunning(true);
    setSqlResult(null);
    setOutput("⏳ Running tests...");

    if (isSql) {
        try {
            const fullSqlUser = `${problem.schema}\n${problem.initialData}\n${code}`;
            const fullSqlExpected = `${problem.schema}\n${problem.initialData}\n${problem.expectedQuery}`;
            
            const [resultUser, resultExpected] = await Promise.all([
                executeSql(fullSqlUser),
                executeSql(fullSqlExpected)
            ]);

            if (resultUser.error) {
                setOutput(`❌ SQL Error:\n${resultUser.error}`);
                const errTime = resultUser.executionTime || null;
                if (errTime) setExecutionHistory(prev => [...prev.slice(-9), errTime]);
                setExecutionTime(errTime);
                setIsRunning(false);
                return;
            }

            const parsedUser = resultUser.parsed;
            const parsedExpected = resultExpected.parsed;
            setSqlResult(resultUser.output); // Pass raw CSV to table
            const sqlTime = resultUser.executionTime || null;
            if (sqlTime) setExecutionHistory(prev => [...prev.slice(-9), sqlTime]);
            setExecutionTime(sqlTime);

            if (parsedUser && parsedExpected) {
                const isCorrect = JSON.stringify(parsedUser.columns.sort()) === JSON.stringify(parsedExpected.columns.sort()) && 
                                 JSON.stringify(parsedUser.values) === JSON.stringify(parsedExpected.values);
                
                if (isCorrect) {
                    setOutput("🎉 Query Correct! All results match.");
                    if (!solved) {
                        solveProblem(problem.id, (problem as any).difficulty);
                        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
                    }
                } else {
                    setOutput(`❌ Query incorrect. Results do not match.\nExpected ${parsedExpected.values.length} rows, you returned ${parsedUser.values.length}.`);
                }
            } else {
                setOutput("❌ Could not parse results. Please ensure your query returns a valid table.");
            }
        } catch (err: any) {
            setOutput(`❌ SQL Error during validation:\n${err.message}`);
        }
        setIsRunning(false);
        return;
    }

    const callableName = getCallableName(code);
    const results: { passed: boolean; input: string; expected: string; executionTime?: number }[] = [];
    let combinedOutput = "";

    const method = problem.validationMethod || (callableName ? 'harness' : 'script');
    const isPatternProblem = problem.id.includes("star") || problem.id.includes("pattern") || problem.id.includes("square") || problem.id.includes("pyramid");
    const mode = problem.comparisonMode || (isPatternProblem ? 'exact' : 'fuzzy');

    if (method === 'harness' && callableName) {
      for (const testCase of problem.testCases) {
        const result = await executePython(buildTestHarness(code, callableName, testCase.input));
        
        const parts = result.output.split("---PYMASTER-RESULT---");
        const rawOutput = parts.length > 1 ? parts[parts.length - 1] : result.output;
        
        const actualOutput = normalizeOutput(rawOutput);
        const expectedOutput = normalizeOutput(testCase.expected);
        
        let passed = !result.error && (
          mode === 'exact' 
            ? actualOutput === expectedOutput 
            : actualOutput.replace(/\s+/g, " ") === expectedOutput.replace(/\s+/g, " ")
        );

        results.push({ passed, input: testCase.input, expected: testCase.expected, executionTime: result.executionTime });

        if (result.error && !result.output) {
          setOutput(`❌ Error:\n${result.error}`);
          setTestResults(results);
          setIsRunning(false);
          return;
        }

        combinedOutput += `Test ${results.length}: ${actualOutput || "(no output)"}\n`;
      }
    } else {
      const result = await executePython(code);
      const actualOutput = normalizeOutput(result.output);
      const expectedOutput = normalizeOutput(problem.testCases[0]?.expected || "");
      
      let passed = !result.error && (
        mode === 'exact' 
          ? actualOutput === expectedOutput 
          : actualOutput.replace(/\s+/g, " ") === expectedOutput.replace(/\s+/g, " ")
      );

      if (result.error && !result.output) {
        setOutput(`❌ Error:\n${result.error}`);
        setTestResults(null);
        setIsRunning(false);
        return;
      }

      results.push({
        passed,
        input: problem.testCases[0]?.input || "",
        expected: problem.testCases[0]?.expected || "",
        executionTime: result.executionTime,
      });
      combinedOutput = actualOutput || "(no output)";
    }
    
    const finalTime = results.length > 0 ? results[results.length-1].executionTime ?? null : null;
    if (finalTime !== null) {
      setExecutionHistory(prev => [...prev.slice(-9), finalTime]);
      if (isMobile) setActiveTab("output");
    }
    setExecutionTime(finalTime);

    setTestResults(results);
    const allPassed = results.every(r => r.passed);

    if (allPassed && !solved) {
      setSubmitted(true);
      solveProblem(problem.id, problem.difficulty);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#3b82f6", "#22c55e", "#eab308"],
      });
      setOutput(`🎉 All tests passed!\n\n📺 Output:\n${combinedOutput.trim()}\n\n💰 You earned $${reward}!\n🔥 Streak updated!`);
    } else if (allPassed && solved) {
      setOutput(`✅ All tests passed!\n\n📺 Output:\n${combinedOutput.trim()}\n\n(Already solved)`);
    } else {
      setOutput(`📺 Test output:\n${combinedOutput.trim() || "(no output)"}\n\n❌ Some tests failed. Check your solution.`);
    }

    setIsRunning(false);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": problem.title,
    "description": (problem as any).description,
    "educationalLevel": problem.difficulty,
    "learningResourceType": "Programming Challenge"
  };

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] md:h-[calc(100dvh-3.5rem)] flex-col overflow-hidden">
      <Helmet>
        <title>{problem.title} | PyMaster Problems</title>
        <meta name="description" content={`Solve ${problem.title}. ${((problem as any).description || "").substring(0, 100)}... Challenge yourself with our built-in compiler.`} />
        <meta property="og:title" content={`${problem.title} - Coding Challenge`} />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="h-auto min-h-[3rem] bg-surface-1 border-b border-border flex items-center justify-between px-3 sm:px-4 py-2 gap-4 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Button asChild variant="ghost" size="sm" className="h-7 text-xs gap-1 shrink-0">
            <Link to="/problems"><ArrowLeft className="w-3 h-3" /> <span className="hidden sm:inline">{t.problems}</span></Link>
          </Button>

          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="text-sm font-medium text-foreground truncate max-w-[120px] sm:max-w-none">{problem.title}</span>
            <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full border capitalize shrink-0 ${getDifficultyBg(problem.difficulty)} ${getDifficultyColor(problem.difficulty)}`}>
              {problem.difficulty}
            </span>
            
            {!solved ? (
              <span className={`inline-flex items-center gap-1 rounded-full border px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs shrink-0 ${
                problemTimeLeft <= 60 ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-border bg-surface-2 text-muted-foreground"
              }`}>
                <Clock3 className="w-3 h-3" />
                {formatCountdown(problemTimeLeft)}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full border border-streak-green/30 bg-streak-green/10 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs text-streak-green shrink-0 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                Completed
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center border border-border rounded-md bg-surface-2 overflow-hidden shrink-0">
          <Button
            asChild
            variant="ghost"
            size="sm"
            disabled={!prevProblem}
            className={`h-7 px-2 sm:px-3 rounded-none border-r border-border text-[10px] sm:text-xs gap-1.5 ${!prevProblem ? "opacity-50 pointer-events-none" : "hover:bg-surface-3 transition-colors"}`}
          >
            <Link to={prevProblem ? `/problems/${prevProblem.id}` : "#"}>
              <ChevronLeft className="w-3 h-3" />
              {t.prev}
            </Link>
          </Button>
          <div className="px-3 py-0.5 text-[10px] font-mono font-bold text-muted-foreground border-r border-border min-w-[2.5rem] text-center bg-surface-1/50">
            {serial}
          </div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            disabled={!nextProblem}
            className={`h-7 px-2 sm:px-3 rounded-none text-[10px] sm:text-xs gap-1.5 ${!nextProblem ? "opacity-50 pointer-events-none" : "hover:bg-surface-3 transition-colors"}`}
          >
            <Link to={nextProblem ? `/problems/${nextProblem.id}` : "#"}>
              {t.next}
              <ChevronRight className="w-3 h-3" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="md:hidden flex border-b border-border bg-surface-1/50 backdrop-blur-md sticky top-12 z-40">
        <button 
          onClick={() => setActiveTab("description")}
          className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "description" ? "text-primary border-b-2 border-primary bg-primary/5" : "text-muted-foreground"}`}
        >
          Description
        </button>
        <button 
          onClick={() => setActiveTab("editor")}
          className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "editor" ? "text-primary border-b-2 border-primary bg-primary/5" : "text-muted-foreground"}`}
        >
          Editor
        </button>
        <button 
          onClick={() => setActiveTab("output")}
          className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "output" ? "text-primary border-b-2 border-primary bg-primary/5" : "text-muted-foreground"}`}
        >
          Output {testResults && <span className="ml-1 text-[8px] bg-streak-green/20 text-streak-green px-1 rounded">Results</span>}
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row min-h-0 relative">
        <div className={`md:w-[42%] overflow-y-auto border-b md:border-b-0 md:border-r border-border shrink-0 ${isMobile && activeTab !== "description" ? "hidden" : "h-full"}`}>
          <div className="p-4 sm:p-6 lg:p-8">
            {executionHistory.length > 0 && (
              <div className="mb-6 p-3.5 rounded-xl bg-surface-1/40 border border-white/10 shadow-lg backdrop-blur-xl relative overflow-hidden group">
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-primary/60 flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-primary" />
                      Intel
                    </h4>
                    <div className="flex gap-1.5">
                      <span className="text-[9px] font-mono font-bold text-sky-400 bg-sky-400/10 px-1.5 py-0.5 rounded border border-sky-400/20">O({(problem as any).timeComplexity || "N"})</span>
                      <span className="text-[9px] font-mono font-bold text-sky-300 bg-sky-300/10 px-1.5 py-0.5 rounded border border-sky-300/20">O({(problem as any).spaceComplexity || "1"})</span>
                    </div>
                  </div>
                  <div className="text-[9px] font-black px-2 py-0.5 rounded border bg-primary/10 text-primary border-primary/20">
                    {executionHistory[executionHistory.length-1] < 100 ? "OPTIMAL" : "STABLE"}
                  </div>
                </div>
                
                {/* Luminous Blue Pulse Graph */}
                <div className="h-16 w-full relative group/graph flex items-end gap-1 px-1">
                  {executionHistory.map((time, i) => {
                    const dynamicMax = Math.max(...executionHistory, 100);
                    const height = Math.max(15, (time / dynamicMax) * 85);
                    const isLatest = i === executionHistory.length - 1;
                    
                    return (
                      <div key={i} className="flex-1 group/bar relative flex flex-col justify-end h-full">
                        {/* Luminous Glow */}
                        <div 
                          style={{ height: `${height + 5}%`, width: '140%', left: '-20%' }}
                          className={`absolute bottom-0 blur-[10px] transition-all duration-700 opacity-0 group-hover/bar:opacity-30 ${isLatest ? "opacity-20" : ""} bg-sky-400/40`}
                        />
                        
                        <div 
                          style={{ height: `${height}%` }}
                          className={`w-full rounded-t-[2px] transition-all duration-700 relative overflow-hidden ${
                            isLatest ? "opacity-100 ring-1 ring-white/30 animate-pulse shadow-[0_0_15px_rgba(56,189,248,0.4)]" : "opacity-30 hover:opacity-100"
                          } bg-gradient-to-t from-sky-600/40 via-sky-400/60 to-sky-300`}
                        >
                          {/* Shimmer Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/bar:animate-shimmer" />
                        </div>
                        
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-sky-950 border border-sky-400/30 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold text-sky-100 opacity-0 group-hover/bar:opacity-100 transition-all pointer-events-none z-30 shadow-2xl">
                          {time}ms
                        </div>
                      </div>
                    );
                  })}

                  {executionHistory.length > 1 && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path
                        d={`M ${executionHistory.map((time, i) => {
                          const dynamicMax = Math.max(...executionHistory, 100);
                          const x = (i / (executionHistory.length - 1)) * 100;
                          const y = 100 - (Math.max(15, (time / dynamicMax) * 85));
                          return `${x},${y}`;
                        }).join(' L ')}`}
                        fill="none"
                        stroke="rgba(125,211,252,0.4)"
                        strokeWidth="0.6"
                        strokeDasharray="2,2"
                        className="animate-dash"
                      />
                    </svg>
                  )}
                </div>

                <div className="flex justify-between items-center mt-4 pt-2 border-t border-white/5">
                  <div className="flex gap-3 text-[8px] font-mono">
                    <div className="flex gap-1"><span className="text-sky-400/60 uppercase">Best</span><span className="text-sky-300 font-bold">{Math.min(...executionHistory)}ms</span></div>
                    <div className="flex gap-1"><span className="text-sky-400/60 uppercase">Avg</span><span className="text-sky-300 font-bold">{Math.round(executionHistory.reduce((a, b) => a + b, 0) / executionHistory.length)}ms</span></div>
                  </div>
                  <button onClick={() => setExecutionHistory([])} className="text-[8px] font-bold text-sky-400/30 hover:text-sky-400 uppercase tracking-widest transition-colors">Clear</button>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-muted-foreground font-mono">#{serial}</span>
              <h2 className="text-lg sm:text-xl font-bold text-foreground">{problem.title}</h2>
            </div>

            <div className="space-y-3 mb-6">
              {((problem as any).description || "").split("\n").map((line: string, i: number) => (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                  {line.startsWith("- ") ? <span className="ml-4 list-item list-disc">{line.slice(2)}</span> : line}
                </p>
              ))}
            </div>

            {((problem as any).examples) && (
              <>
                <h3 className="text-sm font-semibold text-foreground mb-3">{t.examples}</h3>
                {(problem as any).examples.map((ex: any, i: number) => (
                  <div key={i} className="bg-surface-1 border border-border rounded-lg p-3 sm:p-4 mb-3">
                    <div className="text-xs font-mono text-muted-foreground mb-1">Input: <span className="text-foreground break-all">{ex.input}</span></div>
                    <div className="text-xs font-mono text-muted-foreground">Output: <span className="text-foreground break-all">{ex.output}</span></div>
                    {ex.explanation && <div className="text-xs text-muted-foreground mt-2">💡 {ex.explanation}</div>}
                  </div>
                ))}
              </>
            )}

            {((problem as any).constraints) && (
              <>
                <h3 className="text-sm font-semibold text-foreground mb-2 mt-4">{t.constraints}</h3>
                <ul className="space-y-1 mb-6">
                  {(problem as any).constraints.map((c: string, i: number) => (
                    <li key={i} className="text-xs text-muted-foreground font-mono break-all">• {c}</li>
                  ))}
                </ul>
              </>
            )}

            {isSql && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4 text-primary" />
                  Database Schema
                </h3>
                <div className="bg-[#1e1e1e] border border-white/5 rounded-xl p-4 shadow-inner">
                  <pre className="text-[11px] font-mono leading-relaxed whitespace-pre-wrap">
                    {(problem as any).schema.split(';').map((stmt: string, i: number) => {
                      if (!stmt.trim()) return null;
                      const parts = stmt.trim().split(' ');
                      return (
                        <div key={i} className="mb-1">
                          <span className="text-[#569cd6] font-bold">{parts[0]}</span>{' '}
                          <span className="text-[#4ec9b0]">{parts[1]}</span>{' '}
                          <span className="text-[#9cdcfe]">{parts.slice(2).join(' ')}</span>;
                        </div>
                      );
                    })}
                  </pre>
                </div>
              </div>
            )}

            <div className="mb-6">
              {!solutionUnlocked ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 border-reward-gold/40 text-reward-gold hover:bg-reward-gold/10 hover:border-reward-gold font-semibold"
                  onClick={() => {
                    const success = unlockSolution(problem.id, 70);
                    if (success) {
                      setShowSolution(true);
                      toast({ title: "Answer Revealed", description: "Paid $70 to view the solution." });
                    } else {
                      toast({ title: "Not enough wallet cash!", description: "You need $70 to reveal the answer.", variant: "destructive" });
                    }
                  }}
                >
                  <Eye className="w-4 h-4" />
                  {t.revealSolution}
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full gap-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowSolution(s => !s)}
                  >
                    <Eye className="w-3 h-3" />
                    {showSolution ? t.hideSolution : "Show Answer"}
                  </Button>
                  {showSolution && (
                    <div className="bg-[#1e1e1e] border border-white/5 rounded-xl p-4 shadow-inner">
                      <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-2 font-semibold">
                        {isSql ? "Solution Query" : "Solution Code"}
                      </p>
                      <pre className="text-[11px] font-mono text-[#9cdcfe] leading-relaxed whitespace-pre-wrap">
                        {isSql ? (problem as any).expectedQuery : (problem as any).solution}
                      </pre>
                      <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed border-t border-white/5 pt-3">
                        💡 {isSql ? (problem as any).explanation : (problem as any).solutionExplanation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {recommendedSubjects.length > 0 && (
              <div className="mb-6">
                <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3 font-semibold flex items-center gap-2">
                  <BookOpenCheck className="w-3.5 h-3.5 text-primary" />
                  {t.learnFirst}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {recommendedSubjects.map((subject: string) => (
                    <span
                      key={subject}
                      className="px-2 py-1 rounded-md bg-primary/5 border border-primary/20 text-[10px] font-medium text-primary/80"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-reward-gold" />
                <span className="text-sm text-reward-gold font-medium">💰 ${reward} {t.reward}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock3 className="w-4 h-4 text-sky-400" />
                <span className="text-sm text-sky-400 font-medium">⏱️ {Math.round(getProblemTimerSeconds(problem) / 60)} mins</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`flex-1 flex flex-col min-h-0 w-full relative ${isMobile && activeTab === "description" ? "hidden" : "flex"}`}>
          {isLocked ? (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm px-6 text-center">
              <Lock className="w-16 h-16 text-muted-foreground mb-6 opacity-30" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Problem Locked</h2>
              <div className="bg-surface-1 border border-border rounded-xl p-6 mb-8 w-full max-w-[240px] shadow-lg">
                <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-2">Time Remaining</div>
                <div className="text-4xl font-mono text-foreground tracking-tight">
                  {formatCountdown(lockTimeRemaining)}
                </div>
              </div>
              <Button 
                onClick={() => {
                  if (progress.wallet >= 50) {
                    addWallet(-50);
                    setLockedUntil(null);
                    try {
                      const locks = JSON.parse(localStorage.getItem("pymaster_problem_locks") || "{}");
                      if (problem) {
                        delete locks[problem.id];
                        localStorage.setItem("pymaster_problem_locks", JSON.stringify(locks));
                      }
                    } catch {}
                    toast({
                      title: "Lock Bypassed",
                      description: "Paid $50 to unlock the problem immediately.",
                    });
                  } else {
                    toast({
                      title: "Not enough wallet cash!",
                      description: "You need $50 to skip the lock timer.",
                      variant: "destructive",
                    });
                  }
                }}
                className="gap-2 bg-reward-gold hover:bg-reward-gold/90 text-black font-semibold min-w-[200px]"
              >
                <Wallet className="w-4 h-4" />
                Pay $50 to Unlock Now
              </Button>
            </div>
          ) : null}

            <div className={`flex-1 min-h-0 w-full relative ${isMobile && activeTab === "output" ? "hidden" : "flex h-full"}`}>
              <Suspense fallback={<div className="flex w-full h-full items-center justify-center bg-surface-0"><span className="text-sm font-semibold tracking-wider text-muted-foreground animate-pulse">{t.loadingCompiler}</span></div>}>
                <Editor
                  key={id}
                  height="100%"
                  language={isSql ? "sql" : "python"}
                  theme="vs-dark"
                  value={code}
                  onChange={(v) => setCode(v || "")}
                  onMount={(editor, monaco) => {
                    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
                      handleRun();
                    });
                  }}
                  loading={<div className="flex w-full h-full items-center justify-center"><span className="text-sm text-muted-foreground animate-pulse">{t.loadingCompilerSmall}</span></div>}
                  options={{
                    fontSize: isMobile ? 12 : 14,
                    fontFamily: "'JetBrains Mono', monospace",
                    minimap: { enabled: false },
                    padding: { top: 12 },
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                    automaticLayout: true,
                    lineNumbers: isMobile ? "off" : "on",
                  }}
                />
              </Suspense>
            </div>

          <div className={`h-[45%] md:h-[45%] min-h-[160px] w-full border-t border-border bg-surface-0 flex flex-col shrink-0 overflow-hidden shadow-[0_-8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 ${isMobile && activeTab !== "output" ? "hidden" : "h-full flex-1"}`}>
            <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 border-b border-border bg-surface-1/80 backdrop-blur-sm sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <span className="text-[10px] sm:text-xs text-muted-foreground font-mono uppercase tracking-wider">{t.output}</span>
                
                {/* Modern Performance Badge */}
                {executionTime !== null && (
                  <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-mono animate-in zoom-in duration-300 ${
                    executionTime < 100 ? "border-streak-green/30 bg-streak-green/10 text-streak-green shadow-[0_0_10px_rgba(34,197,94,0.1)]" :
                    executionTime < 500 ? "border-reward-gold/30 bg-reward-gold/10 text-reward-gold shadow-[0_0_10px_rgba(234,179,8,0.1)]" :
                    "border-destructive/30 bg-destructive/10 text-destructive"
                  }`}>
                    <Sparkles className="w-3 h-3" />
                    {executionTime}ms
                  </div>
                )}
                
                {/* Sparkline Graph */}
                {executionHistory.length > 1 && (
                  <div className="hidden sm:flex items-end gap-[2px] h-4 pb-0.5">
                    {executionHistory.map((time, i) => {
                      const dynamicMax = Math.max(...executionHistory, 100);
                      const height = Math.max(4, (time / dynamicMax) * 100);
                      return (
                        <div 
                          key={i} 
                          style={{ height: `${height}%` }}
                          className={`w-1 rounded-t-[1px] transition-all duration-500 ${
                            time < 100 ? "bg-streak-green" : time < 500 ? "bg-reward-gold" : "bg-destructive"
                          }`}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                {isRunning ? (
                  <Button size="sm" variant="destructive" className="h-7 text-xs gap-1 px-2 sm:px-3" onClick={cancelActivePythonExecution}>
                    <Square className="w-3 h-3" />
                    <span className="hidden sm:inline">{t.stop}</span>
                  </Button>
                ) : (
                  <>
                    <Button size="sm" variant="outline" className="h-7 text-xs gap-1 px-2 sm:px-3" onClick={handleRun}>
                      <Play className="w-3 h-3" />
                      <span className="hidden sm:inline">{t.run}</span>
                    </Button>
                    <Button size="sm" className="h-7 text-xs gap-1 px-2 sm:px-3" onClick={handleSubmit}>
                      <Send className="w-3 h-3" />
                      <span className="hidden sm:inline">{t.submit}</span>
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="flex-1 overflow-auto p-3 sm:p-4 flex flex-col">
              {!output && !sqlResult && (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                  <p className="text-[11px] text-muted-foreground mb-1 max-w-[280px]">
                    {t.runningInfoPrefix} {600}{t.runningInfoSuffix}
                  </p>
                  <pre className="whitespace-pre-wrap text-foreground font-mono text-sm leading-relaxed font-semibold tracking-tight">
                    {isRunning ? "Running..." : "Click Run to execute your code"}
                  </pre>
                </div>
              )}
              {isSql && sqlResult ? (
                <SqlTableView csvOutput={sqlResult} />
              ) : output ? (
                <pre className="whitespace-pre-wrap text-foreground font-mono text-sm leading-relaxed">
                  {output}
                </pre>
              ) : null}
              {testResults && (
                <div className="space-y-1.5 mb-3">
                  {testResults.map((r, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono flex-wrap">
                      {r.passed ? <CheckCircle2 className="w-3.5 h-3.5 text-streak-green shrink-0" /> : <XCircle className="w-3.5 h-3.5 text-destructive shrink-0" />}
                      <span className="text-muted-foreground">Test {i + 1}:</span>
                      <span className="text-foreground break-all whitespace-pre-wrap">{r.input}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className={`break-all whitespace-pre-wrap ${r.passed ? "text-streak-green" : "text-destructive"}`}>{r.expected}</span>
                    </div>
                  ))}
                </div>
              )}
              {submitted && (
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-streak-green/10 border border-streak-green/30 rounded-xl mb-3 shadow-sm animate-in fade-in zoom-in duration-300">
                  <div className="flex items-center gap-3 flex-1">
                    <CheckCircle2 className="w-6 h-6 text-streak-green shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-foreground tracking-tight">{t.allPassed}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5 flex-wrap font-medium">
                        <span className="text-reward-gold px-1.5 py-0.5 bg-reward-gold/10 rounded-md border border-reward-gold/20">💰 +${reward}</span>
                        <span className="text-python-yellow px-1.5 py-0.5 bg-python-yellow/10 rounded-md border border-python-yellow/20">{t.streakUpdated}</span>
                      </p>
                    </div>
                  </div>
                  {nextProblem && (
                    <Button asChild size="sm" className="w-full sm:w-auto h-9 gap-2 bg-streak-green hover:bg-streak-green/90 text-white font-semibold">
                      <Link to={`/problems/${nextProblem.id}`}>
                        {t.next}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
