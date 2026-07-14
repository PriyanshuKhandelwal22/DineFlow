// app/login/page.tsx
"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldAlert, Utensils } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password: password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password.");
        setIsLoading(false);
      } else {
        // NextAuth logs in successfully. Route user based on role redirection.
        // Doing a hard page refresh or router navigation is best to trigger middleware refresh.
        router.refresh();
        // Redirect to fallback destinations
        window.location.href = result?.url || "/kds";
      }
    } catch (err) {
      console.error("Login exception:", err);
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans select-none">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-blue-600/10 blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-indigo-600/10 blur-[100px]" />

      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8 relative shadow-2xl">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-extrabold text-2xl shadow-xl shadow-blue-950/40 mx-auto mb-4">
            <Utensils className="w-7 h-7" />
          </div>
          <h1 className="font-black text-2xl tracking-tight text-white uppercase">
            MenuVerse Portal
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Access secure restaurant management modules
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/35 p-4 rounded-2xl text-xs text-red-400 font-bold mb-6 flex gap-2.5 items-start animate-pulse">
            <ShieldAlert className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            Email Address
            <div className="relative mt-2">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="chef@menuverse.com"
                className="w-full rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-10 py-3 text-sm text-white transition-all outline-none"
                disabled={isLoading}
              />
            </div>
          </label>

          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            Access Password
            <div className="relative mt-2">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-10 py-3 text-sm text-white transition-all outline-none"
                disabled={isLoading}
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-700 text-white text-xs font-black uppercase py-3.5 tracking-wider transition-all active:scale-98 shadow-lg shadow-blue-950/40 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            ) : (
              "Sign In to Dashboard"
            )}
          </button>
        </form>

        {/* Footer fallback */}
        <div className="mt-8 text-center text-[10px] text-slate-600">
          Authorized staff access only. Activity is monitored.
        </div>
      </div>
    </main>
  );
}
