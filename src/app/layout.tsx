import NavBar from "@/components/NavBar";
import { Flex } from "@/components/ui";
import "./globals.css";
import Head from "./head";
import styles from "./page.module.scss";
import { Inter } from "@next/font/google";
import cn from "classnames";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const classes = cn(styles.main, inter.className);

  return (
    <html lang="en">
      <Head />
      <body>
        <main className={classes}>
          <Flex
            fullHeight
            className={styles.content}
            margin={"auto"}
            justify="start"
            align="center"
            pad={4}
          >
            <NavBar />
            {/* <Flex center pad={4} className={styles.content}>
              {children}
            </Flex> */}
          </Flex>
        </main>
      </body>
    </html>
  );
}
