"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPhone, FaBars, FaXmark } from "react-icons/fa6";
import styles from "./Header.module.scss";

const links = [
  { href: "/", label: "Рецепти" },
  { href: "/subscriptions", label: "Супскрипшън" },
  { href: "/specialties", label: "Специалитети" },
];

export const Header = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoBlock} aria-label="SofiaFood начало">
        <Image src="/sofiafood-logo.png" alt="SofiaFood" width={52} height={52} className={styles.logo} priority />
      </Link>
      <nav className={`${styles.navBlock} ${open ? styles.navOpen : ""}`} aria-label="Основна навигация">
        {links.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={`${styles.navLink} ${pathname === link.href || (link.href === "/" && pathname?.startsWith("/recipes/")) ? styles.active : ""}`}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className={styles.actions}>
        <a className={styles.phone} href="tel:+359885899908" aria-label="Обадете се на +359 885899908">
          <FaPhone /> <span>+359 885899908</span>
        </a>
        <button className={styles.menuButton} onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Меню">
          {open ? <FaXmark /> : <FaBars />}
        </button>
      </div>
    </header>
  );
};
