"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./CarouselInfo.module.scss";
import { CarouselMockData } from "./CarouselMockData";
import Image from "next/image";

export const CarouselInfo = () => {
  const [currSlide, setCurrSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const carouselData = CarouselMockData;

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: slideRef.current,
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = slideRefs.current.findIndex(
            (ref) => ref === entry.target,
          );
          if (index !== -1) setCurrSlide(index);
        }
      });
    }, observerOptions);

    slideRefs.current.forEach((slide) => {
      if (slide) observer.observe(slide);
    });

    return () => observer.disconnect();
  }, []);

  const dotWindowSize = 3;
  const dotSize = 12;
  const gapSize = 16;
  const startIndex = Math.max(
    0,
    Math.min(currSlide - 1, carouselData.length - dotWindowSize),
  );

  return (
    <div className={styles.carouselInfo}>
      <div className={styles.imageBlock} ref={slideRef}>
        {carouselData.map((slide, index) => (
          <div
            key={slide.id}
            className={styles.slide}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
          >
            <Image
              src={slide.content.image}
              alt={slide.content.title}
              width={632}
              height={256}
              className={styles.image}
            />
          </div>
        ))}
      </div>

      <div className={styles.buttons}>
        <div className={styles.dots}>
          {carouselData.length > 1 && (
            <div className={styles.dotsContainer}>
              <div
                className={styles.dotsTrack}
                style={{
                  transform: `translateX(-${startIndex * (dotSize + gapSize)}px)`,
                }}
              >
                {carouselData.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`${styles.dot} ${currSlide === index ? styles.active : ""}`}
                    onClick={() => {
                      slideRefs.current[index]?.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "start",
                      });
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
