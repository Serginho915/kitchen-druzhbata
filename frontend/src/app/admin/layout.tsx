import type { Metadata } from "next";
import { ScrollToTop } from "@/components/kitchen/ScrollToTop/ScrollToTop";
import { AdminAuthGate } from "@/components/admin/AdminAuthGate";
import { AdminSidebar } from "@/components/admin/AdminSidebar/AdminSidebar";
import styles from "@/views/Kitchen/KitchenApp.module.scss";
import adminStyles from "./admin-layout.module.scss";
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
      <AdminAuthGate>
        <div className={adminStyles.body}>
          <AdminSidebar />
          <main className={adminStyles.content}>{children}</main>
        </div>
      </AdminAuthGate>
      <ScrollToTop />
    </div>
  );
}
