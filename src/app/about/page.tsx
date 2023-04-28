import { Caption, Container } from "@/components/ui";
import Link from "next/link";
import styles from "./page.module.scss";

export default function About() {
  return (
    <Container className={styles.container}>
      <Caption>
        {`I'm a software engineer and designer based in New York City, 
                  currently focused on bringing exciting digital product experiences to life at `}
      </Caption>
      <Link
        href={"https://paireyewear.com"}
        target="_blank"
        rel="noreferrer noopener"
      >
        <i>Pair Eyewear</i>
      </Link>
      <Caption>
        {`. I'm passionate about a variety of topics including creative coding, creating and discussing music, and the NYT Crossword.
                     
                     `}
      </Caption>
    </Container>
  );
}
