import NavBar from "@/components/NavBar";
import Flex from "@/components/ui/Flex";
import "./globals.css";
import Head from "./head";
import styles from "./page.module.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head />
      <body>
        <main className={styles.main}>
          <Flex fullHeight fullWidth center pad={4}>
            <NavBar />
            <Flex
              fullHeight
              fullWidth
              center
              pad={4}
              className={styles.content}
            >
              {children}
            </Flex>
          </Flex>
        </main>
      </body>
    </html>
  );
}
