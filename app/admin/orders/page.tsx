"use client";

import { useEffect, useState } from "react";

type AdminOrder = {
  id: string;
  sessionId?: string | null;
  table: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  notes: string;
  grandTotal: number;
  prepStage: number;
  time: string;
  priority: "Normal" | "Rush" | "VIP";
};

const stageLabels = ["Sent", "Accepted", "Cooking", "Dispatched", "Archived"];


export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  // These store what the admin types/selects in the filter controls.
  const [tableFilter, setTableFilter] = useState("");
  const [sessionFilter, setSessionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");


  const fetchOrders = async () => {
  // Admin needs completed/archived orders too, not only live kitchen orders.
    const response = await fetch("/api/orders?includeArchived=true", {
      cache: "no-store",
    });

    if (!response.ok) return;

    const data = await response.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();

    const interval = window.setInterval(fetchOrders, 3000);
    return () => window.clearInterval(interval);
  }, []);

  // This creates the list that should actually be displayed after filters.
  // The original orders array stays untouched, so clearing filters instantly restores everything.
  const filteredOrders = orders.filter((order) => {
    const matchesTable =
      !tableFilter ||
      order.table.toLowerCase().includes(tableFilter.toLowerCase());

    const matchesSession =
      !sessionFilter ||
      order.sessionId?.toLowerCase().includes(sessionFilter.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.prepStage === Number(statusFilter);

    return matchesTable && matchesSession && matchesStatus;
  });

  // These totals are based on filtered orders, so the numbers match what admin is viewing.
  const totalRevenue = filteredOrders.reduce(
    (sum, order) => sum + order.grandTotal,
    0
  );

  const completedRevenue = filteredOrders
    .filter((order) => order.prepStage >= 4)
    .reduce((sum, order) => sum + order.grandTotal, 0);

  const uniqueTables = new Set(filteredOrders.map((order) => order.table)).size;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-black">Order Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">
            Live view of active restaurant tickets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <p className="text-xs text-slate-400 font-bold uppercase">Orders Shown</p>
            <p className="text-3xl font-black mt-1">{filteredOrders.length}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <p className="text-xs text-slate-400 font-bold uppercase">Rush/VIP</p>
            <p className="text-3xl font-black mt-1">
              {filteredOrders.filter((order) => order.priority !== "Normal").length}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <p className="text-xs text-slate-400 font-bold uppercase">Revenue Shown</p>
            <p className="text-3xl font-black mt-1">₹{totalRevenue}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <p className="text-xs text-slate-400 font-bold uppercase">Tables</p>
            <p className="text-3xl font-black mt-1">{uniqueTables}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <input
            placeholder="Filter by table"
            value={tableFilter}
            onChange={(event) => setTableFilter(event.target.value)}
            className="rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white"
          />

          <input
            placeholder="Filter by session"
            value={sessionFilter}
            onChange={(event) => setSessionFilter(event.target.value)}
            className="rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white"
          />

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white"
          >
            <option value="all">All statuses</option>
            <option value="0">Sent</option>
            <option value="1">Accepted</option>
            <option value="2">Cooking</option>
            <option value="3">Dispatched</option>
            <option value="4">Archived</option>
          </select>

          <div className="md:col-span-3 flex flex-wrap gap-3 text-sm text-slate-300">
            <span className="rounded-lg bg-slate-950 border border-slate-800 px-3 py-2">
              Filtered revenue: ₹{totalRevenue}
            </span>

            <span className="rounded-lg bg-slate-950 border border-slate-800 px-3 py-2">
              Completed revenue: ₹{completedRevenue}
            </span>
          </div>
        </div>
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-lg text-xs font-black">
                      Table {order.table}
                    </span>
                    <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-lg text-xs font-black">
                      {order.priority}
                    </span>
                    <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-lg text-xs font-black">
                      {stageLabels[order.prepStage] ?? "Unknown"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-2 font-mono">
                    Order: {order.id}
                  </p>
                  <p className="text-xs text-slate-500 font-mono">
                    Session: {order.sessionId?.slice(0, 8) ?? "none"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-slate-400">{order.time}</p>
                  <p className="text-xl font-black">₹{order.grandTotal}</p>
                </div>
              </div>

              <div className="mt-4 border-t border-slate-800 pt-4 space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span className="text-slate-400">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {order.notes && (
                <p className="mt-4 text-sm text-orange-300 bg-orange-950/30 border border-orange-900 rounded-xl p-3">
                  {order.notes}
                </p>
              )}
            </div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="bg-slate-900 border border-dashed border-slate-700 rounded-2xl p-10 text-center text-slate-400">
              No active orders yet.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}