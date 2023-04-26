import React from "react";

type SpacerProps = {
  /** Use rem */
  size: number;
};

const Spacer = ({ size }: SpacerProps) => {
  return <div style={{ height: `${size}rem` }} />;
};

export default Spacer;
