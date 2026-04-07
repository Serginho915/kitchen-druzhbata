"use client";

import { useState, useEffect, useCallback } from "react";

const CART_KEY = "kitchen-cart";

export interface CartItem {
  id: number;
  title: string;
  weight: string;
  price: number;
  image?: string;
  quantity: number;
}

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart-updated"));
}

export function useCart() {
  
  const [cartItems, setCartItems] = useState<CartItem[]>(() => readCart());

  
  useEffect(() => {
    const onUpdate = () => setCartItems(readCart());
    window.addEventListener("cart-updated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("cart-updated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  const addToCart = useCallback(
    (dish: { id: number; title: string; weight: string; price: number; image?: string }) => {
      const current = readCart();
      const existing = current.find((item) => item.id === dish.id);
      let updated: CartItem[];
      if (existing) {
        updated = current.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updated = [...current, { ...dish, quantity: 1 }];
      }
      writeCart(updated);
      setCartItems(updated);
    },
    []
  );

  const removeFromCart = useCallback((dishId: number) => {
    const current = readCart();
    const existing = current.find((item) => item.id === dishId);
    let updated: CartItem[];
    if (existing && existing.quantity > 1) {
      updated = current.map((item) =>
        item.id === dishId ? { ...item, quantity: item.quantity - 1 } : item
      );
    } else {
      updated = current.filter((item) => item.id !== dishId);
    }
    writeCart(updated);
    setCartItems(updated);
  }, []);

  const clearCart = useCallback(() => {
    writeCart([]);
    setCartItems([]);
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const getItemQuantity = useCallback(
    (dishId: number) => {
      const item = cartItems.find((i) => i.id === dishId);
      return item ? item.quantity : 0;
    },
    [cartItems]
  );

  return { cartItems, cartCount, addToCart, removeFromCart, clearCart, getItemQuantity };
}
