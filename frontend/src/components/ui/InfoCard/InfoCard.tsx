"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./InfoCard.module.scss";

interface InfoCardProps {
  icon: StaticImageData;
  alt: string;
  text: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ icon, alt, text }) => {
  return (
    <li className={styles.infoItem}>
      <div className={styles.imgWrapper}>
        <Image
          src={icon}
          alt={alt}
          width={28}
          height={28}
          className={styles.icon}
        />
      </div>
      <span className={styles.infoText}>{text}</span>
    </li>
  );
};
