import React from "react";
import styles from "./Footer.module.scss";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import arrow from "@/assets/images/Vectors/arrow.svg";
import { FaPhone, FaFacebookF, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* ── Main dark card (3 columns on desktop) ── */}
      <div className={styles.footerCard}>
        {/* Column 1: Brand info */}
        <div className={styles.brandBlock}>
          <div className={styles.logoRow}>
            <Image
              src={logo}
              alt="Кухня на Дружбата"
              width={64}
              height={64}
              className={styles.logo}
            />
            <span className={styles.brandName}>
              Кухня
              <br />
              на Дружбата
            </span>
          </div>
          <div className={styles.brand}>
            <Image
              src={arrow}
              alt="Стрелка"
              width={65}
              height={42}
              className={styles.logoMobile}
            />
            <div className={styles.brandText}>
              <address className={styles.address}>
                <p className={styles.addressText}>София, ж.к. Дружба 2,<br /> бул. проф. Цветан Лазаров 226</p>
              </address>
              <div className={styles.hours}>
                <span className={styles.hoursLabel}>Пон - Пет</span>
                <span className={styles.hoursTime}>10:00–22:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Social */}
        <div className={styles.socialBlock}>
          <p className={styles.socialLabel}>Свържете се с нас</p>
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

        {/* Column 3: Navigation links */}
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
      </div>

      {/* ── Bottom legal bar ── */}
      <div className={styles.footerBottom}>
        <small className={styles.copyright}>
          © 2026 Кухня на Дружбата. Всички права запазени.
        </small>
        <nav className={styles.legalNav} aria-label="Legal links">
          <Link href="/privacy">Политика за поверителност</Link>
          <Link href="/terms">Общи Условия</Link>
          <Link href="/cookies">Бисквитки</Link>
          <Link href="/delivery">Доставка и Плащане</Link>
        </nav>
      </div>
    </footer>
  );
};
