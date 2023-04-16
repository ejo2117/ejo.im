"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Heading from "./Heading";
import Flex from "./ui/Flex";
import { motion } from "framer-motion";
import styles from "./NavBar.module.scss";

const PATHS = [
  ["/", "Home"],
  ["/about", "About"],
  ["/resume", "Resume"],
] as const;

const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav>
      <Flex gap={4} justify="start">
        {PATHS.map(([href, name]) => {
          return (
            <Link key={href} href={href}>
              <Heading tag="h6">{name}</Heading>
              {pathname === href && (
                <motion.div
                  className={styles.underline}
                  layoutId="underline"
                ></motion.div>
              )}
            </Link>
          );
        })}
      </Flex>
    </nav>
  );
};

export default NavBar;
