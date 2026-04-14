"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from "react";



export interface CartItem {
  id: number;
  title: string;
  weight: string;
  price: number;
  image?: string;
  quantity: number;
}

type CartState = CartItem[];

type CartAction =
  | { type: "ADD_ITEM"; item: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; id: number }
  | { type: "DELETE_ITEM"; id: number }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; items: CartItem[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const exist = state.find((i) => i.id === action.item.id);

      if (exist) {
        return state.map((i) =>
          i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...state, { ...action.item, quantity: 1 }];
    }

    case "REMOVE_ITEM": {
      const item = state.find((i) => i.id === action.id);
      if (item && item.quantity > 1) {
        return state.map((i) =>
          i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return state.filter((i) => i.id !== action.id);
    }

    case "DELETE_ITEM":
      return state.filter((i) => i.id !== action.id);

    case "CLEAR_CART":
      return [];

    case "LOAD_CART":
      return action.items;

    default:
      return state;
  }
};

const CART_KEY = "kitchen-cart";

interface CartContextValue {
  cartItems: CartItem[];
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toggleCart: () => void;
  addToCart: (dish: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  removeItemCompletely: (id: number) => void;
  clearCart: () => void;
  getItemQuantity: (id: number) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, dispatch] = useReducer(cartReducer, []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      if (saved) {
        dispatch({ type: "LOAD_CART", items: JSON.parse(saved) });
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_ITEM", item });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    dispatch({ type: "REMOVE_ITEM", id });
  }, []);

  const removeItemCompletely = useCallback((id: number) => {
    dispatch({ type: "DELETE_ITEM", id });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const toggleCart = useCallback(() => {
    setIsCartOpen((prev) => !prev);
  }, []);

  const getItemQuantity = useCallback(
    (id: number) => {
      const found = cartItems.find((i) => i.id === id);
      return found ? found.quantity : 0;
    },
    [cartItems]
  );

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      isCartOpen,
      setIsCartOpen,
      toggleCart,
      addToCart,
      removeFromCart,
      removeItemCompletely,
      clearCart,
      getItemQuantity,
    }),
    [cartItems, cartCount, isCartOpen, toggleCart, addToCart, removeFromCart, removeItemCompletely, clearCart, getItemQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}



export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
