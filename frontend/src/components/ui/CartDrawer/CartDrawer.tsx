"use client";

import React from "react";
import styles from "./CartDrawer.module.scss";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Link from "next/link";

interface CartDrawerProps {
  isEmbedded?: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isEmbedded = false }) => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    removeItemCompletely,
  } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
        <div className={`${isEmbedded ? styles.embedded : styles.drawer} ${isCartOpen || isEmbedded ? styles.open : ""}`}>
        {!isEmbedded && (
          <div className={styles.header}>
            <h2 className={styles.headTitle}>Вашата количка</h2>
            <button
              className={styles.closeBtn}
              onClick={() => setIsCartOpen(false)}
            >
              <IoClose size={24} />
            </button>
          </div>
        )}

        <div className={styles.itemsList}>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div
                  className={styles.itemImage}
                  onClick={() => removeItemCompletely(item.id)}
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className={styles.img}
                    />
                  ) : (
                    <div className={styles.placeholder} />
                  )}
                  <div className={styles.deleteOverlay}>
                    <IoClose size={24} color="#fff" />
                  </div>
                </div>
                <div className={styles.itemInfo}>
                  <h4>{item.title}</h4>
                  <div className={styles.details}>
                    <span className={styles.price}>
                      € {item.price.toFixed(2)}
                    </span>
                    <span className={styles.weight}>{item.weight}</span>
                  </div>
                </div>
                <div className={styles.quantityControl}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => removeFromCart(item.id)}
                  >
                    −
                  </button>
                  <span className={styles.qtyValue}>{item.quantity}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>Вашата количка е празна</div>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.totalRow}>
            <span className={styles.label}>Общо</span>
            <span className={styles.value}>€ {totalPrice.toFixed(2)}</span>
          </div>

          {isEmbedded ? (
            <button
              type="submit"
              className={styles.orderBtn}
              disabled={cartItems.length === 0}
            >
              Поръчай <HiOutlineShoppingBag size={28} />
            </button>
          ) : (
            <Link
              href={cartItems.length === 0 ? "#" : "/checkout"}
              className={`${styles.orderLink} ${cartItems.length === 0 ? styles.disabledLink : ""}`}
              onClick={(e) => {
                if (cartItems.length === 0) {
                  e.preventDefault();
                } else {
                  setIsCartOpen(false);
                }
              }}
            >
              <button
                className={styles.orderBtn}
                disabled={cartItems.length === 0}
              >
                Поръчай <HiOutlineShoppingBag size={28} />
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
