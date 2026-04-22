"use client";

import { usePathname } from "next/navigation";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/ui/CartDrawer/CartDrawer";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isKitchenRoute = pathname?.startsWith("/kitchen");
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <CartProvider>
      {children}
      {!isKitchenRoute && !isAdminRoute ? <CartDrawer /> : null}
    </CartProvider>
  );
}
