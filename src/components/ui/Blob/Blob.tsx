// Blob.tsx

import { useAnimationFrame } from "@/lib/hooks/useAnimationFrame";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Poline } from "poline";
import CanvasBlob from "./CanvasBlob";
import {  BezierControlPoint, BlobNode, createAnimation, rotate } from "./utils";


// CONSTANTS
const TOTAL_NODES = 8;
const SPEED = 2;
const RADIUS = 150;
const AMPLITUDE = 40;

const VIEW_SIZE = 400;

type BlobProps = {
  colors: Poline;
  radius?: number;
  speed?: number;
  amplitude?: number;
  viewSize?: number;
  blurStrength?: number;
  points?: number;
};

// https://observablehq.com/@daformat/drawing-blobs-with-svg
const Blob = ({
  colors = new Poline(),
  radius = RADIUS,
  speed = SPEED,
  amplitude = AMPLITUDE,
  viewSize = VIEW_SIZE,
  blurStrength = 8,
  points = TOTAL_NODES,
}: BlobProps) => {
  const OFFSET_X = viewSize / 2 - radius;
  const OFFSET_Y = viewSize / 2 - radius;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationStart = useRef(performance.now());


  const createNodes = useCallback(
    (radius: number, offsetX: number, offsetY: number) => {
      let nodes: BlobNode[] = [],
        width = radius * 2,
        height = radius * 2,
        angle,
        x,
        y;

      for (let i = 0; i < points; i++) {
        angle = (i / (points / 2)) * Math.PI;
        x = radius * Math.cos(angle) + width / 2;
        y = radius * Math.sin(angle) + width / 2;
        nodes.push({
          id: i,
          x: x + offsetX,
          y: y + offsetY,
          prevX: x + offsetX,
          prevY: y + offsetY,
          nextX: x + offsetX,
          nextY: y + offsetY,
          baseX: x + offsetX,
          baseY: y + offsetY,
          angle,
          debug: {},
        });
      }

      return nodes;
    },
    [points]
  );

  const createControlPoints = useCallback(
    (nodes: BlobNode[], radius: number, offsetX: number, offsetY: number) => {
      // https://stackoverflow.com/questions/1734745/how-to-create-circle-with-b%C3%A9zier-curves
      const idealControlPointDistance =
        (4 / 3) * Math.tan(Math.PI / (2 * points)) * radius;

      const cp0 = {
        c1x: nodes[0].x,
        c1y: nodes[0].y - idealControlPointDistance,
        c2x: nodes[0].x,
        c2y: nodes[0].y + idealControlPointDistance,
      };

      return nodes.map<BezierControlPoint>((node, i) => {
        if (i === 0) {
          return cp0;
        }

        const angle = -node.angle;
        const rotatedC1 = rotate(
          radius + offsetX,
          radius + offsetY,
          cp0.c1x,
          cp0.c1y,
          angle
        );
        const rotatedC2 = rotate(
          radius + offsetX,
          radius + offsetY,
          cp0.c2x,
          cp0.c2y,
          angle
        );

        return {
          c1x: rotatedC1[0],
          c1y: rotatedC1[1],
          c2x: rotatedC2[0],
          c2y: rotatedC2[1],
        };
      });
    },
    [points]
  );


  const nodes = useMemo(
    () => createNodes(radius, OFFSET_X, OFFSET_Y),
    [OFFSET_X, OFFSET_Y, createNodes, radius]
  );


  const controlPoints = useMemo(
    () => createControlPoints(nodes, radius, OFFSET_X, OFFSET_Y),
    [OFFSET_X, OFFSET_Y, createControlPoints, nodes, radius]
  );


  const animate = useMemo(() => {
    return createAnimation(nodes,
      controlPoints,
      amplitude,
      speed)
  }, [amplitude, controlPoints, nodes, speed])

  const [poline, setPoline] = useState(colors);

  // Here's where the animation actually gets run.
  // We pass the hook a function that executes on every available frame
  const [elapsed, delta, animationRef] = useAnimationFrame((time) => {
    if (!canvasRef.current) {
      return;
    }

    console.log( ~~(time - animationStart.current) / 1000);
    
    
    const [updatedNodes, updatedControlPoints] = animate(
      ~~(time - animationStart.current) / 1000
    );

    if (canvasRef.current) {
      CanvasBlob({
        ctx: canvasRef.current.getContext("2d")!,
        nodes: updatedNodes,
        controlPoints: updatedControlPoints,
        colors: poline.colorsCSS,
        radius,
      });
    }
  });

  useEffect(() => {
    const id = animationRef.current;
    return () => {
      id && window.cancelAnimationFrame(id);
    };
  }, [animationRef]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
    ></canvas>
  );
};

export default Blob;
