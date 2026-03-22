import { useMemo } from "react";

interface ActivityGraphProps {
  activityMap: Record<string, number>;
}

export function ActivityGraph({ activityMap }: ActivityGraphProps) {
  const weeks = useMemo(() => {
    const result: { date: string; level: number }[][] = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364);
    // Align to Sunday
    startDate.setDate(startDate.getDate() - startDate.getDay());

    let currentWeek: { date: string; level: number }[] = [];
    const d = new Date(startDate);

    const toLocalDateStr = (date: Date) =>
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    while (d <= today) {
      const dateStr = toLocalDateStr(d);
      const count = activityMap[dateStr] || 0;
      const level = count === 0 ? 0 : count <= 1 ? 1 : count <= 3 ? 2 : count <= 5 ? 3 : 4;
      currentWeek.push({ date: dateStr, level });

      if (d.getDay() === 6) {
        result.push(currentWeek);
        currentWeek = [];
      }
      d.setDate(d.getDate() + 1);
    }
    if (currentWeek.length > 0) result.push(currentWeek);
    return result;
  }, [activityMap]);

  const months = useMemo(() => {
    const labels: { label: string; col: number }[] = [];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let lastMonth = -1;
    weeks.forEach((week, i) => {
      if (week.length > 0) {
        const [, monthStr] = week[0].date.split("-");
        const m = parseInt(monthStr, 10) - 1;
        if (m !== lastMonth) {
          labels.push({ label: monthNames[m], col: i });
          lastMonth = m;
        }
      }
    });
    return labels;
  }, [weeks]);

  // Calculate total columns for proper month positioning
  const totalCols = weeks.length;

  return (
    <div className="overflow-x-auto">
      <div className="relative h-4 mb-1" style={{ width: totalCols * 14 }}>
        {months.map((m, i) => (
          <span
            key={i}
            className="text-[10px] text-muted-foreground absolute top-0"
            style={{ left: m.col * 14 }}
          >
            {m.label}
          </span>
        ))}
      </div>
      <div className="flex gap-[3px]">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day, di) => (
              <div
                key={di}
                className={`activity-cell w-[11px] h-[11px] activity-cell-${day.level}`}
                title={`${day.date}: ${activityMap[day.date] || 0} activities`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
