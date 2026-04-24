"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaPhone } from "react-icons/fa";
import styles from "./PhoneButton.module.scss";

interface PhoneButtonProps {
  className?: string;
}

export const PhoneButton: React.FC<PhoneButtonProps> = ({ className }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isPhoneExpanded, setIsPhoneExpanded] = useState(false);
  const phoneRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1200);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isPhoneExpanded &&
        phoneRef.current &&
        !phoneRef.current.contains(e.target as Node)
      ) {
        setIsPhoneExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPhoneExpanded]);

  const handlePhoneClick = (e: React.MouseEvent) => {
    if (!isMobile) {
      e.preventDefault();
      if (!isPhoneExpanded) {
        setIsPhoneExpanded(true);
      }
    }
  };

  return (
    <a
      ref={phoneRef}
      href={isMobile ? "tel:+3598899999" : "#"}
      className={`${styles.socialLink} ${styles.phoneLink} ${isPhoneExpanded ? styles.phoneExpanded : ""} ${className || ""}`}
      aria-label="Телефон"
      onClick={handlePhoneClick}
      onMouseLeave={() => setIsPhoneExpanded(false)}
    >
      <FaPhone className={styles.phoneIcon} />
      <span className={styles.phoneNumber}>+359 88 999 99</span>
    </a>
  );
};
