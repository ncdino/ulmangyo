"use client";

import React, { useRef, useState } from "react";
import useCameraStream from "@/hooks/useCameraStream";
import useImageAnalysis from "@/hooks/useImageAnalysis";
import useStore from "@/app/store/zustand/store";

export default function PhotoAnalysis() {
  const canvasRef = useRef(null);
  const { videoRef, streamError } = useCameraStream();
  const { loading, analyzeAndSave } = useImageAnalysis();
  const { detectedTexts, addCartItem } = useStore();

  const [selectedCandidates, setSelectedCandidates] = useState({}); // 현재 선택 상태관리

  const handleSelect = (id, type, value) => {
    setSelectedCandidates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [type]: value,
      },
    }));
  };

  const handleAddToCart = (id) => {
    const selected = selectedCandidates[id];
    if (selected?.name && selected?.price) {
      addCartItem(id, selected.name, selected.price);
      setSelectedCandidates((prev) => ({
        ...prev,
        [id]: { name: null, price: null },
      }));
    } else {
      alert("상품명과 가격을 모두 선택해주세요!");
    }
  };

  const captureImage = async () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/jpeg");
      });

      if (blob) {
        analyzeAndSave(blob);
      } else {
        console.error("Failed to create blob");
      }
    }
  };

  if (streamError) {
    return <div>카메라 접근 에러: {streamError.message}</div>;
  }

  return (
    <div className="container">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", height: "auto", border: "1px solid #ccc" }}
      />
      <button
        onClick={captureImage}
        disabled={loading}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "글자분석중" : "상품명 캡처"}
      </button>
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {detectedTexts.length > 0 ? (
        <div>
          <ul>
            {detectedTexts.map((item) => (
              <div key={item.id}>
                <h3>ID: {item.id}</h3>

                {item.productNameCandidates?.length > 0 && (
                  <div>
                    <h2>상품명 후보</h2>
                    <ul>
                      {item.productNameCandidates.map((candidate, index) => (
                        <li
                          key={index}
                          onClick={() =>
                            handleSelect(item.id, "name", candidate.text)
                          }
                          style={{
                            cursor: "pointer",
                            textDecoration:
                              selectedCandidates[item.id]?.name ===
                              candidate.text
                                ? "underline"
                                : "none",
                            color:
                              selectedCandidates[item.id]?.name ===
                              candidate.text
                                ? "blue"
                                : "white",
                          }}
                        >
                          {candidate.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.priceCandidates?.length > 0 && (
                  <div>
                    <h2>가격 후보</h2>
                    <ul>
                      {item.priceCandidates.map((candidate, index) => (
                        <li
                          key={index}
                          onClick={() =>
                            handleSelect(item.id, "price", candidate.text)
                          }
                          style={{
                            cursor: "pointer",
                            textDecoration:
                              selectedCandidates[item.id]?.price ===
                              candidate.text
                                ? "underline"
                                : "none",
                            color:
                              selectedCandidates[item.id]?.price ===
                              candidate.text
                                ? "blue"
                                : "white",
                          }}
                        >
                          {candidate.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 카트 추가버튼 */}
                <button
                  onClick={() => handleAddToCart(item.id)}
                  className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
                >
                  카트에 추가
                </button>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <p>분석 중이거나 결과가 없습니다.</p>
      )}
    </div>
  );
}
