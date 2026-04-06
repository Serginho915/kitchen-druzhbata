// import Image from "next/image";
import styles from "./HomePage.module.scss";
import { Hero } from "@/sections/Hero/Hero";
import { Title } from "@/sections/Title/Title";
import { Menu } from "@/sections/Menu/Menu";
import { MenuData } from "@/sections/Menu/MenuData";
import { AboutSection } from "@/sections/About/AboutSection";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <Hero />
      <Title />
      <Menu data={MenuData} />
      <AboutSection />
    </div>
  );
}
