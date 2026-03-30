import Image from "next/image";
import styles from "./HomePage.module.scss";
import { Hero } from "@/sections/Hero/Hero";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <Hero />
    </div>
  );
}
