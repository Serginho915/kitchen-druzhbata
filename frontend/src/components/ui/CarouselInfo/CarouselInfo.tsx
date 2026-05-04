"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./CarouselInfo.module.scss";
import { menuApi, SpecialOffer } from "@/lib/kitchenMenuApi";
import { resolveApiImage } from "@/lib/api";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import defaultBanner from "@/assets/images/defaultBanner.png";

export const CarouselInfo = () => {
  const [currSlide, setCurrSlide] = useState(0);
  const [carouselData, setCarouselData] = useState<SpecialOffer[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offers = await menuApi.getSpecialOffer();
        setCarouselData(offers);
      } catch (error) {
        console.error("Failed to fetch special offers:", error);
      }
    };
    fetchOffers();
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (carouselData.length <= 1) return;
    const interval = setInterval(() => {
      setCurrSlide((prev) => (prev + 1) % carouselData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [carouselData.length]);




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
          {carouselData.length > 0 ? (
            carouselData.map((slide) => (
              <div key={slide.id} className={styles.slide}>
                {slide.banner ? (
                  <Image
                    src={resolveApiImage(slide.banner) || ""}
                    alt={slide.text}
                    width={632}
                    height={256}
                    className={styles.image}
                    unoptimized
                  />
                ) : (
                  <div className={styles.imagePlaceholder}>
                    <span>{slide.text}</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className={styles.slide}>
              <Image
                src={defaultBanner}
                alt="Default Banner"
                width={632}
                height={256}
                className={styles.image}
                priority
              />
            </div>
          )}
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
