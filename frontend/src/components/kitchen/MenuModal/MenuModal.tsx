"use client";

import { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import styles from "./MenuModal.module.scss";

import { type Product } from "@/lib/kitchenMenuApi";

const CATEGORY_ICONS: Record<string, string> = {
  "САЛАТИ": "/kitchen-assets/dishesCategories/Salad.svg",
  "СУПИ": "/kitchen-assets/dishesCategories/Soup.svg",
  "ОСНОВНИ ЯСТИЯ": "/kitchen-assets/dishesCategories/MainDish.svg",
  "МЕСО И РИБА": "/kitchen-assets/dishesCategories/MeatFish.svg",
  "ГАРНИТУРИ": "/kitchen-assets/dishesCategories/Side.svg",
  "ДЕСЕРТИ": "/kitchen-assets/dishesCategories/Dessert.svg",
  "СТУДЕНИ ЯСТИЯ / РАЗЯДКИ": "/kitchen-assets/dishesCategories/pepperHot.svg",
};

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: Product[];
}

export function MenuModal({ isOpen, onClose, selectedItems }: MenuModalProps) {
  const templateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const today = new Date();
  const dayOfWeek = today.toLocaleDateString("bg-BG", { weekday: "long" });
  const capitalizedDay = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const displayDate = `(${capitalizedDay} / ${day}.${month})`;

  const groupedItems = selectedItems.reduce((accumulator, item) => {
    const category = item.category || "Друго";
    if (!accumulator[category]) accumulator[category] = [];
    accumulator[category].push(item);
    return accumulator;
  }, {} as Record<string, Product[]>);

  const handleDownload = async (format: "png" | "jpeg") => {
    if (!templateRef.current) return;

    try {
      const canvas = await html2canvas(templateRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true,
      });

      const link = document.createElement("a");
      link.download = `menu-${today.toISOString().split("T")[0]}.${format}`;
      link.href = canvas.toDataURL(`image/${format}`, 1.0);
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(event) => event.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Изглед отпред на шаблона</h2>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>

        <div className={styles.modalBody}>
          <div ref={templateRef} className={styles.templateWrapper}>
            <header className={styles.templateHeader}>
              <div className={styles.headerTitleSection}>
                <h1 className={styles.menuTitle}>Меню</h1>
                <p className={styles.dateSubtext}>{displayDate}</p>
              </div>
              <div className={styles.headerLogoSection}>
                <img src="/kitchen-assets/IMG_9834 1.png" alt="Logo" className={styles.templateLogo} />
              </div>
            </header>

            {Object.keys(groupedItems)
              .sort((a, b) => {
                const order = [
                  "СУПИ",
                  "САЛАТИ",
                  "ОСНОВНИ ЯСТИЯ",
                  "МЕСО И РИБА",
                  "ГАРНИТУРИ",
                  "СТУДЕНИ ЯСТИЯ / РАЗЯДКИ",
                  "ДЕСЕРТИ",
                ];
                const indexA = order.indexOf(a);
                const indexB = order.indexOf(b);
                if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                if (indexA !== -1) return -1;
                if (indexB !== -1) return 1;
                return a.localeCompare(b);
              })
              .map((category) => (
                <div key={category} className={styles.categoryGroup}>
                  <div className={styles.categoryHeader}>
                    {CATEGORY_ICONS[category] && (
                      <img src={CATEGORY_ICONS[category]} alt={category} className={styles.categoryIcon} />
                    )}
                    <h3 className={styles.categoryName}>{category}</h3>
                  </div>
                  <ul className={styles.itemList}>
                    {groupedItems[category].map((item) => (
                      <li key={item.id} className={styles.menuItem}>
                        <span className={styles.itemName}>{item.name}</span>
                        <span className={styles.itemDetails}></span>
                        {item.weight && item.weight > 0 ? <span className={styles.itemWeight}>{item.weight} гр</span> : null}
                        <span className={styles.itemPrice}>€{Number(item.price).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.downloadBtn} onClick={() => void handleDownload("png")}>Скачать PNG</button>
          <button className={styles.secondaryBtn} onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
}
