import React, { forwardRef } from "react";
import cn from "classnames";
import { ContainerProps, useContainerClasses } from "./Container";
import styles from "./Flex.module.scss";

export type FlexProps = JSX.IntrinsicElements["div"] &
  ContainerProps & {
    column?: boolean;
    align?: "center" | "start" | "end" | "baseline" | "normal";
    justify?:
      | "center"
      | "start"
      | "end"
      | "between"
      | "around"
      | "evenly"
      | "normal";
    /** align center, justify center */
    center?: boolean;
  };

const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      children,
      className,
      column = false,
      align = "normal",
      justify = "normal",
      center,
      style,
      ...rest
    },
    ref
  ) => {
    const containerClasses = useContainerClasses(rest);

    const classes = cn(styles["container"], className, containerClasses, {
      [styles["container--row"]]: !column,
      [styles["container--column"]]: column,
      [styles["container--alignCenter"]]: align === "center" || center,
      [styles["container--alignStart"]]: align === "start",
      [styles["container--alignEnd"]]: align === "end",
      [styles["container--alignBaseline"]]: align === "baseline",
      [styles["container--justifyCenter"]]: justify === "center" || center,
      [styles["container--justifyStart"]]: justify === "start",
      [styles["container--justifyEnd"]]: justify === "end",
      [styles["container--justifyBetween"]]: justify === "between",
      [styles["container--justifyAround"]]: justify === "around",
      [styles["container--justifyEvenly"]]: justify === "evenly",
    });

    // ! Better approaches are welcomed !
    const {
      maxWidth,
      fullWidth,
      fullHeight,
      backgroundColor,
      borderRadius,
      ...domSafeProps
    } = rest;

    return (
      <div className={classes} ref={ref} style={style} {...domSafeProps}>
        {children}
      </div>
    );
  }
);

Flex.displayName = "Flex";

export default Flex;
