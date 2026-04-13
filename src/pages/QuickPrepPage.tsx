import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { 
  BookOpen, Brain, Briefcase, Clock3, Code2, Sparkles, Target, Terminal, 
  Database, GitBranch, Layers, Cpu, Copy, LayoutDashboard, Search, Star, StarOff
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const prepTracks = [
  {
    title: "15-Minute Warmup",
    duration: "15 min",
    description: "Wake up your Python brain with quick wins.",
    steps: [
      { label: "Read one lesson", to: "/learn", icon: BookOpen },
      { label: "Run one snippet", to: "/compiler", icon: Terminal },
      { label: "Solve one easy problem", to: "/problems", icon: Code2 },
    ],
    accent: "from-sky-500/20 via-cyan-500/10 to-transparent",
  },
  {
    title: "Interview Sprint",
    duration: "30 min",
    description: "Tight, focused practice for DSA patterns.",
    steps: [
      { label: "Review DSA patterns", to: "/dsa", icon: Brain },
      { label: "Solve two problems", to: "/problems", icon: Target },
      { label: "Test ideas fast", to: "/compiler", icon: Terminal },
    ],
    accent: "from-amber-500/20 via-orange-500/10 to-transparent",
  },
  {
    title: "Career Prep Stack",
    duration: "25 min",
    description: "Mix coding with role-focused learning.",
    steps: [
      { label: "Explore a career track", to: "/career/data-engineering", icon: Sparkles },
      { label: "Practice one problem", to: "/problems", icon: Code2 },
      { label: "Check job listings", to: "/jobs", icon: Briefcase },
    ],
    accent: "from-emerald-500/20 via-lime-500/10 to-transparent",
  },
];

const QUICK_TIPS = [
  "Daily sprints build lasting muscle memory.",
  "Check cheatsheets before interview mock rounds.",
  "Use the Linux terminal to practice file piping.",
];

interface CheatsheetCard { title: string; snippet: string; }
interface CheatsheetSection { title: string; cards: CheatsheetCard[]; }
interface TechEntry { icon: React.ElementType; color: string; sections: CheatsheetSection[]; }
type TechType = 'python' | 'sql' | 'pandas' | 'linux' | 'git';

const CARD_EXPLANATIONS: Partial<Record<TechType, Record<string, string>>> = {
  python: {
    "Variables": "Store input and values in named variables.",
    "Conditionals": "Run different logic based on conditions.",
    "Loops": "Repeat code using for and while.",
    "Functions": "Reuse logic with parameters and return values.",
    "Lists": "Mutable ordered collection with common edit methods.",
    "Tuples": "Immutable sequence useful for fixed data.",
    "Sets": "Unique values with fast union/intersection operations.",
    "Dictionaries": "Key-value storage for structured data.",
    "Comprehensions": "Build lists/dicts quickly in one expression.",
    "String Methods": "Clean and transform text efficiently.",
    "f-Strings": "Format strings with inline variables cleanly.",
    "File Operations": "Read/write files using safe context manager.",
    "JSON": "Convert between Python objects and JSON text.",
    "Try/Except": "Handle runtime errors without crashing.",
    "Classes": "Create objects with attributes and methods.",
    "Inheritance": "Reuse behavior from a parent class.",
    "Enumerate": "Access index and item while iterating.",
    "Zip": "Iterate over multiple lists together.",
    "Sorting/Lambda": "Sort complex data with custom keys.",
    "Counter/Deque": "Fast counting and queue-like operations.",
    "Two-Pointer": "Optimize array scans from both ends.",
    "Core Helpers": "Most-used built-ins for type and math checks.",
    "Convert & Create": "Convert values into core Python types.",
    "Inspect & Debug": "Inspect object capabilities and environment.",
    "Iterators": "Transform/scan collections functionally.",
    "Ordering & Slicing": "Sort, reverse, and slice sequences cleanly.",
    "Import Styles": "Common ways to import modules and symbols.",
    "Math & Random": "Numeric helpers and random sampling.",
    "Collections": "Specialized containers from standard library.",
    "Itertools": "Combinatorics and iterator utilities.",
    "Datetime": "Work with timestamps and date arithmetic.",
    "Pathlib & OS": "Handle paths and OS-level utilities.",
    "JSON & CSV": "Parse and export common data formats.",
    "Ternary": "Inline if-else assignment in one line.",
    "Swap": "Swap variable values without temp variable.",
    "Any/All": "Quickly test boolean conditions across iterables.",
    "Flatten": "Flatten nested lists using comprehension.",
  },
  pandas: {
    "Read/Write": "Load datasets and export processed results.",
    "Inspection": "Quickly inspect shape, columns, and summary stats.",
    "Memory": "Check memory usage for large DataFrames.",
    "Loc / ILOC": "Select data by labels or integer position.",
    "Conditionals": "Filter rows with boolean conditions.",
    "IsIn / Query": "Readable filtering for lists and expressions.",
    "Nulls": "Handle missing values safely.",
    "Duplicates": "Detect and remove duplicate rows.",
    "Rename / Cast": "Standardize column names and dtypes.",
    "GroupBy": "Aggregate metrics by category.",
    "Value Counts": "Count category frequencies fast.",
    "Rolling Window": "Compute moving averages over time.",
    "Pivot": "Reshape data into matrix-style summaries.",
    "Merge (Join)": "Combine DataFrames using key columns.",
    "Concat (Union)": "Stack DataFrames by rows or columns.",
    "Apply": "Run custom transformations on a Series.",
    "Melt / Unstack": "Switch between wide and long formats.",
  },
  linux: {
    "Ls Details": "List files with permissions and sizes.",
    "Pwd & Cd": "Check current path and navigate directories.",
    "Relative Cd": "Move quickly with relative shortcuts.",
    "Cat / Tail": "Print files and live-follow logs.",
    "Head / Less": "Preview large files efficiently.",
    "Copy/Move": "Copy files or rename/move paths.",
    "Mkdir/Touch": "Create folders and empty files quickly.",
    "Find Files": "Search files by name, type, or time.",
    "Tar Archive": "Compress and extract archives.",
    "Grep Search": "Search text patterns in files.",
    "Sed Replace": "Batch replace text from command line.",
    "Awk Column": "Extract and process column-based text.",
    "Sort / Uniq": "Sort lines and count duplicates.",
    "Chmod": "Change permission bits for scripts/files.",
    "Chown": "Change file owner and group.",
    "Sudo / Root": "Run privileged commands safely.",
    "User Info": "Show current user and group context.",
    "Processes": "Inspect running processes and usage.",
    "Kill": "Stop processes by PID or name.",
    "Disk Space": "Check filesystem and directory sizes.",
    "Free RAM": "View current memory usage.",
    "Curl / Wget": "Fetch URLs and download files.",
    "Ping / Trace": "Test connectivity and network route.",
    "Netstat": "Inspect open ports and listeners.",
    "SSH": "Secure remote login and file transfer.",
    "Pipes": "Chain commands for data processing.",
    "Redirect": "Write or append command output to files.",
    "Aliases": "Create shortcuts for frequent commands.",
    "History": "Reuse and search previous commands.",
  },
  sql: {
    "Inner Join": "Return only rows that match in both tables.",
    "Left Join": "Keep all left table rows; unmatched right values become NULL.",
    "Self Join": "Join a table to itself for hierarchical relationships.",
    "In / Between": "Filter using a list of values or a value range.",
    "Coalesce": "Replace NULL values with a default fallback.",
    "String Ops": "Transform and inspect text fields.",
    "Date Trunc": "Group timestamps into fixed time buckets.",
    "Intervals": "Filter relative time windows like last 30 days.",
    "CTE (With)": "Break complex queries into readable named steps.",
    "Window Sum": "Compute running totals without collapsing rows.",
    "Rank / RowNum": "Assign row order with and without tie handling.",
    "Lead / Lag": "Access previous and next row values.",
    "GroupBy": "Aggregate rows by category.",
    "Case Agg": "Do conditional aggregation in one pass.",
    "Distinct Count": "Count unique values only.",
    "Explain": "Inspect query execution plan and performance.",
    "Create Table": "Define schema with constraints and defaults.",
    "Indices": "Speed up filtering and lookup columns.",
    "Alter Table": "Change schema after table creation.",
  },
  git: {
    "Stage & Commit": "Save selected changes with a clear snapshot message.",
    "Status & Diff": "Check working tree and inspect file changes.",
    "Push / Pull": "Sync local branch with remote repository.",
    "Log / Short": "View recent commit history quickly.",
    "New Branch": "Start isolated work for a feature or fix.",
    "Switch / Delete": "Move between branches and remove merged ones.",
    "Merge": "Combine another branch into your current branch.",
    "List Branches": "Inspect local and remote branch tracking.",
    "Remote Sync": "Fetch latest remote state and URLs.",
    "Fetch & Prune": "Remove stale remote-tracking branch references.",
    "Track Remote": "Link local branch to a remote upstream.",
    "Stash": "Temporarily store local edits without committing.",
    "Rebase Main": "Replay commits on top of updated main history.",
    "Interactive": "Clean or reorder commits before sharing.",
    "Cherry Pick": "Apply specific commit(s) onto current branch.",
    "Log Graph": "Visualize commit tree and branch structure.",
    "Undo Soft": "Undo commit but keep changes staged.",
    "Undo Hard": "Reset branch and discard local changes.",
    "Revert Commit": "Create a safe undo commit for history.",
    "Reflog (Safety)": "Recover lost commit references and branch states.",
    "Global User": "Set default author identity for commits.",
    "List Config": "View active Git configuration values.",
    "Aliases": "Create shortcuts for frequent Git commands.",
    "Blame": "See who changed each line in a file.",
  },
};

const getCardExplanation = (type: TechType, title: string) => {
  const mapped = CARD_EXPLANATIONS[type]?.[title];
  if (mapped) return mapped;
  if (type === "python" || type === "pandas" || type === "linux") {
    return `Quick reference for ${title.toLowerCase()}.`;
  }
  return "";
};

const LANGUAGE_KEYWORDS: Record<TechType, string[]> = {
  python: ["def", "class", "return", "if", "elif", "else", "for", "while", "in", "try", "except", "finally", "with", "as", "import", "from", "lambda", "pass", "break", "continue", "and", "or", "not", "is", "None", "True", "False"],
  sql: ["SELECT", "FROM", "WHERE", "JOIN", "LEFT", "RIGHT", "INNER", "OUTER", "ON", "GROUP", "BY", "HAVING", "ORDER", "LIMIT", "WITH", "AS", "CASE", "WHEN", "THEN", "ELSE", "END", "COUNT", "SUM", "AVG", "MIN", "MAX", "DISTINCT", "INSERT", "UPDATE", "DELETE", "CREATE", "ALTER", "DROP"],
  pandas: ["import", "from", "as", "lambda", "for", "in", "if", "else", "and", "or", "not", "True", "False", "None"],
  linux: ["sudo", "cd", "ls", "pwd", "cat", "tail", "head", "grep", "awk", "sed", "find", "cp", "mv", "mkdir", "touch", "chmod", "chown", "kill", "top", "ssh", "scp", "curl", "wget", "echo", "alias", "history"],
  git: ["git", "add", "commit", "status", "diff", "push", "pull", "fetch", "merge", "rebase", "checkout", "branch", "log", "stash", "reset", "revert", "config", "blame", "cherry-pick", "origin", "main"],
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const highlightSnippet = (snippet: string, type: TechType) => {
  const keywordSet = new Set(LANGUAGE_KEYWORDS[type]);
  const sqlKeywordSet = new Set(LANGUAGE_KEYWORDS.sql.map((word) => word.toUpperCase()));
  const isSql = type === "sql";

  const colorWord = (word: string, nextChunk: string) => {
    const isKeyword = isSql ? sqlKeywordSet.has(word.toUpperCase()) : keywordSet.has(word);
    if (isKeyword) {
      return `<span class="text-violet-300">${escapeHtml(word)}</span>`;
    }

    if (/^\s*\(/.test(nextChunk)) {
      return `<span class="text-cyan-300">${escapeHtml(word)}</span>`;
    }

    return escapeHtml(word);
  };

  const colorLine = (line: string) => {
    let i = 0;
    let out = "";

    while (i < line.length) {
      const ch = line[i];

      if (ch === "#") {
        out += `<span class="text-emerald-400/90">${escapeHtml(line.slice(i))}</span>`;
        break;
      }

      if (ch === "'" || ch === '"') {
        const quote = ch;
        let j = i + 1;
        while (j < line.length) {
          if (line[j] === "\\" && j + 1 < line.length) {
            j += 2;
            continue;
          }
          if (line[j] === quote) {
            j += 1;
            break;
          }
          j += 1;
        }
        out += `<span class="text-yellow-300">${escapeHtml(line.slice(i, j))}</span>`;
        i = j;
        continue;
      }

      const numMatch = line.slice(i).match(/^\d+(\.\d+)?\b/);
      if (numMatch) {
        out += `<span class="text-fuchsia-300">${numMatch[0]}</span>`;
        i += numMatch[0].length;
        continue;
      }

      const idMatch = line.slice(i).match(/^[A-Za-z_]\w*/);
      if (idMatch) {
        const word = idMatch[0];
        const rest = line.slice(i + word.length);
        out += colorWord(word, rest);
        i += word.length;
        continue;
      }

      out += escapeHtml(ch);
      i += 1;
    }

    return out;
  };

  return snippet.split("\n").map(colorLine).join("\n");
};

const TECH_COLOR_CLASSES: Record<TechType, { tabActive: string; iconActive: string; badge: string }> = {
  python: {
    tabActive: "bg-blue-500/20 text-blue-300 ring-2 ring-blue-500/40 shadow-xl",
    iconActive: "text-blue-300",
    badge: "border-blue-500/30 bg-blue-500/15 text-blue-200",
  },
  sql: {
    tabActive: "bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/40 shadow-xl",
    iconActive: "text-amber-300",
    badge: "border-amber-500/30 bg-amber-500/15 text-amber-200",
  },
  pandas: {
    tabActive: "bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500/40 shadow-xl",
    iconActive: "text-emerald-300",
    badge: "border-emerald-500/30 bg-emerald-500/15 text-emerald-200",
  },
  linux: {
    tabActive: "bg-rose-500/20 text-rose-300 ring-2 ring-rose-500/40 shadow-xl",
    iconActive: "text-rose-300",
    badge: "border-rose-500/30 bg-rose-500/15 text-rose-200",
  },
  git: {
    tabActive: "bg-indigo-500/20 text-indigo-300 ring-2 ring-indigo-500/40 shadow-xl",
    iconActive: "text-indigo-300",
    badge: "border-indigo-500/30 bg-indigo-500/15 text-indigo-200",
  },
};

const TECH_DATA: Record<TechType, TechEntry> = {
  python: {
    icon: Code2,
    color: "blue",
    sections: [
      {
        title: "Python Basics",
        cards: [
          { title: "Variables", snippet: "name = input('Name: ')\nage = int(input('Age: '))\npi = 3.14\nprint(name, age, pi)" },
          { title: "Conditionals", snippet: "score = 82\nif score >= 90: print('A')\nelif score >= 75: print('B')\nelse: print('Keep going')" },
          { title: "Loops", snippet: "for i in range(5): print(i)\n\ncount = 3\nwhile count > 0:\n    count -= 1" },
          { title: "Functions", snippet: "def add(a, b=0): return a + b\n\ntotal = add(4, 7)" },
        ]
      },
      {
        title: "Collections",
        cards: [
          { title: "Lists", snippet: "nums = [2, 4, 6]\nnums.append(8)\nnums.extend([10, 12])\nnums.insert(1, 3)\nnums.remove(10)\nlast = nums.pop()\n\nnums.sort()\nnums.reverse()" },
          { title: "Tuples", snippet: "point = (2, 5, 5, 9)\nprint(point[0])\nprint(point.count(5))\nx, y, *_ = point" },
          { title: "Sets", snippet: "a = {1, 2, 3}\nb = {3, 4, 5}\na.add(7)\nprint(a | b) # union\nprint(a & b) # intersect" },
          { title: "Dictionaries", snippet: "user = {'name': 'Ana', 'xp': 120}\nuser.update({'city': 'Delhi'})\nprint(user.get('name', 'NA'))\nkeys = list(user.keys())" },
          { title: "Comprehensions", snippet: "squares = [n*n for n in range(6)]\nevens = [n for n in squares if n%2==0]\nlookup = {n: n*n for n in range(4)}" },
        ]
      },
      {
        title: "Strings & Files",
        cards: [
          { title: "String Methods", snippet: "text = '  python,api,prep  '\nprint(text.strip().lower())\nparts = text.split(',')\n'-'.join(parts)" },
          { title: "f-Strings", snippet: "name = 'Mia'; xp = 240\nprint(f'{name} has {xp} XP')" },
          { title: "File Operations", snippet: "with open('n.txt', 'w') as f:\n    f.write('hi')\nwith open('n.txt') as f:\n    print(f.read())" },
          { title: "JSON", snippet: "import json\ntext = json.dumps({'a': 1})\ndata = json.loads(text)" },
        ]
      },
      {
        title: "Errors & OOP",
        cards: [
          { title: "Try/Except", snippet: "try: v = int('42')\nexcept ValueError: v = 0\nfinally: print(v)" },
          { title: "Classes", snippet: "class User:\n    def __init__(self, n):\n        self.name = n\nu = User('Ana')" },
          { title: "Inheritance", snippet: "class Animal:\n    def speak(self): return '...'\nclass Dog(Animal):\n    def speak(self): return 'woof'" },
        ]
      },
      {
        title: "Interview Patterns",
        cards: [
          { title: "Enumerate", snippet: "for i, v in enumerate(items):\n    print(i, v)" },
          { title: "Zip", snippet: "for n, s in zip(names, scores):\n    print(n, s)" },
          { title: "Sorting/Lambda", snippet: "sorted(users, key=lambda x: x['xp'])" },
          { title: "Counter/Deque", snippet: "from collections import Counter, deque\nc = Counter('banana')\nq = deque([1, 2])" },
          { title: "Two-Pointer", snippet: "l, r = 0, len(n)-1\nwhile l < r:\n    if total < tar: l+=1\n    else: r-=1" },
        ]
      },
      {
        title: "Built-in Functions",
        cards: [
          { title: "Core Helpers", snippet: "nums = [1, 2, 3]\nprint(len(nums), sum(nums))\nprint(min(nums), max(nums))\nprint(abs(-42), round(3.14159, 2))\nprint(type(nums), isinstance(nums, list))" },
          { title: "Convert & Create", snippet: "print(int('10'), float('2.5'))\nprint(str(99), bool(1))\nprint(list('abc'))\nprint(tuple([1, 2]))\nprint(set([1, 1, 2]))\nprint(dict([('a', 1), ('b', 2)]))" },
          { title: "Inspect & Debug", snippet: "print(dir(nums))\nprint(help(list))\nprint(callable(len))\nprint(vars())\nprint(hasattr(nums, 'append'))" },
          { title: "Iterators", snippet: "pairs = list(enumerate(['a', 'b']))\nprint(pairs)\nprint(list(zip([1, 2], ['x', 'y'])))\nprint(list(map(str, [1, 2, 3])))\nprint(list(filter(lambda n: n % 2 == 0, [1, 2, 3, 4])))" },
          { title: "Ordering & Slicing", snippet: "nums = [4, 2, 8, 1]\nprint(sorted(nums))\nprint(list(reversed(nums)))\nprint(slice(1, 3))\nprint(nums[slice(1, 3)])" },
        ]
      },
      {
        title: "Imports & Standard Library",
        cards: [
          { title: "Import Styles", snippet: "import math\nimport math as m\nfrom math import sqrt, pi\nfrom collections import Counter as C\nimport os, sys" },
          { title: "Math & Random", snippet: "import math, random\nprint(math.sqrt(49), math.ceil(2.1))\nprint(math.factorial(5), math.pi)\nprint(random.randint(1, 6))\nprint(random.choice(['A', 'B', 'C']))" },
          { title: "Collections", snippet: "from collections import Counter, defaultdict, deque\nprint(Counter('banana'))\nd = defaultdict(int); d['x'] += 1\nq = deque([1, 2]); q.appendleft(0)" },
          { title: "Itertools", snippet: "from itertools import combinations, permutations\nprint(list(combinations([1, 2, 3], 2)))\nprint(list(permutations([1, 2, 3], 2)))" },
          { title: "Datetime", snippet: "from datetime import datetime, timedelta\nnow = datetime.now()\nprint(now.strftime('%Y-%m-%d %H:%M'))\nprint(now + timedelta(days=7))" },
          { title: "Pathlib & OS", snippet: "from pathlib import Path\nimport os\np = Path('data') / 'file.txt'\nprint(p.exists())\nprint(os.getcwd(), os.listdir('.'))" },
          { title: "JSON & CSV", snippet: "import json, csv\ntext = json.dumps({'a': 1})\nobj = json.loads(text)\nwith open('x.csv', newline='') as f:\n    rows = list(csv.reader(f))" },
        ]
      },
      {
        title: "Shortcuts",
        cards: [
          { title: "Ternary", snippet: "s = 'pass' if score >= 40 else 'fail'" },
          { title: "Swap", snippet: "a, b = b, a" },
          { title: "Any/All", snippet: "has_even = any(n%2==0 for n in nums)" },
          { title: "Flatten", snippet: "flat = [x for row in matrix for x in row]" },
        ]
      }
    ]
  },
  sql: {
    icon: Database,
    color: "amber",
    sections: [
      {
        title: "Joins & Filtering",
        cards: [
          { title: "Inner Join", snippet: "-- Keep only matching rows in both tables\nSELECT o.id, c.name\nFROM orders o\nJOIN customers c ON o.cid = c.id;" },
          { title: "Left Join", snippet: "-- Keep all users, profile may be NULL\nSELECT u.id, p.bio\nFROM users u\nLEFT JOIN profiles p ON u.id = p.uid;" },
          { title: "Self Join", snippet: "-- Join a table to itself (employee -> manager)\nSELECT e.name, m.name AS manager\nFROM emp e\nJOIN emp m ON e.mid = m.id;" },
          { title: "In / Between", snippet: "-- IN for list match, BETWEEN for range\nSELECT *\nFROM products\nWHERE id IN (1, 2, 3)\n   OR price BETWEEN 10 AND 50;" },
        ]
      },
      {
        title: "Strings & Dates",
        cards: [
          { title: "Coalesce", snippet: "-- Replace NULL with fallback value\nSELECT COALESCE(phone, 'N/A') AS phone\nFROM users;" },
          { title: "String Ops", snippet: "-- Clean and inspect text fields\nSELECT UPPER(name) AS name_up,\n       LENGTH(email) AS email_len,\n       SUBSTR(code, 1, 3) AS prefix\nFROM users;" },
          { title: "Date Trunc", snippet: "-- Bucket timestamps by month\nSELECT DATE_TRUNC('month', created_at) AS month_start,\n       COUNT(*)\nFROM orders\nGROUP BY 1;" },
          { title: "Intervals", snippet: "-- Last 30 days records\nSELECT *\nFROM events\nWHERE created_at > NOW() - INTERVAL '30 days';" },
        ]
      },
      {
        title: "Advanced Patterns",
        cards: [
          { title: "CTE (With)", snippet: "-- Break complex query into named step\nWITH top_users AS (\n  SELECT * FROM users WHERE xp > 500\n)\nSELECT * FROM top_users;" },
          { title: "Window Sum", snippet: "-- Running total inside each category\nSELECT cat, date,\n       SUM(val) OVER (PARTITION BY cat ORDER BY date) AS running_sum\nFROM sales;" },
          { title: "Rank / RowNum", snippet: "-- Rank ties together, row_number is always unique\nSELECT grp, score,\n       RANK() OVER (ORDER BY score DESC) AS rank_global,\n       ROW_NUMBER() OVER (PARTITION BY grp ORDER BY date) AS row_in_grp\nFROM scores;" },
          { title: "Lead / Lag", snippet: "-- Compare current row with previous/next row\nSELECT date, price,\n       LAG(price) OVER (ORDER BY date) AS prev_price,\n       LEAD(price) OVER (ORDER BY date) AS next_price\nFROM prices;" },
        ]
      },
      {
        title: "Aggregates",
        cards: [
          { title: "GroupBy", snippet: "-- Aggregate per city, then filter groups\nSELECT city, COUNT(*) AS users_count\nFROM users\nGROUP BY city\nHAVING COUNT(*) > 5;" },
          { title: "Case Agg", snippet: "-- Conditional sum in one query\nSELECT SUM(CASE WHEN status = 'paid' THEN val ELSE 0 END) AS paid_total\nFROM payments;" },
          { title: "Distinct Count", snippet: "-- Count unique users only\nSELECT COUNT(DISTINCT user_id) AS unique_users\nFROM sessions;" },
        ]
      },
      {
        title: "Performance & Schema",
        cards: [
          { title: "Explain", snippet: "-- View execution plan + runtime details\nEXPLAIN ANALYZE\nSELECT * FROM users WHERE id = 1;" },
          { title: "Create Table", snippet: "-- Basic table with constraints\nCREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  email TEXT UNIQUE NOT NULL,\n  bio TEXT DEFAULT 'User'\n);" },
          { title: "Indices", snippet: "-- Speed up lookups on filtered columns\nCREATE INDEX idx_users_email ON users(email);" },
          { title: "Alter Table", snippet: "-- Evolve schema safely over time\nALTER TABLE users ADD COLUMN age INT;\n-- DROP TABLE temp_results;  -- use with caution" },
        ]
      }
    ]
  },
  pandas: {
    icon: Layers,
    color: "emerald",
    sections: [
      {
        title: "I/O & Inspection",
        cards: [
          { title: "Read/Write", snippet: "df = pd.read_csv('data.csv')\ndf.to_excel('out.xlsx', index=False)" },
          { title: "Inspection", snippet: "print(df.head())\nprint(df.info())\nprint(df.describe())\nprint(df.columns)" },
          { title: "Memory", snippet: "# Check memory usage\nprint(df.memory_usage().sum())" },
        ]
      },
      {
        title: "Selection & Filter",
        cards: [
          { title: "Loc / ILOC", snippet: "val = df.loc[0, 'col']\nsubset = df.iloc[0:5, 1:3]" },
          { title: "Conditionals", snippet: "df[(df['age'] > 20) & (df['xp'] > 100)]" },
          { title: "IsIn / Query", snippet: "df[df['city'].isin(['A', 'B'])]\ndf.query('age > 20 and xp < 50')" },
        ]
      },
      {
        title: "Cleaning",
        cards: [
          { title: "Nulls", snippet: "df.fillna(0)\ndf.dropna(subset=['id'])\ndf.isna().sum()" },
          { title: "Duplicates", snippet: "df.drop_duplicates()\ndf.duplicated().sum()" },
          { title: "Rename / Cast", snippet: "df.rename(columns={'a': 'A'})\ndf['id'] = df['id'].astype(int)" },
        ]
      },
      {
        title: "Grouping & Stats",
        cards: [
          { title: "GroupBy", snippet: "df.groupby('cat')['val'].mean()\ndf.groupby('city').agg({'xp': 'sum', 'id': 'count'})" },
          { title: "Value Counts", snippet: "df['city'].value_counts(normalize=True)" },
          { title: "Rolling Window", snippet: "df['ma'] = df['p'].rolling(7).mean()" },
          { title: "Pivot", snippet: "df.pivot_table(index='A', columns='B', values='C')" },
        ]
      },
      {
        title: "Reshaping & Merging",
        cards: [
          { title: "Merge (Join)", snippet: "pd.merge(df1, df2, on='id', how='left')" },
          { title: "Concat (Union)", snippet: "pd.concat([df1, df2], axis=0)" },
          { title: "Apply", snippet: "df['full'] = df['n'].apply(lambda x: x.upper())" },
          { title: "Melt / Unstack", snippet: "pd.melt(df, id_vars=['A'], value_vars=['B'])\ndf.unstack(level=-1)" },
        ]
      }
    ]
  },
  linux: {
    icon: Cpu,
    color: "rose",
    sections: [
      {
        title: "Navigation & Content",
        cards: [
          { title: "Ls Details", snippet: "ls -lah" },
          { title: "Pwd & Cd", snippet: "pwd; cd /var/log" },
          { title: "Relative Cd", snippet: "cd ..; cd -; cd ~" },
          { title: "Cat / Tail", snippet: "cat f.txt; tail -f dev.log" },
          { title: "Head / Less", snippet: "head -n 20 f.txt; less f.txt" },
        ]
      },
      {
        title: "File Manipulation",
        cards: [
          { title: "Copy/Move", snippet: "cp source.txt dest.txt\nmv old.txt new.txt" },
          { title: "Mkdir/Touch", snippet: "mkdir -p a/b/c\ntouch new_file.py" },
          { title: "Find Files", snippet: "find . -name \"*.py\"\nfind /etc -type f -mtime -7" },
          { title: "Tar Archive", snippet: "tar -cvzf out.tar.gz folder/\ntar -xvzf out.tar.gz" },
        ]
      },
      {
        title: "Search & Tools",
        cards: [
          { title: "Grep Search", snippet: "grep -r \"pattern\" .\ngrep -i \"error\" log.txt" },
          { title: "Sed Replace", snippet: "sed -i 's/old/new/g' file.txt" },
          { title: "Awk Column", snippet: "awk '{print $1, $3}' file.txt" },
          { title: "Sort / Uniq", snippet: "cat list.txt | sort | uniq -c" },
        ]
      },
      {
        title: "User & Permissions",
        cards: [
          { title: "Chmod", snippet: "chmod 755 script.sh\nchmod +x script.sh" },
          { title: "Chown", snippet: "sudo chown user:group file" },
          { title: "Sudo / Root", snippet: "sudo command\nsudo -i # interactive root" },
          { title: "User Info", snippet: "whoami; groups; id" },
        ]
      },
      {
        title: "Process & Performance",
        cards: [
          { title: "Processes", snippet: "ps aux | grep node\ntop; htop" },
          { title: "Kill", snippet: "kill -9 <PID>\nkillall node" },
          { title: "Disk Space", snippet: "df -h\ndu -sh *" },
          { title: "Free RAM", snippet: "free -m" },
        ]
      },
      {
        title: "Networking",
        cards: [
          { title: "Curl / Wget", snippet: "curl -v localhost:3000\nwget http://site.com/f.zip" },
          { title: "Ping / Trace", snippet: "ping google.com\ntraceroute google.com" },
          { title: "Netstat", snippet: "netstat -tuln" },
          { title: "SSH", snippet: "ssh user@host\nscp local.txt user@host:/path" },
        ]
      },
      {
        title: "Shell Patterns",
        cards: [
          { title: "Pipes", snippet: "cat f.log | grep ERR | wc -l" },
          { title: "Redirect", snippet: "echo 'hi' > f.txt\necho 'bye' >> f.txt" },
          { title: "Aliases", snippet: "alias gs='git status'\nunalias gs" },
          { title: "History", snippet: "history | grep \"docker\"" },
        ]
      }
    ]
  },
  git: {
    icon: GitBranch,
    color: "indigo",
    sections: [
      {
        title: "Daily Flow",
        cards: [
          { title: "Stage & Commit", snippet: "git add .\ngit commit -m \"msg\"" },
          { title: "Status & Diff", snippet: "git status\ngit diff --staged" },
          { title: "Push / Pull", snippet: "git push origin main\ngit pull origin main" },
          { title: "Log / Short", snippet: "git log --oneline -n 10" },
        ]
      },
      {
        title: "Branching",
        cards: [
          { title: "New Branch", snippet: "git checkout -b feature-1" },
          { title: "Switch / Delete", snippet: "git checkout main\ngit branch -d feature-1" },
          { title: "Merge", snippet: "git merge feature-1" },
          { title: "List Branches", snippet: "git branch -a\ngit branch -vv" },
        ]
      },
      {
        title: "Collaboration",
        cards: [
          { title: "Remote Sync", snippet: "git fetch origin\ngit remote -v" },
          { title: "Fetch & Prune", snippet: "git fetch --prune" },
          { title: "Track Remote", snippet: "git branch --set-upstream-to=origin/main" },
          { title: "Stash", snippet: "git stash\ngit stash pop\ngit stash list" },
        ]
      },
      {
        title: "Advanced / Rebase",
        cards: [
          { title: "Rebase Main", snippet: "git fetch origin\ngit rebase origin/main" },
          { title: "Interactive", snippet: "git rebase -i HEAD~3" },
          { title: "Cherry Pick", snippet: "git cherry-pick <hash>" },
          { title: "Log Graph", snippet: "git log --oneline --graph --all" },
        ]
      },
      {
        title: "Debugging & Undo",
        cards: [
          { title: "Undo Soft", snippet: "git reset --soft HEAD~1" },
          { title: "Undo Hard", snippet: "git reset --hard HEAD~1" },
          { title: "Revert Commit", snippet: "git revert <hash>" },
          { title: "Reflog (Safety)", snippet: "git reflog # recovery point" },
        ]
      },
      {
        title: "Config & Utils",
        cards: [
          { title: "Global User", snippet: "git config --global user.name \"Name\"\ngit config --global user.email \"em@ail.com\"" },
          { title: "List Config", snippet: "git config --list" },
          { title: "Aliases", snippet: "git config --global alias.co checkout\ngit config --global alias.br branch" },
          { title: "Blame", snippet: "git blame file.py" },
        ]
      }
    ]
  }
};

export default function QuickPrepPage() {
  const [activeTab, setActiveTab] = useState<TechType>('python');
  const [query, setQuery] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const activeTech = TECH_DATA[activeTab];
  const activeKey = activeTab === "pandas" ? "Pandas" : activeTab;
  const sectionFilterText = query.trim().toLowerCase();
  const filteredSections = useMemo(
    () =>
      activeTech.sections
        .map((section) => ({
          ...section,
          cards: section.cards.filter((card) => {
            const matchesQuery = !sectionFilterText || `${card.title} ${card.snippet}`.toLowerCase().includes(sectionFilterText);
            const matchesFavorites = !showFavoritesOnly || favorites[`${activeTab}:${section.title}:${card.title}`];
            return matchesQuery && matchesFavorites;
          }),
        }))
        .filter((section) => section.cards.length > 0),
    [activeTech.sections, activeTab, favorites, sectionFilterText, showFavoritesOnly],
  );
  const activeTechSummary = {
    sections: filteredSections.length,
    snippets: filteredSections.reduce((total, section) => total + section.cards.length, 0),
  };
  const totalFavorites = useMemo(() => Object.values(favorites).filter(Boolean).length, [favorites]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Snippet copied!", { icon: "📋" });
  };

  const toggleFavorite = (key: string) => {
    setFavorites((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <div className="min-h-screen bg-[#0b1020] text-slate-100 selection:bg-primary/30">
      <Helmet>
        <title>Quick Prep | PyMaster Hub</title>
        <meta name="description" content="Multi-tech interview prep for Python, SQL, Pandas, Linux, and Git." />
      </Helmet>

      <section className="relative overflow-hidden border-b border-white/5 bg-[#0b1020]/50 py-16 sm:py-20">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/20 to-indigo-500/10 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="max-w-4xl flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
                <Target className="h-4 w-4" />
                Master Prep hub
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-white sm:text-6xl lg:text-7xl">
                Ready in <span className="text-primary italic font-serif">Minutes</span>.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl font-medium">
                High-yield patterns for <span className="text-white">Python</span>, <span className="text-white">SQL</span>, <span className="text-white">Data</span>, and <span className="text-white">System Ops</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* --- STATS OVERVIEW --- */}
        <div className="mb-10 flex flex-wrap gap-4 items-center justify-center sm:justify-start">
           <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md shadow-xl">
              <Code2 className="h-5 w-5 text-blue-400" />
              <div>
                 <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Coverage</div>
                 <div className="text-xl font-bold text-white tracking-tight">Full Hub</div>
              </div>
           </div>
           <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md shadow-xl">
              <Brain className="h-5 w-5 text-amber-400" />
              <div>
                 <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Readiness</div>
                 <div className="text-xl font-bold text-white tracking-tight">High Yield</div>
              </div>
           </div>
        </div>

        {/* --- PREP TRACKS --- */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {prepTracks.map((track, idx) => (
            <motion.div
              key={track.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`group relative rounded-[2rem] border border-white/5 bg-slate-900/40 p-1 overflow-hidden transition-all hover:border-white/10 hover:shadow-2xl`}
            >
              <div className={`p-6 space-y-6`}>
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/5 shadow-inner">
                    <Clock3 className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">{track.duration}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">{track.title}</h2>
                  <p className="text-lg text-slate-400 leading-relaxed">{track.description}</p>
                </div>
                
                <div className="space-y-2">
                   {track.steps.map((step) => {
                     const StepIcon = step.icon;
                     return (
                        <Link 
                          key={step.label} 
                          to={step.to}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.08] transition-all group/step"
                        >
                          <StepIcon className="h-4 w-4 text-slate-500 group-hover/step:text-primary" />
                          <span className="text-base font-bold text-slate-300">{step.label}</span>
                        </Link>
                     );
                   })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mb-10 space-y-4">
          <div className="flex items-center gap-2 text-slate-500">
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Tech Selection</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-slate-900/80 border border-white/5 backdrop-blur-md">
            {Object.entries(TECH_DATA).map(([key, data]: [string, TechEntry]) => {
              const Icon = data.icon;
              const isActive = activeTab === key;
              const palette = TECH_COLOR_CLASSES[key as TechType];
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as TechType)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl text-base font-bold transition-all duration-300 ${
                    isActive 
                      ? palette.tabActive
                      : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? palette.iconActive : ""}`} />
                  <span className="capitalize">{key === 'pandas' ? 'Pandas' : key}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold uppercase tracking-wider ${TECH_COLOR_CLASSES[activeTab].badge}`}>
            {activeKey} focus
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm font-medium text-slate-300">
            {activeTechSummary.sections} sections
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm font-medium text-slate-300">
            {activeTechSummary.snippets} snippets
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm font-medium text-slate-300">
            {totalFavorites} favorites
          </span>
        </div>

        <div className="mb-8 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-base text-slate-300">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${activeKey} snippets...`}
              className="w-full bg-transparent text-base text-slate-200 outline-none placeholder:text-slate-500"
            />
          </label>
          <Button
            type="button"
            variant="outline"
            className={`border-white/10 ${showFavoritesOnly ? "bg-white/10 text-white" : "bg-transparent text-slate-300"}`}
            onClick={() => setShowFavoritesOnly((value) => !value)}
          >
            {showFavoritesOnly ? <StarOff className="mr-2 h-4 w-4" /> : <Star className="mr-2 h-4 w-4" />}
            {showFavoritesOnly ? "Show All" : "Favorites"}
          </Button>
          <Button type="button" variant="outline" className="border-white/10 text-slate-300" onClick={() => setQuery("")}>
            Reset
          </Button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            {filteredSections.map((section: CheatsheetSection) => (
              <div key={section.title} className="space-y-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-base font-black tracking-widest text-slate-400 uppercase">{section.title}</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                <div className="grid gap-4 grid-cols-1">
                  {section.cards.map((card: CheatsheetCard) => (
                    (() => {
                      const favoriteKey = `${activeTab}:${section.title}:${card.title}`;
                      const isFavorite = Boolean(favorites[favoriteKey]);
                      return (
                    <div
                      key={card.title}
                      className="group relative rounded-[1.5rem] border border-white/5 bg-slate-900/40 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:bg-slate-900/60 hover:shadow-2xl hover:shadow-primary/10"
                    >
                      <div className="mb-4 flex items-center justify-between">
                         <h4 className="text-base font-bold text-slate-100">{card.title}</h4>
                         <div className="flex items-center gap-1.5">
                           <button
                            onClick={() => toggleFavorite(favoriteKey)}
                            className={`p-1.5 rounded-lg border transition-all ${isFavorite ? "border-primary/40 bg-primary/20 text-primary" : "border-white/10 bg-white/5 text-slate-400 hover:text-primary"}`}
                           >
                             <Star className="h-4 w-4" />
                           </button>
                           <button 
                            onClick={() => copyToClipboard(card.snippet)}
                            className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-primary transition-all md:opacity-0 md:group-hover:opacity-100"
                           >
                             <Copy className="h-4 w-4" />
                           </button>
                         </div>
                      </div>
                      {getCardExplanation(activeTab, card.title) && (
                        <p className="mb-4 text-sm text-slate-400 leading-relaxed">
                          {getCardExplanation(activeTab, card.title)}
                        </p>
                      )}
                      
                      {/* --- TERMINAL WRAPPER FOR LINUX --- */}
                      <div className={`rounded-xl overflow-hidden shadow-xl ${activeTab === 'linux' ? 'ring-1 ring-white/10' : ''}`}>
                        {activeTab === 'linux' && (
                          <div className="bg-[#1e1e1e] px-3 py-1.5 border-b border-white/5 flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-rose-500" />
                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          </div>
                        )}
                        <div className="bg-[#060b16] p-4 ring-1 ring-inset ring-indigo-400/30">
                          <pre className="overflow-x-auto text-[15px] sm:text-base font-mono text-blue-100 whitespace-pre selection:bg-fuchsia-500/30 leading-7 not-italic">
                            <code
                              dangerouslySetInnerHTML={{
                                __html: `${activeTab === 'linux' ? '<span class="text-emerald-300 font-semibold mr-1.5">$</span>' : ''}${highlightSnippet(card.snippet, activeTab)}`
                              }}
                            />
                          </pre>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
                        <span className="text-sm font-semibold text-slate-400 tracking-wide">High Yield Pattern</span>
                      </div>
                    </div>
                      );
                    })()
                  ))}
                </div>
              </div>
            ))}
            {filteredSections.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center">
                <p className="text-slate-300">No snippets match your current filters.</p>
                <p className="mt-1 text-base text-slate-500">Try a broader search or turn off favorites-only mode.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <section className="mt-20">
           <div className="rounded-[3rem] bg-gradient-to-br from-primary/10 via-slate-900 to-slate-950 p-10 sm:p-16 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                 <Sparkles className="h-48 w-48 text-primary" />
              </div>
              <div className="relative space-y-12">
                 <div className="space-y-4">
                    <h2 className="text-4xl font-black text-white tracking-tighter">Quick Rules for Mastery</h2>
                    <p className="max-w-xl text-lg text-slate-400 leading-relaxed">Apply these simple principles to your daily prep to level up fast.</p>
                 </div>
                 
                 <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {QUICK_TIPS.map((tip, i) => (
                       <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 ring-1 ring-inset ring-white/[0.01]">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary font-bold text-lg border border-primary/20">
                             {i + 1}
                          </div>
                          <p className="text-base font-medium text-slate-300 leading-relaxed">{tip}</p>
                       </div>
                    ))}
                 </div>

                 <div className="pt-4">
                    <Button asChild className="rounded-2xl h-14 px-10 text-xl font-bold shadow-xl shadow-primary/20">
                       <Link to="/compiler" className="flex items-center gap-3">
                          Go to Compiler <Terminal className="h-5 w-5" />
                       </Link>
                    </Button>
                 </div>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
}
