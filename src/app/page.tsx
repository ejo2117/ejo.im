import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.scss";
import Heading from "@/components/Heading";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <Heading tag="h1">Hello</Heading>
      <Heading tag="h2">Hello</Heading>
      <Heading tag="h3">Hello</Heading>
      <Heading tag="h4">Hello</Heading>
      <Heading tag="h5">Hello</Heading>
      <Heading tag="h6">Hello</Heading>
    </main>
  );
}
