import React, { forwardRef } from "react";
import styles from "./Button.module.scss";
import cn from "classnames";

type ButtonVariant = "primary" | "secondary" | "tertiary";

type ButtonProps = JSX.IntrinsicElements["button"] & {
  variant: ButtonVariant;
  onClick?: (args?: any) => void;
  label?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label = "Button", onClick, className, style, ...rest }, ref) => {
    const classes = cn(styles.base, className);

    const handlePress = (e?: React.KeyboardEvent<HTMLButtonElement>) => {
      if (!onClick) return;
      if (!e) return onClick();
      if (e.key === "Enter") onClick();
    };

    return (
      <button
        ref={ref}
        className={classes}
        onClick={(e) => handlePress()}
        onKeyDown={(e) => handlePress(e)}
        {...rest}
      >
        {label}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
