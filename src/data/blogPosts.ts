export type BlogSection = {
  heading: string;
  level?: 2 | 3;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // YYYY-MM-DD
  tags: string[];
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "python-scripts-to-reliable-tools",
    title: "From Python Scripts to Reliable Tools: Structure, Testing, and CLI Design",
    description:
      "Turn one-off scripts into maintainable tools by adding structure, a CLI, logging, tests, and packaging—without overengineering.",
    publishedAt: "2026-04-06",
    tags: ["python", "testing", "cli", "architecture"],
    sections: [
      {
        heading: "Why “just a script” breaks in the real world",
        level: 2,
        paragraphs: [
          "Most Python projects start the same way: you write a quick script to solve a problem, it works for your machine, and you move on. A week later you run it again and it fails because the input format changed, a dependency updated, or you forgot which flags to use. This is normal—scripts optimize for speed of creation, not for reliability and repeatability.",
          "The good news is you rarely need a full framework to fix this. You need a small set of conventions: a predictable layout, a clear command-line interface, basic logging, and tests around the parts that are easy to get wrong. These choices help you (and future you) run the tool confidently, automate it in CI, and share it with teammates without turning it into a complicated product.",
          "In this article you’ll see a pragmatic checklist for leveling up a script. The goal is not to impress anyone with design patterns. The goal is to avoid silent failures and late-night debugging when the tool becomes important.",
        ],
      },
      {
        heading: "Step 1: Separate “pure logic” from “I/O glue”",
        level: 2,
        paragraphs: [
          "The fastest reliability win is to isolate your logic from I/O. I/O includes reading files, parsing CLI flags, making network requests, printing to the terminal, and talking to databases. Logic includes transforming data, validating assumptions, and computing results.",
          "When logic is buried inside I/O, you can’t test it without creating files or mocking half your environment. When logic is pure, you can test it with plain Python objects. You can also reuse it in a web app, a notebook, or a background job later.",
          "A simple rule: your core functions should accept values and return values. Put side effects at the edges. This makes failures clearer and reduces the number of places where bugs can hide.",
        ],
      },
      {
        heading: "Step 2: Add a CLI that teaches itself",
        level: 2,
        paragraphs: [
          "A good CLI is documentation you can run. It should have a single obvious command, helpful errors, and sensible defaults. Most people don’t remember flags—so the tool must make the correct path easy.",
          "Start with `argparse` (built-in) or `typer` (very friendly). Keep options stable, and avoid hidden behavior. If you need a config file, make it explicit and print the path you’re using. When something fails, exit with a non-zero code and a clear message that suggests the fix.",
          "The difference between a hobby script and a tool is not the number of flags; it’s how confidently someone can run it without reading the source code.",
        ],
      },
      {
        heading: "Step 3: Logging beats print—especially when debugging",
        level: 2,
        paragraphs: [
          "Print statements are fine until you need levels (info vs. warning vs. error), timestamps, or the ability to turn verbosity up and down. The standard `logging` module gives you all of that, and it works nicely with CLIs and server environments.",
          "A practical setup is to log progress at `INFO`, unexpected but recoverable issues at `WARNING`, and failures at `ERROR`. Add `--verbose` to switch to `DEBUG` when needed. This way normal runs stay clean, while debugging runs reveal detail without changing code.",
          "If your tool touches user data, be intentional about what you log. Log identifiers, counts, and validation outcomes—but avoid logging secrets, tokens, or full payloads by default.",
        ],
      },
      {
        heading: "Step 4: Tests that protect the tricky parts",
        level: 2,
        paragraphs: [
          "You don’t need perfect coverage to benefit from tests. Focus on the logic that is easy to misunderstand: parsing, validation, date handling, rounding, and edge cases like empty inputs. Those areas create the most “it worked yesterday” failures.",
          "If you use `pytest`, keep tests small and descriptive. Use parameterized tests to cover multiple cases without duplication. When a bug happens in production, add a test that reproduces it before you fix it. That turns a one-time incident into a permanent improvement.",
          "For tools that call external services, prefer testing your pure functions and validating the shape of responses. Integration tests are useful too, but they should be optional or run against a staging environment so they don’t flake.",
        ],
      },
      {
        heading: "Step 5: Packaging and distribution (when it’s worth it)",
        level: 2,
        paragraphs: [
          "Not every tool needs to be published to PyPI. But once other people depend on it, packaging becomes a productivity feature. A lightweight approach is a `pyproject.toml` with an entry point so users can run `mytool` instead of `python main.py`.",
          "Pin major dependencies, document Python versions you support, and add a `--version` flag. If your tool is internal, consider distributing it via a private package index or as a git dependency. The key is to make upgrades predictable, not painful.",
          "If you’re learning Python with PyMaster, try applying this checklist to a small project: a log cleaner, a CSV transformer, or a code formatter wrapper. You’ll learn the habits that professional Python teams use daily.",
        ],
      },
      {
        heading: "Related reading",
        level: 2,
        paragraphs: [
          "If you enjoyed this, continue with the PyMaster blog: you can start from the Blog page, or jump to the Projects page to understand how this platform itself is structured and why it was built as a learning-oriented web app.",
        ],
      },
    ],
  },
  {
    slug: "python-debugging-playbook",
    title: "A Practical Python Debugging Playbook (Without Guessing)",
    description:
      "A repeatable method for debugging Python: reproduce, reduce, observe, and fix—plus tools like `pdb`, logging, and type hints.",
    publishedAt: "2026-04-06",
    tags: ["python", "debugging", "logging", "best-practices"],
    sections: [
      {
        heading: "Debugging is a process, not a talent",
        level: 2,
        paragraphs: [
          "When code fails, many developers start guessing. They change a line, rerun, and hope. That feels fast, but it’s usually the slowest approach because it creates random outcomes and destroys the evidence you needed to understand the bug.",
          "A better approach is a playbook: reproduce the bug consistently, reduce the input until the failure is small, observe what the program is doing, and then apply the smallest fix that addresses the root cause. This makes debugging calmer and more predictable—especially under time pressure.",
          "In this guide, we’ll focus on practical steps that work for beginners and professionals alike. You can use the same method for a failing unit test, a web API returning wrong data, or a CLI tool that crashes on one customer file.",
        ],
      },
      {
        heading: "1) Reproduce the failure on demand",
        level: 2,
        paragraphs: [
          "If you cannot reproduce it, you cannot fix it reliably. Start by writing down the exact steps: the command you ran, the environment variables, the input data, and the Python version. If the bug is intermittent, look for randomness, time, or concurrency. Seed the random generator, log timestamps, and isolate background tasks.",
          "For web apps, capture the request (method, URL, headers, and body). For scripts, keep a copy of the input file that triggers the problem. Reproduction data is gold—treat it as a test case waiting to be written.",
          "Once you can reproduce, stop changing code randomly. Now your job is to shrink the problem until it becomes obvious.",
        ],
      },
      {
        heading: "2) Reduce: make the failing case as small as possible",
        level: 2,
        paragraphs: [
          "Reduction is the secret weapon. If the bug happens with a 50,000-line log file, try to extract the smallest few lines that still cause it. If the bug appears after ten user actions, try to find the smallest sequence that triggers it.",
          "This does two things: it speeds up your debug loop, and it reveals which part of the input matters. Often the reduced case points directly at the assumption that’s wrong—for example, a missing field, an unexpected unicode character, or an empty list where you expected a value.",
          "A reduced case also becomes a perfect automated test later. That’s how you prevent regressions: you capture the bug in a small, permanent example.",
        ],
      },
      {
        heading: "3) Observe: make the program explain itself",
        level: 2,
        paragraphs: [
          "There are three observation tools you should be comfortable with: logging, a debugger, and assertions. Logging tells you what path the code took. A debugger lets you inspect live state. Assertions document assumptions in code and crash early when they’re violated.",
          "Start with logging because it works everywhere. Print the shape of data, not the entire payload: lengths, keys, and a few representative values. Then use `pdb` (or your IDE debugger) to set a breakpoint at the failing line and inspect variables. Avoid stepping through every line; instead, jump to where the important state changes.",
          "Assertions help you fail earlier. If a function requires a non-empty list, assert it. If a dict must contain a key, assert it. This turns mysterious `KeyError` or `IndexError` crashes into clear messages that show what assumption failed.",
        ],
      },
      {
        heading: "4) Fix: change the smallest thing that prevents the bug",
        level: 2,
        paragraphs: [
          "Once you understand the root cause, aim for a minimal fix. Big refactors are tempting, but they introduce new risk. Apply the smallest change that makes the reduced case pass, then run the full test suite or rerun the original reproduction steps.",
          "If the fix changes behavior, update the code’s public contract: docstrings, CLI help, or user-facing text. If the bug was due to missing validation, add explicit validation. If it was due to a confusing API, consider an ergonomic wrapper rather than rewriting everything.",
          "Finally, write a test using the reduced case. A bug fixed without a test is a bug waiting to return.",
        ],
      },
      {
        heading: "5) Prevent: use types, linters, and small design rules",
        level: 2,
        paragraphs: [
          "Many bugs are preventable before runtime. Type hints catch mismatches earlier. Linters catch suspicious patterns. Small design rules—like separating I/O from logic—make code more testable and less fragile.",
          "If you’re learning, don’t treat these tools as bureaucracy. Treat them as training wheels that reduce the number of states your program can get into. Over time, you’ll internalize the habits, and debugging becomes rare and faster.",
          "On PyMaster, you can practice this playbook by writing code in the compiler, then deliberately breaking it and observing how errors appear. The goal is to build the muscle memory of calm, methodical debugging.",
        ],
      },
      {
        heading: "Next steps on PyMaster",
        level: 2,
        paragraphs: [
          "Browse more tutorials on the Blog, or open the Projects page to see how PyMaster is designed to keep content visible immediately, even before interactive features load. Those details matter for user experience and for publisher platforms like AdSense.",
        ],
      },
    ],
  },
  {
    slug: "python-data-models-dataclasses",
    title: "Python Data Models with `dataclasses`: Cleaner Code for Real Projects",
    description:
      "Learn when and how to use `dataclasses` to model data, validate inputs, and keep business logic readable in Python applications.",
    publishedAt: "2026-04-06",
    tags: ["python", "dataclasses", "clean-code", "tips"],
    sections: [
      {
        heading: "Why data models matter",
        level: 2,
        paragraphs: [
          "As soon as your Python code grows beyond a single file, data becomes your biggest source of complexity. You pass dictionaries between functions, you forget which keys exist, and small typos turn into runtime bugs. This is where data models help: they give names, structure, and intention to the information your program moves around.",
          "In many Python projects you can model data using simple classes, but writing boilerplate is annoying: `__init__`, `__repr__`, equality, and ordering. The `dataclasses` module (built into Python) solves that by generating the boring parts while letting you focus on validation and behavior.",
          "This article shows a pragmatic way to use `dataclasses` in real projects: create models that are easy to print, easy to test, and resistant to bad input.",
        ],
      },
      {
        heading: "The core idea: explicit fields, sensible defaults",
        level: 2,
        paragraphs: [
          "A dataclass is basically a class where you declare fields. Python generates an initializer and a helpful representation automatically. This means you can create objects that behave like “typed dictionaries”, but are clearer and safer.",
          "The most important habit is to pick sensible defaults. If a value can be missing, represent that explicitly with `None` and document it. If a field must exist, don’t give it a default—force the caller to provide it. This makes incorrect usage fail early.",
          "Once you have explicit fields, refactoring becomes easier. Renaming a field becomes a single mechanical change rather than a hunt for string keys across the codebase.",
        ],
      },
      {
        heading: "Validation with `__post_init__`",
        level: 2,
        paragraphs: [
          "Validation is where dataclasses shine. Use `__post_init__` to enforce invariants. For example, if `price` must be non-negative, check it. If `email` must contain `@`, validate it. If `tags` should always be a list of strings, normalize it.",
          "These checks should be small and specific. Raise `ValueError` with a message that helps the caller fix the input. This is especially valuable when your data comes from JSON, CSV files, or user input, where mistakes are common.",
          "If you need heavier validation, libraries like Pydantic exist. But for many scripts and internal tools, a few `__post_init__` checks give you 80% of the benefit with almost zero dependency overhead.",
        ],
      },
      {
        heading: "Immutability: when to freeze models",
        level: 2,
        paragraphs: [
          "By default, dataclass instances are mutable. That’s fine for many apps, but it can also hide bugs when objects are modified in unexpected places. Freezing a dataclass (`frozen=True`) makes instances immutable, which is great for configuration objects, parsed input, and values you want to treat as facts.",
          "Immutability also makes your program easier to reason about because values don’t change silently. If you need an updated value, you create a new instance, which keeps state transitions explicit.",
          "A simple guideline: freeze models that represent input and configuration; keep models mutable only when mutation is part of the domain (like an in-memory cart or a simulation).",
        ],
      },
      {
        heading: "Dataclasses + type hints = fewer surprises",
        level: 2,
        paragraphs: [
          "Dataclasses work best with type hints. Even if you don’t run a type checker, type hints act like documentation and help IDEs provide better autocomplete. When you do run a type checker, you catch a category of bugs before runtime.",
          "This matters in project-based learning because your code evolves. You start with a small feature, then add another one. Types and models keep the original feature from breaking as you iterate.",
          "If you want to practice this on PyMaster, try writing a small model for “BlogPost”, “UserProfile”, or “Problem” in the compiler, then write functions that transform those models. You’ll feel how much easier it is than passing loose dictionaries around.",
        ],
      },
      {
        heading: "Where this shows up in PyMaster",
        level: 2,
        paragraphs: [
          "PyMaster itself uses structured data for lessons, problems, and content. The same principle applies: make data shape explicit, validate inputs at boundaries, and keep transformation logic testable.",
          "For more platform details, visit the Projects page. For more Python fundamentals and patterns, continue on the Blog and follow the internal links inside each article.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug) || null;
}

