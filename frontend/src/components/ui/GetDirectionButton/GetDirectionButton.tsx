"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./GetDirectionButton.module.scss";

import navigate from "@/assets/images/Vectors/navigate.svg";

interface GetDirectionButtonProps {
  href?: string;
  label?: string;
  className?: string;
  hideLabelOnMobile?: boolean;
  target?: string;
  fullWidthMobile?: boolean;
  iconSize?: number;
  useMinWidth?: boolean;
}

export const GetDirectionButton: React.FC<GetDirectionButtonProps> = ({
  href = "https://maps.app.goo.gl/4W58KxWc4GTXwJPRA",
  label = "Get Directions",
  className = "",
  hideLabelOnMobile = false,
  target = "_blank",
  fullWidthMobile = true,
  iconSize = 24,
  useMinWidth = true,
}) => {
  const btnClasses = [
    styles.btn,
    useMinWidth ? styles.minWidth : "",
    fullWidthMobile ? styles.fullWidthMobile : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={btnClasses}
    >
      <span className={hideLabelOnMobile ? styles.hideLabelMobile : ""}>
        {label}
      </span>
      <Image
        src={navigate}
        alt="Navigate"
        width={iconSize}
        height={iconSize}
        className={styles.icon}
      />
    </Link>
  );
};
