import React from "react";
import styles from "./TakeawayBanner.module.scss";
import Image from "next/image";
import Link from "next/link";
import takeawayLogo from "@/assets/images/Just_Eat_Takeaway.png";

export const TakeawayBanner = () => {
  return (
    <div className={styles.wrapper}>
      <Link
        href="https://www.takeaway.com/bg/menu/kuhnya-na-druzhbatakuxnya-na-druzbata?utm_source=google&utm_medium=cpc&utm_campaign=CM_S_G_BGR_BG_[RES]_[ENGM]_Sofia_1001448&utm_campaignid=1533686634&gad_source=1&gad_campaignid=1533686634&gclid=CjwKCAjwhqfPBhBWEiwAZo196g-CyMw8jvPhyQN5bXQcF6Zk7w0AzexSwuaqF5f_1M_MnLfFvO-ogRoChKkQAvD_BwE"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.banner}
      >
        <div className={styles.content}>
          <div className={styles.logoWrapper}>
            <Image
              src={takeawayLogo}
              alt="Takeaway Logo"
              width={140}
              height={35}
              className={styles.logo}
            />
          </div>
          <p className={styles.text}>
            Насладете се на вкусната ни храна, доставена до вратата ви чрез <strong>Takeaway.com</strong>
          </p>
          <span className={styles.btn}>Поръчай сега</span>
        </div>
      </Link>
    </div>
  );
};
