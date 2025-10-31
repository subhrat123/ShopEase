'use client';

import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const saveToStorage = (items: CartItem[]) => {
    setCart(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const addToCart = (item: CartItem) => {
    const existing = cart.find(p => p._id === item._id);
    let updated;
    if (existing) {
      updated = cart.map(p =>
        p._id === item._id ? { ...p, quantity: p.quantity + 1 } : p
      );
    } else {
      updated = [...cart, { ...item, quantity: 1 }];
    }
    saveToStorage(updated);
  };

  const removeFromCart = (id: string) => {
    const updated = cart.filter(p => p._id !== id);
    saveToStorage(updated);
  };

  const clearCart = () => {
    saveToStorage([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
    