// app/kds/KitchenStats.tsx
import React from "react";

type KitchenStatsProps = {
  activeCount: number;
  alertCount: number;
  dispatchedCount: number;
  vipRushCount: number;
};

export default function KitchenStats({
  activeCount,
  alertCount,
  dispatchedCount,
  vipRushCount,
}: KitchenStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full lg:w-auto">
      {/* Active Tickets */}
      <div className="bg-slate-900 border border-slate-850 p-3.5 rounded-2xl text-center shadow-inner relative overflow-hidden group">
        <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mb-0.5">
          Active Prep
        </span>
        <span className="font-black text-2xl text-blue-400">{activeCount}</span>
        <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
      </div>

      {/* Staff Help Calls */}
      <div className="bg-slate-900 border border-slate-850 p-3.5 rounded-2xl text-center shadow-inner relative overflow-hidden group">
        <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mb-0.5">
          Help Alarms
        </span>
        <span className={`font-black text-2xl ${alertCount > 0 ? "text-red-500 animate-pulse" : "text-slate-400"}`}>
          {alertCount}
        </span>
        <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
      </div>

      {/* Dispatched / Ready */}
      <div className="bg-slate-900 border border-slate-850 p-3.5 rounded-2xl text-center shadow-inner relative overflow-hidden group">
        <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mb-0.5">
          Ready Pickup
        </span>
        <span className="font-black text-2xl text-emerald-400">{dispatchedCount}</span>
        <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
      </div>

      {/* Rush & VIP Load */}
      <div className="bg-slate-900 border border-slate-850 p-3.5 rounded-2xl text-center shadow-inner relative overflow-hidden group">
        <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mb-0.5">
          Urgent Load
        </span>
        <span className={`font-black text-2xl ${vipRushCount > 0 ? "text-orange-500" : "text-slate-400"}`}>
          {vipRushCount}
        </span>
        <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
      </div>
    </div>
  );
}
