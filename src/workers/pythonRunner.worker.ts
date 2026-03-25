/// <reference lib="webworker" />

const PYODIDE_VERSION = "0.26.4";
const OUTPUT_LIMIT = 12000;

let pyodidePromise: Promise<any> | null = null;

function appendLimited(text: string, chunk: string) {
  if (!chunk) {
    return text;
  }

  const combined = text + chunk;
  if (combined.length <= OUTPUT_LIMIT) {
    return combined;
  }

  return combined.slice(0, OUTPUT_LIMIT) + "\n... output truncated ...";
}

async function loadRuntime() {
  if (pyodidePromise) {
    return pyodidePromise;
  }

  pyodidePromise = (async () => {
    const globalScope = self as typeof self & {
      loadPyodide?: (options: { indexURL: string }) => Promise<any>;
      importScripts: (...urls: string[]) => void;
    };

    if (!globalScope.loadPyodide) {
      globalScope.importScripts(
        `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/pyodide.js`,
      );
    }

    if (!globalScope.loadPyodide) {
      throw new Error("Pyodide loader did not initialize.");
    }

    return globalScope.loadPyodide({
      indexURL: `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`,
    });
  })();

  return pyodidePromise;
}

async function executeCode(requestId: number, code: string) {
  try {
    const pyodide = await loadRuntime();
    let stdout = "";
    let stderr = "";

    pyodide.setStdout({
      batched: (message: string) => {
        stdout = appendLimited(stdout, `${message}\n`);
      },
    });
    pyodide.setStderr({
      batched: (message: string) => {
        stderr = appendLimited(stderr, `${message}\n`);
      },
    });

    try {
      await pyodide.runPythonAsync(code);
    } catch (error) {
      const pyodideError = error as Error & { type?: string };
      const message = pyodideError.type
        ? `${pyodideError.type}: ${pyodideError.message}`
        : pyodideError.message || String(error);

      if (!stderr) {
        stderr = message;
      } else {
        stderr = appendLimited(stderr, `\n${message}`);
      }
    }

    pyodide.setStdout({});
    pyodide.setStderr({});

    self.postMessage({
      type: "execution-result",
      requestId,
      result: {
        output: stdout.trimEnd(),
        error: stderr.trimEnd(),
        exitCode: stderr ? 1 : 0,
      },
    });
  } catch (error) {
    self.postMessage({
      type: "worker-error",
      requestId,
      error: error instanceof Error ? error.message : "Unknown worker error",
    });
  }
}

self.addEventListener("message", async (event: MessageEvent) => {
  const { type, requestId, code } = event.data ?? {};

  if (type === "init") {
    try {
      await loadRuntime();
      self.postMessage({ type: "worker-ready" });
    } catch (error) {
      self.postMessage({
        type: "worker-error",
        error: error instanceof Error ? error.message : "Failed to initialize Python worker",
      });
    }
    return;
  }

  if (type === "execute" && typeof requestId === "number" && typeof code === "string") {
    await executeCode(requestId, code);
  }
});
