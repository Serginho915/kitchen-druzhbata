import React from "react";
import styles from "./Button.module.scss";

export const Button = ({
  children,
  text,
  className = "",
  type = "button",
}: {
  children?: React.ReactNode;
  text?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <button className={`${className} ${styles.button}`} type={type}>
      {children || text}
    </button>
  );
};
