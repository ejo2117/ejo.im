import React from "react";
import styles from "./PanelView.module.scss";
import Heading from "./Heading";
import Body from "./Body";

const About = () => {
  return (
    <div className={styles.panel1}>
      <Heading tag="h1">ABOUT</Heading>
      <Body>My name is Ethan O&apos;Neal.</Body>
    </div>
  );
};

export default About;
