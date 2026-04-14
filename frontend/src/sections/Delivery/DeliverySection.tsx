import React from "react";
import styles from "./DeliverySection.module.scss";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import Image from "next/image";
import deliveryImg from "@/assets/images/deliveryImg.jpg";
import { DISTRICTS } from "./DeliveryDistrictData";
import { Button } from "@/components/ui/Button/Button";
import Link from "next/link";

export const DeliverySection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.titleContent}>
        <SectionTitle text="Доставка" />
        <h3 className={styles.subTitle}>
          Бърза и надеждна доставка до вашата врата!
        </h3>
      </div>

      <div className={styles.deliveryContent}>
        <Image
          src={deliveryImg}
          alt="Доставка"
          width={504}
          height={378}
          className={styles.deliveryImage}
        />
        <div className={styles.deliveryZone}>
          <h4 className={styles.zoneTitle}>Зона на покритие:</h4>
          <p className={styles.zoneDescription}>
            Доставяме поръчки във всички райони на София, включително:
          </p>

          <ul className={styles.districtList}>
            {DISTRICTS.map((district) => (
              <li key={district.id}>{district.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.btnBlock}>
        <Link href="/checkout" className={styles.orderLink}>
          <Button text="Поръчай" type="button" className={styles.orderBtn} />
        </Link>
      </div>
    </section>
  );
};
