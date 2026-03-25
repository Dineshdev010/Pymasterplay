// ============================================================
// PYTHON EXECUTOR — src/lib/piston.ts
// Runs Python code in an isolated Web Worker using Pyodide.
// This keeps user code off the main UI thread and lets us
// terminate runaway scripts safely when they time out or are stopped.
// ============================================================

export interface ExecutionResult {
  output: string;
  error: string;
  exitCode: number;
}

interface WorkerSuccessMessage {
  type: "execution-result";
  requestId: number;
  result: ExecutionResult;
}

interface WorkerReadyMessage {
  type: "worker-ready";
}

interface WorkerErrorMessage {
  type: "worker-error";
  requestId?: number;
  error: string;
}

type WorkerMessage = WorkerSuccessMessage | WorkerReadyMessage | WorkerErrorMessage;

interface ExecutionOptions {
  timeoutMs?: number;
}

const DEFAULT_TIMEOUT_MS = 5000;
const INIT_TIMEOUT_MS = 20000;

let worker: Worker | null = null;
let workerReadyPromise: Promise<void> | null = null;
let nextRequestId = 1;
let executionQueue: Promise<void> = Promise.resolve();
let activeExecution:
  | {
      requestId: number;
      resolve: (result: ExecutionResult) => void;
      timeoutId: number;
    }
  | null = null;

function createWorker() {
  const nextWorker = new Worker(new URL("../workers/pythonRunner.worker.ts", import.meta.url), {
    type: "module",
  });

  worker = nextWorker;
  workerReadyPromise = new Promise<void>((resolve, reject) => {
    const initTimeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error("Python runtime initialization timed out."));
    }, INIT_TIMEOUT_MS);

    const cleanup = () => {
      nextWorker.removeEventListener("message", handleMessage);
      nextWorker.removeEventListener("error", handleError);
      window.clearTimeout(initTimeoutId);
    };

    const handleMessage = (event: MessageEvent<WorkerMessage>) => {
      if (event.data.type !== "worker-ready") {
        return;
      }

      cleanup();
      resolve();
    };

    const handleError = () => {
      cleanup();
      reject(new Error("Failed to initialize Python worker."));
    };

    nextWorker.addEventListener("message", handleMessage);
    nextWorker.addEventListener("error", handleError);
    nextWorker.postMessage({ type: "init" });
  });

  return nextWorker;
}

function terminateWorker() {
  if (worker) {
    worker.terminate();
  }

  worker = null;
  workerReadyPromise = null;
}

async function ensureWorkerReady() {
  if (!worker || !workerReadyPromise) {
    createWorker();
  }

  await workerReadyPromise;

  if (!worker) {
    throw new Error("Python worker is unavailable.");
  }

  return worker;
}

function formatWorkerFailure(message: string): ExecutionResult {
  return {
    output: "",
    error: message,
    exitCode: 1,
  };
}

function runPythonExecution(code: string, options?: ExecutionOptions): Promise<ExecutionResult> {
  return new Promise<ExecutionResult>(async (resolve) => {
    const requestId = nextRequestId++;
    const timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS;

    try {
      const activeWorker = await ensureWorkerReady();

      const cleanup = () => {
        if (!worker) {
          return;
        }

        worker.removeEventListener("message", handleMessage);
        worker.removeEventListener("error", handleError);
      };

      const finish = (result: ExecutionResult) => {
        if (!activeExecution || activeExecution.requestId !== requestId) {
          return;
        }

        cleanup();
        window.clearTimeout(activeExecution.timeoutId);
        activeExecution = null;
        resolve(result);
      };

      const handleMessage = (event: MessageEvent<WorkerMessage>) => {
        const message = event.data;

        if (message.type === "worker-error" && message.requestId === requestId) {
          finish(formatWorkerFailure(message.error));
          return;
        }

        if (message.type === "execution-result" && message.requestId === requestId) {
          finish(message.result);
        }
      };

      const handleError = () => {
        finish(formatWorkerFailure("Python worker crashed during execution."));
        terminateWorker();
      };

      activeExecution = {
        requestId,
        resolve: finish,
        timeoutId: window.setTimeout(() => {
          const timedOutExecution = activeExecution;
          terminateWorker();

          if (timedOutExecution && timedOutExecution.requestId === requestId) {
            timedOutExecution.resolve(
              formatWorkerFailure(
                `Execution timed out after ${Math.round(timeoutMs / 1000)} seconds. Try a smaller input, fix any infinite loop, or stop the run earlier.`,
              ),
            );
            activeExecution = null;
          }
        }, timeoutMs),
      };

      activeWorker.addEventListener("message", handleMessage);
      activeWorker.addEventListener("error", handleError);
      activeWorker.postMessage({ type: "execute", requestId, code });
    } catch (error) {
      terminateWorker();
      resolve(
        formatWorkerFailure(
          `Failed to initialize Python: ${error instanceof Error ? error.message : "Unknown error"}`,
        ),
      );
    }
  });
}

export function preloadPyodide(): void {
  if (typeof window === "undefined") {
    return;
  }

  const start = () => {
    ensureWorkerReady().catch(() => undefined);
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback?.(() => start());
  } else {
    window.setTimeout(start, 1500);
  }
}

if (typeof window !== "undefined") {
  if (document.readyState === "complete") {
    preloadPyodide();
  } else {
    window.addEventListener("load", preloadPyodide, { once: true });
  }
}

export function cancelActivePythonExecution(): void {
  if (!activeExecution) {
    return;
  }

  const cancelledExecution = activeExecution;
  terminateWorker();
  window.clearTimeout(cancelledExecution.timeoutId);
  cancelledExecution.resolve(
    formatWorkerFailure("Execution stopped. You can update the code and run it again."),
  );
  activeExecution = null;
}

export function getPythonExecutionTimeoutMs(): number {
  return DEFAULT_TIMEOUT_MS;
}

export async function executePython(code: string, options?: ExecutionOptions): Promise<ExecutionResult> {
  const queuedExecution = executionQueue
    .catch(() => undefined)
    .then(() => runPythonExecution(code, options));

  executionQueue = queuedExecution.then(
    () => undefined,
    () => undefined,
  );

  return queuedExecution;
}
