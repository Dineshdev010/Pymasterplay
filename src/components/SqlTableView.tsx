import { Eye, Square, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SqlTableViewProps {
  csvOutput: string;
  onDownload?: () => void;
}

export function splitCsvLine(line: string): string[] {
  const result: string[] = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(cell.trim());
      cell = "";
    } else {
      cell += char;
    }
  }
  result.push(cell.trim());
  return result;
}

export function SqlTableView({ csvOutput, onDownload }: SqlTableViewProps) {
  const lines = csvOutput.trim().split("\n");
  if (lines.length === 0 || !csvOutput.includes(",")) {
    return <pre className="p-4 text-[11px] font-mono text-foreground whitespace-pre-wrap">{csvOutput}</pre>;
  }

  const headers = splitCsvLine(lines[0]);
  const rows = lines.slice(1).map((line) => splitCsvLine(line));

  return (
    <div className="w-full flex flex-col min-h-0 overflow-hidden bg-background/50 border-t border-border">
      <div className="flex-1 overflow-auto custom-scrollbar max-h-[300px]">
        <table className="w-full text-left border-collapse table-auto">
          <thead className="sticky top-0 z-20 bg-surface-1 shadow-sm border-b border-border">
            <tr>
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="px-4 py-2 text-[10px] font-bold text-python-blue uppercase tracking-widest whitespace-nowrap"
                >
                  {h.replace(/^"|"$/g, "")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-surface-2/50 transition-colors duration-100 group">
                {row.map((cell, j) => {
                  const cleanCell = cell.replace(/^"|"$/g, "").replace(/""/g, '"');
                  return (
                    <td key={j} className="px-4 py-1.5 text-[11px] font-mono text-foreground/80 group-hover:text-foreground whitespace-nowrap">
                      {cleanCell === "NULL" ? (
                        <span className="text-muted-foreground/30 italic text-[10px]">null</span>
                      ) : (
                        cleanCell
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-3 py-1.5 flex items-center justify-between border-t border-border/50 bg-surface-1/30 text-[9px] uppercase tracking-tighter text-muted-foreground font-mono">
        <span>{rows.length} rows returned</span>
        {onDownload && (
          <button 
            onClick={onDownload}
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <Download className="w-2.5 h-2.5" /> Download CSV
          </button>
        )}
      </div>
    </div>
  );
}
