import React from "react";
import styles from "./ReviewCard.module.scss";
import Image from "next/image";
import star from "@/assets/images/Vectors/Star.svg";
import google from "@/assets/images/ReviewSource/GoogleMap.svg";
import facebook from "@/assets/images/ReviewSource/Facebook.svg";
import logo from "@/assets/images/logo.png";

interface ReviewCardProps {
  stars: number;
  text: string;
  author: string;
  source: string;
}

const getSourceImage = (source: string) => {
  switch (source) {
    case "Google":
      return google;
    case "Facebook":
      return facebook;
    default:
      return logo;
  }
};

export const ReviewCard = ({
  stars,
  text,
  author,
  source,
}: ReviewCardProps) => {
  return (
    <div className={styles.card}>
      <ul className={styles.mark}>
        {Array.from({ length: stars }, (_, i) => (
          <li key={i} className={styles.star}>
            <Image src={star} alt="Star icon" width={12} height={12} />
          </li>
        ))}
      </ul>
      <p className={styles.text}>{text}</p>

      <div className={styles.info}>
        <p className={styles.text + " " + styles.author}>{author}</p>
        <div className={styles.imgWrapper}>
          <Image
            src={getSourceImage(source)}
            alt={`${source}'s picture`}
            width={13}
            height={18}
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};
