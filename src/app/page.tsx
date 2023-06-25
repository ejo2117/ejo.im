"use client";
import styles from "./page.module.scss";
import { Body, Flex } from "@/components/ui";
import SoundBlob from "@/components/SoundBlob";
import { Poline } from "poline";
import Audio from "@/components/Audio";

export default async function Home() {
  const poline = new Poline();
  return (
    <Flex column center gap={4}>
      <div id="logger"></div>
      {/* <div className={styles.blobs}>
        <Blob colors={poline} blurStrength={8} points={4} />
        <Blob colors={poline} radius={60} amplitude={12} blurStrength={1} />
        <Blob colors={poline} radius={110} points={8} amplitude={20} />
      </div> */}

      <SoundBlob colors={poline} blurStrength={8} points={4} />
      {/* <SoundBlob
        colors={poline}
        radius={110}
        blurStrength={8}
        points={8}
        amplitude={20}
      /> */}
      {/* <Blob colors={poline} blurStrength={8} points={4} /> */}
    </Flex>
  );
}
