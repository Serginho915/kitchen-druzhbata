import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaPhone } from "react-icons/fa";
import styles from "./Footer.module.scss";

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <div className={styles.mainInfo}>
        <div className={styles.headerRow}>
          <div className={styles.logoArea}>
            <Image src="/sofiafood-logo.png" alt="SofiaFood" width={80} height={80} className={styles.logo} />
            <span className={styles.brandName}>SofiaFood<br />с чувство за хумор</span>
          </div>
          <div className={styles.hoursArea}>
            <p className={styles.hoursLabel}>Отворени сме</p>
            <div className={styles.hoursContent}><span>Пон – Пет</span><span>10:00–21:00</span></div>
          </div>
        </div>
        <div className={styles.gridRow}>
          <div className={styles.addressBox}>
            <p className={styles.boxTitle}>Намерете ни</p>
            <address className={styles.address}>София, ж.к. Дружба 2,<br />бул. „проф. Цветан Лазаров“ 226</address>
          </div>
          <div className={styles.socialBox}>
            <p className={styles.boxTitle}>Поръчки и въпроси</p>
            <div className={styles.socialIcons}>
              <a href="tel:+359885899908" className={styles.socialLink} aria-label="Телефон"><FaPhone /></a>
              <a href="https://www.facebook.com/druzhbata" target="_blank" rel="noopener noreferrer" className={`${styles.socialLink} ${styles.facebook}`} aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://www.instagram.com/kuhnya_nadruzhbata" target="_blank" rel="noopener noreferrer" className={`${styles.socialLink} ${styles.instagram}`} aria-label="Instagram"><FaInstagram /></a>
            </div>
            <a href="tel:+359885899908" className={styles.footerPhone}>+359 885899908</a>
          </div>
        </div>
      </div>
      <div className={styles.navBox}>
        <nav className={styles.footerNav} aria-label="Навигация в долната част">
          <ul className={styles.navList}>
            <li><Link href="/">Рецепти</Link></li>
            <li><Link href="/subscriptions">Супскрипшън</Link></li>
            <li><Link href="/specialties">Специалитети</Link></li>
          </ul>
        </nav>
      </div>
    </div>
    <div className={styles.footerBottom}><small className={styles.copyright}>© 2026 SofiaFood. Всички права запазени.</small></div>
  </footer>
);
