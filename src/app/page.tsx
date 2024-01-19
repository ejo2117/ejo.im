"use client";
import styles from "./page.module.scss";
import { Body, Flex } from "@/components/ui";
import Blob from "@/components/Blob";
import { Poline } from "poline";
import { EmailBadge, GithubBadge, LinkedInBadge } from "@/components/ui/Badge/Badge";

export default function Home() {
  const poline = new Poline();
  return (
    <Flex center gap={4} className={styles.mobileColumn}>
      <div className={styles.blobs}>
        <Blob colors={poline} blurStrength={8} points={4} />
        <Blob colors={poline} radius={110} points={8} amplitude={20} />
        <Blob colors={poline} radius={60} amplitude={12} blurStrength={1} />
      </div>
      <Flex gap={4}>
        <GithubBadge />
        <LinkedInBadge />
        <EmailBadge />
      </Flex>
    </Flex>
  );
}
