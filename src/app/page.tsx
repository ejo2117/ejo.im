"use client";
import { Flex, Spacer, Title } from "@/components/ui";
import { About, BlobStack } from "@/components/sections";
import Experience from "@/components/sections/Experience";

export default function Home() {
  return (
    <Flex column position="relative" style={{ zIndex: 1 }}>
      <Title>{`Ethan O'Neal`}</Title>
      <Spacer size={3.2}/>
      <About />
      <Spacer size={2.4}/>
      <Experience />
      <BlobStack />
    </Flex>
  );
}
