import React from 'react';

/**
 * A lightweight, fast syntax highlighter specifically tuned for the Python snippets
 * used in the PyMaster workshop/drag-and-drop game.
 */
export function PythonHighlight({ code }: { code: string }) {
  // We'll split by lines to handle comments easily
  const lines = code.split('\n');

  return (
    <>
      {lines.map((line, i) => {
        // Comment rendering
        if (line.trim().startsWith('#')) {
          return (
            <div key={i} className="text-slate-500 italic">
              {line}
            </div>
          );
        }

        // Extremely basic tokenizer for known workshop patterns
        // We replace tokens with distinctive safe strings, then split & map
        
        // 1. Strings (single and double quotes)
        const processedLine = line;
        
        // This regex highlights anything in quotes.
        // It's basic but works for the known workshop snippets.
        const stringRegex = /((?:f?["'][^"']*["']))/g;
        
        const parts = processedLine.split(stringRegex);

        return (
          <div key={i} className="min-h-[1.2em]">
            {parts.map((part, pIndex) => {
              // If it's a string part (matches our split group)
              if (stringRegex.test(part) || (part.startsWith('f"') || part.startsWith('f\'') || part.startsWith('"') || part.startsWith('\''))) {
                return (
                  <span key={pIndex} className="text-python-green">
                    {part}
                  </span>
                );
              }

              // Otherwise it's code, let's highlight keywords and numbers
              const wordRegex = /\b(print|type|range|if|else|while|for|in|def|class|return|try|except|finally|with|as|import|from|lambda|and|or|not|True|False|None)\b|\b(\d+\.?\d*)\b|\b([a-zA-Z_]\w*)(?=\s*\()|(\.append|\.upper|\.split)/g;
              const codeParts = part.split(wordRegex);

              return codeParts.map((cPart, cIndex) => {
                if (!cPart) return null;
                
                if (/^(print|type|range)$/.test(cPart)) {
                  return <span key={cIndex} className="text-python-blue">{cPart}</span>;
                }
                if (/^(if|else|while|for|in|def|class|return|try|except|finally|with|as|import|from|lambda|and|or|not)$/.test(cPart)) {
                  return <span key={cIndex} className="text-pink-400 font-semibold">{cPart}</span>;
                }
                if (/^(True|False|None)$/.test(cPart)) {
                  return <span key={cIndex} className="text-purple-400 font-bold">{cPart}</span>;
                }
                if (/^\d+\.?\d*$/.test(cPart)) {
                  return <span key={cIndex} className="text-python-yellow">{cPart}</span>;
                }
                if (/^(\.append|\.upper|\.split)$/.test(cPart)) {
                  return <span key={cIndex} className="text-cyan-300">{cPart}</span>;
                }
                
                // Keep leading/trailing spaces correctly
                // Replace normal spaces with non-breaking so indentations work if needed 
                // but actually pre tag wrapper handles it if we just output string.
                return <span key={cIndex} className="text-slate-300">{cPart}</span>;
              });
            })}
          </div>
        );
      })}
    </>
  );
}
