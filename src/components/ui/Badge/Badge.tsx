"use client";
import React, { ReactNode } from "react";
import styles from "./Badge.module.scss";
import {
  Figma,
  GraphQL,
  Nextjs,
  ReactIcon,
  Shopify,
  Typescript,
} from "../Icons";
import { Label } from "@/components/ui/Typography";

type BadgeProps = {
  title: string;
  icon?: ReactNode | JSX.Element;
  href?: string;
  backgroundColor?: HexColor;
  textColor?: HexColor;
};

const Badge = ({
  title,
  href,
  icon,
  backgroundColor,
  textColor,
}: BadgeProps) => {
  return (
    <a
      className={styles.container}
      style={{ backgroundColor, color: textColor }}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      tabIndex={0}
    >
      {icon}
      <Label bold>{title}</Label>
    </a>
  );
};

// Pre-Assembled Badges

const FigmaBadge = () => (
  <Badge
    title="Figma"
    href="https://www.figma.com"
    icon={<Figma />}
    backgroundColor="#1E1E1E"
    textColor="#FAFAFA"
  />
);

const ReactBadge = () => (
  <Badge
    title="React"
    href="https://react.dev"
    icon={<ReactIcon />}
    backgroundColor="#E8FAFF"
    textColor="#0C809F"
  />
);

const ShopifyBadge = () => (
  <Badge
    title="Shopify"
    href="https://shopify.dev"
    icon={<Shopify />}
    backgroundColor="#EFF6E4"
    textColor="#2E6807"
  />
);
const NextJsBadge = () => (
  <Badge
    title="Next.js"
    href="https://nextjs.org"
    icon={<Nextjs />}
    backgroundColor="#F1F1F1"
    textColor="#000000"
  />
);
const TypescriptBadge = () => (
  <Badge
    title="TypeScript"
    href="https://www.typescriptlang.org"
    icon={<Typescript />}
    backgroundColor="#E1EEFD"
    textColor="#1E4B7D"
  />
);
const GraphQlBadge = () => (
  <Badge
    title="GraphQL"
    href="https://graphql.org"
    icon={<GraphQL />}
    backgroundColor="#FFE7F7"
    textColor="#C20082"
  />
);

const SkillBadges = {
  figma: FigmaBadge,
  react: ReactBadge,
  typescript: TypescriptBadge,
  graphql: GraphQlBadge,
  nextjs: NextJsBadge,
  shopify: ShopifyBadge,
} as const;

export {
  FigmaBadge,
  ReactBadge,
  TypescriptBadge,
  GraphQlBadge,
  NextJsBadge,
  ShopifyBadge,
  SkillBadges,
};

export default Badge;
