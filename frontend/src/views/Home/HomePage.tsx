"use client";

import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import { Hero } from "@/sections/Hero/Hero";
import { Title } from "@/sections/Title/Title";
import { Menu } from "@/sections/Menu/Menu";
import { Categories, Category } from "@/sections/Menu/MenuData";
import { AboutSection } from "@/sections/About/AboutSection";
import { DeliverySection } from "@/sections/Delivery/DeliverySection";
import { menuApi } from "@/lib/kitchenMenuApi";
import { Loader } from "@/components/ui/Loader/Loader";

export default function HomePage() {
  const [menuData, setMenuData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const dishes = await menuApi.getToday();
        console.log("Fetched dishes for today:", dishes);
        
        const grouped = Categories.map(cat => {
          const categoryDishes = dishes.filter(d => {
            const dishCat = d.category?.toLowerCase().trim();
            const targetId = cat.id.toLowerCase();
            const targetTitle = cat.title.toLowerCase();
            
            // Match by ID, by Title, OR put in 'favorites' if category is empty
            const isMatch = dishCat === targetId || dishCat === targetTitle;
            const isFallbackFavorite = cat.id === 'favorites' && (!dishCat || dishCat === 'favorites');
            
            return isMatch || isFallbackFavorite;
          });

          return {
            ...cat,
            dishes: categoryDishes.map(d => ({
              id: Number(d.id),
              title: d.name,
              weight: `${d.weight || 0} г`,
              description: d.description || "",
              price: Number(d.price),
              image: d.image || undefined,
              isHot: d.is_spicy
            }))
          };
        }).filter(cat => cat.dishes.length > 0 || cat.id === 'favorites');

        console.log("Grouped menu data:", grouped);
        setMenuData(grouped);
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  return (
    <div className={styles.page}>
      <Hero />
      <Title />
      {loading ? (
        <Loader text="Зареждаме менюто..." />
      ) : (
        menuData.length > 0 && <Menu data={menuData} />
      )}
      <AboutSection />
      <DeliverySection />
    </div>
  );
}
