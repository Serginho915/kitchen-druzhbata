import type { Metadata } from "next";
import { KitchenHeader } from "@/components/kitchen/Header/Header";
import { ScrollToTop } from "@/components/kitchen/ScrollToTop/ScrollToTop";
import styles from "@/pages/Kitchen/KitchenApp.module.scss";
import "./kitchen-theme.css";

export const metadata: Metadata = {
  title: "friendkitchen",
  icons: {
    icon: "/kitchen-assets/vite.svg",
  },
};

export default function KitchenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${styles.appContainer} kitchenTheme`}>
      <KitchenHeader />
      {children}
      <ScrollToTop />
    </div>
  );
}
