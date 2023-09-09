"use client";
import styles from "./page.module.scss";
import { Body, Flex } from "@/components/ui";
import Blob from "@/components/ui/Blob/Blob";
import { Poline } from "poline";

export default function Home() {
  const poline = new Poline();
  return (
      <div className={styles.blobs}>
        <Blob colors={poline} blurStrength={8} points={4} />
        <Blob colors={poline} radius={110} points={8} amplitude={20} />
        <Blob colors={poline} radius={60} amplitude={12} blurStrength={1} />
      </div>
  );
}
