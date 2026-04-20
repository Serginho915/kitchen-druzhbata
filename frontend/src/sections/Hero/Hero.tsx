import React from "react";
import styles from "./Hero.module.scss";
import Image from "next/image";

import calendarInfo from "@/assets/images/Vectors/calendarInfo.svg";
import deliveryIcon from "@/assets/images/Vectors/deliveryIcon.svg";
import infoSoup from "@/assets/images/Vectors/infoSoup.svg";

import { CarouselInfo } from "@/components/ui/CarouselInfo/CarouselInfo";
import { TouristCTA } from "@/components/ui/TouristCTA/TouristCTA";
import { InfoCard } from "@/components/ui/InfoCard/InfoCard";

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.videoblock}>
        <video autoPlay loop muted playsInline className={styles.video}>
          <source src="/kitchenVideo.mov" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.videoContent}>
          <div className={styles.leftContent}>
            <TouristCTA />
            <h1 className={styles.title}>Кухня на Дружбата</h1>
          </div>
          <p className={styles.subtitle}>
            Домашно приготвена храна с <br /> вкус на традиция.
          </p>
        </div>
      </div>
      <div className={styles.infoSection}>
        <ul className={styles.infoList}>
          <InfoCard
            icon={infoSoup}
            alt="Info Icon"
            text="Истинска храна, приготвена днес"
          />
          <InfoCard
            icon={deliveryIcon}
            alt="Delivery Icon"
            text="Безплатна доставка в София"
          />
          <InfoCard
            icon={calendarInfo}
            alt="Calendar Icon"
            text="Всеки делник (Пон-Пет)"
          />
        </ul>
        <div className={styles.hotSales}>
          <CarouselInfo />
        </div>
      </div>
    </section>
  );
};
