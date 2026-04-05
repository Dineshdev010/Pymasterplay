export interface PyBrainTip {
  id: string;
  title: string;
  description: string;
  type: "performance" | "style" | "best-practice";
}

export interface PyBrainAnalysis {
  tips: PyBrainTip[];
  score: number; // 0 to 100 based on number of tips. (100 = perfect, no tips)
}

/**
 * A lightweight, regex-based utility for parsing Python code
 * and offering "Pro Tips" for common patterns (PyBrain).
 */
export function analyzePythonCode(code: string): PyBrainAnalysis {
  const tips: PyBrainTip[] = [];

  // 1. Check for string concatenation using `+`
  // looking for patterns like: var + " string" or "string " + var
  if (/(\b\w+\s*\+\s*["']|["']\s*\+\s*\b\w+)/.test(code)) {
    tips.push({
      id: "f-string",
      title: "Use f-strings for better formatting",
      description: "You're using '+' to concatenate strings. Using f-strings (e.g., f\"Hello {name}\") is faster and more readable.",
      type: "style"
    });
  }

  // 2. Check for range(len(...))
  if (/range\s*\(\s*len\s*\(/.test(code)) {
    tips.push({
      id: "enumerate",
      title: "Use `enumerate()` instead of `range(len())`",
      description: "When you need both the index and the item from a list, use `for idx, item in enumerate(my_list):` instead.",
      type: "best-practice"
    });
  }

  // 3. Check for standard initialization and append in a loop for List Comprehension
  // This is a rough heuristic: looks for empty list creation followed by a for loop with append.
  if (/(\w+)\s*=\s*\[\][\s\S]*?for.+(?:in).+:[\s\S]*?\1\.append\s*\(/.test(code)) {
    tips.push({
      id: "list-comp",
      title: "Consider List Comprehensions",
      description: "It looks like you're initializing an empty list and appending to it in a loop. A list comprehension like `[x for x in data]` is more idiomatic and faster.",
      type: "performance"
    });
  }

  // 4. Missing open context managers
  // Catch simple `open( ... )` without `with open`
  // Assumes if `with open` is not present but `open(` is, they might be lacking `with`
  if (!/with\s+open/.test(code) && /\bopen\s*\(/.test(code)) {
    tips.push({
      id: "context-manager",
      title: "Use `with open(...)`",
      description: "You're using `open()` without a context manager. Using `with open('file.txt') as f:` ensures the file is automatically closed.",
      type: "best-practice"
    });
  }

  // 5. Check for bare excepts
  if (/except\s*:/.test(code)) {
    tips.push({
      id: "bare-except",
      title: "Avoid Bare Excepts",
      description: "A bare `except:` catches everything, including SystemExit and KeyboardInterrupt. Catch specific exceptions like `except Exception as e:` instead.",
      type: "best-practice"
    });
  }

  // Score heuristically: start at 100, subtract 10 for each tip.
  const score = Math.max(0, 100 - tips.length * 10);

  return { tips, score };
}
