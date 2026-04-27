import styles from "./DishCard.module.scss";

import { type Product } from "@/lib/kitchenMenuApi";

interface DishCardProps {
  item: Product;
  isSelected: boolean;
  onToggle: (id: number | string) => void;
  showFullDetails?: boolean;
  showDescription?: boolean;
  showImage?: boolean;
}

const resolveImageSrc = (image?: string | null) => {
  if (!image) return null;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";
  const backendBaseUrl = apiBaseUrl.replace(/\/api\/?$/, "");

  return `${backendBaseUrl}${image.startsWith("/") ? "" : "/"}${image}`;
};

export function DishCard({
  item,
  isSelected,
  onToggle,
  showFullDetails = false,
  showDescription = true,
  showImage = true,
}: DishCardProps) {
  const dishImageSrc = resolveImageSrc(item.image);

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

      {showFullDetails ? (
        <div className={styles.meta}>
          {showDescription ? <span className={styles.metaRow}>{item.description?.trim() || "-"}</span> : null}
          {item.is_spicy ? <span className={styles.spicyBadge}>Острое</span> : null}

          {showImage ? (
            <div className={styles.imagesRow}>
              <div className={styles.imageBlock}>
                {dishImageSrc ? (
                  <img src={dishImageSrc} alt={item.name} className={styles.previewImage} loading="lazy" />
                ) : (
                  <div className={styles.imagePlaceholder} aria-label="Нет изображения">✕</div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
