import React from "react";
import styles from "./Loader.module.scss";

interface LoaderProps {
  text?: string;
}

export const Loader: React.FC<LoaderProps> = ({ text = "Зареждаме..." }) => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.scene}>
        <div className={styles.pot}>
          <div className={`${styles.handle} ${styles.left}`}></div>
          <div className={`${styles.handle} ${styles.right}`}></div>
          
          <div className={styles.water}>
            <div className={styles.pelmeniContainer}>
              <div className={`${styles.pelmen} ${styles.p1}`}><div className={styles.pelmenInner}></div></div>
              <div className={`${styles.pelmen} ${styles.p2}`}><div className={styles.pelmenInner}></div></div>
              <div className={`${styles.pelmen} ${styles.p3}`}><div className={styles.pelmenInner}></div></div>
              <div className={`${styles.pelmen} ${styles.p4}`}><div className={styles.pelmenInner}></div></div>
              <div className={`${styles.pelmen} ${styles.p5}`}><div className={styles.pelmenInner}></div></div>
            </div>
          </div>
        </div>
      </div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};
