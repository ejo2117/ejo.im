import { default as NextHead } from "next/head";
export default function Head() {
  return (
    <NextHead>
      <title>ejo</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Ethan's Homepage" />
      <meta name="theme-color" content="#f9f9f9" />
      <meta
        name="theme-color"
        content="#f9f9f9"
        media="(prefers-color-scheme: light)"
      />
      {/* <meta
        name="theme-color"
        content="#872e4e"
        media="(prefers-color-scheme: dark"
      /> */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://use.typekit.net/gbc3qst.css" />
    </NextHead>
  );
}
