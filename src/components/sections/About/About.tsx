import { Container, Caption } from '@/components/ui'
import Link from 'next/link'
import React from 'react'
import styles from './About.module.scss'

const About = () => {
  return (
    <Container className={styles.container}>
      <Caption withBalancer>
        I&apos;m a software designer based in New York City,
        currently focused on bringing exciting digital product experiences to
        life at{" "}
        <Link
          href={"https://paireyewear.com"}
          target="_blank"
          rel="noreferrer noopener"
        >
          Pair Eyewear
        </Link>
        . In the past, I <span style={{ whiteSpace: "nowrap" }}>co-ran</span>{" "}
        <Link
          href={"https://sight.nyc"}
          target="_blank"
          rel="noreferrer noopener"
        >
          Sight
        </Link>
        , an indie design studio that delivered creative and technological
        solutions for multiple clients. I&apos;m passionate about a variety of
        topics including creative coding, creating and discussing music, and the
        NYT Crossword.
      </Caption>
    </Container>
  )
}

export default About