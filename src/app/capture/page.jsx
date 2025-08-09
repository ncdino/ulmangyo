"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import useCameraStream from "@/hooks/useCameraStream";
import useImageAnalysis from "@/hooks/useImageAnalysis";
import Image from "next/image";
import CameraImg from "../../../public/camera.png";
import Header from "../components/section/Header";
import useStore from "@/app/store/zustand/store";
import { signIn, useSession } from "next-auth/react";
import Modal from "../components/section/Modal/Modal";
import GoogleSignInButton from "../components/Button/GoogleSignInButton";
import OAuthLoginButton from "../components/Button/OAuthLoginButton";
import { db } from "@/app/util/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function CapturePage() {
  const router = useRouter();
  const canvasRef = useRef(null);
  const guideBoxRef = useRef(null);
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!session) {
      setIsModalOpen(true);
    }
  }, [session]);

  const { videoRef, streamError } = useCameraStream();
  const { loading, analyzeAndSave } = useImageAnalysis();
  const { resetDetectedTexts } = useStore();

  useEffect(() => {
    resetDetectedTexts();
  }, []);

  const captureImage = async () => {
    if (canvasRef.current && videoRef.current && guideBoxRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const guideBox = guideBoxRef.current;

      const videoRect = video.getBoundingClientRect();
      const guideBoxRect = guideBox.getBoundingClientRect();

      const scaleX = video.videoWidth / videoRect.width;
      const scaleY = video.videoHeight / videoRect.height;

      const cropX = (guideBoxRect.left - videoRect.left) * scaleX;
      const cropY = (guideBoxRect.top - videoRect.top) * scaleY;
      const cropWidth = guideBoxRect.width * scaleX;
      const cropHeight = guideBoxRect.height * scaleY;

      canvas.width = cropWidth;
      canvas.height = cropHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        video,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/webp", 0.9);
      });

      if (blob) {
        if (session) {
          const userRef = doc(db, "users", session.user.email);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();

            if (userData.usage > 0) {
              try {
                await updateDoc(userRef, { usage: userData.usage - 1 });
                await analyzeAndSave(blob);
                router.push("/select");
              } catch (error) {
                console.error("Error analyzing image:", error);
              }
            } else {
              alert("사용량이 모두 소진되었습니다.");
            }
          }
        }
      } else {
        console.error("Failed to create blob");
      }
    }
  };

  if (streamError) {
    return <div>카메라 접근 에러: {streamError.message}</div>;
  }

  return (
    <div className="h-screen max-w-xl mx-auto bg-gray-800 text-center font-pretendard">
      <Header>
        <div>
          가격표에 맞춰서 &nbsp;
          <span className="font-extrabold text-white text-xl">카메라📸</span>를
          눌러보세요 !
        </div>
      </Header>
      {!session && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="로그인이 필요합니다"
        >
          <div className="flex flex-col gap-3">
            <GoogleSignInButton onClick={() => signIn("google")} />
            <OAuthLoginButton onClick={() => signIn("kakao")} />
          </div>
        </Modal>
      )}
      {session && (
        <div className="h-full flex flex-col items-center justify-center p-4 gap-4">
          <div className="relative w-full max-w-md aspect-[9/16] rounded-2xl overflow-hidden border-2 border-gray-500">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div
              ref={guideBoxRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[25%] border-4 border-white rounded-lg pointer-events-none [box-shadow:0_0_0_9999px_rgba(0,0,0,0.6)]"
            ></div>
          </div>

          {/* 캡처 버튼 */}
          <div className="flex-shrink-0 mt-4">
            <button
              onClick={captureImage}
              disabled={loading}
              className="bg-white/30 text-white rounded-full p-2"
            >
              <Image src={CameraImg} alt="Camera Img" className="size-24" />
            </button>
          </div>

          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      )}
    </div>
  );
}