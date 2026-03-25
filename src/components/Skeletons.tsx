// ============================================================
// SKELETON LOADERS — src/components/Skeletons.tsx
// Loading placeholders shown while pages are being lazy-loaded.
// These give users visual feedback that content is coming.
// ============================================================

/**
 * PageSkeleton — Generic page loading skeleton.
 * Shows a title bar, subtitle, 3 cards, and text lines.
 */
export function PageSkeleton() {
  return (
    <div className="min-h-[60vh] p-6 space-y-6 animate-pulse">
      <div className="h-8 bg-muted rounded-lg w-1/3" /> {/* Title */}
      <div className="h-4 bg-muted rounded w-2/3" /> {/* Subtitle */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-muted rounded-xl" /> /* Cards */
        ))}
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded w-full" /> {/* Text lines */}
        <div className="h-4 bg-muted rounded w-5/6" />
        <div className="h-4 bg-muted rounded w-4/6" />
      </div>
    </div>
  );
}

/**
 * CardSkeleton — Single card loading skeleton.
 */
export function CardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 animate-pulse space-y-3">
      <div className="h-10 w-10 bg-muted rounded-lg" /> {/* Icon */}
      <div className="h-5 bg-muted rounded w-2/3" /> {/* Title */}
      <div className="h-3 bg-muted rounded w-full" /> {/* Line 1 */}
      <div className="h-3 bg-muted rounded w-4/5" /> {/* Line 2 */}
    </div>
  );
}

/**
 * EditorSkeleton — Loading skeleton for code editor pages.
 * Shows a toolbar, code area with fake lines, and side panel.
 */
export function EditorSkeleton() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col md:h-[calc(100vh-3.5rem)] animate-pulse">
      <div className="h-12 bg-surface-1 border-b border-border" /> {/* Toolbar */}
      <div className="flex-1 flex">
        <div className="flex-1 bg-muted/30 p-4 space-y-2">
          {/* Fake code lines with random widths */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-4 bg-muted rounded" style={{ width: `${30 + Math.random() * 50}%` }} />
          ))}
        </div>
        <div className="w-96 bg-surface-0 border-l border-border hidden md:block" /> {/* Side panel */}
      </div>
    </div>
  );
}

/**
 * DashboardSkeleton — Loading skeleton for the dashboard page.
 * Shows avatar, stats grid, and content blocks.
 */
export function DashboardSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-pulse space-y-8">
      {/* Profile header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-muted" /> {/* Avatar */}
        <div className="space-y-2 flex-1">
          <div className="h-7 bg-muted rounded w-48" /> {/* Name */}
          <div className="h-4 bg-muted rounded w-64" /> {/* Subtitle */}
        </div>
      </div>
      {/* Stats grid (6 stat cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-card border border-border rounded-lg p-4 space-y-2">
            <div className="h-6 w-6 bg-muted rounded" />
            <div className="h-6 bg-muted rounded w-12" />
            <div className="h-3 bg-muted rounded w-20" />
          </div>
        ))}
      </div>
      {/* Content blocks */}
      <div className="bg-card border border-border rounded-lg p-6 h-48" />
      <div className="bg-card border border-border rounded-lg p-6 h-32" />
    </div>
  );
}

/**
 * ProblemsListSkeleton — Loading skeleton for the problems list page.
 * Shows filters, and a list of problem cards.
 */
export function ProblemsListSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-pulse space-y-4">
      <div className="h-8 bg-muted rounded w-48" /> {/* Title */}
      <div className="h-4 bg-muted rounded w-72" /> {/* Subtitle */}
      {/* Filter pills */}
      <div className="flex gap-2 mt-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-8 w-24 bg-muted rounded-full" />
        ))}
      </div>
      {/* Problem list items */}
      <div className="space-y-3 mt-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="bg-card border border-border rounded-lg p-4 flex items-center gap-4">
            <div className="w-8 h-8 bg-muted rounded" /> {/* Icon */}
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-48" /> {/* Title */}
              <div className="h-3 bg-muted rounded w-24" /> {/* Difficulty */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
