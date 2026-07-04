"use client";

import React, { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { MenuItem } from "../data/menu";

export interface CartItem extends MenuItem {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  gstValue: number;
  serviceCharge: number;
  cartGrandTotal: number;
  cartNotes: string;
  setCartNotes: (notes: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartNotes, setCartNotes] = useState<string>("");

  // Add Item or Increment its count
  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Remove Item or Decrement its count
  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prevCart.filter((i) => i.id !== itemId);
    });
  };

  // Wipe the cart clean
  const clearCart = () => {
    setCart([]);
    setCartNotes("");
  };

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const gstValue = useMemo(() => Math.round(cartSubtotal * 0.05), [cartSubtotal]);
  const serviceCharge = useMemo(() => (cartSubtotal > 0 ? 25 : 0), [cartSubtotal]);
  const cartGrandTotal = useMemo(() => cartSubtotal + gstValue + serviceCharge, [
    cartSubtotal,
    gstValue,
    serviceCharge,
  ]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartSubtotal,
        gstValue,
        serviceCharge,
        cartGrandTotal,
        cartNotes,
        setCartNotes,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a global CartProvider wrapper");
  }
  return context;
}