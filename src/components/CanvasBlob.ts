import { BezierControlPoint, Node } from "./Blob";

const CanvasBlob = ({
  ctx,
  nodes,
  controlPoints,
  colors,
  radius,
}: {
  ctx: CanvasRenderingContext2D;
  nodes: Node[];
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
  const gradient = ctx.createRadialGradient(
    radius * (0.5 + 0.25 * (radius / 200)),
    radius * (0.5 + 0.25 * (radius / 200)),
    0,
    radius * 0.5,
    radius * 0.5,
    radius * (0.5 + 0.3 * (radius / 200))
  );
  gradient.addColorStop(0, colors[2]);
  gradient.addColorStop(1, colors[5]);

  ctx.fillStyle = gradient;
  ctx.fill();
  // ctx.strokeStyle = "#fff";
  // ctx.stroke();
  ctx.closePath();
};

export default CanvasBlob;
