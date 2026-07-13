// app/kds/page.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CheckCircle2, Volume2, Wifi } from "lucide-react";
import KDSHeader from "./KDSHeader";
import OrderColumn from "./OrderColumn";

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

type StaffAlert = {
  id: string;
  table: string;
  reason: string;
  resolved: boolean;
  time: string;
};

export default function KDSPage() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [alerts, setAlerts] = useState<StaffAlert[]>([]);
  const [loadingActions, setLoadingActions] = useState<Record<string, boolean>>({});
  const [isSyncing, setIsSyncing] = useState(false);

  // Audio cue synthesizer
  const playKitchenBell = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.type = "sine";
      osc2.type = "sine";
      osc1.frequency.setValueAtTime(987.77, ctx.currentTime); // B5 note
      osc2.frequency.setValueAtTime(1318.51, ctx.currentTime); // E6 note

      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.8);
      osc2.stop(ctx.currentTime + 0.8);
    } catch (e) {
      console.log("AudioContext blocked or not supported by client environment.", e);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders", { cache: "no-store" });
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (e) {
      console.error("KDS failed to fetch orders:", e);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await fetch("/api/alerts", { cache: "no-store" });
      if (response.ok) {
        const data = await response.json();
        setAlerts(data);
      }
    } catch (e) {
      console.error("KDS failed to fetch alerts:", e);
    }
  };

  const syncAll = async () => {
    setIsSyncing(true);
    await Promise.all([fetchOrders(), fetchAlerts()]);
    setIsSyncing(false);
  };

  // Setup mount data fetching and Real-time listener channel
  useEffect(() => {
    syncAll();

    // Listen for tab focus/visibility events to sync
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        syncAll();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Setup tab-to-tab Event-driven sync channel
    try {
      const channel = new BroadcastChannel("dineflow-kds");
      channel.onmessage = (event) => {
        if (event.data.type === "NEW_ORDER") {
          fetchOrders();
          playKitchenBell();
        } else if (event.data.type === "NEW_ALERT") {
          fetchAlerts();
          playKitchenBell();
        }
      };

      return () => {
        channel.close();
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    } catch (e) {
      console.warn("BroadcastChannel not supported", e);
    }
  }, []);

  // Card Operations
  const handleUpdateStage = async (orderId: string, nextStage: number) => {
    setLoadingActions((prev) => ({ ...prev, [orderId]: true }));
    try {
      const response = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, prepStage: nextStage }),
      });

      if (response.ok) {
        const updated = await response.json();
        setOrders((prev) =>
          prev.map((order) => (order.id === orderId ? updated : order))
        );
      }
    } catch (e) {
      console.error("Failed to update order stage:", e);
    } finally {
      setLoadingActions((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  const handleToggleItemPrepped = async (
    orderId: string,
    itemKey: string,
    nextValue: boolean
  ) => {
    try {
      // Optimistic UI update
      setOrders((prev) =>
        prev.map((order) => {
          if (order.id === orderId) {
            return {
              ...order,
              completedDishes: {
                ...order.completedDishes,
                [itemKey]: nextValue,
              },
            };
          }
          return order;
        })
      );

      const response = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, itemKey, prepped: nextValue }),
      });

      if (!response.ok) {
        // Rollback on error
        fetchOrders();
      }
    } catch (e) {
      console.error("Failed to toggle item prepped status:", e);
      fetchOrders();
    }
  };

  const handleResolveAlert = async (alertId: string) => {
    try {
      // Optimistic update
      setAlerts((prev) => prev.filter((a) => a.id !== alertId));

      await fetch("/api/alerts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alertId, resolved: true }),
      });
    } catch (e) {
      console.error("Failed to resolve alert:", e);
      fetchAlerts();
    }
  };

  // Group columns
  const newOrders = useMemo(() => orders.filter((o) => o.prepStage === 0), [orders]);
  const preparingOrders = useMemo(
    () => orders.filter((o) => o.prepStage === 1 || o.prepStage === 2),
    [orders]
  );
  const readyOrders = useMemo(() => orders.filter((o) => o.prepStage === 3), [orders]);
  const completedOrders = useMemo(() => orders.filter((o) => o.prepStage === 4), [orders]);

  const activeCount = orders.filter((o) => o.prepStage < 3).length;
  const dispatchedCount = readyOrders.length;
  const vipRushCount = orders.filter(
    (o) => o.prepStage < 3 && (o.priority === "VIP" || o.priority === "Rush")
  ).length;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col font-sans select-none">
      <KDSHeader
        activeCount={activeCount}
        alertCount={alerts.length}
        dispatchedCount={dispatchedCount}
        vipRushCount={vipRushCount}
      />

      {/* Sync bar & operations */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-slate-900/60 p-3 rounded-2xl border border-slate-900">
        <div className="flex items-center gap-3">
          <button
            onClick={syncAll}
            disabled={isSyncing}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs font-black uppercase tracking-wider text-slate-200 transition-all active:scale-95 disabled:opacity-50"
          >
            {isSyncing ? "Syncing..." : "🔄 Force Sync"}
          </button>
          <button
            onClick={playKitchenBell}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 transition-all text-orange-500 active:scale-95"
            title="Test Kitchen Sound Alert"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <div className="text-[10px] font-black text-slate-400 flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-900">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <Wifi className="w-3.5 h-3.5 text-slate-500" />
          KDS Real-Time Local Sync Online
        </div>
      </div>

      {/* Main Kanban Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        {/* Left Columns Container */}
        <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* New Orders */}
          <OrderColumn
            title="New Tickets"
            orders={newOrders}
            columnType="new"
            onAccept={(id) => handleUpdateStage(id, 1)}
            onReject={(id) => handleUpdateStage(id, 4)}
            onReady={(id) => handleUpdateStage(id, 3)}
            onComplete={(id) => handleUpdateStage(id, 4)}
            onToggleItemPrepped={handleToggleItemPrepped}
            loadingActions={loadingActions}
            badgeColor="bg-blue-500/10 text-blue-400 border border-blue-500/20"
          />

          {/* Preparing */}
          <OrderColumn
            title="Preparing"
            orders={preparingOrders}
            columnType="preparing"
            onAccept={(id) => handleUpdateStage(id, 1)}
            onReject={(id) => handleUpdateStage(id, 4)}
            onReady={(id) => handleUpdateStage(id, 3)}
            onComplete={(id) => handleUpdateStage(id, 4)}
            onToggleItemPrepped={handleToggleItemPrepped}
            loadingActions={loadingActions}
            badgeColor="bg-amber-500/10 text-amber-400 border border-amber-500/20"
          />

          {/* Ready for Pickup */}
          <OrderColumn
            title="Ready Pickup"
            orders={readyOrders}
            columnType="ready"
            onAccept={(id) => handleUpdateStage(id, 1)}
            onReject={(id) => handleUpdateStage(id, 4)}
            onReady={(id) => handleUpdateStage(id, 3)}
            onComplete={(id) => handleUpdateStage(id, 4)}
            onToggleItemPrepped={handleToggleItemPrepped}
            loadingActions={loadingActions}
            badgeColor="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          />
        </div>

        {/* Right Side Panel: Live Service Help Alerts console */}
        <div className="space-y-4 bg-slate-950 border border-slate-900 rounded-[24px] p-4 h-[calc(100vh-140px)] flex flex-col justify-start overflow-hidden">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-900 flex-shrink-0">
            <h3 className="font-black text-sm uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <span>🔔</span> Table Alarms
            </h3>
            <span className="text-[9px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
              Live Feed
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-transparent">
            {alerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-900/10 border border-dashed border-slate-900 rounded-2xl h-48 select-none">
                <CheckCircle2 className="w-8 h-8 text-slate-700 mb-2 opacity-60" />
                <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-widest">Alarms Quiet</h4>
                <p className="text-[9px] text-slate-500 mt-1">No pending assistance requests.</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="bg-red-500/5 border border-red-500/20 p-4 rounded-xl flex flex-col justify-between shadow-lg relative overflow-hidden border-l-4 border-l-red-500 animate-pulse"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-red-500/25 border border-red-500/40 text-red-300 text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                      Table {alert.table}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono font-bold">{alert.time}</span>
                  </div>

                  <h4 className="text-white font-extrabold text-xs mb-3 bg-slate-950/40 p-2 rounded-lg border border-slate-905">
                    "{alert.reason}"
                  </h4>

                  <button
                    onClick={() => handleResolveAlert(alert.id)}
                    className="w-full bg-red-600/90 hover:bg-red-600 text-white text-[10px] font-black uppercase py-2 rounded-xl transition-all active:scale-95 shadow-md shadow-red-950/20"
                  >
                    Resolve Alarm
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
