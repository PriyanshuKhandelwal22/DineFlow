// app/admin/page.tsx
import Link from "next/link";
import "./globals.css";
import { ClipboardList, QrCode, Table2, Utensils } from "lucide-react";

const adminTools = [
  {
    title: "QR Codes",
    description: "Generate and download table QR codes.",
    href: "/admin/qr",
    icon: QrCode,
  },
  {
    title: "Menu",
    description: "Manage menu items and availability.",
    href: "/admin/menu",
    icon: Utensils,
  },
  {
    title: "Tables",
    description: "Create tables and manage table QR codes.",
    href: "/admin/tables",
    icon: Table2,
  },
  {
    title: "Orders",
    description: "View active and completed orders.",
    href: "/admin/orders",
    icon: ClipboardList,
  },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-black">DineFlow Admin</h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage restaurant operations from one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adminTools.map((tool) => {
            const Icon = tool.icon;

            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-orange-500 transition-colors"
              >
                <Icon className="w-8 h-8 text-orange-500 mb-4" />
                <h2 className="font-black text-lg">{tool.title}</h2>
                <p className="text-sm text-slate-400 mt-1">
                  {tool.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}