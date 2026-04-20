import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./TouristCTA.module.scss";

import logo from "@/assets/images/logo.png";
import navigate from "@/assets/images/Vectors/navigate.svg";
import bubbleBg from "@/assets/images/Vectors/message-container.svg";

export const TouristCTA = () => {
  return (
    <div className={styles.ctaWrapper}>
      <div className={styles.bubble} style={{ backgroundImage: `url(${bubbleBg.src})` }}>
        <div className={styles.content}>
          <p className={styles.text}>
            <strong>Visiting Sofia?</strong> Eat like a local. Authentic
            Bulgarian home cooking, just near the airport!
          </p>
          <Link href="/tourist" className={styles.exploreBtn}>
            <span>Explore</span>
            <Image
              src={navigate}
              alt="Navigate"
              width={20}
              height={20}
              className={styles.icon}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
