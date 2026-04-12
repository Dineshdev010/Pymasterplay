export interface PythonTip {
  title: string;
  content: string;
  code?: string;
}

export const pythonTips: PythonTip[] = [
  {
    title: "Enumerate like a Pro",
    content: "When you need both the index and the value from a list, don't use range(len(x)). Use enumerate().",
    code: "for idx, val in enumerate(['a', 'b']):\n    print(idx, val)"
  },
  {
    title: "List Comprehensions",
    content: "Create new lists more efficiently and readable with comprehension syntax.",
    code: "squares = [x*x for x in range(10)]"
  },
  {
    title: "F-Strings magic",
    content: "F-strings are not just for variables; you can even execute expressions inside them!",
    code: "print(f'2 + 2 is {2 + 2}')"
  },
  {
    title: "The zip() function",
    content: "Use zip() to iterate over two or more lists at the same time in parallel.",
    code: "for n, a in zip(names, ages):\n    print(n, a)"
  },
  {
    title: "Dictionary .get()",
    content: "Avoid KeyErrors by using .get() which returns None (or a default) if the key is missing.",
    code: "val = my_dict.get('missing_key', 'default')"
  },
  {
    title: "Set for Uniqueness",
    content: "Need to remove duplicates quickly? Convert your list to a set and back to a list.",
    code: "unique_list = list(set(duplicates))"
  },
  {
    title: "Unpack with *",
    content: "You can unpack remaining elements into a variable using the * operator.",
    code: "first, *middle, last = [1, 2, 3, 4, 5]"
  },
  {
    title: "collections.Counter",
    content: "Counting occurrences? The Counter class is the fastest and most Pythonic way.",
    code: "from collections import Counter\ncounts = Counter('abracadabra')"
  },
  {
    title: "Walrus Operator (:=)",
    content: "Assign and use a value within an expression to save lines and improve logic flow.",
    code: "if (n := len(data)) > 10:\n    print(f'Too much data: {n}')"
  },
  {
    title: "Defaultdict",
    content: "Avoid checking if a key exists before adding to a list inside a dictionary.",
    code: "from collections import defaultdict\nd = defaultdict(list)\nd['key'].append(1)"
  },
  {
    title: "Context Managers",
    content: "Always use 'with' when handling files or database connections to ensure they close properly.",
    code: "with open('file.txt') as f:\n    data = f.read()"
  },
  {
    title: "Itertools for Performance",
    content: "The itertools module contains high-performance tools for complex iterations.",
    code: "from itertools import chain\ncombined = chain(list1, list2)"
  },
  {
    title: "Any & All",
    content: "Quickly check if any or all elements in an iterable satisfy a condition.",
    code: "is_valid = all(x > 0 for x in numbers)"
  },
  {
    title: "Lambda Functions",
    content: "Use small, anonymous lambda functions for simple logic, especially inside map or filter.",
    code: "add_five = lambda x: x + 5"
  },
  {
    title: "Pathlib over os.path",
    content: "Pathlib offers an object-oriented approach to file system paths.",
    code: "from pathlib import Path\np = Path('data') / 'file.txt'"
  }
];
