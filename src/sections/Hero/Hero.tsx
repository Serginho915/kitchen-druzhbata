import React from "react";
import styles from "./Hero.module.scss";
import Image from "next/image";

import calendarInfo from "@/assets/images/Vectors/calendarInfo.svg";
import deliveryIcon from "@/assets/images/Vectors/deliveryIcon.svg";
import infoSoup from "@/assets/images/Vectors/infoSoup.svg";

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.videoblock}>
        <video autoPlay loop muted playsInline className={styles.video}>
          <source src="/kitchenVideo.mov" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.videoContent}>
          <h1 className={styles.title}>Кухня на Дружбата</h1>
          <p className={styles.subtitle}>
            Домашно приготвена храна с <br /> вкус на традиция.
          </p>
        </div>
      </div>
      <div className={styles.infoSection}>
        <ul className={styles.infoList}>
          <li className={styles.infoItem}>
            <div className={styles.imgWrapper}>
              <Image src={infoSoup} alt="Info Icon" width={28} height={28} />
            </div>
            <span>Истинска храна, приготвена днес</span>
          </li>
          <li className={styles.infoItem}>
            <div className={styles.imgWrapper}>
              <Image
                src={deliveryIcon}
                alt="Delivery Icon"
                width={28}
                height={28}
              />
            </div>
            <span>Безплатна доставка в София</span>
          </li>
          <li className={styles.infoItem}>
            <div className={styles.imgWrapper}>
              <Image
                src={calendarInfo}
                alt="Calendar Icon"
                width={28}
                height={28}
              />
            </div>
            <span>Всеки делник (Пон-Пет)</span>
          </li>
        </ul>
        <div className={styles.hotSales}>
          <Image
            src="/hotSales.png"
            alt="Hot Sales"
            width={586}
            height={0}
          />
        </div>
      </div>
    </section>
  );
};
