"use client";
import { Flex, Spacer, Title } from "@/components/ui";
import { About, BlobStack } from "@/components/sections";
import Experience from "@/components/sections/Experience";
import styles from './page.module.scss'

export default function Home() {
  return (
    <Flex column position="relative" style={{ zIndex: 1 }}>
      <Flex column className={styles.glass}>
        <Title>{`Ethan O'Neal`}</Title>
        <Spacer size={6.4}/>
        <About />
        <Spacer size={2.4}/>
        <Experience />
      </Flex>
        <BlobStack />
    </Flex>
  );
}
