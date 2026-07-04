"use client";

import { useState } from "react";

export default function QrAdminPage() {
  const [restaurantSlug, setRestaurantSlug] = useState("demo");
  const [tableNumber, setTableNumber] = useState("12");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [startTable, setStartTable] = useState("1");
  const [endTable, setEndTable] = useState("12");
  const [qrCodes, setQrCodes] = useState<
    { tableNumber: string; qrDataUrl: string; url: string }[]
  >([]);

  const generateQr = async () => {
    const response = await fetch("/api/qr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        restaurantSlug,
        tableNumber,
        origin: window.location.origin,
      }),
    });

    if (!response.ok) return;

    const data = await response.json();
    setQrDataUrl(data.qrDataUrl);
    setQrUrl(data.url);
  };

  const generateBulkQrs = async () => {
    const start = Number(startTable);
    const end = Number(endTable);

    if (!Number.isFinite(start) || !Number.isFinite(end) || start > end) return;

    const generated = [];

    for (let table = start; table <= end; table++) {
      const response = await fetch("/api/qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantSlug,
          tableNumber: String(table),
          origin: window.location.origin,
        }),
      });

      if (!response.ok) continue;

      const data = await response.json();

      generated.push({
        tableNumber: String(table),
        qrDataUrl: data.qrDataUrl,
        url: data.url,
      });
    }

    setQrCodes(generated);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-black">QR Generator</h1>

        <div className="space-y-4 bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <label className="block text-sm font-bold">
            Restaurant Slug
            <input value={restaurantSlug} onChange={(e) => setRestaurantSlug(e.target.value)} className="mt-2 w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white" />
          </label>

          <label className="block text-sm font-bold">
            Table Number
            <input value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} className="mt-2 w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white" />
          </label>

          <button onClick={generateQr} className="w-full rounded-xl bg-orange-600 px-4 py-3 font-black">
            Generate Single QR
          </button>
        </div>

        {qrDataUrl && (
          <div className="space-y-4 bg-white text-slate-900 rounded-2xl p-5">
            <img src={qrDataUrl} alt="Generated table QR code" className="w-64 h-64 mx-auto" />
            <p className="text-xs break-all text-slate-500">{qrUrl}</p>
            <a href={qrDataUrl} download={`dineflow-${restaurantSlug}-table-${tableNumber}.png`} className="block text-center rounded-xl bg-slate-900 text-white px-4 py-3 font-black">
              Download PNG
            </a>
          </div>
        )}

        <div className="space-y-4 bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h2 className="font-black">Bulk Table QR Codes</h2>

          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm font-bold">
              Start Table
              <input value={startTable} onChange={(e) => setStartTable(e.target.value)} className="mt-2 w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white" />
            </label>

            <label className="block text-sm font-bold">
              End Table
              <input value={endTable} onChange={(e) => setEndTable(e.target.value)} className="mt-2 w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white" />
            </label>
          </div>

          <button onClick={generateBulkQrs} className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-black">
            Generate Table Range
          </button>
        </div>

        {qrCodes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {qrCodes.map((qr) => (
              <div key={qr.tableNumber} className="bg-white text-slate-900 rounded-2xl p-4 space-y-3">
                <h3 className="font-black">Table {qr.tableNumber}</h3>
                <img src={qr.qrDataUrl} alt={`QR code for table ${qr.tableNumber}`} />
                <a href={qr.qrDataUrl} download={`dineflow-${restaurantSlug}-table-${qr.tableNumber}.png`} className="block text-center rounded-xl bg-slate-900 text-white px-4 py-2 font-black">
                  Download
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}