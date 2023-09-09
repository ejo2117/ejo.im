import { BezierControlPoint, BlobNode } from "./utils";

const CanvasBlob = ({
  ctx,
  nodes,
  controlPoints,
  colors,
  radius,
}: {
  ctx: CanvasRenderingContext2D;
  nodes: BlobNode[];
  controlPoints: BezierControlPoint[];
  colors: string[];
  radius: number;
}) => {
  ctx.clearRect(0, 0, 400, 400);
  ctx.filter = "blur(8px)";

  ctx.beginPath();
  ctx.moveTo(nodes.at(-1)!.x, nodes.at(-1)!.y);
  nodes.forEach((node, i) => {
    const cp1 = controlPoints.at(i - 1)!;
    const cp2 = controlPoints.at(i)!;
    ctx.bezierCurveTo(cp1.c2x, cp1.c2y, cp2.c1x, cp2.c1y, node.x, node.y);
  });

  const centroid = nodes.reduce(
    (result, current, i, a) => {
      result[0] = result[0] + current.x;
      result[1] = result[1] + current.y;

      if (i === a.length - 1) {
        result[0] = result[0] / a.length;
        result[1] = result[1] / a.length;
      }

      return result;
    },
    [0, 0]
  );
  // center of the gradient's starting circle
  const focal = centroid.map((v) => v + radius * 0.25);

  const gradient = ctx.createRadialGradient(
    focal[0],
    focal[1],
    0,
    centroid[0],
    centroid[1],
    radius
  );
  gradient.addColorStop(0, colors[2]);
  gradient.addColorStop(1, colors[5]);

  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.closePath();
};

export default CanvasBlob;
