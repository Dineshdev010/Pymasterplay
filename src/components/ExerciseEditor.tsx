import { useEffect, useState, useCallback } from "react";
import Editor from "@monaco-editor/react";
import confetti from "canvas-confetti";
import { Exercise } from "@/data/lessons";
import { useProgress } from "@/contexts/ProgressContext";
import { cancelActivePythonExecution, executePython, getPythonExecutionTimeoutMs, preloadPyodide, subscribePythonRuntimeStatus, type PythonRuntimeStatus } from "@/lib/piston";
import { executeSql } from "@/lib/sqlRunner";
import { playSuccessSound, playErrorSound } from "@/lib/sounds";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useTheme } from "@/components/ThemeProvider";
import { Play, CheckCircle2, ChevronDown, ChevronUp, Lock, RotateCcw, Lightbulb, Eye, Square, Terminal, Loader2, Volume2 } from "lucide-react";

interface ExerciseEditorProps {
  exercise: Exercise;
  level: "beginner" | "intermediate" | "advanced";
  lessonId: string;
  locked?: boolean;
  language?: string;
}

function generateHint(exercise: Exercise): string {
  const expected = exercise.expectedOutput;
  if (expected.includes("(") || expected.includes("[") || expected.includes("{")) {
    return `💡 Your output should use a data structure. Expected format starts with: "${expected.substring(0, 30)}..."`;
  }
  if (expected.includes("\n")) {
    return `💡 The output has ${expected.split("\n").length} lines. First line: "${expected.split("\n")[0]}"`;
  }
  return `💡 The expected output is: "${expected.length > 50 ? expected.substring(0, 50) + "..." : expected}"`;
}

function generateSolution(exercise: Exercise): string {
  // Derive a likely solution from the starter code and expected output
  const starter = exercise.starterCode;
  const expected = exercise.expectedOutput;
  
  // If there's an explicit solution, use it
  if (exercise.solution) return exercise.solution;
  
  // Simple heuristic: add a print statement for the expected output
  if (starter.includes("# Print") || starter.includes("# print")) {
    return `${starter.trimEnd()}\nprint(${JSON.stringify(expected).includes("\\n") ? "..." : `"${expected}"`})`;
  }
  
  return `# Solution: Your code should produce:\n# ${expected.replace(/\n/g, "\n# ")}`;
}

