import React from "react";
import styles from "./DeliverySection.module.scss";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import Image from "next/image";
import { DISTRICTS } from "./DeliveryDistrictData";
import Button from "@/components/ui/Button/Button";

export const DeliverySection = () => {
  return (
    <section>
      <div className={styles.titleContent}>
        <SectionTitle text="Доставка" />
        <h3 className={styles.subTitle}>
          Бърза и надеждна доставка до вашата врата!
        </h3>
      </div>

      <div className={styles.deliveryContent}>
        <Image
          src="/delivery.png"
          alt="Доставка"
          width={504}
          height={378}
          className={styles.deliveryImage}
        />
        <div className={styles.deliveryZone}>
          <div>
            <h4>Зона на покритие:</h4>
            <p>Доставяме поръчки във всички райони на София, включително:</p>
          </div>
          <ul>
            {DISTRICTS.map((district) => (
              <li key={district.id}>{district.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.btnBlock}>
            <Button>Поръчай</Button>
      </div>
    </section>
  );
};
