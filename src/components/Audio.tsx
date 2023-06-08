import { useAnimationFrame } from "@/lib/hooks/useAnimationFrame";
import useWebAudtio from "@/lib/hooks/useWebAudio";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import useTilg from "tilg";

const ALLOWED_PRESCRIPTION_UPLOAD_EXTENSIONS = ["mp3", "wav"] as const;

const Audio = () => {
  useTilg();
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [audioFile, setAudioFile] = useState<File>();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const blob = window.URL || window.webkitURL;
    if (!blob) {
      console.log("browser does not support Blob URLs");
    }

    try {
      const extension = file.name?.match(/\.([0-9a-z]+)$/i)?.[1]?.toLowerCase();
      //@ts-ignore
      if (ALLOWED_PRESCRIPTION_UPLOAD_EXTENSIONS.includes(extension ?? "")) {
        // setAudioFile(file);
        if (audioRef.current) audioRef.current.src = blob.createObjectURL(file);
      } else {
        console.error(
          `Invalid file type. Please upload a file with one of the following extensions: ${ALLOWED_PRESCRIPTION_UPLOAD_EXTENSIONS.join(
            ", "
          )}.`
        );
        setAudioFile(undefined);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [freqs] = useWebAudtio(audioRef.current);

  return (
    <section className="viewport">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        onClick={() => setRunning((prev) => !prev)}
      ></canvas>
      <audio ref={audioRef} controls></audio>
      <input
        ref={inputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
      />
    </section>
  );
};

export default Audio;
