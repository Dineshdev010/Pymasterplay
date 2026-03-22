export const pythonRiddles = [
  // ═══════════════════════════════════════
  // BASICS (original 30)
  // ═══════════════════════════════════════
  { q: "What does len('Python') return?", a: "6", difficulty: 'basic' },
  { q: "What is 2 ** 10 in Python?", a: "1024", difficulty: 'basic' },
  { q: "What does 'hello'[::-1] output?", a: "olleh", difficulty: 'basic' },
  { q: "What type is True in Python?", a: "bool", difficulty: 'basic' },
  { q: "What does list(range(5)) return?", a: "[0,1,2,3,4]", difficulty: 'basic' },
  { q: "What is 10 // 3 in Python?", a: "3", difficulty: 'basic' },
  { q: "What does 'py' * 3 output?", a: "pypypy", difficulty: 'basic' },
  { q: "What does type(3.14).__name__ return?", a: "float", difficulty: 'basic' },
  { q: "What is bool('') in Python?", a: "False", difficulty: 'basic' },
  { q: "What does [1,2,3].pop() return?", a: "3", difficulty: 'basic' },
  { q: "What is 'Python'[0] ?", a: "P", difficulty: 'basic' },
  { q: "What does sorted([3,1,2]) return?", a: "[1,2,3]", difficulty: 'basic' },
  { q: "What is 5 % 2 in Python?", a: "1", difficulty: 'basic' },
  { q: "What does abs(-7) return?", a: "7", difficulty: 'basic' },
  { q: "What is max(1, 5, 3)?", a: "5", difficulty: 'basic' },
  { q: "What does min(10, 3, 7) return?", a: "3", difficulty: 'basic' },
  { q: "What is int('42')?", a: "42", difficulty: 'basic' },
  { q: "What does 'HELLO'.lower() return?", a: "hello", difficulty: 'basic' },
  { q: "What is 3 ** 3 in Python?", a: "27", difficulty: 'basic' },
  { q: "What does 'abc'.upper() return?", a: "ABC", difficulty: 'basic' },
  { q: "What is len([1, 2, 3, 4])?", a: "4", difficulty: 'basic' },
  { q: "What does round(3.7) return?", a: "4", difficulty: 'basic' },
  { q: "What is str(100)?", a: "100", difficulty: 'basic' },
  { q: "What does 'hi there'.split() return?", a: "['hi','there']", difficulty: 'basic' },
  { q: "What is bool(0) in Python?", a: "False", difficulty: 'basic' },
  { q: "What does bool(1) return?", a: "True", difficulty: 'basic' },
  { q: "What is 15 // 4 in Python?", a: "3", difficulty: 'basic' },
  { q: "What does 'python'.capitalize() return?", a: "Python", difficulty: 'basic' },
  { q: "What is sum([1, 2, 3])?", a: "6", difficulty: 'basic' },
  { q: "What does 'abcabc'.count('a') return?", a: "2", difficulty: 'basic' },

  // ═══════════════════════════════════════
  // STRINGS & SLICING
  // ═══════════════════════════════════════
  { q: "What does 'hello world'.title() return?", a: "Hello World", difficulty: 'junior' },
  { q: "What does 'Python'[-1] return?", a: "n", difficulty: 'junior' },
  { q: "What does 'abcdef'[2:5] return?", a: "cde", difficulty: 'junior' },
  { q: "What does ' hello '.strip() return?", a: "hello", difficulty: 'junior' },
  { q: "What does 'hello'.replace('l','r') return?", a: "herro", difficulty: 'junior' },
  { q: "What does 'a,b,c'.split(',') return?", a: "['a','b','c']", difficulty: 'junior' },
  { q: "What does '-'.join(['a','b','c']) return?", a: "a-b-c", difficulty: 'junior' },
  { q: "What does 'hello'.startswith('he') return?", a: "True", difficulty: 'junior' },
  { q: "What does 'hello'.endswith('lo') return?", a: "True", difficulty: 'junior' },
  { q: "What does 'hello'.find('ll') return?", a: "2", difficulty: 'junior' },
  { q: "What does 'hello'.index('e') return?", a: "1", difficulty: 'junior' },
  { q: "What does 'hello'.isalpha() return?", a: "True", difficulty: 'junior' },
  { q: "What does '123'.isdigit() return?", a: "True", difficulty: 'junior' },
  { q: "What does 'Hello'.swapcase() return?", a: "hELLO", difficulty: 'junior' },
  { q: "What does 'cat' < 'dog' return?", a: "True", difficulty: 'junior' },
  { q: "What does 'python'[::2] return?", a: "pto", difficulty: 'junior' },
  { q: "What does 'abc' + 'def' return?", a: "abcdef", difficulty: 'junior' },
  { q: "What does 'hello'.center(9, '*') return?", a: "**hello**", difficulty: 'junior' },
  { q: "What does 'hello'.zfill(8) return?", a: "000hello", difficulty: 'junior' },
  { q: "What does chr(65) return?", a: "A", difficulty: 'junior' },
  { q: "What does ord('A') return?", a: "65", difficulty: 'junior' },

  // ═══════════════════════════════════════
  // LISTS & TUPLES
  // ═══════════════════════════════════════
  { q: "What does [1,2,3] + [4,5] return?", a: "[1,2,3,4,5]", difficulty: 'junior' },
  { q: "What does [0] * 4 return?", a: "[0,0,0,0]", difficulty: 'junior' },
  { q: "What does [1,2,3].index(2) return?", a: "1", difficulty: 'junior' },
  { q: "What does [3,1,4,1].count(1) return?", a: "2", difficulty: 'junior' },
  { q: "What does list(reversed([1,2,3])) return?", a: "[3,2,1]", difficulty: 'junior' },
  { q: "What does [1,2,3][:-1] return?", a: "[1,2]", difficulty: 'junior' },
  { q: "What does [1,2,3][-2:] return?", a: "[2,3]", difficulty: 'junior' },
  { q: "What does len(()) return?", a: "0", difficulty: 'junior' },
  { q: "What does (1,2,3)[1] return?", a: "2", difficulty: 'junior' },
  { q: "What does tuple([1,2,3]) return?", a: "(1,2,3)", difficulty: 'junior' },
  { q: "What does list('abc') return?", a: "['a','b','c']", difficulty: 'junior' },
  { q: "What does [1,[2,3]][1][0] return?", a: "2", difficulty: 'junior' },
  { q: "What does any([False, True, False]) return?", a: "True", difficulty: 'junior' },
  { q: "What does all([True, True, False]) return?", a: "False", difficulty: 'junior' },
  { q: "What does list(zip([1,2],[3,4])) return?", a: "[(1,3),(2,4)]", difficulty: 'junior' },

  // ═══════════════════════════════════════
  // DICTIONARIES & SETS
  // ═══════════════════════════════════════
  { q: "What does {'a':1,'b':2}.get('c', 0) return?", a: "0", difficulty: 'intermediate' },
  { q: "What does len({'x':1, 'y':2}) return?", a: "2", difficulty: 'intermediate' },
  { q: "What does list({'a':1,'b':2}.keys()) return?", a: "['a','b']", difficulty: 'intermediate' },
  { q: "What does list({'a':1,'b':2}.values()) return?", a: "[1,2]", difficulty: 'intermediate' },
  { q: "What does 'a' in {'a':1, 'b':2} return?", a: "True", difficulty: 'intermediate' },
  { q: "What does {1,2,3} & {2,3,4} return?", a: "{2,3}", difficulty: 'intermediate' },
  { q: "What does {1,2,3} | {3,4,5} return?", a: "{1,2,3,4,5}", difficulty: 'intermediate' },
  { q: "What does {1,2,3} - {2,3} return?", a: "{1}", difficulty: 'intermediate' },
  { q: "What does len(set([1,1,2,2,3])) return?", a: "3", difficulty: 'intermediate' },
  { q: "What does dict(a=1, b=2) return?", a: "{'a':1,'b':2}", difficulty: 'intermediate' },
  { q: "What does {**{'a':1}, **{'b':2}} return?", a: "{'a':1,'b':2}", difficulty: 'intermediate' },
  { q: "What does frozenset([1,2,2]) return?", a: "frozenset({1,2})", difficulty: 'intermediate' },

  // ═══════════════════════════════════════
  // LIST COMPREHENSIONS
  // ═══════════════════════════════════════
  { q: "What does [x*2 for x in range(3)] return?", a: "[0,2,4]", difficulty: 'intermediate' },
  { q: "What does [x for x in range(6) if x%2==0] return?", a: "[0,2,4]", difficulty: 'intermediate' },
  { q: "What does [x**2 for x in range(4)] return?", a: "[0,1,4,9]", difficulty: 'intermediate' },
  { q: "What does [c.upper() for c in 'abc'] return?", a: "['A','B','C']", difficulty: 'intermediate' },
  { q: "What does {x:x**2 for x in range(3)} return?", a: "{0:0,1:1,2:4}", difficulty: 'intermediate' },
  { q: "What does [i for i in range(5) if i > 2] return?", a: "[3,4]", difficulty: 'intermediate' },
  { q: "What does sum(x for x in range(4)) return?", a: "6", difficulty: 'intermediate' },
  { q: "What does [len(w) for w in ['hi','hey']] return?", a: "[2,3]", difficulty: 'intermediate' },
  { q: "What does {x%3 for x in range(6)} return?", a: "{0,1,2}", difficulty: 'intermediate' },
  { q: "What does [x if x>0 else 0 for x in [-1,2,-3]] return?", a: "[0,2,0]", difficulty: 'intermediate' },

  // ═══════════════════════════════════════
  // GENERATORS & ITERATORS
  // ═══════════════════════════════════════
  { q: "What does next(iter([10,20,30])) return?", a: "10", difficulty: 'advanced' },
  { q: "What does list(range(0,10,3)) return?", a: "[0,3,6,9]", difficulty: 'advanced' },
  { q: "What does sum(range(5)) return?", a: "10", difficulty: 'advanced' },
  { q: "What does list(enumerate('ab')) return?", a: "[(0,'a'),(1,'b')]", difficulty: 'advanced' },
  { q: "What does list(filter(None, [0,1,'',2])) return?", a: "[1,2]", difficulty: 'advanced' },
  { q: "What does list(map(str, [1,2,3])) return?", a: "['1','2','3']", difficulty: 'advanced' },
  { q: "What does list(map(len, ['ab','cde'])) return?", a: "[2,3]", difficulty: 'advanced' },
  { q: "What type is (x for x in range(3))?", a: "generator", difficulty: 'advanced' },
  { q: "What does list(range(5,0,-2)) return?", a: "[5,3,1]", difficulty: 'advanced' },
  { q: "What does next(iter('hello')) return?", a: "h", difficulty: 'advanced' },

  // ═══════════════════════════════════════
  // FUNCTIONS & LAMBDA
  // ═══════════════════════════════════════
  { q: "What does (lambda x: x+1)(4) return?", a: "5", difficulty: 'advanced' },
  { q: "What does (lambda x,y: x*y)(3,4) return?", a: "12", difficulty: 'advanced' },
  { q: "What does (lambda s: s[::-1])('abc') return?", a: "cba", difficulty: 'advanced' },
  { q: "What does (lambda *a: sum(a))(1,2,3) return?", a: "6", difficulty: 'advanced' },
  { q: "What does callable(print) return?", a: "True", difficulty: 'advanced' },
  { q: "What does callable(42) return?", a: "False", difficulty: 'advanced' },
  { q: "What is the default return of a function with no return?", a: "None", difficulty: 'advanced' },
  { q: "What does isinstance(True, int) return?", a: "True", difficulty: 'advanced' },
  { q: "What does isinstance('hi', str) return?", a: "True", difficulty: 'advanced' },
  { q: "What does issubclass(bool, int) return?", a: "True", difficulty: 'advanced' },

  // ═══════════════════════════════════════
  // DECORATORS & ADVANCED
  // ═══════════════════════════════════════
  { q: "What does @staticmethod make a method?", a: "static", difficulty: 'expert' },
  { q: "What does @property make a method behave like?", a: "attribute", difficulty: 'expert' },
  { q: "What does __init__ do in a class?", a: "initialize", difficulty: 'expert' },
  { q: "What does __str__ return for an object?", a: "string", difficulty: 'expert' },
  { q: "What does __len__ allow you to use on a class?", a: "len()", difficulty: 'expert' },
  { q: "What does super() do in a subclass?", a: "call parent", difficulty: 'expert' },
  { q: "What does __name__ equal when a script runs directly?", a: "__main__", difficulty: 'expert' },
  { q: "What keyword creates a generator function?", a: "yield", difficulty: 'expert' },
  { q: "What keyword handles cleanup in try blocks?", a: "finally", difficulty: 'expert' },
  { q: "What does *args collect in a function?", a: "tuple", difficulty: 'expert' },
  { q: "What does **kwargs collect in a function?", a: "dict", difficulty: 'expert' },

  // ═══════════════════════════════════════
  // TYPE CONVERSIONS & MATH
  // ═══════════════════════════════════════
  { q: "What does float('3.14') return?", a: "3.14", difficulty: 'intermediate' },
  { q: "What does int(3.9) return?", a: "3", difficulty: 'intermediate' },
  { q: "What does divmod(10, 3) return?", a: "(3,1)", difficulty: 'intermediate' },
  { q: "What does pow(2, 3) return?", a: "8", difficulty: 'intermediate' },
  { q: "What does hex(255) return?", a: "0xff", difficulty: 'intermediate' },
  { q: "What does bin(10) return?", a: "0b1010", difficulty: 'intermediate' },
  { q: "What does oct(8) return?", a: "0o10", difficulty: 'intermediate' },
  { q: "What does round(2.5) return?", a: "2", difficulty: 'intermediate' },
  { q: "What does round(3.5) return?", a: "4", difficulty: 'intermediate' },
  { q: "What does complex(3, 4).real return?", a: "3.0", difficulty: 'intermediate' },

  // ═══════════════════════════════════════
  // BOOLEAN & LOGIC
  // ═══════════════════════════════════════
  { q: "What does not True return?", a: "False", difficulty: 'basic' },
  { q: "What does True + True return?", a: "2", difficulty: 'basic' },
  { q: "What does True and False return?", a: "False", difficulty: 'basic' },
  { q: "What does False or 'hello' return?", a: "hello", difficulty: 'basic' },
  { q: "What does 0 or '' or 'hi' return?", a: "hi", difficulty: 'basic' },
  { q: "What does None is None return?", a: "True", difficulty: 'basic' },
  { q: "What does [] == [] return?", a: "True", difficulty: 'basic' },
  { q: "What does [] is [] return?", a: "False", difficulty: 'basic' },
  { q: "What does bool([]) return?", a: "False", difficulty: 'basic' },
  { q: "What does bool({}) return?", a: "False", difficulty: 'basic' },
  { q: "What does bool(None) return?", a: "False", difficulty: 'basic' },
  { q: "What does 1 == True return?", a: "True", difficulty: 'basic' },
  { q: "What does 0 == False return?", a: "True", difficulty: 'basic' },
];
