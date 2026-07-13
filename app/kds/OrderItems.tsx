// app/kds/OrderItems.tsx
import React from "react";
import { Check } from "lucide-react";

type MenuItemType = {
  id: string;
  name: string;
  quantity: number;
  prepTime: string;
};

type OrderItemsProps = {
  orderId: string;
  items: MenuItemType[];
  completedDishes: Record<string, boolean>;
  onToggleItemPrepped: (itemKey: string, nextValue: boolean) => void;
};

export default function OrderItems({
  orderId,
  items,
  completedDishes,
  onToggleItemPrepped,
}: OrderItemsProps) {
  return (
    <div className="space-y-2 select-none">
      <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest block mb-1">
        Dish Checklist (Tap to cross off)
      </span>
      <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
        {items.map((item) => {
          const itemKey = `${orderId}-${item.id}`;
          const isItemChecked = !!completedDishes[itemKey];

          return (
            <div
              key={item.id}
              onClick={() => onToggleItemPrepped(itemKey, !isItemChecked)}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                isItemChecked
                  ? "bg-emerald-500/10 border-emerald-500/30 text-slate-400"
                  : "bg-slate-950/40 border-slate-850 hover:border-slate-750 text-slate-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                    isItemChecked
                      ? "bg-emerald-600 border-emerald-500 text-white"
                      : "border-slate-800 bg-slate-900"
                  }`}
                >
                  {isItemChecked && <Check className="w-3.5 h-3.5" />}
                </div>
                <span className={`text-xs font-bold leading-tight ${isItemChecked ? "line-through opacity-50" : ""}`}>
                  {item.quantity}x {item.name}
                </span>
              </div>
              <span className="text-[9px] text-slate-500 font-mono">{item.prepTime}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
