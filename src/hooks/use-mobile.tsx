// ============================================================
// MOBILE DETECTION HOOK — src/hooks/use-mobile.tsx
// Custom React hook to detect if the screen is mobile-sized.
// Returns true when viewport width < 768px (md breakpoint).
// ============================================================

import * as React from "react";

// Standard mobile breakpoint matching Tailwind's "md" (768px)
const MOBILE_BREAKPOINT = 768;

/**
 * useIsMobile() — Returns true if the screen width is below 768px.
 * 
 * Uses window.matchMedia for efficient, event-driven detection.
 * Automatically updates when the window is resized.
 * 
 * Usage:
 *   const isMobile = useIsMobile();
 *   if (isMobile) { // Show mobile layout }
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Create a media query that matches screens narrower than 768px
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    // Update state when the viewport crosses the breakpoint
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    mql.addEventListener("change", onChange); // Listen for resize events
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT); // Set initial value
    
    return () => mql.removeEventListener("change", onChange); // Cleanup
  }, []);

  return !!isMobile; // Convert undefined to false
}
