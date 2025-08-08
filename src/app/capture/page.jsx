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
import OAuthLoginButton from "../components/Button/OAuthLoginButton";
import GoogleSignInButton from "../components/Button/GoogleSignInButton";
import { db } from "@/app/util/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function CapturePage() {
  const router = useRouter();
  const canvasRef = useRef(null);

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
              // 모달 띄어주기
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
    <div className="h-screen">
      <Header>
        <div>
          가격표에 맞춰서 &nbsp;
          <span className="font-extrabold text-white text-xl">카메라📸</span>를
          눌러보세요 !
        </div>
      </Header>
      {/* ✅ 재사용 가능한 Modal 적용 */}
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
            className="absolute bg-black/50 text-white px-4 py-2 rounded-full bottom-6 -translate-x-1/2 left-1/2 -translate-y-1/2"
          >
            <Image src={CameraImg} alt="Camera Img" className="size-28" />
          </button>
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      )}
    </div>
  );
}
