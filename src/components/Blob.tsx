"use client";
// Blob.tsx

import { useAnimationFrame } from "@/lib/hooks/useAnimationFrame";
import React, { useEffect, useRef, useState } from "react";
import { Path } from "typescript";
import { Flex } from "./ui";
import { Poline } from "poline";
import useTilg from "tilg";

// TYPES

/** A point on our vector that provides context for our animation */
type Node = {
  id: number;
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  nextX: number;
  nextY: number;
  baseX: number;
  baseY: number;
  angle: number;
  debug: {};
};

/** Coordinates for the two arms that allow us to animate a Bezier curve around a Node */
type BezierControlPoint = {
  c1x: number;
  c1y: number;
  c2x: number;
  c2y: number;
};

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

  const rotate = (
    cx: number,
    cy: number,
    x: number,
    y: number,
    radians: number
  ) => {
    const cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = cos * (x - cx) + sin * (y - cy) + cx,
      ny = cos * (y - cy) - sin * (x - cx) + cy;
    return [nx, ny] as const;
  };

  const createNodes = (radius: number, offsetX: number, offsetY: number) => {
    let nodes: Node[] = [],
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
  };

  const createControlPoints = (
    nodes: Node[],
    radius: number,
    offsetX: number,
    offsetY: number
  ) => {
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
  };

  const [nodes, setNodes] = useState(createNodes(radius, OFFSET_X, OFFSET_Y));
  const [controlPoints, setControlPoints] = useState(
    createControlPoints(nodes, radius, OFFSET_X, OFFSET_Y)
  );
  const [poline, setPoline] = useState(colors);

  const pathRef = useRef<SVGPathElement>(null);
  const gradientRef = useRef<SVGLinearGradientElement>(null);

  const animate = (
    nodes: Node[],
    controlPoints: BezierControlPoint[],
    amplitude: number
  ) => {
    nodes.forEach((node, i) => {
      if (Math.abs(nodes[i].nextX - nodes[i].x) < 10) {
        const shiftX =
          ((~~(Math.random() * 5) - 2) * Math.random() * amplitude) / 2;
        nodes[i].prevX = nodes[i].x;
        nodes[i].nextX = nodes[i].baseX + shiftX;
      }
      if (Math.abs(nodes[i].nextY - nodes[i].y) < 10) {
        const shiftY =
          ((~~(Math.random() * 5) - 2) * Math.random() * amplitude) / 2;
        nodes[i].prevY = nodes[i].y;
        nodes[i].nextY = nodes[i].baseY + shiftY;
      }

      const distanceX = nodes[i].nextX - nodes[i].prevX;
      const distanceY = nodes[i].nextY - nodes[i].prevY;
      const remainingDistanceX = nodes[i].nextX - nodes[i].x;
      const remainingDistanceY = nodes[i].nextY - nodes[i].y;

      let tX = 1 - remainingDistanceX / distanceX;
      let tY = 1 - remainingDistanceY / distanceY;

      const shiftX = ease(tX > 0 ? tX : 0.2) * distanceX;
      const shiftY = ease(tY > 0 ? tY : 0.2) * distanceY;

      nodes[i].x += shiftX;
      nodes[i].y += shiftY;
      controlPoints[i].c1x += shiftX;
      controlPoints[i].c1y += shiftY;
      controlPoints[i].c2x += shiftX;
      controlPoints[i].c2y += shiftY;
    });
    return [nodes, controlPoints] as const;
  };

  const ease = (t: number) => {
    return (-(Math.cos((Math.PI / 2) * t * 5) - 2) / 256) * speed;
  };

  const drawBlobPath = (
    nodes: Node[],
    controlPoints: BezierControlPoint[],
    path: SVGPathElement
  ) => {
    path.setAttribute(
      "d",
      `
        M${nodes[nodes.length - 1].x} ${nodes[nodes.length - 1].y}
        ${nodes
          .map(
            (node, i) => `
        C ${
          // Maybe cleanup with .at(i) ?
          i === 0
            ? controlPoints[controlPoints.length - 1].c2x
            : controlPoints[i - 1].c2x
        } ${
              i === 0
                ? controlPoints[controlPoints.length - 1].c2y
                : controlPoints[i - 1].c2y
            }, ${controlPoints[i].c1x} ${controlPoints[i].c1y}, ${node.x} ${
              node.y
            }
        `
          )
          .join("")}
        Z
        `
    );
  };

  // Here's where the animation actually gets run.
  // We pass the hook a function that executes on every available frame
  const [elapsed, delta] = useAnimationFrame((time) => {
    if (!pathRef.current) {
      return;
    }
    const [updatedNodes, updatedControlPoints] = animate(
      nodes,
      controlPoints,
      amplitude
    );

    // poline.shiftHue(3);
    drawBlobPath(updatedNodes, updatedControlPoints, pathRef.current);
  });

  return (
    <svg
      height={viewSize}
      width={viewSize}
      style={{ background: "transparent" }}
    >
      <defs>
        <radialGradient
          id="GradientReflect"
          cx="0.5"
          cy="0.5"
          r={0.4}
          fx={0.75}
          fy={0.75}
          spreadMethod="reflect"
        >
          <stop offset="0%" stopColor={poline.colorsCSS[2]} />
          <stop offset="100%" stopColor={poline.colorsCSS[5]} />
        </radialGradient>
        <linearGradient
          ref={gradientRef}
          id="gradient"
          x1={0}
          y1={0}
          x2={viewSize}
          y2={viewSize}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={poline.colorsCSS[2]} stopOpacity="0.15" />
          <stop offset="1" stopColor={poline.colorsCSS[5]} stopOpacity="0.29" />
        </linearGradient>
        <filter id="blur">
          <feGaussianBlur stdDeviation={blurStrength} />
        </filter>
      </defs>
      <path
        ref={pathRef}
        filter="url(#blur)"
        fill="url(#GradientReflect)"
      ></path>
    </svg>
  );
};

export default Blob;
