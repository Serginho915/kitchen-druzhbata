import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Subtitle } from "@/components/ui/Subtitle/Subtitle";
import { ReviewCard } from "@/components/ui/ReviewCard/ReviewCard";
import { GetDirectionButton } from "@/components/ui/GetDirectionButton/GetDirectionButton";
import { TOURIST_REVIEWS } from "./TouristReviewsData";
import styles from "./TouristReview.module.scss";

import logo from "@/assets/images/logo.png";
import reviewsBG from "@/assets/images/TouristBg/reviewsBG.svg";
import likeIcon from "@/assets/images/TouristBg/like.svg";
import Emoji1 from "@/assets/images/TouristBg/Emoji1.svg";
import emoji2 from "@/assets/images/TouristBg/emoji2.svg";

export const TouristReviews = () => {
  const [offset, setOffset] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const originalLength = TOURIST_REVIEWS.length;

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

  const [isLiked, setIsLiked] = useState(false);

  return (
    <section className={styles.section}>
      <div className={styles.bgWrapper}>
        <Image src={reviewsBG} alt="Background decoration" fill className={styles.bgImage} />
      </div>

      <div className={styles.container}>
        <Subtitle text="WHAT PEOPLE SAY" className={styles.subtitle} />

        <div className={styles.phoneWrapper}>
          <div className={styles.emojiLeft}>
            <Image src={Emoji1} alt="Decorative emoji" width={80} height={80} />
          </div>
          <div className={styles.emojiRight}>
            <Image src={emoji2} alt="Decorative emoji" width={80} height={80} />
          </div>
          <div
            className={styles.phone}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <header className={styles.phoneHeader}>
              <div className={styles.logoWrapper}>
                <Image src={logo} alt="Logo" width={44} height={44} className={styles.logo} />
              </div>
              <span className={styles.brandName}>Кухня на Дружба</span>
            </header>

            <div className={styles.scrollArea}>
              <div
                ref={listRef}
                className={styles.reviewsList}
                style={{
                  transform: `translateY(${offset}px)`,
                  transition: isTransitioning ? "transform 0.6s ease-in-out" : "none",
                }}
              >
                {[...TOURIST_REVIEWS, ...TOURIST_REVIEWS].map((review, index) => (
                  <div key={`${review.id}-${index}`} className={styles.cardContainer}>
                    <ReviewCard
                      stars={review.stars}
                      text={review.text}
                      author={review.author}
                      source={review.source}
                    />
                  </div>
                ))}
              </div>
            </div>

            <footer className={styles.phoneFooter}>
              <div className={styles.pagination}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
            <button
                className={`${styles.likeButton} ${isLiked ? styles.liked : ""}`}
                onClick={() => setIsLiked(!isLiked)}
              >
                <svg width="44" height="42" viewBox="0 0 44 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="42" height="40" rx="15" stroke="white" strokeWidth="2"/>
                  <path 
                    d="M27.6748 11.8071C30.7443 11.8071 33.1151 14.1567 33.1152 17.1265C33.1152 18.9623 32.2817 20.7008 30.625 22.689C29.3752 24.1888 27.7124 25.7674 25.7021 27.5835L23.5791 29.4839L22.502 30.438L21.4219 29.4731L21.4209 29.4722L19.2969 27.5747C17.287 25.7621 15.6245 24.1855 14.375 22.687C12.7185 20.7004 11.8848 18.9623 11.8848 17.1265C11.8849 14.1567 14.2557 11.8071 17.3252 11.8071C19.0646 11.8072 20.7431 12.6055 21.832 13.8599L22.5 14.6294L23.168 13.8599C24.2569 12.6055 25.9354 11.8072 27.6748 11.8071Z" 
                    stroke="white" 
                    strokeWidth="1.76923"
                    fill={isLiked ? "#FF3B30" : "none"}
                    style={{ transition: "fill 0.3s ease" }}
                  />
                </svg>
              </button>
            </footer>
          </div>
        </div>

        <div className={styles.ctaWrapper}>
          <GetDirectionButton label="Get Direction" />
        </div>
      </div>
    </section>
  );
};