export function ExerciseEditor({ exercise, level, lessonId, locked, language = "python" }: ExerciseEditorProps) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState(exercise.starterCode);
  const [output, setOutput] = useState("");
  const [passed, setPassed] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [pyStatus, setPyStatus] = useState<PythonRuntimeStatus>("idle");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const { progress, completeExercise, addWallet, unlockSolution } = useProgress();
  const timeoutSeconds = Math.round(getPythonExecutionTimeoutMs() / 1000);
  const isEnglish = language === "english";
  const exerciseType = exercise.type || "code";

  const handleSpeak = (text: string) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const exerciseKey = `${lessonId}:${level}`;
  const alreadyCompleted = progress.completedExercises.includes(exerciseKey);
  const solutionUnlocked = progress.unlockedSolutions.includes(exerciseKey);

  // Preload Pyodide as soon as any exercise is opened
  useEffect(() => {
    if (isOpen && language === "python") {
      preloadPyodide();
    }
  }, [isOpen, language]);

  // Subscribe to Pyodide runtime status for indicator
  useEffect(() => {
    if (language !== "python") return;
    const unsubscribe = subscribePythonRuntimeStatus((status) => {
      setPyStatus(status);
    });
    return unsubscribe;
  }, [language]);

  useEffect(() => {
    setIsOpen(false);
    setCode(exercise.starterCode);
    setOutput("");
    setPassed(false);
    setIsRunning(false);
    setShowHint(false);
    setShowSolution(false);
    setSelectedOption(null);
  }, [exerciseKey, exercise.starterCode]);

  const levelColors = {
    beginner: "bg-streak-green/10 border-streak-green/30 text-streak-green",
    intermediate: "bg-python-yellow/10 border-python-yellow/30 text-python-yellow",
    advanced: "bg-destructive/10 border-destructive/30 text-destructive",
  };

  const runAndCheck = async () => {
    if (exerciseType === "quiz") {
      if (selectedOption === null) {
        toast({ title: "Please select an option", variant: "destructive" });
        return;
      }
      setIsRunning(true);
      setTimeout(() => {
        const isCorrect = selectedOption === exercise.correctOption;
        if (isCorrect) {
          setPassed(true);
          playSuccessSound();
          setOutput("✅ Correct! You've mastered this concept.");
          if (!alreadyCompleted) {
            completeExercise(exerciseKey);
            addWallet(20);
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#3b82f6", "#22c55e", "#eab308"]
            });
            toast({ title: "Goal Reached! 🎯", description: "You earned 20 XP and coins!" });
          }
        } else {
          setPassed(false);
          playErrorSound();
          setOutput("❌ Not quite. Try reviewing the lesson and try again.");
        }
        setIsRunning(false);
      }, 800);
      return;
    }

    if (exerciseType === "speaking") {
      setIsRunning(true);
      setOutput("🎤 Listening... Please speak into your microphone.");
      
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        setOutput("❌ Speech recognition is not supported in your browser. Please try Chrome or Edge.");
        playErrorSound();
        setIsRunning(false);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        const expectedText = exercise.starterCode.toLowerCase().replace(/[.,!?;:]/g, '');
        const cleanTranscript = transcript.replace(/[.,!?;:]/g, '');
        
        if (cleanTranscript.includes(expectedText) || expectedText.includes(cleanTranscript) || (cleanTranscript.length > 5 && expectedText.length > 5 && (cleanTranscript.substring(0, 5) === expectedText.substring(0, 5)))) {
          setPassed(true);
          playSuccessSound();
          setOutput(`✅ You said: "${event.results[0][0].transcript}"\nGreat pronunciation!`);
          if (!alreadyCompleted) {
            completeExercise(exerciseKey);
            addWallet(30);
            confetti({ particleCount: 150, spread: 100 });
            toast({ title: "Badge Earned: Silver Tongue 🥈", description: "Your pronunciation is spot on!" });
          }
        } else {
          setPassed(false);
          playErrorSound();
          setOutput(`❌ You said: "${event.results[0][0].transcript}"\nExpected: "${exercise.starterCode}"\nTry again!`);
        }
      };

      recognition.onerror = (event: any) => {
        setOutput(`❌ Microphone error: ${event.error}`);
        playErrorSound();
        setIsRunning(false);
      };

      recognition.onend = () => {
        setIsRunning(false);
      };
      
      return;
    }

    const userCode = code.trim();
    const starterCode = exercise.starterCode.trim();
    const hasNewCode = userCode.length > starterCode.length + 3;

    if (!hasNewCode) {
      setOutput("⚠️ Write your code first, then click Run.");
      setPassed(false);
      return;
    }

    setIsRunning(true);
    const langLabel = language === "sql" ? "SQL" : language === "bash" ? "Terminal" : "Python";
    setOutput(`⏳ Running ${langLabel} execution...`);

    let actualOutput = "";
    let error = "";

    if (language === "bash") {
      // For bash/command tracks, the expectedOutput is usually the command string itself
      // We do a direct string comparison for now as it's a "simulation" environment
      actualOutput = userCode;
    } else if (language === "sql") {
      const result = await executeSql(userCode);
      actualOutput = result.output.trim();
      error = result.error;
    } else {
      const result = await executePython(userCode);
      actualOutput = result.output.trim();
      error = result.error;
    }

    const expected = exercise.expectedOutput.trim();

    if (error && !actualOutput) {
      setOutput(`❌ Error:\n${error}`);
      setPassed(false);
      setIsRunning(false);
      return;
    }

    if (actualOutput === expected) {
      setOutput(`✅ Output:\n${actualOutput}\n\n🎉 Correct! Exercise completed! +20 coins`);
      setPassed(true);
      if (!alreadyCompleted) {
        completeExercise(exerciseKey);
        addWallet(20);
        toast({ title: "Exercise Passed! 🎉", description: "+20 coins added to your wallet." });
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#3b82f6", "#22c55e", "#eab308"],
        });
      }
    } else {
      setOutput(`Your output:\n${actualOutput || "(no output)"}\n\nExpected:\n${expected}\n\n❌ Not quite right. Check your code.`);
      setPassed(false);
    }

    setIsRunning(false);
  };

  if (locked) {
    return (
      <div className="bg-surface-1 border border-border rounded-lg p-4 opacity-70">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-muted-foreground" />
          <span className={`text-xs px-2 py-0.5 rounded-full border capitalize ${levelColors[level]}`}>{level}</span>
          <span className="text-sm text-muted-foreground">Complete the previous exercise to unlock</span>
        </div>
      </div>
    );
  }

  const hint = exercise.hint || generateHint(exercise);
  const solution = exercise.solution || generateSolution(exercise);

  return (
    <div className={`border rounded-lg overflow-hidden transition-all ${
      alreadyCompleted ? "border-streak-green/30 bg-streak-green/5" : "border-border bg-card"
    }`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-1/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-md ${levelColors[level]}`}>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold capitalize">{level} Level Exercise</h4>
            <p className="text-xs text-muted-foreground text-left">{exercise.prompt}</p>
          </div>
          {isEnglish && (
            <Button size="icon" variant="ghost" className="h-8 w-8 ml-auto text-primary" onClick={() => handleSpeak(exercise.prompt)}>
              <Volume2 className="w-4 h-4" />
            </Button>
          )}
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>

      {isOpen && (
        <div className="border-t border-border bg-surface-1">
          {exerciseType === "code" ? (
            <div className="h-48 relative">
              <div className="absolute top-2 right-4 z-10 flex items-center gap-1.5 px-2 py-1 bg-background/50 backdrop-blur-sm border border-border rounded-md pointer-events-none">
                <Terminal className="w-3 h-3 text-muted-foreground" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{language}</span>
              </div>
              <Editor
                height="100%"
                language={language === "bash" ? "shell" : language}
                theme={theme === "dark" ? "vs-dark" : "light"}
                value={code}
                onChange={(v) => setCode(v || "")}
                loading={
                  <div className="flex flex-col items-center justify-center h-full bg-background gap-2">
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    <span className="text-xs text-muted-foreground">Loading editor...</span>
                  </div>
                }
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
          ) : exerciseType === "quiz" ? (
            <div className="p-6 space-y-4 bg-muted/20">
              <div className="grid grid-cols-1 gap-3">
                {exercise.options?.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(idx)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                      selectedOption === idx 
                        ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(var(--primary),0.2)]" 
                        : "border-border bg-background hover:border-border-hover"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedOption === idx ? "border-primary bg-primary" : "border-muted-foreground"}`}>
                      {selectedOption === idx && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className="text-sm font-medium">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : exerciseType === "speaking" ? (
            <div className="p-8 flex flex-col items-center justify-center text-center space-y-6 bg-gradient-to-b from-primary/5 to-transparent">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shadow-inner relative">
                {isRunning && (
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-primary/20"
                  />
                )}
                <Volume2 className={`w-8 h-8 text-primary ${isRunning ? "animate-pulse" : ""}`} />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-bold text-foreground">Speak the following clearly:</p>
                <div className="p-4 rounded-lg bg-background border border-primary/20 italic text-xl font-serif text-primary/80">
                  "{exercise.starterCode}"
                </div>
              </div>
              <p className="text-xs text-muted-foreground max-w-xs">
                Click "Check Answer" and read the text above. Make sure your microphone is working!
              </p>
            </div>
          ) : null}

          {/* Hint & Solution panels */}
          {(showHint || showSolution) && (
            <div className="border-t border-border bg-muted/30 px-4 py-3 space-y-4">
              {showHint && !showSolution && (
                <div className="text-xs text-muted-foreground animate-in fade-in slide-in-from-top-1">
                  <span className="font-semibold text-python-yellow">💡 Hint:</span>{" "}
                  {hint}
                </div>
              )}
              {showSolution && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 pt-1 border-t border-border/50 first:border-0 first:pt-0">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-primary/90 uppercase tracking-wider">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      ANS CODE
                    </div>
                    <pre className="text-xs font-mono bg-background/50 border border-primary/20 rounded-md p-3 text-foreground whitespace-pre-wrap shadow-sm">
                      {solution}
                    </pre>
                  </div>
                  <div className="space-y-1.5 pt-1 border-t border-border/50">
                    <div className="flex items-center gap-2 text-xs font-semibold text-streak-green/90 uppercase tracking-wider">
                      <div className="w-1.5 h-1.5 rounded-full bg-streak-green" />
                      Expected Output
                    </div>
                    <pre className="text-xs font-mono bg-streak-green/5 border border-streak-green/20 rounded-md p-3 text-streak-green whitespace-pre-wrap shadow-sm">
                      {exercise.expectedOutput}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="border-t border-border">
            <div className="flex items-center justify-between px-4 py-2 bg-surface-1 gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Terminal className="w-3 h-3 text-muted-foreground" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {isEnglish ? "Language Lab" : language === "sql" ? "SQL Console" : "Python Console"}
                </span>
                {!isEnglish && language === "python" && (
                  <div className="flex items-center gap-1.5 ml-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${pyStatus === "ready" ? "bg-streak-green shadow-[0_0_8px_rgba(34,197,94,0.5)]" : pyStatus === "busy" ? "bg-python-yellow animate-pulse" : "bg-muted-foreground"}`} />
                    <span className="text-[9px] text-muted-foreground capitalize">{pyStatus}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs gap-1 text-python-yellow/70 hover:text-python-yellow"
                  onClick={() => { setShowHint(!showHint); setShowSolution(false); }}
                >
                  <Lightbulb className="w-3 h-3" /> {showHint ? "Hide Hint" : "Hint"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs gap-1 text-primary/70 hover:text-primary transition-colors hover:bg-surface-2"
                  onClick={() => {
                    const nextVisible = !showSolution;
                    setShowHint(false);

                    if (nextVisible && !solutionUnlocked) {
                      if (unlockSolution(exerciseKey)) {
                        toast({ title: "Solution Unlocked!", description: "This solution is now saved for this exercise." });
                      } else {
                        toast({ title: "Not enough cash", description: "You need $70 to unlock this solution." });
                        return;
                      }
                    }

                    if (nextVisible) {
                      setCode(solution);
                    }

                    setShowSolution(nextVisible);
                  }}
                >
                  <Eye className="w-3 h-3" /> {showSolution ? "Hide Solution" : solutionUnlocked ? "Solution" : "Solution ($70)"}
                </Button>
                <Button size="sm" variant="ghost" className="h-7 text-xs gap-1 text-muted-foreground hover:text-foreground" onClick={() => { setCode(exercise.starterCode); setOutput(""); setPassed(false); }}>
                  <RotateCcw className="w-3 h-3" /> Reset
                </Button>
                {isRunning ? (
                  <Button size="sm" variant="destructive" className="h-7 text-xs gap-1" onClick={cancelActivePythonExecution}>
                    <Square className="w-3 h-3" /> Stop
                  </Button>
                ) : (
                  <Button size="sm" className="h-7 text-xs gap-1" onClick={runAndCheck}>
                    <Play className="w-3 h-3" /> Run & Check
                  </Button>
                )}
              </div>
            </div>
            {output && (
              <pre className={`px-4 py-3 text-xs font-mono whitespace-pre-wrap ${
                passed ? "text-streak-green" : "text-foreground"
              }`}>
                {output}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
