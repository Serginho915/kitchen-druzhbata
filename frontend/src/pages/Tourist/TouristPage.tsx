"use client";

import React from "react";
import { TouristHero } from "@/sections/TouristSections/TouristHero/TouristHero";
import { TouristHeader } from "@/components/layout/TouristHeader/TouristHeader";
import { TouristInfo } from "@/sections/TouristSections/TouristInfo/TouristInfo";

export default function TouristPage() {
  return (
    <>
      <TouristHeader />
      <main>
        <TouristHero />
        <TouristInfo />
      </main>
    </>
  );
}
