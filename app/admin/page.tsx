"use client";

import Link from "next/link";
import { ClipboardList, QrCode, Table2, Utensils, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

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
        <div className="flex justify-between items-start border-b border-slate-900 pb-5">
          <div>
            <h1 className="text-3xl font-black">DineFlow Admin</h1>
            <p className="text-sm text-slate-400 mt-1">
              Manage restaurant operations from one place.
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-black uppercase rounded-xl flex items-center gap-2 cursor-pointer transition-all text-slate-300 hover:text-white"
          >
            <LogOut className="w-4 h-4 text-orange-500" />
            <span>Sign Out</span>
          </button>
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