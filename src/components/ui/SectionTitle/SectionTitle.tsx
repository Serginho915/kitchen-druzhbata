import React from "react";
import styles from "./SectionTitle.module.scss";

interface SectionTitleProps {
  text: string;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ text, className }) => {
  return (
    <h2 className={`${styles.title} ${className || ""}`}>
      {text}
    </h2>
  );
};
