import React from "react";
import styles from "./TouristHero.module.scss";
import Image from "next/image";

import calendarInfo from "@/assets/images/Vectors/calendarInfo.svg";
import deliveryIcon from "@/assets/images/Vectors/deliveryIcon.svg";
import infoSoup from "@/assets/images/Vectors/infoSoup.svg";
import touristBg from "@/assets/images/TouristBg/touristBg.svg";
import lasagne from "@/assets/images/lasagne.jpg";
import sarmi from "@/assets/images/sarmi.jpg";
import heroImg from "@/assets/images/TouristBg/HeroTourist.png";
import location from "@/assets/images/Vectors/locationWhite.svg";
import { GetDirectionButton } from "@/components/ui/GetDirectionButton/GetDirectionButton";
import { Subtitle } from "@/components/ui/Subtitle/Subtitle";

export const TouristHero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.bgPathContainer}>
        <Image
          src={touristBg}
          alt="background path"
          className={styles.bgPathSvg}
          priority
        />
      </div>

      <div className={styles.container}>
        <Subtitle text="For visitors & tourists" />
        <h1 className={styles.mainTitle}>Real Bulgarian food, made today </h1>

        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <Image
              src={lasagne}
              alt="lasagne"
              height={130}
              width={170}
              className={styles.lasagne}
            ></Image>
            <Image
              src={sarmi}
              alt="sarmi"
              height={130}
              width={170}
              className={styles.sarmi}
            ></Image>

            <div className={styles.infoCard}>
              <p className={styles.description}>
                Homemade Bulgarian meals, cooked daily in a small neighbourhood
                kitchen in Sofia.
              </p>
              <div className={styles.heroImgWrapper}>
                <Image
                  src={heroImg}
                  alt="hero-image"
                  width={388}
                  height={177}
                  className={styles.heroImg}
                  priority
                />
              </div>
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

            <div className={styles.rightInfo}>
              <ul className={styles.infoList}>
                <li className={styles.infoItem}>
                  <div className={styles.iconCircle}>
                    <Image src={location} alt="location" width={20} height={20} />
                  </div>
                  <span>15 min from airport</span>
                </li>
                <li className={styles.infoItem}>
                  <div className={styles.iconCircle}>
                    <Image src={infoSoup} alt="soup" width={20} height={20} />
                  </div>
                  <span>Dine in welcome</span>
                </li>
                <li className={styles.infoItem}>
                  <div className={styles.iconCircle}>
                    <Image src={calendarInfo} alt="calendar" width={20} height={20} />
                  </div>
                  <span>Mon-Fri, 10:00-21:00</span>
                </li>
              </ul>

              <div className={styles.ctaWrapper}>
                <GetDirectionButton label="Get direction" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
