"use client";

import React from "react";
import { TouristHero } from "@/sections/TouristHero/TouristHero";
import { TouristHeader } from "@/components/layout/TouristHeader/TouristHeader";

export default function TouristPage() {
  return (
    <>
      <TouristHeader />
      <main>
        <TouristHero />
      </main>
    </>
  );
}
