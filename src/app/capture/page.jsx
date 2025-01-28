"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import useCameraStream from "@/hooks/useCameraStream";
import useImageAnalysis from "@/hooks/useImageAnalysis";
import Image from "next/image";
import CameraImg from "../../../public/camera.png";
import eslHuman1 from "../../../public/eslHuman.webp";
import eslHuman2 from "../../../public/eslHuman2.webp";
import Header from "../components/section/Header";
import HalfCard from "../components/Card/HalfCard";

export default function CapturePage() {
  const router = useRouter();
  const canvasRef = useRef(null);
  const { videoRef, streamError } = useCameraStream();
  const { loading, analyzeAndSave } = useImageAnalysis();

  const captureImage = async () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/webP", 0.8);
      });

      if (blob) {
        await analyzeAndSave(blob);
        router.push("/select");
      } else {
        console.error("Failed to create blob");
      }
    }
  };

  if (streamError) {
    return <div>카메라 접근 에러: {streamError.message}</div>;
  }

  return (
    <div className="bg-[#E2E0DF] h-screen">
      <Header>
        <div className="">
          가격표에 맞춰서 &nbsp;
          <span className="font-extrabold text-white text-xl">카메라📸</span>를
          눌러보세요 !
        </div>
      </Header>
      <div className="relative p-2 font-pretendard px-2">
        <div className="relative w-full h-1/4 aspect-9/16 inset-0 border border-gray-300 rounded-2xl">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="absolute inset-0 w-full h-full aspect-9/16 object-cover rounded-2xl"
          />
        </div>
        <button
          onClick={captureImage}
          disabled={loading}
          className="absolute bg-transparent text-white px-4 py-2 rounded-full bottom-6 -translate-x-1/2 left-1/2 -translate-y-1/2"
        >
          <Image src={CameraImg} alt="Camera Img" className="size-28" />
        </button>
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </div>
  );
}
