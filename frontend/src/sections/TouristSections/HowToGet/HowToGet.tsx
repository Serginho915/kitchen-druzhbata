import React from "react";
import styles from "./HowToGet.module.scss";
import { Subtitle } from "@/components/ui/Subtitle/Subtitle";
import { Map } from "@/components/ui/Map/Map";

export const HowToGet = () => {
  return (
    <section className={styles.section}>
      <Subtitle text="FIND US" />
      <div className={styles.content}>
        <ul className={styles.cards}>
          <li className={styles.card}>
            <div className={styles.badge}>FROM AIRPORT</div>
            <p className={styles.text}>
              Take Metro <span className={styles.highlightM4}>Line M4</span>, 3
              stops to Druzhba station.
              <br />
              5-minute walk from the exit.
            </p>
          </li>
          <li className={styles.card}>
            <div className={styles.badge}>FROM THE CITY CENTRE</div>
            <p className={styles.text}>
              Take Metro <span className={styles.highlightM1}>Line M1</span> or{" "}
              <span className={styles.highlightM4}>M4</span> direction Airport,
              to Druzhba station.
            </p>
          </li>
        </ul>
        <div className={styles.mapWrapper}>
          <Map width={878} height={574} className={styles.map} />
        </div>
      </div>
    </section>
  );
};
