"use client";

import { useState, useRef, useEffect } from "react";

function useCameraStream() {
  const videoRef = useRef(null);
  const [streamError, setStreamError] = useState(null);

  useEffect(() => {
    async function getCameraStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        d;
        setStreamError(err);
      }
    }

    getCameraStream();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return { videoRef, streamError };
}

export default useCameraStream;
