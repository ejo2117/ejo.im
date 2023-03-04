import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.scss";
import Heading from "@/components/Heading";
import Container from "@/components/ui/Container";
import Body from "@/components/Body";
import { LOREM } from "@/utils/constants";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <Container>
        <Heading tag="h1">Heading 1</Heading>
        <Heading tag="h2">Heading 2</Heading>
        <Heading tag="h3">Heading 3</Heading>
        <Heading tag="h4">Heading 4</Heading>
        <Heading tag="h5">Heading 5</Heading>
        <Heading tag="h6">Heading 6</Heading>
      </Container>

      <Container>
        <Body>{LOREM}</Body>
      </Container>
    </main>
  );
}
