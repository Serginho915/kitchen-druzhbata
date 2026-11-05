"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { adminAuthApi } from "@/lib/adminMenuApi";
import styles from "./AdminSidebar.module.scss";

export function AdminSidebar() {
  const pathname = usePathname();
  const logout = async () => { await adminAuthApi.logout(); window.localStorage.removeItem(adminAuthApi.tokenKey); window.location.reload(); };
  const nav = [
    ["/admin/recipes","Рецепти и автоматизация"],
    ["/admin","Конструктор на меню"],
    ["/admin/special-offer","Спецпредложения"],
  ];
  return <aside className={styles.sidebar}>
    <Link href="/admin" className={styles.brand}><div className={styles.logoWrapper}><Image src="/sofiafood-logo.png" alt="SofiaFood" width={52} height={52} /></div><div className={styles.brandText}><p className={styles.brandTitle}>SofiaFood</p></div></Link>
    <nav className={styles.nav}>{nav.map(([href,label])=><Link key={href} href={href} className={`${styles.navItem} ${(href === "/admin" ? pathname === href : pathname?.startsWith(href)) ? styles.active : ""}`}>{label}</Link>)}</nav>
    <button type="button" className={styles.logoutBtn} onClick={()=>void logout()}>Изход</button>
  </aside>;
}
