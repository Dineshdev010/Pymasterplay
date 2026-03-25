// ============================================================
// COMPILER PAGE — src/pages/CompilerPage.tsx
// A browser-based Python code editor and runner.
// Uses Monaco Editor for code editing and Pyodide (WASM)
// for executing Python entirely in the browser.
// Includes pre-built code templates for quick starts.
// ============================================================

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { Play, RotateCcw, FileCode, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/contexts/ProgressContext";
import { cancelActivePythonExecution, executePython, getPythonExecutionTimeoutMs } from "@/lib/piston";

// ---------- Pre-built code templates ----------
// Users can select these from the dropdown to quickly try different concepts
const templates: Record<string, string> = {
  "Hello World": `# Hello World\nprint("Hello, World!")`,
  "Variables": `# Variables\nname = "Python"\nage = 30\nprint(f"{name} is {age} years old")`,
  "List Comprehension": `# List Comprehension\nsquares = [x**2 for x in range(10)]\nprint(squares)`,
  "Function": `# Function\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))`,
  "Class": `# Class\nclass Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return f"{self.name} says Woof!"\n\ndog = Dog("Rex")\nprint(dog.bark())`,
  "Fibonacci": `# Fibonacci Sequence\ndef fib(n):\n    a, b = 0, 1\n    result = []\n    for _ in range(n):\n        result.append(a)\n        a, b = b, a + b\n    return result\n\nprint(fib(15))`,
  "Dictionary": `# Dictionary operations\nstudent = {"name": "Alice", "age": 22, "grade": "A"}\n\nfor key, value in student.items():\n    print(f"{key}: {value}")`,
};

export default function CompilerPage() {
  // ---------- State ----------
  const [searchParams] = useSearchParams();
  // Initialize code from URL param (from "Try in Compiler" links) or default template
  const [code, setCode] = useState(searchParams.get("code") || templates["Hello World"]);
  const [output, setOutput] = useState("");           // Output from Python execution
  const [isRunning, setIsRunning] = useState(false);  // Whether code is currently executing
  const [executionTime, setExecutionTime] = useState<number | null>(null); // Execution time in ms
  const { logActivity } = useProgress();              // Record activity for streak
  const timeoutSeconds = Math.round(getPythonExecutionTimeoutMs() / 1000);

  // Update code when URL search param changes (e.g., navigating from a lesson)
  useEffect(() => {
    const c = searchParams.get("code");
    if (c) setCode(c);
  }, [searchParams]);

  // ---------- Run Python code ----------
  // Executes the code using Pyodide (WebAssembly) in the browser
  const runCode = async () => {
    setIsRunning(true);
    setOutput("");
    setExecutionTime(null);

    // Measure execution time
    const startTime = performance.now();

    // Execute using Pyodide WASM engine
    const result = await executePython(code);
    const elapsed = performance.now() - startTime;
    setExecutionTime(Math.round(elapsed));

    // Format the output based on result
    let outputText = "";
    if (result.error) {
      // Show errors (and any partial output before the error)
      outputText = result.output
        ? result.output + "\n⚠️ Errors:\n" + result.error
        : "❌ Error:\n" + result.error;
    } else if (result.output) {
      outputText = result.output;
    } else {
      outputText = "(No output — add print() statements to see results)";
    }

    setOutput(outputText);
    setIsRunning(false);
    // Log activity for streak tracking
    logActivity();
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col md:h-[calc(100vh-3.5rem)]">
      {/* ---------- Toolbar ---------- */}
      <div className="h-auto min-h-[3rem] bg-surface-1 border-b border-border flex flex-wrap items-center justify-between px-3 sm:px-4 py-2 gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground hidden sm:inline">🐍 Python Playground</span>
          <span className="text-sm font-medium text-foreground sm:hidden">🐍 Python</span>
          {/* Badge showing this runs in browser via WebAssembly */}
          <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
            🌐 Browser WASM
          </span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Template selector dropdown */}
          <select
            className="bg-secondary text-foreground text-xs px-2 py-1.5 rounded-md border border-border"
            onChange={(e) => setCode(templates[e.target.value])}
            defaultValue=""
          >
            <option value="" disabled>📝 Templates</option>
            {Object.keys(templates).map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
          {/* Clear button — resets code and output */}
          <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => { setCode(""); setOutput(""); setExecutionTime(null); }}>
            <RotateCcw className="w-3 h-3" /> <span className="hidden sm:inline">Clear</span>
          </Button>
          {/* Run button — executes the Python code */}
          {isRunning ? (
            <Button size="sm" variant="destructive" className="h-7 text-xs gap-1" onClick={cancelActivePythonExecution}>
              <Square className="w-3 h-3" /> Stop
            </Button>
          ) : (
            <Button size="sm" className="h-7 text-xs gap-1" onClick={runCode}>
              <Play className="w-3 h-3" />
              ▶ Run
            </Button>
          )}
        </div>
      </div>

      {/* ---------- Editor + Output split view ---------- */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Monaco code editor (left/top panel) */}
        <div className="flex-1 min-h-0">
          <Editor
            height="100%"
            language="python"
            theme="vs-dark"
            value={code}
            onChange={(v) => setCode(v || "")}
            options={{
              fontSize: 14,
              fontFamily: "'JetBrains Mono', monospace",
              minimap: { enabled: false },
              padding: { top: 16 },
              scrollBeyondLastLine: false,
              wordWrap: "on",
              lineNumbers: "on",
              renderLineHighlight: "gutter",
              automaticLayout: true,
            }}
          />
        </div>
        {/* Output panel (right/bottom panel) */}
        <div className="md:w-96 h-56 md:h-auto border-t md:border-t-0 md:border-l border-border bg-surface-0 flex flex-col">
          {/* Output header with execution time */}
          <div className="px-4 py-2 border-b border-border bg-surface-1 text-xs text-muted-foreground font-mono flex items-center justify-between">
            <span className="flex items-center gap-2">
              📺 Output
            </span>
            {executionTime !== null && (
              <span className="text-[10px] text-muted-foreground">⏱ {executionTime}ms</span>
            )}
          </div>
          {/* Output text area */}
          <pre className={`flex-1 p-4 text-sm font-mono overflow-auto whitespace-pre-wrap ${
            output.includes("❌") || output.includes("⚠️") ? "text-destructive" : "text-foreground"
          }`}>
            {isRunning ? (
              <span className="text-muted-foreground animate-pulse">⏳ Running Python in browser worker...</span>
            ) : (
              output || `Click '▶ Run' to execute your code locally. Runs in an isolated browser worker with a ${timeoutSeconds}s safety timeout.`
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}
