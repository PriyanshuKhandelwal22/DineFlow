// app/kds/OrderColumn.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import OrderCard from "./OrderCard";
import EmptyState from "./EmptyState";

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

type OrderColumnProps = {
  title: string;
  orders: OrderType[];
  columnType: "new" | "preparing" | "ready" | "completed";
  onAccept: (orderId: string) => void;
  onReject: (orderId: string) => void;
  onReady: (orderId: string) => void;
  onComplete: (orderId: string) => void;
  onToggleItemPrepped: (orderId: string, itemKey: string, nextValue: boolean) => void;
  loadingActions?: Record<string, boolean>;
  badgeColor?: string;
};

export default function OrderColumn({
  title,
  orders,
  columnType,
  onAccept,
  onReject,
  onReady,
  onComplete,
  onToggleItemPrepped,
  loadingActions = {},
  badgeColor = "bg-slate-800 text-slate-400",
}: OrderColumnProps) {
  return (
    <div className="flex flex-col bg-slate-950 border border-slate-900 rounded-[24px] p-4 flex-1 h-[calc(100vh-140px)] min-h-[500px]">
      {/* Column Header */}
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-900">
        <h3 className="font-black text-sm uppercase tracking-wider text-slate-300 flex items-center gap-2">
          {title}
        </h3>
        <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${badgeColor}`}>
          {orders.length}
        </span>
      </div>

      {/* Cards List with Framer Motion AnimatePresence */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-transparent">
        <AnimatePresence mode="popLayout">
          {orders.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <EmptyState columnType={columnType} />
            </motion.div>
          ) : (
            orders.map((order) => (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -30 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              >
                <OrderCard
                  order={order}
                  onAccept={() => onAccept(order.id)}
                  onReject={() => onReject(order.id)}
                  onReady={() => onReady(order.id)}
                  onComplete={() => onComplete(order.id)}
                  onToggleItemPrepped={(itemKey, nextValue) =>
                    onToggleItemPrepped(order.id, itemKey, nextValue)
                  }
                  isActionLoading={!!loadingActions[order.id]}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
