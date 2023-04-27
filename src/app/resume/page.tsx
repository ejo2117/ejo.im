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

export default function Resume() {
  // Return JSX here!

  return (
    <ul>
      <li>
        <Caption>
          Full Stack Developer at <i>Pair Eyewear</i>
        </Caption>
      </li>
      <li>
        <Caption>
          UI/UX Design Intern at <i>Pair Eyewear</i>
        </Caption>
      </li>
      <li>
        <Caption>
          Co-Owner, Product Developer at <i>Sight</i>
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
