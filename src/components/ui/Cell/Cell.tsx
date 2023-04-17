import { LOREM } from "@/utils/constants";
import React from "react";
import Flex from "../Flex";
import styles from "./Cell.module.scss";

const Cell = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Cell Title</div>
      <Flex fullHeight fullWidth center>
        {LOREM}
      </Flex>
    </div>
  );
};

export default Cell;
