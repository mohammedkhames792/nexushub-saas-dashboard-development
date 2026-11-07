"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface HeatmapProps {
  weeks?: number;
}

function generateHeatData(weeks: number): number[][] {
  const data: number[][] = [];
  for (let w = 0; w < weeks; w++) {
    const week: number[] = [];
    for (let d = 0; d < 7; d++) {
      // Simulate activity: higher chance on weekdays, random intensity
      const isWeekday = d < 5;
      const base = isWeekday ? 0.6 : 0.3;
      const rand = Math.random();
      week.push(rand < base ? Math.floor(Math.random() * 4) + 1 : 0);
    }
    data.push(week);
  }
  return data;
}

const LEVELS = [
  "bg-surface-100 dark:bg-surface-800",       // 0 - no activity
  "bg-nexus-200 dark:bg-nexus-900/40",         // 1 - low
  "bg-nexus-400 dark:bg-nexus-700/60",         // 2 - medium
  "bg-nexus-600 dark:bg-nexus-500/80",         // 3 - high
  "bg-nexus-700 dark:bg-nexus-400",            // 4 - very high
];

const TOOLTIP_LABELS = ["No activity", "1 contribution", "2-3 contributions", "4-6 contributions", "7+ contributions"];

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function ActivityHeatmap({ weeks = 26 }: HeatmapProps) {
  const data = useMemo(() => generateHeatData(weeks), [weeks]);

  // Calculate month labels positions
  const monthPositions: { label: string; index: number }[] = [];
  const weeksPerMonth = Math.floor(weeks / 12);
  for (let m = 0; m < 12; m++) {
    const weekIndex = m * weeksPerMonth;
    if (weekIndex < weeks) {
      monthPositions.push({ label: MONTH_LABELS[m], index: weekIndex });
    }
  }

  const totalContributions = data.flat().reduce((sum, v) => sum + v, 0);

  return (
    <div className="rounded-2xl border border-surface-200 dark:border-surface-700/60 bg-white dark:bg-surface-900 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white">Activity</h2>
          <p className="text-sm text-surface-500 dark:text-surface-400">{totalContributions} contributions in the last 6 months</p>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-1 text-xs text-surface-400">
          <span>Less</span>
          {LEVELS.map((level, i) => (
            <div key={i} className={`h-3 w-3 rounded-sm ${level}`} title={TOOLTIP_LABELS[i]} />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-0.5 min-w-fit">
          {/* Month labels */}
          <div className="flex gap-0.5 ml-8 mb-1">
            {data.map((_, w) => {
              const month = monthPositions.find((m) => m.index === w);
              return (
                <div key={w} className="w-3">
                  {month && <span className="text-[10px] text-surface-400 font-medium">{month.label}</span>}
                </div>
              );
            })}
          </div>

          {/* Heat grid */}
          {Array.from({ length: 7 }, (_, day) => (
            <div key={day} className="flex items-center gap-0.5">
              <span className="w-7 text-[10px] text-surface-400 font-medium text-right pr-1">{DAY_LABELS[day]}</span>
              {data.map((week, w) => {
                const value = week[day] ?? 0;
                const level = Math.min(value, 4);
                return (
                  <motion.div
                    key={w}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.15, delay: (w * 7 + day) * 0.003 }}
                    className={`h-3 w-3 rounded-sm ${LEVELS[level]} cursor-pointer hover:ring-1 hover:ring-nexus-400 transition-all`}
                    title={`${value} contributions`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
