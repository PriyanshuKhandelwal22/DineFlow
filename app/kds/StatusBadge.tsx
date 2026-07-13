// app/kds/StatusBadge.tsx
import React from "react";

type StatusBadgeProps = {
  type: "priority" | "stage";
  value: string | number;
};

const PREP_STAGES = [
  { title: "New", icon: "📥", color: "bg-blue-500/10 text-blue-400 border-blue-500/30" },
  { title: "Accepted", icon: "🤝", color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30" },
  { title: "Cooking", icon: "🍳", color: "bg-amber-500/10 text-amber-400 border-amber-500/30" },
  { title: "Ready", icon: "✅", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" },
  { title: "Completed", icon: "📦", color: "bg-slate-500/10 text-slate-400 border-slate-500/30" },
];

export default function StatusBadge({ type, value }: StatusBadgeProps) {
  if (type === "priority") {
    const priority = String(value);

    switch (priority) {
      case "VIP":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-purple-500/15 text-purple-400 border border-purple-500/35 shadow-sm shadow-purple-950/40 animate-pulse">
            👑 VIP
          </span>
        );
      case "Rush":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-red-500/15 text-red-400 border border-red-500/35 shadow-sm shadow-red-950/40 animate-pulse">
            🚨 RUSH
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-800 text-slate-400 border border-slate-700/80">
            ⚡ Normal
          </span>
        );
    }
  }

  if (type === "stage") {
    const stageIdx = Number(value);
    const stage = PREP_STAGES[stageIdx] || PREP_STAGES[0];

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase border ${stage.color}`}>
        <span>{stage.icon}</span>
        {stage.title}
      </span>
    );
  }

  return null;
}
