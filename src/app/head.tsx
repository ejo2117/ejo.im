import { default as NextHead } from "next/head";
export default function Head() {
  return (
    <NextHead>
      <title>ejo</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Ethan's Homepage" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://use.typekit.net/gbc3qst.css" />
    </NextHead>
  );
}
