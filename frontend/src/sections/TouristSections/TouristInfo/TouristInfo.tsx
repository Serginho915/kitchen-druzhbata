import React from "react";
import styles from "./TouristInfo.module.scss";
import { Subtitle } from "@/components/ui/Subtitle/Subtitle";
import Image from "next/image";
import star from "@/assets/images/Vectors/Star.svg";

export const TouristInfo = () => {
  return (
    <section className={styles.section}>
      <Subtitle text="Why people love us" />

      <div className={styles.content}>
        <video autoPlay loop muted playsInline className={styles.video}>
          <source src="/touristVideo.mp4" />
          Your browser does not support the video tag.
        </video>

        <div className={styles.info}>
          <h2 className={styles.title}>
            This is where locals <span>actually</span> eat.
          </h2>

          <p className={styles.infoText}>
            In Druzhba, we cook the food Bulgarians grow up with. The kind of
            food Bulgarian grandmothers make.
          </p>
        </div>

        <ul className={styles.infoList}>
          <li className={styles.infoItem}>
            <div className={styles.starWrapper}>
              <Image src={star} alt="star" width={16} height={16} />
            </div>
            <div className={styles.infoTextBlock}>
                <p className={styles.pTop}>Authentic</p>
                <p className={styles.pBottom}>not adapted for tourists</p>
            </div>
          </li>
          <li className={styles.infoItem}>
            <div className={styles.starWrapper}>
              <Image src={star} alt="star" width={16} height={16} />
            </div>
            <div className={styles.infoTextBlock}>
                <p className={styles.pTop}>Daily Fresh</p>
                <p className={styles.pBottom}>cooked every morning</p>
            </div>
          </li>
          <li className={styles.infoItem}>
            <div className={styles.starWrapper}>
              <Image src={star} alt="star" width={16} height={16} />
            </div>
            <div className={styles.infoTextBlock}>
                <p className={styles.pTop}>Local Prices</p>
                <p className={styles.pBottom}>no tourist markups</p>
            </div>
          </li>
          <li className={styles.infoItem}>
            <div className={styles.starWrapper}>
              <Image src={star} alt="star" width={16} height={16} />
            </div>
            <div className={styles.infoTextBlock}>
                <p className={styles.pTop}>Small Kitchen</p>
                <p className={styles.pBottom}>big Bulgarian soul</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
