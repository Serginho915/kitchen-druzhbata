"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import cart from "@/assets/images/Vectors/cart.svg";
import phone from "@/assets/images/Vectors/phone.svg";
import burger from "@/assets/images/Vectors/burger.svg";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import navigate from "@/assets/images/Vectors/navigate.svg";
import { useCart } from "@/hooks/useCart";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);

  const { cartCount, toggleCart } = useCart();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Hide on scroll down, show on scroll up
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
        setIsVisible(prevScrollPos > currentScrollPos);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, isMenuOpen]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        burgerRef.current &&
        !burgerRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header
      className={`${styles.header} ${!isVisible ? styles.headerHidden : ""}`}
    >
      <div className={styles.logoBlock}>
        <Link href="/">
          <Image
            src={logo}
            alt="Kitchen Druzhbata Logo"
            className={styles.logo}
            width={80}
            height={80}
          />
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
        <div
          className={`${styles.userItem} ${styles.bgUserBlock} ${styles.cartBlock}`}
          onClick={toggleCart}
        >
          {cartCount > 0 && (
            <span className={styles.cartBadge}>
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
          <Image
            src={cart}
            alt="Cart Icon"
            width={64}
            height={64}
            className={styles.icon}
          />
        </div>

        <div className={`${styles.phoneIcon} ${styles.bgUserBlock}`}>
          <Image
            src={phone}
            alt="Phone Icon"
            width={64}
            height={64}
            className={styles.icon}
          />
        </div>

        <div
          ref={burgerRef}
          className={`${styles.burgerIcon} ${styles.bgUserBlock} ${isMenuOpen ? styles.burgerActive : ""}`}
          onClick={toggleMenu}
        >
          <Image
            src={burger}
            alt="Burger Menu"
            width={64}
            height={64}
            className={styles.icon}
          />
        </div>
      </div>

      {isMenuOpen && (
        <div ref={menuRef} className={styles.mobileMenu}>
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

          <ul className={styles.mobileInfo}>
            <li className={styles.mobileItem}>
              <div className={styles.linkWrapper}>
                <p className={styles.mobileInfoText}>Контакт</p>
                <Link href={"phone:+359 8899999"}>
                  <Image src={phone} alt="call"></Image>
                </Link>
              </div>
            </li>

            <li className={styles.mobileItem}>
              <p className={styles.mobileInfoText}>Контакт</p>
              <div className={styles.linkWrapper}>
                <Link href={"https://maps.app.goo.gl/4W58KxWc4GTXwJPRA"}>
                  <Image src={navigate} alt="navigate"></Image>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
