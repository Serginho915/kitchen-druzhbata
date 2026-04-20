"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./GetDirectionButton.module.scss";

import navigate from "@/assets/images/Vectors/navigate.svg";

interface GetDirectionButtonProps {
  href?: string;
  label?: string;
}

export const GetDirectionButton: React.FC<GetDirectionButtonProps> = ({
  href = "https://maps.app.goo.gl/4W58KxWc4GTXwJPRA",
  label = "Get Directions",
}) => {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={styles.btn}>
      <Image
        src={navigate}
        alt="Navigate"
        width={24}
        height={24}
        className={styles.icon}
      />
      <span>{label}</span>
    </Link>
  );
};
