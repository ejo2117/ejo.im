import React, { ReactNode } from "react";
import styles from "./Badge.module.scss";

type BadgeProps = {
  title: string;
  icon?: ReactNode;
};

const Badge = ({ title, icon }: BadgeProps) => {
  return <div className={styles.container}>{icon}</div>;
};

export default Badge;
