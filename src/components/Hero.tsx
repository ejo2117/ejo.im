import React from "react";
import styles from "./PanelView.module.scss";
import Heading from "./Heading";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <Heading tag="h1">HERO CONTENT</Heading>
    </div>
  );
};

export default Hero;
