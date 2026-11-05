import type { Metadata } from "next";
import { Comfortaa, Inter } from "next/font/google";
import "@/styles/globals.scss";
import { AppShell } from "@/components/layout/AppShell";

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin", "cyrillic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "SofiaFood — рецепти, супа и специалитети",
  description: "Кулинарни истории с чувство за хумор, топла супа за офиса и кетъринг специалитети.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className={`${comfortaa.variable} ${inter.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
