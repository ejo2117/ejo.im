import React, { ReactNode } from "react";
import styles from "./Badge.module.scss";

type BadgeProps = {
  title: string;
  icon?: ReactNode;
  href?: string;
  backgroundColor?: string;
  textColor?: string;
};

const Badge = ({ title, icon }: BadgeProps) => {
  return <div className={styles.container}>{icon}</div>;
};

// Pre-Assembled Badges

const Figma = () => <Badge title="Figma" href="https://www.figma.com" />;

export default Badge;
