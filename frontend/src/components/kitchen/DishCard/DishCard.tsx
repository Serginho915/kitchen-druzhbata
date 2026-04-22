import styles from "./DishCard.module.scss";

import { type Product } from "@/lib/kitchenMenuApi";

interface DishCardProps {
  item: Product;
  isSelected: boolean;
  onToggle: (id: number | string) => void;
}

export function DishCard({ item, isSelected, onToggle }: DishCardProps) {
  return (
    <div
      className={`${styles.dishCard} ${isSelected ? styles.selected : ""}`}
      onClick={() => onToggle(item.id)}
    >
      <div className={styles.checkbox}></div>
      <div className={styles.header}>
        <span className={styles.name}>{item.name}</span>
      </div>
      <div className={styles.details}>
        <span className={styles.weight}>{item.weight && item.weight > 0 ? `${item.weight}г` : ""}</span>
        <span className={styles.price}>{Number(item.price).toFixed(2)}€</span>
      </div>
    </div>
  );
}
