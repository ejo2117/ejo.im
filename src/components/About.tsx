import React from "react";
import styles from "./PanelView.module.scss";
import { Heading, Body, Container } from "./ui";

const About = () => {
  return (
    <Container pad={4} className={styles.panel1}>
      <Heading tag="h1">ABOUT</Heading>
      <Body>Hi, I&apos;m Ethan. I live in New York City.</Body>
    </Container>
  );
};

export default About;
