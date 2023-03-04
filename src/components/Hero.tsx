import React from "react";
import styles from "./PanelView.module.scss";
import Heading from "./Heading";
import Container from "./ui/Container";
import { LOREM } from "@/utils/constants";
import Body from "./Body";

const Hero = () => {
  return (
    <Container pad={4} className={styles.hero}>
      <Heading tag="h1">HERO CONTENT</Heading>
      <Container>
        <Heading tag="h2">Heading 2</Heading>
        <Heading tag="h3">Heading 3</Heading>
        <Heading tag="h4">Heading 4</Heading>
        <Heading tag="h5">Heading 5</Heading>
        <Heading tag="h6">Heading 6</Heading>
      </Container>

      <Container>
        <Body withBalancer>{LOREM}</Body>
      </Container>
    </Container>
  );
};

export default Hero;
