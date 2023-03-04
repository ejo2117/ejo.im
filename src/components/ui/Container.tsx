import React, { CSSProperties, forwardRef } from "react";
import cn from "classnames";
import styles from "./Container.module.scss";

// Create an list with the specified length.
// We need the list to have a specific length so that we check the correct number of classes
// But we don't need to store any other info in the list, so it can be filled with null values
const REM_RANGE_SIZE = 5;
const REM_RANGE = Array(REM_RANGE_SIZE).fill(null);

// Define all generic Container Props here –– things that may be used for Flex, Grid, or just plain Containers
export type ContainerProps = JSX.IntrinsicElements["div"] & {
  backgroundColor?: "white" | "gray1";
  /** Remove default border when `backgroundColor` is set */
  noBorder?: boolean;
  position?: CSSProperties["position"];
  hoverable?: boolean;
  /** Set gap size in REM, with formula n => (2^n)/10 */
  gap?: number;
  /** Set padding size in REM, with formula n => (2^n)/10 */
  pad?: number;
  /** Set margin size as 'auto' or in REM, with formula n => (2^n)/10 */
  margin?: number | "auto";
  /** Set border radius size in REM, with formula n => (2^n)/10 */
  borderRadius?: number;
  /** Fill Container Vertically */
  fullHeight?: boolean;
  /** Fill Container Horizontally */
  fullWidth?: boolean;
  /** Fill Container, but don't grow beyond 1184px */
  maxWidth?: boolean;
  /** Set height: 100vh */
  maxHeight?: boolean;
  /** Hug Contents */
  fitWidth?: boolean;
};

// Put the class name logic into a Hook so that Flex and Grid components can get the correct styles from their props
// This is a nice example of how Hooks can be used to acheive something similar to inheritance in OOP architectures
export const useContainerClasses = ({
  backgroundColor,
  borderRadius,
  className,
  hoverable,
  position,
  fullHeight,
  fullWidth,
  maxWidth,
  maxHeight,
  fitWidth,
  pad,
  margin,
  gap,
  noBorder = false,
}: ContainerProps) => {
  const classes = cn(styles["container"], className, {
    [styles["container--white"]]: backgroundColor === "white",
    [styles["container--gray1"]]: backgroundColor === "gray1",
    [styles["container--noborder"]]: noBorder,
    [styles["container--hoverable"]]: hoverable,
    [styles["container--relative"]]: position === "relative",
    [styles["container--absolute"]]: position === "absolute",
    [styles["container--fullHeight"]]: fullHeight,
    [styles["container--fullWidth"]]: fullWidth,
    [styles["container--maxWidth"]]: maxWidth,
    [styles["container--maxHeight"]]: maxHeight,
    [styles["container--fitWidth"]]: fitWidth,
    [styles["container--autoMargin"]]: margin === "auto",
    // Quick way to pull in correct class names for properties that exist in a range
    // Note that this approach only requires the index of the map() callback, the first argument is ignored with the underscore
    // See - https://stackoverflow.com/questions/27637013/what-is-the-meaning-of-an-underscore-in-javascript-function-parameter
    ...Object.fromEntries(
      REM_RANGE.map((_, i) => [
        styles[`container--${i + 1}padding`],
        pad === i + 1,
      ])
    ),
    ...Object.fromEntries(
      REM_RANGE.map((_, i) => [
        styles[`container--${i + 1}margin`],
        margin === i + 1,
      ])
    ),
    ...Object.fromEntries(
      REM_RANGE.map((_, i) => [styles[`container--${i + 1}gap`], gap === i + 1])
    ),
    ...Object.fromEntries(
      REM_RANGE.map((_, i) => [
        styles[`container--${i + 1}border-radius`],
        borderRadius === i + 1,
      ])
    ),
  });

  return classes;
};

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, ...rest }, ref) => {
    const classes = useContainerClasses({ className, ...rest });

    const domContainerProps = Object.assign({}, rest);
    delete domContainerProps.backgroundColor;
    delete domContainerProps.borderRadius;
    delete domContainerProps.fitWidth;
    delete domContainerProps.fullHeight;
    delete domContainerProps.fullWidth;
    delete domContainerProps.gap;
    delete domContainerProps.hoverable;
    delete domContainerProps.margin;
    delete domContainerProps.maxHeight;
    delete domContainerProps.maxWidth;
    delete domContainerProps.noBorder;
    delete domContainerProps.pad;

    return (
      <div ref={ref} className={classes} {...domContainerProps}>
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export default Container;
