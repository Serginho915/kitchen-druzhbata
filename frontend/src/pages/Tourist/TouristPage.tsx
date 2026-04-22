"use client";

import React from "react";
import { TouristHero } from "@/sections/TouristSections/TouristHero/TouristHero";
import { TouristHeader } from "@/components/layout/TouristHeader/TouristHeader";
import { TouristInfo } from "@/sections/TouristSections/TouristInfo/TouristInfo";
import { HowToGet } from "@/sections/TouristSections/HowToGet/HowToGet";
import { TouristMenu } from "@/sections/TouristSections/TouristMenu/TouristMenu";
import styles from "./TouristPage.module.scss";

export default function TouristPage() {
  return (
    <div className={styles.page}>
      <TouristHeader />
      <main className={styles.main}>
        <TouristHero />
        <TouristInfo />
        <HowToGet />
        <TouristMenu />
      </main>
    </div>
  );
}
