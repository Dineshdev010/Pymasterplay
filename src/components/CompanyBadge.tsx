import { cn } from "@/lib/utils";

const companyBrandMap: Record<string, { mark: string; ring: string; bg: string; text: string }> = {
  Amazon: { mark: "a", ring: "border-orange-500/30", bg: "bg-orange-500/12", text: "text-orange-700 dark:text-orange-300" },
  Google: { mark: "G", ring: "border-sky-500/30", bg: "bg-sky-500/12", text: "text-sky-700 dark:text-sky-300" },
  Meta: { mark: "M", ring: "border-blue-500/30", bg: "bg-blue-500/12", text: "text-blue-700 dark:text-blue-300" },
  Microsoft: { mark: "MS", ring: "border-emerald-500/30", bg: "bg-emerald-500/12", text: "text-emerald-700 dark:text-emerald-300" },
  Apple: { mark: "A", ring: "border-slate-500/30", bg: "bg-slate-500/12", text: "text-slate-700 dark:text-slate-300" },
  Salesforce: { mark: "SF", ring: "border-cyan-500/30", bg: "bg-cyan-500/12", text: "text-cyan-700 dark:text-cyan-300" },
  Adobe: { mark: "Ae", ring: "border-red-500/30", bg: "bg-red-500/12", text: "text-red-700 dark:text-red-300" },
  PayPal: { mark: "PP", ring: "border-indigo-500/30", bg: "bg-indigo-500/12", text: "text-indigo-700 dark:text-indigo-300" },
  Accenture: { mark: "Ac", ring: "border-violet-500/30", bg: "bg-violet-500/12", text: "text-violet-700 dark:text-violet-300" },
  Infosys: { mark: "In", ring: "border-cyan-500/30", bg: "bg-cyan-500/12", text: "text-cyan-700 dark:text-cyan-300" },
  TCS: { mark: "TC", ring: "border-blue-500/30", bg: "bg-blue-500/12", text: "text-blue-700 dark:text-blue-300" },
  Wipro: { mark: "W", ring: "border-fuchsia-500/30", bg: "bg-fuchsia-500/12", text: "text-fuchsia-700 dark:text-fuchsia-300" },
  Zoho: { mark: "Z", ring: "border-rose-500/30", bg: "bg-rose-500/12", text: "text-rose-700 dark:text-rose-300" },
  Oracle: { mark: "O", ring: "border-red-500/30", bg: "bg-red-500/12", text: "text-red-700 dark:text-red-300" },
  IBM: { mark: "IBM", ring: "border-sky-500/30", bg: "bg-sky-500/12", text: "text-sky-700 dark:text-sky-300" },
};

function fallbackMark(company: string) {
  const parts = company.split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("");
}

export function CompanyBadge({
  company,
  className,
  compact = false,
}: {
  company: string;
  className?: string;
  compact?: boolean;
}) {
  const brand = companyBrandMap[company] ?? {
    mark: fallbackMark(company),
    ring: "border-primary/20",
    bg: "bg-primary/10",
    text: "text-primary",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium",
        brand.ring,
        brand.bg,
        brand.text,
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full border border-current/15 bg-background/80 font-semibold uppercase tracking-[0.08em]",
          compact ? "h-5 min-w-5 px-1 text-[9px]" : "h-6 min-w-6 px-1.5 text-[10px]",
        )}
        aria-hidden="true"
      >
        {brand.mark}
      </span>
      <span>{company}</span>
    </span>
  );
}
