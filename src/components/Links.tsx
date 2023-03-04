import React from "react";
import styles from "./PanelView.module.scss";
import Heading from "./Heading";
import Container from "./ui/Container";

const Links = () => {
  return (
    <Container pad={4} className={styles.panel2}>
      <Heading tag="h6">Link1</Heading>
      <Heading tag="h6">Link2</Heading>
      <Heading tag="h6">Link3</Heading>
      <Heading tag="h6">Link4</Heading>
    </Container>
  );
};

export default Links;
