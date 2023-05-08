"use client";
import styles from "./page.module.scss";
import { Body, Flex } from "@/components/ui";
import Blob from "@/components/Blob";
import { Poline } from "poline";

export default async function Home() {
  const poline = new Poline();
  return (
    <Flex column center gap={4}>
      <div className={styles.blobs}>
        <Blob colors={poline} blurStrength={8} points={4} />
        {/* <Blob colors={poline} radius={60} amplitude={15} blurStrength={1} /> */}
        {/* <Blob colors={poline} radius={110} points={6} /> */}
      </div>
    </Flex>
  );
}
