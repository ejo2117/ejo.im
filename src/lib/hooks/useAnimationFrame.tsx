"use client";
import { useEffect, useRef, useState } from "react";

const useAnimationFrame = (callback?: FrameRequestCallback) => {
  const requestRef = useRef<number>();
  const timerStartRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const [timeElapsed, setTimeElapsed] = useState(0);
  const [deltaTime, setDeltaTime] = useState(0);

  // Handle timer bar animations
  // There's a great explanation of this approach here https://css-tricks.com/using-requestanimationframe-with-react-hooks/
  const step: FrameRequestCallback = (timestamp) => {
    if (timerStartRef.current && previousTimeRef.current) {
      setTimeElapsed(timestamp - timerStartRef.current);
      setDeltaTime(timestamp - previousTimeRef.current);
    }
    previousTimeRef.current = timestamp;
    requestRef.current = window.requestAnimationFrame(step);
    callback && callback(timestamp);
  };

  useEffect(() => {
    // TODO - Add support for conditional execution
    timerStartRef.current = performance.now();
    requestRef.current = window.requestAnimationFrame(step);

    return () => {
      !!requestRef.current && window.cancelAnimationFrame(requestRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [timeElapsed, deltaTime] as const;
};

export { useAnimationFrame };
