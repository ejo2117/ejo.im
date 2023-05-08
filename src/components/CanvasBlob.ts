import { BezierControlPoint, Node } from "./Blob";

const CanvasBlob = ({
  ctx,
  nodes,
  controlPoints,
  colors,
}: {
  ctx: CanvasRenderingContext2D;
  nodes: Node[];
  controlPoints: BezierControlPoint[];
  colors: string[];
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
  const gradient = ctx.createConicGradient(5, 5, 4);
  gradient.addColorStop(0, colors[2]);
  gradient.addColorStop(1, colors[5]);

  ctx.fillStyle = gradient;
  ctx.fill();
  // ctx.strokeStyle = "#fff";
  // ctx.stroke();
  ctx.closePath();
};

export default CanvasBlob;
