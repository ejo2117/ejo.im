import NavBar from "@/components/NavBar";
import { Flex } from "@/components/ui";
import "./globals.css";
import styles from "./page.module.scss";
import { Inter } from "next/font/google";
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
      <body>
        <main className={classes}>
          <section className={styles.frame}>
            <div className={styles.view}>
              <NavBar />
              <div className={styles.content} style={{ marginTop: "4.2rem" }}>
                {children}
              </div>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}

export const metadata = {
  title: "ejo",
  description: "Ethan's Homepage",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9f9f9" },
    { media: "(prefers-color-scheme: dark)", color: "#171817" },
  ],
};
