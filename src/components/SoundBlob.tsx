// Blob.tsx

import { useAnimationFrame } from "@/lib/hooks/useAnimationFrame";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Path } from "typescript";
import { Flex } from "./ui";
import { Poline } from "poline";
import useTilg from "tilg";
import CanvasBlob from "./CanvasBlob";

const ALLOWED_PRESCRIPTION_UPLOAD_EXTENSIONS = ["mp3", "wav"] as const;

// TYPES

/** A point on our vector that provides context for our animation */
export type Node = {
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

  const createNodes = useCallback(
    (radius: number, offsetX: number, offsetY: number) => {
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
    },
    [points]
  );

  const createControlPoints = useCallback(
    (nodes: Node[], radius: number, offsetX: number, offsetY: number) => {
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

  const innerNodes = useMemo(
    () => createNodes(110, viewSize / 2 - 110, viewSize / 2 - 110),
    [createNodes, viewSize]
  );

  const controlPoints = useMemo(
    () => createControlPoints(nodes, radius, OFFSET_X, OFFSET_Y),
    [OFFSET_X, OFFSET_Y, createControlPoints, nodes, radius]
  );

  const innerControlPoints = useMemo(
    () =>
      createControlPoints(
        innerNodes,
        110,
        viewSize / 2 - 110,
        viewSize / 2 - 110
      ),
    [createControlPoints, innerNodes, viewSize]
  );

  const [poline, setPoline] = useState(colors);
  const [running, setRunning] = useState(false);

  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const inputRef = useRef<HTMLInputElement>(null);
  const audioPlayer = useRef<HTMLAudioElement>(null);
  const animation = useRef<number>(null);
  const audioContext = useRef<AudioContext>();
  const analyser = useRef<AnalyserNode>();
  const sourceNode = useRef<MediaElementAudioSourceNode>();
  const progress = useRef<number>();
  const [audioFileSrc, setAudioFileSrc] = useState<string>();

  useEffect(() => {
    // setup on mount
    if (hasInteracted) {
      console.log("creating context");
      if (!audioContext.current && typeof window !== "undefined") {
        audioContext.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      }
    }
  }, [hasInteracted]);

  useEffect(() => {
    // setup with context
    console.log("creating analyser: ", { audioContext });

    const { current: context } = audioContext;

    if (context && !analyser.current && audioPlayer.current) {
      const A = context.createAnalyser();
      const S = context.createMediaElementSource(audioPlayer.current);
      const G = context.createGain();
      G.gain.value = 0.8;
      A.fftSize = 256 * 2;
      S.connect(A);
      S.connect(G);
      A.connect(context.destination);
      G.connect(context.destination);
      sourceNode.current = S;
      analyser.current = A;
    } else {
      console.log("no context");
    }
  }, [audioContext, audioPlayer, hasInteracted]);

  useEffect(() => {
    audioPlayer.current?.pause();
    audioPlayer.current?.load();
  }, [audioFileSrc, audioPlayer]);

  const whilePlaying = useCallback(() => {
    const { current: context } = audioContext;
    const { current: visualizer } = canvasRef;
    if (!(context && visualizer)) return;

    const bufferLength = analyser.current?.frequencyBinCount ?? 0;

    const audioDataArray = new Uint8Array(bufferLength);
    analyser.current!.getByteTimeDomainData(audioDataArray);
    // console.log({ bufferLength, audioDataArrayExample: audioDataArray[0] });

    const width = visualizer.width;
    const height = visualizer.height;
    const barWidth = 10;

    const canvasContext = visualizer.getContext("2d")!;

    const [updatedNodes, updatedControlPoints, peaks] = animate(
      nodes,
      controlPoints,
      amplitude,
      audioDataArray
    );

    const innerBlob = animate(
      innerNodes,
      innerControlPoints,
      20,
      audioDataArray
    );

    // poline.shiftHue(3);

    if (canvasRef.current) {
      canvasRef.current.getContext("2d")!.clearRect(0, 0, 400, 400);
      CanvasBlob({
        ctx: canvasRef.current.getContext("2d")!,
        nodes,
        controlPoints,
        colors: poline.colorsCSS,
        radius,
        audioDataArray,
        peaks,
      });
      CanvasBlob({
        ctx: canvasRef.current.getContext("2d")!,
        nodes: innerBlob[0],
        controlPoints: innerBlob[1],
        colors: poline.colorsCSS,
        radius: 110,
        audioDataArray,
        peaks: innerBlob[2],
      });
    }

    let x = 0;
    // audioDataArray.forEach((item, index, array) => {
    //   const y = (item / 255) * height;
    //   canvasContext.strokeStyle = "#fff";
    //   x = x + barWidth;
    //   canvasContext.beginPath();
    //   canvasContext.lineCap = "round";
    //   canvasContext.lineWidth = 2;
    //   canvasContext.moveTo(x, height);
    //   canvasContext.lineTo(x, height - y);
    //   canvasContext.stroke();
    // });
    animation.current = window.requestAnimationFrame(whilePlaying);
    // console.log({ audioDataArray });
  }, []);

  const togglePlayPause = () => {
    if (!audioPlayer.current) return;
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      console.log("playing!", { player: audioPlayer.current.src });

      audioPlayer.current.play();
      animation.current = requestAnimationFrame(whilePlaying);
    } else {
      console.log("pausing...");
      audioPlayer.current.pause();
      cancelAnimationFrame(animation.current!);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (!audioPlayer.current) return;
    const file = e.target.files[0];
    const blob = window.URL || window.webkitURL;
    if (!blob) {
      console.log("browser does not support Blob URLs");
    }

    const fileObjectURL = blob.createObjectURL(file);
    console.log("change on input#file triggered");

    console.log("File name: " + file.name);
    console.log("File type: " + file.type);
    console.log("File BlobURL: " + fileObjectURL);

    try {
      const extension = file.name?.match(/\.([0-9a-z]+)$/i)?.[1]?.toLowerCase();
      //@ts-ignore
      if (ALLOWED_PRESCRIPTION_UPLOAD_EXTENSIONS.includes(extension ?? "")) {
        // if (audioRef.current) audioRef.current = blob.createObjectURL(file);
        // setAudioFile(file);
        setAudioFileSrc(fileObjectURL);
      } else {
        console.error(
          `Invalid file type. Please upload a file with one of the following extensions: ${ALLOWED_PRESCRIPTION_UPLOAD_EXTENSIONS.join(
            ", "
          )}.`
        );
        setAudioFileSrc(undefined);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const animate = (
    nodes: Node[],
    controlPoints: BezierControlPoint[],
    amplitude: number,
    audioDataArray?: Uint8Array
  ) => {
    let peaks: number[] = [];

    const radians = (Math.PI * 2) / nodes.length;

    const audioDataAverage = audioDataArray
      ? audioDataArray.reduce((a, c, i, v) => {
          a += c;
          if (i === v.length - 1) {
            return a / v.length;
          }
          return a;
        }, 0)
      : 0;

    nodes.forEach((node, i) => {
      const peak = audioDataArray
        ? audioDataArray[i * (audioDataArray.length / nodes.length)] / 50
        : 0;

      const distanceFromOrigin = ~~Math.abs(
        (node.nextX / (viewSize / 2 + Math.cos(radians * i)) - 2) * 100
      );

      //   console.log({ peak });
      peaks.push(distanceFromOrigin);

      if (Math.abs(nodes[i].nextX - nodes[i].x) < 10) {
        // const shiftX = (1 * (Math.cos(distanceFromOrigin) * peak * 20)) / 2;
        const shiftX = Math.cos(audioDataAverage) * peak * 0.5 * 20;
        nodes[i].prevX = nodes[i].x;
        nodes[i].nextX = nodes[i].baseX + shiftX;
      }
      if (Math.abs(nodes[i].nextY - nodes[i].y) < 10) {
        // const shiftY = (1 * (Math.sin(distanceFromOrigin) * peak * 20)) / 2;
        const shiftY = Math.sin(audioDataAverage) * peak * 0.5 * 20;
        nodes[i].prevY = nodes[i].y;
        nodes[i].nextY = nodes[i].baseY + shiftY;
      }

      const distanceX = nodes[i].nextX - nodes[i].prevX;
      const distanceY = nodes[i].nextY - nodes[i].prevY;
      const remainingDistanceX = nodes[i].nextX - nodes[i].x;
      const remainingDistanceY = nodes[i].nextY - nodes[i].y;

      let tX = 1 - remainingDistanceX / distanceX;
      let tY = 1 - remainingDistanceY / distanceY;

      const shiftX = ease(tX > 0 ? tX : 0.2) * distanceX * peak;
      const shiftY = ease(tY > 0 ? tY : 0.2) * distanceY * peak;

      nodes[i].x += shiftX;
      nodes[i].y += shiftY;
      controlPoints[i].c1x += shiftX;
      controlPoints[i].c1y += shiftY;
      controlPoints[i].c2x += shiftX;
      controlPoints[i].c2y += shiftY;
    });
    return [nodes, controlPoints, peaks] as const;
  };

  const ease = (t: number) => {
    return (-(Math.cos((Math.PI / 2) * t * 5) - 2) / 256) * speed;
  };

  useEffect(() => {
    const id = animation.current;
    return () => {
      animation.current && window.cancelAnimationFrame(animation.current);
    };
  }, [animation]);

  return (
    <>
      {!hasInteracted && (
        <div className="seal">
          <button onClick={() => setHasInteracted(true)}>Push to Start</button>
        </div>
      )}
      <Flex column gap={4} center fullHeight fullWidth position="relative">
        <audio
          style={{ visibility: "hidden" }}
          ref={audioPlayer}
          src={audioFileSrc}
          controls
        >
          <source src={audioFileSrc} type={"audio/mpeg"}></source>
        </audio>
        <input
          ref={inputRef}
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
        />

        {/* <button onClick={togglePlayPause}>
          {isPlaying ? "PAUSE" : "PLAY"}
        </button> */}
        {/* {children} */}
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          onClick={togglePlayPause}
        ></canvas>
      </Flex>
    </>
  );
};

export default Blob;
