import Cell from "@/components/ui/Cell";
import { Caption, Flex } from "@/components/ui";
import {
  FigmaBadge,
  GraphQlBadge,
  NextJsBadge,
  ReactBadge,
  ShopifyBadge,
  TypescriptBadge,
} from "@/components/ui/Badge/Badge";
import styles from "./page.module.scss";

export default function Resume() {
  // Return JSX here!

  return (
    <ul className={styles.container}>
      <li>
        <Caption>
          Full Stack Developer — <i>Pair Eyewear</i>, June 2020 - Present
        </Caption>
      </li>
      <li>
        <Caption>
          UI/UX Design Intern — <i>Pair Eyewear</i>, March 2020 - June 2020
        </Caption>
      </li>
      <li>
        <Caption>
          Co-Owner, Product Developer — <i>Sight</i>, 2018 - 2020
        </Caption>
      </li>
      <li>
        <Caption>
          Team Member — <i>Pret a Manger</i>, 2018 - 2018
        </Caption>
      </li>
    </ul>
  );

  // return (
  //   <Flex column gap={4} position="relative">
  //     <Cell
  //       jobTitle={"Full Stack Developer"}
  //       company={"Pair Eyewear"}
  //       dates={"2020 - 2023"}
  //       description={`

  //         Cross-functional collaboration has a been a frequent and critical aspect of the role, and I have enjoyed working through challenges across multiple domains.

  //         `}
  //       skills={["typescript", "shopify", "react", "nextjs", "graphql"]}
  //     />
  //     <Cell
  //       jobTitle={"UI/UX Intern"}
  //       company={"Pair Eyewear"}
  //       dates={"2020 - 2020"}
  //       description={`

  //           Promoted to a full time engineering role after 4 months.
  //         `}
  //       skills={["figma", "shopify", "react"]}
  //     />
  //     <Cell
  //       jobTitle={"Co-Owner, Product Developer"}
  //       company={"Sight"}
  //       dates={"2018 - 2020"}
  //       description={`

  //           Brought bold and exciting creative visions to life for multiple E-Commerce clients.
  //         `}
  //       skills={["figma", "nextjs", "shopify", "react"]}
  //     />
  //   </Flex>
  // );
}
