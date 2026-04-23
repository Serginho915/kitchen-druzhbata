import React from "react";
import styles from "@/components/layout/Footer/Footer.module.scss";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import { FaPhone, FaFacebookF, FaInstagram } from "react-icons/fa";

export const TouristFooter = () => {
  return (
    <footer className={styles.footer} style={{ paddingTop: "60px" }}>
      <div className={styles.contentContainer}>
        <div className={styles.footerContent}>
          {/* Left Side: Branding and Info Boxes */}
          <div className={styles.mainInfo}>
            {/* Top Row: Brand & Hours */}
            <div className={styles.headerRow}>
              <div className={styles.logoArea}>
                <Image
                  src={logo}
                  alt="Kitchen on Druzhba"
                  width={80}
                  height={80}
                  className={styles.logo}
                />
                <span className={styles.brandName}>
                  Kitchen
                  <br />
                  on Druzhba
                </span>
              </div>
              <div className={styles.hoursArea}>
                <p className={styles.hoursLabel}>Opening Hours</p>
                <div className={styles.hoursContent}>
                  <span className={styles.days}>Mon - Fri</span>
                  <span className={styles.time}>10:00 - 21:00</span>
                </div>
              </div>
            </div>

            {/* Middle Row: Address & Socials */}
            <div className={styles.gridRow}>
              <div className={styles.addressBox}>
                <p className={styles.boxTitle}>Find Us</p>
                <address className={styles.address}>
                  Sofia, Druzhba 2,
                  <br />
                  226 Prof. Tsvetan Lazarov Blvd.
                </address>
              </div>

              <div className={styles.socialBox}>
                <p className={styles.boxTitle}>Contact Us</p>
                <div className={styles.socialIcons}>
                  <a
                    href="tel:+359000000000"
                    className={styles.socialLink}
                    aria-label="Phone"
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
          <div className={styles.navBox}>
            <nav className={styles.footerNav} aria-label="Footer navigation">
              <ul className={styles.navList}>
                <li>
                  <Link href="/#menu">Menu</Link>
                </li>
                <li>
                  <Link href="/#about">About us</Link>
                </li>
                <li>
                  <Link href="/preorder">Preorder</Link>
                </li>
                <li>
                  <Link href="/subscriptions">Subscriptions</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* ── Bottom Row: Legal ── */}
        <div className={styles.footerBottom}>
          <small className={styles.copyright}>
            © 2026 Kitchen on Druzhba. All rights reserved.
          </small>
          <nav className={styles.legalNav} aria-label="Legal links">
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/delivery">Delivery & Payment</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};
