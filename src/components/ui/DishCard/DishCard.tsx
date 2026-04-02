import React from "react";
import styles from "./DishCard.module.scss";
import Image from "next/image";

interface DishCardProps {
  id: number;
  title: string;
  weight: string;
  description: string;
  price: number;
  image?: string;
  isHot?: boolean;
}

export const DishCard: React.FC<DishCardProps> = ({
  title,
  weight,
  description,
  price,
  image,
  isHot,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {image ? (
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder} />
        )}
        {isHot && <span className={styles.hotBadge}>hot</span>}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <span className={styles.weight}>{weight}</span>
      <p className={styles.description}>{description}</p>
      <div className={styles.footer}>
        <span className={styles.price}>€ {price.toFixed(2)}</span>
        <button className={styles.addButton}>Добави</button>
      </div>
    </div>
  );
};
