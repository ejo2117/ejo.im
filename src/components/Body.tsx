import React, { FC, forwardRef } from "react";
import styles from "./Body.module.scss";
import cn from "classnames";

/**
 *  Body
 *
 * @default
 * - Size: 1.6rem
 * - Weight: 300
 * - Height: 2.4rem
 * - Family: Poppins
 */
const Body: FC<TypographyProps<HTMLParagraphElement>> = forwardRef(
  ({ children, style, className, ...rest }, forwardedRef) => {
    const classes = cn(styles.default, className);

    return (
      <p
        className={classes}
        ref={forwardedRef}
        style={{
          ...style,
        }}
        {...rest}
      >
        {children}
      </p>
    );
  }
);

Body.displayName = "Body";

export default Body;
