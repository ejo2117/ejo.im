"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Heading from "./Heading";
import Flex from "./ui/Flex";

const NavBar = () => {
  const router = useRouter();
  return (
    <nav>
      <Flex gap={4} justify="start">
        <Link href={"/"}>
          <Heading tag="h6">Home</Heading>
        </Link>
        <Link href={"/about"}>
          <Heading tag="h6">About</Heading>
        </Link>
        <Link href={"/resume"}>
          <Heading tag="h6">Resume</Heading>
        </Link>
        <Link href={"/nfiownfe"}>
          <Heading tag="h6">Something Else</Heading>
        </Link>
      </Flex>
    </nav>
  );
};

export default NavBar;
