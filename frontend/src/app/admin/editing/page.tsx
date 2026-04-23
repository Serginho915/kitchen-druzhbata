"use client";

import KitchenEditingPage from "@/pages/Kitchen/EditingPage";
import { adminMenuApi } from "@/lib/adminMenuApi";

export default function Page() {
  return <KitchenEditingPage apiClient={adminMenuApi} />;
}
