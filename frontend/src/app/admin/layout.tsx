import type { Metadata } from "next";
import { KitchenHeader } from "@/components/kitchen/Header/Header";
import { ScrollToTop } from "@/components/kitchen/ScrollToTop/ScrollToTop";
import { AdminAuthGate } from "@/components/admin/AdminAuthGate";
import styles from "@/pages/Kitchen/KitchenApp.module.scss";
import "@/app/kitchen/kitchen-theme.css";

export const metadata: Metadata = {
  title: "Kitchen Druzhbata",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${styles.appContainer} kitchenTheme`}>
      <KitchenHeader showEditButton={false} />
      <AdminAuthGate>{children}</AdminAuthGate>
      <ScrollToTop />
    </div>
  );
}
