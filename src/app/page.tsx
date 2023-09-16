"use client";
import { Flex, Title } from "@/components/ui";
import { About, BlobStack } from "@/components/sections";

export default function Home() {
  return (
    <Flex column>
      <Title>{`Ethan O'Neal`}</Title>
      <About />
      <BlobStack />
    </Flex>
  );
}
