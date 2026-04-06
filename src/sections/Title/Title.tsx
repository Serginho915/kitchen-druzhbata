import React from "react";
import styles from "./Title.module.scss";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";

export const Title = () => {
  return (
    <section>
        <SectionTitle text="Днешно Меню" className={styles.mainTitle}/>
        <h3 className={styles.subTitle}>Пссст… още е горещо!</h3>
    </section>
  )
}
