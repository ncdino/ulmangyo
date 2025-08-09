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
import { motion } from "framer-motion";

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
    <div className="h-screen max-w-xl mx-auto bg-neutral-950 text-center font-pretendard flex flex-col">
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
        <div className="flex-1 flex flex-col justify-between p-4">
          {/* 비디오 영역 */}
          <div className="relative w-full max-w-md aspect-[9/16] mx-auto rounded-2xl overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div
              ref={guideBoxRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            w-[85%] h-[25%] border-dotted border-2 border-white rounded-lg pointer-events-none 
            shadow-[0_0_0_9999px_rgba(0,0,0,0.6)] flex items-center justify-center"
            >
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 5, ease: "easeOut" }}
                className="font-pretendard text-white text-sm sm:text-base font-semibold bg-black/50 px-2 py-1 rounded-md">
                가격표를 이 박스 안에 맞춰주세요
              </motion.span>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <button
                onClick={captureImage}
                disabled={loading}
                className="bg-black/30 rounded-full p-4 shadow-lg hover:scale-105 transition-transform"
              >
                <Image src={CameraImg} alt="Camera Img" className="size-16" />
              </button>
            </div>
          </div>

          {/* 캡처 버튼 */}


          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      )}
    </div>
  );
}