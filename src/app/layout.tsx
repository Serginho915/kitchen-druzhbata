import type { Metadata } from "next";
import { Comfortaa, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import "@/styles/globals.scss";

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["cyrillic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kitchen Druzhbata",
  description: "Food ordering made easy",
};

import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/ui/CartDrawer/CartDrawer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className={`${comfortaa.variable} ${inter.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
