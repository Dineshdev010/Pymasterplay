/**
 * PyBrainUtils - Rule-based Python code analysis for "Pro Tips"
 */

export interface PyBrainTip {
  id: string;
  title: string;
  description: string;
  suggestion: string;
  pattern: string;
}

const TIPS: PyBrainTip[] = [
  {
    id: "list-comp",
    title: "Use List Comprehension",
    description: "You're building a list using a for loop and append. Python's list comprehensions are faster and more readable.",
    suggestion: "new_list = [item for item in iterable if condition]",
    pattern: "append\\("
  },
  {
    id: "f-strings",
    title: "Modern F-Strings",
    description: "Using old-style formatting or concatenation? F-strings (Python 3.6+) are the modern way to format strings.",
    suggestion: "print(f\"Hello {name}\")",
    pattern: "%s|\\.format\\("
  },
  {
    id: "enumerate",
    title: "Use enumerate()",
    description: "Instead of tracking a manual index variable, use enumerate() to get both index and value at once.",
    suggestion: "for i, val in enumerate(my_list):",
    pattern: "range\\(len\\("
  },
  {
    id: "with-open",
    title: "Context Managers (with)",
    description: "Always use the 'with' statement when opening files to ensure they are closed properly even if an error occurs.",
    suggestion: "with open('file.txt') as f:",
    pattern: "= open\\("
  },
  {
    id: "docstrings",
    title: "Add Docstrings",
    description: "Your functions should have docstrings to explain what they do. It's a hallmark of professional Python code.",
    suggestion: "def my_func():\n    \"\"\"Docstring goes here.\"\"\"",
    pattern: "def "
  }
];

export function analyzeCode(code: string): PyBrainTip[] {
  const foundTips: PyBrainTip[] = [];
  
  TIPS.forEach(tip => {
    const regex = new RegExp(tip.pattern, "g");
    if (regex.test(code)) {
      // For some tips, we want to be more specific or avoid false positives
      if (tip.id === "docstrings" && code.includes("\"\"\"")) return;
      if (tip.id === "with-open" && code.includes("with open")) return;
      
      foundTips.push(tip);
    }
  });

  return foundTips;
}
