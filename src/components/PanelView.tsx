import React from "react";
import styles from "./PanelView.module.scss";
import About from "./About";
import Hero from "./Hero";
import Links from "./Links";
import Container from "./ui/Container";

const PanelView = () => {
  return (
    <Container className={styles.container}>
      <Hero />
      <About />
      <Links />
    </Container>
  );
};

export default PanelView;
