import React from "react";
import styles from "./TouristMenu.module.scss";
import { Subtitle } from "@/components/ui/Subtitle/Subtitle";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import { DishCard } from "@/components/ui/DishCard/DishCard";
import { TouristMenuData } from "./TouristMenuData";

export const TouristMenu = () => {
  return (
    <section className={styles.section}>
      <Subtitle text="WHAT TO TRY" className={styles.subtitle} />

      <div className={styles.header}>
        <SectionTitle text="Today's classics" className={styles.title} />
        <p className={styles.description}>
          The menu changes daily. These are the dishes that keep locals coming back.
        </p>
      </div>

      <div className={styles.grid}>
        {TouristMenuData.map((dish) => (
          <DishCard key={dish.id} {...dish} showAddToCart={false} />
        ))}
      </div>
    </section>
  );
};
