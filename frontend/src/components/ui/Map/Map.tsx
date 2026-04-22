import React from "react";
import styles from "./Map.module.scss";

interface MapProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const Map: React.FC<MapProps> = ({ width = "100%", height = "402", className }) => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2812.093672736488!2d23.39867367597638!3d42.65375537116702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa87144b490de7%3A0x276247e59fe3177a!2z0JrRg9GF0L3RjyDQndCwINCU0YDRg9C20LHQsNGC0LA!5e0!3m2!1suk!2sbg!4v1775319591722!5m2!1suk!2sbg"
      width={width}
      height={height}
      className={`${styles.map} ${className || ""}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};
