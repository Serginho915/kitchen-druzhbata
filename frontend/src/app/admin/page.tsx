"use client";

import KitchenHomePage from "@/pages/Kitchen/HomePage";
import { adminMenuApi } from "@/lib/adminMenuApi";

export default function Page() {
  return <KitchenHomePage apiClient={adminMenuApi} />;
}
