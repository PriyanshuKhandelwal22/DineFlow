// app/kds/OrderCard.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { AlertCircle, Clock } from "lucide-react";
import StatusBadge from "./StatusBadge";
import OrderItems from "./OrderItems";
import ActionButtons from "./ActionButtons";

type MenuItemType = {
  id: string;
  name: string;
  quantity: number;
  prepTime: string;
};

type OrderType = {
  id: string;
  table: string;
  sessionId?: string | null;
  notes: string;
  items: MenuItemType[];
  grandTotal: number;
  prepStage: number;
  time: string;
  timestamp: number;
  priority: string;
  completedDishes: Record<string, boolean>;
};

type OrderCardProps = {
  order: OrderType;
  onAccept: () => void;
  onReject: () => void;
  onReady: () => void;
  onComplete: () => void;
  onToggleItemPrepped: (itemKey: string, nextValue: boolean) => void;
  isActionLoading?: boolean;
};

export default function OrderCard({
  order,
  onAccept,
  onReject,
  onReady,
  onComplete,
  onToggleItemPrepped,
  isActionLoading = false,
}: OrderCardProps) {
  const [elapsed, setElapsed] = useState("");

  useEffect(() => {
    const updateElapsed = () => {
      const diffMs = Date.now() - order.timestamp;
      const totalSeconds = Math.floor(diffMs / 1000);
      if (totalSeconds < 60) {
        setElapsed("Just now");
      } else {
        const minutes = Math.floor(totalSeconds / 60);
        setElapsed(`${minutes} min${minutes > 1 ? "s" : ""} ago`);
      }
    };

    updateElapsed();
    const interval = setInterval(updateElapsed, 10000); // Update every 10s
    return () => clearInterval(interval);
  }, [order.timestamp]);

  const totalItems = useMemo(() => {
    return order.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [order.items]);

  const estPrepTime = useMemo(() => {
    // parallel cooking: max prep time of any item in the ticket
    const maxTime = order.items.reduce((max, item) => {
      const parsed = parseInt(item.prepTime) || 0;
      return parsed > max ? parsed : max;
    }, 0);
    return maxTime ? `${maxTime} mins` : "10 mins";
  }, [order.items]);

  // Stage names mapping
  const PREP_STAGES = [
    { title: "New", color: "text-blue-400" },
    { title: "Accepted", color: "text-indigo-400" },
    { title: "Cooking", color: "text-amber-400" },
    { title: "Ready", color: "text-emerald-400" },
    { title: "Completed", color: "text-slate-400" },
  ];

  const currentStage = PREP_STAGES[order.prepStage] || PREP_STAGES[0];

  return (
    <div
      className={`bg-slate-900 border rounded-2xl overflow-hidden shadow-lg transition-all relative flex flex-col justify-between border-slate-800 ${
        order.prepStage === 4 ? "opacity-60" : ""
      }`}
    >
      {/* Dynamic urgency color indicator stripe on left side */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-2.5 ${
          order.priority === "VIP"
            ? "bg-purple-600 animate-pulse"
            : order.priority === "Rush"
            ? "bg-red-500 animate-pulse"
            : "bg-blue-500"
        }`}
      />

      {/* Main card body */}
      <div className="p-4 pl-6 space-y-4">
        {/* Ticket Header */}
        <div className="flex justify-between items-start pb-2.5 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-slate-950 border border-slate-800 text-white text-xs font-black px-2.5 py-1 rounded-lg">
                T-{order.table}
              </span>
              <StatusBadge type="priority" value={order.priority} />
            </div>
            <span className="text-[10px] text-slate-500 font-mono block mt-1.5">ID: {order.id.slice(0, 8)}</span>
          </div>

          <div className="text-right flex flex-col items-end">
            <span className="text-[10px] text-slate-400 font-mono font-bold">{order.time}</span>
            <span className="text-[9px] text-orange-400 font-semibold flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3" /> {elapsed}
            </span>
          </div>
        </div>

        {/* Chef Warning Note */}
        {order.notes && (
          <div className="bg-amber-500/5 border border-amber-500/25 p-2.5 rounded-xl text-xs text-amber-400 font-bold flex gap-2 items-start">
            <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[8px] uppercase tracking-wider text-amber-500/70 block mb-0.5">Chef Instruction:</span>
              "{order.notes}"
            </div>
          </div>
        )}

        {/* Item Checklist */}
        <OrderItems
          orderId={order.id}
          items={order.items}
          completedDishes={order.completedDishes}
          onToggleItemPrepped={onToggleItemPrepped}
        />

        {/* Stats Summary */}
        <div className="flex justify-between text-[10px] text-slate-400 bg-slate-950/40 p-2 rounded-lg border border-slate-850">
          <span>Items Count: <strong>{totalItems}</strong></span>
          <span>Est. Prep: <strong>{estPrepTime}</strong></span>
        </div>
      </div>

      {/* Progress & Operational Actions */}
      <div className="bg-slate-950/60 p-4 border-t border-slate-800/80 space-y-3">
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-slate-500">Stage:</span>
          <span className={`font-black uppercase tracking-wider ${currentStage.color}`}>
            {currentStage.title}
          </span>
        </div>

        {/* Progress indicator */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full transition-all duration-500"
            style={{ width: `${(Math.min(order.prepStage, 3) / 3) * 100}%` }}
          />
        </div>

        <ActionButtons
          orderId={order.id}
          prepStage={order.prepStage}
          onAccept={onAccept}
          onReject={onReject}
          onReady={onReady}
          onComplete={onComplete}
          isLoading={isActionLoading}
        />
      </div>
    </div>
  );
}
