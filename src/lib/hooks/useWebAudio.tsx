import { useEffect, useRef, useState } from "react";
import useTilg from "tilg";

const useWebAudtio = (element: HTMLMediaElement) => {
  const [freqs, setFreqs] = useState<Uint8Array>();
  useEffect(() => {
    console.log("running effect", { element });

    if (!!element) {
      console.log("running effect");

      const context = new (window.AudioContext ||
        (window as any).webkitAudioContext)();

      console.log({ context });

      const analyser = context.createAnalyser();
      const source = context.createMediaElementSource(element);
      source.connect(analyser);
      analyser.connect(context.destination);
      analyser.fftSize = 128;

      const bufferLength = analyser.frequencyBinCount;
      const audioDataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(audioDataArray);
      console.log({ audioDataArray });

      setFreqs(audioDataArray);
    }
  }, [element]);

  return freqs;
};

export default useWebAudtio;
