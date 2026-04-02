"use client";

import React, { useState } from "react";
import styles from "./Menu.module.scss";
import Image from "next/image";
import { MenuData, Category, Dish } from "./MenuData";
import { DishCard } from "@/components/ui/DishCard/DishCard";

export const Menu = () => {
  const [openCategoryIds, setOpenCategoryIds] = useState<string[]>(["favorites"]);

  const toggleCategory = (id: string) => {
    setOpenCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className={styles.menuSection}>
      {MenuData.map((category: Category) => (
        <div
          key={category.id}
          className={`${styles.category} ${category.id === "favorites" ? styles.favorites : ""}`}
        >
          <div
            className={styles.categoryHeader}
            onClick={() => toggleCategory(category.id)}
          >
            <div className={styles.iconWrapper}>
              <Image
                src={category.icon}
                alt={category.title}
                width={24}
                height={24}
                className={styles.icon}
              />
            </div>
            <h2 className={styles.title}>{category.title}</h2>
          </div>

          <div
            className={`${styles.accordionContent} ${openCategoryIds.includes(category.id) ? styles.accordionContentExpanded : ""}`}
          >
            <div className={styles.dishesGrid}>
              {category.dishes.map((dish: Dish) => (
                <DishCard
                  key={dish.id}
                  {...dish}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
