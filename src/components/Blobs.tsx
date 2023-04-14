"use client";

import { useAnimationFrame } from "@/lib/hooks/useAnimationFrame";
import React, { useEffect, useRef } from "react";

const Blobs = () => {
  const animate = () => {
    // I will change the parameters on every possible frame.
  };

  const [elapsed, delta] = useAnimationFrame();

  return (
    <div>
      {elapsed} {delta}
    </div>
  );
};

export default Blobs;
