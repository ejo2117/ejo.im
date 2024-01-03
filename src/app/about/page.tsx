import { Caption, Container } from "@/components/ui";
import Link from "next/link";
import styles from "./page.module.scss";

export default function About() {
  return (
    <Container className={styles.container}>
      <Caption >
        Hey! I&apos;m a software engineer based in New York City,
        currently focused on bringing exciting digital product experiences to
        life at{" "}
        <Link
          href={"https://paireyewear.com"}
          target="_blank"
          rel="noreferrer noopener"
        >
          Pair Eyewear
        </Link>
        .<br /><br /> In the past, I did freelance design and development work as part of {" "}
        <Link
          href={"https://sight.nyc"}
          target="_blank"
          rel="noreferrer noopener"
        >
          Sight
        </Link>
        , an indie design studio based in Brooklyn.<br /><br /> In my own time, I&apos;m passionate about a variety of
        topics including creative coding, creating and discussing music, and the
        NYT Crossword.
      </Caption>
    </Container>
  );
}
