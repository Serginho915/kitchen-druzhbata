"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminAuthApi } from "@/lib/adminMenuApi";
import styles from "./AdminSidebar.module.scss";

export function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await adminAuthApi.logout();
    window.localStorage.removeItem(adminAuthApi.tokenKey);
    window.location.reload();
  };

  return (
    <aside className={styles.sidebar}>
      <Link href="/admin" className={styles.brand}>
        <div className={styles.logoWrapper}>
          <img src="/kitchen-assets/kitchen.svg" alt="Logo" />
        </div>
        <div className={styles.brandText}>
          <p className={styles.brandTitle}>Кухня на Дружбата</p>
        </div>
      </Link>
      <nav className={styles.nav}>
        <Link
          href="/admin"
          className={`${styles.navItem} ${pathname === "/admin" ? styles.active : ""}`}
        >
          Меню
        </Link>
        <Link
          href="/admin/special-offer"
          className={`${styles.navItem} ${pathname?.startsWith("/admin/special-offer") ? styles.active : ""}`}
        >
          Спецпредложения
        </Link>
      </nav>
      <button
        type="button"
        className={styles.logoutBtn}
        onClick={() => void handleLogout()}
      >
        Выйти
      </button>
    </aside>
  );
}
