import Cell from "@/components/ui/Cell";
import { Flex } from "@/components/ui";
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
    <Flex column gap={4} position="relative">
      <Flex>
        <FigmaBadge />
        <ReactBadge />
        <ShopifyBadge />
        <NextJsBadge />
        <GraphQlBadge />
        <TypescriptBadge />
      </Flex>
      <Cell
        jobTitle={"Full Stack Developer"}
        company={"Pair Eyewear"}
        dates={"2020 - 2023"}
        description={`
           
          Cross-functional collaboration has a been a frequent and critical aspect of th I was exposed to challenges across multiple domains.  
        
          `}
      />
      <Cell
        jobTitle={"UI/UX Intern"}
        company={"Pair Eyewear"}
        dates={"2020 - 2020"}
        description={`

            Promoted to a full time engineering role after 4 months.
          `}
      />
      <Cell
        jobTitle={"Co-Owner, Product Engineer"}
        company={"Sight"}
        dates={"2018 - 2020"}
        description={`
            
            Brought bold and exciting creative visions to life for multiple E-Commerce clients.
          `}
      />
    </Flex>
  );
}
