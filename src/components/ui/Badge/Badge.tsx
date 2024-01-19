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
import { EnvelopeClosedIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

type BadgeProps = {
  title?: string;
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
      className={title ? styles.container : styles.circle}
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
const GithubBadge = () => (
  <Badge
    href="https://github.com/ejo2117"
    icon={<GitHubLogoIcon />}
    backgroundColor="#E6E9EF"
    textColor="#0E1116"
  />
);
const LinkedInBadge = () => (
  <Badge
    href="https://www.linkedin.com/in/ethan-o-neal/"
    icon={<LinkedInLogoIcon />}
    backgroundColor="#E6E9EF"
    textColor="#0E1116"
  />
);
const EmailBadge = () => (
  <Badge
    href="mailto:ejo978@gmail.com"
    icon={<EnvelopeClosedIcon />}
    backgroundColor="#E6E9EF"
    textColor="#0E1116"
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
  GithubBadge,
  LinkedInBadge,
  EmailBadge,
  NextJsBadge,
  ShopifyBadge,
  SkillBadges,
};

export default Badge;
