"use client";

import KitchenEditingPage from "@/pages/Kitchen/EditingPage";
import { adminMenuApi } from "@/lib/adminMenuApi";
import Link from "next/link";
import layoutStyles from "@/pages/Kitchen/KitchenApp.module.scss";
import styles from "./menu-editing.module.scss";

export default function Page() {
  return (
    <>
      <div className={`${layoutStyles.contentContainer} ${layoutStyles.editingContainer} ${styles.headerWrap}`}>
        <div className={styles.headerRow}>
          <h2 className={styles.title}>Редактирование Меню</h2>
          <Link href="/admin" className={styles.backBtn}>
            Назад
          </Link>
        </div>
      </div>
      <KitchenEditingPage apiClient={adminMenuApi} />
    </>
  );
}
