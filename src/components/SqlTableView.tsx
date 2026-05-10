import { Eye, Square, Download, Copy, ArrowUp, ArrowDown, Hash, Calendar, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { toast } from "sonner";

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

function isNumeric(val: string): boolean {
  if (!val) return false;
  const clean = val.replace(/^"|"$/g, "");
  return !isNaN(Number(clean)) && !isNaN(parseFloat(clean));
}

function isDate(val: string): boolean {
  if (!val) return false;
  const clean = val.replace(/^"|"$/g, "");
  return /^\d{4}-\d{2}-\d{2}/.test(clean);
}

export function SqlTableView({ csvOutput, onDownload }: SqlTableViewProps) {
  const [sortConfig, setSortConfig] = useState<{ key: number; direction: "asc" | "desc" } | null>(null);
  const [isCopying, setIsCopying] = useState(false);

  const trimmed = csvOutput.trim();
  if (!trimmed) {
    return (
      <div className="p-8 text-center text-xs text-muted-foreground italic border-t border-border bg-background/50">
        Query executed successfully, but returned no results.
      </div>
    );
  }

  const lines = trimmed.split("\n");
  const headers = useMemo(() => splitCsvLine(lines[0]), [lines]);
  const rawRows = useMemo(() => lines.slice(1).map((line) => splitCsvLine(line)), [lines]);

  const sortedRows = useMemo(() => {
    if (!sortConfig) return rawRows;
    const sorted = [...rawRows].sort((a, b) => {
      const aVal = a[sortConfig.key]?.replace(/^"|"$/g, "") || "";
      const bVal = b[sortConfig.key]?.replace(/^"|"$/g, "") || "";

      if (isNumeric(aVal) && isNumeric(bVal)) {
        return sortConfig.direction === "asc" 
          ? Number(aVal) - Number(bVal)
          : Number(bVal) - Number(aVal);
      }

      return sortConfig.direction === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
    return sorted;
  }, [rawRows, sortConfig]);

  const handleSort = (index: number) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === index && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: index, direction });
  };

  const handleCopy = async () => {
    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(csvOutput);
      toast.success("Table copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy table");
    } finally {
      setTimeout(() => setIsCopying(false), 1500);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-0 overflow-hidden bg-background/50 border-t border-border">
      <div className="flex-1 overflow-auto custom-scrollbar max-h-[300px]">
        <table className="w-full text-left border-collapse table-auto">
          <thead className="sticky top-0 z-20 bg-surface-1 shadow-sm border-b border-border">
            <tr>
              {headers.map((h, i) => (
                <th
                  key={i}
                  onClick={() => handleSort(i)}
                  className="px-4 py-2 text-[10px] font-bold text-primary uppercase tracking-widest whitespace-nowrap cursor-pointer hover:bg-muted/50 transition-colors select-none group/th"
                >
                  <div className="flex items-center gap-2">
                    {h.replace(/^"|"$/g, "")}
                    <div className="flex flex-col opacity-0 group-hover/th:opacity-100 transition-opacity">
                      <ArrowUp className={`w-2 h-2 -mb-0.5 ${sortConfig?.key === i && sortConfig.direction === "asc" ? "text-primary opacity-100" : "text-muted-foreground/30"}`} />
                      <ArrowDown className={`w-2 h-2 ${sortConfig?.key === i && sortConfig.direction === "desc" ? "text-primary opacity-100" : "text-muted-foreground/30"}`} />
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {sortedRows.map((row, i) => (
              <tr key={i} className="hover:bg-primary/5 transition-colors duration-75 group">
                {row.map((cell, j) => {
                  const cleanCell = cell.replace(/^"|"$/g, "").replace(/""/g, '"');
                  const isNum = isNumeric(cleanCell);
                  const isDat = isDate(cleanCell);
                  return (
                    <td key={j} className={`px-4 py-1.5 text-[11px] font-mono whitespace-nowrap transition-colors ${
                      isNum ? "text-reward-gold" : isDat ? "text-python-blue" : "text-foreground/80"
                    } group-hover:text-foreground`}>
                      <div className="flex items-center gap-1.5">
                        {isNum && <Hash className="w-2.5 h-2.5 opacity-30" />}
                        {isDat && <Calendar className="w-2.5 h-2.5 opacity-30" />}
                        {cleanCell === "NULL" ? (
                          <span className="text-muted-foreground/30 italic text-[10px]">null</span>
                        ) : (
                          cleanCell
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-3 py-1.5 flex items-center justify-between border-t border-border/50 bg-surface-1/30 text-[9px] uppercase tracking-tighter text-muted-foreground font-mono">
        <div className="flex items-center gap-4">
          <span>{sortedRows.length} rows returned</span>
          {sortConfig && (
            <span className="text-primary font-bold flex items-center gap-1">
              Sorted by {headers[sortConfig.key].replace(/^"|"$/g, "")} ({sortConfig.direction})
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleCopy}
            className="flex items-center gap-1 hover:text-primary transition-colors disabled:opacity-50"
            disabled={isCopying}
          >
            {isCopying ? <Check className="w-2.5 h-2.5 text-streak-green" /> : <Copy className="w-2.5 h-2.5" />}
            {isCopying ? "Copied!" : "Copy Table"}
          </button>
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
    </div>
  );
}
