import json

builtins_list = [
    ('abs', 'abs(-5)', 'Returns absolute value'),
    ('aiter', 'aiter(async_iterable)', 'Returns asynchronous iterator (Python 3.10+)'),
    ('all', 'all([True, False])', 'Returns True if all elements are true'),
    ('anext', 'anext(async_iterator)', 'Returns next item from async iterator (Python 3.10+)'),
    ('any', 'any([False, True])', 'Returns True if any element is true'),
    ('ascii', 'ascii(obj)', 'Returns string containing printable representation'),
    ('bin', 'bin(10)', 'Converts integer to binary string'),
    ('bool', 'bool(1)', 'Returns boolean value'),
    ('breakpoint', 'breakpoint()', 'Drops into the debugger'),
    ('bytearray', 'bytearray([50, 100])', 'Returns a mutable bytearray object'),
    ('bytes', 'bytes([50, 100])', 'Returns an immutable bytes object'),
    ('callable', 'callable(print)', 'Checks if object appears callable'),
    ('chr', 'chr(65)', 'Returns character from Unicode integer'),
    ('classmethod', '@classmethod', 'Converts a method into a class method'),
    ('compile', 'compile("x=5", "test", "exec")', 'Compiles source into code object'),
    ('complex', 'complex(1, 2)', 'Creates a complex number'),
    ('delattr', 'delattr(obj, "name")', 'Deletes an attribute from an object'),
    ('dict', 'dict(a=1, b=2)', 'Creates a dictionary'),
    ('dir', 'dir()', 'Returns list of valid attributes of an object'),
    ('divmod', 'divmod(10, 3)', 'Returns quotient and remainder'),
    ('enumerate', 'list(enumerate(["a", "b"]))', 'Yields index and value pairs'),
    ('eval', 'eval("5 + 10")', 'Evaluates a Python expression'),
    ('exec', 'exec("print(\'Hi\')")', 'Executes dynamic Python code'),
    ('filter', 'list(filter(None, [0, 1]))', 'Filters elements from an iterable'),
    ('float', 'float("3.14")', 'Converts to a floating point number'),
    ('format', 'format(3.1415, ".2f")', 'Formats a value'),
    ('frozenset', 'frozenset([1, 2, 3])', 'Creates an immutable frozenset'),
    ('getattr', 'getattr(obj, "name")', 'Returns the value of an attribute'),
    ('globals', 'globals()', 'Returns dictionary of current global symbol table'),
    ('hasattr', 'hasattr(obj, "name")', 'Checks if object has given attribute'),
    ('hash', 'hash("test")', 'Returns the hash value of an object'),
    ('help', 'help(print)', 'Invokes the built-in help system'),
    ('hex', 'hex(255)', 'Converts integer to hexadecimal string'),
    ('id', 'id(obj)', 'Returns the identity (memory address) of an object'),
    ('input', 'input("Prompt:")', 'Reads a line from input'),
    ('int', 'int("10")', 'Converts to an integer'),
    ('isinstance', 'isinstance(5, int)', 'Checks if an object is an instance of a class'),
    ('issubclass', 'issubclass(bool, int)', 'Checks if a class is a subclass of another'),
    ('iter', 'iter([1, 2])', 'Returns an iterator object'),
    ('len', 'len("hello")', 'Returns the length (number of items)'),
    ('list', 'list((1, 2))', 'Creates a list'),
    ('locals', 'locals()', 'Returns dictionary of current local symbol table'),
    ('map', 'list(map(str, [1, 2]))', 'Applies function to every item of an iterable'),
    ('max', 'max(1, 5, 3)', 'Returns the largest item'),
    ('memoryview', 'memoryview(b"abc")', 'Returns a memory view object'),
    ('min', 'min(1, 5, 3)', 'Returns the smallest item'),
    ('next', 'next(iterator)', 'Retrieves the next item from an iterator'),
    ('object', 'object()', 'Returns a new featureless object'),
    ('oct', 'oct(8)', 'Converts integer to octal string'),
    ('open', 'open("file.txt")', 'Opens a file and returns a stream'),
    ('ord', 'ord("A")', 'Returns an integer representing the Unicode char'),
    ('pow', 'pow(2, 3)', 'Returns base to the power exp'),
    ('print', 'print("Hello")', 'Prints to the standard output'),
    ('property', '@property', 'Returns a property attribute'),
    ('range', 'list(range(5))', 'Generates a sequence of numbers'),
    ('repr', 'repr("test")', 'Returns a string containing printable representation'),
    ('reversed', 'list(reversed([1, 2]))', 'Returns a reverse iterator'),
    ('round', 'round(3.1415, 2)', 'Rounds a number'),
    ('set', 'set([1, 2, 2])', 'Creates a set'),
    ('setattr', 'setattr(obj, "name", value)', 'Sets the value of an attribute'),
    ('slice', 'slice(1, 5, 2)', 'Returns a slice object representing a set of indices'),
    ('sorted', 'sorted([3, 1, 2])', 'Returns a new sorted list'),
    ('staticmethod', '@staticmethod', 'Converts a method to a static method'),
    ('str', 'str(10)', 'Returns a string version of an object'),
    ('sum', 'sum([1, 2, 3])', 'Sums the items of an iterable'),
    ('super', 'super()', 'Returns a proxy object that delegates method calls to a parent or sibling class'),
    ('tuple', 'tuple([1, 2])', 'Creates a tuple'),
    ('type', 'type(5)', 'Returns the type of an object'),
    ('vars', 'vars(obj)', 'Returns the __dict__ attribute for a module, class, instance'),
    ('zip', 'list(zip([1], [2]))', 'Iterates over several iterables in parallel'),
    ('__import__', '__import__("math")', 'Invoked by the import statement (rarely used directly)')
]

content_lines = ['## All 71 Python Built-in Functions', '', 'Python has exactly 71 built-in functions natively available. Here is the complete list:', '']
for name, code, desc in builtins_list:
    content_lines.append(f'- **`{name}()`**: {desc}')

code_lines = ['# Reference guide for all 71 Python built-in functions\n']
for name, code, desc in builtins_list:
    code_lines.append(f'# {name}(): {desc}\n{code}\n')

result = {
    'content': '\n'.join(content_lines),
    'codeExample': '\n'.join(code_lines)
}

with open('scratch/builtins_lesson_gen.json', 'w') as f:
    json.dump(result, f, indent=2)

print("SUCCESS")
