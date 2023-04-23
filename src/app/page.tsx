"use client";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.scss";
import { LOREM } from "@/utils/constants";
import { Flex, Body, Container, Heading } from "@/components/ui";
import Blob from "@/components/Blob";
import { Poline } from "poline";
import Cell from "@/components/ui/Cell";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const poline = new Poline();
  return (
    <Flex column center gap={4}>
      <div className={styles.blobs}>
        <Blob colors={poline} blurStrength={8} points={4} />
        <Blob colors={poline} radius={60} amplitude={15} blurStrength={1} />
        <Blob colors={poline} radius={110} points={60} />
      </div>
    </Flex>
  );
}
