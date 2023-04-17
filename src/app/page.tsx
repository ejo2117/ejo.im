"use client";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.scss";
import Heading from "@/components/Heading";
import Container from "@/components/ui/Container";
import Body from "@/components/Body";
import { LOREM } from "@/utils/constants";
import Flex from "@/components/ui/Flex";
import Blob from "@/components/Blob";
import { Poline } from "poline";
import Cell from "@/components/ui/Cell";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const poline = new Poline();
  return (
    <Flex column center gap={4}>
      <div className={styles.blobs}>
        <Blob colors={poline} />
      </div>
      <Flex column center>
        <Body>{"An amorphous blob, floating in space."}</Body>
        <Body>{"It doesn't do much other than look pretty!"}</Body>
        <div className={styles.spacer} />
        <Cell />
        <div className={styles.spacer} />
      </Flex>
    </Flex>
  );
}
