import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.scss";
import Heading from "@/components/Heading";
import Container from "@/components/ui/Container";
import Body from "@/components/Body";
import { LOREM } from "@/utils/constants";
import Flex from "@/components/ui/Flex";
import Blob from "@/components/Blob";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Flex column center>
      <Blob />
      <Body>An amorphous blob, floating in space.</Body>
    </Flex>
  );
}
