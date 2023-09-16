import React from "react";

type SpacerProps = {
  /** Spacing in rem units */
  size: number;
};

const Spacer = ({ size }: SpacerProps) => {
  return <div style={{ height: `${size}rem` }} />;
};

export default Spacer;
