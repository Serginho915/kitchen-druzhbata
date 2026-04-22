import type { Metadata } from "next";
import "@/app/kitchen/kitchen-theme.css";

export const metadata: Metadata = {
  title: "Kitchen Admin",
  description: "Admin constructor for menu management",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
