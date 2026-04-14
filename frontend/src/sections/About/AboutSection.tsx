"use client"
import React, { useEffect, useRef, useState } from "react";
import styles from "./AboutSection.module.scss";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import { ReviewCard } from "@/components/ui/ReviewCard/ReviewCard";
import { REVIEWS } from "./AboutData";

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
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2812.093672736488!2d23.39867367597638!3d42.65375537116702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa87144b490de7%3A0x276247e59fe3177a!2z0JrRg9GF0L3RjyDQndCwINCU0YDRg9C20LHQsNGC0LA!5e1!3m2!1suk!2sbg!4v1775319591722!5m2!1suk!2sbg"
              width="616"
              height="402"
              className={styles.map}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
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
