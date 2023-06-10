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
import CanvasBlob from "./CanvasBlob";
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
    console.log({ bufferLength, audioDataArrayExample: audioDataArray[0] });

    const width = visualizer.width;
    const height = visualizer.height;
    const barWidth = 10;

    const canvasContext = visualizer.getContext("2d")!;
    canvasContext.clearRect(0, 0, width, height);
    let x = 0;
    audioDataArray.forEach((item, index, array) => {
      const y = (item / 255) * height;
      canvasContext.strokeStyle = "#fff";
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
          style={{ position: "static", border: "1px solid black" }}
          onClick={togglePlayPause}
        ></canvas>
      </Flex>
    </>
  );
};

export default Audio;
