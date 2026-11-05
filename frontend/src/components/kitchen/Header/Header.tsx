"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./Header.module.scss";

interface KitchenHeaderProps {
  showEditButton?: boolean;
}

export function KitchenHeader({ showEditButton = true }: KitchenHeaderProps) {
  const pathname = usePathname();
  const basePath = pathname?.startsWith("/admin") ? "/admin" : "/kitchen";

  return (
    <header className={styles.header}>
      <Link href={basePath} className={styles.logoContainer}>
        <div className={styles.logoWrapper}>
          <Image src="/sofiafood-logo.png" alt="SofiaFood" width={52} height={52} />
        </div>
        <h1 className={styles.title}>SofiaFood</h1>
      </Link>

      {showEditButton ? (
        <nav className={styles.nav}>
          <Link href={`${basePath}/editing`} className={styles.editBtn}>
            Редактирование
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
