import { useEffect, useRef, useState } from "react";

const useWebAudtio = (element: HTMLMediaElement) => {
  const [freqs, setFreqs] = useState<Uint8Array>();
  useEffect(() => {
    if (!!element) {
      const context = new (window.AudioContext ||
        (window as any).webkitAudioContext)();

      const analyser = context.createAnalyser();
      const source = context.createMediaElementSource(element);
      source.connect(analyser);
      analyser.connect(context.destination);

      const f = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(f);
      setFreqs(f);
    }

    return () => {};
  }, [element]);

  return [freqs];
};

export default useWebAudtio;
