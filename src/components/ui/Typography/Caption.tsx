import React, { FC, forwardRef } from "react";
import styles from "./Caption.module.scss";
import cn from "classnames";
import Balancer from "react-wrap-balancer";

/**
 *  Caption
 *
 * @default
 * - Size: 1.4rem
 * - Weight: 400
 * - Height: 2.1rem
 * - Family: Inter
 */
const Caption: FC<TypographyProps<HTMLSpanElement>> = forwardRef(
  (
    { children, style, className, withBalancer = false, bold, ...rest },
    forwardedRef
  ) => {
    const classes = cn(styles.default, { [styles.bold]: bold }, className);

    return (
      <span
        className={classes}
        ref={forwardedRef}
        style={{
          ...style,
        }}
        {...rest}
      >
        {withBalancer ? <Balancer>{children}</Balancer> : children}
      </span>
    );
  }
);

Caption.displayName = "Caption";

export default Caption;
