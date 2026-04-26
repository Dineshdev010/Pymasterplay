export interface Exercise {
  prompt: string;
  starterCode: string;
  expectedOutput: string;
  hint?: string;
  solution?: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  codeExample: string;
  translations?: Partial<
    Record<
      "tamil" | "kannada" | "telugu" | "hindi",
      {
        title?: string;
        description?: string;
        content?: string;
        codeExample?: string;
        category?: string;
      }
    >
  >;
  exercises: {
    beginner: Exercise;
    intermediate: Exercise;
    advanced: Exercise;
  };
}

export const lessons: Lesson[] = [
  // ═══════════════════════════════════════
  // BEGINNER
  // ═══════════════════════════════════════
  {
    id: "fundamentals",
    title: "Python Fundamentals",
    category: "Beginner",
    description: "Learn the basics of Python programming language",
    content: `## What is Python?\n\nPython is a high-level, interpreted programming language known for its simplicity and readability. Created by Guido van Rossum in 1991.\n\n### Key Features\n- **Easy to learn** — Clean syntax close to natural language\n- **Versatile** — Web dev, data science, AI, automation\n- **Large ecosystem** — Thousands of packages on PyPI\n- **Cross-platform** — Runs on Windows, macOS, Linux\n\n### Your First Python Program\n\nThe classic "Hello, World!" program:`,
    codeExample: `# Your first Python program\nprint("Hello, World!")\n\n# Python is dynamically typed\nname = "PyMaster"\nprint(f"Welcome to {name}!")\n\n# Comments start with #\n# This is a single-line comment\n\nif True:\n    print("Indentation matters in Python!")`,
    translations: {
      tamil: {
        title: "Python அடிப்படைகள்",
        category: "தொடக்கநிலை",
        description: "Python நிரலாக்க மொழியின் அடிப்படைகளை கற்றுக்கொள்ளுங்கள்",
        content: `## Python என்றால் என்ன?\n\nPython என்பது எளிமை மற்றும் வாசிப்புத்திறனால் பிரபலமான ஒரு உயர் நிலை, interpreter அடிப்படையிலான நிரலாக்க மொழி. இதை Guido van Rossum 1991-ல் உருவாக்கினார்.\n\n### முக்கிய அம்சங்கள்\n- **கற்க எளிது** — இயல்பான மொழியைப் போல சுத்தமான syntax\n- **பல்துறை** — Web development, Data science, AI, Automation\n- **பெரிய சூழல்** — PyPI-ல் ஆயிரக்கணக்கான packages\n- **அனைத்து தளங்களிலும் இயங்கும்** — Windows, macOS, Linux\n\n### உங்கள் முதல் Python நிரல்\n\nபழமையான "Hello, World!" நிரல்:`,
      },
      kannada: {
        title: "Python ಮೂಲಭಾಗಗಳು",
        category: "ಆರಂಭಿಕ",
        description: "Python ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಭಾಷೆಯ ಮೂಲಭಾಗಗಳನ್ನು ಕಲಿಯಿರಿ",
        content: `## Python ಎಂದರೇನು?\n\nPython ಸರಳತೆ ಮತ್ತು ಓದಲು ಸುಲಭವಾದ ರೂಪಕ್ಕಾಗಿ ಪ್ರಸಿದ್ಧವಾದ high-level, interpreted ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಭಾಷೆ. Guido van Rossum ಅವರು 1991ರಲ್ಲಿ ರಚಿಸಿದರು.\n\n### ಮುಖ್ಯ ವೈಶಿಷ್ಟ್ಯಗಳು\n- **ಕಲಿಯಲು ಸುಲಭ** — ನೈಸರ್ಗಿಕ ಭಾಷೆಯಂತಿರುವ ಸರಳ syntax\n- **ಬಹುಮುಖ** — Web development, Data science, AI, Automation\n- **ದೊಡ್ಡ ಪರಿಸರ ವ್ಯವಸ್ಥೆ** — PyPIಯಲ್ಲಿ ಸಾವಿರಾರು packages\n- **Cross-platform** — Windows, macOS, Linuxನಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ\n\n### ನಿಮ್ಮ ಮೊದಲ Python ಪ್ರೋಗ್ರಾಂ\n\nಪ್ರಸಿದ್ಧ "Hello, World!" ಪ್ರೋಗ್ರಾಂ:`,
      },
      telugu: {
        title: "Python మూలాలు",
        category: "ప్రారంభ స్థాయి",
        description: "Python ప్రోగ్రామింగ్ భాష యొక్క ప్రాథమికాలను నేర్చుకోండి",
        content: `## Python అంటే ఏమిటి?\n\nPython అనేది సరళత మరియు చదవడానికి సులభత కోసం ప్రసిద్ధి చెందిన high-level, interpreted ప్రోగ్రామింగ్ భాష. దీనిని Guido van Rossum 1991లో రూపొందించారు.\n\n### ముఖ్య లక్షణాలు\n- **నేర్చుకోవడం సులభం** — సహజ భాషలా కనిపించే క్లియర్ syntax\n- **బహుముఖ ఉపయోగం** — Web development, Data science, AI, Automation\n- **విపుల ecosystem** — PyPIలో వేలాది packages\n- **Cross-platform** — Windows, macOS, Linuxలో పనిచేస్తుంది\n\n### మీ మొదటి Python ప్రోగ్రామ్\n\nసాధారణ "Hello, World!" ప్రోగ్రామ్:`,
      },
      hindi: {
        title: "Python की मूल बातें",
        category: "शुरुआती",
        description: "Python प्रोग्रामिंग भाषा की बुनियादी बातें सीखें",
        content: `## Python क्या है?\n\nPython एक high-level, interpreted प्रोग्रामिंग भाषा है जो अपनी सादगी और readability के लिए जानी जाती है। इसे Guido van Rossum ने 1991 में बनाया।\n\n### मुख्य विशेषताएं\n- **सीखना आसान** — प्राकृतिक भाषा जैसा साफ syntax\n- **बहुउपयोगी** — Web development, Data science, AI, Automation\n- **बड़ा ecosystem** — PyPI पर हजारों packages\n- **Cross-platform** — Windows, macOS, Linux पर चलता है\n\n### आपका पहला Python प्रोग्राम\n\nक्लासिक "Hello, World!" प्रोग्राम:`,
      },
    },
    exercises: {
      beginner: {
        prompt: "Create a variable `name = 'Alice'`. Add a single-line comment, then print 'Hello, Alice' using an f-string.",
        starterCode: `# Add a comment and create the variable\n\n# Print the greeting\n`,
        expectedOutput: "Hello, Alice",
      },
      intermediate: {
        prompt: "Print 'Python is dynamically typed'. On the next line, assign the number 42 to a variable `x` and print `x`.",
        starterCode: `# Print the string\n\n# Assign 42 to x and print it\n`,
        expectedOutput: "Python is dynamically typed\n42",
      },
      advanced: {
        prompt: "Write an `if True:` statement with proper indentation. Inside the block, print 'Indentation matters!'.",
        starterCode: `# Write the if block below\n`,
        expectedOutput: "Indentation matters!",
      },
    },
  },
  {
    id: "variables",
    title: "Variables & Data Types",
    category: "Beginner",
    description: "Understanding Python's type system and variable assignment",
    content: `## Variables in Python\n\nA variable is a named container for a value. Think of it like a labeled box: the label is the variable name and the value is what you store inside.\n\nExample:\n- \`name = "Asha"\`\n- \`age = 21\`\n\nPython is dynamically typed, so you do not write the type while creating the variable. Python automatically understands it from the value.\n\n### Data Types You Must Know\n- **int** — Whole numbers, example: \`42\`\n- **float** — Decimal numbers, example: \`3.14\`\n- **str** — Text data, example: \`"hello"\`\n- **bool** — Logical values: \`True\` or \`False\`\n- **NoneType** — No value yet, written as \`None\`\n\n### How To Use Each Type\n- Use **int** for counting items, age, score, rank, and indexes.\n- Use **float** for measurements, percentages, and prices with decimals.\n- Use **str** for names, messages, labels, and any text input.\n- Use **bool** for checks and decisions, like \`is_logged_in\` or \`is_valid\`.\n- Use **None** when a value is optional or not available yet.\n\n### Type Conversion (Important)\nSometimes values come in as text and you need to convert them:\n- \`int("42")\` gives \`42\`\n- \`float("3.5")\` gives \`3.5\`\n- \`str(123)\` gives \`"123"\`\n- \`bool(0)\` gives \`False\`, \`bool(1)\` gives \`True\`\n\n### Common Beginner Mistakes\n- Trying to add text and number directly: \`"Age: " + 21\` (error)\n- Forgetting quotes for strings\n- Assuming \`"42"\` and \`42\` are the same type\n- Comparing with wrong type, like \`"10" > 2\`\n\n### Quick Practice Idea\nCreate one variable of each type, print the value, and print \`type(variable)\` so you can see the real type.`,
    codeExample: `# Variables and data types\nage = 25              # int\npi = 3.14159          # float\nname = "Python"       # str\nis_fun = True         # bool\n\nprint(type(age))      # <class 'int'>\nprint(f"{name} is {age} years old")`,
    translations: {
      tamil: {
        title: "மாறிகள் & தரவு வகைகள்",
        category: "தொடக்கநிலை",
        description: "Python இன் type system மற்றும் variable assignment ஐ புரிந்துகொள்ளுங்கள்",
      },
      kannada: {
        title: "ಚರಗಳು ಮತ್ತು ಡೇಟಾ ಪ್ರಕಾರಗಳು",
        category: "ಆರಂಭಿಕ",
        description: "Python type system ಮತ್ತು variable assignment ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ",
      },
      telugu: {
        title: "వేరియబుల్స్ & డేటా టైప్స్",
        category: "ప్రారంభ స్థాయి",
        description: "Python type system మరియు variable assignment ను అర్థం చేసుకోండి",
      },
      hindi: {
        title: "वेरिएबल्स और डेटा टाइप्स",
        category: "शुरुआती",
        description: "Python के type system और variable assignment को समझें",
      },
    },
    exercises: {
      beginner: {
        prompt: "Create an int `age=25` and a str `name='Bob'`. Print their types using `type()` on separate lines.",
        starterCode: `# Create variables and print their types\n`,
        expectedOutput: "<class 'int'>\n<class 'str'>",
      },
      intermediate: {
        prompt: "Create a float `pi=3.14` and a bool `is_valid=True`. Convert the float to an int using `int()` and print it, then print `is_valid`.",
        starterCode: `# Create variables, convert float to int, and print\n`,
        expectedOutput: "3\nTrue",
      },
      advanced: {
        prompt: "Given string '100', convert it to an int, add 50. Then create a variable `x = None`. Print the sum, then print `x`.",
        starterCode: `num_str = "100"\n\n# Convert, add, and print sum\n# Set x to None and print\n`,
        expectedOutput: "150\nNone",
      },
    },
  },
  {
    id: "strings",
    title: "Strings & String Methods",
    category: "Beginner",
    description: "Master string manipulation and formatting",
    content: `## Strings in Python\n\nStrings are sequences of characters. They are immutable.\n\n### Common Methods\n- \`.upper()\`, \`.lower()\`, \`.title()\`\n- \`.strip()\`, \`.split()\`, \`.join()\`\n- \`.find()\`, \`.replace()\`, \`.count()\`\n- \`.startswith()\`, \`.endswith()\`\n\n### Slicing\n\`s[start:stop:step]\``,
    codeExample: `text = "Hello, Python World!"\nprint(text.upper())\nprint(text.lower())\nprint(text[7:13])     # Python\nprint(text[::-1])     # Reverse\nprint(" ".join(["Python", "is", "awesome"]))`,
    translations: {
      tamil: {
        title: "Strings & String Methods",
        category: "தொடக்கநிலை",
        description: "String manipulation மற்றும் formatting திறன்களை கற்றுக்கொள்ளுங்கள்",
      },
      kannada: {
        title: "Strings ಮತ್ತು String Methods",
        category: "ಆರಂಭಿಕ",
        description: "String manipulation ಮತ್ತು formatting ಅನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ",
      },
      telugu: {
        title: "Strings & String Methods",
        category: "ప్రారంభ స్థాయి",
        description: "String manipulation మరియు formatting నేర్చుకోండి",
      },
      hindi: {
        title: "Strings और String Methods",
        category: "शुरुआती",
        description: "String manipulation और formatting में महारत हासिल करें",
      },
    },
    exercises: {
      beginner: {
        prompt: "Given text='  Hello World  ', strip the whitespace, convert it to upper case, and print it.",
        starterCode: `text = "  Hello World  "\n\n# Strip, uppercase, and print\n`,
        expectedOutput: "HELLO WORLD",
      },
      intermediate: {
        prompt: "Given sentence='Python is great', replace 'great' with 'awesome', then use slicing [0:6] to print just 'Python'.",
        starterCode: `sentence = "Python is great"\n\n# Replace, slice, and print\n`,
        expectedOutput: "Python",
      },
      advanced: {
        prompt: "Given words=['a', 'b', 'c'], join them with '-', then use .find('-') to locate the first dash and print the index.",
        starterCode: `words = ["a", "b", "c"]\n\n# Join, find '-', and print index\n`,
        expectedOutput: "1",
      },
    },
  },
  {
    id: "input-output",
    title: "Input & Output",
    category: "Beginner",
    description: "Handle user input and formatted output",
    content: `## Input and Output\n\n### print() options\n- \`sep\` — separator between values\n- \`end\` — end character\n\n### Formatting\n- f-strings: \`f"value: {x}"\`\n- Format specs: \`f"{pi:.2f}"\``,
    codeExample: `print("Hello", "World", sep=", ")\npi = 3.14159\nprint(f"Pi: {pi:.2f}")\nprint(f"{'center':^20}")`,
    exercises: {
      beginner: {
        prompt: "Print 'Apple', 'Banana', 'Cherry' separated by a comma and a space using the `sep` parameter.",
        starterCode: `# Print using sep=', '\n`,
        expectedOutput: "Apple, Banana, Cherry",
      },
      intermediate: {
        prompt: "Given price=49.99, use an f-string to print 'Total: $49.99' and use `end='!'` in the print statement.",
        starterCode: `price = 49.99\n\n# Print with f-string and end='!'\n`,
        expectedOutput: "Total: $49.99!",
      },
      advanced: {
        prompt: "Given pi=3.14159, use f-string formatting to print it rounded to 2 decimal places.",
        starterCode: `pi = 3.14159\n\n# Print rounded pi using format specifier\n`,
        expectedOutput: "3.14",
      },
    },
  },
  {
    id: "control-flow",
    title: "Control Flow (if/elif/else)",
    category: "Beginner",
    description: "Master conditional statements and logical operators",
    content: `## Control Flow\n\nPython uses indentation for code blocks.\n\n### Comparison Operators\n\`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`\n\n### Logical Operators\n\`and\`, \`or\`, \`not\`\n\n### Ternary\n\`value_if_true if condition else value_if_false\``,
    codeExample: `score = 85\nif score >= 90: grade = "A"\nelif score >= 80: grade = "B"\nelif score >= 70: grade = "C"\nelse: grade = "F"\nprint(f"Grade: {grade}")\n\nstatus = "pass" if score >= 60 else "fail"`,
    exercises: {
      beginner: {
        prompt: "Use an `if/else` block. If `score = 85` is `>= 50`, print 'Pass', else print 'Fail'.",
        starterCode: `score = 85\n\n# Write if/else block\n`,
        expectedOutput: "Pass",
      },
      intermediate: {
        prompt: "Use logical operators: If `age = 20` is `>= 18` AND `is_citizen = True`, print 'Can vote'.",
        starterCode: `age = 20\nis_citizen = True\n\n# Write if block with AND\n`,
        expectedOutput: "Can vote",
      },
      advanced: {
        prompt: "Use a ternary operator to assign 'Adult' if `age=20` is `>= 18`, else 'Minor' to a variable `status`, and print it.",
        starterCode: `age = 20\n\n# Use ternary and print status\n`,
        expectedOutput: "Adult",
      },
    },
  },
  {
    id: "loops",
    title: "Loops (for & while)",
    category: "Beginner",
    description: "Iterate with for and while loops",
    content: `## Loops in Python\n\n### for loop\nIterates over a sequence.\n\n### while loop\nRepeats while condition is True.\n\n### Loop Control\n- \`break\` — Exit loop\n- \`continue\` — Skip iteration\n\n### range()\n\`range(stop)\`, \`range(start, stop)\`, \`range(start, stop, step)\``,
    codeExample: `for i in range(5):\n    print(i)\n\nsquares = [x**2 for x in range(10)]\nprint(squares)\n\nfor i, fruit in enumerate(["apple", "banana"]):\n    print(f"{i}: {fruit}")`,
    exercises: {
      beginner: {
        prompt: "Use a `while` loop starting at `i=1`. Print `i`, increment by 1, and `break` when `i == 3`.",
        starterCode: `i = 1\n\n# Write while loop with break\n`,
        expectedOutput: "1\n2",
      },
      intermediate: {
        prompt: "Use a `for` loop with `range(1, 4)`. Use `continue` to skip `2`. Print the rest.",
        starterCode: `# Write for loop with continue\n`,
        expectedOutput: "1\n3",
      },
      advanced: {
        prompt: "Iterate over `['A', 'B']` using `enumerate()`. Print the index and value on the same line (e.g., `0 A`).",
        starterCode: `items = ['A', 'B']\n\n# Use enumerate in a for loop\n`,
        expectedOutput: "0 A\n1 B",
      },
    },
  },
  {
    id: "numbers-math",
    title: "Numbers & Math Operations",
    category: "Beginner",
    description: "Arithmetic, math module, and number manipulation",
    content: `## Numbers in Python\n\n### Arithmetic Operators\n\`+\`, \`-\`, \`*\`, \`/\`, \`//\` (floor), \`%\` (mod), \`**\` (power)\n\n### math Module\n\`sqrt\`, \`ceil\`, \`floor\`, \`factorial\`, \`pi\`, \`gcd\``,
    codeExample: `import math\nprint(10 // 3)    # 3\nprint(10 ** 3)    # 1000\nprint(math.sqrt(16))   # 4.0\nprint(math.factorial(5))  # 120`,
    exercises: {
      beginner: {
        prompt: "Given `x = 10` and `y = 3`, print the floor division (`//`), then print the modulo (`%`).",
        starterCode: `x = 10\ny = 3\n\n# Print floor division and modulo\n`,
        expectedOutput: "3\n1",
      },
      intermediate: {
        prompt: "Given `x = 17`. Use `math.sqrt()`, then wrap that result in `math.ceil()`. Print the final number.",
        starterCode: `import math\n\nx = 17\n# Calculate and print ceiling of sqrt\n`,
        expectedOutput: "5",
      },
      advanced: {
        prompt: "Calculate the factorial of 4 using `math.factorial()`. Then raise that result to the power of 2 (`**`). Print it.",
        starterCode: `import math\n\n# Calculate factorial, square it, and print\n`,
        expectedOutput: "576",
      },
    },
  },

  // ═══════════════════════════════════════
  {
    id: "operators-expressions",
    title: "Operators & Expressions",
    category: "Beginner",
    description: "Understand arithmetic, comparison, assignment, and how expressions produce values",
    content: `## Operators & Expressions\n\nOperators tell Python to do work with values.\n\n### Arithmetic operators\n- \`+\` add\n- \`-\` subtract\n- \`*\` multiply\n- \`/\` divide\n- \`//\` floor divide\n- \`%\` remainder\n- \`**\` power\n\n### Comparison operators\n- \`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`\n\n### Assignment operators\n- \`=\`\n- \`+=\`, \`-=\`, \`*=\`\n\n### Crystal-clear rule\nAn expression is any code that becomes a value. \`2 + 3\` becomes \`5\`. \`age >= 18\` becomes \`True\`.`,
    codeExample: `a = 10\nb = 3\n\nprint(a + b)\nprint(a - b)\nprint(a * b)\nprint(a / b)\nprint(a // b)\nprint(a % b)\nprint(a ** b)\n\nscore = 50\nscore += 10\nprint(score)\nprint(score >= 60)`,
    exercises: {
      beginner: {
        prompt: "Given `score = 10`, use `+=` to add 5. Then print the boolean result of `score == 15`.",
        starterCode: `score = 10\n\n# Use += and print comparison\n`,
        expectedOutput: "True",
      },
      intermediate: {
        prompt: "Given `pts = 4`. Use `*=` to multiply it by 3. Then print the result of `pts >= 10`.",
        starterCode: `pts = 4\n\n# Use *= and print comparison\n`,
        expectedOutput: "True",
      },
      advanced: {
        prompt: "Given `a = 7` and `b = 7`. Print the result of `a == b` on one line, and `a != b` on the next line.",
        starterCode: `a = 7\nb = 7\n\n# Print == and != results\n`,
        expectedOutput: "True\nFalse",
      },
    },
  },
  {
    id: "indexing-slicing",
    title: "Indexing & Slicing",
    category: "Beginner",
    description: "Access characters and items by position in strings and lists",
    content: `## Indexing & Slicing\n\nPython lets you access items by position.\n\n### Indexing\n- First item is index \`0\`\n- Last item can be accessed with negative indexes like \`-1\`\n\n### Slicing\n- \`items[start:stop]\` gets part of a sequence\n- The stop position is not included\n- \`items[::-1]\` is a simple way to reverse\n\n### Why beginners must master this\nIndexing and slicing appear in strings, lists, loops, validation, and many real interview questions.`,
    codeExample: `word = "Python"\nprint(word[0])\nprint(word[-1])\nprint(word[1:4])\nprint(word[::-1])\n\nnums = [10, 20, 30, 40, 50]\nprint(nums[2])\nprint(nums[:3])`,
    exercises: {
      beginner: {
        prompt: "Given `word = 'Python'`, print the first character `[0]`, then print the last character `[-1]` on a new line.",
        starterCode: `word = "Python"\n\n# Print first and last characters\n`,
        expectedOutput: "P\nn",
      },
      intermediate: {
        prompt: "Given `nums = [10, 20, 30, 40]`, use slicing `[1:3]` to extract and print `[20, 30]`.",
        starterCode: `nums = [10, 20, 30, 40]\n\n# Use slicing to print [20, 30]\n`,
        expectedOutput: "[20, 30]",
      },
      advanced: {
        prompt: "Given `text = 'level'`, use `[::-1]` to reverse it, and print if the reversed string equals the original string (`True`/`False`).",
        starterCode: `text = "level"\n\n# Reverse and print equality check\n`,
        expectedOutput: "True",
      },
    },
  },
  {
    id: "lists-basics",
    title: "Lists & List Basics",
    category: "Beginner",
    description: "Store many values in one place and update them easily",
    content: `## Lists\n\nA list is an ordered, changeable collection.\n\n### What beginners should know\n- Lists use square brackets: \`[]\`\n- Items can be read by index\n- Lists can be changed after creation\n- Common tools are \`.append()\`, \`.remove()\`, and \`len()\`\n\n### Real-world use\nUse lists for marks, names, tasks, products, scores, and any group of related values.`,
    codeExample: `fruits = ["apple", "banana", "mango"]\nprint(fruits[0])\n\nfruits.append("orange")\nprint(fruits)\n\nfruits.remove("banana")\nprint(fruits)\nprint(len(fruits))`,
    exercises: {
      beginner: {
        prompt: "Create a list `['A', 'B']`. Use `.append('C')`, then print the list.",
        starterCode: `# Create list, append 'C', print\n`,
        expectedOutput: "['A', 'B', 'C']",
      },
      intermediate: {
        prompt: "Given `items = ['X', 'Y', 'Z']`, use `.remove('Y')`. Print the `len()` of the list, then print the list.",
        starterCode: `items = ['X', 'Y', 'Z']\n\n# Remove 'Y', print length, print list\n`,
        expectedOutput: "2\n['X', 'Z']",
      },
      advanced: {
        prompt: "Given `data = [10, 20]`, read index `1` (which is `20`). Append that value to a new list `res = []`. Print `res`.",
        starterCode: `data = [10, 20]\nres = []\n\n# Read index 1, append to res, print res\n`,
        expectedOutput: "[20]",
      },
    },
  },
  {
    id: "tuples-sets-dicts-basics",
    title: "Tuples, Sets & Dictionary Basics",
    category: "Beginner",
    description: "Learn the core collection types and when to use each one",
    content: `## Tuples, Sets, and Dictionaries\n\nPython has different collection types for different jobs.\n\n### Tuple\n- Ordered\n- Usually used for fixed data\n- Written with parentheses like \`(10, 20)\`\n\n### Set\n- Unordered\n- Keeps only unique values\n- Great for removing duplicates\n\n### Dictionary\n- Stores key-value pairs\n- Written with curly braces like \`{"name": "Asha"}\`\n- Excellent for structured data\n\n### Quick rule\nUse a list for ordered items, a tuple for fixed groups, a set for uniqueness, and a dictionary for named data.`,
    codeExample: `point = (10, 20)\nprint(point[0])\n\ncolors = {"red", "blue", "red"}\nprint(colors)\n\nuser = {"name": "Asha", "city": "Chennai"}\nprint(user["name"])\nuser["level"] = "beginner"\nprint(user)`,
    exercises: {
      beginner: {
        prompt: "Create a tuple `(1, 2)` and a set `{1, 2, 2}`. Print the tuple on line 1, and the set on line 2.",
        starterCode: `# Create tuple and set, then print both\n`,
        expectedOutput: "(1, 2)\n{1, 2}",
      },
      intermediate: {
        prompt: "Create a dict `user = {'name': 'Bob'}`. Add a new key `'age'` with value `20`. Print the dict.",
        starterCode: `# Create dict, add key, print\n`,
        expectedOutput: "{'name': 'Bob', 'age': 20}",
      },
      advanced: {
        prompt: "Convert list `[1, 1, 2]` to a set. Store it in a dict under key `'unique'`. Print the dict.",
        starterCode: `nums = [1, 1, 2]\n\n# Convert to set, store in dict, print dict\n`,
        expectedOutput: "{'unique': {1, 2}}",
      },
    },
  },
  {
    id: "functions-basics",
    title: "Functions Basics",
    category: "Beginner",
    description: "Write small reusable blocks of code with parameters and return values",
    content: `## Functions Basics\n\nA function is a named block of code that does one job.\n\n### Why functions matter\nFunctions help you avoid repeating code and make programs easier to read.\n\n### Core parts\n- \`def\` starts a function\n- Parameters receive input values\n- \`return\` sends a value back\n\n### Beginner goal\nAfter this lesson, a learner should be able to write a small function, call it, and understand what input goes in and what value comes out.`,
    codeExample: `def greet(name):\n    return f"Hello, {name}"\n\nprint(greet("PyMaster"))\n\n\ndef add(a, b):\n    return a + b\n\nprint(add(4, 6))`,
    exercises: {
      beginner: {
        prompt: "Write a function say_hi() that prints 'Hi'. Call it once.",
        starterCode: `# Define say_hi and call it\n`,
        expectedOutput: "Hi",
      },
      intermediate: {
        prompt: "Write a function add(a, b) that returns the sum. Print add(7, 8).",
        starterCode: `# Define add and print add(7, 8)\n`,
        expectedOutput: "15",
      },
      advanced: {
        prompt: "Write a function is_even(n) that returns True for even numbers. Print is_even(12) and is_even(7) on separate lines.",
        starterCode: `# Define is_even and test it\n`,
        expectedOutput: "True\nFalse",
      },
    },
  },
  {
    id: "builtin-functions",
    title: "All Python Built-in Functions",
    category: "Beginner",
    description: "Learn all the essential functions Python provides out of the box",
    content: "## All 71 Python Built-in Functions\n\nPython has exactly 71 built-in functions natively available. Here is the complete list:\n\n- **`abs()`**: Returns absolute value\n- **`aiter()`**: Returns asynchronous iterator (Python 3.10+)\n- **`all()`**: Returns True if all elements are true\n- **`anext()`**: Returns next item from async iterator (Python 3.10+)\n- **`any()`**: Returns True if any element is true\n- **`ascii()`**: Returns string containing printable representation\n- **`bin()`**: Converts integer to binary string\n- **`bool()`**: Returns boolean value\n- **`breakpoint()`**: Drops into the debugger\n- **`bytearray()`**: Returns a mutable bytearray object\n- **`bytes()`**: Returns an immutable bytes object\n- **`callable()`**: Checks if object appears callable\n- **`chr()`**: Returns character from Unicode integer\n- **`classmethod()`**: Converts a method into a class method\n- **`compile()`**: Compiles source into code object\n- **`complex()`**: Creates a complex number\n- **`delattr()`**: Deletes an attribute from an object\n- **`dict()`**: Creates a dictionary\n- **`dir()`**: Returns list of valid attributes of an object\n- **`divmod()`**: Returns quotient and remainder\n- **`enumerate()`**: Yields index and value pairs\n- **`eval()`**: Evaluates a Python expression\n- **`exec()`**: Executes dynamic Python code\n- **`filter()`**: Filters elements from an iterable\n- **`float()`**: Converts to a floating point number\n- **`format()`**: Formats a value\n- **`frozenset()`**: Creates an immutable frozenset\n- **`getattr()`**: Returns the value of an attribute\n- **`globals()`**: Returns dictionary of current global symbol table\n- **`hasattr()`**: Checks if object has given attribute\n- **`hash()`**: Returns the hash value of an object\n- **`help()`**: Invokes the built-in help system\n- **`hex()`**: Converts integer to hexadecimal string\n- **`id()`**: Returns the identity (memory address) of an object\n- **`input()`**: Reads a line from input\n- **`int()`**: Converts to an integer\n- **`isinstance()`**: Checks if an object is an instance of a class\n- **`issubclass()`**: Checks if a class is a subclass of another\n- **`iter()`**: Returns an iterator object\n- **`len()`**: Returns the length (number of items)\n- **`list()`**: Creates a list\n- **`locals()`**: Returns dictionary of current local symbol table\n- **`map()`**: Applies function to every item of an iterable\n- **`max()`**: Returns the largest item\n- **`memoryview()`**: Returns a memory view object\n- **`min()`**: Returns the smallest item\n- **`next()`**: Retrieves the next item from an iterator\n- **`object()`**: Returns a new featureless object\n- **`oct()`**: Converts integer to octal string\n- **`open()`**: Opens a file and returns a stream\n- **`ord()`**: Returns an integer representing the Unicode char\n- **`pow()`**: Returns base to the power exp\n- **`print()`**: Prints to the standard output\n- **`property()`**: Returns a property attribute\n- **`range()`**: Generates a sequence of numbers\n- **`repr()`**: Returns a string containing printable representation\n- **`reversed()`**: Returns a reverse iterator\n- **`round()`**: Rounds a number\n- **`set()`**: Creates a set\n- **`setattr()`**: Sets the value of an attribute\n- **`slice()`**: Returns a slice object representing a set of indices\n- **`sorted()`**: Returns a new sorted list\n- **`staticmethod()`**: Converts a method to a static method\n- **`str()`**: Returns a string version of an object\n- **`sum()`**: Sums the items of an iterable\n- **`super()`**: Returns a proxy object that delegates method calls to a parent or sibling class\n- **`tuple()`**: Creates a tuple\n- **`type()`**: Returns the type of an object\n- **`vars()`**: Returns the __dict__ attribute for a module, class, instance\n- **`zip()`**: Iterates over several iterables in parallel\n- **`__import__()`**: Invoked by the import statement (rarely used directly)",
    codeExample: "# Reference guide for all 71 Python built-in functions\n\n# abs(): Returns absolute value\nabs(-5)\n\n# aiter(): Returns asynchronous iterator (Python 3.10+)\naiter(async_iterable)\n\n# all(): Returns True if all elements are true\nall([True, False])\n\n# anext(): Returns next item from async iterator (Python 3.10+)\nanext(async_iterator)\n\n# any(): Returns True if any element is true\nany([False, True])\n\n# ascii(): Returns string containing printable representation\nascii(obj)\n\n# bin(): Converts integer to binary string\nbin(10)\n\n# bool(): Returns boolean value\nbool(1)\n\n# breakpoint(): Drops into the debugger\nbreakpoint()\n\n# bytearray(): Returns a mutable bytearray object\nbytearray([50, 100])\n\n# bytes(): Returns an immutable bytes object\nbytes([50, 100])\n\n# callable(): Checks if object appears callable\ncallable(print)\n\n# chr(): Returns character from Unicode integer\nchr(65)\n\n# classmethod(): Converts a method into a class method\n@classmethod\n\n# compile(): Compiles source into code object\ncompile(\"x=5\", \"test\", \"exec\")\n\n# complex(): Creates a complex number\ncomplex(1, 2)\n\n# delattr(): Deletes an attribute from an object\ndelattr(obj, \"name\")\n\n# dict(): Creates a dictionary\ndict(a=1, b=2)\n\n# dir(): Returns list of valid attributes of an object\ndir()\n\n# divmod(): Returns quotient and remainder\ndivmod(10, 3)\n\n# enumerate(): Yields index and value pairs\nlist(enumerate([\"a\", \"b\"]))\n\n# eval(): Evaluates a Python expression\neval(\"5 + 10\")\n\n# exec(): Executes dynamic Python code\nexec(\"print('Hi')\")\n\n# filter(): Filters elements from an iterable\nlist(filter(None, [0, 1]))\n\n# float(): Converts to a floating point number\nfloat(\"3.14\")\n\n# format(): Formats a value\nformat(3.1415, \".2f\")\n\n# frozenset(): Creates an immutable frozenset\nfrozenset([1, 2, 3])\n\n# getattr(): Returns the value of an attribute\ngetattr(obj, \"name\")\n\n# globals(): Returns dictionary of current global symbol table\nglobals()\n\n# hasattr(): Checks if object has given attribute\nhasattr(obj, \"name\")\n\n# hash(): Returns the hash value of an object\nhash(\"test\")\n\n# help(): Invokes the built-in help system\nhelp(print)\n\n# hex(): Converts integer to hexadecimal string\nhex(255)\n\n# id(): Returns the identity (memory address) of an object\nid(obj)\n\n# input(): Reads a line from input\ninput(\"Prompt:\")\n\n# int(): Converts to an integer\nint(\"10\")\n\n# isinstance(): Checks if an object is an instance of a class\nisinstance(5, int)\n\n# issubclass(): Checks if a class is a subclass of another\nissubclass(bool, int)\n\n# iter(): Returns an iterator object\niter([1, 2])\n\n# len(): Returns the length (number of items)\nlen(\"hello\")\n\n# list(): Creates a list\nlist((1, 2))\n\n# locals(): Returns dictionary of current local symbol table\nlocals()\n\n# map(): Applies function to every item of an iterable\nlist(map(str, [1, 2]))\n\n# max(): Returns the largest item\nmax(1, 5, 3)\n\n# memoryview(): Returns a memory view object\nmemoryview(b\"abc\")\n\n# min(): Returns the smallest item\nmin(1, 5, 3)\n\n# next(): Retrieves the next item from an iterator\nnext(iterator)\n\n# object(): Returns a new featureless object\nobject()\n\n# oct(): Converts integer to octal string\noct(8)\n\n# open(): Opens a file and returns a stream\nopen(\"file.txt\")\n\n# ord(): Returns an integer representing the Unicode char\nord(\"A\")\n\n# pow(): Returns base to the power exp\npow(2, 3)\n\n# print(): Prints to the standard output\nprint(\"Hello\")\n\n# property(): Returns a property attribute\n@property\n\n# range(): Generates a sequence of numbers\nlist(range(5))\n\n# repr(): Returns a string containing printable representation\nrepr(\"test\")\n\n# reversed(): Returns a reverse iterator\nlist(reversed([1, 2]))\n\n# round(): Rounds a number\nround(3.1415, 2)\n\n# set(): Creates a set\nset([1, 2, 2])\n\n# setattr(): Sets the value of an attribute\nsetattr(obj, \"name\", value)\n\n# slice(): Returns a slice object representing a set of indices\nslice(1, 5, 2)\n\n# sorted(): Returns a new sorted list\nsorted([3, 1, 2])\n\n# staticmethod(): Converts a method to a static method\n@staticmethod\n\n# str(): Returns a string version of an object\nstr(10)\n\n# sum(): Sums the items of an iterable\nsum([1, 2, 3])\n\n# super(): Returns a proxy object that delegates method calls to a parent or sibling class\nsuper()\n\n# tuple(): Creates a tuple\ntuple([1, 2])\n\n# type(): Returns the type of an object\ntype(5)\n\n# vars(): Returns the __dict__ attribute for a module, class, instance\nvars(obj)\n\n# zip(): Iterates over several iterables in parallel\nlist(zip([1], [2]))\n\n# __import__(): Invoked by the import statement (rarely used directly)\n__import__(\"math\")\n",
    exercises: {
      beginner: {
        prompt: "Given `nums = [1, 5, 3]`, print `max(nums)`, `min(nums)`, and `sum(nums)` on separate lines.",
        starterCode: `nums = [1, 5, 3]\n\n# Print max, min, sum\n`,
        expectedOutput: "5\n1\n9",
      },
      intermediate: {
        prompt: "Given `n = -10.5`. Use `abs()` to get the absolute value, then `round()` it to the nearest integer. Print the final result.",
        starterCode: `n = -10.5\n\n# Calculate abs, then round, and print\n`,
        expectedOutput: "10",
      },
      advanced: {
        prompt: "Given string `'100'`, convert it to an `int()`. Then print its `type()`, and finally print the `len()` of the string `'100'`.",
        starterCode: `val = "100"\n\n# Convert to int, print type, print len of val\n`,
        expectedOutput: "<class 'int'>\n3",
      },
    },
  },

  // INTERMEDIATE
  // ═══════════════════════════════════════
  {
    id: "functions",
    title: "Functions",
    category: "Intermediate",
    description: "Define reusable code blocks with functions",
    content: `## Functions\n\nFunctions allow you to define reusable blocks of code. You create them using the \`def\` keyword.\n\n### Key Concepts\n- **Parameters**: Inputs you pass into the function.\n- **Return values**: The output the function sends back using \`return\`.\n- **Default arguments**: Provide default values so arguments can be optional (\`def greet(name="User")\`).\n- **\\*args & \\*\\*kwargs**: Allow a function to accept any number of positional or keyword arguments.\n- **Lambda functions**: Short, anonymous, one-line functions like \`square = lambda x: x**2\`.\n\n### Why use them?\nFunctions keep your code DRY (Don't Repeat Yourself) and make your programs easier to test and organize.`,
    codeExample: `def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nprint(greet("Alice"))\n\nsquare = lambda x: x ** 2\nprint(square(5))`,
    exercises: {
      beginner: {
        prompt: "Write a function area(w, h) that returns w * h. Print area(5, 3).",
        starterCode: `# Define the area function\n\n# Print area(5, 3)\n`,
        expectedOutput: "15",
      },
      intermediate: {
        prompt: "Write a function factorial(n) using recursion. Print factorial(6).",
        starterCode: `# Define recursive factorial\n\n# Print factorial(6)\n`,
        expectedOutput: "720",
      },
      advanced: {
        prompt: "Write a function that takes *args of numbers and returns their sum. Print the result for (1,2,3,4,5).",
        starterCode: `# Define sum function with *args\n\n# Print sum_all(1,2,3,4,5)\n`,
        expectedOutput: "15",
      },
    },
  },
  {
    id: "lists",
    title: "Lists",
    category: "Intermediate",
    description: "Master Python's most versatile data structure",
    content: `## Lists\n\nA list is a versatile, ordered collection of items that can be changed (mutable) after creation.\n\n### Common Methods\n- \`.append(x)\` — Adds an item to the end of the list.\n- \`.extend(iterable)\` — Adds multiple items to the end.\n- \`.insert(i, x)\` — Inserts an item at a specific index.\n- \`.remove(x)\` — Removes the first matching item.\n- \`.pop(i)\` — Removes and returns the item at an index.\n- \`.sort()\` — Sorts the list in place.\n- \`.reverse()\` — Reverses the elements in place.\n\n### Slicing\nExtract parts of a list using the syntax: \`list[start:stop:step]\`\n- \`nums[1:4]\` gets items from index 1 to 3.\n- \`nums[::-1]\` quickly reverses the list.\n\n### List Comprehensions\nA compact way to create lists using a single line of code.\nExample: \`squares = [x**2 for x in range(5)]\``,
    codeExample: `nums = [3, 1, 4, 1, 5, 9]\nnums.sort()\nprint(nums)\nsquares = [x**2 for x in range(10)]\nprint(squares)`,
    exercises: {
      beginner: {
        prompt: "Create `L = [1]`. Use `.append(2)`, `.extend([3, 4])`, and `.insert(0, 0)`. Print `L`.",
        starterCode: `L = [1]\n\n# Append, extend, insert, and print\n`,
        expectedOutput: "[0, 1, 2, 3, 4]",
      },
      intermediate: {
        prompt: "Create `L = [10, 20, 30]`. Use `.pop()` to remove the last item, then `.remove(10)`. Print `L`, then print `L` sliced in reverse `[::-1]`.",
        starterCode: `L = [10, 20, 30]\n\n# Pop, remove, print L, print reversed slice\n`,
        expectedOutput: "[20]\n[20]",
      },
      advanced: {
        prompt: "Use a list comprehension to square the numbers `[1, 2, 3]`. Assign to `L`. Then use `.sort(reverse=True)`. Print `L`.",
        starterCode: `# Create comprehension, sort in reverse, print\n`,
        expectedOutput: "[9, 4, 1]",
      },
    },
  },
  {
    id: "tuples-sets",
    title: "Tuples & Sets",
    category: "Intermediate",
    description: "Immutable sequences and unique collections",
    content: `## Tuples\nA Tuple is an ordered collection of items that is **immutable** (cannot be changed after creation). Created with parentheses \`()\`.\n- Use tuples when you want to group related data that shouldn't change (like coordinates: \`(x, y)\`).\n\n## Sets\nA Set is an unordered collection of **unique** elements. Created with curly braces \`{}\`.\n- Use sets to quickly remove duplicates from a list or check if an item exists.\n\n### Set Operations\nSets support mathematical operations:\n- **Union (\`|\`)**: Combines elements from both sets.\n- **Intersection (\`&\`)**: Elements common to both sets.\n- **Difference (\`-\`)**: Elements in the first set but not the second.\n- **Symmetric Difference (\`^\`)**: Elements in either set, but not both.`,
    codeExample: `point = (3, 4)\nx, y = point\n\na = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nprint(a & b)  # {3, 4}`,
    exercises: {
      beginner: {
        prompt: "Create a tuple `(10, 20)`. Unpack it into `x, y`. Print `x`, then print `y`.",
        starterCode: `# Create tuple, unpack, print\n`,
        expectedOutput: "10\n20",
      },
      intermediate: {
        prompt: "Given `s1 = {1, 2}` and `s2 = {2, 3}`. Print their union (`|`), then their intersection (`&`).",
        starterCode: `s1 = {1, 2}\ns2 = {2, 3}\n\n# Print union and intersection\n`,
        expectedOutput: "{1, 2, 3}\n{2}",
      },
      advanced: {
        prompt: "Given `s1 = {1, 2, 3}` and `s2 = {3, 4, 5}`. Print their difference (`-`), then their symmetric difference (`^`).",
        starterCode: `s1 = {1, 2, 3}\ns2 = {3, 4, 5}\n\n# Print difference and symmetric difference\n`,
        expectedOutput: "{1, 2}\n{1, 2, 4, 5}",
      },
    },
  },
  {
    id: "dictionaries",
    title: "Dictionaries",
    category: "Intermediate",
    description: "Key-value pairs for fast data lookup",
    content: `## Dictionaries\n\nA dictionary in Python is an unordered collection of data stored as key-value pairs. Think of it like a real dictionary: you look up a word (the **key**) to find its definition (the **value**).\n\n### Common Methods\n- \`.get(key)\` — Safely retrieves a value without error if the key is missing.\n- \`.keys()\` — Returns all keys in the dictionary.\n- \`.values()\` — Returns all values in the dictionary.\n- \`.items()\` — Returns all key-value pairs as tuples.\n- \`.update(dict2)\` — Merges another dictionary into the current one.\n- \`.pop(key)\` — Removes and returns the value for the given key.\n\n### Dictionary Comprehensions\nA comprehension is a short and elegant way to create dictionaries from an existing iterable.\n**Syntax:** \`{key_expr: value_expr for item in iterable}\`\n\n**Example:**\nMap numbers to their squares: \`{x: x**2 for x in range(1, 4)}\`\nResult: \`{1: 1, 2: 4, 3: 9}\``,
    codeExample: `student = {"name": "Alice", "age": 22}\nfor key, val in student.items():\n    print(f"{key}: {val}")\n\nsquared = {x: x**2 for x in range(5)}\nprint(squared)`,
    exercises: {
      beginner: {
        prompt: "Create dict `d={'a': 1}`. Use `.update({'b': 2})` and `.get('c', 3)`. Print the dict, then print the `.get()` result.",
        starterCode: `d = {'a': 1}\n\n# Update, get, and print both\n`,
        expectedOutput: "{'a': 1, 'b': 2}\n3",
      },
      intermediate: {
        prompt: "Given `d={'x': 10, 'y': 20}`, print `list(d.keys())`, `list(d.values())`, and `list(d.items())` on separate lines.",
        starterCode: `d = {'x': 10, 'y': 20}\n\n# Print keys, values, and items as lists\n`,
        expectedOutput: "['x', 'y']\n[10, 20]\n[('x', 10), ('y', 20)]",
      },
      advanced: {
        prompt: "Use `.pop('a')` on `d={'a': 1, 'b': 2, 'c': 3}`. Then write a dict comprehension to square the remaining values. Print the dict.",
        starterCode: `d = {'a': 1, 'b': 2, 'c': 3}\n\n# Pop 'a', comprehend squares, and print\n`,
        expectedOutput: "{'b': 4, 'c': 9}",
      },
    },
  },
  {
    id: "file-handling",
    title: "File Handling",
    category: "Intermediate",
    description: "Read from and write to files",
    content: `## File Handling\n\nPython allows you to read from and write to files on your computer.\n\n### File Modes\n- \`"r"\` (Read): Open a file for reading (default).\n- \`"w"\` (Write): Open a file for writing (creates new file or overwrites existing).\n- \`"a"\` (Append): Open a file for appending (adds to the end).\n\n### The \`with\` Statement\nAlways use \`with open("file.txt", "r") as f:\` when handling files. It automatically closes the file for you, even if an error occurs. \n\n### JSON Data\nThe \`json\` module is often used with files to save structured data. \`json.dump()\` writes Python objects to a file as JSON, and \`json.load()\` reads JSON from a file back into Python objects.`,
    codeExample: `with open("test.txt", "w") as f:\n    f.write("Hello!\\n")\n\nwith open("test.txt", "r") as f:\n    print(f.read())`,
    exercises: {
      beginner: {
        prompt: "Use `with open('test.txt', 'w') as f:` to write `'Hello'`. Then open it with `'r'`, read, and print the contents.",
        starterCode: `# Write 'Hello' to 'test.txt', then read and print it\n`,
        expectedOutput: "Hello",
      },
      intermediate: {
        prompt: "Open `'log.txt'` with `'w'` and write `'A'`. Open with `'a'` and write `'B'`. Open with `'r'`, read, and print.",
        starterCode: `# Write 'A', append 'B', then read and print\n`,
        expectedOutput: "AB",
      },
      advanced: {
        prompt: "Use `json.dump({'x': 1}, f)` to write to `'data.json'`. Then use `json.load(f)` to read it back, and print the dictionary.",
        starterCode: `import json\n\n# Dump to 'data.json', then load and print\n`,
        expectedOutput: "{'x': 1}",
      },
    },
  },
  {
    id: "error-handling",
    title: "Error Handling (try/except)",
    category: "Intermediate",
    description: "Handle exceptions gracefully",
    content: `## Error Handling (try/except)\n\nIn Python, errors are called **Exceptions**. When an exception occurs, the program crashes unless you handle it.\n\n### The try/except Block\nPut risky code inside a \`try\` block. If an error occurs, the code jumps to the \`except\` block instead of crashing.\n\n### Common Exceptions\n- **ValueError**: Right type, but inappropriate value (e.g., \`int("apple")\`).\n- **TypeError**: Operation applied to an object of inappropriate type.\n- **IndexError**: Trying to access a list index that doesn't exist.\n- **KeyError**: Trying to access a dictionary key that doesn't exist.\n- **ZeroDivisionError**: Trying to divide by zero.\n\n### Raising Errors\nYou can forcefully trigger an error using the \`raise\` keyword (e.g., \`raise ValueError("Invalid!")\`).`,
    codeExample: `try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero!")\n\ntry:\n    num = int("abc")\nexcept ValueError as e:\n    print(f"Error: {e}")`,
    exercises: {
      beginner: {
        prompt: "Write a `try` block that accesses `[0][5]`. Catch `IndexError` and print `'Bad Index'`. Catch `KeyError` and print `'Bad Key'`.",
        starterCode: `# Try accessing invalid index, catch errors\n`,
        expectedOutput: "Bad Index",
      },
      intermediate: {
        prompt: "Write a `try` block computing `int('a')`. Catch `ValueError` and print `'Value'`. Catch `TypeError` and print `'Type'`.",
        starterCode: `# Try invalid int conversion, catch errors\n`,
        expectedOutput: "Value",
      },
      advanced: {
        prompt: "Write `check(n)`. If `n < 0`, use `raise ValueError('Neg')`. Wrap `check(-1)` in a `try/except` and print the exception object `e`.",
        starterCode: `# Define check(), raise error, try/catch and print e\n`,
        expectedOutput: "Neg",
      },
    },
  },
  {
    id: "list-comprehensions",
    title: "Comprehensions",
    category: "Intermediate",
    description: "List, dict, set, and generator comprehensions",
    content: `## Comprehensions\n\nComprehensions provide a concise and readable way to create collections in a single line of code. They replace multi-line loops.\n\n### List Comprehensions\n**Syntax:** \`[expr for item in iterable if condition]\`\nExample: \`evens = [x for x in range(10) if x % 2 == 0]\`\n\n### Dictionary Comprehensions\n**Syntax:** \`{key_expr: value_expr for item in iterable}\`\nExample: \`squares = {x: x**2 for x in range(5)}\`\n\n### Set Comprehensions\n**Syntax:** \`{expr for item in iterable}\`\nExample: \`unique_lengths = {len(word) for word in ["hi", "hello"]}\`\n\n### Generator Expressions\n**Syntax:** \`(expr for item in iterable)\`\nCreates a generator that yields items one by one (memory efficient).`,
    codeExample: `squares = [x**2 for x in range(10)]\nevens = [x for x in range(20) if x % 2 == 0]\nflat = [n for row in [[1,2],[3,4]] for n in row]\nprint(flat)`,
    exercises: {
      beginner: {
        prompt: "Write a list comp `[x*2]` and a set comp `{x%2}` for `x` in `range(3)`. Print the list, then the set.",
        starterCode: `# Write list comp, set comp, print both\n`,
        expectedOutput: "[0, 2, 4]\n{0, 1}",
      },
      intermediate: {
        prompt: "Write a dict comprehension mapping `x` to `x**2` for `x` in `range(1, 4)`. Print the dict.",
        starterCode: `# Write dict comp and print\n`,
        expectedOutput: "{1: 1, 2: 4, 3: 9}",
      },
      advanced: {
        prompt: "Write a generator expression `(x for x in [10, 20])`. Pass it directly into `sum()` and print the result.",
        starterCode: `# Write generator expr inside sum(), print\n`,
        expectedOutput: "30",
      },
    },
  },
  {
    id: "modules-imports",
    title: "Modules & Imports",
    category: "Intermediate",
    description: "Organize code with modules and packages",
    content: `## Modules & Imports\n\nA module is simply a Python file containing code you can reuse. Python comes with a massive "Standard Library" of built-in modules.\n\n### Import Styles\n- **\`import math\`**: Imports the whole module. Use as \`math.pi\`.\n- **\`from math import pi\`**: Imports just \`pi\`. Use directly as \`pi\`.\n- **\`import pandas as pd\`**: Imports a module and gives it a shorter nickname (alias).\n\n### Standard Library Highlights\n- **\`os\` / \`sys\`**: System and directory operations.\n- **\`datetime\`**: Working with dates and times.\n- **\`collections\`**: Advanced data structures like \`Counter\` or \`defaultdict\`.\n- **\`json\`**: Parsing and creating JSON data.\n- **\`re\`**: Regular expressions for pattern matching.`,
    codeExample: `from collections import Counter\nwords = "hello world hello".split()\nprint(Counter(words))\n\nimport datetime\nprint(datetime.date.today())`,
    exercises: {
      beginner: {
        prompt: "Use `import math`. Print `math.pi` rounded to 2 decimal places.",
        starterCode: `# Import math, print rounded pi\n`,
        expectedOutput: "3.14",
      },
      intermediate: {
        prompt: "Use `from collections import Counter`. Pass `'aabbc'` into `Counter` and print it.",
        starterCode: `# Import Counter, use on 'aabbc', print\n`,
        expectedOutput: "Counter({'a': 2, 'b': 2, 'c': 1})",
      },
      advanced: {
        prompt: "Use `import json` and `import re`. Dump `{'a': 1}` to json string. Check if `re.search('a', 'abc')` is truthy. Print both.",
        starterCode: `# Import json and re, dump json, check regex, print both\n`,
        expectedOutput: '{"a": 1}\nTrue',
      },
    },
  },

  // ═══════════════════════════════════════
  // ADVANCED
  // ═══════════════════════════════════════
  {
    id: "oop",
    title: "Object-Oriented Programming",
    category: "Advanced",
    description: "Master classes, inheritance, and OOP principles",
    content: `## Object-Oriented Programming (OOP)\n\nOOP is a paradigm that organizes software design around **objects** (data) and **methods** (actions). You define blueprints for objects using \`class\`.\n\n### The Four Pillars\n1. **Encapsulation**: Grouping data (attributes) and methods that act on the data into a single unit (class).\n2. **Abstraction**: Hiding complex implementation details and showing only the essential features.\n3. **Inheritance**: Creating a new class from an existing one, inheriting its methods and attributes (e.g., \`class Dog(Animal):\`).\n4. **Polymorphism**: The ability to use a common interface for multiple forms (data types).\n\n### Special Magic Methods\n- \`__init__(self)\`: The constructor, called when an object is created.\n- \`__str__(self)\`: Returns a readable string representation of the object.\n- \`__len__(self)\`: Defines behavior for the built-in \`len()\` function.`,
    codeExample: `class Dog:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        return f"{self.name} says Woof!"\n\ndog = Dog("Rex")\nprint(dog.speak())`,
    exercises: {
      beginner: {
        prompt: "Create `Dog` class with `__init__(self, name)` and `__str__(self)`. `__str__` returns `name`. Print `Dog('Rex')`.",
        starterCode: `# Create class and print instance\n`,
        expectedOutput: "Rex",
      },
      intermediate: {
        prompt: "Create `Animal` with `speak()` returning 'Sound'. Create `Cat(Animal)` that overrides `speak()` to return 'Meow'. Print `Cat().speak()`.",
        starterCode: `# Create parent, child, and print child method\n`,
        expectedOutput: "Meow",
      },
      advanced: {
        prompt: "Create `Box` class with `__init__(self, items)`. Implement `__len__(self)` to return length of `items`. Print `len(Box([1, 2]))`.",
        starterCode: `# Create class with __len__, print len()\n`,
        expectedOutput: "2",
      },
    },
  },
  {
    id: "oop-advanced",
    title: "Advanced OOP",
    category: "Advanced",
    description: "Abstract classes, dataclasses, class methods",
    content: `## Advanced OOP Concepts\n\nOnce you understand classes, you can use advanced patterns to write cleaner code.\n\n### Dataclasses\nThe \`@dataclass\` decorator (from \`dataclasses\`) automatically generates boilerplate code like \`__init__\` and \`__repr__\` for classes that primarily store data.\n\n### Class Methods & Static Methods\n- **\`@classmethod\`**: Takes \`cls\` instead of \`self\`. Often used to create alternative constructors (e.g., creating a User from a database row).\n- **\`@staticmethod\`**: Takes neither \`self\` nor \`cls\`. A regular function that belongs to the class's namespace because it logically relates to the class.\n\n### Abstract Base Classes (abc)\nAllows you to define an "interface" (a base class with empty methods) that forces all child classes to implement those specific methods.`,
    codeExample: `from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: float\n    y: float\n\np = Point(3, 4)\nprint(p)`,
    exercises: {
      beginner: {
        prompt: "Use `@dataclass` on `Point(x: int, y: int)`. Print `Point(1, 2)`.",
        starterCode: `from dataclasses import dataclass\n\n# Create dataclass and print\n`,
        expectedOutput: "Point(x=1, y=2)",
      },
      intermediate: {
        prompt: "Create class `Math` with a `@staticmethod` `add(a, b)` returning `a+b`. Print `Math.add(3, 4)`.",
        starterCode: `# Create class with staticmethod and print\n`,
        expectedOutput: "7",
      },
      advanced: {
        prompt: "Create class `User` with `__init__(self, name)`. Add `@classmethod` `guest(cls)` returning `cls('Guest')`. Print `User.guest().name`.",
        starterCode: `# Create class with classmethod and print\n`,
        expectedOutput: "Guest",
      },
    },
  },
  {
    id: "decorators",
    title: "Decorators",
    category: "Advanced",
    description: "Functions that modify other functions",
    content: `## Decorators\n\nA decorator is a function that takes another function and extends its behavior without explicitly modifying it. You apply them using the \`@\` symbol.\n\n### How they work\nUnder the hood, a decorator wraps the original function inside an inner wrapper function where you can execute code *before* and *after* the original function runs.\n\n### Common Built-in Decorators\n- **\`@property\`**: Allows you to access a class method like it was an attribute (without parentheses).\n- **\`@functools.lru_cache\`**: Memoizes (caches) the return values of a function based on its inputs, drastically speeding up recursive or heavy computations.\n- **\`@staticmethod\` / \`@classmethod\`**: Alters how class methods are bound to the class.`,
    codeExample: `import functools\n\ndef uppercase(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs).upper()\n    return wrapper\n\n@uppercase\ndef greet(name):\n    return f"hello, {name}"\n\nprint(greet("alice"))`,
    exercises: {
      beginner: {
        prompt: "Write decorator `@upper` that calls `func()` and returns `.upper()`. Apply to `def say(): return 'hi'`. Print `say()`.",
        starterCode: `# Write decorator and apply it\n`,
        expectedOutput: "HI",
      },
      intermediate: {
        prompt: "Create class `Circle` with `radius=5`. Use `@property` for `area` returning `radius * 2`. Print `Circle().area`.",
        starterCode: `# Create class with property and print\n`,
        expectedOutput: "10",
      },
      advanced: {
        prompt: "Use `@functools.lru_cache`. Define `def calc(n): return n*2`. Call `calc(10)` then print `calc.cache_info().hits`. (Call twice so hits=1)",
        starterCode: `import functools\n\n# Write cached function, call twice, print hits\n`,
        expectedOutput: "1",
      },
    },
  },
  {
    id: "generators",
    title: "Generators & Iterators",
    category: "Advanced",
    description: "Lazy evaluation with yield",
    content: `## Generators & Iterators\n\nGenerators are a special class of functions that simplify the creation of iterators. Instead of returning a single value and exiting, they use the \`yield\` keyword to produce a sequence of values over time.\n\n### How \`yield\` works\nWhen a generator hits a \`yield\` statement, it pauses execution, saves its state, and returns the yielded value. When called again, it resumes right where it left off.\n\n### Benefits of Generators\n- **Highly Memory Efficient**: They generate items one at a time on the fly, instead of storing a massive list in memory.\n- **Lazy Evaluation**: Computation only happens when the next item is explicitly requested.\n- **Infinite Sequences**: You can model infinite streams of data (like an endless sequence of prime numbers) without crashing your computer.`,
    codeExample: `def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\nprint(list(fibonacci(10)))`,
    exercises: {
      beginner: {
        prompt: "Write a generator `count()` that `yield`s 1, then 2. Create iterator `gen = count()`. Print `next(gen)` and `next(gen)`.",
        starterCode: `# Write generator, create gen, print next twice\n`,
        expectedOutput: "1\n2",
      },
      intermediate: {
        prompt: "Write a generator `squares(n)` yielding `x**2` for `x` up to `n-1`. Print `list(squares(4))`.",
        starterCode: `# Write generator, print as list\n`,
        expectedOutput: "[0, 1, 4, 9]",
      },
      advanced: {
        prompt: "Write a generator expression `(x*2 for x in [1, 2])`. Assign to `g`. Iterate and print each.",
        starterCode: `# Write generator expr, iterate and print\n`,
        expectedOutput: "2\n4",
      },
    },
  },
  {
    id: "lambda-map-filter",
    title: "Lambda, Map, Filter & Reduce",
    category: "Advanced",
    description: "Functional programming tools",
    content: `## Functional Programming Tools\n\nPython supports functional programming concepts that allow you to process data in elegant ways.\n\n### Lambda Functions\nSmall, anonymous functions written in one line using the \`lambda\` keyword. Useful for short operations passed as arguments to other functions.\nExample: \`add = lambda x, y: x + y\`\n\n### map(), filter(), and reduce()\n- **\`map(function, iterable)\`**: Applies a function to every item in the iterable, returning a new sequence of results.\n- **\`filter(function, iterable)\`**: Keeps only the items for which the function returns \`True\`.\n- **\`reduce(function, iterable)\`**: (from the \`functools\` module) Continuously applies a function to pairs of items, reducing the sequence to a single accumulated value (like a sum or product).`,
    codeExample: `from functools import reduce\nnums = [1, 2, 3, 4, 5]\nprint(list(map(lambda x: x**2, nums)))\nprint(list(filter(lambda x: x%2==0, nums)))\nprint(reduce(lambda a, b: a+b, nums))`,
    exercises: {
      beginner: {
        prompt: "Write a `lambda` taking `x` and returning `x**3`. Assign to `cube`. Print `cube(2)`.",
        starterCode: `# Write lambda and print\n`,
        expectedOutput: "8",
      },
      intermediate: {
        prompt: "Use `map` with a lambda to add 10 to `[1, 2]`. Print as a `list()`.",
        starterCode: `# Use map and print list\n`,
        expectedOutput: "[11, 12]",
      },
      advanced: {
        prompt: "Use `filter` with lambda to get evens from `[1, 2, 3, 4]`. Then `reduce` to sum them. Print sum.",
        starterCode: `from functools import reduce\n\n# Filter, reduce, and print\n`,
        expectedOutput: "6",
      },
    },
  },
  {
    id: "regex",
    title: "Regular Expressions",
    category: "Advanced",
    description: "Pattern matching with the re module",
    content: `## Regular Expressions\n\n### Functions\n\`re.search()\`, \`re.match()\`, \`re.findall()\`, \`re.sub()\`, \`re.split()\`\n\n### Patterns\n\`.\` any, \`\\d\` digit, \`\\w\` word, \`\\s\` space, \`*\` 0+, \`+\` 1+`,
    codeExample: `import re\ntext = "Email: test@example.com"\nemails = re.findall(r'[\\w.]+@[\\w.]+', text)\nprint(emails)`,
    exercises: {
      beginner: {
        prompt: "Use `import re`. Use `re.search()` to find `r'\\d+'` in `'abc 123 def'`. Print the `.group()` of the match.",
        starterCode: `import re\n\n# Search for digits and print the match\n`,
        expectedOutput: "123",
      },
      intermediate: {
        prompt: "Use `re.findall()` to extract all words (`r'\\w+'`) from `'Hello, World!'`. Print the resulting list.",
        starterCode: `import re\n\n# Find all words and print list\n`,
        expectedOutput: "['Hello', 'World']",
      },
      advanced: {
        prompt: "Use `re.sub()` to replace multiple spaces (`r'\\s+'`) with a single `'-'` in `'a   b  c'`. Then use `re.split()` on `'-'` and print.",
        starterCode: `import re\n\n# Substitute spaces, then split, then print\n`,
        expectedOutput: "['a', 'b', 'c']",
      },
    },
  },
  {
    id: "context-managers",
    title: "Context Managers",
    category: "Advanced",
    description: "Manage resources with 'with' statement",
    content: `## Context Managers\n\nContext managers allow you to allocate and release resources exactly when you want to. The most widely used example is the \`with\` statement.\n\n### Why use them?\nThey ensure that resources are properly cleaned up (like closing a file or releasing a lock) even if an error occurs during execution.\n\n### Creating your own\nThere are two main ways to build custom context managers:\n1. **Class-based**: Implement the \`__enter__()\` (setup) and \`__exit__()\` (teardown) magic methods in a class.\n2. **Generator-based**: Use the \`@contextmanager\` decorator from the \`contextlib\` module. You write a single generator function where the code before the \`yield\` acts as setup, and the code after acts as teardown.`,
    codeExample: `from contextlib import contextmanager\n\n@contextmanager\ndef tag(name):\n    print(f"<{name}>")\n    yield\n    print(f"</{name}>")\n\nwith tag("div"):\n    print("Content")`,
    exercises: {
      beginner: {
        prompt: "Create a class `File` with `__enter__` returning `'open'` and `__exit__` printing `'closed'`. Use it in a `with` block, print the returned value.",
        starterCode: `# Define class with enter/exit, use in with block\n`,
        expectedOutput: "open\nclosed",
      },
      intermediate: {
        prompt: "Use `@contextmanager` to create `tag(name)`. Print `<name>`, yield, then print `</name>`. Use it with `'p'`, print `'text'` inside.",
        starterCode: `from contextlib import contextmanager\n\n# Define tag context manager, use it\n`,
        expectedOutput: "<p>\ntext\n</p>",
      },
      advanced: {
        prompt: "Create `Suppress` context manager class. In `__exit__`, if exception is `ValueError`, return `True` to suppress it. Use it, raise `ValueError`, then print `'Done'` outside.",
        starterCode: `# Define Suppress, use it to suppress ValueError, print 'Done' after\n`,
        expectedOutput: "Done",
      },
    },
  },
  {
    id: "advanced-python",
    title: "Advanced Concepts",
    category: "Advanced",
    description: "Closures, type hints, walrus operator",
    content: `## Advanced Python\n\n### Closures\nFunctions remembering enclosing scope.\n\n### Type Hints\n\`def func(x: int) -> str:\`\n\n### Walrus Operator (:=)\nAssign within expressions.`,
    codeExample: `def make_multiplier(factor):\n    def multiply(x):\n        return x * factor\n    return multiply\n\ndouble = make_multiplier(2)\nprint(double(5))  # 10`,
    exercises: {
      beginner: {
        prompt: "Create a closure `adder(x)` returning a function that adds `x` to `y`. Assign `add5 = adder(5)`. Print `add5(10)`.",
        starterCode: `# Define adder closure, use it to make add5, print add5(10)\n`,
        expectedOutput: "15",
      },
      intermediate: {
        prompt: "Write a function `greet(name: str) -> str: return f'Hi {name}'`. Print `greet('Bob')`.",
        starterCode: `# Define function with type hints, print result\n`,
        expectedOutput: "Hi Bob",
      },
      advanced: {
        prompt: "Use walrus operator `:=`. `nums = [1, 2, 3]`. `while (n := len(nums)) > 0: print(nums.pop())`.",
        starterCode: `nums = [1, 2, 3]\n\n# Use walrus operator in while loop\n`,
        expectedOutput: "3\n2\n1",
      },
    },
  },

  // ═══════════════════════════════════════
  // EXPERT
  // ═══════════════════════════════════════
  {
    id: "concurrency",
    title: "Concurrency & Async",
    category: "Expert",
    description: "Threading, multiprocessing, and async/await",
    content: `## Concurrency & Async\n\nConcurrency is doing multiple things at the same time. Python provides several ways to achieve this depending on your task.\n\n### Threading (I/O-bound tasks)\nUses multiple threads within a single process. Best for tasks that spend a lot of time waiting for external events (like downloading files or reading from databases).\n\n### Multiprocessing (CPU-bound tasks)\nCreates entirely separate memory spaces (processes). Best for heavy mathematical computations (like image processing) because it bypasses Python's Global Interpreter Lock (GIL) and truly runs code in parallel across CPU cores.\n\n### Asyncio (async / await)\nSingle-threaded, cooperative multitasking. It rapidly switches between tasks during idle wait times. Excellent for building highly scalable network servers and handling thousands of simultaneous connections.`,
    codeExample: `import asyncio\n\nasync def fetch(name, delay):\n    await asyncio.sleep(delay)\n    return f"{name} done"\n\nasync def main():\n    results = await asyncio.gather(\n        fetch("A", 1), fetch("B", 2)\n    )\n    print(results)`,
    exercises: {
      beginner: {
        prompt: "Import `asyncio`. Define `async def hello(): return 'Hi'`. Print the result of `asyncio.run(hello())`.",
        starterCode: `import asyncio\n\n# Define async hello, run it, print result\n`,
        expectedOutput: "Hi",
      },
      intermediate: {
        prompt: "Define `async def fetch(x): await asyncio.sleep(0.01); return x`. Use `asyncio.gather(fetch(1), fetch(2))` inside `main()`. Print `asyncio.run(main())`.",
        starterCode: `import asyncio\n\n# Define fetch, run gather in main, print\n`,
        expectedOutput: "[1, 2]",
      },
      advanced: {
        prompt: "Define `async def task(n): return n*2`. Create a list of tasks for `[1, 2, 3]`. Use `asyncio.gather(*tasks)` in `main`. Print the `asyncio.run()` result.",
        starterCode: `import asyncio\n\n# Define task, gather them for 1,2,3, print result\n`,
        expectedOutput: "[2, 4, 6]",
      },
    },
  },
  {
    id: "testing",
    title: "Testing & Debugging",
    category: "Expert",
    description: "Unit testing and debugging techniques",
    content: `## Testing & Debugging\n\nWriting tests ensures your code behaves exactly as expected and prevents future changes from breaking existing features.\n\n### Testing Frameworks\n- **\`assert\`**: The simplest form of testing. It throws an AssertionError if the condition is False.\n- **\`unittest\`**: Python's built-in, class-based testing framework (similar to Java's JUnit).\n- **\`pytest\`**: A highly popular third-party testing framework. It requires less boilerplate than unittest and provides powerful features like fixtures and readable error outputs.\n\n### Debugging Tools\n- **\`logging\`**: Instead of \`print()\`, use the logging module to output debug information. It allows you to set severity levels (INFO, WARNING, ERROR) and redirect logs to files.\n- **\`pdb\`**: Python's built-in debugger allows you to step through code line-by-line.`,
    codeExample: `def add(a, b): return a + b\n\n# Simple assertions\nassert add(2, 3) == 5\nassert add(-1, 1) == 0\nprint("All tests passed!")`,
    exercises: {
      beginner: {
        prompt: "Define `add(a, b): return a+b`. Use `assert add(2, 2) == 4` and `assert add(0, 0) == 0`. Print `'Passed'`. ",
        starterCode: `# Define add, assert test cases, print 'Passed'\n`,
        expectedOutput: "Passed",
      },
      intermediate: {
        prompt: "Define `div(a, b)`. If `b==0`, raise `ValueError`. Test `div(4,2)==2`. Use `try/except` to catch `ValueError` from `div(1,0)` and print `'Caught'`.",
        starterCode: `# Define div, assert success, catch exception, print 'Caught'\n`,
        expectedOutput: "Caught",
      },
      advanced: {
        prompt: "Import `unittest`. Create `Test(unittest.TestCase)` with `test_one(self): self.assertEqual(1, 1)`. Print `'Defined Test'`.",
        starterCode: `import unittest\n\n# Create TestCase subclass\nprint('Defined Test')\n`,
        expectedOutput: "Defined Test",
      },
    },
  },
  {
    id: "data-structures-algo",
    title: "Data Structures & Algorithms",
    category: "Expert",
    description: "Implement common data structures",
    content: `## Data Structures & Algorithms\n\nUnderstanding common data structures and algorithms is essential for writing highly efficient code and passing technical interviews.\n\n### Essential Data Structures\n- **Stack (LIFO)**: Last-In, First-Out. Like a stack of plates. Implemented using Python lists (\`append\` and \`pop\`).\n- **Queue (FIFO)**: First-In, First-Out. Like a line at a store. Best implemented using \`collections.deque\`.\n- **Linked List**: Nodes connected by pointers. Efficient for insertions/deletions at the ends.\n- **Heap (\`heapq\`)**: A specialized tree-based structure that gives you instant access to the smallest (or largest) element.\n\n### Algorithms\nKnowing how to sort (Merge Sort, Quick Sort) and search (Binary Search) efficiently forms the foundation of computer science.`,
    codeExample: `class Stack:\n    def __init__(self): self._items = []\n    def push(self, item): self._items.append(item)\n    def pop(self): return self._items.pop()\n    def peek(self): return self._items[-1]\n\ns = Stack()\ns.push(1); s.push(2)\nprint(s.pop())  # 2`,
    exercises: {
      beginner: {
        prompt: "Create a `Stack` class with `push(item)` and `pop()` using a list. Push `'a'` and `'b'`, then pop. Print the popped value.",
        starterCode: `# Define Stack class, push 'a' and 'b', pop and print\n`,
        expectedOutput: "b",
      },
      intermediate: {
        prompt: "Use `collections.deque`. Append `1`, `2`, `3`. Use `popleft()` to dequeue. Print the dequeued value, then print the remaining `deque`.",
        starterCode: `from collections import deque\n\n# Create deque, append, popleft, print both\n`,
        expectedOutput: "1\ndeque([2, 3])",
      },
      advanced: {
        prompt: "Use `heapq`. Push `5, 1, 3` via `heappush`. Pop the smallest with `heappop`. Print the popped value, then print the heap list.",
        starterCode: `import heapq\n\n# Build heap, pop smallest, print both\n`,
        expectedOutput: "1\n[3, 5]",
      },
    },
  },
  {
    id: "web-scraping",
    title: "Web Scraping & APIs",
    category: "Expert",
    description: "HTTP requests and web scraping",
    content: `## Web Scraping & APIs\n\nPython is famously powerful for interacting with the web.\n\n### Interacting with APIs\nThe third-party \`requests\` library is the standard way to make HTTP requests.\n- **\`GET\`**: Fetch data from a server.\n- **\`POST\`**: Send new data to a server.\n- APIs typically return data in JSON format, which you can easily parse into Python dictionaries using \`response.json()\$.\n\n### Web Scraping\nWhen an API isn't available, you can scrape raw HTML directly from websites.\n- **\`BeautifulSoup\`**: A popular library that parses messy HTML and allows you to search for tags, classes, and IDs (e.g., extracting all \`<a>\` links from a page).`,
    codeExample: `# Simulated API response\ndata = {"name": "Python", "version": "3.12"}\nprint(f"Language: {data['name']}")\nprint(f"Version: {data['version']}")`,
    exercises: {
      beginner: {
        prompt: "Given `resp = {'status': 200, 'body': 'OK'}`. Print `resp['status']`, then `resp['body']`.",
        starterCode: `resp = {'status': 200, 'body': 'OK'}\n\n# Print status and body\n`,
        expectedOutput: "200\nOK",
      },
      intermediate: {
        prompt: "Given `users = [{'name': 'A'}, {'name': 'B'}]`. Loop and print each `name`. Then print `len(users)`.",
        starterCode: `users = [{'name': 'A'}, {'name': 'B'}]\n\n# Loop and print names, then print count\n`,
        expectedOutput: "A\nB\n2",
      },
      advanced: {
        prompt: "Use `json.dumps()` on `{'key': 'val'}` with `indent=2`. Print the JSON string. Then `json.loads()` it back, print `type()` of the result.",
        starterCode: `import json\n\n# Dumps with indent, print. Loads back, print type\n`,
        expectedOutput: `{\n  "key": "val"\n}\n<class 'dict'>`,
      },
    },
  },
  {
    id: "design-patterns",
    title: "Design Patterns",
    category: "Expert",
    description: "Common software design patterns",
    content: `## Software Design Patterns\n\nDesign patterns are typical solutions to commonly occurring problems in software design. They represent best practices evolved over time.\n\n### Three Main Categories\n1. **Creational Patterns**: Deal with object creation mechanisms. Example: **Singleton** ensures a class has only one single instance globally.\n2. **Structural Patterns**: Deal with object composition and relationships. Example: **Facade** provides a simplified interface to a complex body of code.\n3. **Behavioral Patterns**: Deal with communication between objects. Example: **Observer** lets objects subscribe to and receive notifications about events from other objects.`,
    codeExample: `class Singleton:\n    _instance = None\n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n        return cls._instance\n\na = Singleton()\nb = Singleton()\nprint(a is b)  # True`,
    exercises: {
      beginner: {
        prompt: "Create a `Singleton` class using `__new__`. Create two instances `a` and `b`. Print `a is b`.",
        starterCode: `# Define Singleton, create two instances, check identity\n`,
        expectedOutput: "True",
      },
      intermediate: {
        prompt: "Write `make(kind)` that returns `'Circle'` if `kind=='c'` else `'Square'`. Print `make('c')` and `make('s')`.",
        starterCode: `# Define factory function and print results\n`,
        expectedOutput: "Circle\nSquare",
      },
      advanced: {
        prompt: "Create `Emitter` class with `on(event, fn)` and `emit(event)`. Register a function for `'hi'` that prints `'Hello'`. Call `emit('hi')`.",
        starterCode: `# Define Emitter with on/emit, register handler, emit\n`,
        expectedOutput: "Hello",
      },
    },
  },

  // ═══════════════════════════════════════
  // ADDITIONAL LESSONS — Expanded PyMaster Curriculum
  // ═══════════════════════════════════════
  {
    id: "recursion",
    title: "Recursion",
    category: "Intermediate",
    description: "Solve problems using recursive functions",
    content: `## Recursion\n\nA function that calls itself to break a problem into smaller sub-problems.\n\n### Key Concepts\n- **Base case** — stops the recursion\n- **Recursive case** — calls itself with a smaller input\n- **Stack depth** — Python limits recursion depth (~1000)\n\n### Common Examples\nFactorial, Fibonacci, tree traversal, backtracking.`,
    codeExample: `def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))  # 120\n\ndef fibonacci(n):\n    if n <= 1: return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\nprint(fibonacci(7))  # 13`,
    exercises: {
      beginner: {
        prompt: "Write `factorial(n)` recursively with base case `n <= 1` returning `1`. Print `factorial(5)`.",
        starterCode: `# Define recursive factorial and print factorial(5)\n`,
        expectedOutput: "120",
      },
      intermediate: {
        prompt: "Write `sum_to(n)` recursively. Base case: `n == 0` returns `0`. Print `sum_to(5)`.",
        starterCode: `# Define sum_to recursively and print sum_to(5)\n`,
        expectedOutput: "15",
      },
      advanced: {
        prompt: "Write `fib(n)` recursively. Base cases: `fib(0)=0, fib(1)=1`. Print `fib(7)`.",
        starterCode: `# Define recursive fib and print fib(7)\n`,
        expectedOutput: "13",
      },
    },
  },
  {
    id: "sorting-algorithms",
    title: "Sorting Algorithms",
    category: "Advanced",
    description: "Implement classic sorting algorithms in Python",
    content: `## Sorting Algorithms\n\n### Bubble Sort — O(n²)\nRepeatedly swap adjacent elements.\n\n### Selection Sort — O(n²)\nFind minimum, place at front.\n\n### Merge Sort — O(n log n)\nDivide and conquer.\n\n### Quick Sort — O(n log n) average\nPick pivot, partition.`,
    codeExample: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\n\nprint(bubble_sort([64, 34, 25, 12, 22, 11, 90]))`,
    exercises: {
      beginner: {
        prompt: "Use `sorted()` on `[5, 2, 8]`. Print the result. Then use `.sort()` on `[3, 1]` and print it.",
        starterCode: `# sorted() and .sort() examples\n`,
        expectedOutput: "[2, 5, 8]\n[1, 3]",
      },
      intermediate: {
        prompt: "Implement `bubble_sort(arr)` using nested loops and swapping. Sort `[4, 2, 1]`. Print the result.",
        starterCode: `def bubble_sort(arr):\n    # Implement bubble sort\n    pass\n\nprint(bubble_sort([4, 2, 1]))\n`,
        expectedOutput: "[1, 2, 4]",
      },
      advanced: {
        prompt: "Implement `selection_sort(arr)`: find min in unsorted part, swap it to front. Sort `[3, 1, 2]`. Print the result.",
        starterCode: `def selection_sort(arr):\n    # Implement selection sort\n    pass\n\nprint(selection_sort([3, 1, 2]))\n`,
        expectedOutput: "[1, 2, 3]",
      },
    },
  },
  {
    id: "regex",
    title: "Regular Expressions",
    category: "Advanced",
    description: "Pattern matching with the re module",
    content: `## Regular Expressions\n\nThe \`re\` module provides regex support.\n\n### Common Patterns\n- \`\\d\` — digit, \`\\w\` — word char, \`\\s\` — whitespace\n- \`+\` — one or more, \`*\` — zero or more\n- \`[]\` — character class, \`()\` — capture group\n\n### Functions\n\`re.match()\`, \`re.search()\`, \`re.findall()\`, \`re.sub()\``,
    codeExample: `import re\n\ntext = "Call me at 123-456-7890 or 987-654-3210"\nphones = re.findall(r'\\d{3}-\\d{3}-\\d{4}', text)\nprint(phones)\n\nemail = "user@pymaster.com"\nif re.match(r'[\\w.]+@[\\w.]+', email):\n    print("Valid email")`,
    exercises: {
      beginner: {
        prompt: "Use `re.match()` to check if `'abc'` starts with `r'[a-z]'`. Print `True` if match, `False` otherwise.",
        starterCode: `import re\n\n# Use re.match and print True/False\n`,
        expectedOutput: "True",
      },
      intermediate: {
        prompt: "Use a capture group `r'(\\d+)-(\\d+)'` on `'id: 12-34'`. Use `re.search()` and print `.groups()`.",
        starterCode: `import re\n\n# Search with capture group, print groups\n`,
        expectedOutput: "('12', '34')",
      },
      advanced: {
        prompt: "Use `re.findall()` with `r'[A-Z][a-z]+'` on `'Hello World py Test'`. Print the list.",
        starterCode: `import re\n\n# Find capitalized words, print list\n`,
        expectedOutput: "['Hello', 'World', 'Test']",
      },
    },
  },
  {
    id: "itertools-functools",
    title: "itertools & functools",
    category: "Expert",
    description: "Advanced iteration and functional programming tools",
    content: `## itertools & functools\n\n### itertools\n- \`chain\` — combine iterables\n- \`product\` — Cartesian product\n- \`permutations\`, \`combinations\`\n- \`groupby\` — group consecutive elements\n\n### functools\n- \`reduce\` — accumulate values\n- \`lru_cache\` — memoization\n- \`partial\` — partial function application`,
    codeExample: `from itertools import combinations, permutations\nfrom functools import reduce\n\nprint(list(combinations([1,2,3], 2)))\nprint(list(permutations("AB")))\nprint(reduce(lambda a,b: a*b, [1,2,3,4,5]))`,
    exercises: {
      beginner: {
        prompt: "Use `itertools.chain` to combine `[1, 2]` and `[3, 4]`. Print as a `list`.",
        starterCode: `from itertools import chain\n\n# Chain and print as list\n`,
        expectedOutput: "[1, 2, 3, 4]",
      },
      intermediate: {
        prompt: "Use `itertools.permutations('AB')`. Print the list of tuples.",
        starterCode: `from itertools import permutations\n\n# Print permutations of 'AB'\n`,
        expectedOutput: "[('A', 'B'), ('B', 'A')]",
      },
      advanced: {
        prompt: "Use `functools.partial` to create `add5 = partial(add, 5)` where `add(a,b) = a+b`. Print `add5(3)`. Then use `functools.reduce` to sum `[1,2,3]`. Print it.",
        starterCode: `from functools import partial, reduce\n\ndef add(a, b): return a + b\n\n# Create partial, print. Reduce sum, print.\n`,
        expectedOutput: "8\n6",
      },
    },
  },
  {
    id: "boolean-none",
    title: "Boolean Logic & None",
    category: "Beginner",
    description: "Understand truthy values, boolean expressions, and the None object",
    content: `## Boolean Logic\n\nBooleans represent truth values: \`True\` and \`False\`.\n\n### Common ideas\n- Comparison expressions return booleans\n- \`and\`, \`or\`, and \`not\` combine conditions\n- Empty strings, empty collections, 0, and \`None\` are falsy\n- \`None\` means “no value” and should be checked with \`is None\`\n\n### Why it matters\nBoolean logic controls decisions, loops, filtering, and validation in real Python programs.`,
    codeExample: `user_name = ""\nage = 20\nscore = None\n\nprint(bool(user_name))      # False\nprint(age >= 18 and age < 60)\nprint(score is None)        # True\n\nstatus = "ready" if user_name or age >= 18 else "wait"\nprint(status)`,
    exercises: {
      beginner: {
        prompt: "Print `bool('')`, `bool(0)`, and `bool([])` on separate lines to see falsy values.",
        starterCode: `# Print bool of empty string, zero, and empty list\n`,
        expectedOutput: "False\nFalse\nFalse",
      },
      intermediate: {
        prompt: "Given `x = None`. Print `x is None`. Then use `not` on `True` and print the result.",
        starterCode: `x = None\n\n# Print is None check, then print not True\n`,
        expectedOutput: "True\nFalse",
      },
      advanced: {
        prompt: "Given `a=True, b=False`. Print `a and b`, `a or b`, then `'yes' if a else 'no'`.",
        starterCode: `a = True\nb = False\n\n# Print and, or, ternary\n`,
        expectedOutput: "False\nTrue\nyes",
      },
    },
  },
  {
    id: "json-serialization",
    title: "JSON & Serialization",
    category: "Intermediate",
    description: "Convert Python data to JSON and back again",
    content: `## JSON in Python\n\nJSON is a text format used to exchange structured data.\n\n### Core functions\n- \`json.dumps()\` converts Python data to a JSON string\n- \`json.loads()\` parses a JSON string into Python data\n- \`json.dump()\` and \`json.load()\` work with files\n\n### When to use it\nUse JSON when working with APIs, config files, browser apps, and saved structured data.`,
    codeExample: `import json\n\nuser = {"name": "PyMaster", "level": "beginner", "xp": 120}\njson_text = json.dumps(user, indent=2)\nprint(json_text)\n\nparsed = json.loads('{"ok": true, "count": 3}')\nprint(parsed["count"])`,
    exercises: {
      beginner: {
        prompt: "Use `json.dumps()` on `{'a': 1}`. Print the JSON string.",
        starterCode: `import json\n\n# Dumps and print\n`,
        expectedOutput: '{"a": 1}',
      },
      intermediate: {
        prompt: "Use `json.loads()` on `'{\"x\": 10}'`. Print the value of key `'x'`.",
        starterCode: `import json\n\n# Loads and print value\n`,
        expectedOutput: "10",
      },
      advanced: {
        prompt: "Write `{'a': 1}` to `'out.json'` with `json.dump()`. Read it back with `json.load()`. Print the loaded dict.",
        starterCode: `import json\n\n# Dump to file, load back, print\n`,
        expectedOutput: "{'a': 1}",
      },
    },
  },
  {
    id: "datetime",
    title: "Datetime & Time Utilities",
    category: "Intermediate",
    description: "Work with dates, times, timedeltas, and formatting",
    content: `## Datetime\n\nPython's \`datetime\` module helps you create, compare, and format dates and times.\n\n### Key tools\n- \`datetime.now()\` for current date and time\n- \`date()\` and \`time()\` parts of a datetime\n- \`timedelta\` for adding or subtracting time\n- \`strftime()\` for formatting output\n\n### Common use cases\nScheduling, timestamps, logs, expiration checks, reminders, and date math.`,
    codeExample: `from datetime import datetime, timedelta\n\nnow = datetime(2026, 4, 3, 10, 30)\nprint(now.strftime("%Y-%m-%d"))\n\nnext_week = now + timedelta(days=7)\nprint(next_week.strftime("%d %b %Y"))`,
    exercises: {
      beginner: {
        prompt: "Create `datetime(2026, 1, 15)`. Print it with `strftime('%Y-%m-%d')`.",
        starterCode: `from datetime import datetime\n\n# Create date and format it\n`,
        expectedOutput: "2026-01-15",
      },
      intermediate: {
        prompt: "Create `datetime(2026, 3, 1)`. Add `timedelta(days=10)`. Print the result with `strftime('%d %b %Y')`.",
        starterCode: `from datetime import datetime, timedelta\n\n# Create, add timedelta, format and print\n`,
        expectedOutput: "11 Mar 2026",
      },
      advanced: {
        prompt: "Compute the difference between `datetime(2026, 12, 31)` and `datetime(2026, 1, 1)`. Print `.days`.",
        starterCode: `from datetime import datetime\n\n# Compute difference and print days\n`,
        expectedOutput: "364",
      },
    },
  },
  {
    id: "typing-dataclasses",
    title: "Type Hints & Dataclasses",
    category: "Advanced",
    description: "Write clearer Python with annotations and lightweight data models",
    content: `## Type Hints & Dataclasses\n\nType hints document what values a function expects and returns.\n\n### Type hints\n- \`name: str\`\n- \`age: int\`\n- \`def greet(user: str) -> str:\`\n\n### Dataclasses\nUse \`@dataclass\` when a class mostly stores data. Python creates \`__init__\`, \`__repr__\`, and comparison helpers for you.\n\n### Why this helps\nYour code becomes easier to read, maintain, and check with tools.`,
    codeExample: `from dataclasses import dataclass\n\n@dataclass\nclass User:\n    name: str\n    xp: int\n\n\ndef level_label(xp: int) -> str:\n    return "pro" if xp >= 100 else "starter"\n\nuser = User("Asha", 140)\nprint(user)\nprint(level_label(user.xp))`,
    exercises: {
      beginner: {
        prompt: "Write `double(x: int) -> int` returning `x*2`. Print `double(5)`.",
        starterCode: `# Define function with type hints and print\n`,
        expectedOutput: "10",
      },
      intermediate: {
        prompt: "Create `@dataclass` `Item(name: str, qty: int)`. Print `Item('Pen', 3)`.",
        starterCode: `from dataclasses import dataclass\n\n# Define dataclass and print instance\n`,
        expectedOutput: "Item(name='Pen', qty=3)",
      },
      advanced: {
        prompt: "Create `@dataclass` `Vec(x: int, y: int)`. Create `a = Vec(1,2)` and `b = Vec(1,2)`. Print `a == b` and `a.x + b.y`.",
        starterCode: `from dataclasses import dataclass\n\n# Define Vec, create instances, print equality and sum\n`,
        expectedOutput: "True\n3",
      },
    },
  },
];
