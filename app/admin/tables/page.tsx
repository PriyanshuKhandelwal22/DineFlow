"use client";

import { useEffect, useState } from "react";

type RestaurantTable = {
  id: string;
  restaurantSlug: string;
  tableNumber: string;
  label: string | null;
  seats: number;
  active: boolean;
};

type QrByTable = Record<
  string,
  {
    qrDataUrl: string;
    url: string;
  }
>;

export default function AdminTablesPage() {
  const [restaurantSlug, setRestaurantSlug] = useState("demo");
  const [tables, setTables] = useState<RestaurantTable[]>([]);
  const [qrByTable, setQrByTable] = useState<QrByTable>({});

  const [newTable, setNewTable] = useState({
    tableNumber: "",
    label: "",
    seats: "2",
  });

  // Loads the saved table list for this restaurant.
  // This makes QR generation persistent instead of a one-off form.
  const fetchTables = async () => {
    const response = await fetch(
      `/api/tables?restaurantSlug=${encodeURIComponent(restaurantSlug)}`,
      { cache: "no-store" }
    );

    if (!response.ok) return;

    const data = await response.json();
    setTables(data);
  };

  useEffect(() => {
    fetchTables();
  }, [restaurantSlug]);

  // Creates a reusable table record.
  // Once it exists, admin can disable it or regenerate QR anytime.
  const createTable = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/tables", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        restaurantSlug,
        tableNumber: newTable.tableNumber,
        label: newTable.label,
        seats: Number(newTable.seats),
      }),
    });

    if (!response.ok) return;

    const createdTable = await response.json();

    setTables((prev) => [createdTable, ...prev]);
    setNewTable({
      tableNumber: "",
      label: "",
      seats: "2",
    });
  };

  // Soft-disable table instead of deleting it.
  // This avoids breaking old sessions/orders that reference table numbers.
  const toggleTable = async (table: RestaurantTable) => {
    const response = await fetch("/api/tables", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: table.id,
        active: !table.active,
      }),
    });

    if (!response.ok) return;

    const updatedTable = await response.json();

    setTables((prev) =>
      prev.map((item) => (item.id === table.id ? updatedTable : item))
    );
  };

  // Reuses the existing QR endpoint.
  // The QR points customers to /r/[restaurant]/table/[table].
  const generateQr = async (table: RestaurantTable) => {
    const response = await fetch("/api/qr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        restaurantSlug: table.restaurantSlug,
        tableNumber: table.tableNumber,
        origin: window.location.origin,
      }),
    });

    if (!response.ok) return;

    const data = await response.json();

    setQrByTable((prev) => ({
      ...prev,
      [table.id]: {
        qrDataUrl: data.qrDataUrl,
        url: data.url,
      },
    }));
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-black">Table Management</h1>
          <p className="text-sm text-slate-400 mt-1">
            Create restaurant tables and download table-specific QR codes.
          </p>
        </div>

        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <label className="block text-sm font-bold">
            Restaurant Slug
            <input
              value={restaurantSlug}
              onChange={(event) => setRestaurantSlug(event.target.value)}
              className="mt-2 w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white"
            />
          </label>

          <form onSubmit={createTable} className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              placeholder="Table number"
              value={newTable.tableNumber}
              onChange={(event) =>
                setNewTable({ ...newTable, tableNumber: event.target.value })
              }
              className="rounded-xl bg-slate-950 border border-slate-700 px-3 py-2"
              required
            />

            <input
              placeholder="Label, optional"
              value={newTable.label}
              onChange={(event) =>
                setNewTable({ ...newTable, label: event.target.value })
              }
              className="rounded-xl bg-slate-950 border border-slate-700 px-3 py-2"
            />

            <input
              placeholder="Seats"
              type="number"
              min="1"
              value={newTable.seats}
              onChange={(event) =>
                setNewTable({ ...newTable, seats: event.target.value })
              }
              className="rounded-xl bg-slate-950 border border-slate-700 px-3 py-2"
            />

            <button className="rounded-xl bg-orange-600 px-4 py-3 font-black">
              Add Table
            </button>
          </form>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tables.map((table) => {
            const qr = qrByTable[table.id];

            return (
              <div
                key={table.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase font-black text-slate-500">
                      Table
                    </p>
                    <h2 className="text-2xl font-black">
                      {table.tableNumber}
                    </h2>

                    <p className="text-sm text-slate-400 mt-1">
                      {table.label || "No label"} · {table.seats} seats
                    </p>
                  </div>

                  <span
                    className={`rounded-lg px-3 py-1 text-xs font-black ${
                      table.active
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-700 text-slate-300"
                    }`}
                  >
                    {table.active ? "Active" : "Disabled"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => generateQr(table)}
                    className="rounded-xl bg-orange-600 px-4 py-2 text-sm font-black"
                  >
                    Generate QR
                  </button>

                  <button
                    onClick={() => toggleTable(table)}
                    className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-black"
                  >
                    {table.active ? "Disable" : "Enable"}
                  </button>
                </div>

                {qr && (
                  <div className="bg-white text-slate-900 rounded-2xl p-4 space-y-3">
                    <img
                      src={qr.qrDataUrl}
                      alt={`QR code for table ${table.tableNumber}`}
                      className="w-48 h-48 mx-auto"
                    />

                    <p className="text-xs break-all text-slate-500">
                      {qr.url}
                    </p>

                    <a
                      href={qr.qrDataUrl}
                      download={`dineflow-${table.restaurantSlug}-table-${table.tableNumber}.png`}
                      className="block text-center rounded-xl bg-slate-900 text-white px-4 py-2 font-black"
                    >
                      Download PNG
                    </a>
                  </div>
                )}
              </div>
            );
          })}

          {tables.length === 0 && (
            <div className="md:col-span-2 bg-slate-900 border border-dashed border-slate-700 rounded-2xl p-10 text-center text-slate-400">
              No tables created yet.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}