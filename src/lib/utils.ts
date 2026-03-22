// ============================================================
// UTILITY FUNCTIONS — src/lib/utils.ts
// A helper for combining Tailwind CSS class names.
// ============================================================

import { clsx, type ClassValue } from "clsx"; // clsx: conditionally join class names
import { twMerge } from "tailwind-merge"; // twMerge: merge conflicting Tailwind classes

/**
 * cn() — Combine and merge CSS class names
 * 
 * Usage: cn("text-red-500", isActive && "bg-blue-500", "text-blue-500")
 * 
 * - clsx handles conditional classes (falsy values are ignored)
 * - twMerge resolves conflicts (e.g., text-red-500 vs text-blue-500 → keeps last)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
