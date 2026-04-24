import React from "react";
import styles from "./TouristCTA.module.scss";
import bubbleBg from "@/assets/images/Vectors/message-container.svg";

import { GetDirectionButton } from "@/components/ui/GetDirectionButton/GetDirectionButton";

export const TouristCTA = () => {
  return (
    <div className={styles.ctaWrapper}>
      <div
        className={styles.bubble}
        style={{ backgroundImage: `url(${bubbleBg.src})` }}
      >
        <div className={styles.content}>
          <p className={styles.text}>
            <strong>Visiting Sofia?</strong> Eat like a local. Authentic
            Bulgarian home cooking, just near the airport!
          </p>
          <GetDirectionButton
            href="/tourist"
            label="Explore"
            target="_self"
            className={styles.exploreBtn}
            hideLabelOnMobile={true}
            fullWidthMobile={false}
            iconSize={20}
            useMinWidth={false}
          />
        </div>
      </div>
    </div>
  );
};
