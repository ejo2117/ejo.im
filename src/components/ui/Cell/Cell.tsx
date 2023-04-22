import { LOREM } from "@/utils/constants";
import React from "react";
import Flex from "../Flex";
import styles from "./Cell.module.scss";
import { Inter } from "@next/font/google";
const inter = Inter({ subsets: ["latin"] });

type CellProps = {
  jobTitle: string;
  company: string;
  dates: string;
  description: string;
};

const Cell = ({ jobTitle, company, dates, description }: CellProps) => {
  return (
    <Flex column className={styles.container} pad={4} position="relative">
      <Flex justify="between" align="end" className={styles.header}>
        <Flex column gap={1}>
          <b className={inter.className}>{jobTitle}</b>
          <i>{company}</i>
        </Flex>
        <i>{dates}</i>
      </Flex>
      <p className={inter.className}>{description}</p>
    </Flex>
  );
};

export default Cell;
