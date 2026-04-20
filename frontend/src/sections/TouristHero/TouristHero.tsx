import React from "react";
import styles from "./TouristHero.module.scss";
import Image from "next/image";

import calendarInfo from "@/assets/images/Vectors/calendarInfo.svg";
import deliveryIcon from "@/assets/images/Vectors/deliveryIcon.svg";
import infoSoup from "@/assets/images/Vectors/infoSoup.svg";
import touristBg from "@/assets/images/TouristBg/touristBg.svg";
import lasagne from "@/assets/images/lasagne.jpg";
import sarmi from "@/assets/images/sarmi.jpg";
import { TouristHeader } from "@/components/layout/TouristHeader/TouristHeader";
import { InfoCard } from "@/components/ui/InfoCard/InfoCard";
import { GetDirectionButton } from "@/components/ui/GetDirectionButton/GetDirectionButton";

export const TouristHero = () => {
  return (
    <section className={styles.hero}>
      <Image
        src={touristBg}
        alt=""
        aria-hidden="true"
        className={styles.bgPath}
        width={1338}
        height={556}
        priority
      />

      <TouristHeader />

      <Image
        src={lasagne}
        alt="lasagne"
        height={91}
        width={120}
        className={styles.lasagne}
        ></Image>
        <Image
        src={sarmi}
        alt="sarmi"
        height={91}
        width={120}
        className={styles.sarmi}
        ></Image>

      <h3 className={styles.subtitle}>For visitors & tourists</h3>
      <h1 className={styles.title}>Real Bulgarian food, made today </h1>
      <div className={styles.content}>
        
      </div>
    </section>
  );
};
