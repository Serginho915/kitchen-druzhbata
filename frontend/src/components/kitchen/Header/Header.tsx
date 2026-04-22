"use client";

import Link from "next/link";
import styles from "./Header.module.scss";

export function KitchenHeader() {
  return (
    <header className={styles.header}>
      <Link href="/kitchen" className={styles.logoContainer}>
        <div className={styles.logoWrapper}>
          <img src="/kitchen-assets/kitchen.svg" alt="Logo" />
        </div>
        <h1 className={styles.title}>Кухня на Дружбата</h1>
      </Link>

      <nav className={styles.nav}>
        <Link href="/kitchen/editing" className={styles.editBtn}>
          Редактирование
        </Link>
      </nav>
    </header>
  );
}
