import React, { FC, forwardRef, ReactNode } from "react";
import Balancer from "react-wrap-balancer";
import styles from "./Heading.module.scss";

type Tag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type Props = {
  children?: ReactNode;
  className?: string;
  style?: Partial<CSSStyleDeclaration>;
  tag?: Tag;
  ref?: React.ForwardedRef<HTMLHeadingElement>;
  withBalancer?: boolean;
};

/**
 * Heading
 *
 * @tagOptions [h1, h2, h3, h4, h5, h6]
 * @default
 * - Size: 4rem
 * - Weight: 500
 * - Height: 4.8rem
 * - Family: Platform
 * - Margin: 0
 */
const Heading: FC<Props> = forwardRef(
  (
    { children, className, style, tag = "h1", withBalancer = false, ...props },
    forwardedRef
  ) => {
    const TAG = tag;

    props.ref = forwardedRef;

    const newProps = {
      ...props,
      className: `${styles.default} ${styles[tag]} ${className}`,
      style,
    };

    const textContent = withBalancer ? (
      <Balancer>{children}</Balancer>
    ) : (
      children
    );

    return React.createElement(TAG, newProps, textContent);
  }
);

Heading.displayName = "Heading";

export default Heading;
