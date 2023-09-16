"use client";
import { Flex, Title } from "@/components/ui";
import { About, BlobStack } from "@/components/sections";
import Experience from "@/components/sections/Experience";

export default function Home() {
  return (
    <Flex column>
      <Title>{`Ethan O'Neal`}</Title>
      <About />
      <Experience />
      <BlobStack />
    </Flex>
  );
}
