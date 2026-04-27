"use client";

import React, { useEffect, useState } from "react";
import styles from "./TouristMenu.module.scss";
import { Subtitle } from "@/components/ui/Subtitle/Subtitle";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import { DishCard } from "@/components/ui/DishCard/DishCard";
import { menuApi, Product } from "@/lib/kitchenMenuApi";
import { Loader } from "@/components/ui/Loader/Loader";

export const TouristMenu = () => {
  const [dishes, setDishes] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Simple and free auto-translation function
  const translateText = async (text: string) => {
    if (!text) return "";
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=bg&tl=en&dt=t&q=${encodeURIComponent(text)}`
      );
      const data = await response.json();
      return data[0].map((item: any) => item[0]).join("");
    } catch (error) {
      console.error("Translation error:", error);
      return text; // Fallback to original
    }
  };

  useEffect(() => {
    const fetchAndTranslateDishes = async () => {
      try {
        const data = await menuApi.getToday();
        
        // Shuffle and pick 6
        const selected = [...data].sort(() => 0.5 - Math.random()).slice(0, 6);
        
        // Translate all selected dishes
        const translated = await Promise.all(
          selected.map(async (dish) => ({
            ...dish,
            name: await translateText(dish.name),
            description: await translateText(dish.description || ""),
          }))
        );
        
        setDishes(translated);
      } catch (error) {
        console.error("Failed to fetch tourist menu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAndTranslateDishes();
  }, []);

  if (loading) {
    return (
      <section className={styles.section}>
        <Loader text="" />
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <Subtitle text="WHAT TO TRY" className={styles.subtitle} />

      <div className={styles.header}>
        <SectionTitle text="Today's classics" className={styles.title} />
        <p className={styles.description}>
          Experience authentic taste. We've selected 6 random local favorites for you today.
        </p>
      </div>

      <div className={styles.grid}>
        {dishes.map((dish) => (
          <DishCard
            key={dish.id}
            id={Number(dish.id)}
            title={dish.name}
            weight={`${dish.weight || 0} г`}
            description={dish.description || ""}
            price={Number(dish.price)}
            image={dish.image || undefined}
            isHot={dish.is_spicy}
            showAddToCart={false}
          />
        ))}
      </div>
    </section>
  );
};

