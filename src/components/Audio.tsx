"use client";
import { useAnimationFrame } from "@/lib/hooks/useAnimationFrame";
import useWebAudtio from "@/lib/hooks/useWebAudio";
import React, {
  ChangeEvent,
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import useTilg from "tilg";
import { JsxAttribute, JsxElement } from "typescript";
import { Flex } from "./ui";

const ALLOWED_PRESCRIPTION_UPLOAD_EXTENSIONS = ["mp3", "wav"] as const;

// type AudioContext = {
//   element: JSX.IntrinsicElements["audio"] | undefined;
//   fileSrc: string | undefined;
//   freqs: Uint8Array | undefined;
// };

// export const AudioVisContext = createContext<AudioContext>({
//   element: undefined,
//   fileSrc: undefined,
//   freqs: undefined,
// });

const Audio = () => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [audioFileSrc, setAudioFileSrc] = useState<string>();

  useEffect(() => {
    // setup on mount
    console.log("creating context");
    if (!audioContext.current && typeof window !== "undefined") {
      audioContext.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
  }, []);

  useEffect(() => {
    // setup with context
    console.log("creating analyser: ", { audioContext });

    const { current: context } = audioContext;

    if (context && !analyser.current) {
      const A = context.createAnalyser();
      const S = context.createMediaElementSource(audioPlayer.current!);
      A.fftSize = 256;
      S.connect(A);
      A.connect(context.destination);
      sourceNode.current = S;
      analyser.current = A;
    } else {
      console.log("no context");
    }
  }, [audioContext]);

  const whilePlaying = () => {
    const { current: context } = audioContext;
    const { current: visualizer } = canvasRef;
    console.log({ context, visualizer });
    if (!(context && visualizer)) return;

    console.log("playing");

    const bufferLength = analyser.current!.frequencyBinCount;
    const audioDataArray = new Uint8Array(bufferLength);
    analyser.current!.getByteTimeDomainData(audioDataArray);

    const width = visualizer.width;
    const height = visualizer.height;
    const barWidth = 10;

    const canvasContext = visualizer.getContext("2d")!;
    canvasContext.clearRect(0, 0, width, height);
    let x = 0;
    audioDataArray.forEach((item, index, array) => {
      console.log(item);

      const y = (item / 255) * height * 1.1;
      canvasContext.strokeStyle = "#000";
      x = x + barWidth;
      canvasContext.beginPath();
      canvasContext.lineCap = "round";
      canvasContext.lineWidth = 2;
      canvasContext.moveTo(x, height);
      canvasContext.lineTo(x, height - y);
      canvasContext.stroke();
    });
    animation.current = window.requestAnimationFrame(whilePlaying);
    // console.log({ audioDataArray });
  };

  const togglePlayPause = () => {
    if (!audioPlayer.current) return;
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animation.current = requestAnimationFrame(whilePlaying);
    } else {
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

    try {
      const extension = file.name?.match(/\.([0-9a-z]+)$/i)?.[1]?.toLowerCase();
      //@ts-ignore
      if (ALLOWED_PRESCRIPTION_UPLOAD_EXTENSIONS.includes(extension ?? "")) {
        // if (audioRef.current) audioRef.current = blob.createObjectURL(file);
        // setAudioFile(file);
        setAudioFileSrc(blob.createObjectURL(file));
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

  return (
    <Flex column gap={4} center fullHeight fullWidth position="relative">
      <audio ref={audioPlayer} controls>
        <source src={audioFileSrc} type={"audio/mpeg"}></source>
      </audio>
      <input
        ref={inputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
      />

      <button onClick={togglePlayPause}>{isPlaying ? "PAUSE" : "PLAY"}</button>
      {/* {children} */}
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        style={{ position: "static", border: "1px solid black" }}
        onClick={togglePlayPause}
      ></canvas>
    </Flex>
  );
};

export default Audio;
