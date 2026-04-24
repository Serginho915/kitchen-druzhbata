"use client";

import React, { useState, useEffect } from "react";
import styles from "./TouristHeader.module.scss";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import phone from "@/assets/images/Vectors/phone.svg";
import navigate from "@/assets/images/Vectors/navigate.svg";

import { PhoneButton } from "@/components/ui/header/PhoneButton/PhoneButton";

export const TouristHeader = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1200);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos <= 50) {
        setIsVisible(true);
      } else {
        setIsVisible(prevScrollPos > currentScrollPos);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <header
      className={`${styles.header} ${!isVisible ? styles.headerHidden : ""}`}
    >
      <div className={styles.logoBlock}>
        <Link href="/">
          <Image
            src={logo}
            alt="Kitchen Druzhbata Logo"
            className={styles.logo}
            width={80}
            height={80}
          />
        </Link>
      </div>

      <div className={styles.actions}>
        <PhoneButton />
        <Link
          href="https://maps.app.goo.gl/4W58KxWc4GTXwJPRA"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.actionBtn} ${styles.navBtn}`}
          aria-label="Get directions"
        >
          <Image
            src={navigate}
            alt="Navigate"
            width={28}
            height={28}
            className={styles.icon}
          />
        </Link>
      </div>
    </header>
  );
};
