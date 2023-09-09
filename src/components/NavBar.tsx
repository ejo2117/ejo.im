"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Caption, Flex, Heading, Spacer, Title } from "./ui";
import { motion } from "framer-motion";
import styles from "./NavBar.module.scss";

const PATHS = [
  ["/", "Home"],
  ["/about", "About"],
  ["/experience", "Experience"],
] as const;

const NavBar = () => {
  const pathname = usePathname();

  return (
    <>

    <Title className={styles.title}>Ethan O&apos;Neal</Title>
      <nav className={styles.links}>
        {PATHS.map(([href, name]) => {
          const isCurrentPage = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={isCurrentPage ? styles.selected : ""}
            >
              <Caption>{name}</Caption>
              {/* {pathname === href && (
                <motion.div
                  className={styles.underline}
                  layoutId="underline"
                ></motion.div>
              )} */}
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default NavBar;
