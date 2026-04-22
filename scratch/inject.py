import json
import re

with open('scratch/builtins_lesson_gen.json', 'r') as f:
    data = json.load(f)

content_str = data['content'].replace('`', '\\`')
code_str = data['codeExample'].replace('`', '\\`')

with open('src/data/lessons.ts', 'r', encoding='utf-8') as f:
    ts_code = f.read()

# We want to replace the `content` and `codeExample` inside `id: "builtin-functions"`
# Using regex to find them.

ts_code = re.sub(
    r'(id:\s*"builtin-functions"[^}]*content:\s*)`.*?`',
    f'\\g<1>`{content_str}`',
    ts_code,
    flags=re.DOTALL
)

ts_code = re.sub(
    r'(id:\s*"builtin-functions"[^}]*codeExample:\s*)`.*?`',
    f'\\g<1>`{code_str}`',
    ts_code,
    flags=re.DOTALL
)

with open('src/data/lessons.ts', 'w', encoding='utf-8') as f:
    f.write(ts_code)

print("INJECTED SUCCESS")
