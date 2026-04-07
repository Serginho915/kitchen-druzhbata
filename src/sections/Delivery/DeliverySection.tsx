import React from 'react'
import styles from "./DeliverySection.module.scss";
import { SectionTitle } from '@/components/ui/SectionTitle/SectionTitle';


export const DeliverySection = () => {
  return (
    <section>
        <SectionTitle text="Доставка"/>
        <h3 className={styles.subTitle}>Бърза и надеждна доставка до вашата врата!</h3>
    </section>
  )
}
