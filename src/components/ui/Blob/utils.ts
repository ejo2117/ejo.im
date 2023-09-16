// TYPES

/** A point on our shape that provides context for our animation */
export type BlobNode = {
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
export type BezierControlPoint = {
    c1x: number;
    c1y: number;
    c2x: number;
    c2y: number;
  };

export const rotate = (
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

export const ease = (t: number, speed: number) => {
  return (-(Math.cos((Math.PI / 2) * t * 5) - 2) / 256) * speed;
};



const pseudoRandX = (t: number, i: number) => {
  const {sin,cos,tan,log,random,sqrt, max} = Math;

  // return max(sin(sqrt(t**1.5 * i)), 0);
  return tan(sin((t ** i)) * sin((i % 2) * -1) * -1);
}
const pseudoRandY = (t: number, i: number) => {
  const {sin,cos,tan,log, random, sqrt, max} = Math;

  return cos(tan(t ** i) * -1) * cos((i % 2) * -1) * -1;
}




export const createAnimation = (
    nodes: BlobNode[],
    controlPoints: BezierControlPoint[],
    amplitude: number,
    speed: number
  ) => (t: number) => {
    nodes.forEach((node, i) => {
    
      if (Math.abs(nodes[i].nextX - nodes[i].x) < 10) {
        const shiftX =
          ((~~(pseudoRandX(t, i) * 5) - 2) * pseudoRandX(t, i) * amplitude) / 2;
        nodes[i].prevX = nodes[i].x;
        nodes[i].nextX = nodes[i].baseX + shiftX;
      }
      if (Math.abs(nodes[i].nextY - nodes[i].y) < 10) {
        const shiftY =
          ((~~(pseudoRandY(t, i) * 5) - 2) * pseudoRandY(t, i) * amplitude) / 2;
        nodes[i].prevY = nodes[i].y;
        nodes[i].nextY = nodes[i].baseY + shiftY;
      }

      const distanceX = nodes[i].nextX - nodes[i].prevX;
      const distanceY = nodes[i].nextY - nodes[i].prevY;
      const remainingDistanceX = nodes[i].nextX - nodes[i].x;
      const remainingDistanceY = nodes[i].nextY - nodes[i].y;

      let tX = 1 - remainingDistanceX / distanceX;
      let tY = 1 - remainingDistanceY / distanceY;

      const shiftX = ease(tX > 0 ? tX : 0.2, speed) * distanceX;
      const shiftY = ease(tY > 0 ? tY : 0.2, speed) * distanceY;

      nodes[i].x += shiftX;
      nodes[i].y += shiftY;
      controlPoints[i].c1x += shiftX;
      controlPoints[i].c1y += shiftY;
      controlPoints[i].c2x += shiftX;
      controlPoints[i].c2y += shiftY;
    });
    return [nodes, controlPoints] as const;
  };