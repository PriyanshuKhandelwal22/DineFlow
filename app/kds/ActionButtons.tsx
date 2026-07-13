// app/kds/ActionButtons.tsx
import React from "react";

type ActionButtonsProps = {
  orderId: string;
  prepStage: number;
  onAccept: () => void;
  onReject: () => void;
  onReady: () => void;
  onComplete: () => void;
  isLoading?: boolean;
};

export default function ActionButtons({
  prepStage,
  onAccept,
  onReject,
  onReady,
  onComplete,
  isLoading = false,
}: ActionButtonsProps) {
  if (isLoading) {
    return (
      <div className="w-full bg-slate-900 h-11 rounded-xl animate-pulse flex items-center justify-center">
        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Processing...</span>
      </div>
    );
  }

  // Stage 0: New Order
  if (prepStage === 0) {
    return (
      <div className="flex gap-2 w-full">
        <button
          onClick={onReject}
          className="flex-1 bg-red-950/40 hover:bg-red-900/30 text-red-400 border border-red-900/50 text-[11px] font-black uppercase py-2.5 rounded-xl transition-all active:scale-95"
        >
          Reject
        </button>
        <button
          onClick={onAccept}
          className="flex-[2] bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-black uppercase py-2.5 rounded-xl transition-all active:scale-95 shadow-md shadow-emerald-950/20"
        >
          Accept
        </button>
      </div>
    );
  }

  // Stage 1 or 2: Preparing (Accepted / Cooking)
  if (prepStage === 1 || prepStage === 2) {
    return (
      <button
        onClick={onReady}
        className="w-full bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-black uppercase py-3 rounded-xl transition-all active:scale-95 shadow-md shadow-amber-950/20 flex items-center justify-center gap-1.5"
      >
        <span>⚡</span> Mark as Ready
      </button>
    );
  }

  // Stage 3: Ready for Pickup (Dispatched)
  if (prepStage === 3) {
    return (
      <button
        onClick={onComplete}
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-black uppercase py-3 rounded-xl transition-all active:scale-95 shadow-md shadow-emerald-950/20 flex items-center justify-center gap-1.5"
      >
        <span>✓</span> Complete Order
      </button>
    );
  }

  return null;
}
