// ============================================================
// PYTHON EXECUTOR — src/lib/piston.ts
// Runs Python code in the browser using Pyodide (WebAssembly).
// No server needed — Python runs 100% client-side!
// Optimized: preloads Pyodide eagerly after page load for speed.
// ============================================================

// --- Type definition for execution results ---
export interface ExecutionResult {
  output: string; // stdout (print() output)
  error: string; // stderr (error messages)
  exitCode: number; // 0 = success, 1 = error
}

// Cache the Pyodide instance so we only load it once
let pyodideInstance: any = null;
let pyodidePromise: Promise<any> | null = null;

/**
 * Load Pyodide (Python-in-the-browser via WebAssembly).
 * Cached after first load — subsequent calls return instantly.
 */
function loadPyodide(): Promise<any> {
  if (pyodideInstance) return Promise.resolve(pyodideInstance);
  if (pyodidePromise) return pyodidePromise;

  pyodidePromise = new Promise(async (resolve, reject) => {
    try {
      // Step 1: Add the Pyodide script tag (if not already there)
      if (!(window as any).loadPyodide) {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
        script.async = true;
        await new Promise<void>((res, rej) => {
          script.onload = () => res();
          script.onerror = () => rej(new Error("Failed to load Pyodide"));
          document.head.appendChild(script);
        });
      }

      // Step 2: Initialize Pyodide
      const pyodide = await (window as any).loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",
      });

      pyodideInstance = pyodide;
      resolve(pyodide);
    } catch (err) {
      pyodidePromise = null;
      reject(err);
    }
  });

  return pyodidePromise;
}

/**
 * Preload Pyodide in the background so first run is fast.
 * Called automatically after page loads.
 */
export function preloadPyodide(): void {
  // Use requestIdleCallback or setTimeout to avoid blocking UI
  if (typeof window !== "undefined") {
    const start = () => {
      loadPyodide().catch(() => {
        // Silent fail — will retry on first actual execution
      });
    };
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(start);
    } else {
      setTimeout(start, 2000);
    }
  }
}

// Auto-preload after page loads
if (typeof window !== "undefined") {
  if (document.readyState === "complete") {
    preloadPyodide();
  } else {
    window.addEventListener("load", preloadPyodide, { once: true });
  }
}

/**
 * Execute a Python code string and return the output.
 * Optimized: reuses cached Pyodide instance, minimal overhead.
 */
export async function executePython(code: string): Promise<ExecutionResult> {
  try {
    const pyodide = await loadPyodide();

    // Redirect stdout and stderr to capture print() output
    pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
`);

    try {
      // Run the user's Python code
      pyodide.runPython(code);

      // Read captured output
      const stdout = pyodide.runPython("sys.stdout.getvalue()") || "";
      const stderr = pyodide.runPython("sys.stderr.getvalue()") || "";

      return {
        output: stdout,
        error: stderr,
        exitCode: stderr ? 1 : 0,
      };
    } catch (err: any) {
      let stdout = "";
      try {
        stdout = pyodide.runPython("sys.stdout.getvalue()") || "";
      } catch (_) {}

      const errorMessage = err.type
        ? `${err.type}: ${err.message}`
        : err.message || String(err);
      return {
        output: stdout,
        error: errorMessage,
        exitCode: 1,
      };
    } finally {
      // Always reset stdout/stderr back to normal
      try {
        pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);
      } catch (_) {}
    }
  } catch (err) {
    return {
      output: "",
      error: `Failed to initialize Python: ${err instanceof Error ? err.message : "Unknown error"}`,
      exitCode: 1,
    };
  }
}
