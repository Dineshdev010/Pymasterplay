const fs = require('fs');

const data = JSON.parse(fs.readFileSync('scratch/builtins_lesson_gen.json', 'utf8'));

let tsCode = fs.readFileSync('src/data/lessons.ts', 'utf8');

// Use exact string replacement to avoid regex issues with backticks
const oldContent = "    content: `## Python Built-in Functions\\n\\nPython provides many functions natively without needing to \\`import\\` any modules.\\n\\n### Math & Numbers\\n- **\\`abs(x)\\`**: Returns the absolute value.\\n- **\\`round(x, n)\\`**: Rounds a number to \\`n\\` decimal places.\\n- **\\`sum(iterable)\\`**: Sums the items (e.g., a list).\\n- **\\`max(...)\\` / \\`min(...)\\`**: Returns the largest/smallest item.\\n- **\\`divmod(a, b)\\`**: Returns \\`(quotient, remainder)\\`.\\n- **\\`pow(base, exp)\\`**: Returns base to the power of exp.\\n\\n### Type & Object Info\\n- **\\`type(obj)\\`**: Returns the type of an object.\\n- **\\`isinstance(obj, class)\\`**: Checks if an object is of a specific type.\\n- **\\`id(obj)\\`**: Returns the unique memory address.\\n- **\\`len(s)\\`**: Returns the length (number of items).\\n\\n### Iterables & Sequences\\n- **\\`sorted(iterable)\\`**: Returns a new sorted list.\\n- **\\`reversed(seq)\\`**: Returns a reverse iterator.\\n- **\\`enumerate(iterable)\\`**: Adds a counter to an iterable.\\n- **\\`zip(*iterables)\\`**: Iterates over multiple iterables in parallel.\\n- **\\`any(iter)\\` / \\`all(iter)\\`**: Checks if any/all elements are True.\\n- **\\`map(func, iter)\\` / \\`filter(func, iter)\\`**: Applies a function or filters items.\\n\\n### IO & Conversions\\n- **\\`print(...)\\` / \\`input(prompt)\\`**: Standard output and input.\\n- **\\`int()\\`, \\`float()\\`, \\`str()\\`, \\`bool()\\`, \\`list()\\`, \\`dict()\\`, \\`set()\\`, \\`tuple()\\`**: Type conversions.\\n- **\\`chr(i)\\` / \\`ord(c)\\`**: Converts between integer Unicode and a character.\\n- **\\`hex(x)\\`, \\`bin(x)\\`, \\`oct(x)\\`**: Converts int to hex/binary/octal strings.\\n\\n### Advanced\\n- **\\`eval(expr)\\` / \\`exec(code)\\`**: Evaluates/executes dynamic Python strings.\\n- **\\`globals()\\` / \\`locals()\\`**: Returns current global/local symbol dictionaries.\\n- **\\`help(obj)\\`**: Invokes the built-in help system.`,";

const oldCodeExample = "    codeExample: `# Math\\nprint(abs(-10))         # 10\\nprint(round(3.1415, 2)) # 3.14\\nprint(sum([1, 2, 3]))   # 6\\nprint(max(7, 3, 10))    # 10\\n\\n# Types & Iterables\\nnames = [\"Alice\", \"Bob\"]\\nprint(len(names))       # 2\\nprint(sorted([5, 1, 3])) # [1, 3, 5]\\n\\nfor i, name in enumerate(names):\\n    print(f\"{i}: {name}\")\\n\\n# Conversions\\nprint(int(\"42\") + 8)    # 50\\nprint(bin(10))          # '0b1010'\\nprint(chr(65))          # 'A'`,";

// Ensure the old block exists before continuing
if (tsCode.indexOf(oldContent) === -1) {
  console.log("ERROR: oldContent not found!");
  process.exit(1);
}
if (tsCode.indexOf(oldCodeExample) === -1) {
    console.log("ERROR: oldCodeExample not found!");
    process.exit(1);
}

const newContentLine = "    content: " + JSON.stringify(data.content) + ",";
const newCodeExampleLine = "    codeExample: " + JSON.stringify(data.codeExample) + ",";

tsCode = tsCode.replace(oldContent, newContentLine);
tsCode = tsCode.replace(oldCodeExample, newCodeExampleLine);

fs.writeFileSync('src/data/lessons.ts', tsCode, 'utf8');
console.log("SUCCESS");
