// app/kds/KDSHeader.tsx
"use client";

import React, { useState, useEffect } from "react";
import KitchenStats from "./KitchenStats";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

type KDSHeaderProps = {
  activeCount: number;
  alertCount: number;
  dispatchedCount: number;
  vipRushCount: number;
};

export default function KDSHeader({
  activeCount,
  alertCount,
  dispatchedCount,
  vipRushCount,
}: KDSHeaderProps) {
  const [time, setTime] = useState("");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
      setDateStr(
        now.toLocaleDateString([], {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 border-b border-slate-900 pb-5">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-extrabold text-2xl shadow-xl shadow-blue-950/40 relative">
          🍳
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
        </div>
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-black text-2xl tracking-tight text-white uppercase">
              ChefMonitor <span className="text-blue-500">KDS</span>
            </h1>
            <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Feed
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="p-1 px-2 text-[10px] bg-slate-900 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition-all ml-2"
              title="Sign Out"
            >
              <LogOut className="w-3 h-3" />
              <span>Exit</span>
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            {dateStr} • <span className="text-slate-400 font-bold">{time}</span>
          </p>
        </div>
      </div>

      <KitchenStats
        activeCount={activeCount}
        alertCount={alertCount}
        dispatchedCount={dispatchedCount}
        vipRushCount={vipRushCount}
      />
    </header>
  );
}
