"use client";

import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import cart from "@/assets/images/Vectors/cart.svg";
import phone from "@/assets/images/Vectors/phone.svg";
import burger from "@/assets/images/Vectors/burger.svg";
import Link from "next/link";
import logo from "@/assets/images/logo.png";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsVisible(true);
        return;
      }
      const currentScrollPos = window.scrollY;

      if (currentScrollPos <= 50) {
        setIsVisible(true);
      } else {
        if (prevScrollPos < currentScrollPos) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);


  return (
    <header className={`${styles.header} ${!isVisible ? styles.headerHidden : ""}`}>
      <div className={styles.logoBlock}>
        <Link href="/">
          <Image src={logo} alt="Kitchen Druzhbata Logo" priority />
        </Link>
      </div>

      <nav className={styles.navBlock}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/#menu">Меню</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/#about">За нас</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/preorder">Предзаказ</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/subscriptions">Подписки</Link>
          </li>
        </ul>
      </nav>

      <div className={styles.userBlock}>
        <div className={`${styles.userItem} ${styles.bgUserBlock} ${styles.cartBlock}`}>
          <Link href="/cart">
            <span className={styles.cartBadge}>?</span>
            <Image src={cart} alt="Cart Icon" width={44} height={44} className={styles.icon} />
          </Link>
        </div>

        <div className={`${styles.phoneIcon} ${styles.bgUserBlock}`}>
          <Image src={phone} alt="Phone Icon" width={44} height={44} className={styles.icon} />
        </div>

        <div className={`${styles.burgerIcon} ${styles.bgUserBlock}`} onClick={toggleMenu}>
          <Image src={burger} alt="Burger Menu" width={44} height={44} className={styles.icon} />
        </div>
      </div>

      {isMenuOpen && (
        <div className={`${styles.mobileMenu} ${styles.bgUserBlock}`}>
          <ul className={styles.mobileNavList}>
            <li className={styles.navItem} onClick={() => setIsMenuOpen(false)}>
              <Link href="/#menu">Меню</Link>
            </li>
            <li className={styles.navItem} onClick={() => setIsMenuOpen(false)}>
              <Link href="/#about">За нас</Link>
            </li>
            <li className={styles.navItem} onClick={() => setIsMenuOpen(false)}>
              <Link href="/preorder">Предзаказ</Link>
            </li>
            <li className={styles.navItem} onClick={() => setIsMenuOpen(false)}>
              <Link href="/subscriptions">Подписки</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
