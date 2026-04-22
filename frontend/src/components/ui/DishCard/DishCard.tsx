"use client";

import React from "react";
import styles from "./DishCard.module.scss";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";

interface DishCardProps {
  id: number;
  title: string;
  weight: string;
  description: string;
  price: number;
  image?: string;
  isHot?: boolean;
  showAddToCart?: boolean;
}

export const DishCard: React.FC<DishCardProps> = ({
  id,
  title,
  weight,
  description,
  price,
  image,
  isHot,
  showAddToCart = true,
}) => {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(id);

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
        {showAddToCart && (
          quantity === 0 ? (
            <button
              className={styles.addButton}
              onClick={() => addToCart({ id, title, weight, price, image })}
            >
              Добави
            </button>
          ) : (
            <div className={styles.quantityControl}>
              <button
                className={styles.qtyBtn}
                onClick={() => removeFromCart(id)}
              >
                −
              </button>
              <span className={styles.qtyCount}>{quantity}</span>
              <button
                className={styles.qtyBtn}
                onClick={() => addToCart({ id, title, weight, price, image })}
              >
                +
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};
