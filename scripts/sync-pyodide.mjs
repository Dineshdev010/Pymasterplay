import { cpSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const sourceDir = path.join(root, "node_modules", "pyodide");
const targetDir = path.join(root, "public", "pyodide");

const filesToCopy = [
  "pyodide.js",
  "pyodide.asm.js",
  "pyodide.asm.wasm",
  "python_stdlib.zip",
  "pyodide-lock.json",
];

if (!existsSync(sourceDir)) {
  console.error("Pyodide package not found in node_modules. Run `npm install pyodide@0.26.4` first.");
  process.exit(1);
}

mkdirSync(targetDir, { recursive: true });

for (const file of filesToCopy) {
  cpSync(path.join(sourceDir, file), path.join(targetDir, file), { force: true });
}

console.log(`Synced Pyodide assets to ${targetDir}`);
