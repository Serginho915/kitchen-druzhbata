"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import phone from "@/assets/images/Vectors/phone.svg";
import styles from "./PhoneButton.module.scss";

interface PhoneButtonProps {
  className?: string; // Additional classes for parent positioning
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
      if (!isPhoneExpanded) {
        e.preventDefault();
        setIsPhoneExpanded(true);
      }
    }
  };

  return (
    <Link
      ref={phoneRef}
      href={isMobile ? "tel:+3598899999" : "#"}
      className={`${styles.phoneIcon} ${isPhoneExpanded ? styles.phoneExpanded : ""} ${className || ""}`}
      onClick={handlePhoneClick}
      onMouseLeave={() => setIsPhoneExpanded(false)}
    >
      <Image
        src={phone}
        alt="Phone Icon"
        width={64}
        height={64}
        className={styles.icon}
      />
      <span className={styles.phoneNumber}>+359 88 999 99</span>
    </Link>
  );
};
