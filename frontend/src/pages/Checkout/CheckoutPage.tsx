"use client";

import React, { useState } from "react";
import { CartDrawer } from "@/components/ui/CartDrawer/CartDrawer";
import styles from "./CheckoutPage.module.scss";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import Link from "next/link";
import Image from "next/image";
import arrow from "@/assets/images/Vectors/arrow.svg";
import truck from "@/assets/images/Vectors/deliveryIcon.svg";

export default function CheckoutPage() {
  const [deliveryMethod, setDeliveryMethod] = useState("delivery"); // delivery | pickup
  const [paymentMethod, setPaymentMethod] = useState("card"); // card | cash

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <>
      <Header />
      <div className={styles.page}>
        <div className={styles.topNavigation}>
          <Link href="/#menu" className={styles.backLink}>
            <div className={styles.arrowCircle}>
              <Image
                src={arrow}
                alt="back"
                width={20}
                height={20}
                className={styles.backArrow}
              />
            </div>
            Продолжить покупки
          </Link>
        </div>

        <h1 className={styles.mainTitle}>
          Направи поръчка
          <Image
            src={truck}
            alt="truck"
            width={48}
            height={48}
            className={styles.truckIcon}
          />
        </h1>

        <form onSubmit={handleForm} className={styles.checkoutForm}>
          <div className={styles.leftColumn}>
            {/* Personal Data */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Лични данни</h2>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>
                    Име *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Име"
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="phone" className={styles.label}>
                    Телефон *
                  </label>
                  <div className={styles.phoneInputWrapper}>
                    <span className={styles.countryCode}>🇧🇬 +359</span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder=""
                      required
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.deliveryTabs}>
              <button
                type="button"
                className={`${styles.tab} ${deliveryMethod === "delivery" ? styles.active : ""}`}
                onClick={() => setDeliveryMethod("delivery")}
              >
                Доставка
              </button>
              <button
                type="button"
                className={`${styles.tab} ${deliveryMethod === "pickup" ? styles.active : ""}`}
                onClick={() => setDeliveryMethod("pickup")}
              >
                Вземи на място
              </button>
            </div>
            </section>

            

            {/* Address Details */}
            {deliveryMethod === "delivery" && (
              <section className={styles.section}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Изберете район *</label>
                    <select
                      name="district"
                      required
                      className={styles.select}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Изберете...
                      </option>
                      <option value="druzhba1">Дружба 1</option>
                      <option value="druzhba2">Дружба 2</option>
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Адрес *</label>
                    <input
                      type="text"
                      name="address"
                      required
                      className={styles.input}
                      placeholder="Адрес"
                    />
                  </div>
                </div>
                <div className={styles.rowThree}>
                  <div className={styles.field}>
                    <label className={styles.label}>Вход</label>
                    <input
                      type="text"
                      name="entrance"
                      className={styles.input}
                      placeholder="Вход"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Етаж</label>
                    <input
                      type="text"
                      name="floor"
                      className={styles.input}
                      placeholder="Етаж"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Апартамент</label>
                    <input
                      type="text"
                      name="apartment"
                      className={styles.input}
                      placeholder="Апартамент"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Delivery Time */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Време за доставка</h2>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Ден</label>
                  <select name="day" className={styles.select}>
                    <option>Днес</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Час</label>
                  <select name="hour" className={styles.select}>
                    <option>Възможно най-скоро</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Начин на плащане</h2>
              <div className={styles.paymentTabs}>
                <button
                  type="button"
                  className={`${styles.payTab} ${paymentMethod === "card" ? styles.active : ""}`}
                  onClick={() => setPaymentMethod("card")}
                >
                  Онлайн с карта
                </button>
                <button
                  type="button"
                  className={`${styles.payTab} ${paymentMethod === "cash" ? styles.active : ""}`}
                  onClick={() => setPaymentMethod("cash")}
                >
                  В брой
                </button>
              </div>
            </section>

            {/* Comments */}
            <section className={styles.section}>
              <div className={styles.field}>
                <label className={styles.label}>Коментари</label>
                <textarea
                  name="comments"
                  className={styles.textarea}
                  placeholder="Коментари"
                />
              </div>
            </section>
          </div>

          <aside className={styles.rightColumn}>
            <div className={styles.stickyCart}>
              <CartDrawer isEmbedded={true} />
            </div>
          </aside>
        </form>
      </div>
      <Footer />
    </>
  );
}
