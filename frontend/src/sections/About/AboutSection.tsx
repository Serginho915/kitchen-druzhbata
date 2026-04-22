"use client"
import React, { useEffect, useRef, useState } from "react";
import styles from "./AboutSection.module.scss";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import { ReviewCard } from "@/components/ui/ReviewCard/ReviewCard";
import { REVIEWS } from "./AboutData";
import { Map } from "@/components/ui/Map/Map";

export const AboutSection = () => {
  const [offset, setOffset] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  const originalLength = REVIEWS.length;

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const items = listRef.current?.children;
      if (!items) return;

      
      const nextIndex = currentIndex + 1;

      
      const currentItemHeight = (items[currentIndex] as HTMLElement).offsetHeight + 16;

      setIsTransitioning(true);
      setOffset((prev) => prev - currentItemHeight);
      setCurrentIndex(nextIndex);

      
      if (nextIndex === originalLength) {
        setTimeout(() => {
          setIsTransitioning(false);
          setOffset(0);
          setCurrentIndex(0);
        }, 600); 
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, originalLength]);

  return (
    <section className={sectionStyles}>
      <SectionTitle text="За нас" className={styles.title} />

      <div className={styles.content}>
        <div className={styles.leftContent}>
          <div className={styles.mapContent}>
            <div className={styles.locationInfo}>
              бул. „проф. Цветан Лазаров“ 226<br />
              ЖK Дружба 2
            </div>
            <Map 
              width="616" 
              height="402" 
              className={styles.map} 
            />
          </div>

          <div className={styles.info}>
            <div className={styles.openingHours}>
              <h3 className={styles.infoTitle}>Отворени сме Пон-Пет</h3>
              <div className={styles.hours}>10:00 - 21:00</div>
            </div>
            <p>Очакваме ви на обяд и вечеря с вкусно домашно меню, приготвено с внимание и любов, в уютна атмосфера.</p>
          </div>
        </div>
        <div
          className={styles.rightListWrapper}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <ul
            ref={listRef}
            className={styles.rightList}
            style={{
              transform: `translateY(${offset}px)`,
              transition: isTransitioning ? "transform 0.6s ease-in-out" : "none",
            }}
          >
            {[...REVIEWS, ...REVIEWS].map((review, index) => (
              <li key={`${review.id}-${index}`} className={styles.reviewItem}>
                <ReviewCard {...review} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const sectionStyles = styles.section;
