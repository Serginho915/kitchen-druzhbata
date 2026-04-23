"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./CarouselInfo.module.scss";
import { CarouselMockData } from "./CarouselMockData";
import Image from "next/image";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useCart } from "@/hooks/useCart";

export const CarouselInfo = () => {
  const [currSlide, setCurrSlide] = useState(0);
  const { addToCart } = useCart();
  const carouselData = CarouselMockData;

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrSlide((prev) => (prev + 1) % carouselData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [carouselData.length]);

  const addPromoToCart = () => {
    const currentDeal = carouselData[currSlide];
    addToCart({
      id: currentDeal.content.id,
      title: currentDeal.content.title,
      weight: currentDeal.content.weight,
      price: currentDeal.content.price,
      image: currentDeal.content.image.src
    });
  };

  const dotWindowSize = 3;
  const dotSize = 12;
  const gapSize = 16;
  const startIndex = Math.max(
    0,
    Math.min(currSlide - 1, carouselData.length - dotWindowSize),
  );

  return (
    <div className={styles.carouselInfo}>
      <div className={styles.imageBlock}>
        <div 
          className={styles.track} 
          style={{ transform: `translateX(-${currSlide * 100}%)` }}
        >
          {carouselData.map((slide) => (
            <div key={slide.id} className={styles.slide}>
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
      </div>

      {/* <button className={styles.promoCartBtn} onClick={addPromoToCart}>
        <HiOutlineShoppingBag size={24} />
      </button> */}

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
                    onClick={() => setCurrSlide(index)}
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
