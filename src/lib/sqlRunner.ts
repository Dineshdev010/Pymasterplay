import { executePython, type ExecutionResult } from "@/lib/piston";
import { SQL_PRACTICE_DB_SETUP_SQL } from "@/data/sqlSampleData";

function buildSqlPythonHarness(sql: string) {
  const setup = JSON.stringify(SQL_PRACTICE_DB_SETUP_SQL);
  const query = JSON.stringify(sql);

  return `
import sqlite3, csv, io, re

setup_sql = ${setup}
user_sql = ${query}

def _split_statements(text: str):
    # Simple splitter: OK for practice SQL (avoid semicolons in string literals).
    parts = [p.strip() for p in text.split(";")]
    return [p for p in parts if p]

conn = sqlite3.connect(":memory:")
conn.execute("PRAGMA foreign_keys = ON;")
conn.execute("PRAGMA busy_timeout = 5000;")
conn.execute("PRAGMA temp_store = MEMORY;")
conn.executescript(setup_sql)

stmts = _split_statements(user_sql.strip())
if not stmts:
    print("")
else:
    cur = conn.cursor()
    for s in stmts[:-1]:
        cur.execute(s)
    last = stmts[-1]
    cur.execute(last)

    if cur.description:
        cols = [d[0] for d in cur.description]
        rows = cur.fetchall()
        out = io.StringIO()
        writer = csv.writer(out, lineterminator="\\n")
        writer.writerow(cols)
        for row in rows:
            writer.writerow(["NULL" if v is None else v for v in row])
        print(out.getvalue().rstrip("\\n"))
    else:
        conn.commit()
        print(f"OK ({cur.rowcount} rows)")
`;
}

export interface SqlResult {
  columns: string[];
  values: any[][];
}

export interface SqlExecutionResult extends ExecutionResult {
  parsed?: SqlResult;
}

export async function executeSql(sql: string, options?: { timeoutMs?: number }): Promise<SqlExecutionResult> {
  const harness = buildSqlPythonHarness(sql);
  const result = await executePython(harness, options);
  
  if (!result.error && result.output) {
    try {
      const trimmedOutput = (result.output || "").trim();
      if (!trimmedOutput) return result;
      
      const lines = trimmedOutput.split("\n");
      if (lines.length > 0) {
        // Simple CSV parsing for SQLite output
        const columns = lines[0].split(",");
        const values = lines.slice(1).map(line => {
          // Handle potential commas in values if needed, 
          // but for now simple split is fine for basic challenges
          return line.split(",").map(v => v === "NULL" ? null : v);
        });
        return {
          ...result,
          parsed: { columns, values }
        };
      }
    } catch (e) {
      console.error("Failed to parse SQL output:", e);
    }
  }

  return result;
}

