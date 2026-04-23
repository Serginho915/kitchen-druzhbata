import React from "react";
import styles from "./Footer.module.scss";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import { FaPhone, FaFacebookF, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Left Side: Branding and Info Boxes */}
        <div className={styles.mainInfo}>
          {/* Top Row: Brand & Hours */}
          <div className={styles.headerRow}>
            <div className={styles.logoArea}>
              <Image
                src={logo}
                alt="Кухня на Дружбата"
                width={80}
                height={80}
                className={styles.logo}
              />
              <span className={styles.brandName}>
                Кухня
                <br />
                на Дружбата
              </span>
            </div>
            <div className={styles.hoursArea}>
              <p className={styles.hoursLabel}>Отворени сме</p>
              <div className={styles.hoursContent}>
                <span className={styles.days}>Пон - Пет</span>
                <span className={styles.time}>10:00-21:00</span>
              </div>
            </div>
          </div>

          {/* Middle Row: Address & Socials */}
          <div className={styles.gridRow}>
            <div className={styles.addressBox}>
              <p className={styles.boxTitle}>Намерете ни</p>
              <address className={styles.address}>
                София, ж.к. Дружба 2,
                <br />
                бул. „проф. Цветан Лазаров“ 226
              </address>
            </div>

            <div className={styles.socialBox}>
              <p className={styles.boxTitle}>Свържете се с нас</p>
              <div className={styles.socialIcons}>
                <a
                  href="tel:+359000000000"
                  className={styles.socialLink}
                  aria-label="Телефон"
                >
                  <FaPhone />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.socialLink} ${styles.facebook}`}
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.socialLink} ${styles.instagram}`}
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Full Height Nav Box */}
        {/* <div className={styles.navBox}>
          <nav className={styles.footerNav} aria-label="Footer navigation">
            <ul className={styles.navList}>
              <li>
                <Link href="/#menu">Меню</Link>
              </li>
              <li>
                <Link href="/#about">За нас</Link>
              </li>
              <li>
                <Link href="/preorder">Предзаказ</Link>
              </li>
              <li>
                <Link href="/subscriptions">Подписки</Link>
              </li>
            </ul>
          </nav>
        </div> */}
      </div>

      {/* ── Bottom Row: Legal ── */}
      <div className={styles.footerBottom}>
        <small className={styles.copyright}>
          © 2026 Кухня на Дружбата. Всички права запазени.
        </small>
        <nav className={styles.legalNav} aria-label="Legal links">
          <Link href="/terms">Общи Условия</Link>
          <Link href="/privacy">Политика за поверителност</Link>
          <Link href="/cookies">Бисквитки</Link>
          {/* <Link href="/delivery">Доставка и Плащане</Link> */}
        </nav>
      </div>
    </footer>
  );
};
