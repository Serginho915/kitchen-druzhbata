import React from "react";
import styles from "./TouristHero.module.scss";
import Image from "next/image";

import calendarInfo from "@/assets/images/Vectors/calendarInfo.svg";
import deliveryIcon from "@/assets/images/Vectors/deliveryIcon.svg";
import infoSoup from "@/assets/images/Vectors/infoSoup.svg";
import touristBg from "@/assets/images/TouristBg/touristBg.svg";
import lasagne from "@/assets/images/lasagne.jpg";
import sarmi from "@/assets/images/sarmi.jpg";
import heroImg from "@/assets/images/TouristBg/HeroTourist.jpg"
import { GetDirectionButton } from "@/components/ui/GetDirectionButton/GetDirectionButton";

export const TouristHero = () => {
  return (
    <section className={styles.hero}>
        <h3 className={styles.subtitle}>For visitors & tourists</h3>
        <h1 className={styles.mainTitle}>Real Bulgarian food, made today </h1>


      <div className={styles.contentWrapper}>
        <div className={styles.content}>
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

          <div className={styles.info}>
            <p className={styles.description}>Homemade Bulgarian meals, cooked daily in a small neighbourhood kitchen in Sofia.</p>
            <Image 
            src={heroImg}
            alt="hero-image"
            width={388}
            height={177}
            className={styles.heroImg}
            />
            <div className={styles.infoBlocks}>
                <div className={styles.inforate}>
                    <span className={styles.infoNumber}>4,6+</span>
                    <span className={styles.infoDesc}>average rate</span>
                </div>
                <div className={styles.inforate}>
                    <span className={styles.infoNumber}>210+</span>
                    <span className={styles.infoDesc}>positive reviews</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
