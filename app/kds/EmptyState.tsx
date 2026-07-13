// app/kds/EmptyState.tsx
import React from "react";
import { CheckCircle2, Flame, Inbox, PackageOpen } from "lucide-react";

type EmptyStateProps = {
  columnType: "new" | "preparing" | "ready" | "completed";
};

export default function EmptyState({ columnType }: EmptyStateProps) {
  const getConfig = () => {
    switch (columnType) {
      case "new":
        return {
          title: "Inbox Clear",
          description: "No new incoming orders at the moment.",
          icon: Inbox,
          iconColor: "text-slate-600",
        };
      case "preparing":
        return {
          title: "Stove is Idle",
          description: "No orders are currently being prepared.",
          icon: Flame,
          iconColor: "text-slate-600",
        };
      case "ready":
        return {
          title: "Pickup Counter Clear",
          description: "No dishes waiting for runners or waiters.",
          icon: PackageOpen,
          iconColor: "text-slate-600",
        };
      default:
        return {
          title: "Archive Clear",
          description: "No completed tickets in the current log.",
          icon: CheckCircle2,
          iconColor: "text-slate-600",
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-900/10 border border-dashed border-slate-900 rounded-2xl h-48 select-none">
      <Icon className={`w-8 h-8 ${config.iconColor} mb-2.5 opacity-60`} />
      <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-widest">{config.title}</h4>
      <p className="text-[10px] text-slate-500 max-w-[180px] mx-auto mt-1 leading-relaxed">
        {config.description}
      </p>
    </div>
  );
}
