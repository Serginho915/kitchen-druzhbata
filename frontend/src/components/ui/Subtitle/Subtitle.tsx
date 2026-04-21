import React from "react";
import styles from "./Subtitle.module.scss";

interface SubtitleProps {
  text: string;
  className?: string;
}

export const Subtitle: React.FC<SubtitleProps> = ({ text, className }) => {
  return (
    <h3 className={`${styles.subtitle} ${className || ""}`}>
      {text}
    </h3>
  );
};
