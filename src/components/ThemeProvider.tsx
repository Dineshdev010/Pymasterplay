// ============================================================
// THEME PROVIDER — src/components/ThemeProvider.tsx
// Manages dark/light theme toggle.
// Saves preference to localStorage so it persists across visits.
// ============================================================

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// Only two themes supported
type Theme = "dark" | "light";

// Context shape: current theme + toggle function
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Default: dark mode, no-op toggle (overridden by provider)
const ThemeContext = createContext<ThemeContextType>({ theme: "dark", toggleTheme: () => {} });

/**
 * useTheme() — Access the current theme and toggle function.
 * Usage: const { theme, toggleTheme } = useTheme();
 */
export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * ThemeProvider — Wraps the app to provide theme context.
 * 
 * How it works:
 * 1. On mount, reads saved theme from localStorage (default: "dark")
 * 2. Adds the theme class to <html> element (Tailwind uses this for dark mode)
 * 3. toggleTheme() switches between "dark" and "light"
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage, else fallback to clock detection
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem("pymaster_theme");
      if (stored) return stored as Theme;
      
      // Auto-detect based on local clock
      const hour = new Date().getHours();
      // 6 AM (6) to 5:59 PM (17) is Light Mode. 6 PM (18) to 5:59 AM (5) is Dark Mode.
      if (hour >= 6 && hour < 18) {
        return "light";
      }
      return "dark";
    } catch {
      return "dark";
    }
  });

  // When theme changes, update the <html> class and save to localStorage
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark"); // Remove old theme class
    root.classList.add(theme); // Add new theme class
    localStorage.setItem("pymaster_theme", theme); // Persist preference
  }, [theme]);

  // Toggle between dark and light
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
